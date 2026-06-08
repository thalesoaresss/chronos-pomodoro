import { useEffect, useReducer, useRef } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";
import { loadBeep } from "../../utils/loadBeep";
import type { TaskStateModel } from "../../models/taskStateModel";

type TaskContextProviderProps = {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps ) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const storageState = localStorage.getItem('state') || null

    if(!storageState) return initialTaskState

    const parsedState = JSON.parse(storageState) as TaskStateModel
    return {
      ...parsedState,
      activeTask: null,
      secondsRemaining: 0,
      formatedSecondsRemaining: '00:00',
    }

  });
  const worker = TimerWorkerManager.getInstance()
  const playBeepRef = useRef<() => void | null>(null)

  worker.onmessage((e) => {
    const countdownSeconds = e.data
    if(countdownSeconds <= 0) {
      if(playBeepRef.current) {
        playBeepRef.current()
        playBeepRef.current = null
      }
      dispatch({type: TaskActionTypes.COMPLETE_TASK})
      worker.terminate()
    }else {
      dispatch({type: TaskActionTypes.COUNT_DOWN, payload: {secondsRemaining: countdownSeconds}})
    }
  })

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(state))
    if(!state.activeTask) {
      worker.terminate()
    }else {
      worker.postMessage(state)
      document.title = `${state.formatedSecondsRemaining} - Chronos Pomodoro`
    }
  }, [worker, state])

  useEffect(() => {
    if(state.activeTask && playBeepRef.current === null) {
      playBeepRef.current = loadBeep()
    }else playBeepRef.current = null
  }, [state.activeTask])

  return (
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  )
}
