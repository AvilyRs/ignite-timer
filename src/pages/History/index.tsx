import { HistoryContainer, HistoryList, Status } from './styles';

export function History() {
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
            <tr>
              <td>Concerto de débitos técnicos</td>
              <td>25 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td><Status variant='red'>Interrompido</Status></td>
            </tr>
            <tr>
              <td>Concerto de débitos técnicos</td>
              <td>25 minutos</td>
              <td>Há cerca de 2 meses</td>
              <td><Status variant='green'>Concluído</Status></td>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  );
}
