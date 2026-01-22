/**
 * API CONTRACT: DataTable Component
 * 
 * Este contrato define as regras de uso obrigatórias do DataTable.
 * Violações podem causar bugs de performance, acessibilidade ou data loss.
 * 
 * @component DataTable (Organismo)
 * @category Data Display
 * @atomic-level Organismo (Table + Toolbar + Pagination)
 */

// ============================================================================
// 1. REGRAS OBRIGATÓRIAS (MUST / MUST NOT)
// ============================================================================

/**
 * ✅ MUST #1: Data imutável (nunca mutar diretamente)
 * 
 * Array de data deve ser imutável. Use métodos imutáveis (map, filter, toSorted).
 * TanStack Table otimiza com Object.is() — mutação quebra detecção de mudanças.
 */
export const RULE_IMMUTABLE_DATA = {
  rule: "MUST treat data as immutable",
  rationale: "TanStack Table usa referential equality para performance",
  
  // ✅ VÁLIDO
  valid: `
    const [students, setStudents] = useState<Student[]>([...initialData]);
    
    // Adicionar item (cria novo array)
    setStudents([...students, newStudent]);
    
    // Atualizar item (cria novo array)
    setStudents(students.map(s => 
      s.id === updatedId ? { ...s, ...updates } : s
    ));
    
    // Remover item (cria novo array)
    setStudents(students.filter(s => s.id !== deletedId));
    
    // Ordenar (toSorted, não sort)
    const sorted = [...students].toSorted((a, b) => 
      a.name.localeCompare(b.name)
    );
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    // ❌ Mutação direta (quebra re-render)
    students.push(newStudent);
    setStudents(students); // React não detecta mudança (mesma ref)
    
    // ❌ Sort in-place
    students.sort((a, b) => a.name.localeCompare(b.name));
    
    // ❌ Mutação de propriedade
    students[0].name = "Novo Nome"; // Objeto mutado
  `,
  
  automation: {
    eslint: "eslint-plugin-immutable ou eslint-plugin-functional",
    test: "expect(prevData).not.toBe(nextData) // Diferentes referências",
  },
} as const;

/**
 * ✅ MUST #2: Definir getRowId para dados sem campo "id"
 * 
 * Se dados não têm campo `id`, forneça função getRowId para extrair chave única.
 */
export const RULE_GET_ROW_ID = {
  rule: "MUST provide getRowId if data lacks 'id' field",
  rationale: "React keys e seleção dependem de IDs únicos e estáveis",
  
  // ✅ VÁLIDO
  valid: `
    interface Mission {
      missionId: string; // ⚠️ Não é "id", é "missionId"
      title: string;
    }
    
    <DataTable<Mission>
      data={missions}
      columns={missionColumns}
      getRowId={(row) => row.missionId} // ✅ Define extrator customizado
    />
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    // ❌ Sem getRowId, DataTable busca row.id (undefined)
    <DataTable<Mission>
      data={missions}
      columns={missionColumns}
    />
    // Causa: keys duplicadas, seleção quebrada, erros de console
  `,
  
  default: "Se não fornecido, usa (row) => row.id",
} as const;

/**
 * ✅ MUST #3: Controlar state externamente ou usar uncontrolled
 * 
 * Estado pode ser controlled (você gerencia) ou uncontrolled (DataTable gerencia).
 * Não misture: se fornecer `sortBy`, DEVE fornecer `onSort`.
 */
export const RULE_CONTROLLED_UNCONTROLLED = {
  rule: "MUST be fully controlled OR fully uncontrolled",
  rationale: "Misturar causas state desync e comportamento imprevisível",
  
  // ✅ VÁLIDO (Uncontrolled — DataTable gerencia internamente)
  uncontrolled: `
    <DataTable
      data={students}
      columns={studentColumns}
      sortable // DataTable gerencia sortBy/sortOrder internamente
      pagination // DataTable gerencia page/pageSize internamente
    />
  `,
  
  // ✅ VÁLIDO (Controlled — você gerencia state)
  controlled: `
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    
    <DataTable
      data={students}
      columns={studentColumns}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSort={(column, order) => {
        setSortBy(column);
        setSortOrder(order);
      }}
    />
  `,
  
  // ❌ INVÁLIDO (Parcialmente controlled — state desync)
  invalid: `
    <DataTable
      data={students}
      columns={studentColumns}
      sortBy="name" // ❌ Define sortBy mas sem onSort
      // DataTable não consegue atualizar sortBy quando usuário clica
    />
  `,
  
  rule_of_thumb: "Se fornece value prop (sortBy, page, selectedRows), DEVE fornecer onChange",
} as const;

