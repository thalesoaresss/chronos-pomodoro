import React, { useRef }    from 'react';
import type { TaskModel }   from '../../models/taskModel';
import { DefaultButton }    from '../DefaultButton';
import { DefaultInput }     from '../DafaultInput';
import { Cycles }           from '../Cycles';
import { PlayCircleIcon }   from 'lucide-react';
import { useTaskContext }   from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle }     from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { formatSecondsToMin } from '../../utils/formatSecondsToMin';

export function MainForm() {
  const {state, setState} = useTaskContext()
  const taskNameInput = useRef<HTMLInputElement>(null)
  const nextCycle = getNextCycle(state.currentCycle)
  const nextCycleType = getNextCycleType(nextCycle)

  function handleCreateCycle(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!taskNameInput.current) return

    const taskName = taskNameInput.current.value.trim()
    if (!taskName) {
      alert('Por favor, digite o nome da tarefa.')
      return
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptedDate: null,
      durationInMinutes: state.config[nextCycleType],
      type: nextCycleType,
    }

    const secondsRemaining = newTask.durationInMinutes * 60

    setState(prev => {
      return {
        ...prev,
        activeTask: newTask,
        currentCycle: nextCycle,
        secondsRemaining,
        formatedSecondsRemaining: formatSecondsToMin(secondsRemaining),
        tasks: [...prev.tasks, newTask],
        config: {...prev.config},
      }
    })


  }

  return (
    <form className="form" action="" onSubmit={handleCreateCycle}>
        <div className="formRow">
          <DefaultInput
          id='input'
          type='text'
          labelText={state.activeTask?.name || 'O que você vai fazer?'}
          placeholder='Digite algo'
          ref={taskNameInput}
          />
        </div>

        <div className="formRow">
          <p>Lorem ipsum dolor sit amet.</p>
        </div>

        {state.currentCycle > 0 && (
          <div className="formRow">
            <Cycles />
          </div>
        )}

        <div className="formRow">
          <DefaultButton icon={<PlayCircleIcon/>}/>
        </div>
    </form>
  )
}
