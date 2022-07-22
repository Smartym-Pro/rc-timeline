export interface EventButtonInitialState {
  dragging: boolean;
  initialTop: number;
  initialLeft: number;
  offsetTop: number | null;
  offsetLeft: number | null;
  eventHasChanged: boolean;
  width: number | null;
  height: number | null;
  zIndex: number;
  border: string;
  isDragging: boolean;
  endAt: string | undefined;
}

export const eventButtonInitialState: EventButtonInitialState = {
  dragging: false,
  initialTop: 0,
  initialLeft: 0,
  offsetTop: null,
  offsetLeft: null,
  eventHasChanged: false,
  width: null,
  height: null,
  zIndex: 2,
  border: '',
  isDragging: false,
  endAt: undefined,
};

export const disableTouchDragging = (e: any): boolean => {
  const touches: any = e.nativeEvent?.touches?.[0];

  return !!touches;
};
