import React, { useCallback, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';
import { DropdownMenuContentProps } from './index.types';

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ onClose, children, dropdownPosition, isOpen, ...props }) => {
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

  return dropdownPosition && isOpen
    ? ReactDOM.createPortal(
        <div
          ref={dropdownRef}
          className={styles.content}
          style={{
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
          }}
          {...props}>
          {children}
        </div>,
        document.body,
      )
    : null;
});

DropdownMenuContent.displayName = 'DropdownMenuContent';

export default DropdownMenuContent;
