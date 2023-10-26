import styled from "styled-components";

type InputProps = {
  width: number;
};
export const InputContainer = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  width: ${(props) => props.width}px;

  input {
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid ${(props) => props.theme["gray-100"]};
    outline: none; /* Remover a borda ao focar (opcional) */
    background: transparent;
    color: ${(props) => props.theme.fontColor};

    &:focus {
      border-bottom: 2px solid ${(props) => props.theme["primary"]}; /* Cor e largura do traço ao focar (opcional) */
    }
  }
  span {
    color: ${(props) => props.theme["danger"]};
  }
`;
