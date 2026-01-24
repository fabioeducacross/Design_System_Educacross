import type { Meta, StoryObj } from "@storybook/react";
import { FilterPanel, type FilterGroup } from "@fabioeducacross/ui";
import * as React from "react";

const meta = {
  title: "Components/FilterPanel",
  component: FilterPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Painel de filtros com 3 variantes: sidebar (barra lateral fixa), dropdown (popover flutuante) e accordion (grupos expansíveis). Suporta checkbox, radio e contadores. Ideal para e-commerce, dashboards e listagens.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["sidebar", "dropdown", "accordion"],
      description: "Tipo de apresentação dos filtros",
    },
    groups: {
      description: "Array de grupos de filtros com opções",
    },
    selectedFilters: {
      description: "Objeto com filtros selecionados { groupId: [values] }",
    },
    showClearButton: {
      control: "boolean",
      description: "Mostrar botão de limpar filtros",
    },
    defaultCollapsed: {
      control: "boolean",
      description: "Grupos colapsados por padrão (apenas accordion)",
    },
  },
} satisfies Meta<typeof FilterPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const ecommerceFilters: FilterGroup[] = [
  {
    id: "category",
    title: "Categoria",
    type: "checkbox",
    options: [
      { value: "electronics", label: "Eletrônicos", count: 234 },
      { value: "clothing", label: "Roupas", count: 456 },
      { value: "books", label: "Livros", count: 189 },
      { value: "home", label: "Casa e Decoração", count: 312 },
      { value: "sports", label: "Esportes", count: 145 },
    ],
  },
  {
    id: "price",
    title: "Faixa de Preço",
    type: "checkbox",
    options: [
      { value: "0-50", label: "Até R$ 50", count: 89 },
      { value: "50-100", label: "R$ 50 - R$ 100", count: 156 },
      { value: "100-200", label: "R$ 100 - R$ 200", count: 234 },
      { value: "200-500", label: "R$ 200 - R$ 500", count: 178 },
      { value: "500+", label: "Acima de R$ 500", count: 67 },
    ],
  },
  {
    id: "brand",
    title: "Marca",
    type: "checkbox",
    options: [
      { value: "samsung", label: "Samsung", count: 45 },
      { value: "apple", label: "Apple", count: 32 },
      { value: "xiaomi", label: "Xiaomi", count: 28 },
      { value: "lg", label: "LG", count: 19 },
    ],
  },
  {
    id: "rating",
    title: "Avaliação",
    type: "checkbox",
    options: [
      { value: "5", label: "★★★★★ 5 estrelas", count: 123 },
      { value: "4", label: "★★★★☆ 4+ estrelas", count: 267 },
      { value: "3", label: "★★★☆☆ 3+ estrelas", count: 189 },
    ],
  },
];

const courseFilters: FilterGroup[] = [
  {
    id: "level",
    title: "Nível",
    type: "radio",
    options: [
      { value: "beginner", label: "Iniciante", count: 89 },
      { value: "intermediate", label: "Intermediário", count: 134 },
      { value: "advanced", label: "Avançado", count: 67 },
    ],
  },
  {
    id: "duration",
    title: "Duração",
    type: "checkbox",
    options: [
      { value: "short", label: "Até 5 horas", count: 45 },
      { value: "medium", label: "5-20 horas", count: 89 },
      { value: "long", label: "Mais de 20 horas", count: 156 },
    ],
  },
  {
    id: "language",
    title: "Idioma",
    type: "checkbox",
    options: [
      { value: "pt", label: "Português", count: 234 },
      { value: "en", label: "Inglês", count: 189 },
      { value: "es", label: "Espanhol", count: 67 },
    ],
  },
];

/**
 * Sidebar - Barra lateral fixa, ideal para layouts desktop.
 */