/**
 * ✅ MUST #4: Columns deve ser memoizado (useMemo)
 * 
 * Array de columns deve ser referência estável (useMemo).
 * Re-criação a cada render causa perda de performance.
 */
export const RULE_MEMOIZE_COLUMNS = {
  rule: "MUST memoize columns with useMemo",
  rationale: "Evita re-criação de tabela a cada render",
  
  // ✅ VÁLIDO
  valid: `
    const studentColumns = useMemo<DataTableColumn<Student>[]>(
      () => [
        {
          id: "name",
          header: "Nome",
          accessorKey: "name",
          sortable: true,
        },
        {
          id: "email",
          header: "E-mail",
          accessorKey: "email",
        },
        {
          id: "score",
          header: "Pontuação",
          accessorKey: "score",
          cell: (value) => <Badge>{value} pts</Badge>,
        },
      ],
      [] // Sem dependências (colunas estáticas)
    );
    
    <DataTable data={students} columns={studentColumns} />
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    // ❌ Colunas criadas a cada render
    <DataTable
      data={students}
      columns={[
        { id: "name", header: "Nome", accessorKey: "name" },
        { id: "email", header: "E-mail", accessorKey: "email" },
      ]}
    />
    // Causa: Table re-criada 60x por segundo se há animações
  `,
  
  performance_impact: "5-10ms por render sem memo, <1ms com memo",
} as const;

/**
 * ⛔ MUST NOT #5: Não use índice como getRowId
 * 
 * NUNCA use índice do array como ID (quebra seleção ao reordenar).
 */
export const RULE_NO_INDEX_AS_ID = {
  rule: "MUST NOT use array index as row ID",
  rationale: "Índices mudam ao reordenar/filtrar, causando bugs de seleção",
  
  // ✅ VÁLIDO
  valid: `
    getRowId={(row) => row.id} // Campo estável
    getRowId={(row) => row.userId} // Campo único
    getRowId={(row) => \`\${row.type}-\${row.id}\`} // Composto
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    // ❌ Índice não é estável
    getRowId={(row, index) => String(index)}
    
    // Cenário de bug:
    // 1. Usuário seleciona linha índice 2 (Alice)
    // 2. Dados são reordenados (Alice agora é índice 5)
    // 3. Seleção ainda aponta para índice 2 (agora é Bob) — BUG
  `,
  
  exception: "Apenas se dados forem 100% estáticos (sem add/remove/reorder)",
} as const;

/**
 * ⛔ MUST NOT #6: Não confunda paginação client vs server
 * 
 * DataTable faz paginação CLIENT-SIDE por padrão.
 * Para server-side, você deve fatiar dados no backend.
 */
export const RULE_PAGINATION_RESPONSIBILITY = {
  rule: "MUST NOT expect server-side pagination by default",
  rationale: "DataTable pagina array completo no cliente",
  
  // ✅ VÁLIDO (Client-side — dados completos)
  client_side: `
    // Backend retorna TODOS os 1000 alunos
    const [students, setStudents] = useState<Student[]>([]);
    
    useEffect(() => {
      fetch("/api/students") // Sem ?page
        .then(res => res.json())
        .then(data => setStudents(data.students)); // Array completo
    }, []);
    
    <DataTable
      data={students} // 1000 itens
      columns={studentColumns}
      pagination
      pageSize={20}
      totalItems={students.length} // 1000
    />
    // DataTable fatia internamente: students.slice(page * 20, (page + 1) * 20)
  `,
  
  // ✅ VÁLIDO (Server-side — você controla fetch)
  server_side: `
    const [students, setStudents] = useState<Student[]>([]);
    const [page, setPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    
    useEffect(() => {
      fetch(\`/api/students?page=\${page}&limit=20\`) // Backend pagina
        .then(res => res.json())
        .then(data => {
          setStudents(data.students); // Apenas 20 itens da página
          setTotalItems(data.total); // Total de 1000
        });
    }, [page]);
    
    <DataTable
      data={students} // Apenas 20 itens
      columns={studentColumns}
      page={page}
      pageSize={20}
      totalItems={totalItems} // 1000 (todas as páginas)
      onPageChange={setPage} // Controlled
    />
  `,
  
  // ❌ INVÁLIDO (Expectativa errada)
  invalid: `
    // ❌ Passa apenas 20 itens mas totalItems=1000
    <DataTable
      data={first20Students} // Apenas página 1
      columns={studentColumns}
      pagination
      totalItems={1000}
    />
    // Paginação mostra "50 páginas" mas só há dados para 1
    // Clicar em página 2 mostra vazio
  `,
  
  guideline: "Client-side: data.length === totalItems | Server-side: data.length < totalItems",
} as const;

