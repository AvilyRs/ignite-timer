import { createContext, useState } from 'react';
import { Play } from 'phosphor-react';
import { useForm, FormProvider } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton
} from './styles';

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

interface CyclesContextProps {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60)
});

type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>;

export const CyclesContext = createContext<CyclesContextProps>({} as CyclesContextProps);

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm<NewCycleFormProps>({
    resolver: zodResolver(newCycleFormValidationSchema)
  });

  const { handleSubmit, watch, reset } = newCycleForm;

  const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

  const iconSize = 24;

  const taskInputWatcher = watch('task');
  const isSubmitDisabled = !taskInputWatcher;

  function markCurrentCycleAsFinished() {
    setCycles(state => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle,
          finishedDate: new Date()
        };
      } else {
        return cycle;
      }
    }));
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

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

  function handleInterrupCycle() {
    setCycles(state => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return {
          ...cycle,
          interruptedDate: new Date()
        };
      } else {
        return cycle;
      }
    }));

    setActiveCycleId(null);
  }

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CyclesContext.Provider value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed }}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type='button' onClick={handleInterrupCycle}>
            <Play size={iconSize} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type='submit' disabled={isSubmitDisabled}>
            <Play size={iconSize} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
