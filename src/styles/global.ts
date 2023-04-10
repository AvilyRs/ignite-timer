import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  :focus {
    outline-style: solid;
    outline-width: 2px;
    outline-offset: 3px;
    outline-color: ${props => props.theme['green-500']};
  }

  body {
    color: ${props => props.theme['gray-300']};
    -webkit-font-smoothing: antialiased;
    background: ${props => props.theme['gray-900']};
  }

  body, textarea, button, input {
    font-family: Roboto, sans-serif;
    font-weight: 400;
  }

  button {
    cursor: pointer;
    color: ${props => props.theme.white};
    border: none;
  }
`;
