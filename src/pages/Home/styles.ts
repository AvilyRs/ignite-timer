import styled from 'styled-components';

export const HomeContainer = styled.main`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  width: 100%;

  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => props.theme['gray-100']};
`;

export const CountdownContainer = styled.div`
  display: flex;
  gap: 1rem;

  font-family: 'Roboto Mono', monospace;
  font-size: 10rem;
  line-height: 8rem;
  color: ${props => props.theme['gray-100']};

  span {
    padding: 2rem 1rem;
    border-radius: 8px;
    background: ${props => props.theme['gray-700']};
  }
`;

export const Separator = styled.div`
  display: flex;
  justify-content: center;

  padding: 2rem 0;
  color: ${props => props.theme['green-500']};

  width: 4rem;
  overflow: hidden;
`;

export const StartCountdownButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  font-weight: 700;
  color: ${props => props.theme['gray-100']};
  width: 100%;
  padding: 1rem;
  border-radius: 8px;

  background: ${props => props.theme['green-500']};

  &:not(:disabled):hover {
    background: ${props => props.theme['green-700']};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const BaseInput = styled.input`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${props => props.theme['gray-100']};

  height: 2.5rem;
  border: 0;
  padding: 0 0.5rem;
  border-bottom: 2px solid ${props => props.theme['gray-500']};
  background: transparent;

  &::placeholder {
    color: ${props => props.theme['gray-500']};
  }

  &:focus {
    outline: unset;
    border-color: ${props => props.theme['green-500']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  max-width: 4rem;
`;