// ============================================================================
// 2. PADRÕES DE COMPOSIÇÃO
// ============================================================================

/**
 * PATTERN #1: Colunas com renderização customizada
 * 
 * Use função `cell` para customizar renderização de células.
 */
export const PATTERN_CUSTOM_CELL = {
  pattern: "Custom cell rendering with components",
  
  example: `
    const studentColumns = useMemo<DataTableColumn<Student>[]>(
      () => [
        {
          id: "avatar",
          header: "",
          accessorKey: "avatarUrl",
          cell: (url) => <Avatar src={url} size="sm" />,
          width: 48,
          sortable: false,
        },
        {
          id: "name",
          header: "Nome",
          accessorKey: "name",
          cell: (name, row) => (
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-xs text-muted-foreground">{row.email}</p>
            </div>
          ),
        },
        {
          id: "status",
          header: "Status",
          accessorKey: "status",
          cell: (status) => (
            <Badge variant={status === "active" ? "success" : "secondary"}>
              {status === "active" ? "Ativo" : "Inativo"}
            </Badge>
          ),
        },
        {
          id: "score",
          header: "Pontuação",
          accessorKey: "score",
          cell: (score) => (
            <div className="text-right font-mono">{score.toLocaleString()}</div>
          ),
          align: "right",
        },
      ],
      []
    );
  `,
  
  notes: [
    "cell recebe (value, row, index)",
    "value é resultado de accessorKey ou accessorFn",
    "Retorne ReactNode (componente, string, null)",
  ],
} as const;

/**
 * PATTERN #2: Ações por linha (row actions menu)
 * 
 * Use rowActions para menu de 3 pontos em cada linha.
 */
export const PATTERN_ROW_ACTIONS = {
  pattern: "Row actions with conditional visibility",
  
  example: `
    const studentRowActions: DataTableRowAction<Student>[] = [
      {
        id: "view",
        label: "Ver detalhes",
        icon: <Eye size={16} />,
        onAction: (student) => {
          router.push(\`/students/\${student.id}\`);
        },
      },
      {
        id: "edit",
        label: "Editar",
        icon: <Edit size={16} />,
        onAction: (student) => {
          openEditModal(student);
        },
        disabled: (student) => student.status === "archived",
      },
      {
        id: "delete",
        label: "Deletar",
        icon: <Trash2 size={16} />,
        variant: "destructive",
        onAction: async (student) => {
          if (confirm(\`Deletar \${student.name}?\`)) {
            await deleteStudent(student.id);
          }
        },
        hidden: (student) => student.role === "admin", // Admins não podem ser deletados
      },
    ];
    
    <DataTable
      data={students}
      columns={studentColumns}
      rowActions={studentRowActions}
    />
  `,
  
  notes: [
    "hidden: (row) => boolean — Oculta ação para certas linhas",
    "disabled: (row) => boolean — Desabilita ação (mas mostra)",
    "variant='destructive' — Cor vermelha para ações perigosas",
  ],
} as const;

/**
 * PATTERN #3: Ações em massa (bulk actions)
 * 
 * Use bulkActions para operações em múltiplas linhas selecionadas.
 */
