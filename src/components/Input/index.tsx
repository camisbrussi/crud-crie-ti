import { InputHTMLAttributes } from "react";
import { InputContainer } from "./styles";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder?: string;
  width?: number;
  errorMessage?: string;
}
export function Input({
  label,
  id,
  placeholder,
  width = 300,
  errorMessage,
  ...rest
}: InputProps) {
  const { register } = useFormContext();
  return (
    <InputContainer width={width}>
      <label htmlFor={id}>{label}</label>
      <input
        placeholder={placeholder}
        {...rest}
        {...register(id)}
        autoComplete="on"
      />
      {errorMessage && <span>{errorMessage}</span>}
    </InputContainer>
  );
}
