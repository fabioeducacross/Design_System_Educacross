import type { Meta, StoryObj } from "@storybook/react";
import { AutoSuggest, type SuggestionItem } from "@fabioeducacross/ui";
import * as React from "react";

const meta = {
  title: "Components/AutoSuggest",
  component: AutoSuggest,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Campo de busca com autocompletar e sugestões. Suporta 3 variantes: default (filtragem local), async (busca remota com loading) e multiSelect (seleção múltipla com tags). Ideal para pesquisa de produtos, usuários e filtros.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "async", "multiSelect"],
      description: "Tipo de autocompletar",
    },
    options: {
      description: "Array de objetos { value, label, disabled? }",
    },
    loading: {
      control: "boolean",
      description: "Estado de carregamento (variant='async')",
    },
    minChars: {
      control: { type: "number", min: 0, max: 5 },
      description: "Mínimo de caracteres para mostrar sugestões",
    },
    debounce: {
      control: { type: "number", min: 0, max: 1000 },
      description: "Debounce em ms para busca assíncrona",
    },
  },
} satisfies Meta<typeof AutoSuggest>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries: SuggestionItem[] = [
  { value: "br", label: "Brasil" },
  { value: "ar", label: "Argentina" },
  { value: "cl", label: "Chile" },
  { value: "co", label: "Colômbia" },
  { value: "mx", label: "México" },
  { value: "pe", label: "Peru" },
  { value: "uy", label: "Uruguai" },
  { value: "py", label: "Paraguai" },
  { value: "ve", label: "Venezuela" },
  { value: "ec", label: "Equador" },
];

const courses: SuggestionItem[] = [
  { value: "js", label: "JavaScript Fundamentals" },
  { value: "react", label: "React: The Complete Guide" },
  { value: "ts", label: "TypeScript for Beginners" },
  { value: "node", label: "Node.js Backend Development" },
  { value: "python", label: "Python Programming" },
  { value: "docker", label: "Docker & Kubernetes" },
  { value: "aws", label: "AWS Cloud Practitioner" },
  { value: "next", label: "Next.js 14 App Router" },
  { value: "tailwind", label: "Tailwind CSS Mastery" },
  { value: "git", label: "Git & GitHub Essentials" },
];

const users: SuggestionItem[] = [
  { value: "1", label: "João Silva (joao@email.com)" },
  { value: "2", label: "Maria Santos (maria@email.com)" },
  { value: "3", label: "Pedro Costa (pedro@email.com)" },
  { value: "4", label: "Ana Oliveira (ana@email.com)" },
  { value: "5", label: "Carlos Souza (carlos@email.com)" },
  { value: "6", label: "Julia Almeida (julia@email.com)" },
  { value: "7", label: "Ricardo Lima (ricardo@email.com)" },
  { value: "8", label: "Fernanda Rocha (fernanda@email.com)" },
];

/**
 * AutoSuggest padrão com filtragem local.
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    
    return (
      <div className="w-96">
        <AutoSuggest
          variant="default"
          options={countries}
          value={value}
          onValueChange={setValue}
          placeholder="Selecione um país..."
        />
        <p className="mt-2 text-sm text-muted-foreground">
          Selecionado: {value || "Nenhum"}
        </p>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { AutoSuggest } from "@fabioeducacross/ui";
import { useState } from "react";

function SearchCountry() {
  const [value, setValue] = useState("");
  
  const countries = [
    { value: "br", label: "Brasil" },
    { value: "ar", label: "Argentina" },
    // ...
  ];

  return (
    <AutoSuggest
      options={countries}
      value={value}
      onValueChange={setValue}
      placeholder="Selecione um país..."
    />
  );
}`,
      vue2: `<!-- Bootstrap Typeahead (requer biblioteca externa) -->
<template>
  <div class="form-group">
    <input 
      v-model="query"
      @input="filterOptions"
      type="text" 
      class="form-control" 
      placeholder="Selecione um país..."
      autocomplete="off"
    />
    <ul v-if="showDropdown && filteredCountries.length > 0" class="list-group position-absolute" style="z-index: 1000; max-height: 300px; overflow-y: auto;">
      <li 
        v-for="country in filteredCountries" 
        :key="country.value"
        @click="selectCountry(country)"
        class="list-group-item list-group-item-action"
        style="cursor: pointer;"
      >
        {{ country.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      selectedValue: '',
      showDropdown: false,
      countries: [
        { value: 'br', label: 'Brasil' },
        { value: 'ar', label: 'Argentina' },
      ],
      filteredCountries: []
    };
  },
  methods: {
    filterOptions() {
      this.showDropdown = this.query.length > 0;
      this.filteredCountries = this.countries.filter(c => 
        c.label.toLowerCase().includes(this.query.toLowerCase())
      );
    },
    selectCountry(country) {
      this.query = country.label;
      this.selectedValue = country.value;
      this.showDropdown = false;
      this.$emit('change', country.value);
    }
  }
};
</script>`,
      vue3: `<script setup lang="ts">
import { EdAutoSuggest } from "@fabioeducacross/ui-vue3";
import { ref } from "vue";

const value = ref("");
const countries = [
  { value: "br", label: "Brasil" },
  { value: "ar", label: "Argentina" },
];
</script>

<template>
  <EdAutoSuggest
    v-model="value"
    :options="countries"
    placeholder="Selecione um país..."
  />
</template>`,
    },
  },
};

/**
 * Busca assíncrona com loading state e debounce.
 */
