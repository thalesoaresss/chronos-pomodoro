import type { TaskModel } from '../models/taskModel';

export function getNextCycleType(currentCycle: number): TaskModel['type'] {
  if(currentCycle % 2 !== 0) {
    return 'workTime'
  } else return currentCycle === 8 ? 'longBreakTime' : 'shortBreakTime'
}
