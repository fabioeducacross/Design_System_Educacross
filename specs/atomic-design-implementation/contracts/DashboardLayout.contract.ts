/**
 * API CONTRACT: DashboardLayout Component
 * 
 * Este contrato define as regras de uso obrigatórias do DashboardLayout.
 * Violações podem causar problemas de navegação, acessibilidade ou UX.
 * 
 * @component DashboardLayout (Template)
 * @category Layouts
 * @atomic-level Template (Sidebar + Header + Main + Footer)
 */

// ============================================================================
// 1. REGRAS OBRIGATÓRIAS (MUST / MUST NOT)
// ============================================================================

/**
 * ✅ MUST #1: Items da sidebar devem ter ícone
 * 
 * Todos os itens de navegação devem ter ícone visível.
 * Ícones ajudam identificação rápida e funcionam quando sidebar está colapsada.
 */
export const RULE_SIDEBAR_ICONS = {
  rule: "MUST provide icon for all sidebar items",
  rationale: "Sidebar colapsada mostra apenas ícones (sem label)",
  
  // ✅ VÁLIDO
  valid: `
    import { Home, Users, Settings } from "lucide-react";
    
    const sidebarItems: SidebarItem[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home size={20} />,
        href: "/dashboard",
      },
      {
        id: "students",
        label: "Alunos",
        icon: <Users size={20} />,
        href: "/students",
      },
      {
        id: "settings",
        label: "Configurações",
        icon: <Settings size={20} />,
        href: "/settings",
      },
    ];
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    const sidebarItems: SidebarItem[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        // ❌ Sem ícone
        href: "/dashboard",
      },
    ];
    // Sidebar colapsada ficaria vazia
  `,
  
  guideline: "Use lucide-react (20px) ou outro icon set consistente",
} as const;

/**
 * ✅ MUST #2: Items devem ter href OU onClick (não ambos)
 * 
 * Item de navegação deve ser link (href) ou ação (onClick).
 * Nunca os dois ao mesmo tempo (comportamento ambíguo).
 */
export const RULE_HREF_OR_ONCLICK = {
  rule: "MUST provide either href or onClick, not both",
  rationale: "Comportamento ambíguo: navega ou executa ação?",
  
  // ✅ VÁLIDO (Link)
  valid_link: `
    {
      id: "students",
      label: "Alunos",
      icon: <Users size={20} />,
      href: "/students", // ✅ Navegação
    }
  `,
  
  // ✅ VÁLIDO (Ação)
  valid_action: `
    {
      id: "logout",
      label: "Sair",
      icon: <LogOut size={20} />,
      onClick: () => {
        logout();
        router.push("/login");
      }, // ✅ Ação customizada
    }
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    {
      id: "students",
      label: "Alunos",
      icon: <Users size={20} />,
      href: "/students",
      onClick: () => console.log("Clicked"), // ❌ Conflito
    }
    // DashboardLayout não sabe qual usar
  `,
  
  implementation: "href tem prioridade se ambos fornecidos",
} as const;

/**
 * ✅ MUST #3: Active state é responsabilidade do consumidor
 * 
 * DashboardLayout NÃO controla rota ativa automaticamente.
 * Você deve marcar item ativo via prop `active`.
 */
export const RULE_ACTIVE_STATE = {
  rule: "MUST set active prop manually based on current route",
  rationale: "Layout é agnóstico de routing (Next, React Router, etc.)",
  
  // ✅ VÁLIDO (Next.js)
  valid_nextjs: `
    import { usePathname } from "next/navigation";
    
    function DashboardShell() {
      const pathname = usePathname();
      
      const sidebarItems: SidebarItem[] = [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: <Home size={20} />,
          href: "/dashboard",
          active: pathname === "/dashboard", // ✅ Marcado manualmente
        },
        {
          id: "students",
          label: "Alunos",
          icon: <Users size={20} />,
          href: "/students",
          active: pathname.startsWith("/students"), // ✅ Prefixo para subrotas
        },
      ];
      
      return <DashboardLayout sidebar={{ items: sidebarItems }}>...</DashboardLayout>;
    }
  `,
  
  // ✅ VÁLIDO (React Router)
  valid_react_router: `
    import { useLocation } from "react-router-dom";
    
    const location = useLocation();
    
    const sidebarItems: SidebarItem[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home size={20} />,
        href: "/dashboard",
        active: location.pathname === "/dashboard",
      },
    ];
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    const sidebarItems: SidebarItem[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home size={20} />,
        href: "/dashboard",
        // ❌ Sem active, DashboardLayout não sabe destacar
      },
    ];
  `,
  
  automation: "Helper hook useActiveSidebarItem pode ser criado",
} as const;