export const Async: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [options, setOptions] = React.useState<SuggestionItem[]>([]);
    const [loading, setLoading] = React.useState(false);

    const handleSearch = async (query: string) => {
      if (query.length < 2) {
        setOptions([]);
        return;
      }

      setLoading(true);
      
      // Simular API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      
      const filtered = users.filter((user) =>
        user.label.toLowerCase().includes(query.toLowerCase())
      );
      
      setOptions(filtered);
      setLoading(false);
    };

    return (
      <div className="w-96">
        <AutoSuggest
          variant="async"
          options={options}
          value={value}
          onValueChange={setValue}
          onSearch={handleSearch}
          loading={loading}
          minChars={2}
          debounce={300}
          placeholder="Buscar usuário (mín. 2 caracteres)..."
        />
        <p className="mt-2 text-sm text-muted-foreground">
          {loading ? "Buscando..." : value ? `Selecionado: ${value}` : "Digite para buscar"}
        </p>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { AutoSuggest } from "@fabioeducacross/ui";
import { useState } from "react";

function AsyncSearch() {
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const response = await fetch(\`/api/users?q=\${query}\`);
    const data = await response.json();
    setOptions(data);
    setLoading(false);
  };

  return (
    <AutoSuggest
      variant="async"
      options={options}
      value={value}
      onValueChange={setValue}
      onSearch={handleSearch}
      loading={loading}
      minChars={2}
      debounce={300}
    />
  );
}`,
      vue2: `<template>
  <div class="form-group position-relative">
    <input 
      v-model="query"
      @input="debouncedSearch"
      type="text" 
      class="form-control" 
      placeholder="Buscar usuário..."
    />
    <span v-if="loading" class="spinner-border spinner-border-sm position-absolute" style="right: 10px; top: 10px;"></span>
    <ul v-if="results.length > 0" class="list-group position-absolute w-100" style="z-index: 1000;">
      <li v-for="user in results" :key="user.value" @click="selectUser(user)" class="list-group-item list-group-item-action">
        {{ user.label }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
      results: [],
      loading: false,
      debounceTimer: null
    };
  },
  methods: {
    debouncedSearch() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.searchUsers();
      }, 300);
    },
    async searchUsers() {
      if (this.query.length < 2) return;
      this.loading = true;
      const response = await fetch(\`/api/users?q=\${this.query}\`);
      this.results = await response.json();
      this.loading = false;
    }
  }
};
</script>`,
      vue3: `<script setup lang="ts">
import { EdAutoSuggest } from "@fabioeducacross/ui-vue3";
import { ref } from "vue";

const value = ref("");
const options = ref([]);
const loading = ref(false);

const handleSearch = async (query: string) => {
  loading.value = true;
  const response = await fetch(\`/api/users?q=\${query}\`);
  options.value = await response.json();
  loading.value = false;
};
</script>

<template>
  <EdAutoSuggest
    v-model="value"
    variant="async"
    :options="options"
    :loading="loading"
    :on-search="handleSearch"
    :min-chars="2"
  />
</template>`,
    },
  },
};

/**
 * Multi-select com tags removíveis.
 */
