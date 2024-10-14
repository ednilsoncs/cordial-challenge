import DropdownItem from './DropdownItem';
import DropdownContent from './DropdownContent';
import DropdownSeparator from './DropdownSeparator';
import DropdownTrigger from './DropdownTrigger';
import DropdownCheckboxItem from './DropdownCheckboxItem';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  isOpen: boolean;
  side?: 'bottom' | 'left' | 'right' | 'top';
  onClose?(value: boolean): void;
}

export type DropdownCompositionProps = {
  Item: typeof DropdownItem;
  Content: typeof DropdownContent;
  Separator: typeof DropdownSeparator;
  Trigger: typeof DropdownTrigger;
  CheckboxItem: typeof DropdownCheckboxItem;
};

export type DropdownProps = React.FC<Props>;
