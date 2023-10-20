import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { LoginContainer } from "./styles";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { FormProvider, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";
import { Loading } from "@/components/Loading";

const newLoginValidationSchema = zod.object({
  email: zod
    .string()
    .min(1, "Informe o seu email")
    .email("Informe um e-mail válido"),
  password: zod.string().min(6, "Mínimo 6 caracteres"),
});

type Login = zod.infer<typeof newLoginValidationSchema>;

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  const methods = useForm<Login>({
    resolver: zodResolver(newLoginValidationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn } = useContext(AuthContext);

  const { handleSubmit, formState } = methods;

  async function handleLogin(data: Login) {
    try {
      await signIn(data);
      router.push("/");
    } catch (e) {
      setError("Login ou senha inválidos");
    }
  }

  const { errors } = formState;

  return (
    <LoginContainer>
      <Image
        src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
        alt="laptop em cima de uma mesa"
        width={700}
        height={200}
      />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <h1>Fazer Login</h1>

          <Input
            label="E-mail"
            id="email"
            type="email"
            errorMessage={errors?.email?.message}
          />
          <Input
            label="Senha"
            id="password"
            type="password"
            errorMessage={errors?.password?.message}
          />

          <Button type="submit" label="Confirmar" />
          {error && <span>{error}</span>}
        </form>
      </FormProvider>
    </LoginContainer>
  );
}
