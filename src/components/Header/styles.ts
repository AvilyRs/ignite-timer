import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      height: 3rem;
      width: 3rem;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${props => props.theme['gray-100']};

      border-top: solid 3px transparent;
      border-bottom: solid 3px transparent;

      &:hover {
        border-bottom-color: ${props => props.theme['green-500']};
      }

      &.active {
        color: ${props => props.theme['green-500']};
      }
    }
  }
`;
