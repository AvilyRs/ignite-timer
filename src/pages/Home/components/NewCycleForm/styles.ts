import styled from 'styled-components';

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
