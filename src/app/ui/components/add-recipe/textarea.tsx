import clsx from "clsx";
import { useField } from "formik";

const baseClass = "recipe-form-components";

interface TextAreaProps {
  id: string;
  placeholder: string;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  id,
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
    <div className="relative w-full">
      <textarea
        id={id}
        {...field}
        className={clsx(baseClass, className, "relative")}
        placeholder={placeholder}
        onChange={handleChange}
      ></textarea>
      {meta.touched && meta.error ? (
        <div className="absolute top-10 left-0 text-xs text-[#E74A3B]">
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};
