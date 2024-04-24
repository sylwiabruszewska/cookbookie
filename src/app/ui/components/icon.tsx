import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";

type IconName = "trash" | "search";

interface IconProps {
  icon: IconName;
  size?: string | number;
  color?: string;
  ariaLabel: string;
  className?: string;
}

const iconMap: Record<IconName, IconDefinition> = {
  trash: faTrash,
  search: faSearch,
};

const Icon: React.FC<IconProps> = ({
  icon,
  size = "4",
  color = "currentColor",
  ariaLabel = "",
  className = "",
}) => {
  const iconClass = `w-${size} h-${size}`;

  const selectedIcon = iconMap[icon];

  return (
    <FontAwesomeIcon
      icon={selectedIcon}
      color={color}
      aria-label={ariaLabel}
      className={`${iconClass} ${className}`}
    />
  );
};

export default Icon;
