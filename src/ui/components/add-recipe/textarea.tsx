import clsx from "clsx";
import { useField } from "formik";

const baseClass = "recipe-form-components";

interface TextAreaProps {
  id: string;
  label: string;
  placeholder: string;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
  label,
  placeholder,
  className,
}) => {
  const [field, meta, helpers] = useField({ name: id });

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    helpers.setValue(event.target.value);
  };

  return (
    <label className="w-full">
      <span className="sr-only">{label}</span>
      <textarea
        id={id}
        {...field}
        className={clsx(
          baseClass,
          className,
          "resize-none hover:resize-y min-h-10 h-20 max-h-[200px]"
        )}
        placeholder={placeholder}
        onChange={handleChange}
      ></textarea>
    </label>
  );
};
