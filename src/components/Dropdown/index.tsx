import styles from './index.module.scss';
import DropdownItem from './DropdownItem';
import DropdownContent from './DropdownContent';
import DropdownSeparator from './DropdownSeparator';
import DropdownTrigger from './DropdownTrigger';
import DropdownCheckboxItem from './DropdownCheckboxItem';
import { DropdownCompositionProps, DropdownProps } from './index.types';

const Dropdown: DropdownProps & DropdownCompositionProps = ({
  className,
  children,
}) => {
  return <div className={`${styles.dropdown} ${className}`}>{children}</div>;
};

Dropdown.Item = DropdownItem;
Dropdown.Content = DropdownContent;
Dropdown.Separator = DropdownSeparator;
Dropdown.Trigger = DropdownTrigger;
Dropdown.CheckboxItem = DropdownCheckboxItem;

Dropdown.displayName = 'Dropdown';

export default Dropdown;
