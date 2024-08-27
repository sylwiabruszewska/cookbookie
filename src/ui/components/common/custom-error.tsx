import { ErrorMessage } from "formik";

interface CustomErrorProps {
  name: string;
  className?: string;
}

export const CustomErrorMessage: React.FC<CustomErrorProps> = ({
  name,
  className,
}) => {
  const errorId = `${name}-error`;

  return (
    <div
      className={className}
      id={errorId}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
      data-testid="custom-error"
    >
      <ErrorMessage name={name} component="div" className="error-text w-full" />
    </div>
  );
};
