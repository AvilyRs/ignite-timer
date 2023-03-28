import styled, { css } from 'styled-components';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success'

interface ButtonContainerProps {
  variant: ButtonVariant
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  padding: 1rem 2.5rem;

  ${props => css`background: ${props.theme['green-500']};`}
`;