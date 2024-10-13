import * as React from 'react';
import styles from './index.module.scss';
import { LabelProps } from './index.types';

const LabelComponent = React.forwardRef<HTMLSpanElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={styles.label} {...props} />
  ),
);

LabelComponent.displayName = 'Label';

const Label = React.memo(LabelComponent);

export default Label;
