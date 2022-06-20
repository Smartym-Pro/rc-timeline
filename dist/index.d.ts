interface CalendarEvent {
    id?: string;
    startAt?: string;
    endAt?: string;
    summary?: string;
}
interface Item {
    summary: string;
    startDate?: string;
    endDate?: string;
    id?: string;
}
interface NewEventClickData {
    event: Item;
    startAt?: string;
    endAt?: string;
}
type OnEventClickFunc = (data: CalendarEvent, e: React.MouseEvent<HTMLElement>) => void;
type OnEventDragFinishFunc = (updatedEvent: CalendarEvent) => void;
type OnDeleteEventFunc = (id: string) => void;
type OnNewEventClickFunc = (data: NewEventClickData, e: React.MouseEvent<HTMLElement>) => void;
interface _Item1 {
    summary: string;
    startDate?: string;
    endDate?: string;
    id?: string;
}
export type CalendarEventProps = CalendarEvent;
export type OnEventClickData = CalendarEvent;
export type OnNewEventClickData = NewEventClickData;
export type OnEventDragFinish = OnEventDragFinishFunc;
export interface KalendProps {
    items?: _Item1[];
    onNewEventClick?: OnNewEventClickFunc;
    onEventClick?: OnEventClickFunc;
    onEventDragFinish?: OnEventDragFinishFunc;
    onDeleteEvent?: OnDeleteEventFunc;
}
declare const Kalend: (props: KalendProps) => JSX.Element;
export default Kalend;

//# sourceMappingURL=index.d.ts.map