export const PATTERN_BULK_ACTIONS = {
  pattern: "Bulk actions with confirmation",
  
  example: `
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    
    const studentBulkActions: DataTableBulkAction[] = [
      {
        id: "export",
        label: "Exportar selecionados",
        icon: <Download size={16} />,
        onAction: async (ids) => {
          const students = data.filter(s => ids.has(s.id));
          await exportToCSV(students);
          toast.success(\`\${ids.size} alunos exportados\`);
        },
      },
      {
        id: "archive",
        label: "Arquivar selecionados",
        icon: <Archive size={16} />,
        requiresConfirmation: true,
        confirmationMessage: (count) => 
          \`Tem certeza que deseja arquivar \${count} alunos?\`,
        onAction: async (ids) => {
          await Promise.all(
            Array.from(ids).map(id => archiveStudent(id))
          );
          toast.success(\`\${ids.size} alunos arquivados\`);
          setSelectedIds(new Set()); // Limpa seleção
        },
      },
      {
        id: "delete",
        label: "Deletar selecionados",
        icon: <Trash2 size={16} />,
        variant: "destructive",
        requiresConfirmation: true,
        confirmationMessage: (count) => 
          \`⚠️ Esta ação é IRREVERSÍVEL. Deletar \${count} alunos?\`,
        onAction: async (ids) => {
          await Promise.all(
            Array.from(ids).map(id => deleteStudent(id))
          );
          toast.success(\`\${ids.size} alunos deletados\`);
          setSelectedIds(new Set());
        },
      },
    ];
    
    <DataTable
      data={students}
      columns={studentColumns}
      selectable
      selectedRows={selectedIds}
      onSelectionChange={setSelectedIds}
      bulkActions={studentBulkActions}
    />
  `,
  
  notes: [
    "requiresConfirmation abre Dialog antes de executar",
    "confirmationMessage pode ser função (recebe count)",
    "Sempre limpe seleção após ação bem-sucedida",
  ],
} as const;

/**
 * PATTERN #4: Filtros customizados
 * 
 * Use filters para adicionar dropdowns/inputs de filtro no toolbar.
 */
export const PATTERN_FILTERS = {
  pattern: "Advanced filters with types",
  
  example: `
    const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
    
    const studentFilters: DataTableFilter[] = [
      {
        id: "status",
        label: "Status",
        type: "select",
        options: [
          { label: "Todos", value: "" },
          { label: "Ativo", value: "active" },
          { label: "Inativo", value: "inactive" },
          { label: "Arquivado", value: "archived" },
        ],
        defaultValue: "",
      },
      {
        id: "class",
        label: "Turma",
        type: "multi-select",
        options: classes.map(c => ({ label: c.name, value: c.id })),
      },
      {
        id: "score",
        label: "Pontuação",
        type: "number-range",
        placeholder: "Min - Max",
      },
      {
        id: "registrationDate",
        label: "Data de cadastro",
        type: "date-range",
      },
    ];
    
    // Aplicar filtros nos dados
    const filteredStudents = useMemo(() => {
      let result = students;
      
      if (activeFilters.status) {
        result = result.filter(s => s.status === activeFilters.status);
      }
      
      if (activeFilters.class?.length > 0) {
        result = result.filter(s => activeFilters.class.includes(s.classId));
      }
      
      if (activeFilters.score) {
        const [min, max] = activeFilters.score;
        result = result.filter(s => s.score >= min && s.score <= max);
      }
      
      return result;
    }, [students, activeFilters]);
    
    <DataTable
      data={filteredStudents}
      columns={studentColumns}
      filters={studentFilters}
      activeFilters={activeFilters}
      onFilterChange={setActiveFilters}
      emptyFilteredMessage="Nenhum aluno encontrado com esses filtros"
    />
  `,
  
  notes: [
    "type determina UI: select, multi-select, date-range, number-range, text",
    "activeFilters é objeto { filterId: value }",
    "Você controla lógica de filtragem (DataTable apenas UI)",
  ],
} as const;

/**
 * PATTERN #5: Busca com debounce
 * 
 * Use onSearch com debounce para evitar re-renders excessivos.
 */
