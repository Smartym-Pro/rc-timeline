export const onMoveNormalEvent = (e, draggingRef, eventWasChangedRef, offsetTopRef, setState: (key: string, value: number) => void) => {
  if (!draggingRef.current) {
    return;
  }

  // Get column element for day, where event is placed
  const drawPanelElement: Element | null = document.getElementById(`Kalend__draw-panel`);
  if (!drawPanelElement) {
    return;
  }
  const drawPanelElementRect = drawPanelElement.getBoundingClientRect();

  const touches = e.nativeEvent?.touches?.[0];

  // set basic coordinates from movement
  let y: number;

  // handle touch movement
  if (touches) {
    y = touches.clientY - drawPanelElementRect.top;
  } else {
    // handle mouse movement
    // calculate x and y coordinates while following mouse move
    y = e.clientY - drawPanelElementRect.top;
  }
  // restrict draggable space for timetable
  if (y < 0) {
    return;
  }

  eventWasChangedRef.current = true;
  setState('offsetTop', y);
  offsetTopRef.current = y;
};

export const onResizeNormalEvent = (e, endAtRef, offsetTop: number, startStep: number, setState: (key: string, value: number) => void) => {
  // Get column element for day, where event is placed
  const drawPanelElement = document.getElementById(`Kalend__draw-panel`);
  if (!drawPanelElement) {
    return;
  }
  const drawPanelElementRect = drawPanelElement.getBoundingClientRect();

  const touches: any = e.nativeEvent?.touches?.[0];

  // set basic coordinates from movement
  let y: number;

  // handle touch movement
  if (touches) {
    y = touches.clientY - drawPanelElementRect.top;
  } else {
    // handle mouse movement
    y = e.clientY - drawPanelElementRect.top;
  }

  // restrict draggable space for timetable
  if (y <= 0) {
    return;
  }

  setState('height', Math.round(y - offsetTop));
  endAtRef.current = y;
};
