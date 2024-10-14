import * as React from 'react';
import Icons from '../Icons';
import styles from './index.module.scss';
import { CheckProps } from './index.types';

const CheckboxComponent = React.forwardRef<HTMLDivElement, CheckProps>(
  ({ className, check, ...props }, ref) => (
    <div className={styles.checkbox} ref={ref} {...props}>
      <div className={styles.indicator}>{check ? <Icons.Check /> : null}</div>
    </div>
  ),
);
CheckboxComponent.displayName = 'Checkbox';

const Checkbox = React.memo(CheckboxComponent);

export default Checkbox;
