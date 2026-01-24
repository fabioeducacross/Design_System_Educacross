import type { Meta, StoryObj } from "@storybook/react";
import { TabRouter, type TabRoute } from "@fabioeducacross/ui";
import * as React from "react";
import {
  Settings,
  User,
  Bell,
  Lock,
  CreditCard,
  Mail,
  Shield,
  Database,
  Palette,
  FileText,
} from "lucide-react";

const meta = {
  title: "Components/TabRouter",
  component: TabRouter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Componente de tabs integrado com roteamento de URL. Sincroniza tabs com window.location (hash ou pathname), suporta navegação browser (back/forward), callbacks de mudança, e opções de preservar scroll. Ideal para páginas de configurações, dashboards e documentação.",
      },
    },
  },
  argTypes: {
    mode: {
      control: "select",
      options: ["hash", "path"],
      description: "Modo de roteamento: hash (#/tab) ou path (/tab)",
    },
    routes: {
      description: "Array de rotas/tabs com value, label, path e content",
    },
    basePath: {
      control: "text",
      description: "Prefixo das URLs (apenas para mode='path')",
    },
    syncUrl: {
      control: "boolean",
      description: "Sincronizar com URL automaticamente",
    },
    preserveScroll: {
      control: "boolean",
      description: "Preservar posição do scroll ao mudar de tab",
    },
    replace: {
      control: "boolean",
      description: "Usar history.replace ao invés de history.push",
    },
    variant: {
      control: "select",
      options: ["default", "outline", "pills", "rounded"],
      description: "Variante visual (herda de Tabs)",
    },
  },
} satisfies Meta<typeof TabRouter>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Hash Mode - Usa fragment identifier (#/tab) para routing.
 * Ideal para SPAs sem servidor de rotas configurado.
 */
export const HashMode: Story = {
  render: () => {
    const routes: TabRoute[] = [
      {
        value: "profile",
        label: "Perfil",
        path: "/profile",
        icon: <User className="h-4 w-4" />,
        content: (
          <div className="space-y-4 p-6">
            <h2 className="text-2xl font-bold">Configurações de Perfil</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Nome</label>
                <input
                  type="text"
                  defaultValue="João Silva"
                  className="mt-1 w-full rounded-md border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  defaultValue="joao@example.com"
                  className="mt-1 w-full rounded-md border px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Bio</label>
                <textarea
                  rows={4}
                  defaultValue="Desenvolvedor Full Stack apaixonado por criar experiências incríveis."
                  className="mt-1 w-full rounded-md border px-3 py-2"
                />
              </div>
            </div>
          </div>
        ),
      },
      {
        value: "notifications",
        label: "Notificações",
        path: "/notifications",
        icon: <Bell className="h-4 w-4" />,
        content: (
          <div className="space-y-4 p-6">
            <h2 className="text-2xl font-bold">Preferências de Notificações</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
                <span>Email sobre novos comentários</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="h-4 w-4" />
                <span>Email sobre menções</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>Newsletter semanal</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>Ofertas e promoções</span>
              </label>
            </div>
          </div>
        ),
      },
      {
        value: "security",
        label: "Segurança",
        path: "/security",
        icon: <Lock className="h-4 w-4" />,
        content: (
          <div className="space-y-4 p-6">
            <h2 className="text-2xl font-bold">Segurança e Privacidade</h2>
            <div className="space-y-3">
              <button className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">
                Alterar Senha
              </button>
              <button className="rounded-md bg-secondary px-4 py-2 text-sm">
                Ativar Autenticação de Dois Fatores
              </button>
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold">Sessões Ativas</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Windows - Chrome - Último acesso: há 5 minutos
                </p>
                <button className="mt-2 text-sm text-destructive">Encerrar sessão</button>
              </div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="w-[700px]">
        <TabRouter
          mode="hash"
          routes={routes}
          defaultRoute="profile"
          onChange={(route) => console.log("Rota mudou:", route)}
        />
        <p className="mt-4 text-xs text-muted-foreground">
          Verifique a URL: muda para #/profile, #/notifications, #/security
        </p>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { TabRouter } from "@fabioeducacross/ui";
import { User, Bell, Lock } from "lucide-react";

function SettingsPage() {
  const routes = [
    {
      value: "profile",
      label: "Perfil",
      path: "/profile",
      icon: <User className="h-4 w-4" />,
      content: <ProfileSettings />,
    },
    {
      value: "notifications",
      label: "Notificações",
      path: "/notifications",
      icon: <Bell className="h-4 w-4" />,
      content: <NotificationSettings />,
    },
    {
      value: "security",
      label: "Segurança",
      path: "/security",
      icon: <Lock className="h-4 w-4" />,
      content: <SecuritySettings />,
    },
  ];

  return (
    <TabRouter
      mode="hash"  // URL: #/profile, #/notifications, #/security
      routes={routes}
      defaultRoute="profile"
      onChange={(route) => console.log("Mudou para:", route)}
    />
  );
}`,
      vue2: `<!-- Bootstrap Hash Router Simulation -->
<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" :key="tab.value" class="nav-item">
        <a 
          :class="['nav-link', { active: activeTab === tab.value }]"
          :href="'#' + tab.path"
          @click.prevent="changeTab(tab.value)"
        >
          <i :class="tab.icon"></i> {{ tab.label }}
        </a>
      </li>
    </ul>

    <div class="tab-content p-4">
      <div v-for="tab in tabs" :key="tab.value" v-show="activeTab === tab.value">
        <component :is="tab.component" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 'profile',
      tabs: [
        { value: 'profile', label: 'Perfil', path: '/profile', icon: 'bi-person', component: 'ProfileSettings' },
        { value: 'notifications', label: 'Notificações', path: '/notifications', icon: 'bi-bell', component: 'NotificationSettings' },
        { value: 'security', label: 'Segurança', path: '/security', icon: 'bi-lock', component: 'SecuritySettings' },
      ]
    };
  },
  mounted() {
    // Sync with URL hash on mount
    const hash = window.location.hash.slice(1);
    const tab = this.tabs.find(t => t.path === hash);
    if (tab) this.activeTab = tab.value;

    // Listen to hash changes
    window.addEventListener('hashchange', this.handleHashChange);
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.handleHashChange);
  },
  methods: {
    changeTab(tabValue) {
      this.activeTab = tabValue;
      const tab = this.tabs.find(t => t.value === tabValue);
      window.location.hash = tab.path;
    },
    handleHashChange() {
      const hash = window.location.hash.slice(1);
      const tab = this.tabs.find(t => t.path === hash);
      if (tab) this.activeTab = tab.value;
    }
  }
};
</script>`,
      vue3: `<script setup lang="ts">
import { EdTabRouter } from "@fabioeducacross/ui-vue3";
import { User, Bell, Lock } from "lucide-vue-next";

const routes = [
  {
    value: "profile",
    label: "Perfil",
    path: "/profile",
    icon: User,
    content: ProfileSettings,
  },
  {
    value: "notifications",
    label: "Notificações",
    path: "/notifications",
    icon: Bell,
    content: NotificationSettings,
  },
  {
    value: "security",
    label: "Segurança",
    path: "/security",
    icon: Lock,
    content: SecuritySettings,
  },
];
</script>

<template>
  <EdTabRouter
    mode="hash"
    :routes="routes"
    default-route="profile"
    @change="(route) => console.log('Mudou para:', route)"
  />
</template>`,
    },
  },
};

/**
 * Path Mode - Usa pathname completo para routing.
 * Requer servidor configurado para SPAs (ex: Vercel, Netlify).
 */
export const PathMode: Story = {
  render: () => {
    const routes: TabRoute[] = [
      {
        value: "overview",
        label: "Visão Geral",
        path: "/overview",
        icon: <FileText className="h-4 w-4" />,
        content: (
          <div className="space-y-4 p-6">
            <h2 className="text-2xl font-bold">Dashboard - Visão Geral</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Usuários Ativos</p>
                <p className="text-3xl font-bold">1.234</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Receita</p>
                <p className="text-3xl font-bold">R$ 45.678</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Conversão</p>
                <p className="text-3xl font-bold">12.5%</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        value: "analytics",
        label: "Analytics",
        path: "/analytics",
        icon: <Database className="h-4 w-4" />,
        content: (
          <div className="space-y-4 p-6">
            <h2 className="text-2xl font-bold">Analytics</h2>
            <p className="text-muted-foreground">
              Gráficos e métricas detalhadas apareceriam aqui.
            </p>
          </div>
        ),
      },
      {
        value: "settings",
        label: "Configurações",
        path: "/settings",
        icon: <Settings className="h-4 w-4" />,
        content: (
          <div className="space-y-4 p-6">
            <h2 className="text-2xl font-bold">Configurações do Dashboard</h2>
            <p className="text-muted-foreground">Opções de configuração...</p>
          </div>
        ),
      },
    ];

    return (
      <div className="w-[700px]">
        <TabRouter
          mode="path"
          basePath="/dashboard"
          routes={routes}
          defaultRoute="overview"
          syncUrl={false}
        />
        <p className="mt-4 text-xs text-muted-foreground">
          Path mode: URL seria /dashboard/overview, /dashboard/analytics, etc
          <br />
          (syncUrl desabilitado neste exemplo para funcionar no Storybook)
        </p>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { TabRouter } from "@fabioeducacross/ui";

function DashboardPage() {
  const routes = [
    {
      value: "overview",
      label: "Visão Geral",
      path: "/overview",
      content: <OverviewPanel />,
    },
    {
      value: "analytics",
      label: "Analytics",
      path: "/analytics",
      content: <AnalyticsPanel />,
    },
  ];

  return (
    <TabRouter
      mode="path"
      basePath="/dashboard"  // URLs: /dashboard/overview, /dashboard/analytics
      routes={routes}
      defaultRoute="overview"
    />
  );
}`,
      vue2: `<!-- Vue Router Integration -->
<template>
  <div>
    <ul class="nav nav-tabs">
      <li v-for="tab in tabs" :key="tab.value" class="nav-item">
        <router-link 
          :to="basePath + tab.path"
          class="nav-link"
          active-class="active"
        >
          {{ tab.label }}
        </router-link>
      </li>
    </ul>

    <div class="tab-content p-4">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      basePath: '/dashboard',
      tabs: [
        { value: 'overview', label: 'Visão Geral', path: '/overview' },
        { value: 'analytics', label: 'Analytics', path: '/analytics' },
      ]
    };
  }
};
</script>`,
      vue3: `<EdTabRouter
  mode="path"
  base-path="/dashboard"
  :routes="routes"
  default-route="overview"
/>`,
    },
  },
};

