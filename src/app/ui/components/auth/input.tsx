interface TextInputProps {
  id: string;
  name: string;
  type: "text" | "email" | "password";
  placeholder: string;
  required?: boolean;
}

const Input: React.FC<TextInputProps> = ({
  id,
  name,
  type,
  placeholder,
  required = false,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-zinc-700"
      placeholder={placeholder}
      required={required}
    />
  );
};

export default Input;
