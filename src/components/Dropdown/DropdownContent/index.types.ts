export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  state?: 'open' | 'closed';
  side?: 'bottom' | 'left' | 'right' | 'top';
  onClose?(value: boolean): void;
}
