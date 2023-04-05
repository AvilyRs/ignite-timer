import { useEffect, useState } from 'react';
import { Play } from 'phosphor-react';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInSeconds } from 'date-fns';

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput
} from './styles';

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(60)
});

type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormProps>({
    resolver: zodResolver(newCycleFormValidationSchema)
  });

  const iconSize = 24;

  const taskInputWatcher = watch('task');
  const isSubmitDisabled = !taskInputWatcher;

  function handleCreateNewCycle(data: NewCycleFormProps) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };

    setActiveCycleId(id);
    setAmountSecondsPassed(0);
    setCycles(state => [...state, newCycle]);
    reset();
  }

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        setAmountSecondsPassed(differenceInSeconds(new Date, activeCycle.startDate));
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle]);

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [activeCycle, minutes, seconds]);

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor='task'>Vou trabalhar em</label>
          <TaskInput
            id='task'
            placeholder='Dê um nome para o seu projeto'
            list='task-suggestions'
            required
            {...register('task')}
          />

          <label htmlFor='minutesAmount'>durante</label>
          <MinutesAmountInput
            id='minutesAmount'
            type='number'
            placeholder='00'
            required
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <datalist id='task-suggestions'>
            <option value='Projeto 1' />
            <option value='Projeto 2' />
          </datalist>

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton type='submit' disabled={isSubmitDisabled}>
          <Play size={iconSize} />
            Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
