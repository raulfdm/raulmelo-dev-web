import { ClickOutside } from '@raulfdm/blog-components';
import { createMachine } from '@xstate/fsm';
import { useMachine } from '@xstate/react/lib/fsm';
import React from 'react';
import tw from 'twin.macro';
import { DropdownMenuProps } from './types';

type ToggleEvent = {
  type: 'TOGGLE';
};
type TurnOffEvent = {
  type: 'TURN_OFF';
};

type MachinesEvent = ToggleEvent | TurnOffEvent;

const dropdownMachine = createMachine<never, MachinesEvent>({
  initial: 'hidden',
  states: {
    hidden: {
      on: {
        TOGGLE: 'visible',
      },
    },
    visible: {
      on: {
        TOGGLE: 'hidden',
        TURN_OFF: 'hidden',
      },
    },
  },
});

const List = tw.ul`
  shadow
  max-w-xs
  border rounded 
  dark:border-gray-400
  divide-y divide-gray-200
  dark:divide-gray-500
  absolute right-0
  top-5
  bg-white dark:bg-blue-800
`;

export const DropdownMenuItem = tw.li`
  text-base
  font-sans
  text-center
  cursor-pointer
  py-2 px-6
  whitespace-nowrap
  flex-1
`;

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  children,
}) => {
  const [current, send] = useMachine(dropdownMachine);

  const isVisible = current.matches('visible');

  return (
    <ClickOutside onClickOutside={() => send('TURN_OFF')}>
      <div className="relative flex items-center content-center">
        {children({
          isVisible,
          toggleDropdown: () => {
            send('TOGGLE');
          },
        })}

        {isVisible && (
          <div className="relative z-20">
            <List
              onClick={(event) => {
                event.persist();
                send('TURN_OFF');
              }}
            >
              {items}
            </List>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};
