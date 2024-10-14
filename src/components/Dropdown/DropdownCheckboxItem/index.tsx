import { forwardRef } from 'react';
import Checkbox from '@/components/Checkbox';
import { DropdownCheckboxItemProps } from './index.types';
import styles from './index.module.scss';

const DropdownCheckboxItem = forwardRef<
  HTMLDivElement,
  DropdownCheckboxItemProps
>(({ className = '', children, checked, ...props }, ref) => (
  <div
    ref={ref}
    className={`${styles.dropdownCheckboxItem} ${className}`}
    {...props}>
    <Checkbox check={checked} />
    {children}
  </div>
));

DropdownCheckboxItem.displayName = 'DropdownCheckboxItem';

export default DropdownCheckboxItem;
