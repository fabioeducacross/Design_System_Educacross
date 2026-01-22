/**
 * API CONTRACT: FormField Component
 * 
 * Este contrato define as regras de uso obrigatórias do FormField.
 * Violações podem causar bugs de acessibilidade, validação incorreta ou UX ruim.
 * 
 * @component FormField (Molécula)
 * @category Forms
 * @atomic-level Molécula (Label + Input + Helper/Error)
 */

// ============================================================================
// 1. REGRAS OBRIGATÓRIAS (MUST / MUST NOT)
// ============================================================================

/**
 * ✅ MUST #1: Label sempre presente e legível
 * 
 * Todos os campos devem ter label visível (não apenas placeholder).
 * Placeholders não substituem labels por questões de acessibilidade.
 */
export const RULE_LABEL_REQUIRED = {
  rule: "MUST provide visible label",
  rationale: "WCAG 2.1 AA requer labels para leitores de tela",
  
  // ✅ VÁLIDO
  valid: `
    <FormField label="E-mail">
      <Input type="email" placeholder="seu@email.com" />
    </FormField>
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    <FormField label="">
      <Input type="email" placeholder="E-mail" />
    </FormField>
    
    // Placeholder NÃO substitui label
  `,
  
  automation: {
    test: "expect(screen.getByText('E-mail')).toBeInTheDocument()",
    lint: "eslint-plugin-jsx-a11y/label-has-associated-control",
  },
} as const;

/**
 * ✅ MUST #2: Asterisco para campos obrigatórios
 * 
 * Use a prop `required` para adicionar asterisco (*) automaticamente.
 * Não adicione asterisco manualmente no texto do label.
 */
export const RULE_REQUIRED_INDICATOR = {
  rule: "MUST use required prop, not manual asterisk",
  rationale: "Consistência visual + aria-required correto",
  
  // ✅ VÁLIDO
  valid: `
    <FormField label="Nome completo" required>
      <Input />
    </FormField>
    // Renderiza: "Nome completo *" + aria-required="true"
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    <FormField label="Nome completo *">
      <Input />
    </FormField>
    // Falta aria-required, asterisco duplicado se houver prop required
  `,
  
  automation: {
    test: "expect(input).toHaveAttribute('aria-required', 'true')",
  },
} as const;

/**
 * ✅ MUST #3: Erro tem prioridade sobre helperText
 * 
 * Quando há erro, helperText é ocultado (apenas 1 mensagem por vez).
 */
export const RULE_ERROR_PRIORITY = {
  rule: "MUST show error instead of helperText when present",
  rationale: "Evita confusão, usuário vê o problema primeiro",
  
  // ✅ VÁLIDO
  valid: `
    <FormField
      label="Senha"
      error={errors.password?.message}
      helperText="Mínimo 8 caracteres"
    >
      <Input type="password" />
    </FormField>
    // Se errors.password existe, helperText não aparece
  `,
  
  // ❌ INVÁLIDO (design, não código)
  invalid: `
    // Nunca exibir erro E helper simultaneamente
    // (violação de UX, não validável via code)
  `,
  
  implementation: `
    const messageId = error ? errorId : helperTextId;
    const message = error || helperText;
    // Apenas 1 mensagem renderizada
  `,
} as const;

/**
 * ✅ MUST #4: Children deve ser elemento único de input
 * 
 * FormField aceita apenas 1 filho (Input, Textarea, Select, etc.).
 * Não aceita múltiplos elementos ou texto puro.
 */
export const RULE_SINGLE_CHILD = {
  rule: "MUST provide single input-like element as child",
  rationale: "Associação label-input requer 1:1 relationship",
  
  // ✅ VÁLIDO
  valid: `
    <FormField label="Bio">
      <Textarea rows={4} />
    </FormField>
    
    <FormField label="País">
      <Select options={countries} />
    </FormField>
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    <FormField label="Nome e Sobrenome">
      <Input placeholder="Nome" />
      <Input placeholder="Sobrenome" />
    </FormField>
    // Múltiplos inputs = quebra aria-labelledby
    
    <FormField label="Aceito">
      Concordo com os termos
    </FormField>
    // Texto puro não é input (use Checkbox)
  `,
  
  automation: {
    test: "expect(React.Children.count(children)).toBe(1)",
    runtime: "if (React.Children.count(children) !== 1) throw Error(...)",
  },
} as const;

