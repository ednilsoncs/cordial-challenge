import React, { useCallback, useEffect, useRef } from 'react';
import styles from './index.module.scss';
import { DropdownMenuContentProps } from './index.types';

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(
  ({
    className = '',
    state = 'closed',
    side = 'bottom',
    onClose,
    ...props
  }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          onClose
        ) {
          onClose(false);
        }
      },
      [onClose],
    );

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [handleClickOutside]);

    const getSideClass = () => {
      switch (side) {
        case 'top':
          return styles.fromTop;
        case 'bottom':
          return styles.fromBottom;
        case 'left':
          return styles.fromLeft;
        case 'right':
          return styles.fromRight;
        default:
          return styles.fromBottom;
      }
    };
    console.log(state);
    return (
      <div
        ref={dropdownRef}
        className={`
            ${styles.content}
            ${state === 'open' ? styles.open : styles.closed}
            ${getSideClass()}
            ${className}
          `}
        {...props}
      />
    );
  },
);

DropdownMenuContent.displayName = 'DropdownMenuContent';

export default DropdownMenuContent;
