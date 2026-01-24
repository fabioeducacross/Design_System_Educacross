import type { Meta, StoryObj } from "@storybook/react";
import { Timeline, type TimelineItemData } from "@fabioeducacross/ui";
import { CheckCircle2, Clock, XCircle, AlertCircle, Package, Truck, Home } from "lucide-react";

const meta = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de timeline (linha do tempo) para exibir eventos cronológicos. Suporta 3 orientações: vertical (lista padrão), horizontal (linha) e alternating (zigzag esquerda/direita).",
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "alternating"],
      description: "Orientação da timeline",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Tamanho dos ícones circulares",
    },
    showConnectors: {
      control: "boolean",
      description: "Mostrar linhas conectoras entre itens",
    },
    items: {
      description: "Array de objetos TimelineItemData com title, description, timestamp, status e icon",
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

const activityItems: TimelineItemData[] = [
  {
    title: "Pedido realizado",
    description: "Seu pedido foi confirmado e está sendo preparado.",
    timestamp: "Há 2 horas",
    status: "success",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    title: "Processando pagamento",
    description: "Aguardando confirmação bancária.",
    timestamp: "Há 1 hora",
    status: "active",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    title: "Em separação",
    description: "Produtos estão sendo separados no estoque.",
    timestamp: "Há 30 min",
    status: "default",
    icon: <Package className="h-4 w-4" />,
  },
  {
    title: "Saiu para entrega",
    description: "Pedido despachado para transporte.",
    timestamp: "Agendado",
    status: "default",
  },
];

const projectMilestones: TimelineItemData[] = [
  {
    title: "Kickoff do Projeto",
    description: "Reunião inicial com stakeholders e definição de escopo.",
    timestamp: "Jan 2026",
    status: "success",
  },
  {
    title: "Design Aprovado",
    description: "Protótipos de alta fidelidade validados com cliente.",
    timestamp: "Fev 2026",
    status: "success",
  },
  {
    title: "Desenvolvimento Sprint 1",
    description: "Implementação das features principais do sistema.",
    timestamp: "Mar 2026",
    status: "active",
  },
  {
    title: "Testes e QA",
    description: "Testes automatizados e validação de qualidade.",
    timestamp: "Abr 2026",
    status: "default",
  },
  {
    title: "Deploy Produção",
    description: "Lançamento oficial da plataforma.",
    timestamp: "Mai 2026",
    status: "default",
  },
];

const orderTrackingItems: TimelineItemData[] = [
  {
    title: "Pedido Confirmado",
    timestamp: "24/01, 10:30",
    status: "success",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    title: "Em Trânsito",
    timestamp: "24/01, 14:20",
    status: "active",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    title: "Entregue",
    timestamp: "25/01 (previsto)",
    status: "default",
    icon: <Home className="h-4 w-4" />,
  },
];

const errorLogItems: TimelineItemData[] = [
  {
    title: "Erro de Conexão",
    description: "Falha ao conectar com banco de dados.",
    timestamp: "14:32:15",
    status: "error",
    icon: <XCircle className="h-4 w-4" />,
  },
  {
    title: "Tentativa de Reconexão",
    description: "Sistema tentando restabelecer conexão (3/3).",
    timestamp: "14:32:18",
    status: "warning",
    icon: <AlertCircle className="h-4 w-4" />,
  },
  {
    title: "Conexão Restaurada",
    description: "Sistema operando normalmente.",
    timestamp: "14:32:25",
    status: "success",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
];

/**
 * Timeline vertical padrão - ideal para feeds de atividades e históricos.
 */
export const Vertical: Story = {
  args: {
    orientation: "vertical",
    items: activityItems,
    size: "default",
    showConnectors: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { Timeline } from "@fabioeducacross/ui";
import { CheckCircle2, Clock } from "lucide-react";

const items = [
  {
    title: "Pedido realizado",
    description: "Seu pedido foi confirmado.",
    timestamp: "Há 2 horas",
    status: "success",
    icon: <CheckCircle2 className="h-4 w-4" />,
  },
  {
    title: "Processando",
    timestamp: "Há 1 hora",
    status: "active",
    icon: <Clock className="h-4 w-4" />,
  },
];

<Timeline orientation="vertical" items={items} />`,
      vue2: `<!-- Bootstrap Timeline (customizado com CSS) -->
<template>
  <div class="timeline-vertical">
    <div v-for="(item, index) in items" :key="index" class="timeline-item d-flex mb-4">
      <div class="timeline-icon bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" 
           style="min-width: 2rem; min-height: 2rem;">
        {{ index + 1 }}
      </div>
      <div class="timeline-content ml-3 flex-fill">
        <h6 class="mb-1">{{ item.title }}</h6>
        <p class="text-muted small mb-0">{{ item.description }}</p>
        <small class="text-muted">{{ item.timestamp }}</small>
      </div>
      <div v-if="index < items.length - 1" 
           class="timeline-connector position-absolute bg-secondary" 
           style="left: 1rem; top: 2rem; width: 2px; height: calc(100% - 2rem);"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Pedido realizado", description: "Confirmado", timestamp: "Há 2h" },
        { title: "Processando", description: "Aguarde", timestamp: "Há 1h" }
      ]
    };
  }
};
</script>`,
      vue3: `<template>
  <EdTimeline orientation="vertical" :items="items" />
