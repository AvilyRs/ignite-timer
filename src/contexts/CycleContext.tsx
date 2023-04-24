import { ReactNode, createContext, useReducer, useState } from 'react';

interface CyclesState {
  cycles: Cycle[];
  activeCycleId: string | null;
}

interface CreateCycleProps {
  task: string;
  minutesAmount: number;
}

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
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
  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      };
    }

    if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
      return {
        ...state,
        cycles: state.cycles.map(cycle => {
          if (cycle.id === state.activeCycleId) {
            return {
              ...cycle,
              interruptedDate: new Date()
            };
          } else {
            return cycle;
          }
        }),
        activeCycleId: null
      };
    }

    return state;
  }, {
    cycles: [],
    activeCycleId: null
  });

  const { cycles, activeCycleId } = cyclesState;
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cyclesState.cycles.find(cycle => cycle.id === activeCycleId);

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    });
    // setCycles(state => state.map(cycle => {
    //   if (cycle.id === activeCycleId) {
    //     return {
    //       ...cycle,
    //       finishedDate: new Date()
    //     };
    //   } else {
    //     return cycle;
    //   }
    // }));
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
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    });

    setAmountSecondsPassed(0);
    // setCycles(state => [...state, newCycle]);
  }

  function interrupCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
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
