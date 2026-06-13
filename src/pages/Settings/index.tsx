import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DafaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { showMessage } from '../../adapters/showMessage';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInput = useRef<HTMLInputElement>(null)
  const shortBreakTimeInput = useRef<HTMLInputElement>(null)
  const longBreakTimeInput = useRef<HTMLInputElement>(null)

  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    showMessage.dismiss();
    const workTime = Number(workTimeInput.current?.value);
    const shortBreakTime = Number(shortBreakTimeInput.current?.value);
    const longBreakTime = Number(longBreakTimeInput.current?.value);

    if(isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      showMessage.error('Por favor, insira apenas valores numéricos válidos para todas as configurações.');
      return;
    }

    if(workTime <= 0 || shortBreakTime <= 0 || longBreakTime <= 0) {
      showMessage.error('Por favor, insira valores maiores que zero para todas as configurações.');
      return;
    }

    if(workTime > 90 ) {
      showMessage.error('O tempo de foco deve ser no máximo 90 minutos.');
      return;
    }
    if(shortBreakTime > 30) {
      showMessage.error('O tempo de descanso curto deve ser no máximo 30 minutos.');
      return;
    }
    if(longBreakTime > 60) {
      showMessage.error('O tempo de descanso longo deve ser no máximo 60 minutos.');
      return;
    }

    dispatch({type: TaskActionTypes.CHANGE_SETTINGS, payload: {workTime, shortBreakTime, longBreakTime}})
    showMessage.success('Configurações salvas com sucesso!');
  }
  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>

      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curso e
          descanso longo.
        </p>
      </Container>

      <Container>
        <form action='' className='form' onSubmit={handleSaveSettings}>
          <div className='formRow'>
            <DefaultInput id='workTime' labelText='Foco'  defaultValue={state.config.workTime} type='number' ref={workTimeInput} />
          </div>
          <div className='formRow'>
            <DefaultInput id='shortBreakTime' labelText='Descanso curto'  defaultValue={ state.config.shortBreakTime } type='number' ref={shortBreakTimeInput} />
          </div>
          <div className='formRow'>
            <DefaultInput id='longBreakTime' labelText='Descanso longo'   defaultValue={ state.config.longBreakTime } type='number' ref={longBreakTimeInput} />
          </div>
          <div className='formRow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
