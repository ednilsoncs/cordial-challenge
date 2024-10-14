import * as React from 'react';
import styles from './index.module.scss';
import type { ButtonProps } from './index.types';

export const buttonVariants = {
  variants: {
    variant: {
      default: styles.default,
      destructive: styles.destructive,
      outline: styles.outline,
      ghost: styles.ghost,
    },
    size: {
      default: styles.default_size,
      sm: styles.sm,
      lg: styles.lg,
      icon: styles.icon,
    },
  },
  defaultVariants: {
    variant: styles.default,
    size: styles.default_size,
  },
};

const ButtonComponent = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const Comp = 'button';
    return (
      <Comp
        className={`${styles.base} ${
          variant
            ? buttonVariants.variants.variant[variant]
            : buttonVariants.defaultVariants.variant
        } ${
          size
            ? buttonVariants.variants.size[size]
            : buttonVariants.defaultVariants.size
        } ${className}`}
        ref={ref}
        {...props}
      />
    );
  },
);

ButtonComponent.displayName = 'Button';

const Button = React.memo(ButtonComponent);

export default Button;
