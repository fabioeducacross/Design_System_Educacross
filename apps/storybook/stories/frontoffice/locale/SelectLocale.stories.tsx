import type { Meta, StoryObj } from "@storybook/react";

/**
 * **SelectLocale** - Seletor de idioma
 * 
 * Componente para seleção de idioma/localidade da aplicação.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/SelectLocale.vue`
 * 
 * @example
 * ```vue
 * <SelectLocale v-model="currentLocale" :locales="availableLocales" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Locale/SelectLocale",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Seletor de idioma com bandeiras e nomes de países.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["dropdown", "inline", "minimal"],
      description: "Estilo de exibição",
    },
  },
};

export default meta;
type Story = StoryObj;

interface Locale {
  code: string;
  name: string;
  flag: string;
}

const locales: Locale[] = [
  { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
  { code: "en-US", name: "English (US)", flag: "🇺🇸" },
  { code: "es-ES", name: "Español", flag: "🇪🇸" },
  { code: "fr-FR", name: "Français", flag: "🇫🇷" },
];

// Mock do componente Vue
const SelectLocaleMock = ({ 
  currentLocale = "pt-BR",
  variant = "dropdown",
  expanded = false
}: { 
  currentLocale?: string;
  variant?: "dropdown" | "inline" | "minimal";
  expanded?: boolean;
}) => {
  const current = locales.find(l => l.code === currentLocale) || locales[0];

  if (variant === "minimal") {
    return (
      <button className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent">
        <span className="text-xl">{current.flag}</span>
        <span className="text-xs font-medium">{current.code.split("-")[0].toUpperCase()}</span>
      </button>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex gap-2">
        {locales.map((locale) => (
          <button
            key={locale.code}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-md border transition-colors
              ${locale.code === currentLocale 
                ? "bg-primary text-primary-foreground border-primary" 
                : "hover:bg-accent border-border"
              }
            `}
          >
            <span className="text-lg">{locale.flag}</span>
            <span className="text-sm">{locale.code.split("-")[0].toUpperCase()}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button className="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-accent">
        <span className="text-xl">{current.flag}</span>
        <span className="text-sm font-medium">{current.name}</span>
        <span className="material-symbols-outlined text-sm">expand_more</span>
      </button>
      
      {expanded && (
        <div className="absolute top-full left-0 mt-1 w-full min-w-[200px] bg-card border rounded-md shadow-lg z-50">
          {locales.map((locale) => (
            <button
              key={locale.code}
              className={`
                w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-accent
                ${locale.code === currentLocale ? "bg-primary/10" : ""}
              `}
            >
              <span className="text-xl">{locale.flag}</span>
              <div>
                <p className="text-sm font-medium">{locale.name}</p>
                <p className="text-xs text-muted-foreground">{locale.code}</p>
              </div>
              {locale.code === currentLocale && (
                <span className="material-symbols-outlined text-primary ml-auto">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Dropdown: Story = {
  name: "Dropdown (Fechado)",
  render: () => <SelectLocaleMock variant="dropdown" />,
};

export const DropdownExpanded: Story = {
  name: "Dropdown (Expandido)",
  render: () => <SelectLocaleMock variant="dropdown" expanded />,
};

export const Inline: Story = {
  name: "Inline",
  render: () => <SelectLocaleMock variant="inline" />,
};

export const Minimal: Story = {
  name: "Minimal",
  render: () => <SelectLocaleMock variant="minimal" />,
};

export const English: Story = {
  name: "Inglês Selecionado",
  render: () => <SelectLocaleMock currentLocale="en-US" expanded />,
};

export const InNavbar: Story = {
  name: "Em Navbar",
  render: () => (
    <div className="bg-card border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-primary-foreground font-bold">
          E
        </div>
        <span className="font-semibold">Educacross</span>
      </div>
      
      <div className="flex items-center gap-4">
        <SelectLocaleMock variant="minimal" />
        <button className="p-2 hover:bg-accent rounded-full">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="w-8 h-8 bg-muted rounded-full" />
      </div>
    </div>
  ),
};

export const InSettings: Story = {
  name: "Em Configurações",
  render: () => (
    <div className="max-w-md p-6 bg-card border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Configurações de Idioma</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Idioma da Interface</label>
          <SelectLocaleMock variant="dropdown" />
        </div>
        
        <div className="pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            O idioma selecionado será aplicado a toda a interface do sistema.
          </p>
        </div>
      </div>
    </div>
  ),
};
