import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useField } from "formik";

export interface OptionType {
  value: string;
  label: string;
}

interface IngredientCreatableSelectProps {
  id: string;
  name: string;
  label: string;
  options: OptionType[];
  value?: OptionType | null;
  onChange?: (newValue: OptionType | null, actionMeta: any) => void;
  onCreateOption?: (inputValue: string) => void;
}

const IngredientCreatableSelect: React.FC<IngredientCreatableSelectProps> = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  onCreateOption,
}) => {
  const [field, meta, helpers] = useField(name);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    value || null
  );

  const handleChangeSelect = (newValue: OptionType | null, actionMeta: any) => {
    setSelectedOption(newValue);
    if (onChange) {
      onChange(newValue, actionMeta);
    }
    helpers.setValue(newValue?.value);
  };

  const handleCreateOption = (inputValue: string) => {
    const newOption: OptionType = {
      value: inputValue.toLowerCase(),
      label: inputValue,
    };
    setSelectedOption(newOption);
    if (onCreateOption) {
      onCreateOption(inputValue);
    }
    helpers.setValue(inputValue);
  };

  return (
    <CreatableSelect
      {...field}
      id={id}
      name={name}
      value={selectedOption}
      onChange={handleChangeSelect}
      onCreateOption={handleCreateOption}
      options={options}
      placeholder={label}
      isClearable
      className="react-select-container"
      classNamePrefix="react-select"
      styles={{
        control: (base, state) => ({
          ...base,
          borderColor: "transparent",
          backgroundColor: "transparent",
          borderRadius: "0.375rem",
          width: "100%",
          height: "40px",
          boxShadow: state.isFocused ? "0 0 0 2px rgba(0, 0, 0, 1)" : "none",
          "&:hover": {
            borderColor: "transparent",
          },
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? "#8baa36"
            : state.isFocused
            ? "#8baa36"
            : "transparent",
        }),
      }}
    />
  );
};

export default IngredientCreatableSelect;
