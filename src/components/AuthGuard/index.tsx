// components/AuthGuard.tsx
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { Loading } from "../Loading";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { user, getLogged, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) return;
    async function getUser() {
      await getLogged();
    }

    getUser();
  }, [getLogged, user]);

  console.log(user);

  if (loading) {
    console.log("acessou 1");
    return <Loading />;
  } else if (!user) {
    console.log("acessou 3");

    router.push("/login");
  }

  console.log("acessou 2");

  return <>{children}</>;
}
