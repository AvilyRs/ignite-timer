import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  FormContainer,
  MinutesAmountInput,
  TaskInput
} from './styles';
import { CyclesContext } from '../../../../contexts/CycleContext';

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext);
  const { register } = useFormContext();

  return (
    <FormContainer>
      <label htmlFor='task'>Vou trabalhar em</label>
      <TaskInput
        id='task'
        placeholder='Dê um nome para o seu projeto'
        list='task-suggestions'
        required
        disabled={!!activeCycle}
        {...register('task')}
      />

      <label htmlFor='minutesAmount'>durante</label>
      <MinutesAmountInput
        id='minutesAmount'
        type='number'
        placeholder='00'
        required
        step={5}
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <datalist id='task-suggestions'>
        <option value='Projeto 1' />
        <option value='Projeto 2' />
      </datalist>

      <span>minutos.</span>
    </FormContainer>
  );
}