export const Sidebar: Story = {
  render: () => {
    const [filters, setFilters] = React.useState<Record<string, string[]>>({});

    return (
      <div className="flex gap-6">
        <FilterPanel
          variant="sidebar"
          groups={ecommerceFilters}
          selectedFilters={filters}
          onFiltersChange={setFilters}
        />
        <div className="flex-1">
          <div className="rounded-lg border p-6">
            <h3 className="mb-4 text-lg font-semibold">Resultados</h3>
            <p className="text-sm text-muted-foreground">
              Filtros ativos:{" "}
              {Object.values(filters).reduce((sum, arr) => sum + arr.length, 0)}
            </p>
            <pre className="mt-4 rounded bg-muted p-3 text-xs">
              {JSON.stringify(filters, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { FilterPanel } from "@fabioeducacross/ui";
import { useState } from "react";

function ProductList() {
  const [filters, setFilters] = useState({});
  
  const groups = [
    {
      id: "category",
      title: "Categoria",
      type: "checkbox",
      options: [
        { value: "electronics", label: "Eletrônicos", count: 234 },
        { value: "clothing", label: "Roupas", count: 456 },
      ],
    },
  ];

  return (
    <div className="flex gap-6">
      <FilterPanel
        variant="sidebar"
        groups={groups}
        selectedFilters={filters}
        onFiltersChange={setFilters}
      />
      <div className="flex-1">
        {/* Lista de produtos */}
      </div>
    </div>
  );
}`,
      vue2: `<!-- Bootstrap Sidebar Filter -->
<template>
  <div class="d-flex gap-3">
    <div class="border rounded p-3" style="width: 16rem;">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Filtros</h5>
        <button v-if="hasFilters" @click="clearFilters" class="btn btn-sm btn-link">
          Limpar
        </button>
      </div>

      <div v-for="group in filterGroups" :key="group.id" class="mb-4">
        <h6 class="mb-2">{{ group.title }}</h6>
        <div v-for="option in group.options" :key="option.value" class="form-check">
          <input 
            :id="group.id + '-' + option.value"
            v-model="selectedFilters[group.id]"
            :value="option.value"
            type="checkbox" 
            class="form-check-input"
          />
          <label :for="group.id + '-' + option.value" class="form-check-label">
            {{ option.label }}
            <span v-if="option.count" class="text-muted small">({{ option.count }})</span>
          </label>
        </div>
      </div>
    </div>

    <div class="flex-fill">
      <!-- Resultados -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFilters: {},
      filterGroups: [
        { id: 'category', title: 'Categoria', options: [...] }
      ]
    };
  },
  computed: {
    hasFilters() {
      return Object.values(this.selectedFilters).some(arr => arr.length > 0);
    }
  },
  methods: {
    clearFilters() {
      this.selectedFilters = {};
    }
  }
};
</script>`,
      vue3: `<script setup lang="ts">
import { EdFilterPanel } from "@fabioeducacross/ui-vue3";
import { ref } from "vue";

const filters = ref({});
const groups = [
  {
    id: "category",
    title: "Categoria",
    type: "checkbox",
    options: [
      { value: "electronics", label: "Eletrônicos", count: 234 },
    ],
  },
];
</script>

<template>
  <div class="flex gap-6">
    <EdFilterPanel
      variant="sidebar"
      :groups="groups"
      v-model:selected-filters="filters"
    />
    <div class="flex-1">
      <!-- Resultados -->
    </div>
  </div>
</template>`,
    },
  },
};

/**
 * Dropdown - Popover flutuante, ideal para mobile e economia de espaço.
 */
export const Dropdown: Story = {
  render: () => {
    const [filters, setFilters] = React.useState<Record<string, string[]>>({});

    return (
      <div className="w-full space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Produtos (1.234)</h2>
          <FilterPanel
            variant="dropdown"
            groups={ecommerceFilters.slice(0, 3)}
            selectedFilters={filters}
            onFiltersChange={setFilters}
            applyButtonText="Aplicar"
          />
        </div>

        <div className="rounded-lg border p-6">
          <p className="text-sm text-muted-foreground">
            {Object.values(filters).reduce((sum, arr) => sum + arr.length, 0) > 0
              ? `${Object.values(filters).reduce((sum, arr) => sum + arr.length, 0)} filtro(s) aplicado(s)`
              : "Nenhum filtro aplicado"}
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { FilterPanel } from "@fabioeducacross/ui";

function ProductHeader() {
  const [filters, setFilters] = useState({});

  return (
    <div className="flex justify-between items-center">
      <h2>Produtos (1.234)</h2>
      <FilterPanel
        variant="dropdown"
        groups={filterGroups}
        selectedFilters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
}`,
      vue2: `<!-- Bootstrap Dropdown Filter -->
<template>
  <div class="d-flex justify-content-between align-items-center">
    <h2>Produtos (1.234)</h2>
    
    <div class="dropdown">
      <button 
        class="btn btn-outline-secondary dropdown-toggle" 
        type="button" 
        data-toggle="dropdown"
      >
        Filtros
        <span v-if="filterCount > 0" class="badge badge-primary ml-2">{{ filterCount }}</span>
      </button>
      <div class="dropdown-menu dropdown-menu-right p-3" style="width: 20rem;">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h6 class="mb-0">Filtros</h6>
          <button @click="closeDropdown" class="btn btn-sm">✕</button>
        </div>

        <!-- Filter groups -->
        <div v-for="group in filterGroups" :key="group.id" class="mb-3">
          <h6 class="small">{{ group.title }}</h6>
          <div v-for="option in group.options" :key="option.value" class="form-check">
            <input type="checkbox" class="form-check-input" />
            <label class="form-check-label">{{ option.label }}</label>
          </div>
        </div>

        <div class="d-flex gap-2 mt-3">
          <button @click="clearFilters" class="btn btn-outline-secondary flex-fill">
            Limpar
          </button>
          <button @click="applyFilters" class="btn btn-primary flex-fill">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>`,
      vue3: `<EdFilterPanel
  variant="dropdown"
  :groups="groups"
  v-model:selected-filters="filters"
  apply-button-text="Aplicar"
/>`,
    },
  },
};