/**
 * ⛔ MUST NOT #5: Não use FormField para Checkbox/Radio
 * 
 * Checkbox e Radio têm anatomia diferente (label APÓS input).
 * Use componentes específicos, não FormField.
 */
export const RULE_NO_CHECKBOX_RADIO = {
  rule: "MUST NOT wrap Checkbox/Radio in FormField",
  rationale: "Checkbox/Radio têm label inline, não vertical",
  
  // ✅ VÁLIDO
  valid: `
    <Checkbox label="Aceito os termos" />
    <Radio label="Opção A" name="choice" />
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    <FormField label="Aceito os termos">
      <Checkbox />
    </FormField>
    // Label duplicado, layout incorreto
  `,
  
  alternative: "Use Checkbox/Radio standalone ou FieldGroup para múltiplos",
} as const;

/**
 * ⛔ MUST NOT #6: Não altere props do input filho manualmente
 * 
 * FormField injeta props automaticamente (id, aria-*).
 * Não sobrescreva essas props no children.
 */
export const RULE_NO_OVERRIDE_INJECTED_PROPS = {
  rule: "MUST NOT override injected props (id, aria-*)",
  rationale: "Quebra acessibilidade e associação label-input",
  
  // ✅ VÁLIDO
  valid: `
    <FormField label="E-mail" id="user-email">
      <Input type="email" placeholder="seu@email.com" />
    </FormField>
    // Input recebe id="user-email" automaticamente
  `,
  
  // ❌ INVÁLIDO
  invalid: `
    <FormField label="E-mail" id="user-email">
      <Input id="custom-id" type="email" />
    </FormField>
    // id duplicado/conflitante, label perde associação
  `,
  
  implementation: `
    // FormField usa cloneElement para injetar props
    const enhancedChild = React.cloneElement(children, {
      id: fieldId,
      "aria-invalid": hasError,
      "aria-describedby": messageId,
      ...children.props, // props originais têm prioridade EXCETO as injetadas
    });
  `,
} as const;

// ============================================================================
// 2. PADRÕES DE COMPOSIÇÃO
// ============================================================================

/**
 * PATTERN #1: Integração com React Hook Form
 * 
 * Padrão recomendado: register() do RHF no input filho.
 */
export const PATTERN_REACT_HOOK_FORM = {
  pattern: "React Hook Form integration",
  
  example: `
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { z } from "zod";
    
    const schema = z.object({
      email: z.string().email("E-mail inválido"),
      password: z.string().min(8, "Mínimo 8 caracteres"),
    });
    
    type FormData = z.infer<typeof schema>;
    
    function LoginForm() {
      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(schema),
      });
      
      return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormField
            label="E-mail"
            required
            error={errors.email?.message}
          >
            <Input type="email" {...register("email")} />
          </FormField>
          
          <FormField
            label="Senha"
            required
            error={errors.password?.message}
            helperText="Use letras, números e símbolos"
          >
            <Input type="password" {...register("password")} />
          </FormField>
          
          <Button type="submit">Entrar</Button>
        </form>
      );
    }
  `,
  
  benefits: [
    "Validação automática via Zod",
    "Type safety completo (FormData)",
    "Erros já formatados (errors.field.message)",
    "Performance otimizada (minimal re-renders)",
  ],
} as const;

/**
 * PATTERN #2: Validação assíncrona com loading
 * 
 * Use prop `loading` durante validações async (ex: check de e-mail duplicado).
 */
