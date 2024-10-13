import { buttonVariants } from '.';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variants.variant;
  size?: keyof typeof buttonVariants.variants.size;
}
