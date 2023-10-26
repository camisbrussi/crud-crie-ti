import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

interface UserModalProps {
  closeModal: Function;
  userData?: User;
}

const newUserValidationSchema = zod
  .object({
    name: zod.string().min(1, "Informe um nome válido"),
    email: zod
      .string()
      .min(1, "Informe a sua senha")
      .email("Informe um e-mail válido"),
    password: zod.string().min(5, "Sua senha deve conter 5 digitos"),
    password_confirm: zod.string().min(5, "Sua senha deve conter 5 digitos"),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "As Senhas devem ser iguais",
    path: ["password_confirm"],
  });

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  password_confirm: string;
};

export function UserForm({ closeModal, userData }: UserModalProps) {
  const methods = useForm<User>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  useEffect(() => {
    if (userData) {
      setValue("name", userData.name);
      setValue("email", userData.email);
      setValue("password", userData.password);
    }
  }, [setValue, userData]);

  const { errors } = formState;

  async function handleCrateNewUser(data: User) {
    console.log(data);
    try {
      console.log(userData);
      if (userData) {
        console.log("acessou");
        await axios.put(`http://localhost:3333/usuarios/${userData.id}`, {
          nome: data.name,
          email: data.email,
          senha: data.password,
        });

        toast.success("Usuário Editado com sucesso");
      } else {
        await axios.post("http://localhost:3333/usuarios", {
          nome: data.name,
          email: data.email,
          senha: data.password,
        });

        toast.success("Usuário Criado com sucesso");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao criar usuário");
    }
  }

  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form onSubmit={handleSubmit(handleCrateNewUser)}>
          <ItemsFormContainer>
            <Input label="Nome" id="name" errorMessage={errors.name?.message} />
            <Input
              label="Email"
              id="email"
              errorMessage={errors.email?.message}
            />
            <Input
              label="Senha"
              id="password"
              type="password"
              errorMessage={errors.password?.message}
            />
            <Input
              label="Confirmar a Senha"
              id="password_confirm"
              type="password"
              errorMessage={errors.password_confirm?.message}
            />
          </ItemsFormContainer>
          <ButtonContainer>
            <Button label="Enviar Dados" />
            <Button
              label="Cancelar"
              variant="danger"
              onClick={() => closeModal()}
            />
          </ButtonContainer>
        </form>
      </DivContainer>
    </FormProvider>
  );
}
