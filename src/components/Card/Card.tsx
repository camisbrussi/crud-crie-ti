import { ReactNode } from "react";
import {
  ButtonsContainer,
  ContentContainer,
  DivContainer,
  IconButton,
} from "./Card.styles";
import { Pencil, Trash } from "phosphor-react";

interface CardProps {
  children: ReactNode;
  openModal: (id: number) => void;
}

export function Card({ children, openModal }: CardProps) {
  return (
    <DivContainer>
      <ContentContainer>
        {children}
        <ButtonsContainer>
          <IconButton
            title="Editar"
            variant="primary"
            onClick={openModal}
          >
            {<Pencil size={24} />}
          </IconButton>
          <IconButton title="Exluir" variant="danger">
            {<Trash size={24} />}
          </IconButton>
        </ButtonsContainer>
      </ContentContainer>
    </DivContainer>
  );
}
