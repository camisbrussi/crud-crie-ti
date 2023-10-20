import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/Button";
import { Loading } from "@/components/Loading";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export default function Home() {
  const { logout, user, loading } = useContext(AuthContext);

  return (
    <>
      <AuthGuard>
        <>
          <h1>Home</h1>
          {user?.name}
          <Button label="Sair" onClick={logout} />
        </>
      </AuthGuard>
    </>
  );
}
