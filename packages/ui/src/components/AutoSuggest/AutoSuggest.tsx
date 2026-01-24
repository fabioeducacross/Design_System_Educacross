import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import { Search, X, Loader2 } from "lucide-react";

const autoSuggestVariants = cva(
  ["relative w-full"],
  {
    variants: {
      variant: {
        default: "",
        async: "",
        multiSelect: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const inputVariants = cva([
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
  "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
  "placeholder:text-muted-foreground",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  "disabled:cursor-not-allowed disabled:opacity-50",
]);

const suggestionListVariants = cva([
  "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
  "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
]);

const suggestionItemVariants = cva([
  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
  "hover:bg-accent hover:text-accent-foreground",
  "data-[highlighted=true]:bg-accent data-[highlighted=true]:text-accent-foreground",
  "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
  "data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50",
]);

export interface SuggestionItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AutoSuggestProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">,
    VariantProps<typeof autoSuggestVariants> {
  /**
   * Array de sugestões
   */
  options?: SuggestionItem[];
  /**
   * Valor atual (single select)
   */
  value?: string;
  /**
   * Valores selecionados (multi-select)
   */
  values?: string[];
  /**
   * Callback quando valor muda (single)
   */
  onValueChange?: (value: string) => void;
  /**
   * Callback quando valores mudam (multi)
   */
  onValuesChange?: (values: string[]) => void;
  /**
   * Callback para busca assíncrona
   */
  onSearch?: (query: string) => void | Promise<void>;
  /**
   * Estado de carregamento (async)
   */
  loading?: boolean;
  /**
   * Texto quando não há resultados
   */
  emptyText?: string;
  /**
   * Mínimo de caracteres para buscar
   */
  minChars?: number;
  /**
   * Debounce em ms para busca
   */
  debounce?: number;
}

const AutoSuggest = React.forwardRef<HTMLInputElement, AutoSuggestProps>(
  (
    {
      className,
      variant = "default",
      options = [],
      value,
      values = [],
      onValueChange,
      onValuesChange,
      onSearch,
      loading = false,
      emptyText = "Nenhum resultado encontrado",
      minChars = 0,
      debounce = 300,
      placeholder = "Digite para buscar...",
      ...props
    },
    ref
  ) => {
    const [inputValue, setInputValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const listRef = React.useRef<HTMLDivElement>(null);

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!);

    // Debounced search
    React.useEffect(() => {
      if (!onSearch || inputValue.length < minChars) return;

      const timer = setTimeout(() => {
        onSearch(inputValue);
      }, debounce);

      return () => clearTimeout(timer);
    }, [inputValue, onSearch, minChars, debounce]);

    // Close on outside click
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          inputRef.current &&
          !inputRef.current.contains(event.target as Node) &&
          listRef.current &&
          !listRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredOptions = React.useMemo(() => {
      if (variant === "async") return options;
      
      return options.filter((option) =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }, [options, inputValue, variant]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsOpen(newValue.length >= minChars);
      setHighlightedIndex(-1);
    };

    const handleSelect = (option: SuggestionItem) => {
      if (option.disabled) return;

      if (variant === "multiSelect") {
        const newValues = values.includes(option.value)
          ? values.filter((v) => v !== option.value)
          : [...values, option.value];
        onValuesChange?.(newValues);
      } else {
        setInputValue(option.label);
        onValueChange?.(option.value);
        setIsOpen(false);
      }
    };

    const handleRemoveTag = (valueToRemove: string) => {
      const newValues = values.filter((v) => v !== valueToRemove);
      onValuesChange?.(newValues);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!isOpen || filteredOptions.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          break;
      }
    };

    const handleClear = () => {
      setInputValue("");
      onValueChange?.("");
      onValuesChange?.([]);
      setIsOpen(false);
      inputRef.current?.focus();
    };

    const isMultiSelect = variant === "multiSelect";
    const showClear = inputValue.length > 0 || values.length > 0;

    return (
      <div className={cn(autoSuggestVariants({ variant }), className)}>
        {/* Selected tags for multi-select */}
        {isMultiSelect && values.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-2">
            {values.map((val) => {
              const option = options.find((o) => o.value === val);
              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm"
                >
                  {option?.label || val}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(val)}
                    className="rounded-sm hover:bg-secondary-foreground/20"
                    aria-label={`Remover ${option?.label || val}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              );
            })}
          </div>
        )}

        {/* Input field */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => inputValue.length >= minChars && setIsOpen(true)}
            placeholder={placeholder}
            className={cn(inputVariants(), "pl-9 pr-9")}
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            aria-controls="suggestions-list"
            {...props}
          />
          {loading && (
            <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          )}
          {!loading && showClear && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm hover:bg-muted"
              aria-label="Limpar"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>

        {/* Suggestions dropdown */}
        {isOpen && (
          <div
            ref={listRef}
            id="suggestions-list"
            role="listbox"
            data-state="open"
            className={suggestionListVariants()}
          >
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {loading ? "Carregando..." : emptyText}
              </div>
            ) : (
              filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={
                    isMultiSelect
                      ? values.includes(option.value)
                      : value === option.value
                  }
                  data-highlighted={index === highlightedIndex}
                  data-selected={
                    isMultiSelect
                      ? values.includes(option.value)
                      : value === option.value
                  }
                  data-disabled={option.disabled}
                  onClick={() => handleSelect(option)}
                  className={suggestionItemVariants()}
                >
                  {isMultiSelect && (
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        values.includes(option.value)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground"
                      )}
                    >
                      {values.includes(option.value) && (
                        <svg
                          className="h-3 w-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  )}
                  {option.label}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }
);

AutoSuggest.displayName = "AutoSuggest";

export { AutoSuggest, autoSuggestVariants };
