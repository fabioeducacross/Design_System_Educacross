import type { Meta, StoryObj } from "@storybook/react";

/**
 * **MultipleDropdown** - Dropdown de seleção múltipla
 * 
 * Componente para seleção de múltiplos itens em dropdown.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/multiple-dropdown/MultipleDropdown.vue`
 * 
 * @example
 * ```vue
 * <MultipleDropdown v-model="selected" :options="options" />
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Forms/MultipleDropdown",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Dropdown com suporte a seleção múltipla e pesquisa.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

interface Option {
  value: string;
  label: string;
}

// Mock do componente Vue
const MultipleDropdownMock = ({ 
  options,
  selected = [],
  placeholder = "Selecione...",
  expanded = false,
  searchable = true
}: { 
  options: Option[];
  selected?: string[];
  placeholder?: string;
  expanded?: boolean;
  searchable?: boolean;
}) => {
  const selectedOptions = options.filter(o => selected.includes(o.value));

  return (
    <div className="relative w-80">
      {/* Trigger */}
      <div className={`
        flex items-center gap-2 min-h-[42px] px-3 py-2 border rounded-md
        ${expanded ? "ring-2 ring-primary border-primary" : "hover:border-muted-foreground/50"}
      `}>
        <div className="flex-1 flex flex-wrap gap-1">
          {selectedOptions.length === 0 ? (
            <span className="text-muted-foreground">{placeholder}</span>
          ) : (
            selectedOptions.map((option) => (
              <span 
                key={option.value}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary rounded text-sm"
              >
                {option.label}
                <button className="hover:bg-primary/20 rounded">
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </span>
            ))
          )}
        </div>
        <span className="material-symbols-outlined text-muted-foreground">
          {expanded ? "expand_less" : "expand_more"}
        </span>
      </div>
      
      {/* Dropdown */}
      {expanded && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-md shadow-lg z-50">
          {searchable && (
            <div className="p-2 border-b">
              <input 
                type="text"
                placeholder="Buscar..."
                className="w-full px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          )}
          
          <div className="max-h-48 overflow-auto">
            {options.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <button
                  key={option.value}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-accent
                    ${isSelected ? "bg-primary/5" : ""}
                  `}
                >
                  <div className={`
                    w-4 h-4 border rounded flex items-center justify-center
                    ${isSelected ? "bg-primary border-primary" : "border-muted-foreground"}
                  `}>
                    {isSelected && (
                      <span className="material-symbols-outlined text-xs text-primary-foreground">check</span>
                    )}
                  </div>
                  <span className="text-sm">{option.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="p-2 border-t flex justify-between text-xs">
            <button className="text-muted-foreground hover:text-foreground">Limpar</button>
            <span className="text-muted-foreground">{selected.length} selecionados</span>
          </div>
        </div>
      )}
    </div>
  );
};

const classOptions: Option[] = [
  { value: "5a", label: "5º Ano A" },
  { value: "5b", label: "5º Ano B" },
  { value: "5c", label: "5º Ano C" },
  { value: "6a", label: "6º Ano A" },
  { value: "6b", label: "6º Ano B" },
];

export const Default: Story = {
  render: () => <MultipleDropdownMock options={classOptions} />,
};

export const Expanded: Story = {
  name: "Expandido",
  render: () => <MultipleDropdownMock options={classOptions} expanded />,
};

export const WithSelection: Story = {
  name: "Com Seleção",
  render: () => <MultipleDropdownMock options={classOptions} selected={["5a", "5b"]} />,
};

export const ManySelected: Story = {
  name: "Muitos Selecionados",
  render: () => <MultipleDropdownMock options={classOptions} selected={["5a", "5b", "5c", "6a"]} />,
};

export const ExpandedWithSelection: Story = {
  name: "Expandido com Seleção",
  render: () => <MultipleDropdownMock options={classOptions} selected={["5a", "6b"]} expanded />,
};

export const NoSearch: Story = {
  name: "Sem Busca",
  render: () => <MultipleDropdownMock options={classOptions} expanded searchable={false} />,
};

export const ManyOptions: Story = {
  name: "Muitas Opções",
  render: () => (
    <MultipleDropdownMock 
      options={[
        ...classOptions,
        { value: "7a", label: "7º Ano A" },
        { value: "7b", label: "7º Ano B" },
        { value: "8a", label: "8º Ano A" },
        { value: "8b", label: "8º Ano B" },
        { value: "9a", label: "9º Ano A" },
        { value: "9b", label: "9º Ano B" },
      ]}
      expanded
    />
  ),
};
