import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "@fabioeducacross/ui";

const meta = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Indicador de progresso com 5 variantes: linear (barra horizontal), circular (spinner), stepped (multi-passo), radial (anel brilhante) e animated (contador). Suporta estados determinados e indeterminados.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["linear", "circular", "stepped", "radial", "animated"],
      description: "Tipo de visualização do progresso",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
      description: "Tamanho do indicador",
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      description: "Valor atual do progresso (0-100)",
    },
    max: {
      control: { type: "number", min: 1 },
      description: "Valor máximo (padrão 100)",
    },
    showLabel: {
      control: "boolean",
      description: "Mostrar label com percentual ou contagem",
    },
    indeterminate: {
      control: "boolean",
      description: "Estado indeterminado com animação contínua",
    },
    color: {
      control: "select",
      options: ["primary", "success", "warning", "destructive"],
      description: "Cor do indicador de progresso",
    },
    steps: {
      control: { type: "number", min: 2, max: 10 },
      description: "Número de passos (apenas variant='stepped')",
    },
    currentStep: {
      control: { type: "number", min: 1, max: 10 },
      description: "Passo atual (apenas variant='stepped')",
    },
    duration: {
      control: { type: "number", min: 500, max: 5000 },
      description: "Duração da animação em ms (apenas variant='animated')",
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "linear",
    value: 60,
    size: "default",
  },
  parameters: {
    multiFrameworkCode: {
      react: `<Progress value={60} />`,
      vue2: `<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 60%" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
    60%
  </div>
</div>`,
      vue3: `<EdProgress :value="60" />`,
    },
  },
};

export const LinearWithLabel: Story = {
  args: {
    variant: "linear",
    value: 75,
    size: "default",
    showLabel: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `<Progress value={75} showLabel />`,
      vue2: `<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    75%
  </div>
</div>`,
      vue3: `<EdProgress :value="75" show-label />`,
    },
  },
};

export const LinearIndeterminate: Story = {
  args: {
    variant: "linear",
    indeterminate: true,
    size: "default",
  },
  parameters: {
    multiFrameworkCode: {
      react: `<Progress indeterminate />`,
      vue2: `<div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>
</div>`,
      vue3: `<EdProgress indeterminate />`,
    },
  },
};

export const LinearColors: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Progress value={60} color="primary" />
      <Progress value={80} color="success" />
      <Progress value={45} color="warning" />
      <Progress value={30} color="destructive" />
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<div className="space-y-4 w-64">
  <Progress value={60} color="primary" />
  <Progress value={80} color="success" />
  <Progress value={45} color="warning" />
  <Progress value={30} color="destructive" />
</div>`,
      vue2: `<div>
  <div class="progress mb-3">
    <div class="progress-bar bg-primary" style="width: 60%">60%</div>
  </div>
  <div class="progress mb-3">
    <div class="progress-bar bg-success" style="width: 80%">80%</div>
  </div>
  <div class="progress mb-3">
    <div class="progress-bar bg-warning" style="width: 45%">45%</div>
  </div>
  <div class="progress">
    <div class="progress-bar bg-danger" style="width: 30%">30%</div>
  </div>
</div>`,
      vue3: `<div class="space-y-4 w-64">
  <EdProgress :value="60" color="primary" />
  <EdProgress :value="80" color="success" />
  <EdProgress :value="45" color="warning" />
  <EdProgress :value="30" color="destructive" />
</div>`,
    },
  },
};

export const LinearSizes: Story = {
  render: () => (
    <div className="space-y-4 w-64">
      <Progress value={60} size="sm" />
      <Progress value={60} size="default" />
      <Progress value={60} size="lg" />
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<div className="space-y-4 w-64">
  <Progress value={60} size="sm" />
  <Progress value={60} size="default" />
  <Progress value={60} size="lg" />
</div>`,
      vue2: `<div>
  <div class="progress mb-3" style="height: 0.25rem;">
    <div class="progress-bar" style="width: 60%"></div>
  </div>
  <div class="progress mb-3" style="height: 0.5rem;">
    <div class="progress-bar" style="width: 60%"></div>
  </div>
  <div class="progress" style="height: 0.75rem;">
    <div class="progress-bar" style="width: 60%"></div>
  </div>
</div>`,
      vue3: `<div class="space-y-4 w-64">
  <EdProgress :value="60" size="sm" />
  <EdProgress :value="60" size="default" />
  <EdProgress :value="60" size="lg" />
</div>`,
    },
  },
};

