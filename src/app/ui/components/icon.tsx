import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface IconProps {
  icon: IconDefinition;
  size?: string | number;
  color?: string;
  ariaLabel?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  icon,
  size = "4",
  color = "currentColor",
  ariaLabel,
  className,
}) => {
  return (
    <FontAwesomeIcon
      icon={icon}
      color={color}
      aria-label={ariaLabel}
      className={`w-${size} h-${size} ${className}`}
    />
  );
};

export default Icon;