/**
 * Variants - Diferentes estilos visuais (herda de Tabs).
 */
export const Variants: Story = {
  render: () => {
    const routes: TabRoute[] = [
      {
        value: "general",
        label: "Geral",
        path: "/general",
        content: <div className="p-6">Configurações gerais</div>,
      },
      {
        value: "billing",
        label: "Pagamento",
        path: "/billing",
        content: <div className="p-6">Informações de pagamento</div>,
      },
      {
        value: "team",
        label: "Equipe",
        path: "/team",
        content: <div className="p-6">Gerenciar equipe</div>,
      },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-2 text-sm font-medium">Default</h3>
          <TabRouter mode="hash" routes={routes} variant="default" syncUrl={false} />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Outline</h3>
          <TabRouter mode="hash" routes={routes} variant="outline" syncUrl={false} />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Pills</h3>
          <TabRouter mode="hash" routes={routes} variant="pills" syncUrl={false} />
        </div>

        <div>
          <h3 className="mb-2 text-sm font-medium">Rounded</h3>
          <TabRouter mode="hash" routes={routes} variant="rounded" syncUrl={false} />
        </div>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `<TabRouter
  mode="hash"
  routes={routes}
  variant="pills"  // default | outline | pills | rounded
/>`,
      vue2: `<ul class="nav nav-pills">
  <li v-for="tab in tabs" :key="tab.value" class="nav-item">
    <a :class="['nav-link', { active: activeTab === tab.value }]" @click="changeTab(tab)">
      {{ tab.label }}
    </a>
  </li>
</ul>`,
      vue3: `<EdTabRouter
  mode="hash"
  :routes="routes"
  variant="pills"
/>`,
    },
  },
};