/**
 * ⛔ MUST NOT #4: Não gerencie autenticação no layout
 * 
 * DashboardLayout NÃO valida autenticação.
 * Use middleware ou HOC para proteger rotas.
 */
export const RULE_NO_AUTH_IN_LAYOUT = {
  rule: "MUST NOT handle authentication in DashboardLayout",
  rationale: "Layout é componente de apresentação, não lógica de negócio",
  
  // ✅ VÁLIDO (Auth middleware separado)
  valid: `
    // middleware.ts (Next.js)
    export function middleware(req: NextRequest) {
      const token = req.cookies.get("auth_token");
      if (!token) {
        return NextResponse.redirect("/login");
      }
    }
    
    // page.tsx
    export default function DashboardPage() {
      // Protegido por middleware
      return (
        <DashboardLayout sidebar={config}>
          <YourContent />
        </DashboardLayout>
      );
    }
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    // ❌ Nunca faça isso no layout
    function DashboardLayout({ children }) {
      const { user } = useAuth();
      
      if (!user) {
        redirect("/login"); // ❌ Lógica de auth no layout
      }
      
      return <div>...</div>;
    }
  `,
  
  guideline: "Layout recebe dados autenticados, não valida autenticação",
} as const;

/**
 * ⛔ MUST NOT #5: Não implemente navegação customizada
 * 
 * DashboardLayout renderiza links, mas não controla navegação.
 * Use Link do framework (Next Link, React Router Link).
 */
export const RULE_NO_CUSTOM_NAVIGATION = {
  rule: "MUST NOT implement custom navigation logic",
  rationale: "Frameworks têm otimizações específicas (prefetch, scroll restoration)",
  
  // ✅ VÁLIDO (usa Link do framework)
  valid: `
    // DashboardLayout internamente
    import Link from "next/link"; // ou React Router
    
    {sidebar.items.map((item) =>
      item.href ? (
        <Link href={item.href} key={item.id}>
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ) : (
        <button onClick={item.onClick} key={item.id}>
          {item.icon}
          <span>{item.label}</span>
        </button>
      )
    )}
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    // ❌ Navegação manual
    <a
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = item.href; // ❌ Quebra SPA
      }}
    >
      {item.label}
    </a>
  `,
  
  implementation: "DashboardLayout usa asChild de Radix Slot se fornecido",
} as const;

/**
 * ⛔ MUST NOT #6: Não mude estrutura HTML do layout
 * 
 * Layout tem estrutura semântica fixa (landmarks).
 * Não customize ordem ou hierarquia de elementos.
 */
export const RULE_NO_STRUCTURE_OVERRIDE = {
  rule: "MUST NOT change layout HTML structure",
  rationale: "Estrutura semântica para acessibilidade (screen readers)",
  
  structure: `
    <div className="dashboard-layout">
      <aside aria-label="Navegação principal"> {/* Sidebar */}
        <nav>...</nav>
      </aside>
      
      <div className="main-container">
        <header> {/* Header fixo */}
          <nav aria-label="Breadcrumbs">...</nav>
        </header>
        
        <main> {/* Conteúdo principal */}
          {children}
        </main>
        
        <footer> {/* Footer opcional */}
          {footer}
        </footer>
      </div>
    </div>
  `,
  
  // ✅ VÁLIDO (customiza conteúdo, não estrutura)
  valid: `
    <DashboardLayout sidebar={config} footer={<CustomFooter />}>
      <YourPage />
    </DashboardLayout>
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    // ❌ Tentar inverter ordem sidebar/main via CSS
    .dashboard-layout {
      display: flex;
      flex-direction: row-reverse; // ❌ Quebra ordem lógica
    }
  `,
  
  guideline: "Use sidebarPosition='right' em vez de CSS",
} as const;

