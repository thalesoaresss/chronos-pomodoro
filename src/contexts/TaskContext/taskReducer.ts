import type { TaskStateModel } from "../../models/taskStateModel";
import { formatSecondsToMin } from "../../utils/formatSecondsToMin";
import { getNextCycle } from "../../utils/getNextCycle";
import { initialTaskState } from "./initialTaskState";
import { TaskActionTypes, type TaskActionModel } from "./taskActions";

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const nextCycle = getNextCycle(state.currentCycle)
      const newTask = action.payload
      const secondsRemaining = newTask.durationInMinutes * 60
      return {
         ...state,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining: secondsRemaining,
        formatedSecondsRemaining: formatSecondsToMin(secondsRemaining),
        tasks: [...state.tasks, newTask],
      }
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formatedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if(task.id === state.activeTask?.id) {
            return {...task, interruptedDate: Date.now()}
          }
          return task;
        })
      }
    }
    case TaskActionTypes.RESET_TASK: {
      localStorage.removeItem('tasks')
      return {...initialTaskState}
    }
    case TaskActionTypes.COUNT_DOWN: {
      return {
        ...state,
        secondsRemaining: action.payload.secondsRemaining,
        formatedSecondsRemaining: formatSecondsToMin(action.payload.secondsRemaining),
      }
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formatedSecondsRemaining: '00:00',
        tasks: state.tasks.map(task => {
          if(task.id === state.activeTask?.id) {
            return {...task, completeDate: Date.now()}
          }
          return task;
        })
      }
    }
    case TaskActionTypes.CHANGE_SETTINGS: {
      return {...state, config:{...action.payload}}
    }
  }
  return state
}
