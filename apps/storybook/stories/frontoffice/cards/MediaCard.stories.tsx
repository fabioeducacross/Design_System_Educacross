import type { Meta, StoryObj } from "@storybook/react";

/**
 * **MediaCard** - Card de mídia com imagem/ícone
 * 
 * Card versátil para exibir conteúdo com imagem de destaque.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/card/MediaCard.vue`
 * 
 * @example
 * ```vue
 * <MediaCard 
 *   title="Matemática" 
 *   subtitle="15 jogos"
 *   :image="imageUrl"
 *   variant="primary"
 * />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Cards/MediaCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Card com área de mídia (imagem/ícone), título e ações.",
      },
    },
  },
  argTypes: {
    title: {
      control: "text",
      description: "Título do card",
    },
    subtitle: {
      control: "text",
      description: "Subtítulo ou descrição curta",
    },
    image: {
      control: "text",
      description: "URL da imagem",
    },
    variant: {
      control: "select",
      options: ["default", "primary", "secondary", "overlay"],
      description: "Variante visual do card",
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const MediaCardMock = ({ 
  title, 
  subtitle,
  image,
  variant = "default",
  icon,
  badge
}: { 
  title: string;
  subtitle?: string;
  image?: string;
  variant?: string;
  icon?: string;
  badge?: string;
}) => (
  <div className={`
    relative overflow-hidden rounded-xl border border-border bg-card
    hover:shadow-lg transition-shadow cursor-pointer
    ${variant === "overlay" ? "text-white" : ""}
  `}>
    {/* Área de mídia */}
    <div className="relative aspect-video bg-muted">
      {image ? (
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-muted-foreground">
            {icon || "image"}
          </span>
        </div>
      )}
      
      {/* Badge overlay */}
      {badge && (
        <span className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
          {badge}
        </span>
      )}
      
      {/* Gradient overlay para variant overlay */}
      {variant === "overlay" && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      )}
    </div>
    
    {/* Conteúdo */}
    <div className={`
      p-4
      ${variant === "overlay" ? "absolute bottom-0 left-0 right-0" : ""}
    `}>
      <h3 className={`
        font-semibold text-lg
        ${variant === "overlay" ? "text-white" : "text-foreground"}
      `}>
        {title}
      </h3>
      {subtitle && (
        <p className={`
          text-sm mt-1
          ${variant === "overlay" ? "text-white/80" : "text-muted-foreground"}
        `}>
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <MediaCardMock 
        title="Matemática Básica" 
        subtitle="15 jogos disponíveis"
      />
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="max-w-sm">
      <MediaCardMock 
        title="Ciências da Natureza" 
        subtitle="Explore o mundo natural"
        image="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=225&fit=crop"
      />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div className="max-w-sm">
      <MediaCardMock 
        title="Novo Conteúdo" 
        subtitle="Acabou de chegar!"
        image="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=225&fit=crop"
        badge="NOVO"
      />
    </div>
  ),
};

export const OverlayVariant: Story = {
  render: () => (
    <div className="max-w-sm">
      <MediaCardMock 
        title="História do Brasil" 
        subtitle="Viaje pelo tempo"
        image="https://images.unsplash.com/photo-1461360370896-922624d12a74?w=400&h=225&fit=crop"
        variant="overlay"
      />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="max-w-sm">
      <MediaCardMock 
        title="Configurações" 
        subtitle="Ajuste suas preferências"
        icon="settings"
      />
    </div>
  ),
};

export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <MediaCardMock title="Português" subtitle="12 jogos" icon="menu_book" />
      <MediaCardMock title="Matemática" subtitle="15 jogos" icon="calculate" />
      <MediaCardMock title="Ciências" subtitle="8 jogos" icon="science" />
      <MediaCardMock title="Geografia" subtitle="6 jogos" icon="public" />
      <MediaCardMock title="História" subtitle="10 jogos" icon="history_edu" />
      <MediaCardMock title="Artes" subtitle="4 jogos" icon="palette" />
    </div>
  ),
};
