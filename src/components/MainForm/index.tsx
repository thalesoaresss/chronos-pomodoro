import React, { useRef }    from 'react';
import type { TaskModel }   from '../../models/taskModel';
import { DefaultButton }    from '../DefaultButton';
import { DefaultInput }     from '../DafaultInput';
import { Cycles }           from '../Cycles';
import { PlayCircleIcon, StopCircleIcon }   from 'lucide-react';
import { useTaskContext }   from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle }     from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';

export function MainForm() {
  const {state, dispatch} = useTaskContext()
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

    dispatch({type: TaskActionTypes.START_TASK, payload: newTask})
  }

  function handleInterruptTask() {
    dispatch({type: TaskActionTypes.INTERRUPT_TASK})
  }

  return (
    <form className='form' action='' onSubmit={handleCreateCycle}>
        <div className='formRow'>
          <DefaultInput
          id='input'
          type='text'
          labelText={state.activeTask?.name || 'O que você vai fazer?'}
          placeholder='Digite algo'
          ref={taskNameInput}
          disabled={!!state.activeTask}
          />
        </div>

        <div className="formRow">
          <Tips />
        </div>

        {state.currentCycle > 0 && (
          <div className="formRow">
            <Cycles />
          </div>
        )}

        <div className="formRow">
          {!state.activeTask ? (
            <DefaultButton
              type='submit'
              aria-label='Iniciar nova tarefa'
              title='Iniciar nova tarefa'
              icon={<PlayCircleIcon/>}
              key='start'
            />
          ) : (
            <DefaultButton
              type='button'
              aria-label='Interrompertarefa atual'
              title='Interromper tarefa atual'
              color='red'
              icon={<StopCircleIcon/>}
              onClick={handleInterruptTask}
              key='stop'
            />
          )}
        </div>
    </form>
  )
}