export const Circular: Story = {
  args: {
    variant: "circular",
    value: 65,
    size: "default",
    showLabel: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `<Progress variant="circular" value={65} showLabel />`,
      vue2: `<div class="spinner-border text-primary" role="status" style="width: 4rem; height: 4rem;">
  <span class="sr-only">65%</span>
</div>
<!-- Nota: Bootstrap não tem circular determinado nativo -->`,
      vue3: `<EdProgress variant="circular" :value="65" show-label />`,
    },
  },
};

export const CircularIndeterminate: Story = {
  args: {
    variant: "circular",
    indeterminate: true,
    size: "default",
  },
  parameters: {
    multiFrameworkCode: {
      react: `<Progress variant="circular" indeterminate />`,
      vue2: `<div class="spinner-border text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>`,
      vue3: `<EdProgress variant="circular" indeterminate />`,
    },
  },
};

export const CircularSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Progress variant="circular" value={70} size="sm" showLabel />
      <Progress variant="circular" value={70} size="default" showLabel />
      <Progress variant="circular" value={70} size="lg" showLabel />
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<div className="flex items-center gap-6">
  <Progress variant="circular" value={70} size="sm" showLabel />
  <Progress variant="circular" value={70} size="default" showLabel />
  <Progress variant="circular" value={70} size="lg" showLabel />
</div>`,
      vue2: `<div class="d-flex align-items-center gap-3">
  <div class="spinner-border spinner-border-sm text-primary" role="status">
    <span class="sr-only">70%</span>
  </div>
  <div class="spinner-border text-primary" role="status" style="width: 4rem; height: 4rem;">
    <span class="sr-only">70%</span>
  </div>
  <div class="spinner-border text-primary" role="status" style="width: 6rem; height: 6rem;">
    <span class="sr-only">70%</span>
  </div>
</div>`,
      vue3: `<div class="flex items-center gap-6">
  <EdProgress variant="circular" :value="70" size="sm" show-label />
  <EdProgress variant="circular" :value="70" size="default" show-label />
  <EdProgress variant="circular" :value="70" size="lg" show-label />
</div>`,
    },
  },
};

export const Stepped: Story = {
  args: {
    variant: "stepped",
    steps: 4,
    currentStep: 2,
    showLabel: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `<Progress variant="stepped" steps={4} currentStep={2} showLabel />`,
      vue2: `<div class="d-flex align-items-center gap-2">
  <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 2rem; height: 2rem;">1</div>
  <div class="flex-fill border-top border-primary"></div>
  <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 2rem; height: 2rem;">2</div>
  <div class="flex-fill border-top"></div>
  <div class="rounded-circle border border-secondary d-flex align-items-center justify-content-center" style="width: 2rem; height: 2rem;">3</div>
  <div class="flex-fill border-top"></div>
  <div class="rounded-circle border border-secondary d-flex align-items-center justify-content-center" style="width: 2rem; height: 2rem;">4</div>
</div>`,
      vue3: `<EdProgress variant="stepped" :steps="4" :current-step="2" show-label />`,
    },
  },
};

export const Radial: Story = {
  args: {
    variant: "radial",
    value: 85,
    size: "default",
    showLabel: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `<Progress variant="radial" value={85} showLabel />`,
      vue2: `<!-- Bootstrap não tem radial nativo, use componente customizado ou biblioteca externa -->
<div class="position-relative d-inline-flex align-items-center justify-content-center" style="width: 6rem; height: 6rem;">
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" stroke-width="6"></circle>
    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="6" stroke-dasharray="251.2" stroke-dashoffset="37.68" stroke-linecap="round" transform="rotate(-90 50 50)"></circle>
  </svg>
  <span class="position-absolute">85%</span>
</div>`,
      vue3: `<EdProgress variant="radial" :value="85" show-label />`,
    },
  },
};

export const Animated: Story = {
  args: {
    variant: "animated",
    value: 42,
    max: 100,
    duration: 2000,
    showLabel: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `<Progress variant="animated" value={42} max={100} duration={2000} showLabel />`,
      vue2: `<!-- Bootstrap não tem count-up nativo, use JavaScript customizado -->
<div class="display-4 font-weight-bold">
  <span id="counter">0</span> / 100
</div>
<script>
  // Animar de 0 a 42 em 2 segundos
  let current = 0;
  const interval = setInterval(() => {
    if (current >= 42) clearInterval(interval);
    else document.getElementById('counter').textContent = ++current;
  }, 2000 / 42);