</template>

<script setup lang="ts">
import { EdTimeline } from "@fabioeducacross/ui-vue3";
import { CheckCircle2, Clock } from "lucide-vue-next";
import { h } from "vue";

const items = [
  {
    title: "Pedido realizado",
    description: "Seu pedido foi confirmado.",
    timestamp: "Há 2 horas",
    status: "success",
    icon: h(CheckCircle2, { class: "h-4 w-4" }),
  },
  {
    title: "Processando",
    timestamp: "Há 1 hora",
    status: "active",
    icon: h(Clock, { class: "h-4 w-4" }),
  },
];
</script>`,
    },
  },
};

/**
 * Timeline horizontal - ideal para processos lineares e etapas sequenciais.
 */
export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
    items: orderTrackingItems,
    size: "default",
    showConnectors: true,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    multiFrameworkCode: {
      react: `import { Timeline } from "@fabioeducacross/ui";
import { CheckCircle2, Truck, Home } from "lucide-react";

const items = [
  { title: "Confirmado", timestamp: "24/01, 10:30", status: "success", icon: <CheckCircle2 /> },
  { title: "Em Trânsito", timestamp: "24/01, 14:20", status: "active", icon: <Truck /> },
  { title: "Entregue", timestamp: "25/01", status: "default", icon: <Home /> },
];

<Timeline orientation="horizontal" items={items} />`,
      vue2: `<!-- Bootstrap Timeline Horizontal -->
<template>
  <div class="timeline-horizontal d-flex align-items-start">
    <div v-for="(item, index) in items" :key="index" class="timeline-item d-flex flex-column align-items-center text-center pr-4">
      <div class="timeline-icon bg-primary text-white rounded-circle mb-2" style="width: 2rem; height: 2rem;"></div>
      <h6 class="mb-1 small">{{ item.title }}</h6>
      <small class="text-muted">{{ item.timestamp }}</small>
      <div v-if="index < items.length - 1" class="timeline-connector position-absolute bg-secondary" style="top: 1rem; left: 2rem; width: calc(100% - 2rem); height: 2px;"></div>
    </div>
  </div>
</template>`,
      vue3: `<EdTimeline orientation="horizontal" :items="items" />`,
    },
  },
};

/**
 * Timeline alternada - ideal para apresentações visuais e storytelling.
 */
export const Alternating: Story = {
  args: {
    orientation: "alternating",
    items: projectMilestones,
    size: "default",
    showConnectors: true,
  },
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    multiFrameworkCode: {
      react: `import { Timeline } from "@fabioeducacross/ui";

const milestones = [
  { title: "Kickoff", description: "Reunião inicial", timestamp: "Jan 2026", status: "success" },
  { title: "Design Aprovado", description: "Protótipos validados", timestamp: "Fev 2026", status: "success" },
  { title: "Sprint 1", description: "Features principais", timestamp: "Mar 2026", status: "active" },
];

<Timeline orientation="alternating" items={milestones} />`,
      vue2: `<!-- Timeline alternada requer CSS customizado mais complexo -->
<template>
  <div class="timeline-alternating">
    <div v-for="(item, index) in items" :key="index" 
         :class="['timeline-item', 'd-flex', index % 2 === 0 ? 'justify-content-start' : 'justify-content-end flex-row-reverse']">
      <div class="timeline-content card p-3 mb-3" style="max-width: 50%;">
        <h6>{{ item.title }}</h6>
        <p class="mb-0 text-muted small">{{ item.description }}</p>
        <small class="text-muted">{{ item.timestamp }}</small>
      </div>
    </div>
  </div>
</template>`,
      vue3: `<EdTimeline orientation="alternating" :items="milestones" />`,
    },
  },
};

/**
 * Tamanhos diferentes para os ícones.
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="mb-4 text-sm font-semibold text-muted-foreground">Small</h4>
        <Timeline size="sm" items={orderTrackingItems.slice(0, 2)} />
      </div>
      <div>
        <h4 className="mb-4 text-sm font-semibold text-muted-foreground">Default</h4>
        <Timeline size="default" items={orderTrackingItems.slice(0, 2)} />
      </div>
      <div>
        <h4 className="mb-4 text-sm font-semibold text-muted-foreground">Large</h4>
        <Timeline size="lg" items={orderTrackingItems.slice(0, 2)} />
      </div>
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<Timeline size="sm" items={items} />
<Timeline size="default" items={items} />
<Timeline size="lg" items={items} />`,
      vue2: `<!-- Ajustar tamanho dos círculos via CSS inline -->
<div class="timeline-icon" style="width: 1.5rem; height: 1.5rem;">1</div>
<div class="timeline-icon" style="width: 2rem; height: 2rem;">2</div>
<div class="timeline-icon" style="width: 2.5rem; height: 2.5rem;">3</div>`,
      vue3: `<EdTimeline size="sm" :items="items" />
<EdTimeline size="default" :items="items" />
<EdTimeline size="lg" :items="items" />`,
    },
  },
};

