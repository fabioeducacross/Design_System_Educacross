import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import { ChevronDown, X, SlidersHorizontal } from "lucide-react";

const filterPanelVariants = cva([""], {
  variants: {
    variant: {
      sidebar: "flex flex-col gap-6",
      dropdown: "relative",
      accordion: "space-y-2",
    },
  },
  defaultVariants: {
    variant: "sidebar",
  },
});

const filterGroupVariants = cva([""], {
  variants: {
    variant: {
      sidebar: "space-y-3",
      dropdown: "",
      accordion: "rounded-lg border",
    },
  },
});

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  title: string;
  options: FilterOption[];
  type?: "checkbox" | "radio" | "range";
  min?: number;
  max?: number;
}

export interface FilterPanelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">,
    VariantProps<typeof filterPanelVariants> {
  /**
   * Grupos de filtros
   */
  groups: FilterGroup[];
  /**
   * Valores selecionados { groupId: [values] }
   */
  selectedFilters?: Record<string, string[]>;
  /**
   * Callback quando filtros mudam
   */
  onFiltersChange?: (filters: Record<string, string[]>) => void;
  /**
   * Mostrar botão de limpar
   */
  showClearButton?: boolean;
  /**
   * Texto do botão aplicar (apenas dropdown)
   */
  applyButtonText?: string;
  /**
   * Grupos colapsados por padrão (apenas accordion)
   */
  defaultCollapsed?: boolean;
}

const FilterPanel = React.forwardRef<HTMLDivElement, FilterPanelProps>(
  (
    {
      className,
      variant = "sidebar",
      groups,
      selectedFilters = {},
      onFiltersChange,
      showClearButton = true,
      applyButtonText = "Aplicar Filtros",
      defaultCollapsed = false,
      ...props
    },
    ref
  ) => {
    const [localFilters, setLocalFilters] = React.useState(selectedFilters);
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(
      new Set(defaultCollapsed ? groups.map((g) => g.id) : [])
    );
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    // Sync external changes
    React.useEffect(() => {
      setLocalFilters(selectedFilters);
    }, [selectedFilters]);

    // Close dropdown on outside click
    React.useEffect(() => {
      if (variant !== "dropdown") return;

      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsDropdownOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [variant]);

    const handleFilterChange = (groupId: string, value: string, checked: boolean) => {
      const group = groups.find((g) => g.id === groupId);
      if (!group) return;

      let newFilters: Record<string, string[]>;

      if (group.type === "radio") {
        // Radio: only one value per group
        newFilters = {
          ...localFilters,
          [groupId]: checked ? [value] : [],
        };
      } else {
        // Checkbox: multiple values
        const currentValues = localFilters[groupId] || [];
        newFilters = {
          ...localFilters,
          [groupId]: checked
            ? [...currentValues, value]
            : currentValues.filter((v) => v !== value),
        };
      }

      setLocalFilters(newFilters);

      // For sidebar and accordion, apply immediately
      if (variant !== "dropdown") {
        onFiltersChange?.(newFilters);
      }
    };

    const handleClearFilters = () => {
      const emptyFilters: Record<string, string[]> = {};
      setLocalFilters(emptyFilters);
      onFiltersChange?.(emptyFilters);
    };

    const handleApplyFilters = () => {
      onFiltersChange?.(localFilters);
      setIsDropdownOpen(false);
    };

    const toggleGroupCollapse = (groupId: string) => {
      setCollapsedGroups((prev) => {
        const next = new Set(prev);
        if (next.has(groupId)) {
          next.delete(groupId);
        } else {
          next.add(groupId);
        }
        return next;
      });
    };

    const getTotalSelectedCount = () => {
      return Object.values(localFilters).reduce((sum, arr) => sum + arr.length, 0);
    };

    const renderFilterGroup = (group: FilterGroup) => {
      const isCollapsed = collapsedGroups.has(group.id);
      const selectedValues = localFilters[group.id] || [];

      return (
        <div
          key={group.id}
          className={cn(filterGroupVariants({ variant }))}
        >
          {/* Group Header */}
          <div
            className={cn(
              "flex items-center justify-between",
              variant === "accordion" && "cursor-pointer p-4",
              variant === "accordion" && isCollapsed && "border-b-0"
            )}
            onClick={variant === "accordion" ? () => toggleGroupCollapse(group.id) : undefined}
          >
            <h4 className="text-sm font-semibold">{group.title}</h4>
            {variant === "accordion" && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  !isCollapsed && "rotate-180"
                )}
              />
            )}
          </div>

          {/* Group Content */}
          {(!isCollapsed || variant !== "accordion") && (
            <div className={cn(variant === "accordion" && "p-4 pt-0", "space-y-2")}>
              {group.options.map((option) => {
                const isChecked = selectedValues.includes(option.value);
                const inputId = `${group.id}-${option.value}`;

                return (
                  <label
                    key={option.value}
                    htmlFor={inputId}
                    className="flex cursor-pointer items-center gap-2 text-sm hover:text-foreground"
                  >
                    <input
                      id={inputId}
                      type={group.type === "radio" ? "radio" : "checkbox"}
                      checked={isChecked}
                      onChange={(e) =>
                        handleFilterChange(group.id, option.value, e.target.checked)
                      }
                      className={cn(
                        "h-4 w-4 rounded border-gray-300",
                        group.type === "radio" && "rounded-full"
                      )}
                    />
                    <span className="flex-1">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="text-xs text-muted-foreground">({option.count})</span>
                    )}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      );
    };

    // Sidebar variant
    if (variant === "sidebar") {
      return (
        <div
          ref={ref}
          className={cn(filterPanelVariants({ variant }), "w-64", className)}
          {...props}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Filtros</h3>
            {showClearButton && getTotalSelectedCount() > 0 && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Limpar
              </button>
            )}
          </div>

          {groups.map(renderFilterGroup)}

          {getTotalSelectedCount() > 0 && (
            <div className="rounded-lg bg-muted p-3 text-sm">
              <span className="font-medium">{getTotalSelectedCount()}</span> filtro(s) ativo(s)
            </div>
          )}
        </div>
      );
    }

    // Dropdown variant
    if (variant === "dropdown") {
      return (
        <div ref={dropdownRef} className={cn("relative inline-block", className)} {...props}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="inline-flex items-center gap-2 rounded-md border bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filtros
            {getTotalSelectedCount() > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                {getTotalSelectedCount()}
              </span>
            )}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border bg-popover p-4 shadow-lg">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold">Filtros</h3>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(false)}
                  className="rounded-sm hover:bg-accent"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                {groups.map(renderFilterGroup)}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="flex-1 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
                >
                  Limpar
                </button>
                <button
                  type="button"
                  onClick={handleApplyFilters}
                  className="flex-1 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {applyButtonText}
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // Accordion variant
    return (
      <div
        ref={ref}
        className={cn(filterPanelVariants({ variant }), className)}
        {...props}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filtros</h3>
          {showClearButton && getTotalSelectedCount() > 0 && (
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Limpar ({getTotalSelectedCount()})
            </button>
          )}
        </div>

        {groups.map(renderFilterGroup)}
      </div>
    );
  }
);

FilterPanel.displayName = "FilterPanel";

export { FilterPanel, filterPanelVariants };