// ============================================================================
// 2. PADRÕES DE COMPOSIÇÃO
// ============================================================================

/**
 * PATTERN #1: Sidebar com submenu (accordion)
 * 
 * Use children para criar menus expandíveis.
 */
export const PATTERN_SIDEBAR_SUBMENU = {
  pattern: "Sidebar with expandable submenus",
  
  example: `
    import { Home, Users, BookOpen, Settings, User, Shield } from "lucide-react";
    import { usePathname } from "next/navigation";
    
    function useTeacherSidebar() {
      const pathname = usePathname();
      
      const items: SidebarItem[] = [
        {
          id: "dashboard",
          label: "Dashboard",
          icon: <Home size={20} />,
          href: "/dashboard",
          active: pathname === "/dashboard",
        },
        {
          id: "students",
          label: "Alunos",
          icon: <Users size={20} />,
          children: [ // ✅ Submenu
            {
              id: "students-list",
              label: "Lista de alunos",
              href: "/students",
              active: pathname === "/students",
            },
            {
              id: "students-performance",
              label: "Desempenho",
              href: "/students/performance",
              active: pathname === "/students/performance",
            },
            {
              id: "students-attendance",
              label: "Frequência",
              href: "/students/attendance",
              active: pathname === "/students/attendance",
            },
          ],
        },
        {
          id: "classes",
          label: "Turmas",
          icon: <BookOpen size={20} />,
          href: "/classes",
          active: pathname.startsWith("/classes"),
        },
        {
          id: "settings",
          label: "Configurações",
          icon: <Settings size={20} />,
          children: [
            {
              id: "profile",
              label: "Perfil",
              href: "/settings/profile",
              active: pathname === "/settings/profile",
            },
            {
              id: "security",
              label: "Segurança",
              href: "/settings/security",
              active: pathname === "/settings/security",
            },
          ],
        },
      ];
      
      return items;
    }
  `,
  
  behavior: [
    "Clique no pai expande/colapsa children",
    "Apenas 1 item expandido por vez (accordion)",
    "Sidebar colapsada oculta submenu (só ícones)",
    "Submenu indentado (16px) para hierarquia visual",
  ],
} as const;

/**
 * PATTERN #2: User menu no header
 * 
 * Use header.userMenu para dropdown de perfil.
 */
export const PATTERN_USER_MENU = {
  pattern: "User menu with profile actions",
  
  example: `
    import { User, Settings, HelpCircle, LogOut } from "lucide-react";
    
    const headerConfig: HeaderConfig = {
      userMenu: {
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.avatarUrl,
        items: [
          {
            id: "profile",
            label: "Meu perfil",
            icon: <User size={16} />,
            href: "/profile",
          },
          {
            id: "settings",
            label: "Configurações",
            icon: <Settings size={16} />,
            href: "/settings",
          },
          {
            id: "help",
            label: "Ajuda",
            icon: <HelpCircle size={16} />,
            href: "/help",
            separator: true, // ✅ Linha separadora após este item
          },
          {
            id: "logout",
            label: "Sair",
            icon: <LogOut size={16} />,
            variant: "destructive", // ✅ Cor vermelha
            onClick: async () => {
              await logout();
              router.push("/login");
            },
          },
        ],
      },
    };
    
    <DashboardLayout sidebar={sidebarConfig} header={headerConfig}>
      {children}
    </DashboardLayout>
  `,
  
  notes: [
    "Avatar mostra iniciais se avatarUrl não fornecido",
    "Email exibido em texto menor abaixo do nome",
    "separator=true adiciona linha divisória",
    "variant='destructive' para ações perigosas",
  ],
} as const;

/**
 * PATTERN #3: Notificações no header
 * 
 * Use header.notifications para sino de notificações.
 */
