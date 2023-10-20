import { ButtonContainer } from "./styles";

interface ButtonProps {
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  width?: number;
  height?: number;
  label: string;
  onClick?: () => void;
}

export function Button({
  width = 300,
  height = 50,
  label,
  onClick,
  ...rest
}: ButtonProps) {
  return (
    <ButtonContainer width={width} height={height} onClick={onClick} {...rest}>
      {label}
    </ButtonContainer>
  );
}
