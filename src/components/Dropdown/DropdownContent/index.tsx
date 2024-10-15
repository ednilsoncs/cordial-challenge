import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';
import { DropdownMenuContentProps } from './index.types';

const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownMenuContentProps
>(({ onClose, children, dropdownPosition, isOpen, ...props }, ref) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => dropdownRef.current as HTMLDivElement);

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

  return isOpen && dropdownPosition
    ? ReactDOM.createPortal(
        <div
          role="menu"
          ref={dropdownRef}
          className={`${styles.content} ${isOpen ? styles.open : styles.close}`}
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
