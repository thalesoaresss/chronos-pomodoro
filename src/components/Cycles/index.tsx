import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

export function Cycles() {
  const {state} = useTaskContext()
  const cycleSteps = Array.from({ length: state.currentCycle})
  const cycleDescripitionMap = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  }

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleSteps.map((_, index) => {
          const nextCycle = getNextCycle(index)
          const nextCycleType = getNextCycleType(nextCycle)
          return <span
                    key={`${nextCycleType}-${nextCycle}`}
                    aria-label={`indicador de ciclo de ${cycleDescripitionMap[nextCycleType]}`}
                    title={`indicador de ciclo de ${cycleDescripitionMap[nextCycleType]}`}
                    className={`${styles.cycleDot} ${styles[nextCycleType]}`}>
                  </span>
        })}
      </div>
    </div>
  );
}
