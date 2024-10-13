import React from 'react';
import { DropdownTriggerProps } from './index.types';

const DropdownTrigger = React.forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ className = '', ...props }, ref) => (
    <div role="button" ref={ref} className={`${className}`} {...props} />
  ),
);

DropdownTrigger.displayName = 'DropdownTrigger';

export default DropdownTrigger;
