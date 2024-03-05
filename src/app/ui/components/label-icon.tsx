import React, { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

interface IconProps {
  icon: IconDefinition;
  size?: string | number;
  color?: string;
  ariaLabel?: string;
  className?: string;
}

const LabelIcon: React.FC<IconProps> = ({
  icon,
  size = "5",
  color = "currentColor",
  ariaLabel = "",
  className = "mr-4",
}) => {
  return (
    <div className={`w-${size} h-${size} ${className}`}>
      <FontAwesomeIcon icon={icon} color={color} aria-label={ariaLabel} />
    </div>
  );
};

export default LabelIcon;
