/**
 * @file RegistrationForm.example.tsx
 * @description Exemplo avançado com múltiplos campos, variants de size e layout
 */

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "../../components/FormField";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Checkbox } from "../../components/Checkbox";

// ============================================================================
// SCHEMA DE VALIDAÇÃO (ZOD)
// ============================================================================

const registrationSchema = z
  .object({
    fullName: z
      .string()
      .min(1, "Nome completo é obrigatório")
      .min(3, "Nome deve ter no mínimo 3 caracteres")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),
    email: z
      .string()
      .min(1, "Email é obrigatório")
      .email("Email inválido")
      .toLowerCase(),
    phone: z
      .string()
      .min(1, "Telefone é obrigatório")
      .regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato inválido. Use (XX) XXXXX-XXXX"),
    password: z
      .string()
      .min(8, "Senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
      .regex(/[a-z]/, "Senha deve conter pelo menos uma letra minúscula")
      .regex(/[0-9]/, "Senha deve conter pelo menos um número")
      .regex(/[^A-Za-z0-9]/, "Senha deve conter pelo menos um caractere especial"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Você deve aceitar os termos de uso" }),
    }),
    newsletter: z.boolean().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegistrationFormData = z.infer<typeof registrationSchema>;

// ============================================================================
// COMPONENTE
// ============================================================================

export function RegistrationFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegistrationFormData>({
    // @ts-expect-error - Incompatibilidade de tipos entre versões do Zod (falso positivo)
    resolver: zodResolver(registrationSchema) as Resolver<RegistrationFormData>,
    mode: "onTouched",
    defaultValues: {
      newsletter: false,
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegistrationFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Registration data:", data);
    alert(`Cadastro enviado!\nNome: ${data.fullName}\nEmail: ${data.email}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold">Cadastro</h2>
        <p className="text-muted-foreground">
          Preencha o formulário para criar sua conta
        </p>
      </div>

      {/* Full Name - Large Size */}
      <FormField
        label="Nome Completo"
        required
        size="lg"
        error={errors.fullName?.message}
        helperText="Digite seu nome completo como aparece no documento"
      >
        <Input
          {...register("fullName")}
          type="text"
          placeholder="João Silva"
          autoComplete="name"
        />
      </FormField>

      {/* Email & Phone - Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Email"
          required
          error={errors.email?.message}
          helperText="Enviaremos um link de confirmação"
        >
          <Input
            {...register("email")}
            type="email"
            placeholder="seu@email.com"
            autoComplete="email"
          />
        </FormField>

        <FormField
          label="Telefone"
          required
          error={errors.phone?.message}
          helperText="Formato: (XX) XXXXX-XXXX"
        >
          <Input
            {...register("phone")}
            type="tel"
            placeholder="(11) 99999-9999"
            autoComplete="tel"
          />
        </FormField>
      </div>

      {/* Password - Medium Size (default) */}
      <FormField
        label="Senha"
        required
        error={errors.password?.message}
        helperText="Use letras, números e caracteres especiais"
      >
        <Input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </FormField>

      {/* Confirm Password */}
      <FormField
        label="Confirmar Senha"
        required
        error={errors.confirmPassword?.message}
      >
        <Input
          {...register("confirmPassword")}
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </FormField>

      {/* Terms - Horizontal Layout with Small Size */}
      <FormField
        label=""
        layout="horizontal"
        size="sm"
        error={errors.terms?.message}
      >
        <div className="flex items-center gap-2">
          <Checkbox {...register("terms")} id="terms" />
          <label htmlFor="terms" className="text-sm cursor-pointer">
            Aceito os{" "}
            <a href="#" className="text-primary hover:underline">
              Termos de Uso
            </a>{" "}
            e{" "}
            <a href="#" className="text-primary hover:underline">
              Política de Privacidade
            </a>
          </label>
        </div>
      </FormField>

      {/* Newsletter - Horizontal Layout */}
      <FormField label="" layout="horizontal" size="sm">
        <div className="flex items-center gap-2">
          <Checkbox {...register("newsletter")} id="newsletter" />
          <label htmlFor="newsletter" className="text-sm cursor-pointer">
            Desejo receber novidades por email
          </label>
        </div>
      </FormField>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Cadastrando..." : "Criar Conta"}
        </Button>
        <Button type="button" variant="outline" className="flex-1">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
