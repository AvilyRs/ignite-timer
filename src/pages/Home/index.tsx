import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CycleContext';
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

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(1).max(60)
});

type NewCycleFormProps = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
  const { createNewCycle, interrupCycle, activeCycle } = useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormProps>({
    resolver: zodResolver(newCycleFormValidationSchema)
  });

  const { handleSubmit, watch, /* reset */ } = newCycleForm;

  const iconSize = 24;

  const taskInputWatcher = watch('task');
  const isSubmitDisabled = !taskInputWatcher;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)}>

        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type='button' onClick={interrupCycle}>
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
