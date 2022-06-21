import { DateTime } from 'luxon';
import { CalendarEvent } from '../common/interface';

const findIntersectedTop = (sizes, offsetTop, i) => {
  return sizes
    .filter((size, index) => index < i && size.offsetTop <= offsetTop && size.offsetTop + size.height > offsetTop)
    .sort((a, b) => a.offsetTop - b.offsetTop);
};

const findNonIntersectedOnPreviousLine = (sizes, offsetTop, previous) => {
  let onPrevousLine = sizes
    .filter((size) => size.offsetTop + size.height <= offsetTop)
    .sort((a, b) => parseInt(a.offsetLeft) - parseInt(b.offsetLeft));
  return previous.offsetTop + previous.height < offsetTop ? [...onPrevousLine, previous] : onPrevousLine;
};

const getLeftAndHeight = (sizesWithTop) => {
  let sizes = [...sizesWithTop].sort((a, b) => a.offsetTop - b.offsetTop);
  sizes.forEach((size, i) => {
    const intersectedWithYou = findIntersectedTop(sizes, size.offsetTop, i);
    if (!i || !intersectedWithYou.length) {
      return;
    } else {
      if (intersectedWithYou && intersectedWithYou[intersectedWithYou.length - 1].width === '100%') {
        const newLength = 100 / (intersectedWithYou.length + 1);
        let sizesToReplace = intersectedWithYou.map((item, i) => ({
          ...item,
          width: `${newLength}%`,
          offsetLeft: `${i * newLength}%`,
        }));
        sizesToReplace = [...sizesToReplace, { ...size, offsetLeft: `${intersectedWithYou.length * newLength}%`, width: `${newLength}%` }];
        sizes = sizes.map((size) => {
          const replacedSize = sizesToReplace.find((sizeToReplace) => sizeToReplace.id === size.id);
          return replacedSize || size;
        });
      } else if (intersectedWithYou && intersectedWithYou[intersectedWithYou.length - 1].width !== '100%') {
        const intersectedWithPrevious = findIntersectedTop(sizes, sizes[i - 1].offsetTop, i);
        const nonIntersectedOnPreviousLine = findNonIntersectedOnPreviousLine(intersectedWithPrevious, size.offsetTop, sizes[i - 1]);
        if (nonIntersectedOnPreviousLine?.length) {
          sizes[i] = {
            ...sizes[i],
            offsetLeft: nonIntersectedOnPreviousLine[0].offsetLeft,
            width: nonIntersectedOnPreviousLine[0].width,
          };
        } else {
          let fullIntersected = [...intersectedWithYou];
          let intersected = [...intersectedWithYou];
          while (intersected && intersected.length) {
            const inter = intersected.map(({ offsetTop, id }) => findIntersectedTop(sizes, offsetTop, i)).flat();
            const exIds = fullIntersected.map(({ id }) => id);
            intersected = inter.filter(({ id }) => !exIds.includes(id));
            fullIntersected = fullIntersected.concat(intersected);
          }

          let newSizes = fullIntersected.map((item) => {
            const oldWidth = item.width;
            const newWidth = Math.floor(100 / (Math.floor(100 / parseInt(oldWidth)) + 1));
            const oldPos = parseInt(item.offsetLeft) / parseInt(oldWidth);
            const newLeft = oldPos * newWidth;
            return {
              ...item,
              offsetLeft: `${newLeft}%`,
              width: `${newWidth}%`,
            };
          });

          const stylesForMe = newSizes.reduce((res, curr) => {
            if (parseInt(curr.offsetLeft) >= (res?.offsetLeft ? parseInt(res.offsetLeft) : 0)) {
              res = {
                offsetLeft: `${parseInt(curr.offsetLeft) + parseInt(curr.width)}%`,
                width: curr.width,
              };
            }
            return res;
          }, {});
          newSizes = [...newSizes, { ...size, ...stylesForMe }];
          sizes = sizes.map((size) => {
            const replacedSize = newSizes.find((item) => {
              return item.id === size.id;
            });
            return replacedSize || size;
          });
        }
      }
    }
  });
  return sizes;
};

export const getComponentsSizes = (components: CalendarEvent[], start: number, scaleCoeff = 1, isAsc: boolean, height: number) => {
  const sizesWithTop = components.map(({ startAt: startDate, endAt: endDate, summary, id }) => {
    const dayZeros = {
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    };

    const calendarStart = DateTime.local().plus({ month: start }).startOf('month').set(dayZeros);
    const startAt = startDate ? DateTime.fromISO(startDate).startOf('month').set(dayZeros) : calendarStart;
    const endAt = endDate ? DateTime.fromISO(endDate).endOf('month').set(dayZeros) : calendarStart.endOf('month').set(dayZeros);

    const offset = Math.round(startAt.diff(calendarStart, 'day').days * scaleCoeff);
    const eventHeight = Math.round(endAt.diff(startAt, 'day').days * scaleCoeff);
    return {
      offsetTop: isAsc ? offset + 1 : height - offset - eventHeight - 1,
      height: eventHeight,
      offsetLeft: '0',
      width: '100%',
      endAt,
      startAt,
      summary: `${startAt.year}: ${startAt.monthShort} - ${endAt.year}: ${endAt.monthShort}  ${summary}`,
      id,
    };
  });
  return getLeftAndHeight(sizesWithTop);
};

export const getDateFromPosition = (value: number, store): DateTime => {
  const day = DateTime.local().plus({ month: store.startStep }).startOf('month');
  const delta = store.isAsc ? value : store.height / store.scaleCoeff - value;
  return day.plus({ day: delta }).set({
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  });
};