export const PATTERN_SEARCH = {
  pattern: "Search with debouncing",
  
  example: `
    import { useDebouncedCallback } from "use-debounce";
    
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");
    
    const handleSearch = useDebouncedCallback((query: string) => {
      setDebouncedQuery(query);
    }, 300); // 300ms debounce
    
    const filteredStudents = useMemo(() => {
      if (!debouncedQuery) return students;
      
      const lower = debouncedQuery.toLowerCase();
      return students.filter(
        s =>
          s.name.toLowerCase().includes(lower) ||
          s.email.toLowerCase().includes(lower)
      );
    }, [students, debouncedQuery]);
    
    <DataTable
      data={filteredStudents}
      columns={studentColumns}
      searchable
      searchValue={searchQuery}
      searchPlaceholder="Buscar por nome ou e-mail..."
      onSearch={(query) => {
        setSearchQuery(query); // Atualiza input imediatamente
        handleSearch(query); // Debounced
      }}
    />
  `,
  
  rationale: "Evita lag em listas grandes (>100 items)",
  alternative: "use-debounce ou lodash.debounce",
} as const;

/**
 * PATTERN #6: Loading e estados vazios
 * 
 * Use loading, error e emptyMessage para UX completa.
 */
export const PATTERN_LOADING_STATES = {
  pattern: "Complete loading and empty states",
  
  example: `
    const { data: students, isLoading, error, refetch } = useQuery({
      queryKey: ["students"],
      queryFn: fetchStudents,
    });
    
    <DataTable
      data={students ?? []}
      columns={studentColumns}
      loading={isLoading}
      error={error?.message}
      onRetry={refetch}
      emptyMessage="Nenhum aluno cadastrado ainda"
      emptyFilteredMessage="Nenhum aluno encontrado com esses filtros"
    />
  `,
  
  states: {
    loading: "Mostra skeleton de 5 linhas",
    error: "Mostra mensagem de erro + botão 'Tentar novamente'",
    empty: "Mostra ilustração + mensagem customizada",
    emptyFiltered: "Mostra mensagem diferente quando há filtros ativos",
  },
} as const;

// ============================================================================
// 3. RESTRIÇÕES TÉCNICAS
// ============================================================================

/**
 * CONSTRAINT #1: Performance com listas grandes
 * 
 * DataTable é otimizado para até 1000 linhas sem virtualização.
 * Acima disso, considere virtualização ou paginação server-side.
 */
export const CONSTRAINT_PERFORMANCE_LIMITS = {
  constraint: "Performance degrades with >1000 rows",
  
  benchmarks: {
    "100 rows": "60 FPS, <10ms render",
    "500 rows": "45 FPS, ~20ms render",
    "1000 rows": "25 FPS, ~40ms render (limite aceitável)",
    "5000 rows": "5 FPS, 200ms render (lag visível)",
  },
  
  solutions: [
    {
      name: "Paginação client-side",
      code: `
        <DataTable
          data={allStudents} // 5000 itens
          columns={studentColumns}
          pagination
          pageSize={50} // Apenas 50 renderizados por vez
        />
      `,
      impact: "Reduz de 5000 → 50 itens renderizados (100x mais rápido)",
    },
    {
      name: "Paginação server-side",
      code: `
        const [page, setPage] = useState(1);
        const { data } = useQuery({
          queryKey: ["students", page],
          queryFn: () => fetchStudents({ page, limit: 50 }),
        });
        
        <DataTable
          data={data.students} // Apenas 50 itens
          totalItems={data.total} // 5000
          page={page}
          onPageChange={setPage}
        />
      `,
      impact: "Apenas 50 itens no DOM, fetch incremental",
    },
    {
      name: "Virtualização com TanStack Virtual",
      code: `
        import { useVirtualizer } from "@tanstack/react-virtual";
        
        // Implementar wrapper de DataTable com virtualização
        <VirtualizedDataTable data={allStudents} />
      `,
      impact: "Renderiza apenas linhas visíveis (~20), suporta 10k+ items",
      complexity: "Alta — apenas se realmente necessário",
    },
  ],
  
  recommendation: "Paginação é suficiente para 99% dos casos",
} as const;

/**
 * CONSTRAINT #2: Generics type safety
 * 
 * DataTable é genérico: DataTable<T>.
 * Columns devem ser tipadas com mesmo T para type safety.
 */
