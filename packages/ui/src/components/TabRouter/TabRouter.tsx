import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../Tabs";

const tabRouterVariants = cva([""], {
  variants: {
    mode: {
      hash: "",
      path: "",
    },
  },
  defaultVariants: {
    mode: "hash",
  },
});

export interface TabRoute {
  /**
   * Identificador único da rota/tab
   */
  value: string;
  /**
   * Label exibido na tab
   */
  label: React.ReactNode;
  /**
   * Caminho da URL (sem basePath)
   */
  path: string;
  /**
   * Conteúdo da tab
   */
  content: React.ReactNode;
  /**
   * Desabilitar tab
   */
  disabled?: boolean;
  /**
   * Ícone da tab
   */
  icon?: React.ReactNode;
}

export interface TabRouterProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof tabRouterVariants> {
  /**
   * Array de rotas/tabs
   */
  routes: TabRoute[];
  /**
   * Caminho base (prefixo das URLs)
   */
  basePath?: string;
  /**
   * Modo de roteamento: hash (#/tab) ou path (/tab)
   */
  mode?: "hash" | "path";
  /**
   * Tab padrão quando URL não corresponde a nenhuma rota
   */
  defaultRoute?: string;
  /**
   * Callback quando a rota muda
   */
  onChange?: (route: string) => void;
  /**
   * Preservar scroll ao mudar de tab
   */
  preserveScroll?: boolean;
  /**
   * Usar history.replace ao invés de history.push
   */
  replace?: boolean;
  /**
   * Variante visual (herda de Tabs)
   */
  variant?: "default" | "outline" | "pills" | "rounded";
  /**
   * Atualizar URL automaticamente
   */
  syncUrl?: boolean;
}

const TabRouter = React.forwardRef<HTMLDivElement, TabRouterProps>(
  (
    {
      className,
      routes,
      basePath = "",
      mode = "hash",
      defaultRoute,
      onChange,
      preserveScroll = false,
      replace = false,
      variant = "default",
      syncUrl = true,
      ...props
    },
    ref
  ) => {
    // Get initial route from URL
    const getRouteFromUrl = React.useCallback((): string => {
      if (!syncUrl) return defaultRoute || routes[0]?.value || "";

      const currentPath = window.location.pathname;
      const currentHash = window.location.hash.slice(1); // Remove #

      if (mode === "hash") {
        // Match hash against routes
        const matchedRoute = routes.find((route) => {
          const routePath = route.path.startsWith("/") ? route.path.slice(1) : route.path;
          return currentHash === routePath;
        });
        return matchedRoute?.value || defaultRoute || routes[0]?.value || "";
      } else {
        // Match pathname against routes
        const matchedRoute = routes.find((route) => {
          const fullPath = `${basePath}${route.path}`;
          return currentPath === fullPath || currentPath.startsWith(`${fullPath}/`);
        });
        return matchedRoute?.value || defaultRoute || routes[0]?.value || "";
      }
    }, [routes, basePath, mode, defaultRoute, syncUrl]);

    const [activeRoute, setActiveRoute] = React.useState<string>(getRouteFromUrl);

    // Update URL when route changes
    const updateUrl = React.useCallback(
      (routeValue: string) => {
        if (!syncUrl) return;

        const route = routes.find((r) => r.value === routeValue);
        if (!route) return;

        if (mode === "hash") {
          const newHash = route.path.startsWith("/") ? route.path.slice(1) : route.path;
          const newUrl = `${window.location.pathname}${window.location.search}#${newHash}`;

          if (replace) {
            window.history.replaceState(null, "", newUrl);
          } else {
            window.history.pushState(null, "", newUrl);
          }
        } else {
          const newPath = `${basePath}${route.path}`;

          if (replace) {
            window.history.replaceState(null, "", newPath);
          } else {
            window.history.pushState(null, "", newPath);
          }
        }
      },
      [routes, basePath, mode, replace, syncUrl]
    );

    // Handle route change
    const handleRouteChange = React.useCallback(
      (routeValue: string) => {
        const previousScroll = window.scrollY;

        setActiveRoute(routeValue);
        updateUrl(routeValue);
        onChange?.(routeValue);

        // Restore scroll position if preserveScroll is true
        if (preserveScroll) {
          requestAnimationFrame(() => {
            window.scrollTo(0, previousScroll);
          });
        }
      },
      [updateUrl, onChange, preserveScroll]
    );

    // Listen to browser back/forward buttons
    React.useEffect(() => {
      if (!syncUrl) return;

      const handlePopState = () => {
        const newRoute = getRouteFromUrl();
        setActiveRoute(newRoute);
        onChange?.(newRoute);
      };

      window.addEventListener("popstate", handlePopState);
      return () => window.removeEventListener("popstate", handlePopState);
    }, [getRouteFromUrl, onChange, syncUrl]);

    // Sync with URL on mount and when routes change
    React.useEffect(() => {
      const urlRoute = getRouteFromUrl();
      if (urlRoute !== activeRoute) {
        setActiveRoute(urlRoute);
      }
    }, [getRouteFromUrl]);

    return (
      <div
        ref={ref}
        className={cn(tabRouterVariants({ mode }), className)}
        {...props}
      >
        <Tabs value={activeRoute} onValueChange={handleRouteChange} variant={variant}>
          <TabsList variant={variant}>
            {routes.map((route) => (
              <TabsTrigger
                key={route.value}
                value={route.value}
                disabled={route.disabled}
                variant={variant}
              >
                {route.icon && <span className="mr-2">{route.icon}</span>}
                {route.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {routes.map((route) => (
            <TabsContent key={route.value} value={route.value}>
              {route.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    );
  }
);

TabRouter.displayName = "TabRouter";

export { TabRouter, tabRouterVariants };
