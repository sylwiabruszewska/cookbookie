interface TextInputProps {
  id: string;
  name: string;
  type: "text" | "email" | "password";
  placeholder: string;
  required?: boolean;
  iconID?: string;
}

const Input: React.FC<TextInputProps> = ({
  id,
  name,
  type,
  placeholder,
  required = true,
  iconID,
}) => {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={id}
        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-zinc-700 transition duration-150 ease-in-out"
        placeholder={placeholder}
        required={required}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-gray-400"
          stroke="#8c8c8c"
          fill="transparent"
          viewBox="0 0 20 20"
        >
          <use href={`/icons.svg#${iconID}`}></use>
        </svg>
      </div>
    </div>
  );
};

export default Input;
