import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent, CardHeader, CardTitle } from "@fabioeducacross/ui";
import { TrendingUp, Users, BookOpen, Award, DollarSign, ShoppingCart } from "lucide-react";

/**
 * # StatisticCardHorizontal
 * 
 * **Origem**: `educacross-frontoffice/src/@core/statistics-cards/StatisticCardHorizontal.vue`
 * 
 * Card de estatísticas com layout horizontal - ícone à esquerda e dados à direita.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `icon` | `string` | - | Nome do ícone (Feather) |
 * | `statistic` | `string/number` | - | Valor da estatística |
 * | `statisticTitle` | `string` | - | Título/label da estatística |
 * | `color` | `string` | 'primary' | Cor do ícone (primary, success, warning, etc) |
 * | `chartData` | `object` | null | Dados para mini gráfico (opcional) |
 * 
 * ## Cores Disponíveis
 * 
 * - primary (azul)
 * - success/legend-proficient (verde)
 * - warning/legend-basic (laranja)
 * - danger/legend-below-basic (vermelho)
 * - info/legend-in-progress (ciano)
 * 
 * @see Frontoffice: src/@core/statistics-cards/StatisticCardHorizontal.vue
 */

interface StatisticCardHorizontalProps {
  icon: React.ReactNode;
  statistic: string | number;
  statisticTitle: string;
  color?: "primary" | "success" | "warning" | "danger" | "info" | "secondary";
}

const colorClasses = {
  primary: "bg-primary/10 text-primary",
  success: "bg-legend-proficient/10 text-legend-proficient",
  warning: "bg-legend-basic/10 text-legend-basic",
  danger: "bg-legend-below-basic/10 text-legend-below-basic",
  info: "bg-legend-in-progress/10 text-legend-in-progress",
  secondary: "bg-muted text-muted-foreground",
};

const StatisticCardHorizontal = ({ 
  icon, 
  statistic, 
  statisticTitle, 
  color = "primary" 
}: StatisticCardHorizontalProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            {icon}
          </div>
          <div>
            <p className="text-2xl font-bold">{statistic}</p>
            <p className="text-sm text-muted-foreground">{statisticTitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const meta: Meta<typeof StatisticCardHorizontal> = {
  title: "Frontoffice/Cards/StatisticCardHorizontal",
  component: StatisticCardHorizontal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Card de estatísticas com layout horizontal.",
      },
    },
  },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "success", "warning", "danger", "info", "secondary"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatisticCardHorizontal>;

export const Default: Story = {
  args: {
    icon: <Users className="h-6 w-6" />,
    statistic: "2.456",
    statisticTitle: "Total de Alunos",
    color: "primary",
  },
};

export const Success: Story = {
  args: {
    icon: <TrendingUp className="h-6 w-6" />,
    statistic: "85%",
    statisticTitle: "Taxa de Aprovação",
    color: "success",
  },
};

export const Warning: Story = {
  args: {
    icon: <BookOpen className="h-6 w-6" />,
    statistic: "32",
    statisticTitle: "Atividades Pendentes",
    color: "warning",
  },
};

export const Danger: Story = {
  args: {
    icon: <Award className="h-6 w-6" />,
    statistic: "12",
    statisticTitle: "Alunos em Risco",
    color: "danger",
  },
};

/**
 * Dashboard com múltiplos cards
 */
export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[600px]">
      <StatisticCardHorizontal
        icon={<Users className="h-6 w-6" />}
        statistic="2.456"
        statisticTitle="Total de Alunos"
        color="primary"
      />
      <StatisticCardHorizontal
        icon={<TrendingUp className="h-6 w-6" />}
        statistic="85%"
        statisticTitle="Taxa de Aprovação"
        color="success"
      />
      <StatisticCardHorizontal
        icon={<BookOpen className="h-6 w-6" />}
        statistic="1.234"
        statisticTitle="Atividades Realizadas"
        color="info"
      />
      <StatisticCardHorizontal
        icon={<Award className="h-6 w-6" />}
        statistic="156"
        statisticTitle="Certificados Emitidos"
        color="warning"
      />
    </div>
  ),
};
