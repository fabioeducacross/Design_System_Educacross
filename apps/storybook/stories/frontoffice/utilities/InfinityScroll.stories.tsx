import type { Meta, StoryObj } from "@storybook/react";

/**
 * **InfinityScroll** - Scroll infinito
 * 
 * Componente para carregamento progressivo de listas longas.
 * 
 * **Arquivo Vue**: `educacross-frontoffice/src/components/InfinityScroll.vue`
 * 
 * @example
 * ```vue
 * <InfinityScroll @load-more="loadMore" :loading="isLoading" :has-more="hasMore">
 *   <ItemList :items="items" />
 * </InfinityScroll>
 * ```
 */
const meta: Meta = {
  title: "Frontoffice/Utilities/InfinityScroll",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "Container com scroll infinito para carregamento progressivo de conteúdo.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock do componente Vue
const InfinityScrollMock = ({ 
  items,
  loading = false,
  hasMore = true
}: { 
  items: { id: number; title: string }[];
  loading?: boolean;
  hasMore?: boolean;
}) => (
  <div className="max-w-md border rounded-lg overflow-hidden">
    <div className="p-4 bg-muted border-b">
      <h3 className="font-semibold">Lista com Scroll Infinito</h3>
      <p className="text-xs text-muted-foreground">{items.length} itens carregados</p>
    </div>
    
    <div className="h-80 overflow-auto">
      <div className="divide-y">
        {items.map((item) => (
          <div key={item.id} className="p-4 hover:bg-accent/30">
            <p className="font-medium">Item {item.id}</p>
            <p className="text-sm text-muted-foreground">{item.title}</p>
          </div>
        ))}
      </div>
      
      {/* Loading indicator */}
      {loading && (
        <div className="p-4 flex items-center justify-center gap-2 text-muted-foreground">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Carregando mais...</span>
        </div>
      )}
      
      {/* End of list */}
      {!hasMore && !loading && (
        <div className="p-4 text-center text-sm text-muted-foreground">
          Fim da lista
        </div>
      )}
      
      {/* Load more trigger area */}
      {hasMore && !loading && (
        <div className="p-4 text-center">
          <button className="px-4 py-2 text-sm text-primary hover:underline">
            Carregar mais
          </button>
        </div>
      )}
    </div>
  </div>
);

const generateItems = (count: number, offset: number = 0) => 
  Array.from({ length: count }, (_, i) => ({
    id: offset + i + 1,
    title: `Descrição do item ${offset + i + 1}`,
  }));

export const Default: Story = {
  render: () => <InfinityScrollMock items={generateItems(10)} />,
};

export const Loading: Story = {
  name: "Carregando",
  render: () => <InfinityScrollMock items={generateItems(8)} loading />,
};

export const EndOfList: Story = {
  name: "Fim da Lista",
  render: () => <InfinityScrollMock items={generateItems(5)} hasMore={false} />,
};

export const ManyItems: Story = {
  name: "Muitos Itens",
  render: () => <InfinityScrollMock items={generateItems(25)} />,
};

export const Empty: Story = {
  name: "Lista Vazia",
  render: () => (
    <div className="max-w-md border rounded-lg overflow-hidden">
      <div className="p-4 bg-muted border-b">
        <h3 className="font-semibold">Lista com Scroll Infinito</h3>
      </div>
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl mb-2">inbox</span>
          <p>Nenhum item encontrado</p>
        </div>
      </div>
    </div>
  ),
};
