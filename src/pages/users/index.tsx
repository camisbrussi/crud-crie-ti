import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardInfo } from "@/components/Card";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { Button } from "@/components/Button";
import Modal, { Styles } from "react-modal";
import { UserForm } from "./components/UserForm";

interface User {
  id: number;
  nome: string;
  email: string;
}

const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Users() {
  const [userList, setUserList] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    axios.get<User[]>("http://localhost:3333/usuarios").then((response) => {
      setUserList(response.data);
    });
    setIsModalOpen(false);
  }

  useEffect(() => {
    axios.get<User[]>("http://localhost:3333/usuarios").then((response) => {
      setUserList(response.data);
    });
  }, []);

  console.log(userList);

  return (
    <AuthGuard>
      <Header label="Users" />
      <UserContainer>
        <Menu />
        <ContentContainer>
          <Button label="Criar usuário" onClick={openModal} />
          {userList.map((user) => {
            return (
              <Card key={user.id}>
                <CardInfo title="ID" data={user.id} />
                <CardInfo title="Nome" data={user.nome} />
                <CardInfo title="E-mail" data={user.email} />
              </Card>
            );
          })}
        </ContentContainer>
      </UserContainer>
      <ModalContainer
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal de Criação de Usuário"
        style={customModalStyles as Styles}
      >
        <h1>Criar Novo Usuário</h1>

        <UserForm closeModal={closeModal} />
      </ModalContainer>
    </AuthGuard>
  );
}
