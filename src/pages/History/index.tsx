import { useContext } from 'react';

import { HistoryContainer, HistoryList, Status } from './styles';
import { CyclesContext } from '../../contexts/CycleContext';

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <HistoryContainer>
      <h1>History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map(cycle => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount}</td>
                <td>{cycle.startDate.toISOString()}</td>
                <td>
                  {cycle.finishedDate && (
                    <Status variant='green'>Concluído</Status>
                  )}

                  {cycle.interruptedDate && (
                    <Status variant='red'>Interrompido</Status>
                  )}

                  {!cycle.interruptedDate && !cycle.finishedDate && (
                    <Status variant='yellow'>Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
