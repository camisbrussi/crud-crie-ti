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
    border-bottom: 1px solid #000; /* Cor e largura do traço */
    outline: none; /* Remover a borda ao focar (opcional) */

    &:focus {
      border-bottom: 2px solid #00f; /* Cor e largura do traço ao focar (opcional) */
    }
  }
  span {
    color: red;
  }
`;