/**
 * Timeline com diferentes status (cores).
 */
export const StatusVariants: Story = {
  args: {
    orientation: "vertical",
    items: errorLogItems,
    size: "default",
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { Timeline } from "@fabioeducacross/ui";

const logs = [
  { title: "Erro de Conexão", status: "error", icon: <XCircle /> },
  { title: "Tentativa de Reconexão", status: "warning", icon: <AlertCircle /> },
  { title: "Conexão Restaurada", status: "success", icon: <CheckCircle2 /> },
];

<Timeline items={logs} />`,
      vue2: `<!-- Usar classes do Bootstrap para cores -->
<div class="timeline-icon bg-danger">❌</div>
<div class="timeline-icon bg-warning">⚠️</div>
<div class="timeline-icon bg-success">✅</div>`,
      vue3: `<EdTimeline :items="logs" />`,
    },
  },
};

/**
 * Timeline sem conectores (itens independentes).
 */
export const WithoutConnectors: Story = {
  args: {
    orientation: "vertical",
    items: activityItems.slice(0, 3),
    showConnectors: false,
  },
  parameters: {
    multiFrameworkCode: {
      react: `<Timeline items={items} showConnectors={false} />`,
      vue2: `<!-- Remover div do conector no template -->`,
      vue3: `<EdTimeline :items="items" :show-connectors="false" />`,
    },
  },
};

/**
 * Caso de uso: Rastreamento de pedido E-commerce.
 */
export const OrderTracking: Story = {
  render: () => (
    <div className="w-full max-w-md rounded-lg border p-6">
      <h3 className="mb-4 text-lg font-semibold">Rastreamento do Pedido #12345</h3>
      <Timeline
        orientation="vertical"
        items={activityItems}
        size="default"
      />
      <div className="mt-6 flex items-center justify-between rounded-md bg-muted p-3 text-sm">
        <span className="text-muted-foreground">Previsão de entrega:</span>
        <span className="font-semibold">25/01/2026, 18:00</span>
      </div>
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `import { Timeline } from "@fabioeducacross/ui";
import { CheckCircle2, Clock, Package } from "lucide-react";

function OrderTracking() {
  const items = [
    { title: "Pedido realizado", status: "success", icon: <CheckCircle2 /> },
    { title: "Processando", status: "active", icon: <Clock /> },
    { title: "Em separação", status: "default", icon: <Package /> },
  ];

  return (
    <div className="rounded-lg border p-6">
      <h3>Rastreamento #12345</h3>
      <Timeline items={items} />
    </div>
  );
}`,
      vue2: `<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-4">Rastreamento #12345</h5>
      <!-- Timeline vertical customizada -->
    </div>
  </div>
</template>`,
      vue3: `<script setup lang="ts">
import { EdTimeline } from "@fabioeducacross/ui-vue3";
const items = [...]; // mesmo array de items
</script>

<template>
  <div class="rounded-lg border p-6">
    <h3>Rastreamento #12345</h3>
    <EdTimeline :items="items" />
  </div>
</template>`,
    },
  },
};

/**
 * Caso de uso: Histórico de atividades do usuário.
 */
export const ActivityFeed: Story = {
  render: () => {
    const activities: TimelineItemData[] = [
      {
        title: "João Silva comentou no seu post",
        description: "\"Excelente conteúdo! Muito útil para iniciantes.\"",
        timestamp: "Há 5 minutos",
        status: "default",
      },
      {
        title: "Você publicou um novo artigo",
        description: "\"Como criar um Design System do zero\"",
        timestamp: "Há 2 horas",
        status: "success",
      },
      {
        title: "Maria Oliveira curtiu sua foto",
        timestamp: "Ontem às 18:30",
        status: "default",
      },
      {
        title: "Você ganhou uma nova conquista",
        description: "🏆 Primeiro artigo com 100 curtidas!",
        timestamp: "2 dias atrás",
        status: "success",
      },
    ];

    return (
      <div className="w-full max-w-lg rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Atividades Recentes</h3>
        <Timeline orientation="vertical" items={activities} size="sm" />
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { Timeline } from "@fabioeducacross/ui";

const activities = [
  { title: "João comentou", description: "Ótimo post!", timestamp: "Há 5 min" },
  { title: "Novo artigo publicado", timestamp: "Há 2 horas", status: "success" },
];

<Timeline orientation="vertical" items={activities} size="sm" />`,
      vue2: `<template>
  <div class="card">
    <div class="card-body">
      <h5>Atividades Recentes</h5>
      <!-- Timeline customizada -->
    </div>
  </div>
</template>`,
      vue3: `<EdTimeline orientation="vertical" :items="activities" size="sm" />`,
    },
  },
};