export const MultiSelect: Story = {
  render: () => {
    const [values, setValues] = React.useState<string[]>([]);

    return (
      <div className="w-[500px]">
        <AutoSuggest
          variant="multiSelect"
          options={courses}
          values={values}
          onValuesChange={setValues}
          placeholder="Selecione cursos..."
        />
        <p className="mt-2 text-sm text-muted-foreground">
          {values.length > 0
            ? `${values.length} curso(s) selecionado(s)`
            : "Nenhum curso selecionado"}
        </p>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { AutoSuggest } from "@fabioeducacross/ui";
import { useState } from "react";

function MultiSelectCourses() {
  const [values, setValues] = useState([]);
  
  const courses = [
    { value: "js", label: "JavaScript Fundamentals" },
    { value: "react", label: "React Complete Guide" },
    // ...
  ];

  return (
    <AutoSuggest
      variant="multiSelect"
      options={courses}
      values={values}
      onValuesChange={setValues}
    />
  );
}`,
      vue2: `<!-- Multi-select com Bootstrap requer lógica customizada -->
<template>
  <div>
    <div v-if="selectedCourses.length > 0" class="mb-2">
      <span 
        v-for="courseId in selectedCourses" 
        :key="courseId"
        class="badge badge-secondary mr-2"
      >
        {{ getCourseLabel(courseId) }}
        <button @click="removeCourse(courseId)" class="btn-close btn-close-white ml-1" style="font-size: 0.8em;"></button>
      </span>
    </div>
    <input 
      v-model="query"
      @input="filterCourses"
      type="text" 
      class="form-control"
      placeholder="Selecione cursos..."
    />
    <ul v-if="showDropdown" class="list-group position-absolute">
      <li 
        v-for="course in filteredCourses"
        :key="course.value"
        @click="toggleCourse(course)"
        class="list-group-item d-flex align-items-center"
        style="cursor: pointer;"
      >
        <input type="checkbox" :checked="selectedCourses.includes(course.value)" class="mr-2" />
        {{ course.label }}
      </li>
    </ul>
  </div>
</template>`,
      vue3: `<script setup lang="ts">
import { EdAutoSuggest } from "@fabioeducacross/ui-vue3";
import { ref } from "vue";

const values = ref([]);
const courses = [
  { value: "js", label: "JavaScript" },
  { value: "react", label: "React" },
];
</script>

<template>
  <EdAutoSuggest
    v-model:values="values"
    variant="multiSelect"
    :options="courses"
  />
</template>`,
    },
  },
};

/**
 * Navegação por teclado (ArrowUp, ArrowDown, Enter, Escape).
 */
export const KeyboardNavigation: Story = {
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <div className="w-96 space-y-4">
        <AutoSuggest
          options={countries}
          value={value}
          onValueChange={setValue}
          placeholder="Use ↑↓ para navegar, Enter para selecionar"
        />
        <div className="rounded-md bg-muted p-3 text-sm">
          <p className="font-semibold">Atalhos de teclado:</p>
          <ul className="mt-2 space-y-1 text-muted-foreground">
            <li>↓ - Navegar para baixo</li>
            <li>↑ - Navegar para cima</li>
            <li>Enter - Selecionar item destacado</li>
            <li>Esc - Fechar dropdown</li>
          </ul>
        </div>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `// Navegação por teclado já incluída no componente
<AutoSuggest
  options={options}
  value={value}
  onValueChange={setValue}
/>`,
      vue2: `<!-- Adicionar @keydown no input -->
<input 
  @keydown.down.prevent="highlightNext"
  @keydown.up.prevent="highlightPrevious"
  @keydown.enter.prevent="selectHighlighted"
  @keydown.esc="closeDropdown"
/>`,
      vue3: `<!-- Navegação incluída no componente -->
<EdAutoSuggest :options="options" v-model="value" />`,
    },
  },
};

/**
 * Caso de uso: Busca de produtos E-commerce.
 */
export const ProductSearch: Story = {
  render: () => {
    const products: SuggestionItem[] = [
      { value: "1", label: "iPhone 15 Pro Max - R$ 8.999" },
      { value: "2", label: "MacBook Pro M3 - R$ 15.499" },
      { value: "3", label: "AirPods Pro 2 - R$ 2.199" },
      { value: "4", label: "iPad Air - R$ 5.799" },
      { value: "5", label: "Apple Watch Series 9 - R$ 4.299" },
    ];

    const [value, setValue] = React.useState("");

    return (
      <div className="w-full max-w-md rounded-lg border p-6">
        <h3 className="mb-4 text-lg font-semibold">Pesquisar Produtos</h3>
        <AutoSuggest
          options={products}
          value={value}
          onValueChange={setValue}
          placeholder="Digite o nome do produto..."
        />
        {value && (
          <div className="mt-4 rounded-md bg-muted p-3">
            <p className="text-sm font-medium">Produto selecionado:</p>
            <p className="text-sm text-muted-foreground">
              {products.find((p) => p.value === value)?.label}
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { AutoSuggest } from "@fabioeducacross/ui";

function ProductSearch() {
  const [value, setValue] = useState("");
  const products = [
    { value: "1", label: "iPhone 15 Pro - R$ 8.999" },
    { value: "2", label: "MacBook Pro M3 - R$ 15.499" },
  ];

  return (
    <div>
      <h3>Pesquisar Produtos</h3>
      <AutoSuggest
        options={products}
        value={value}
        onValueChange={setValue}
        placeholder="Digite o nome do produto..."
      />
    </div>
  );
}`,
      vue2: `<template>
  <div class="card p-4">
    <h5>Pesquisar Produtos</h5>
    <!-- AutoSuggest customizado -->
  </div>
</template>`,
      vue3: `<template>
  <div class="rounded-lg border p-6">
    <h3>Pesquisar Produtos</h3>
    <EdAutoSuggest
      :options="products"
      v-model="value"
      placeholder="Digite o nome do produto..."
    />
  </div>
</template>`,
    },
  },
};