/**
 * Accordion - Grupos expansíveis, economiza espaço vertical.
 */
export const Accordion: Story = {
  render: () => {
    const [filters, setFilters] = React.useState<Record<string, string[]>>({});

    return (
      <div className="w-96">
        <FilterPanel
          variant="accordion"
          groups={courseFilters}
          selectedFilters={filters}
          onFiltersChange={setFilters}
          defaultCollapsed={false}
        />
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `<FilterPanel
  variant="accordion"
  groups={filterGroups}
  selectedFilters={filters}
  onFiltersChange={setFilters}
  defaultCollapsed={false}
/>`,
      vue2: `<!-- Bootstrap Accordion Filter -->
<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5>Filtros</h5>
      <button v-if="hasFilters" @click="clearFilters" class="btn btn-sm btn-link">
        Limpar ({{ filterCount }})
      </button>
    </div>

    <div class="accordion" id="filterAccordion">
      <div v-for="(group, index) in filterGroups" :key="group.id" class="card">
        <div class="card-header" :id="'heading-' + group.id">
          <button 
            class="btn btn-link w-100 text-left d-flex justify-content-between"
            data-toggle="collapse" 
            :data-target="'#collapse-' + group.id"
          >
            {{ group.title }}
            <i class="bi bi-chevron-down"></i>
          </button>
        </div>

        <div 
          :id="'collapse-' + group.id" 
          class="collapse show" 
          :data-parent="'#filterAccordion'"
        >
          <div class="card-body">
            <div v-for="option in group.options" :key="option.value" class="form-check">
              <input type="checkbox" class="form-check-input" />
              <label class="form-check-label">
                {{ option.label }}
                <span v-if="option.count" class="text-muted">({{ option.count }})</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`,
      vue3: `<EdFilterPanel
  variant="accordion"
  :groups="groups"
  v-model:selected-filters="filters"
  :default-collapsed="false"
/>`,
    },
  },
};

/**
 * Radio buttons - Apenas uma opção por grupo.
 */
