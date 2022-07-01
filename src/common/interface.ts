/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateTime } from 'luxon';
export interface CalendarEvent {
  id?: string;
  startAt?: string;
  endAt?: string;
  summary?: string;
  meta?: any;
}

export interface NormalEventPosition {
  event: CalendarEvent;
  height: number;
  offsetTop: number;
  width: number;
  offsetLeft: number;
  zIndex: number;
}

export interface NewEventClickData {
  event: CalendarEvent;
  startAt?: string;
  endAt?: string;
}

export interface EventStyle {
  position: any;
  height: number;
  width: string | number;
  top: number;
  left: number;
  transition?: string;
  zIndex?: number;
  alignItems?: string;
  visibility: any;
  color: string;
  offsetTop?: number;
}
export interface EventState {
  height: number;
  width: string;
  offsetTop: number;
  offsetLeft: string;
  endAt: DateTime;
  startAt: DateTime;
  summary: string;
  id: string;
  type?: 'education' | 'project' | 'company';
  zIndex?: number;
  meta?: any;
}

export interface KalendState {
  width: number;
  height: number;
}

// functions

export type OnEventClickFunc = (data: CalendarEvent, e: React.MouseEvent<HTMLElement>) => void;
export type OnEventDragFinishFunc = (updatedEvent: CalendarEvent) => void;
export type OnDeleteEventFunc = (id: string, meta: string) => void;
export type OnNewEventClickFunc = (data: NewEventClickData, type: string, e: React.MouseEvent<HTMLElement>) => void;

export interface Callbacks {
  onEventDragFinish?: OnEventDragFinishFunc;
  onNewEventClick: OnNewEventClickFunc;
  onEventClick: OnEventClickFunc;
  onDeleteClick?: OnDeleteEventFunc;
}

export interface Style {
  primaryColor: string;
  baseColor: string;
  inverseBaseColor: string;
}

export interface ColorItems {
  primaryColor: string;
}

export interface Colors {
  dark: ColorItems;
  light: ColorItems;
}
