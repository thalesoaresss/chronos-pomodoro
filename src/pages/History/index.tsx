import { TrashIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { formatDate } from '../../utils/formatDate';
import { getTaskStatus } from '../../utils/getTaskStatus';
import { showMessage } from '../../adapters/showMessage';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function History() {
  const {state, dispatch} = useTaskContext()
  const [confirmClearHistory, setConfirmClearHistory] = useState(false);
  const sortedTasks  = [...state.tasks].sort((a, b) => { return b.startDate - a.startDate })
  const hasTasks = state.tasks.length > 0;

  useEffect(() => {
    if(!confirmClearHistory) return;

    setConfirmClearHistory(false);
    dispatch({ type: TaskActionTypes.RESET_TASK });
  }, [confirmClearHistory, dispatch])

  useEffect(() => {return () => showMessage.dismiss()}, [])

  function handleDeleteHistory() {
    showMessage.dismiss()
    showMessage.confirm('Tem certeza que deseja apagar todo o histórico?', (confirmation) => {
      setConfirmClearHistory(confirmation);
    })
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>History</span>
            {hasTasks  && (
              <span className={styles.buttonContainer}>
                <DefaultButton
                  icon={<TrashIcon />}
                  color='red'
                  aria-label='Apagar todo o histórico'
                  title='Apagar histórico'
                  onClick={handleDeleteHistory}
                />
              </span>
            )}
        </Heading>
      </Container>

      <Container>
        {hasTasks  && (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th>Tarefa</th>
                  <th>Duração</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>

              <tbody>
                {sortedTasks.map((task) => {
                  const taskType = {
                    workTime: 'Foco',
                    shortBreakTime: 'Descanso curto',
                    longBreakTime: 'Descanso longo'
                  }
                  return (
                    <tr key={task.id}>
                      <td>{task.name}</td>
                      <td>{task.durationInMinutes}min</td>
                      <td>{formatDate(task.startDate)}</td>
                      <td>{getTaskStatus(task, state.activeTask)}</td>
                      <td>{taskType[task.type]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        {!hasTasks  && <p style={{textAlign: 'center', fontWeight: 'bold'}}>Ainda nao existem tarefas criadas.</p>}
      </Container>
    </MainTemplate>
  );
}