export const PATTERN_ASYNC_VALIDATION = {
  pattern: "Async validation with loading state",
  
  example: `
    function SignupForm() {
      const [emailLoading, setEmailLoading] = useState(false);
      const [emailError, setEmailError] = useState<string>();
      
      const validateEmail = async (email: string) => {
        setEmailLoading(true);
        setEmailError(undefined);
        
        try {
          const response = await fetch(\`/api/check-email?email=\${email}\`);
          const data = await response.json();
          
          if (data.exists) {
            setEmailError("E-mail já cadastrado");
          }
        } catch {
          setEmailError("Erro ao validar e-mail");
        } finally {
          setEmailLoading(false);
        }
      };
      
      return (
        <FormField
          label="E-mail"
          required
          loading={emailLoading}
          error={emailError}
          helperText="Usaremos para recuperação de senha"
        >
          <Input
            type="email"
            onBlur={(e) => validateEmail(e.target.value)}
          />
        </FormField>
      );
    }
  `,
  
  notes: [
    "loading=true desabilita input automaticamente",
    "Spinner aparece ao lado do label",
    "error sobrescreve helperText quando validação falha",
  ],
} as const;

/**
 * PATTERN #3: Layout horizontal (desktop)
 * 
 * Use layout="horizontal" para formulários em grid (ex: filtros).
 */
export const PATTERN_HORIZONTAL_LAYOUT = {
  pattern: "Horizontal layout for inline forms",
  
  example: `
    <div className="grid grid-cols-3 gap-4">
      <FormField label="Data início" layout="horizontal" size="sm">
        <Input type="date" />
      </FormField>
      
      <FormField label="Data fim" layout="horizontal" size="sm">
        <Input type="date" />
      </FormField>
      
      <FormField label="Status" layout="horizontal" size="sm">
        <Select options={statusOptions} />
      </FormField>
    </div>
  `,
  
  css: `
    // Layout horizontal usa CSS Grid:
    .form-field[data-layout="horizontal"] {
      display: grid;
      grid-template-columns: 120px 1fr; // Label fixo, input flexível
      gap: 1rem;
      align-items: center;
    }
  `,
  
  responsive: "Considere layout='vertical' em mobile (<640px)",
} as const;

/**
 * PATTERN #4: Tamanhos consistentes
 * 
 * Mantenha size consistente em formulários relacionados.
 */
export const PATTERN_SIZE_CONSISTENCY = {
  pattern: "Consistent sizing across related fields",
  
  example: `
    // ✅ BOM: Todos os campos no mesmo tamanho
    <div className="space-y-4">
      <FormField label="Nome" size="md">
        <Input />
      </FormField>
      <FormField label="E-mail" size="md">
        <Input type="email" />
      </FormField>
      <FormField label="Telefone" size="md">
        <Input type="tel" />
      </FormField>
    </div>
    
    // ⚠️ ATENÇÃO: Tamanhos diferentes podem confundir
    <FormField label="Busca principal" size="lg">
      <Input />
    </FormField>
    <FormField label="Filtro secundário" size="sm">
      <Input />
    </FormField>
    // OK apenas se hierarquia visual for intencional
  `,
  
  guidelines: {
    sm: "Filtros, toolbars, campos compactos (h-8)",
    md: "Formulários padrão (h-10) — MAIS COMUM",
    lg: "Campos de destaque, landing pages (h-12)",
  },
} as const;

// ============================================================================
// 3. RESTRIÇÕES TÉCNICAS
// ============================================================================

/**
 * CONSTRAINT #1: ID gerado automaticamente
 * 
 * Se não fornecer `id`, FormField gera automaticamente (useId hook).
 */
export const CONSTRAINT_AUTO_ID = {
  constraint: "Auto-generated IDs if not provided",
  
  behavior: `
    const autoId = React.useId(); // Ex: ":r1:"
    const fieldId = id || \`field-\${autoId}\`; // "field-:r1:"
    const helperTextId = \`\${fieldId}-helper\`;
    const errorId = \`\${fieldId}-error\`;
  `,
  
  implication: "IDs podem mudar entre renders se não fornecido explicitamente",
  recommendation: "Forneça id estável para testes e debugging",
} as const;

