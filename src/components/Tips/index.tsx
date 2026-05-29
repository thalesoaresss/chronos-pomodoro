import { useTaskContext } from "../../contexts/TaskContext/useTaskContext"
import { getNextCycle } from "../../utils/getNextCycle"
import { getNextCycleType } from "../../utils/getNextCycleType"


export function Tips() {
  const {state} = useTaskContext()
  const nextCycle = getNextCycle(state.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  const tipsWhenActiveTask = {
      workTime: <span>Foque por {state.config.workTime}min</span>,
      shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,
      longBreakTime: <span>Aproveite o descanso longo.</span>,
    }
    const tipsForNoActiveTask = {
      workTime: <span>Proximo ciclo e de {state.config.workTime}min</span>,
      shortBreakTime: <span>Proximo descanso e de {state.config.shortBreakTime}min</span>,
      longBreakTime: <span>Proximo descanso sera longo</span>,
    }
  return (
    <>
      {!!state.activeTask && tipsWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForNoActiveTask[nextCycleType]}
    </>
  )
}