export const PATTERN_NOTIFICATIONS = {
  pattern: "Notification bell with count",
  
  example: `
    import { useState } from "react";
    
    const [notificationCount, setNotificationCount] = useState(5);
    const [showNotifications, setShowNotifications] = useState(false);
    
    const headerConfig: HeaderConfig = {
      notifications: {
        count: notificationCount,
        onClick: () => setShowNotifications(true),
      },
    };
    
    <DashboardLayout sidebar={sidebarConfig} header={headerConfig}>
      {children}
      
      {showNotifications && (
        <NotificationPanel onClose={() => setShowNotifications(false)} />
      )}
    </DashboardLayout>
  `,
  
  behavior: [
    "Badge vermelho com count (máximo 99+)",
    "onClick abre painel/dropdown customizado (você implementa)",
    "count=0 oculta badge (sino sem número)",
  ],
} as const;

/**
 * PATTERN #4: Breadcrumbs dinâmicos
 * 
 * Use breadcrumbs para navegação hierárquica.
 */
export const PATTERN_BREADCRUMBS = {
  pattern: "Dynamic breadcrumbs based on route",
  
  example: `
    import { usePathname } from "next/navigation";
    
    function useBreadcrumbs() {
      const pathname = usePathname();
      
      // Mapa de rotas → breadcrumbs
      const breadcrumbMap: Record<string, Breadcrumb[]> = {
        "/dashboard": [{ label: "Dashboard" }],
        
        "/students": [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Alunos" },
        ],
        
        "/students/[id]": [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Alunos", href: "/students" },
          { label: studentName }, // Dinâmico
        ],
        
        "/settings/profile": [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Configurações", href: "/settings" },
          { label: "Perfil" },
        ],
      };
      
      return breadcrumbMap[pathname] || [];
    }
    
    // No componente
    const breadcrumbs = useBreadcrumbs();
    
    <DashboardLayout
      sidebar={sidebarConfig}
      breadcrumbs={breadcrumbs}
    >
      {children}
    </DashboardLayout>
  `,
  
  notes: [
    "Último item não tem href (página atual)",
    "Itens clicáveis são links (href fornecido)",
    "Separador (/) automático entre itens",
  ],
} as const;

/**
 * PATTERN #5: Persistência de estado da sidebar
 * 
 * Use localStorage para lembrar se sidebar está aberta/colapsada.
 */
export const PATTERN_SIDEBAR_PERSISTENCE = {
  pattern: "Persist sidebar state in localStorage",
  
  example: `
    import { useState, useEffect } from "react";
    
    function useSidebarState() {
      const [isOpen, setIsOpen] = useState(true);
      
      // Carregar estado do localStorage na montagem
      useEffect(() => {
        const saved = localStorage.getItem("sidebar-open");
        if (saved !== null) {
          setIsOpen(saved === "true");
        }
      }, []);
      
      // Salvar estado no localStorage quando mudar
      const toggleSidebar = (open: boolean) => {
        setIsOpen(open);
        localStorage.setItem("sidebar-open", String(open));
      };
      
      return { isOpen, toggleSidebar };
    }
    
    // No componente
    const { isOpen, toggleSidebar } = useSidebarState();
    
    <DashboardLayout
      sidebar={sidebarConfig}
      defaultSidebarOpen={isOpen}
      onSidebarToggle={toggleSidebar}
    >
      {children}
    </DashboardLayout>
  `,
  
  ssr_safe: `
    // Para Next.js (SSR), evite erro de hydration
    const [isOpen, setIsOpen] = useState<boolean | null>(null);
    
    useEffect(() => {
      const saved = localStorage.getItem("sidebar-open");
      setIsOpen(saved === "true");
    }, []);
    
    if (isOpen === null) return <LoadingLayout />; // Skeleton
    
    <DashboardLayout defaultSidebarOpen={isOpen} onSidebarToggle={...}>
  `,
} as const;

/**
 * PATTERN #6: Responsividade mobile
 * 
 * Sidebar automaticamente vira drawer em mobile (<640px).
 */