</script>`,
      vue3: `<EdProgress variant="animated" :value="42" :max="100" :duration="2000" show-label />`,
    },
  },
};

export const FileUploadProgress: Story = {
  render: () => (
    <div className="w-80 space-y-2 rounded-lg border p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">documento-final.pdf</span>
        <span className="text-muted-foreground">2.4 MB</span>
      </div>
      <Progress value={68} showLabel />
      <p className="text-xs text-muted-foreground">Enviando... 1.6 MB de 2.4 MB</p>
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<div className="w-80 space-y-2 rounded-lg border p-4">
  <div className="flex items-center justify-between text-sm">
    <span className="font-medium">documento-final.pdf</span>
    <span className="text-muted-foreground">2.4 MB</span>
  </div>
  <Progress value={68} showLabel />
  <p className="text-xs text-muted-foreground">
    Enviando... 1.6 MB de 2.4 MB
  </p>
</div>`,
      vue2: `<div class="card" style="width: 20rem;">
  <div class="card-body">
    <div class="d-flex justify-content-between align-items-center mb-2">
      <span class="font-weight-medium">documento-final.pdf</span>
      <small class="text-muted">2.4 MB</small>
    </div>
    <div class="progress mb-2">
      <div class="progress-bar" role="progressbar" style="width: 68%" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100">68%</div>
    </div>
    <small class="text-muted">Enviando... 1.6 MB de 2.4 MB</small>
  </div>
</div>`,
      vue3: `<div class="w-80 space-y-2 rounded-lg border p-4">
  <div class="flex items-center justify-between text-sm">
    <span class="font-medium">documento-final.pdf</span>
    <span class="text-muted-foreground">2.4 MB</span>
  </div>
  <EdProgress :value="68" show-label />
  <p class="text-xs text-muted-foreground">
    Enviando... 1.6 MB de 2.4 MB
  </p>
</div>`,
    },
  },
};

export const CourseProgress: Story = {
  render: () => (
    <div className="w-80 space-y-4 rounded-lg border p-4">
      <div>
        <h3 className="font-semibold">Introdução ao TypeScript</h3>
        <p className="text-sm text-muted-foreground">7 de 12 aulas concluídas</p>
      </div>
      <Progress value={58} color="success" showLabel />
      <Progress variant="stepped" steps={4} currentStep={3} showLabel />
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Módulo 3: Generics</span>
        <Progress variant="circular" value={58} size="sm" />
      </div>
    </div>
  ),
  parameters: {
    multiFrameworkCode: {
      react: `<div className="w-80 space-y-4 rounded-lg border p-4">
  <div>
    <h3 className="font-semibold">Introdução ao TypeScript</h3>
    <p className="text-sm text-muted-foreground">
      7 de 12 aulas concluídas
    </p>
  </div>
  <Progress value={58} color="success" showLabel />
  <Progress variant="stepped" steps={4} currentStep={3} showLabel />
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">Módulo 3: Generics</span>
    <Progress variant="circular" value={58} size="sm" />
  </div>
</div>`,
      vue2: `<div class="card" style="width: 20rem;">
  <div class="card-body">
    <h5 class="card-title">Introdução ao TypeScript</h5>
    <p class="card-text text-muted">7 de 12 aulas concluídas</p>
    
    <div class="progress mb-3">
      <div class="progress-bar bg-success" style="width: 58%" aria-valuenow="58" aria-valuemin="0" aria-valuemax="100">58%</div>
    </div>
    
    <!-- Stepped progress (simplificado) -->
    <div class="d-flex align-items-center gap-2 mb-3">
      <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 2rem; height: 2rem;">1</div>
      <div class="flex-fill border-top border-primary"></div>
      <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 2rem; height: 2rem;">2</div>
      <div class="flex-fill border-top border-primary"></div>
      <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 2rem; height: 2rem;">3</div>
      <div class="flex-fill border-top"></div>
      <div class="rounded-circle border border-secondary d-flex align-items-center justify-content-center" style="width: 2rem; height: 2rem;">4</div>
    </div>
    
    <div class="d-flex justify-content-between align-items-center">
      <small class="text-muted">Módulo 3: Generics</small>
      <div class="spinner-border spinner-border-sm text-primary" role="status">
        <span class="sr-only">58%</span>
      </div>
    </div>
  </div>
</div>`,
      vue3: `<div class="w-80 space-y-4 rounded-lg border p-4">
  <div>
    <h3 class="font-semibold">Introdução ao TypeScript</h3>
    <p class="text-sm text-muted-foreground">
      7 de 12 aulas concluídas
    </p>
  </div>
  <EdProgress :value="58" color="success" show-label />
  <EdProgress variant="stepped" :steps="4" :current-step="3" show-label />
  <div class="flex items-center justify-between text-sm">
    <span class="text-muted-foreground">Módulo 3: Generics</span>
    <EdProgress variant="circular" :value="58" size="sm" />
  </div>
</div>`,
    },
  },
};
