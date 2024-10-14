export interface DropdownMenuContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onClose?(value: boolean): void;
  dropdownPosition: {
    top: number;
    left: number;
  };
  isOpen: boolean;
}
