import React from 'react';
import classNames from 'classnames';

import { ClickOutside } from '@components/ClickOutside';
import { DropdownMenuProps } from './types';

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  items,
  children,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative flex items-center content-center">
      <ClickOutside handleClickOutside={() => setIsVisible(false)}>
        {children({
          isVisible,
          toggleDropdown: () => {
            setIsVisible(!isVisible);
          },
        })}
      </ClickOutside>

      {isVisible && (
        <div className="relative z-20">
          <ul
            className={classNames([
              'flex flex-col',
              'shadow',
              'max-w-xs',
              'border rounded dark:border-gray-500',
              'divide-y divide-gray-200 dark:divide-gray-500',
              'absolute right-0 top-5',
              'bg-white dark:bg-gray-800',
            ])}
          >
            {items}
          </ul>
        </div>
      )}
    </div>
  );
};

export const DropdownMenuItem = (
  props: React.ComponentPropsWithoutRef<'li'>,
) => {
  return (
    <li
      className={classNames([
        'text-base font-sans text-center',
        'cursor-pointer',
        'py-2 px-6',
        'whitespace-nowrap',
        'flex-1',
      ])}
      {...props}
    />
  );
};
