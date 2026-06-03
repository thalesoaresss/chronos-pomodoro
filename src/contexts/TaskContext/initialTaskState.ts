import type { TaskStateModel } from "../../models/taskStateModel";

export const initialTaskState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formatedSecondsRemaining: "00:00",
  activeTask: null,
  currentCycle: 0,
  config: {
    workTime: 0.1,
    shortBreakTime: 0.1,
    longBreakTime: 0.1,
  }
}
