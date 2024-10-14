import React, { useRef, useEffect, useState } from 'react';
import styles from './index.module.scss';
import DropdownItem from './DropdownItem';
import DropdownContent from './DropdownContent';
import DropdownSeparator from './DropdownSeparator';
import DropdownTrigger from './DropdownTrigger';
import DropdownCheckboxItem from './DropdownCheckboxItem';
import { DropdownCompositionProps, DropdownProps } from './index.types';

const Dropdown: DropdownProps & DropdownCompositionProps = ({
  children,
  isOpen,
  side,
  onClose,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const { top, bottom, left, width } =
        triggerRef.current.getBoundingClientRect();
      console.log(side);
      switch (side) {
        case 'top':
          setDropdownPosition({
            top: top - triggerRef.current.offsetHeight,
            left: triggerRef.current.offsetWidth,
          });
          break;
        case 'bottom':
          setDropdownPosition({ top: bottom, left });
          break;
        case 'left':
          setDropdownPosition({
            top,
            left: left - triggerRef.current.offsetWidth,
          });
          break;
        case 'right':
          setDropdownPosition({ top, left: left + width });
          break;
        default:
          setDropdownPosition({ top: bottom, left });
      }
    }
  }, [isOpen, side]);

  return (
    <div className={styles.dropdown} ref={triggerRef}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === Dropdown.Trigger) {
          return React.cloneElement(child, {
            triggerRef,
            dropdownPosition,
            isOpen,
            onClose,
          });
        }

        if (React.isValidElement(child) && child.type === Dropdown.Content) {
          return React.cloneElement(child, {
            dropdownPosition,
            isOpen,
            onClose,
          });
        }
        return null;
      })}
    </div>
  );
};

Dropdown.Item = DropdownItem;
Dropdown.Content = DropdownContent;
Dropdown.Separator = DropdownSeparator;
Dropdown.Trigger = DropdownTrigger;
Dropdown.CheckboxItem = DropdownCheckboxItem;

Dropdown.displayName = 'Dropdown';

export default Dropdown;
