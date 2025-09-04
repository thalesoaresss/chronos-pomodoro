import './styles/theme.css';
import './styles/global.css';
import { Heading } from './components/Heading';
import { TimerIcon } from 'lucide-react';

export function App() {
  return (
    <>
      <Heading>Chronos Pomodoro <button><TimerIcon /></button></Heading>
    </>
  )
}
