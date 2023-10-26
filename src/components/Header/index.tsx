import { FormEvent, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { User } from "phosphor-react";
import {
  ContentContainer,
  SidebarContainer,
  UserContainer,
  UserData,
} from "./styles";
import { Button } from "../Button";

interface SidebarProps {
  label: string;
}

export function Header({ label }: SidebarProps) {
  const { user, logout } = useContext(AuthContext);

  return (
    <SidebarContainer>
      <ContentContainer>
        <h1>{label}</h1> {/** descriçao da página */}
        <UserContainer>
          <UserData>
            {/** div dos dados do usuário */}
            <User size={32} /> {/** foto do user */}
            <strong>{user?.name}</strong> {/** nome do usrr */}
          </UserData>
          <Button width={100} height={30} label="Sair" onClick={logout} />{" "}
          {/** botão de logout */}
        </UserContainer>
      </ContentContainer>
    </SidebarContainer>
  );
}
