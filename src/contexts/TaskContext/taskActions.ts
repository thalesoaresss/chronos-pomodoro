import type { TaskModel } from "../../models/taskModel";
import type { TaskStateModel } from "../../models/taskStateModel";

export enum TaskActionTypes {
  START_TASK = 'START_TASK',
  INTERRUPT_TASK = 'INTERRUPT_TASK',
  RESET_TASK = 'RESET_TASK',
  COUNT_DOWN = 'COUNT_DOWN',
  COMPLETE_TASK = 'COMPLETE_TASK',
  CHANGE_SETTINGS = 'CHANGE_SETTINGS',
}

export type TaskActionModel =
  | {
    type: TaskActionTypes.START_TASK ;
    payload: TaskModel;
  }
  | {
    type: TaskActionTypes.INTERRUPT_TASK ;
  }
  | {
    type: TaskActionTypes.RESET_TASK ;
  }
  | {
    type: TaskActionTypes.COUNT_DOWN ;
    payload: {secondsRemaining: number};
  }
  | {
    type: TaskActionTypes.COMPLETE_TASK ;
  }
  | {
    type: TaskActionTypes.CHANGE_SETTINGS ;
    payload: TaskStateModel['config'];
  }
