import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardInfo } from "@/components/Card";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import axios from "axios";
import { useEffect, useState } from "react";
import { PageContainerß, UserContainer } from "./styles";
import { Button } from "@/components/Button";

interface User {
  id: number;
  nome: string;
  email: string;
}

export default function Users() {
  const [userList, setUserList] = useState<User[]>([]);

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
        {userList.map((user) => {
          return (
            <Card key={user.id}>
              <CardInfo title="ID" data={user.id} />
              <CardInfo title="Nome" data={user.nome} />
              <CardInfo title="E-mail" data={user.email} />
            </Card>
          );
        })}
      </UserContainer>
    </AuthGuard>
  );
}
