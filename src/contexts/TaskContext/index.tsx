import React, { createContext, useContext, useState } from "react";
import type { TaskStateModel } from "../../models/taskStateModel";

const initialState: TaskStateModel = {
  tasks: [],
  secondsRemaining: 0,
  formatedSecondsRemaining: "00:00",
  activeTask: null,
  currentCycle: 0,
  config: {
    workTimeInMinutes: 25,
    shortBreakTimeInMinutes: 5,
    longBreakTimeInMinutes: 15,
  }
}

type TaskContextProps = {
  state: TaskStateModel;
  setState: React.Dispatch<React.SetStateAction<TaskStateModel>>;
}
const initialContextValue = {
  state: initialState,
  setState: () => {}
}

export const TaskContext = createContext<TaskContextProps>( initialContextValue );

type TaskContextProviderProps = {
  children: React.ReactNode;
}

export function TaskContextProvider({ children }: TaskContextProviderProps ) {
  const [state, setState] = useState(initialState);
  return (
    <TaskContext.Provider value={{state, setState}}>
      {children}
    </TaskContext.Provider>
  )
}

export function useTaskContext() {
  return useContext(TaskContext);
}