/**
 * Documentation Navigation - Navegação de documentação com seções.
 */
export const DocumentationNav: Story = {
  render: () => {
    const routes: TabRoute[] = [
      {
        value: "getting-started",
        label: "Começando",
        path: "/getting-started",
        content: (
          <div className="prose max-w-none p-6">
            <h1>Começando</h1>
            <p>
              Bem-vindo à documentação! Este guia vai te ajudar a começar rapidamente com
              nossa biblioteca de componentes.
            </p>
            <h2>Instalação</h2>
            <pre className="rounded-lg bg-muted p-4">
              <code>npm install @fabioeducacross/ui</code>
            </pre>
            <h2>Uso Básico</h2>
            <p>Importe os componentes que você precisa:</p>
            <pre className="rounded-lg bg-muted p-4">
              <code>{`import { Button, Card } from "@fabioeducacross/ui";`}</code>
            </pre>
          </div>
        ),
      },
      {
        value: "components",
        label: "Componentes",
        path: "/components",
        content: (
          <div className="prose max-w-none p-6">
            <h1>Componentes</h1>
            <p>Lista completa de componentes disponíveis:</p>
            <ul>
              <li>Button - Botões interativos</li>
              <li>Card - Containers de conteúdo</li>
              <li>Input - Campos de entrada</li>
              <li>Select - Seletores dropdown</li>
              <li>TabRouter - Tabs com routing (você está aqui!)</li>
            </ul>
          </div>
        ),
      },
      {
        value: "theming",
        label: "Temas",
        path: "/theming",
        icon: <Palette className="h-4 w-4" />,
        content: (
          <div className="prose max-w-none p-6">
            <h1>Customização de Temas</h1>
            <p>Configure cores, fontes e espaçamentos:</p>
            <pre className="rounded-lg bg-muted p-4">
              <code>
                {`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { ... }
      }
    }
  }
}`}
              </code>
            </pre>
          </div>
        ),
      },
      {
        value: "api",
        label: "API Reference",
        path: "/api",
        content: (
          <div className="prose max-w-none p-6">
            <h1>API Reference</h1>
            <p>Documentação completa da API de cada componente.</p>
          </div>
        ),
      },
    ];

    return (
      <div className="w-[900px]">
        <TabRouter
          mode="hash"
          routes={routes}
          defaultRoute="getting-started"
          variant="outline"
        />
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `const docRoutes = [
  {
    value: "getting-started",
    label: "Começando",
    path: "/getting-started",
    content: <GettingStartedDoc />,
  },
  {
    value: "components",
    label: "Componentes",
    path: "/components",
    content: <ComponentsDoc />,
  },
  {
    value: "theming",
    label: "Temas",
    path: "/theming",
    icon: <Palette />,
    content: <ThemingDoc />,
  },
];

<TabRouter
  mode="hash"
  routes={docRoutes}
  defaultRoute="getting-started"
  variant="outline"
/>`,
      vue2: `<div>
  <ul class="nav nav-tabs nav-justified">
    <li v-for="section in docSections" :key="section.value" class="nav-item">
      <a 
        :href="'#' + section.path"
        :class="['nav-link', { active: activeSection === section.value }]"
        @click.prevent="changeSection(section.value)"
      >
        <i v-if="section.icon" :class="section.icon"></i>
        {{ section.label }}
      </a>
    </li>
  </ul>
  <div class="p-4">
    <component :is="activeContent" />
  </div>
</div>`,
      vue3: `<EdTabRouter
  mode="hash"
  :routes="docRoutes"
  default-route="getting-started"
  variant="outline"
/>`,
    },
  },
};

