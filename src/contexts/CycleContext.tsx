import { ReactNode, createContext, useReducer, useState } from 'react';
import { ActionTypes, Cycle, cyclesReducer } from '../reducers/cycles';

interface CreateCycleProps {
  task: string;
  minutesAmount: number;
}

interface CyclesContextProps {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: CreateCycleProps) => void;
  interrupCycle: () => void;
}

export const CyclesContext = createContext<CyclesContextProps>({} as CyclesContextProps);

interface CyclesContextProviderProps {
  children: ReactNode;
}

export function CyclesContextProvider({ children }: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, { cycles: [], activeCycleId: null });

  const { cycles, activeCycleId } = cyclesState;
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cyclesState.cycles.find(cycle => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    dispatch({
      type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
      payload: {
        activeCycleId
      }
    });
  }

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function createNewCycle(data: CreateCycleProps) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    };

    dispatch({
      type: ActionTypes.ADD_NEW_CYCLE
      ,
      payload: {
        newCycle
      }
    });

    setAmountSecondsPassed(0);
  }

  function interrupCycle() {
    dispatch({
      type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
      payload: {
        activeCycleId
      }
    });
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interrupCycle,
        cycles
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