/**
 * CONSTRAINT #2: cloneElement limitations
 * 
 * Children deve ser ReactElement válido (não Fragment, string, null).
 */
export const CONSTRAINT_CLONE_ELEMENT = {
  constraint: "Children must be single ReactElement",
  
  typescript: `
    interface FormFieldProps {
      children: ReactElement; // ❌ não ReactNode (muito amplo)
    }
  `,
  
  validation: `
    if (!React.isValidElement(children)) {
      throw new Error(
        "FormField children must be a single React element (Input, Textarea, etc.)"
      );
    }
  `,
  
  edge_cases: [
    "Fragment (<>...</>) não funciona (não é ReactElement)",
    "Null/undefined children causam erro",
    "String/number não aceitos (não são input)",
  ],
} as const;

/**
 * CONSTRAINT #3: Props injection order
 * 
 * Props injetadas têm prioridade BAIXA (children.props sobrescreve).
 */
export const CONSTRAINT_PROPS_PRECEDENCE = {
  constraint: "Injected props are overridable (except id, aria-*)",
  
  merge_strategy: `
    React.cloneElement(children, {
      // 1. Props injetadas (baixa prioridade)
      id: fieldId,
      "aria-invalid": hasError,
      "aria-describedby": messageId,
      "aria-required": required,
      disabled: disabled || loading,
      
      // 2. Props originais do children (alta prioridade)
      ...children.props,
      
      // 3. Props críticas (força sobrescrita)
      id: fieldId, // sempre força o ID correto
      "aria-invalid": hasError, // sempre força estado de erro
    });
  `,
  
  rationale: "Permite customização mas garante acessibilidade",
} as const;

// ============================================================================
// 4. TESTES OBRIGATÓRIOS
// ============================================================================

export const REQUIRED_TESTS = {
  accessibility: [
    {
      name: "Label associado ao input via htmlFor",
      test: `
        render(<FormField label="Nome"><Input /></FormField>);
        const input = screen.getByRole("textbox");
        const label = screen.getByText("Nome");
        expect(label).toHaveAttribute("for", input.id);
      `,
    },
    {
      name: "aria-required quando required=true",
      test: `
        render(<FormField label="E-mail" required><Input /></FormField>);
        expect(screen.getByRole("textbox")).toHaveAttribute("aria-required", "true");
      `,
    },
    {
      name: "aria-invalid quando há erro",
      test: `
        render(<FormField label="Senha" error="Muito curta"><Input /></FormField>);
        expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
      `,
    },
    {
      name: "aria-describedby aponta para mensagem",
      test: `
        render(<FormField label="Bio" helperText="Máximo 200 caracteres"><Input /></FormField>);
        const input = screen.getByRole("textbox");
        const helper = screen.getByText("Máximo 200 caracteres");
        expect(input).toHaveAttribute("aria-describedby", helper.id);
      `,
    },
    {
      name: "Erro tem role='alert' para screen readers",
      test: `
        render(<FormField label="CPF" error="CPF inválido"><Input /></FormField>);
        expect(screen.getByRole("alert")).toHaveTextContent("CPF inválido");
      `,
    },
  ],
  
  interaction: [
    {
      name: "Disabled propaga para input filho",
      test: `
        render(<FormField label="Nome" disabled><Input /></FormField>);
        expect(screen.getByRole("textbox")).toBeDisabled();
      `,
    },
    {
      name: "Loading desabilita input e mostra spinner",
      test: `
        render(<FormField label="E-mail" loading><Input /></FormField>);
        expect(screen.getByRole("textbox")).toBeDisabled();
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
      `,
    },
  ],
  
  visual: [
    {
      name: "Size altera classes CSS",
      test: `
        const { rerender } = render(<FormField label="Teste" size="sm"><Input /></FormField>);
        expect(screen.getByTestId("form-field")).toHaveClass("form-field-sm");
        
        rerender(<FormField label="Teste" size="lg"><Input /></FormField>);
        expect(screen.getByTestId("form-field")).toHaveClass("form-field-lg");
      `,
    },
    {
      name: "Layout horizontal aplica grid",
      test: `
        render(<FormField label="Filtro" layout="horizontal"><Input /></FormField>);
        expect(screen.getByTestId("form-field")).toHaveClass("grid");
      `,
    },
  ],
} as const;

