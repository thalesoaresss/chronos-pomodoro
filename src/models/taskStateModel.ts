import type { TaskModel } from "./taskModel";

export type TaskStateModel = {
  tasks: TaskModel[];
  secondsRemaining: number;
  formatedSecondsRemaining: string;
  activeTask: TaskModel | null;
  currentCycle: number;
  config: {
    workTimeInMinutes: number;
    shortBreakTimeInMinutes: number;
    longBreakTimeInMinutes: number;
  }
}
