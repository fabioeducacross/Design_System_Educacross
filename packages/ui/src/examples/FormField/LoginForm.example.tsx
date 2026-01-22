/**
 * @file LoginForm.example.tsx
 * @description Exemplo de formulário de login usando FormField + React Hook Form + Zod
 */

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Resolver } from "react-hook-form";
import { z } from "zod";
import { FormField } from "../../components/FormField";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

// ============================================================================
// SCHEMA DE VALIDAÇÃO (ZOD)
// ============================================================================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido")
    .toLowerCase(),
  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Senha deve conter pelo menos um número"),
});

type LoginFormData = z.infer<typeof loginSchema>;

// ============================================================================
// COMPONENTE
// ============================================================================

export function LoginFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    // @ts-expect-error - Incompatibilidade de tipos entre versões do Zod (falso positivo)
    resolver: zodResolver(loginSchema) as Resolver<LoginFormData>,
    mode: "onBlur", // Valida ao perder foco
  });

  const onSubmit = async (data: LoginFormData) => {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Login data:", data);
    alert(`Login enviado!\nEmail: ${data.email}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Login</h2>
        <p className="text-muted-foreground">Entre com suas credenciais</p>
      </div>

      {/* Email Field */}
      <FormField
        label="Email"
        required
        error={errors.email?.message}
        helperText="Use seu email corporativo"
      >
        <Input
          {...register("email")}
          type="email"
          placeholder="seu@email.com"
          autoComplete="email"
        />
      </FormField>

      {/* Password Field */}
      <FormField
        label="Senha"
        required
        error={errors.password?.message}
        helperText="Mínimo 8 caracteres, 1 maiúscula e 1 número"
      >
        <Input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          autoComplete="current-password"
        />
      </FormField>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
