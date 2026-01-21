import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Input, Label } from "@fabioeducacross/ui";
import { useState } from "react";

const meta: Meta = {
    title: "Patterns/Form Field",
    parameters: {
        layout: "centered",
        docs: {
            description: {
                component: `
# Padrão: Form Field

O padrão Form Field combina **Label**, **Input** e mensagens de erro/ajuda
para criar campos de formulário consistentes e acessíveis.

## Estrutura

\`\`\`tsx
<div className="flex flex-col gap-2">
  <Label htmlFor="field-id" required>Label</Label>
  <Input id="field-id" placeholder="Placeholder" />
  <span className="text-sm text-muted-foreground">Hint text</span>
</div>
\`\`\`

## Regras de Acessibilidade

1. **Label sempre presente**: Todo input deve ter um label associado via \`htmlFor\`/\`id\`
2. **Mensagens de erro**: Use \`aria-describedby\` para associar mensagens ao input
3. **Campos obrigatórios**: Marque com \`required\` no Label e \`aria-required\` no Input
        `,
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="basic-field">Nome</Label>
            <Input id="basic-field" placeholder="Digite seu nome" />
        </div>
    ),
};

export const WithHint: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="hint-field">Email</Label>
            <Input id="hint-field" type="email" placeholder="seu@email.com" aria-describedby="hint-text" />
            <span id="hint-text" className="text-sm text-muted-foreground">
                Nunca compartilharemos seu email.
            </span>
        </div>
    ),
};

export const Required: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="required-field" required>
                Senha
            </Label>
            <Input
                id="required-field"
                type="password"
                placeholder="••••••••"
                aria-required="true"
                aria-describedby="password-hint"
            />
            <span id="password-hint" className="text-sm text-muted-foreground">
                Mínimo 8 caracteres.
            </span>
        </div>
    ),
};

export const WithError: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="error-field" variant="error" required>
                Email
            </Label>
            <Input
                id="error-field"
                type="email"
                error
                defaultValue="email-invalido"
                aria-invalid="true"
                aria-describedby="error-message"
            />
            <span id="error-message" className="text-sm text-destructive" role="alert">
                Por favor, insira um endereço de email válido.
            </span>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: `
Use \`aria-invalid="true"\` no input e \`role="alert"\` na mensagem de erro
para que leitores de tela anunciem o erro.
        `,
            },
        },
    },
};

export const Disabled: Story = {
    render: () => (
        <div className="flex flex-col gap-2 w-80">
            <Label htmlFor="disabled-field" className="opacity-50">
                Campo desabilitado
            </Label>
            <Input id="disabled-field" disabled defaultValue="Valor fixo" />
        </div>
    ),
};

export const CompleteForm: Story = {
    render: function CompleteFormStory() {
        const [errors, setErrors] = useState<Record<string, string>>({});
        const [loading, setLoading] = useState(false);

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const newErrors: Record<string, string> = {};

            if (!formData.get("name")) {
                newErrors.name = "Nome é obrigatório";
            }
            if (!formData.get("email")) {
                newErrors.email = "Email é obrigatório";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.get("email") as string)) {
                newErrors.email = "Email inválido";
            }

            if (Object.keys(newErrors).length > 0) {
                setErrors(newErrors);
                return;
            }

            setErrors({});
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
        };

        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-80">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="form-name" required variant={errors.name ? "error" : "default"}>
                        Nome completo
                    </Label>
                    <Input
                        id="form-name"
                        name="name"
                        placeholder="Jane Doe"
                        error={!!errors.name}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                        <span id="name-error" className="text-sm text-destructive" role="alert">
                            {errors.name}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="form-email" required variant={errors.email ? "error" : "default"}>
                        Email
                    </Label>
                    <Input
                        id="form-email"
                        name="email"
                        type="email"
                        placeholder="jane@exemplo.com"
                        error={!!errors.email}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : "email-hint"}
                    />
                    {errors.email ? (
                        <span id="email-error" className="text-sm text-destructive" role="alert">
                            {errors.email}
                        </span>
                    ) : (
                        <span id="email-hint" className="text-sm text-muted-foreground">
                            Usaremos para confirmação.
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="form-bio" variant="muted">
                        Bio (opcional)
                    </Label>
                    <Input id="form-bio" name="bio" placeholder="Conte um pouco sobre você" />
                </div>

                <Button type="submit" loading={loading}>
                    {loading ? "Enviando..." : "Enviar"}
                </Button>
            </form>
        );
    },
    parameters: {
        docs: {
            description: {
                story: `
Exemplo completo de formulário com:
- Validação client-side
- Estados de erro
- Campo opcional
- Estado de loading no botão
        `,
            },
        },
    },
};