export const CONSTRAINT_GENERIC_TYPES = {
  constraint: "Must use consistent generic type",
  
  correct: `
    interface Student {
      id: string;
      name: string;
      email: string;
      score: number;
    }
    
    const columns: DataTableColumn<Student>[] = [
      {
        id: "name",
        accessorKey: "name", // ✅ Type-safe: "name" ∈ keyof Student
        cell: (value, row) => {
          // ✅ row é Student (type-safe)
          return <span>{row.name}</span>;
        },
      },
    ];
    
    <DataTable<Student> data={students} columns={columns} />
  `,
  
  incorrect: `
    const columns: DataTableColumn<any>[] = [ // ❌ Perde type safety
      {
        id: "name",
        accessorKey: "nome", // ❌ Sem erro, mas campo não existe
        cell: (value, row) => {
          return <span>{row.nonExistentField}</span>; // ❌ Sem erro TS
        },
      },
    ];
  `,
  
  guideline: "Sempre forneça tipo genérico explícito",
} as const;

/**
 * CONSTRAINT #3: Callback stability
 * 
 * Callbacks (onSort, onPageChange, etc.) devem ser estáveis (useCallback).
 */
export const CONSTRAINT_CALLBACK_STABILITY = {
  constraint: "Callbacks should be stable (useCallback)",
  
  rationale: "Evita re-criação desnecessária de tabela",
  
  example: `
    // ✅ Callback estável
    const handleSort = useCallback((column: string, order: "asc" | "desc") => {
      setSortBy(column);
      setSortOrder(order);
    }, []); // Sem dependências (setState é estável)
    
    const handlePageChange = useCallback((page: number) => {
      setPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    
    <DataTable
      data={students}
      columns={studentColumns}
      onSort={handleSort}
      onPageChange={handlePageChange}
    />
  `,
  
  incorrect: `
    // ❌ Callback criado a cada render
    <DataTable
      data={students}
      columns={studentColumns}
      onSort={(column, order) => {
        setSortBy(column);
        setSortOrder(order);
      }}
    />
    // Causa: Table re-cria instância TanStack a cada render
  `,
} as const;

// ============================================================================
// 4. TESTES OBRIGATÓRIOS
// ============================================================================

export const REQUIRED_TESTS = {
  rendering: [
    {
      name: "Renderiza colunas corretamente",
      test: `
        render(<DataTable data={mockData} columns={mockColumns} />);
        expect(screen.getByText("Nome")).toBeInTheDocument();
        expect(screen.getByText("E-mail")).toBeInTheDocument();
      `,
    },
    {
      name: "Renderiza dados corretamente",
      test: `
        render(<DataTable data={mockStudents} columns={studentColumns} />);
        expect(screen.getByText("Alice Silva")).toBeInTheDocument();
        expect(screen.getByText("alice@example.com")).toBeInTheDocument();
      `,
    },
  ],
  
  interaction: [
    {
      name: "Ordenação ao clicar em header",
      test: `
        const onSort = vi.fn();
        render(<DataTable data={mockData} columns={mockColumns} onSort={onSort} />);
        
        await userEvent.click(screen.getByText("Nome"));
        expect(onSort).toHaveBeenCalledWith("name", "asc");
        
        await userEvent.click(screen.getByText("Nome"));
        expect(onSort).toHaveBeenCalledWith("name", "desc");
      `,
    },
    {
      name: "Seleção de linhas",
      test: `
        const onSelectionChange = vi.fn();
        render(
          <DataTable
            data={mockData}
            columns={mockColumns}
            selectable
            onSelectionChange={onSelectionChange}
          />
        );
        
        await userEvent.click(screen.getAllByRole("checkbox")[1]); // Primeira linha
        expect(onSelectionChange).toHaveBeenCalledWith(new Set(["1"]));
      `,
    },
    {
      name: "Mudança de página",
      test: `
        const onPageChange = vi.fn();
        render(
          <DataTable
            data={mockData}
            columns={mockColumns}
            pagination
            page={1}
            totalItems={100}
            onPageChange={onPageChange}
          />
        );
        
        await userEvent.click(screen.getByLabelText("Próxima página"));
        expect(onPageChange).toHaveBeenCalledWith(2);
      `,
    },
  ],
  
  accessibility: [
    {
      name: "Table tem role correto",
      test: `
        render(<DataTable data={mockData} columns={mockColumns} />);
        expect(screen.getByRole("table")).toBeInTheDocument();
      `,
    },
    {
      name: "Headers sorteáveis têm aria-sort",
      test: `
        render(
          <DataTable
            data={mockData}
            columns={mockColumns}
            sortBy="name"
            sortOrder="asc"
          />
        );
        const nameHeader = screen.getByText("Nome").closest("th");
        expect(nameHeader).toHaveAttribute("aria-sort", "ascending");
      `,
    },
    {
      name: "Linhas selecionadas têm aria-selected",
      test: `
        render(
          <DataTable
            data={mockData}
            columns={mockColumns}
            selectable
            selectedRows={new Set(["1"])}
          />
        );
        const firstRow = screen.getAllByRole("row")[1]; // Pula header row
        expect(firstRow).toHaveAttribute("aria-selected", "true");
      `,
    },
  ],
  
  states: [
    {
      name: "Mostra skeleton quando loading",
      test: `
        render(<DataTable data={[]} columns={mockColumns} loading />);
        expect(screen.getAllByTestId("skeleton-row")).toHaveLength(5);
      `,
    },
    {
      name: "Mostra erro com botão retry",
      test: `
        const onRetry = vi.fn();
        render(
          <DataTable
            data={[]}
            columns={mockColumns}
            error="Erro ao carregar"
            onRetry={onRetry}
          />
        );
        expect(screen.getByText("Erro ao carregar")).toBeInTheDocument();
        await userEvent.click(screen.getByText("Tentar novamente"));
        expect(onRetry).toHaveBeenCalled();
      `,
    },
    {
      name: "Mostra mensagem vazia quando data.length === 0",
      test: `
        render(
          <DataTable
            data={[]}
            columns={mockColumns}
            emptyMessage="Sem dados"
          />
        );
        expect(screen.getByText("Sem dados")).toBeInTheDocument();
      `,
    },
  ],
} as const;

