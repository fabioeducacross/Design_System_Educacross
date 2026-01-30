import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Tabs list variants.
 * 
 * Variante "rounded" replica exatamente o TabRouter.vue do Frontoffice:
 * - Abas com sobreposição usando translateX negativo
 * - Bordas arredondadas no topo (15px)
 * - Sombra suave
 * - Hover com fundo primário
 */
const tabsListVariants = cva(
    [
        "inline-flex h-10 items-center rounded-md",
        "bg-muted p-1 text-muted-foreground",
    ],
    {
        variants: {
            variant: {
                default: "bg-muted justify-center",
                outline: "bg-transparent border justify-center",
                pills: "bg-transparent gap-1 justify-center",
                // Replica .tabs-row do Frontoffice
                rounded: [
                    "bg-transparent p-0 h-auto relative justify-start",
                    "flex-nowrap overflow-x-auto",
                    // Scrollbar estilizada
                    "[scrollbar-width:thin]",
                ].join(" "),
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

/**
 * Tab trigger variants.
 * 
 * Variante "rounded" replica exatamente .tab-link do Frontoffice:
 * - padding: 14px 24px 10px 24px
 * - border-radius: 15px 15px 0 0
 * - box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.14)
 * - transform: translateX(calc(var(--index) * -10px))
 * - hover: background $primary, color white
 * - active: background $primary (#6E63E8), color white
 */
const tabsTriggerVariants = cva(
    [
        "inline-flex items-center justify-center whitespace-nowrap",
        "font-medium ring-offset-background",
        "transition-all duration-200 cursor-pointer relative",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                default:
                    "rounded-sm px-3 py-1.5 text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                outline:
                    "px-3 py-1.5 text-sm data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-foreground rounded-none",
                pills:
                    "px-3 py-1.5 text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full",
                // Replica exatamente .tab-link do TabRouter.vue do Frontoffice
                rounded: [
                    // Layout base
                    "inline-flex items-center gap-1",
                    // Padding exato: 14px 24px 10px 24px
                    "pt-[14px] pr-[24px] pb-[10px] pl-[24px]",
                    // Border radius: 15px 15px 0 0
                    "rounded-t-[15px] rounded-b-none",
                    // Box shadow
                    "shadow-[0_0_8px_rgba(0,0,0,0.14)]",
                    // Cor de texto padrão (gray)
                    "text-[#6e6b7b]",
                    // Background branco por padrão
                    "bg-white",
                    // Sem decoração de texto
                    "no-underline",
                    // Hover: fundo primário, texto branco
                    "hover:bg-primary hover:text-white",
                    // Estado ativo: fundo primário (#6E63E8), texto branco
                    "data-[state=active]:bg-[#6E63E8] data-[state=active]:text-white",
                ].join(" "),
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

interface TabsContextValue {
    value: string;
    onValueChange: (value: string) => void;
    variant?: "default" | "outline" | "pills" | "rounded";
    /** Total de tabs para cálculo de z-index (variante rounded) */
    totalTabs: number;
    /** Registra uma tab no contexto */
    registerTab: () => number;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

export interface TabsProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> {
    /**
     * The controlled value of the active tab.
     */
    value?: string;
    /**
     * The default value when uncontrolled.
     */
    defaultValue?: string;
    /**
     * Callback when the active tab changes.
     */
    onValueChange?: (value: string) => void;
}

/**
 * Tabs component - organize content into separate views.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
    (
        {
            className,
            value,
            defaultValue,
            onValueChange,
            variant,
            children,
            ...props
        },
        ref
    ) => {
        const [internalValue, setInternalValue] = React.useState(
            defaultValue ?? ""
        );
        const activeValue = value !== undefined ? value : internalValue;
        
        // Contador para atribuir índices às tabs
        const tabCounterRef = React.useRef(0);
        const [totalTabs, setTotalTabs] = React.useState(0);
        
        // Reset do contador a cada render para garantir índices corretos
        React.useLayoutEffect(() => {
            tabCounterRef.current = 0;
        });

        const handleValueChange = React.useCallback(
            (newValue: string) => {
                if (value === undefined) {
                    setInternalValue(newValue);
                }
                onValueChange?.(newValue);
            },
            [value, onValueChange]
        );
        
        const registerTab = React.useCallback(() => {
            const index = tabCounterRef.current;
            tabCounterRef.current += 1;
            // Atualiza o total após o primeiro render
            if (tabCounterRef.current > totalTabs) {
                setTotalTabs(tabCounterRef.current);
            }
            return index;
        }, [totalTabs]);

        return (
            <TabsContext.Provider
                value={{
                    value: activeValue,
                    onValueChange: handleValueChange,
                    variant: variant ?? "default",
                    totalTabs,
                    registerTab,
                }}
            >
                <div ref={ref} className={cn("w-full", className)} {...props}>
                    {children}
                </div>
            </TabsContext.Provider>
        );
    }
);
Tabs.displayName = "Tabs";

export interface TabsListProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tabsListVariants> { }

/**
 * TabsList - container for tab triggers.
 */
const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
    ({ className, variant, ...props }, ref) => {
        const context = React.useContext(TabsContext);
        return (
            <div
                ref={ref}
                role="tablist"
                className={cn(
                    tabsListVariants({ variant: variant ?? context?.variant }),
                    className
                )}
                {...props}
            />
        );
    }
);
TabsList.displayName = "TabsList";

export interface TabsTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof tabsTriggerVariants> {
    /**
     * The unique value for this tab.
     */
    value: string;
    /**
     * Índice manual da tab (opcional). Se não fornecido, será calculado automaticamente.
     * Usado para calcular translateX e z-index na variante rounded.
     */
    index?: number;
}

/**
 * TabsTrigger - clickable tab button.
 * 
 * Na variante "rounded", replica o comportamento do TabRouter.vue do Frontoffice:
 * - translateX negativo para sobreposição das abas
 * - z-index dinâmico baseado na posição e estado ativo
 */
const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ className, value, variant, index: indexProp, style, ...props }, ref) => {
        const context = React.useContext(TabsContext);
        const isActive = context?.value === value;
        const effectiveVariant = variant ?? context?.variant;
        
        // Calcula o índice da tab para a variante rounded
        const indexRef = React.useRef<number | null>(null);
        if (indexRef.current === null && context?.registerTab) {
            indexRef.current = indexProp ?? context.registerTab();
        }
        const tabIndex = indexRef.current ?? 0;
        
        // Para a variante rounded, aplicamos estilos inline para translateX e z-index
        // Isso replica o comportamento do TabRouter.vue:
        // transform: translateX(calc(var(--index) * -10px))
        // z-index: isActive ? totalTabs : totalTabs - index
        const roundedStyles: React.CSSProperties = effectiveVariant === "rounded" ? {
            transform: `translateX(${tabIndex * -10}px)`,
            zIndex: isActive ? (context?.totalTabs ?? 1) : (context?.totalTabs ?? 1) - tabIndex,
            ...style,
        } : style ?? {};

        return (
            <button
                ref={ref}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-state={isActive ? "active" : "inactive"}
                onClick={() => context?.onValueChange(value)}
                className={cn(
                    tabsTriggerVariants({
                        variant: effectiveVariant,
                    }),
                    className
                )}
                style={roundedStyles}
                {...props}
            />
        );
    }
);
TabsTrigger.displayName = "TabsTrigger";

export interface TabsContentProps
    extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The unique value for this tab content.
     */
    value: string;
}

/**
 * TabsContent - content panel for a tab.
 */
const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, value, ...props }, ref) => {
        const context = React.useContext(TabsContext);
        const isActive = context?.value === value;

        if (!isActive) {
            return null;
        }

        return (
            <div
                ref={ref}
                role="tabpanel"
                data-state={isActive ? "active" : "inactive"}
                className={cn(
                    "mt-2 ring-offset-background",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    className
                )}
                tabIndex={0}
                {...props}
            />
        );
    }
);
TabsContent.displayName = "TabsContent";

/**
 * TabsLine - linha separadora abaixo das abas (usada na variante rounded).
 * 
 * Replica a classe .tab-line do TabRouter.vue do Frontoffice:
 * - border: 1px solid $primary
 * - height: 1px
 * - width: 100%
 * - margin-bottom: 1rem
 */
export interface TabsLineProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsLine = React.forwardRef<HTMLDivElement, TabsLineProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "h-px w-full bg-primary mb-4",
                    className
                )}
                {...props}
            />
        );
    }
);
TabsLine.displayName = "TabsLine";

export {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    TabsLine,
    tabsListVariants,
    tabsTriggerVariants,
};
