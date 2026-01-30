import type { Meta, StoryObj } from "@storybook/react";
import { Card, CardContent } from "@fabioeducacross/ui";
import { TrendingUp, TrendingDown, Users, BookOpen, Award, Target } from "lucide-react";

/**
 * # StatisticCardVertical
 * 
 * **Origem**: `educacross-frontoffice/src/@core/statistics-cards/StatisticCardVertical.vue`
 * 
 * Card de estatísticas com layout vertical - ícone no topo, dados abaixo.
 * 
 * ## Props Vue Original
 * 
 * | Prop | Tipo | Default | Descrição |
 * |------|------|---------|-----------|
 * | `icon` | `string` | - | Nome do ícone (Feather) |
 * | `statistic` | `string/number` | - | Valor da estatística |
 * | `statisticTitle` | `string` | - | Título/label da estatística |
 * | `color` | `string` | 'primary' | Cor do card |
 * | `change` | `number` | null | Variação percentual |
 * | `changeType` | `string` | 'increase' | 'increase' ou 'decrease' |
 * 
 * @see Frontoffice: src/@core/statistics-cards/StatisticCardVertical.vue
 */

interface StatisticCardVerticalProps {
  icon: React.ReactNode;
  statistic: string | number;
  statisticTitle: string;
  color?: "primary" | "success" | "warning" | "danger" | "info";
  change?: number;
  changeType?: "increase" | "decrease";
}

const colorClasses = {
  primary: "bg-primary text-primary-foreground",
  success: "bg-legend-proficient text-white",
  warning: "bg-legend-basic text-white",
  danger: "bg-legend-below-basic text-white",
  info: "bg-legend-in-progress text-white",
};

const StatisticCardVertical = ({ 
  icon, 
  statistic, 
  statisticTitle, 
  color = "primary",
  change,
  changeType = "increase"
}: StatisticCardVerticalProps) => {
  return (
    <Card className={colorClasses[color]}>
      <CardContent className="p-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-white/20">
            {icon}
          </div>
        </div>
        <p className="text-3xl font-bold mb-1">{statistic}</p>
        <p className="text-sm opacity-90 mb-2">{statisticTitle}</p>
        {change !== undefined && (
          <div className="flex items-center justify-center gap-1 text-xs">
            {changeType === "increase" ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{change}% vs mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const meta: Meta<typeof StatisticCardVertical> = {
  title: "Frontoffice/Cards/StatisticCardVertical",
  component: StatisticCardVertical,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Card de estatísticas com layout vertical e cor de fundo.",
      },
    },
  },
  argTypes: {
    color: {
      control: "select",
      options: ["primary", "success", "warning", "danger", "info"],
    },
    changeType: {
      control: "select",
      options: ["increase", "decrease"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatisticCardVertical>;

export const Default: Story = {
  args: {
    icon: <Users className="h-8 w-8" />,
    statistic: "2.456",
    statisticTitle: "Total de Alunos",
    color: "primary",
  },
};

export const WithChange: Story = {
  args: {
    icon: <TrendingUp className="h-8 w-8" />,
    statistic: "85%",
    statisticTitle: "Taxa de Aprovação",
    color: "success",
    change: 12,
    changeType: "increase",
  },
};

export const WithDecrease: Story = {
  args: {
    icon: <Target className="h-8 w-8" />,
    statistic: "32",
    statisticTitle: "Metas Pendentes",
    color: "warning",
    change: 5,
    changeType: "decrease",
  },
};

/**
 * Dashboard com cards verticais
 */
export const Dashboard: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-4 w-[800px]">
      <StatisticCardVertical
        icon={<Users className="h-8 w-8" />}
        statistic="2.456"
        statisticTitle="Alunos"
        color="primary"
        change={8}
        changeType="increase"
      />
      <StatisticCardVertical
        icon={<BookOpen className="h-8 w-8" />}
        statistic="1.234"
        statisticTitle="Atividades"
        color="success"
        change={15}
        changeType="increase"
      />
      <StatisticCardVertical
        icon={<Award className="h-8 w-8" />}
        statistic="156"
        statisticTitle="Certificados"
        color="info"
      />
      <StatisticCardVertical
        icon={<Target className="h-8 w-8" />}
        statistic="89%"
        statisticTitle="Meta Atingida"
        color="warning"
        change={3}
        changeType="decrease"
      />
    </div>
  ),
};