// ============================================================================
// 5. CHECKLIST DE REVISÃO DE CÓDIGO
// ============================================================================

export const CODE_REVIEW_CHECKLIST = [
  {
    category: "Data Management",
    checks: [
      "✅ Data é tratado como imutável (map/filter, não push/sort)",
      "✅ getRowId fornecido se dados não têm campo 'id'",
      "✅ getRowId não usa índice do array",
      "✅ Columns memoizadas com useMemo",
    ],
  },
  {
    category: "State Control",
    checks: [
      "✅ Controlled props têm onChange correspondente",
      "✅ Não há state parcialmente controlled",
      "✅ Callbacks memoizados com useCallback",
    ],
  },
  {
    category: "Performance",
    checks: [
      "✅ Paginação habilitada para listas >500 itens",
      "✅ Busca usa debounce (300ms)",
      "✅ Cell customizadas não têm lógica pesada",
    ],
  },
  {
    category: "Acessibilidade",
    checks: [
      "✅ Table tem role='table'",
      "✅ Headers sorteáveis têm aria-sort",
      "✅ Linhas selecionadas têm aria-selected",
      "✅ Navegação por teclado funciona (Tab, Space, Enter)",
    ],
  },
  {
    category: "UX",
    checks: [
      "✅ Loading state mostra skeleton",
      "✅ Error state tem botão de retry",
      "✅ Empty state tem mensagem clara",
      "✅ Bulk actions têm confirmação para ações destrutivas",
    ],
  },
] as const;

// ============================================================================
// EXPORT ALL RULES
// ============================================================================

export const DATATABLE_CONTRACT = {
  version: "1.0.0",
  component: "DataTable",
  atomicLevel: "Organismo",
  
  rules: {
    must: [
      RULE_IMMUTABLE_DATA,
      RULE_GET_ROW_ID,
      RULE_CONTROLLED_UNCONTROLLED,
      RULE_MEMOIZE_COLUMNS,
    ],
    mustNot: [
      RULE_NO_INDEX_AS_ID,
      RULE_PAGINATION_RESPONSIBILITY,
    ],
  },
  
  patterns: [
    PATTERN_CUSTOM_CELL,
    PATTERN_ROW_ACTIONS,
    PATTERN_BULK_ACTIONS,
    PATTERN_FILTERS,
    PATTERN_SEARCH,
    PATTERN_LOADING_STATES,
  ],
  
  constraints: [
    CONSTRAINT_PERFORMANCE_LIMITS,
    CONSTRAINT_GENERIC_TYPES,
    CONSTRAINT_CALLBACK_STABILITY,
  ],
  
  tests: REQUIRED_TESTS,
  checklist: CODE_REVIEW_CHECKLIST,
} as const;