export const RadioFilters: Story = {
  render: () => {
    const [filters, setFilters] = React.useState<Record<string, string[]>>({});

    const sortFilters: FilterGroup[] = [
      {
        id: "sort",
        title: "Ordenar por",
        type: "radio",
        options: [
          { value: "relevance", label: "Relevância" },
          { value: "price-asc", label: "Menor preço" },
          { value: "price-desc", label: "Maior preço" },
          { value: "newest", label: "Mais recentes" },
          { value: "best-rated", label: "Melhor avaliados" },
        ],
      },
    ];

    return (
      <div className="w-80">
        <FilterPanel
          variant="sidebar"
          groups={sortFilters}
          selectedFilters={filters}
          onFiltersChange={setFilters}
          showClearButton={false}
        />
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `const sortFilters = [
  {
    id: "sort",
    title: "Ordenar por",
    type: "radio",
    options: [
      { value: "relevance", label: "Relevância" },
      { value: "price-asc", label: "Menor preço" },
    ],
  },
];

<FilterPanel
  variant="sidebar"
  groups={sortFilters}
  selectedFilters={filters}
  onFiltersChange={setFilters}
/>`,
      vue2: `<div v-for="option in sortOptions" :key="option.value" class="form-check">
  <input 
    :id="option.value"
    v-model="selectedSort"
    :value="option.value"
    type="radio" 
    name="sort"
    class="form-check-input"
  />
  <label :for="option.value" class="form-check-label">
    {{ option.label }}
  </label>
</div>`,
      vue3: `<EdFilterPanel
  variant="sidebar"
  :groups="sortFilters"
  v-model:selected-filters="filters"
  :show-clear-button="false"
/>`,
    },
  },
};

/**
 * Caso de uso: E-commerce completo com produtos.
 */
export const EcommerceExample: Story = {
  render: () => {
    const [filters, setFilters] = React.useState<Record<string, string[]>>({});

    const mockProducts = [
      { id: 1, name: "iPhone 15 Pro", price: "R$ 8.999", rating: 5, category: "electronics" },
      { id: 2, name: "MacBook Pro M3", price: "R$ 15.499", rating: 5, category: "electronics" },
      { id: 3, name: "AirPods Pro", price: "R$ 2.199", rating: 4, category: "electronics" },
      { id: 4, name: "Camiseta Nike", price: "R$ 149", rating: 4, category: "clothing" },
    ];

    return (
      <div className="flex gap-6">
        <FilterPanel
          variant="sidebar"
          groups={ecommerceFilters}
          selectedFilters={filters}
          onFiltersChange={setFilters}
        />

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Produtos ({mockProducts.length})
            </h2>
            <select className="rounded-md border px-3 py-2 text-sm">
              <option>Relevância</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {mockProducts.map((product) => (
              <div key={product.id} className="rounded-lg border p-4">
                <div className="mb-2 h-32 rounded bg-muted"></div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-lg font-bold text-primary">{product.price}</p>
                <div className="mt-2 text-sm text-muted-foreground">
                  {"★".repeat(product.rating)}{"☆".repeat(5 - product.rating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `function EcommercePage() {
  const [filters, setFilters] = useState({});
  const filteredProducts = applyFilters(products, filters);

  return (
    <div className="flex gap-6">
      <FilterPanel
        variant="sidebar"
        groups={filterGroups}
        selectedFilters={filters}
        onFiltersChange={setFilters}
      />

      <div className="flex-1">
        <h2>Produtos ({filteredProducts.length})</h2>
        <div className="grid grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}`,
      vue2: `<template>
  <div class="d-flex gap-3">
    <!-- Sidebar com filtros -->
    <div><!-- FilterPanel --></div>
    
    <!-- Grid de produtos -->
    <div class="flex-fill">
      <h2>Produtos ({{ filteredProducts.length }})</h2>
      <div class="row">
        <div v-for="product in filteredProducts" :key="product.id" class="col-md-4">
          <div class="card">
            <div class="card-body">
              <h5>{{ product.name }}</h5>
              <p class="text-primary">{{ product.price }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>`,
      vue3: `<template>
  <div class="flex gap-6">
    <EdFilterPanel
      variant="sidebar"
      :groups="filterGroups"
      v-model:selected-filters="filters"
    />

    <div class="flex-1">
      <h2>Produtos ({{ filteredProducts.length }})</h2>
      <div class="grid grid-cols-3 gap-4">
        <ProductCard v-for="product in filteredProducts" :key="product.id" v-bind="product" />
      </div>
    </div>
  </div>
</template>`,
    },
  },
};
