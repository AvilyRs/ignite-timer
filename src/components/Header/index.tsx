import { Timer, Scroll } from 'phosphor-react';
import { NavLink } from 'react-router-dom';

import logoIgnite from '../../assets/logo-ignite.svg';

import { HeaderContainer } from './styles';

export function Header() {
  const menuIconSize = 24;

  return (
    <HeaderContainer>
      <img src={logoIgnite} alt='Dois Triângulos verdes' />
      <nav>
        <NavLink to='/' title='Timer'>
          <Timer
            size={menuIconSize}
          />
        </NavLink>
        <NavLink to='/history' title='History'>
          <Scroll size={menuIconSize} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