export const PATTERN_MOBILE_RESPONSIVE = {
  pattern: "Mobile drawer behavior",
  
  automatic: `
    // DashboardLayout detecta viewport automaticamente
    <DashboardLayout sidebar={config}>
      {children}
    </DashboardLayout>
    
    // Mobile (<640px):
    // - Sidebar oculta por padrão
    // - Hamburger menu no header
    // - Sidebar abre como drawer overlay (Radix Dialog)
    // - Clique em item fecha drawer automaticamente
    
    // Desktop (>640px):
    // - Sidebar sempre visível (ou colapsada)
    // - Toggle colapsa para ícones only
    // - Persistent (não overlay)
  `,
  
  customization: `
    // Forçar drawer mesmo em desktop
    <DashboardLayout
      sidebar={config}
      sidebarBehavior="temporary" // Sempre drawer
    >
      {children}
    </DashboardLayout>
  `,
  
  notes: [
    "Transição suave (300ms ease-in-out)",
    "Backdrop escuro (opacity 0.5) em mobile",
    "Esc fecha drawer",
    "Focus trap ativo quando drawer aberto",
  ],
} as const;

/**
 * PATTERN #7: Badges e contadores
 * 
 * Use badge em itens para notificações/contadores.
 */
export const PATTERN_ITEM_BADGES = {
  pattern: "Badges for notifications and counts",
  
  example: `
    const sidebarItems: SidebarItem[] = [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: <Home size={20} />,
        href: "/dashboard",
      },
      {
        id: "messages",
        label: "Mensagens",
        icon: <MessageSquare size={20} />,
        href: "/messages",
        badge: unreadCount > 0 ? unreadCount : undefined, // ✅ Só mostra se >0
      },
      {
        id: "pending",
        label: "Pendências",
        icon: <AlertCircle size={20} />,
        href: "/pending",
        badge: "Novo", // ✅ Texto customizado
      },
    ];
  `,
  
  styling: [
    "Número: Badge vermelho (bg-destructive)",
    "Texto: Badge azul (bg-primary)",
    "Máximo 99+ para números",
    "Sidebar colapsada mostra badge como dot",
  ],
} as const;

// ============================================================================
// 3. RESTRIÇÕES TÉCNICAS
// ============================================================================

/**
 * CONSTRAINT #1: Sidebar width responsivo
 * 
 * Larguras da sidebar são fixas (não percentual).
 */
export const CONSTRAINT_SIDEBAR_WIDTH = {
  constraint: "Sidebar width is fixed (px), not fluid",
  
  defaults: {
    expanded: "240px",
    collapsed: "60px",
    mobile: "80vw (máximo 320px)",
  },
  
  customization: `
    <DashboardLayout
      sidebar={{
        ...config,
        width: 280, // ✅ Customiza largura expandida
        collapsedWidth: 72, // ✅ Customiza largura colapsada
      }}
    >
  `,
  
  rationale: "Largura fixa previne layout shift durante transição",
} as const;

/**
 * CONSTRAINT #2: Z-index hierarchy
 * 
 * Layout usa z-index fixo para camadas.
 */
export const CONSTRAINT_Z_INDEX = {
  constraint: "Z-index hierarchy is fixed",
  
  layers: {
    sidebar: "z-40",
    header: "z-30",
    main: "z-10",
    drawer_backdrop: "z-50",
    drawer_sidebar: "z-50",
  },
  
  implication: "Modals/Toasts devem usar z-index >50",
  
  example: `
    // Toast deve ficar acima de tudo
    .toast-container {
      z-index: 100;
    }
    
    // Modal deve ficar acima de drawer
    .modal-overlay {
      z-index: 60;
    }
  `,
} as const;

/**
 * CONSTRAINT #3: Skip link para acessibilidade
 * 
 * Layout inclui skip link automático (invisível até Tab).
 */
export const CONSTRAINT_SKIP_LINK = {
  constraint: "Skip link is always rendered",
  
  implementation: `
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
    >
      Pular para conteúdo principal
    </a>
    
    <main id="main-content">
      {children}
    </main>
  `,
  
  rationale: "WCAG 2.1 AA requer bypass de navegação repetitiva",
  behavior: "Aparece apenas no primeiro Tab, some após Esc",
} as const;

/**
 * CONSTRAINT #4: Keyboard shortcuts
 * 
 * Layout inclui atalhos de teclado nativos.
 */
