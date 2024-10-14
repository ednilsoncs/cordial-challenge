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
  const contentRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  } | null>({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const { top, bottom, left, width } =
        triggerRef.current.getBoundingClientRect();
      const contentHeight =
        contentRef.current?.getBoundingClientRect().height || 0;

      switch (side) {
        case 'top':
          setDropdownPosition({
            top: top - contentHeight,
            left,
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
  }, [isOpen, side, contentRef]);

  return (
    <div className={styles.dropdown} ref={triggerRef}>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === Dropdown.Trigger) {
          return React.cloneElement<any>(child, {
            ref: triggerRef,
            dropdownPosition,
            isOpen,
            onClose,
          });
        }

        if (React.isValidElement(child) && child.type === Dropdown.Content) {
          return React.cloneElement<any>(child, {
            ref: contentRef,
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
