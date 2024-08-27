import { useState } from "react";
import Select from "react-select";
import { useField } from "formik";
import { useTranslation } from "react-i18next";
import CreatableSelect from "react-select/creatable";

export interface OptionType {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  name: string;
  label: string;
  options: OptionType[];
  value?: OptionType | null;
  onChange?: (newValue: OptionType | null, actionMeta: any) => void;
  onCreateOption?: (inputValue: string) => void;
  initialState?: OptionType | null;
  isCreatable?: boolean;
  "data-testid"?: string;
}

export const ReactSelect: React.FC<SelectProps> = ({
  id,
  name,
  label,
  options,
  value,
  onChange,
  onCreateOption,
  initialState = null,
  isCreatable = false,
  "data-testid": dataTestId,
}) => {
  const { t } = useTranslation(["dashboard"]);
  const [field, meta, helpers] = useField(name);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(
    value || initialState
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

  const customNoOptionsMessage = () => t("no_options");
  const formatCreateLabel = (inputValue: string) =>
    `${t("add")} "${inputValue}"`;

  const SelectComponent = isCreatable ? CreatableSelect : Select;

  return (
    <div data-testid={dataTestId}>
      <SelectComponent
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
        formatCreateLabel={formatCreateLabel}
        noOptionsMessage={customNoOptionsMessage}
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
    </div>
  );
};
