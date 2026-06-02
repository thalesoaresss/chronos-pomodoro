import { useEffect, useReducer } from "react";
import { initialTaskState } from "./initialTaskState";
import { TaskContext } from "./TaskContext";
import { taskReducer } from "./taskReducer";
import { TimerWorkerManager } from "../../workers/TimerWorkerManager";
import { TaskActionTypes } from "./taskActions";

type TaskContextProviderProps = {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps ) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);
  const worker = TimerWorkerManager.getInstance()

  worker.onmessage((e) => {
    const countdownSeconds = e.data
    console.log(countdownSeconds)
    if(countdownSeconds <= 0) {
       dispatch({type: TaskActionTypes.COMPLETE_TASK})
      worker.terminate()
    }else {
      dispatch({type: TaskActionTypes.COUNT_DOWN, payload: {secondsRemaining: countdownSeconds}})
    }
  })

  useEffect(() => {
    if(!state.activeTask) {
      console.log('terminando worker: sem tarefa ativa')
      worker.terminate()
    }else {
      worker.postMessage(state)
    }
  }, [worker, state])

  return (
    <TaskContext.Provider value={{state, dispatch}}>
      {children}
    </TaskContext.Provider>
  )
}
