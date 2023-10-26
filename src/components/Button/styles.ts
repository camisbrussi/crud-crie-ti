import styled, { css } from "styled-components";

interface ButtonContainerProps {
  width: number;
  height: number;
  variant: string;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  font-size: 18px;

  border-radius: 10px;

  color: ${(props) => props.theme["white"]};
  background-color: ${(props) => props.theme[props.variant]};
  border: none;
`;
