import React, { useState, useRef, forwardRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import Button from "./button";
import type { InputRef, SelectProps } from "antd";
import styled from "@emotion/styled";
import { Poppins } from "next/font/google";

interface CustomDropDownProps extends SelectProps {
  defaultOption: string[];
  dropdownPlaceholder?: string;
  buttonName?: string;
  toAddItemPlaceholder?: string;
  addClass?: string;
  hasError?: boolean;
  helperText?: string;
}

const Font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const InputContainer = styled.div`
  display: flex;
  gap: 0.6rem;
  font-size: 1rem;
  margin-top: 0.4rem;

  button,
  input {
    height: 2.2rem;
  }
`;

const StyledButton = styled(Button)`
  &.ant-btn-primary {
    background-color: transparent !important;
    border-color: #23432c !important;
    color: #23432c !important;

    &:hover {
      background-color: #23432c !important;
      border-color: #23432c !important;
    }
  }
`;

const StyledSelect = styled(Select)<{ hasError: boolean }>`
  :where(.css-dev-only-do-not-override-1qhpsh8).ant-select-outlined:not(
      .ant-select-customize-input
    )
    .ant-select-selector {
    border: 1px solid
      ${({ hasError }) => (hasError ? "rgb(185 28 28)" : "#d9d9d9")};
    background: #ffffff;
  }
`;

const CustomDropDown: React.ForwardRefExoticComponent<CustomDropDownProps> =
  forwardRef<typeof Select, CustomDropDownProps>(
    (
      {
        hasError,
        helperText,
        defaultOption = [""],
        dropdownPlaceholder = "Please enter item",
        buttonName = "Add Item",
        toAddItemPlaceholder,
        addClass,
        ...props
      },
      ref
    ) => {
      const [items, setItems] = useState(defaultOption);
      const [name, setName] = useState("");
      const inputRef = useRef<InputRef>(null);

      const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
      };

      const addItem = (index) => {
        if (name) {
          setItems([...items, name || `New item ${index++}`]);
          setName("");
          setTimeout(() => {
            inputRef.current?.focus();
          }, 0);
        }
      };
      return (
        <>
          <StyledSelect
            hasError={hasError ?? false}
            ref={ref as any}
            placeholder={dropdownPlaceholder}
            className={`${Font.className} ${addClass}`}
            dropdownRender={(menu) => (
              <>
                <div className={Font.className}>{menu}</div>
                <InputContainer>
                  <Input
                    ref={inputRef}
                    className={`${Font.className} text-base lg:text-sm`}
                    value={name}
                    onChange={onNameChange}
                    placeholder={toAddItemPlaceholder}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <StyledButton
                    onClick={addItem}
                    type="primary"
                    icon={<PlusOutlined />}>
                    {buttonName}
                  </StyledButton>
                </InputContainer>
              </>
            )}
            options={items.map((item) => ({ label: item, value: item }))}
            {...props}
          />
          {helperText && (
            <p className="text-red-700 text-xs font-italized">{helperText}</p>
          )}
        </>
      );
    }
  );

CustomDropDown.displayName = "CustomDropDown";

export default CustomDropDown;