// ============================================================================
// 5. EXEMPLOS COMPLETOS (DO/DON'T)
// ============================================================================

export const COMPLETE_EXAMPLES = {
  // ✅ EXEMPLO BOM: Formulário de login completo
  good_login_form: `
    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import { z } from "zod";
    
    const loginSchema = z.object({
      email: z.string().email("E-mail inválido"),
      password: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    });
    
    type LoginData = z.infer<typeof loginSchema>;
    
    export function LoginForm() {
      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
      });
      
      const onSubmit = async (data: LoginData) => {
        await fetch("/api/login", {
          method: "POST",
          body: JSON.stringify(data),
        });
      };
      
      return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            label="E-mail"
            required
            error={errors.email?.message}
            helperText="Usaremos para autenticação"
          >
            <Input
              type="email"
              autoComplete="email"
              {...register("email")}
            />
          </FormField>
          
          <FormField
            label="Senha"
            required
            error={errors.password?.message}
            helperText="Mínimo 8 caracteres"
          >
            <Input
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />
          </FormField>
          
          <Button type="submit" loading={isSubmitting} fullWidth>
            Entrar
          </Button>
        </form>
      );
    }
  `,
  
  // ❌ EXEMPLO RUIM: Violações múltiplas
  bad_form: `
    // ❌ PROBLEMA 1: Label vazio (só placeholder)
    <FormField label="">
      <Input placeholder="Digite seu nome" />
    </FormField>
    
    // ❌ PROBLEMA 2: Asterisco manual no label
    <FormField label="E-mail *">
      <Input type="email" />
    </FormField>
    
    // ❌ PROBLEMA 3: Múltiplos inputs (quebra label association)
    <FormField label="Nome completo">
      <Input placeholder="Nome" />
      <Input placeholder="Sobrenome" />
    </FormField>
    
    // ❌ PROBLEMA 4: Checkbox em FormField (anatomia incorreta)
    <FormField label="Aceito os termos">
      <Checkbox />
    </FormField>
    
    // ❌ PROBLEMA 5: ID manual conflitante
    <FormField label="CPF" id="user-cpf">
      <Input id="custom-cpf" /> {/* ID duplicado/conflitante */}
    </FormField>
    
    // ❌ PROBLEMA 6: Tamanhos inconsistentes sem razão
    <FormField label="Nome" size="lg"><Input /></FormField>
    <FormField label="E-mail" size="sm"><Input /></FormField>
    <FormField label="Telefone" size="md"><Input /></FormField>
  `,
  
  // ✅ CORRIGIDO:
  good_corrected: `
    // ✅ Label visível sempre
    <FormField label="Nome completo">
      <Input placeholder="Digite seu nome" />
    </FormField>
    
    // ✅ Prop required (não asterisco manual)
    <FormField label="E-mail" required>
      <Input type="email" />
    </FormField>
    
    // ✅ Campos separados para múltiplos inputs
    <div className="grid grid-cols-2 gap-4">
      <FormField label="Nome">
        <Input />
      </FormField>
      <FormField label="Sobrenome">
        <Input />
      </FormField>
    </div>
    
    // ✅ Checkbox standalone (não em FormField)
    <Checkbox label="Aceito os termos" />
    
    // ✅ ID apenas no FormField (propaga automaticamente)
    <FormField label="CPF" id="user-cpf">
      <Input /> {/* Recebe id="user-cpf" via cloneElement */}
    </FormField>
    
    // ✅ Tamanho consistente
    <div className="space-y-4">
      <FormField label="Nome" size="md"><Input /></FormField>
      <FormField label="E-mail" size="md"><Input /></FormField>
      <FormField label="Telefone" size="md"><Input /></FormField>
    </div>
  `,
} as const;

