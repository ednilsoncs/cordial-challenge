import React from 'react';
import styles from './index.module.scss';
import { DropdownSeparatorProps } from './index.types';

const DropdownSeparator = React.forwardRef<
  HTMLDivElement,
  DropdownSeparatorProps
>(({ className = '', ...props }, ref) => (
  <div ref={ref} className={`${styles.container} ${className}`} {...props} />
));

DropdownSeparator.displayName = 'DropdownSeparator';

export default DropdownSeparator;