export const CONSTRAINT_KEYBOARD_SHORTCUTS = {
  constraint: "Built-in keyboard shortcuts",
  
  shortcuts: {
    "Ctrl+B (Cmd+B)": "Toggle sidebar (colapsa/expande)",
    "Esc": "Fecha drawer mobile",
    "Tab": "Navegação por itens da sidebar",
    "Enter/Space": "Ativa item focado",
    "↑/↓": "Move foco entre itens (quando sidebar focada)",
  },
  
  customization: `
    // Desabilitar atalhos (não recomendado)
    <DashboardLayout
      sidebar={config}
      disableKeyboardShortcuts
    >
  `,
  
  conflict_resolution: "Use event.stopPropagation() em inputs para evitar conflito",
} as const;

// ============================================================================
// 4. TESTES OBRIGATÓRIOS
// ============================================================================

export const REQUIRED_TESTS = {
  rendering: [
    {
      name: "Renderiza sidebar com itens",
      test: `
        render(
          <DashboardLayout sidebar={{ items: mockItems }}>
            <div>Content</div>
          </DashboardLayout>
        );
        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Alunos")).toBeInTheDocument();
      `,
    },
    {
      name: "Renderiza breadcrumbs quando fornecidos",
      test: `
        render(
          <DashboardLayout
            sidebar={{ items: mockItems }}
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Alunos" },
            ]}
          >
            <div>Content</div>
          </DashboardLayout>
        );
        expect(screen.getByLabelText("Breadcrumbs")).toBeInTheDocument();
      `,
    },
  ],
  
  interaction: [
    {
      name: "Toggle sidebar ao clicar no botão",
      test: `
        render(
          <DashboardLayout sidebar={{ items: mockItems, collapsible: true }}>
            <div>Content</div>
          </DashboardLayout>
        );
        
        const toggleButton = screen.getByLabelText("Toggle sidebar");
        await userEvent.click(toggleButton);
        
        expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
      `,
    },
    {
      name: "Callback onSidebarToggle é chamado",
      test: `
        const onToggle = vi.fn();
        render(
          <DashboardLayout
            sidebar={{ items: mockItems }}
            onSidebarToggle={onToggle}
          >
            <div>Content</div>
          </DashboardLayout>
        );
        
        await userEvent.click(screen.getByLabelText("Toggle sidebar"));
        expect(onToggle).toHaveBeenCalledWith(false);
      `,
    },
    {
      name: "Mobile drawer abre/fecha",
      test: `
        // Simula mobile viewport
        global.innerWidth = 375;
        
        render(
          <DashboardLayout sidebar={{ items: mockItems }}>
            <div>Content</div>
          </DashboardLayout>
        );
        
        const menuButton = screen.getByLabelText("Abrir menu");
        await userEvent.click(menuButton);
        
        expect(screen.getByRole("dialog")).toBeInTheDocument();
      `,
    },
  ],
  
  accessibility: [
    {
      name: "Sidebar tem landmark navigation",
      test: `
        render(
          <DashboardLayout sidebar={{ items: mockItems }}>
            <div>Content</div>
          </DashboardLayout>
        );
        expect(screen.getByRole("navigation", { name: "Navegação principal" })).toBeInTheDocument();
      `,
    },
    {
      name: "Main tem landmark main",
      test: `
        render(
          <DashboardLayout sidebar={{ items: mockItems }}>
            <div>Content</div>
          </DashboardLayout>
        );
        expect(screen.getByRole("main")).toBeInTheDocument();
      `,
    },
    {
      name: "Skip link funciona",
      test: `
        render(
          <DashboardLayout sidebar={{ items: mockItems }}>
            <div>Content</div>
          </DashboardLayout>
        );
        
        const skipLink = screen.getByText("Pular para conteúdo principal");
        await userEvent.tab(); // Foca skip link
        expect(skipLink).toHaveFocus();
        
        await userEvent.click(skipLink);
        expect(screen.getByRole("main")).toHaveFocus();
      `,
    },
    {
      name: "Item ativo tem aria-current",
      test: `
        render(
          <DashboardLayout
            sidebar={{
              items: [
                { id: "1", label: "Dashboard", icon: <Home />, href: "/", active: true },
              ],
            }}
          >
            <div>Content</div>
          </DashboardLayout>
        );
        expect(screen.getByText("Dashboard").closest("a")).toHaveAttribute("aria-current", "page");
      `,
    },
  ],
  
  keyboard: [
    {
      name: "Ctrl+B colapsa sidebar",
      test: `
        render(
          <DashboardLayout sidebar={{ items: mockItems, collapsible: true }}>
            <div>Content</div>
          </DashboardLayout>
        );
        
        await userEvent.keyboard("{Control>}b{/Control}");
        expect(screen.getByTestId("sidebar")).toHaveClass("collapsed");
      `,
    },
    {
      name: "Esc fecha drawer mobile",
      test: `
        global.innerWidth = 375;
        
        render(
          <DashboardLayout sidebar={{ items: mockItems }}>
            <div>Content</div>
          </DashboardLayout>
        );
        
        await userEvent.click(screen.getByLabelText("Abrir menu"));
        expect(screen.getByRole("dialog")).toBeInTheDocument();
        
        await userEvent.keyboard("{Escape}");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
      `,
    },
  ],
} as const;