/**
 * Caso de uso: Formulário de filtros com multi-select.
 */
export const FilterForm: Story = {
  render: () => {
    const [categories, setCategories] = React.useState<string[]>([]);
    const [tags, setTags] = React.useState<string[]>([]);

    const categoryOptions: SuggestionItem[] = [
      { value: "tech", label: "Tecnologia" },
      { value: "design", label: "Design" },
      { value: "business", label: "Negócios" },
      { value: "marketing", label: "Marketing" },
      { value: "data", label: "Data Science" },
    ];

    const tagOptions: SuggestionItem[] = [
      { value: "beginner", label: "Iniciante" },
      { value: "intermediate", label: "Intermediário" },
      { value: "advanced", label: "Avançado" },
      { value: "free", label: "Gratuito" },
      { value: "paid", label: "Pago" },
      { value: "certificate", label: "Com Certificado" },
    ];

    return (
      <div className="w-full max-w-lg space-y-6 rounded-lg border p-6">
        <h3 className="text-lg font-semibold">Filtros de Cursos</h3>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Categorias</label>
          <AutoSuggest
            variant="multiSelect"
            options={categoryOptions}
            values={categories}
            onValuesChange={setCategories}
            placeholder="Selecione categorias..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <AutoSuggest
            variant="multiSelect"
            options={tagOptions}
            values={tags}
            onValuesChange={setTags}
            placeholder="Selecione tags..."
          />
        </div>

        <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Aplicar Filtros ({categories.length + tags.length})
        </button>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `function FilterForm() {
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  return (
    <div className="space-y-6">
      <div>
        <label>Categorias</label>
        <AutoSuggest
          variant="multiSelect"
          options={categoryOptions}
          values={categories}
          onValuesChange={setCategories}
        />
      </div>

      <div>
        <label>Tags</label>
        <AutoSuggest
          variant="multiSelect"
          options={tagOptions}
          values={tags}
          onValuesChange={setTags}
        />
      </div>

      <button>
        Aplicar Filtros ({categories.length + tags.length})
      </button>
    </div>
  );
}`,
      vue2: `<template>
  <div class="card p-4">
    <h5>Filtros de Cursos</h5>
    
    <div class="form-group">
      <label>Categorias</label>
      <!-- Multi-select customizado -->
    </div>
    
    <div class="form-group">
      <label>Tags</label>
      <!-- Multi-select customizado -->
    </div>
    
    <button class="btn btn-primary btn-block">
      Aplicar Filtros ({{ totalFilters }})
    </button>
  </div>
</template>`,
      vue3: `<template>
  <div class="space-y-6">
    <div>
      <label>Categorias</label>
      <EdAutoSuggest
        variant="multiSelect"
        :options="categoryOptions"
        v-model:values="categories"
      />
    </div>
    
    <div>
      <label>Tags</label>
      <EdAutoSuggest
        variant="multiSelect"
        :options="tagOptions"
        v-model:values="tags"
      />
    </div>
    
    <button>
      Aplicar Filtros ({{ categories.length + tags.length }})
    </button>
  </div>
</template>`,
    },
  },
};