/**
 * With Icons - Tabs com ícones ao lado do label.
 */
export const WithIcons: Story = {
  render: () => {
    const routes: TabRoute[] = [
      {
        value: "account",
        label: "Conta",
        path: "/account",
        icon: <User className="h-4 w-4" />,
        content: (
          <div className="p-6">
            <h2 className="text-xl font-bold">Informações da Conta</h2>
          </div>
        ),
      },
      {
        value: "billing",
        label: "Pagamento",
        path: "/billing",
        icon: <CreditCard className="h-4 w-4" />,
        content: (
          <div className="p-6">
            <h2 className="text-xl font-bold">Formas de Pagamento</h2>
          </div>
        ),
      },
      {
        value: "email",
        label: "Email",
        path: "/email",
        icon: <Mail className="h-4 w-4" />,
        content: (
          <div className="p-6">
            <h2 className="text-xl font-bold">Preferências de Email</h2>
          </div>
        ),
      },
      {
        value: "privacy",
        label: "Privacidade",
        path: "/privacy",
        icon: <Shield className="h-4 w-4" />,
        content: (
          <div className="p-6">
            <h2 className="text-xl font-bold">Privacidade e Dados</h2>
          </div>
        ),
      },
    ];

    return (
      <div className="w-[700px]">
        <TabRouter mode="hash" routes={routes} variant="pills" syncUrl={false} />
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { User, CreditCard, Mail, Shield } from "lucide-react";

const routes = [
  {
    value: "account",
    label: "Conta",
    path: "/account",
    icon: <User className="h-4 w-4" />,  // Ícone antes do label
    content: <AccountSettings />,
  },
  {
    value: "billing",
    label: "Pagamento",
    path: "/billing",
    icon: <CreditCard className="h-4 w-4" />,
    content: <BillingSettings />,
  },
];

<TabRouter mode="hash" routes={routes} variant="pills" />`,
      vue2: `<ul class="nav nav-pills">
  <li v-for="tab in tabs" :key="tab.value" class="nav-item">
    <a :class="['nav-link', { active: activeTab === tab.value }]" @click="changeTab(tab)">
      <i :class="tab.icon"></i> {{ tab.label }}
    </a>
  </li>
</ul>`,
      vue3: `<script setup lang="ts">
import { User, CreditCard } from "lucide-vue-next";

const routes = [
  { value: "account", label: "Conta", path: "/account", icon: User, content: AccountSettings },
  { value: "billing", label: "Pagamento", path: "/billing", icon: CreditCard, content: BillingSettings },
];
</script>

<template>
  <EdTabRouter mode="hash" :routes="routes" variant="pills" />
</template>`,
    },
  },
};

/**
 * PreserveScroll - Mantém a posição do scroll ao trocar de tab.
 */
export const PreserveScroll: Story = {
  render: () => {
    const LongContent = ({ title }: { title: string }) => (
      <div className="space-y-4 p-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i}>
            Parágrafo {i + 1}: Este é um conteúdo longo para demonstrar o preserveScroll.
            Role a página para baixo e troque de tab para ver o efeito. Lorem ipsum dolor sit
            amet, consectetur adipiscing elit.
          </p>
        ))}
      </div>
    );

    const routes: TabRoute[] = [
      {
        value: "tab1",
        label: "Tab 1",
        path: "/tab1",
        content: <LongContent title="Conteúdo da Tab 1" />,
      },
      {
        value: "tab2",
        label: "Tab 2",
        path: "/tab2",
        content: <LongContent title="Conteúdo da Tab 2" />,
      },
      {
        value: "tab3",
        label: "Tab 3",
        path: "/tab3",
        content: <LongContent title="Conteúdo da Tab 3" />,
      },
    ];

    return (
      <div className="w-[700px]">
        <p className="mb-4 rounded-lg bg-blue-50 p-3 text-sm">
          ℹ️ Role para baixo e troque de tab. A posição do scroll será preservada!
        </p>
        <TabRouter
          mode="hash"
          routes={routes}
          preserveScroll={true}
          syncUrl={false}
        />
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `<TabRouter
  mode="hash"
  routes={routes}
  preserveScroll={true}  // Mantém scroll ao trocar de tab
/>`,
      vue2: `<script>
export default {
  data() {
    return {
      scrollPosition: 0
    };
  },
  methods: {
    changeTab(tab) {
      this.scrollPosition = window.scrollY;  // Salva posição
      this.activeTab = tab;
      this.$nextTick(() => {
        window.scrollTo(0, this.scrollPosition);  // Restaura
      });
    }
  }
};
</script>`,
      vue3: `<EdTabRouter
  mode="hash"
  :routes="routes"
  :preserve-scroll="true"
/>`,
    },
  },
};