// ============================================================================
// 5. CHECKLIST DE REVISÃO DE CÓDIGO
// ============================================================================

export const CODE_REVIEW_CHECKLIST = [
  {
    category: "Estrutura",
    checks: [
      "✅ Todos os itens da sidebar têm ícone",
      "✅ Items têm href OU onClick (não ambos)",
      "✅ Item ativo marcado com active=true baseado na rota",
      "✅ Breadcrumbs refletem hierarquia de navegação",
    ],
  },
  {
    category: "Separação de Responsabilidades",
    checks: [
      "✅ Layout não valida autenticação (usa middleware)",
      "✅ Layout não implementa navegação customizada (usa Link do framework)",
      "✅ Estrutura HTML não foi alterada via CSS",
    ],
  },
  {
    category: "UX",
    checks: [
      "✅ Estado da sidebar persistido em localStorage",
      "✅ Mobile drawer funciona corretamente (<640px)",
      "✅ User menu tem ação de logout",
      "✅ Badges aparecem apenas quando count >0",
    ],
  },
  {
    category: "Acessibilidade",
    checks: [
      "✅ Sidebar tem role='navigation' e aria-label",
      "✅ Main tem role='main'",
      "✅ Skip link funciona (Tab + Enter)",
      "✅ Item ativo tem aria-current='page'",
      "✅ Keyboard shortcuts funcionam (Ctrl+B, Esc)",
    ],
  },
  {
    category: "Performance",
    checks: [
      "✅ Sidebar items memoizados (useMemo)",
      "✅ Callbacks estáveis (useCallback)",
      "✅ Drawer não renderiza em desktop (conditional)",
    ],
  },
] as const;

// ============================================================================
// EXPORT ALL RULES
// ============================================================================

export const DASHBOARDLAYOUT_CONTRACT = {
  version: "1.0.0",
  component: "DashboardLayout",
  atomicLevel: "Template",
  
  rules: {
    must: [
      RULE_SIDEBAR_ICONS,
      RULE_HREF_OR_ONCLICK,
      RULE_ACTIVE_STATE,
    ],
    mustNot: [
      RULE_NO_AUTH_IN_LAYOUT,
      RULE_NO_CUSTOM_NAVIGATION,
      RULE_NO_STRUCTURE_OVERRIDE,
    ],
  },
  
  patterns: [
    PATTERN_SIDEBAR_SUBMENU,
    PATTERN_USER_MENU,
    PATTERN_NOTIFICATIONS,
    PATTERN_BREADCRUMBS,
    PATTERN_SIDEBAR_PERSISTENCE,
    PATTERN_MOBILE_RESPONSIVE,
    PATTERN_ITEM_BADGES,
  ],
  
  constraints: [
    CONSTRAINT_SIDEBAR_WIDTH,
    CONSTRAINT_Z_INDEX,
    CONSTRAINT_SKIP_LINK,
    CONSTRAINT_KEYBOARD_SHORTCUTS,
  ],
  
  tests: REQUIRED_TESTS,
  checklist: CODE_REVIEW_CHECKLIST,
} as const;
