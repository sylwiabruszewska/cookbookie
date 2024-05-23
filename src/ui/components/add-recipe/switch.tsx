import { Field, useFormikContext } from "formik";

interface SwitchProps {
  name: string;
}

export const Switch: React.FC<SwitchProps> = ({ name }) => {
  const { setFieldValue, values } = useFormikContext<any>();
  const isPublic = values[name];

  const handleToggle = () => {
    setFieldValue(name, !isPublic);
  };

  return (
    <Field name={name}>
      {() => (
        <label className="cursor-pointer inline-flex items-center space-x-4 w-auto">
          <button
            type="button"
            aria-pressed={isPublic}
            onClick={handleToggle}
            className={`relative w-12 h-6 duration-300 rounded-full cursor-pointerfocus:outline-none focus:ring-2 focus:ring-[--gray-dark] inner-shadow ${
              isPublic ? "bg-[--gray-light]" : "bg-[--primary-color]"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full outer-shadow transform duration-300 ${
                isPublic ? "translate-x-0" : "translate-x-6"
              }`}
            ></div>
          </button>
          <span>{isPublic ? "Public" : "Private"}</span>
        </label>
      )}
    </Field>
  );
};
