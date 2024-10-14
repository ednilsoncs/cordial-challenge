import React from 'react';
import { DropdownTriggerProps } from './index.types';

const DropdownTrigger = React.forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ className = '', triggerRef, ...props }, ref) => (
    <div role="button" ref={triggerRef} className={`${className}`} {...props} />
  ),
);

DropdownTrigger.displayName = 'DropdownTrigger';

export default DropdownTrigger;
