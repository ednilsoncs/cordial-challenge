import React from 'react';
import styles from './index.module.scss';
import { DropdownItemProps } from './index.types';

const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`${styles.dropdownItem}s ${className}`}
      {...props}
    />
  ),
);

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
