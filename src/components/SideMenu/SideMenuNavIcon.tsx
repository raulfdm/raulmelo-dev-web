import React from 'react';

import { MenuButton } from '@components/MenuBar';
import { useApp } from '@hooks/useApp';
import { Menu, Close } from '@icons';

export const SideMenuNavIcon = () => {
  const { sideMenu } = useApp();

  const Icon = sideMenu.isCollapsed ? Menu : Close;
  return (
    <MenuButton onClick={sideMenu.toggle} data-testid="side-menu-button">
      <Icon width={21} />
    </MenuButton>
  );
};
