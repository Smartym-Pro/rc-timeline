import { DateTime } from 'luxon';
import { CalendarEvent, EventState } from '../common/interface';

const findIntersectedTop = (sizes: EventState[], offsetTop: number, i: number) => {
  return sizes
    .filter((size, index) => index < i && size.offsetTop <= offsetTop && size.offsetTop + size.height > offsetTop)
    .sort((a, b) => a.offsetTop - b.offsetTop);
};

function findIntersectedTopAndBottom(sizes: EventState[], offsetTop: number, height: number, id: string) {
  return sizes
    .filter(
      (size) =>
        size.id !== id &&
        ((size.offsetTop <= offsetTop && size.offsetTop + size.height > offsetTop) ||
          (size.offsetTop >= offsetTop && offsetTop + height >= size.offsetTop)),
    )
    .sort((a, b) => a.offsetTop - b.offsetTop);
}

const getFullIntersected = (sizes, intersectedWithYou, i) => {
  let fullIntersected = [...intersectedWithYou];
  let intersectedQueue = [...intersectedWithYou];
  while (intersectedQueue && intersectedQueue.length) {
    const currentInQueue = intersectedQueue.shift();
    const nextIntersected = findIntersectedTopAndBottom(sizes, currentInQueue.offsetTop, currentInQueue.height, currentInQueue.id);
    const alreadyInResultIds = fullIntersected.map(({ id }) => id);
    const intersectedToAdd = nextIntersected.filter(({ id }) => !alreadyInResultIds.includes(id));
    intersectedQueue = intersectedQueue.concat(intersectedToAdd);
    fullIntersected = fullIntersected.concat(intersectedToAdd);
  }
  return fullIntersected;
};
const getFullIntersectedTopAndBottom = (sizes: EventState[], intersectedWithYou: EventState[]) => {
  let fullIntersected = [...intersectedWithYou];
  let intersectedQueue = [...intersectedWithYou];
  while (intersectedQueue && intersectedQueue.length) {
    const currentInQueue = intersectedQueue.shift();
    const nextIntersected = findIntersectedTopAndBottom(
      sizes,
      currentInQueue?.offsetTop as number,
      currentInQueue?.height as number,
      currentInQueue?.id as string,
    );
    const alreadyInResultIds = fullIntersected.map(({ id }) => id);
    const intersectedToAdd = nextIntersected.filter(({ id }) => !alreadyInResultIds.includes(id));
    intersectedQueue = intersectedQueue.concat(intersectedToAdd);
    fullIntersected = fullIntersected.concat(intersectedToAdd);
  }
  return fullIntersected;
};

const newSizesAfterPression = (item, moveRight = 0) => {
  const oldWidth = item.width;
  const newWidth = Math.floor(100 / (Math.floor(100 / parseInt(oldWidth)) + 1));
  const oldPos = parseInt(item.offsetLeft) / parseInt(oldWidth);
  const newLeft = (oldPos + moveRight) * newWidth;
  return {
    ...item,
    offsetLeft: `${newLeft}%`,
    width: `${newWidth}%`,
  };
};

const getEducationSizes = (sizes: EventState[], sizesWithTop: EventState[]) => {
  let educations = [...sizesWithTop].filter((size) => size.meta === 'educationState').sort((a, b) => a.offsetTop - b.offsetTop);
  educations.forEach((size, i) => {
    const intersectedWithYou = findIntersectedTopAndBottom([...sizes, ...educations], size.offsetTop, size.height, size.id);
    if (!intersectedWithYou.length) {
      return;
    }

    const minLeftOfIntersected = intersectedWithYou.reduce(
      (res, cur) => {
        if (parseInt(cur.offsetLeft) < parseInt(res.offsetLeft)) {
          res = cur;
        }
        return res;
      },
      { offsetLeft: '100' } as EventState,
    );
    if (parseInt(minLeftOfIntersected.offsetLeft) !== 0) {
      const style = {
        offsetLeft: '0%',
        width: minLeftOfIntersected.width,
      };
      educations[i] = { ...educations[i], ...style };
    } else {
      const fullIntersected = getFullIntersectedTopAndBottom([...sizes, ...educations], intersectedWithYou).filter(
        ({ id }) => id !== size.id,
      );
      let newSizes = fullIntersected.map((item) => newSizesAfterPression(item, 1));
      const stylesForMe = newSizes.reduce((res, curr) => {
        if (parseInt(curr.width) <= (res?.width ? parseInt(res.width) : 100)) {
          res = {
            offsetLeft: '0%',
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
      educations = educations.map((size) => {
        const replacedSize = newSizes.find((item) => {
          return item.id === size.id;
        });
        return replacedSize || size;
      });
    }
  });
  return [...sizes, ...educations];
};

const getLeftAndHeight = (sizesWithTop: EventState[]) => {
  let sizes = [...sizesWithTop].sort((a, b) => a.offsetTop - b.offsetTop).filter((size) => size.meta !== 'educationState');

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
        const cellsNumber = Math.floor(100 / parseInt(intersectedWithYou[0].width));

        if (cellsNumber > intersectedWithYou.length) {
          const allOffsets = Array.from({ length: cellsNumber }, (x, i) => i).map(
            (i: any) => `${i * parseInt(intersectedWithYou[0].width)}%`,
          );
          const exisitingOffsets = intersectedWithYou.map(({ offsetLeft }) => offsetLeft);
          const offsetLeft = allOffsets.find((item) => !exisitingOffsets.includes(item)) as string;
          sizes[i] = {
            ...sizes[i],
            offsetLeft,
            width: intersectedWithYou[0].width,
          };
        } else {
          let newSizes = getFullIntersected(sizes, intersectedWithYou, i)
            .filter(({ id }) => id !== size.id)
            .map((item) => newSizesAfterPression(item));
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

  return getEducationSizes(sizes, sizesWithTop);
};

export const getComponentsSizes = (components: CalendarEvent[], start: number, scaleCoeff = 1, isAsc: boolean, height: number) => {
  const sizesWithTop = components.map(({ startAt: startDate, endAt: endDate, summary, id, meta }) => {
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
      meta,
      startAt,
      summary: `${startAt.year}: ${startAt.monthShort} - ${endAt.year}: ${endAt.monthShort}  ${summary}`,
      id,
    };
  });
  return getLeftAndHeight(sizesWithTop as EventState[]);
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