// ============================================================================
// 6. CHECKLIST DE REVISÃO DE CÓDIGO
// ============================================================================

export const CODE_REVIEW_CHECKLIST = [
  {
    category: "Acessibilidade",
    checks: [
      "✅ Todos os FormField têm label não-vazio",
      "✅ Campos obrigatórios usam prop required (não asterisco manual)",
      "✅ Erros são exibidos com role='alert'",
      "✅ aria-describedby aponta para helper/error correto",
      "✅ aria-invalid presente quando há erro",
      "✅ IDs únicos e estáveis (não conflitam)",
    ],
  },
  {
    category: "Composição",
    checks: [
      "✅ FormField tem exatamente 1 filho (Input, Textarea, Select)",
      "✅ Checkbox/Radio NÃO estão em FormField",
      "✅ Props não são sobrescritas manualmente no children",
      "✅ cloneElement não recebe Fragment ou null",
    ],
  },
  {
    category: "Validação",
    checks: [
      "✅ Integração com React Hook Form usa register()",
      "✅ Erros vêm de formState.errors (não estado local desnecessário)",
      "✅ Validação assíncrona usa loading=true durante fetch",
      "✅ helperText oculto quando há erro (prioridade correta)",
    ],
  },
  {
    category: "Visual/UX",
    checks: [
      "✅ Tamanhos consistentes em formulários relacionados",
      "✅ Layout horizontal apenas em filtros/grids (não em forms principais)",
      "✅ Disabled propagado corretamente para input",
      "✅ Loading mostra spinner e desabilita input",
    ],
  },
] as const;

// ============================================================================
// 7. MIGRATION GUIDE (se houver componente legado)
// ============================================================================

export const MIGRATION_GUIDE = {
  from_label_input_separate: {
    before: `
      <Label htmlFor="email">E-mail</Label>
      <Input id="email" type="email" />
      {errors.email && <span className="text-destructive">{errors.email}</span>}
    `,
    after: `
      <FormField label="E-mail" error={errors.email}>
        <Input type="email" />
      </FormField>
    `,
    benefits: [
      "Acessibilidade automática (aria-*)",
      "IDs gerenciados automaticamente",
      "Estilo consistente de erro",
    ],
  },
  
  from_custom_field: {
    before: `
      <div className="field-wrapper">
        <label className="field-label">Senha *</label>
        <input type="password" className="field-input" />
        <p className="field-helper">Mínimo 8 caracteres</p>
      </div>
    `,
    after: `
      <FormField label="Senha" required helperText="Mínimo 8 caracteres">
        <Input type="password" />
      </FormField>
    `,
    benefits: [
      "Remove classes manuais (usa tokens)",
      "Asterisco automático via required",
      "Anatomia padronizada",
    ],
  },
} as const;

// ============================================================================
// EXPORT ALL RULES
// ============================================================================

export const FORMFIELD_CONTRACT = {
  version: "1.0.0",
  component: "FormField",
  atomicLevel: "Molécula",
  
  rules: {
    must: [
      RULE_LABEL_REQUIRED,
      RULE_REQUIRED_INDICATOR,
      RULE_ERROR_PRIORITY,
      RULE_SINGLE_CHILD,
    ],
    mustNot: [
      RULE_NO_CHECKBOX_RADIO,
      RULE_NO_OVERRIDE_INJECTED_PROPS,
    ],
  },
  
  patterns: [
    PATTERN_REACT_HOOK_FORM,
    PATTERN_ASYNC_VALIDATION,
    PATTERN_HORIZONTAL_LAYOUT,
    PATTERN_SIZE_CONSISTENCY,
  ],
  
  constraints: [
    CONSTRAINT_AUTO_ID,
    CONSTRAINT_CLONE_ELEMENT,
    CONSTRAINT_PROPS_PRECEDENCE,
  ],
  
  tests: REQUIRED_TESTS,
  examples: COMPLETE_EXAMPLES,
  checklist: CODE_REVIEW_CHECKLIST,
  migration: MIGRATION_GUIDE,
} as const;
