import { ButtonContainer } from "./styles";

interface ButtonProps {
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  width?: number;
  height?: number;
  label: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
}

export function Button({
  width = 200,
  height = 36,
  label,
  onClick,
  variant = "primary",
  ...rest
}: ButtonProps) {
  return (
    <ButtonContainer
      width={width}
      height={height}
      onClick={onClick}
      variant={variant}
      {...rest}
    >
      {label}
    </ButtonContainer>
  );
}
