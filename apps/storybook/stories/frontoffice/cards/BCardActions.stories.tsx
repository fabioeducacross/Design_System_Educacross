import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardHeader, CardTitle } from "@fabioeducacross/ui";
import { ChevronDown, ChevronUp, RefreshCw, X, MoreVertical } from "lucide-react";
import { useState } from "react";

/**
 * # BCardActions
 * 
 * **Origem**: `educacross-frontoffice/src/@core/b-card-actions/BCardActions.vue`
 * 
 * Card com ações integradas (collapse, refresh, close) no header.
 * Baseado no Bootstrap-Vue BCard com funcionalidades extras.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `title` | `string` | - | Título do card |
 * | `actionCollapse` | `boolean` | false | Habilita botão collapse |
 * | `actionRefresh` | `boolean` | false | Habilita botão refresh |
 * | `actionClose` | `boolean` | false | Habilita botão close |
 * | `noBody` | `boolean` | false | Remove padding do body |
 * | `collapsed` | `boolean` | false | Estado inicial colapsado |
 * 
 * ## Eventos
 * 
 * - `@refresh` - Emitido quando clica em refresh
 * - `@close` - Emitido quando clica em close
 * 
 * @see Frontoffice: src/@core/b-card-actions/BCardActions.vue
 */

interface BCardActionsProps {
  title: string;
  actionCollapse?: boolean;
  actionRefresh?: boolean;
  actionClose?: boolean;
  noBody?: boolean;
  collapsed?: boolean;
  children?: React.ReactNode;
  onRefresh?: () => void;
  onClose?: () => void;
}

const BCardActions = ({ 
  title, 
  actionCollapse = false, 
  actionRefresh = false, 
  actionClose = false,
  noBody = false,
  collapsed: initialCollapsed = false,
  children,
  onRefresh,
  onClose
}: BCardActionsProps) => {
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    onRefresh?.();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <div className="flex items-center gap-1">
          {actionCollapse && (
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 hover:bg-muted rounded"
            >
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </button>
          )}
          {actionRefresh && (
            <button 
              onClick={handleRefresh}
              className="p-1 hover:bg-muted rounded"
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          )}
          {actionClose && (
            <button 
              onClick={onClose}
              className="p-1 hover:bg-muted rounded text-destructive"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className={noBody ? "p-0" : ""}>
          {children}
        </CardContent>
      )}
    </Card>
  );
};

const meta: Meta<typeof BCardActions> = {
  title: "Frontoffice/Cards/BCardActions",
  component: BCardActions,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Card com ações de collapse, refresh e close no header.",
      },
    },
  },
  argTypes: {
    actionCollapse: { control: "boolean" },
    actionRefresh: { control: "boolean" },
    actionClose: { control: "boolean" },
    noBody: { control: "boolean" },
    collapsed: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof BCardActions>;

export const Default: Story = {
  args: {
    title: "Card com Ações",
    actionCollapse: true,
    actionRefresh: true,
    actionClose: true,
    children: (
      <div className="p-4">
        <p>Conteúdo do card aqui.</p>
        <p className="text-muted-foreground">Use os botões no header para interagir.</p>
      </div>
    ),
  },
};

export const CollapseOnly: Story = {
  args: {
    title: "Card Colapsável",
    actionCollapse: true,
    children: (
      <div>
        <p>Este card pode ser colapsado clicando no ícone de seta.</p>
      </div>
    ),
  },
};

export const RefreshOnly: Story = {
  args: {
    title: "Card com Refresh",
    actionRefresh: true,
    children: (
      <div>
        <p>Clique no ícone de refresh para atualizar os dados.</p>
      </div>
    ),
  },
};

export const StartCollapsed: Story = {
  args: {
    title: "Card Inicialmente Colapsado",
    actionCollapse: true,
    collapsed: true,
    children: (
      <div>
        <p>Este conteúdo estava escondido inicialmente.</p>
      </div>
    ),
  },
};

/**
 * Múltiplos cards com ações
 */
export const Dashboard: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-[500px]">
      <BCardActions
        title="Estatísticas de Alunos"
        actionCollapse
        actionRefresh
      >
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">2.456</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-legend-proficient">1.892</p>
            <p className="text-sm text-muted-foreground">Ativos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-legend-basic">564</p>
            <p className="text-sm text-muted-foreground">Pendentes</p>
          </div>
        </div>
      </BCardActions>
      
      <BCardActions
        title="Últimas Atividades"
        actionCollapse
        actionRefresh
        actionClose
      >
        <ul className="space-y-2">
          <li className="flex justify-between">
            <span>Matemática - Prova 1</span>
            <span className="text-muted-foreground">há 2h</span>
          </li>
          <li className="flex justify-between">
            <span>Português - Redação</span>
            <span className="text-muted-foreground">há 4h</span>
          </li>
          <li className="flex justify-between">
            <span>Ciências - Quiz</span>
            <span className="text-muted-foreground">há 1d</span>
          </li>
        </ul>
      </BCardActions>
    </div>
  ),
};
