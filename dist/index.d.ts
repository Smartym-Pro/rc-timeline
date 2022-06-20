export interface CalendarEvent {
    id?: string;
    startAt?: string;
    endAt?: string;
    summary?: string;
    meta?: any;
}
interface NewEventClickData {
    event: CalendarEvent;
    startAt?: string;
    endAt?: string;
}
type OnEventClickFunc = (data: CalendarEvent, e: React.MouseEvent<HTMLElement>) => void;
type OnEventDragFinishFunc = (updatedEvent: CalendarEvent) => void;
type OnDeleteEventFunc = (id: string) => void;
type OnNewEventClickFunc = (data: NewEventClickData, e: React.MouseEvent<HTMLElement>) => void;
export type OnEventClickData = CalendarEvent;
export type OnNewEventClickData = NewEventClickData;
export type OnEventDragFinish = OnEventDragFinishFunc;
export interface TimelineProps {
    items?: CalendarEvent[];
    onNewEventClick?: OnNewEventClickFunc;
    onEventClick?: OnEventClickFunc;
    onEventDragFinish?: OnEventDragFinishFunc;
    onDeleteEvent?: OnDeleteEventFunc;
    sortDirection?: 'ASC' | 'DESC';
}
declare const Timeline: (props: TimelineProps) => JSX.Element;
export default Timeline;

//# sourceMappingURL=index.d.ts.map
