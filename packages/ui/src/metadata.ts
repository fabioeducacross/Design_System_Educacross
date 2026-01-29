/**
 * @educacross/ui - Metadata
 *
 * Metadados do Design System para descoberta e tooling (AI, Storybook, etc.)
 * Gerado automaticamente via scripts/generate-manifest.ts
 *
 * @version 0.2.0
 */

/**
 * Lista completa de componentes do Design System
 * Organizada por categoria para fácil navegação
 */
export const componentList = {
    /**
     * Layout - Componentes de estrutura e navegação
     */
    layout: [
        "Header",
        "Logo",
        "AvatarIcon",
        "Sidebar",
        "SidebarItem",
        "SidebarSubItem",
    ],

    /**
     * Forms - Inputs e controles de formulário
     */
    forms: ["Button", "Input", "Label", "Checkbox", "Radio", "RadioGroup", "Select"],

    /**
     * Display - Exibição de dados e conteúdo
     */
    display: [
        "Card",
        "CardHeader",
        "CardFooter",
        "CardTitle",
        "CardDescription",
        "CardContent",
        "Badge",
        "Avatar",
        "AvatarImage",
        "AvatarFallback",
        "Skeleton",
        "SkeletonText",
        "SkeletonCircle",
        "SkeletonCard",
        "SkeletonAvatar",
        "SkeletonTable",
        "Table",
        "TableHeader",
        "TableBody",
        "TableFooter",
        "TableHead",
        "TableRow",
        "TableCell",
        "TableCaption",
        "TableToolbar",
        "TableSortHeader",
        "TableActions",
        "TableActionButton",
        "TablePagination",
    ],

    /**
     * Feedback - Alertas, toasts e notificações
     */
    feedback: [
        "Alert",
        "AlertTitle",
        "AlertDescription",
        "Toast",
        "ToastTitle",
        "ToastDescription",
        "ToastAction",
        "ToastViewport",
    ],

    /**
     * Overlay - Diálogos, popovers e overlays
     */
    overlay: [
        "Dialog",
        "DialogPortal",
        "DialogOverlay",
        "DialogClose",
        "DialogTrigger",
        "DialogContent",
        "DialogHeader",
        "DialogFooter",
        "DialogTitle",
        "DialogDescription",
        "Popover",
        "PopoverTrigger",
        "PopoverContent",
        "PopoverClose",
        "Tooltip",
        "TooltipTrigger",
        "TooltipContent",
        "TooltipProvider",
        "DropdownMenu",
        "DropdownMenuTrigger",
        "DropdownMenuContent",
        "DropdownMenuItem",
        "DropdownMenuSeparator",
        "DropdownMenuLabel",
    ],

    /**
     * Navigation - Componentes de navegação e organização
     */
    navigation: [
        "Tabs",
        "TabsList",
        "TabsTrigger",
        "TabsContent",
        "Accordion",
        "AccordionItem",
        "AccordionTrigger",
        "AccordionContent",
        "Pagination",
        "PaginationContent",
        "PaginationItem",
        "PaginationLink",
        "PaginationButton",
        "PaginationPrevious",
        "PaginationNext",
        "PaginationEllipsis",
    ],

    /**
     * Theme - Temas e personalização
     */
    theme: ["ThemeSwitcher", "ThemeProvider"],

    /**
     * Icons - Ícones e assets visuais
     */
    icons: ["Icon", "CustomIcon"],
} as const;

/**
 * Índice de todos os ícones disponíveis
 * Para referência rápida em tooling e autocomplete
 */
export const iconIndex = {
    /**
     * Total de ícones disponíveis no sistema
     */
    total: 180,

    /**
     * Categorias de ícones
     */
    categories: [
        "educational",
        "gamification",
        "ui",
        "social",
        "assessment",
        "communication",
    ],

    /**
     * Ícones mais usados (top 20)
     */
    popular: [
        "BookOpen",
        "Trophy",
        "Star",
        "Check",
        "X",
        "Menu",
        "User",
        "Settings",
        "Search",
        "ChevronDown",
        "ChevronRight",
        "Calendar",
        "Clock",
        "Mail",
        "Phone",
        "Home",
        "Upload",
        "Download",
        "Edit",
        "Trash",
    ],
} as const;

/**
 * Metadados gerais do Design System
 */
export const metadata = {
    /**
     * Nome do pacote
     */
    name: "@fabioeducacross/ui",

    /**
     * Versão atual
     */
    version: "0.2.0",

    /**
     * Descrição
     */
    description: "Educacross Design System - Componentes React acessíveis e tematizáveis",

    /**
     * Total de componentes exportados (incluindo subcomponentes)
     */
    totalComponents: 105,

    /**
     * Total de componentes principais (componentes raiz/top-level)
     */
    totalRootComponents: 27,

    /**
     * Tecnologias principais
     */
    stack: {
        framework: "React 18+",
        styling: "Tailwind CSS 3.4+",
        primitives: "Radix UI",
        variants: "class-variance-authority (CVA)",
        bundler: "tsup 8.3+",
        typescript: "TypeScript 5.7+",
    },

    /**
     * Recursos de acessibilidade
     */
    accessibility: {
        wcag: "2.1 AA",
        keyboard: true,
        screenReader: true,
        aria: true,
        focusVisible: true,
    },

    /**
     * Tamanho do bundle
     */
    bundle: {
        esm: "~143 KB gzipped",
        cjs: "~146 KB gzipped",
        treeshaking: true,
        sideEffects: ["*.css"],
    },

    /**
     * Links úteis
     */
    links: {
        repository: "https://github.com/fabioeducacross/Design_System_Educacross",
        storybook: "https://storybook.educacross.com.br",
        documentation: "https://github.com/fabioeducacross/Design_System_Educacross/tree/master/README.md",
        issues: "https://github.com/fabioeducacross/Design_System_Educacross/issues",
    },

    /**
     * Changelog resumido
     */
    changelog: {
        "0.2.0": {
            date: "2025-01-20",
            changes: [
                "Logo: Convertido para SVG inline (fix rendering em npm install)",
                "Metadata: Infraestrutura de metadata para AI discovery",
                "Docs: 28 READMEs completos para todos os componentes",
                "AI: AI-GUIDE.md e ForAI.mdx para assistentes de código",
            ],
        },
        "0.1.1": {
            date: "2024-12-15",
            changes: [
                "Lançamento inicial do Design System",
                "28 componentes React com Tailwind CSS",
                "180 ícones categorizados",
                "Tema claro/escuro",
            ],
        },
    },
} as const;

/**
 * Type helper para extrair nomes de componentes
 */
export type ComponentName =
    | (typeof componentList)[keyof typeof componentList][number]
    | string;

/**
 * Type helper para categorias de componentes
 */
export type ComponentCategory = keyof typeof componentList;

/**
 * Type helper para categorias de ícones
 */
export type IconCategory = (typeof iconIndex.categories)[number];
