import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

type User = {
  name: string;
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user?: User;
  logout: () => void;
  getLogged: () => void;
  loading: boolean;
};

type AuthProviderProps = {
  children: ReactNode; // Tipagem quando um componente pode receber qualquer outra coisa dentro dele
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const isAuthenticated = !!user;
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const userLogged = await getLogged();
      // Faria a lógica que busca na api o usuário logado
      // setava o usuário
      // setUser(usuário logado);

      console.log("userLogged", userLogged);

      if (userLogged) {
        setUser({
          name: "Juca Bala",
          email: "juca@batatinha.com",
        });
      }
      setLoading(false);
    }

    getUser();
  }, []);

  const setLogged = (token: string) => {
    localStorage.setItem("logged", JSON.stringify({ token }));
    return true;
  };

  const getLogged = async () => {
    if (typeof window !== "undefined") {
      const logged = localStorage?.getItem("logged");
      if (logged) {
        const userLogged = JSON.parse(logged);
        console.log("logged", userLogged.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Basic ${userLogged.token}`;
        axios.defaults.headers.common["Cache-Control"] = "no-store";

        return logged && JSON.parse(logged);
      }
    }
    return;
  };

  const logout = () => {
    localStorage.removeItem("logged");
    setUser(undefined);
    router.push("/login");
  };

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await axios.post("http://localhost:3333/login", {
        email,
        senha: password,
      });

      const { token } = response.data;

      setLogged(token);
    } catch (error) {
      setUser(undefined);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated, user, logout, getLogged, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
