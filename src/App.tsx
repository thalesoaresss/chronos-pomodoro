import './styles/theme.css';
import './styles/global.css';

import { Container }      from './components/Container';
import { CountDown }      from './components/CountDown';
import { Cycles }         from './components/Cycles';
import { DefaultInput }   from './components/DafaultInput';
import { DefaultButton }  from './components/DefaultButton';
import { Footer }         from './components/Footer';
import { Logo }           from './components/Logo';
import { Menu }           from './components/Menu';
import { PlayCircleIcon } from 'lucide-react';


export function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>

      <Container>
        <form className="form" action="">
          <div className="formRow">
            <DefaultInput
              id='input'
              type='text'
              labelText='task'
              placeholder='Digite algo'
            />
          </div>

          <div className="formRow">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>

          <div className="formRow">
            <Cycles />
          </div>

          <div className="formRow">
            <DefaultButton icon={<PlayCircleIcon/>}/>
          </div>
        </form>
      </Container>

      <Container>
        <Footer />
      </Container>
    </>
  )
}
