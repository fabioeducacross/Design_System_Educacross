import * as React from 'react';
import * as class_variance_authority_types from 'class-variance-authority/types';
import { VariantProps } from 'class-variance-authority';
import * as FeatherIcons from 'react-feather';
export * from 'react-feather';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ClassValue } from 'clsx';

/**
 * HeaderProps - propriedades do componente Header.
 */
interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    /**
     * Nome do usuário exibido no header.
     */
    userName?: string;
    /**
     * Role/cargo do usuário.
     */
    userRole?: string;
    /**
     * URL da imagem do avatar.
     */
    avatarSrc?: string;
    /**
     * Callback quando o menu hamburger é clicado.
     */
    onMenuClick?: () => void;
    /**
     * Callback quando o perfil é clicado.
     */
    onProfileClick?: () => void;
    /**
     * Se o header tem sombra.
     * @default true
     */
    shadow?: boolean;
}
/**
 * Header - componente de cabeçalho da aplicação Educacross.
 * Usa o ícone Educacross como fallback do avatar quando não há imagem.
 *
 * @example
 * ```tsx
 * <Header
 *   userName="Afonso"
 *   userRole="Gestor de Redes"
 *   avatarSrc="/avatar.jpg"
 *   onMenuClick={() => console.log("Menu clicked")}
 * />
 * ```
 */
declare const Header: React.ForwardRefExoticComponent<HeaderProps & React.RefAttributes<HTMLElement>>;

/**
 * LogoProps - propriedades do componente Logo.
 */
interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Tamanho da logo.
     * @default "default"
     */
    size?: "sm" | "default" | "lg";
}
/**
 * Logo - componente da logo Educacross.
 *
 * @example
 * ```tsx
 * <Logo size="default" />
 * <Logo size="lg" className="my-custom-class" />
 * ```
 */
declare const Logo: React.ForwardRefExoticComponent<LogoProps & React.RefAttributes<HTMLImageElement>>;

interface AvatarIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Tamanho do ícone.
     * @default "default"
     */
    size?: "sm" | "default" | "lg";
}
/**
 * AvatarIcon - ícone padrão Educacross para usar em avatares.
 *
 * Usa o ícone SVG original do Figma com a imagem do avatar Educacross
 * embutida como data URL base64 para garantir renderização correta.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarIcon size="lg" />
 * </Avatar>
 * ```
 */
declare const AvatarIcon: React.ForwardRefExoticComponent<AvatarIconProps & React.RefAttributes<HTMLImageElement>>;

/**
 * Icon size variants.
 */
declare const iconVariants: (props?: ({
    size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "md" | null | undefined;
    variant?: "default" | "secondary" | "destructive" | "success" | "warning" | "muted" | "primary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * All available Feather icon names.
 */
type IconName = keyof typeof FeatherIcons;
/**
 * Get all available icon names for documentation.
 */
declare const iconNames: IconName[];
interface IconProps extends Omit<React.SVGAttributes<SVGElement>, "ref">, VariantProps<typeof iconVariants> {
    /**
     * The name of the Feather icon to render.
     */
    name: IconName;
    /**
     * Custom size in pixels (overrides size variant).
     */
    pixelSize?: number;
    /**
     * Stroke width for the icon.
     * @default 2
     */
    strokeWidth?: number;
}
/**
 * Icon component - wrapper for Feather Icons.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Icon name="Check" />
 *
 * // With size variant
 * <Icon name="AlertCircle" size="lg" />
 *
 * // With color variant
 * <Icon name="Heart" variant="destructive" />
 *
 * // With custom pixel size
 * <Icon name="Star" pixelSize={32} />
 *
 * // With custom stroke width
 * <Icon name="User" strokeWidth={1.5} />
 * ```
 */
declare const Icon: React.FC<IconProps>;
/**
 * Icon categories for organization.
 */
declare const iconCategories: {
    readonly arrows: IconName[];
    readonly actions: IconName[];
    readonly alerts: IconName[];
    readonly media: IconName[];
    readonly communication: IconName[];
    readonly users: IconName[];
    readonly files: IconName[];
    readonly navigation: IconName[];
    readonly settings: IconName[];
    readonly time: IconName[];
    readonly commerce: IconName[];
    readonly devices: IconName[];
    readonly social: IconName[];
};

/**
 * Variantes do Sidebar.
 */
declare const sidebarVariants: (props?: ({
    theme?: "purple" | "white" | null | undefined;
    collapsed?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * Variantes do SidebarItem.
 */
declare const sidebarItemVariants: (props?: ({
    variant?: "default" | "active" | "selected" | null | undefined;
    theme?: "purple" | "white" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Nome do ícone (do componente Icon).
     */
    icon: IconName;
    /**
     * Label do item.
     */
    label: string;
    /**
     * Variante visual.
     */
    variant?: "default" | "active" | "selected";
    /**
     * Tema de cores.
     */
    theme?: "purple" | "white";
    /**
     * Se true, mostra ícone de expansão.
     */
    expandable?: boolean;
    /**
     * Se true, o item está expandido (mostra subitens).
     */
    expanded?: boolean;
    /**
     * Callback ao clicar no item.
     */
    onClick?: () => void;
}
/**
 * Item do Sidebar.
 */
declare const SidebarItem: React.ForwardRefExoticComponent<SidebarItemProps & React.RefAttributes<HTMLDivElement>>;
interface SidebarSubItemProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Label do subitem.
     */
    label: string;
    /**
     * Se true, aplica estilo ativo.
     */
    active?: boolean;
    /**
     * Tema de cores.
     */
    theme?: "purple" | "white";
    /**
     * Callback ao clicar.
     */
    onClick?: () => void;
}
/**
 * Subitem do Sidebar (indentado).
 */
declare const SidebarSubItem: React.ForwardRefExoticComponent<SidebarSubItemProps & React.RefAttributes<HTMLDivElement>>;
interface SidebarProps extends VariantProps<typeof sidebarVariants> {
    /**
     * Itens do menu.
     */
    children: React.ReactNode;
    /**
     * Classes CSS adicionais.
     */
    className?: string;
}
/**
 * Sidebar - Menu lateral de navegação do perfil professor.
 *
 * @example
 * ```tsx
 * <Sidebar>
 *   <SidebarItem icon="Dashboard" label="Painel" variant="default" />
 *   <SidebarItem icon="Flag" label="Missões da escola" variant="selected" expandable expanded />
 *   <SidebarSubItem label="Missões arquivadas" />
 *   <SidebarItem icon="Add" label="Criar missão" variant="active" />
 * </Sidebar>
 * ```
 */
declare const Sidebar: React.ForwardRefExoticComponent<SidebarProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Categorias de ícones customizados do Educacross
 */
type IconCategory = "conhecimento" | "acao" | "menu" | "interface" | "metricas" | "social" | "usuarios" | "agrupamentos" | "gamificacao" | "idioma" | "proficiencia" | "educacao-infantil" | "lingua-portuguesa-bncc" | "lingua-portuguesa-saeb" | "lingua-portuguesa-saresp" | "lingua-portuguesa-topicos" | "matematica-bncc" | "matematica-saeb-saresp" | "matematica-avalia";
/**
 * Mapeamento de ícones por categoria
 */
declare const customIcons: {
    readonly conhecimento: readonly ["liga-corujinhas-enabled", "liga-corujinhas-disabled", "lingua-portuguesa-enabled", "lingua-portuguesa-disabled", "math-enabled", "math-disabled", "matematica-sigla-enabled", "matematica-sigla-disabled", "todas-disciplinas-enabled", "todas-disciplinas-disabled"];
    readonly acao: readonly ["badge", "delete", "edit", "ios_share", "link", "mail_lock", "person_search", "pie_chart", "social_leaderboard", "trophy", "upload_file", "visibility", "workspace_premium"];
    readonly menu: readonly ["auto_stories", "Avaliação", "camera", "download", "Eventos", "fiber_manual_record", "flag", "grid_view", "group", "groups", "how_to_reg", "map", "person_play", "pie_chart", "search", "work"];
    readonly interface: readonly ["Acesso", "Group 9555"];
    readonly metricas: readonly ["Desafios", "Dificuldade", "Jogos", "Percentual de acertos", "Pontos", "Progresso", "Tempo de Aprendizagem", "Top"];
    readonly social: readonly ["facebook", "instagram", "whatsapp", "youtube"];
    readonly usuarios: readonly ["Administrador", "Aluno", "Coordenadores", "Diretor", "Gestor de rede", "Professor"];
    readonly agrupamentos: readonly ["Ano", "Escola", "Rede", "Turmas"];
    readonly gamificacao: readonly ["Estrelas", "Insignia-Bronze", "Insignia-Ouro", "Insignia-Prata", "Moedas", "Pontos-Eventos", "Pontos-XP", "Trofeu-bronze", "Trofeu-Prata", "Troféu-Ouro"];
    readonly idioma: readonly ["brasil", "eua", "espanha"];
    readonly proficiencia: readonly ["abaixo do básico", "avançado", "básico", "não fizeram", "proficiente"];
    readonly "educacao-infantil": readonly ["Bncc-CorpoGestosMovimentos", "Bncc-EscutaFalaPensamentoImaginacao", "Bncc-EspacosTemposQuantidadesRelacoesTransformacoes", "Bncc-OEuOOutroONos", "Bncc-TracosSonsCoresFormas"];
    readonly "lingua-portuguesa-bncc": readonly ["Bncc-CampoArtisticoLiterario", "Bncc-CampodaVidaCotidiana", "Bncc-Campojornalisticomidiatico", "Bncc-CampoPraticasEstudoPesquisa", "Bncc-CampoVidaPublica", "bncc-todososcampos"];
    readonly "lingua-portuguesa-saeb": readonly ["Saeb-CoerenciasCoesaoProcessamentoTexto", "Saeb-ImplicacoesSuporteGeneroEnunciadorCompreensaoTexto", "Saeb-ProcedimentosLeitura", "Saeb-RelacaoEntreRecursosExpressivosEfeitosSentido", "Saeb-RelacaoEntreTextos", "Saeb-VariacaoLinguistica"];
    readonly "lingua-portuguesa-saresp": readonly ["Saresp-CompreensaoTextosLiterarios", "Saresp-ReconstruçãoCondicoesProducaoPercepcaoTextos", "Saresp-ReconstrucaoIntertextualiudadeRelacaoEntreTextos", "Saresp-ReconstrucaoSentidosTexto", "Saresp-ReconstrucaoTextualidade", "Saresp-ReflexaoUsosLinguaFaladaEscrita"];
    readonly "lingua-portuguesa-topicos": readonly ["Tópico-analise-linguistica", "Tópico-escrita", "Tópico-leitura-escuta", "Tópico-oralidade"];
    readonly "matematica-bncc": readonly ["bncc-álgebra", "bncc-geometria", "bncc-grandezas e medidas", "bncc-números", "bncc-probabilidade e estatística"];
    readonly "matematica-saeb-saresp": readonly ["Saeb-EspacoForma", "Saeb-grandezas e medidas", "Saeb-NumerosOperacoesAlgebraFuncoes", "Saeb-TratamentoInformacao"];
    readonly "matematica-avalia": readonly ["Avalia-AlgebrizacaoRelacao", "Avalia-EspacoForma", "Avalia-Incerteza", "Avalia-QuantidadeMedida"];
};
/**
 * Variantes do CustomIcon.
 */
declare const customIconVariants: (props?: ({
    size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | "md" | null | undefined;
    variant?: "default" | "secondary" | "destructive" | "success" | "warning" | "info" | "muted" | "primary" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CustomIconProps extends Omit<React.SVGAttributes<SVGElement>, "name">, VariantProps<typeof customIconVariants> {
    /**
     * Categoria do ícone.
     */
    category: IconCategory;
    /**
     * Nome do ícone dentro da categoria.
     */
    name: string;
    /**
     * Classes CSS adicionais.
     */
    className?: string;
}
/**
 * CustomIcon - Ícones SVG customizados do Educacross organizados por categoria.
 *
 * @example
 * ```tsx
 * <CustomIcon category="conhecimento" name="Matemática" size="lg" />
 * <CustomIcon category="usuarios" name="Professor" variant="primary" />
 * <CustomIcon category="metricas" name="Pontos" size="md" variant="success" />
 * ```
 */
declare const CustomIcon: React.ForwardRefExoticComponent<CustomIconProps & React.RefAttributes<SVGSVGElement>>;

/**
 * Button variants using class-variance-authority.
 * All visual values reference design tokens - no magic values.
 */
declare const buttonVariants: (props?: ({
    variant?: "default" | "link" | "secondary" | "attention" | "negative" | "destructive" | "outline" | "ghost" | "success" | "warning" | "info" | null | undefined;
    size?: "sm" | "default" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    /**
     * If true, the button will be rendered as a child component (Slot).
     * Useful for composition with links or other elements.
     */
    asChild?: boolean;
    /**
     * If true, shows a loading spinner and disables the button.
     */
    loading?: boolean;
}
/**
 * Button component with multiple variants, sizes, and states.
 *
 * @example
 * ```tsx
 * <Button variant="default" size="default">Click me</Button>
 * <Button variant="destructive" loading>Deleting...</Button>
 * <Button asChild>
 *   <a href="/somewhere">Link styled as button</a>
 * </Button>
 * ```
 */
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Input variants using class-variance-authority.
 * All visual values reference design tokens - no magic values.
 */
declare const inputVariants: (props?: ({
    variant?: "default" | "filled" | "error" | null | undefined;
    inputSize?: "sm" | "default" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof inputVariants> {
    /**
     * If true, applies error styling to the input.
     */
    error?: boolean;
    /**
     * Size variant for the input.
     * Named inputSize to avoid conflict with HTML size attribute.
     */
    inputSize?: "default" | "sm" | "lg";
}
/**
 * Input component with variants and states.
 *
 * @example
 * ```tsx
 * <Input placeholder="Enter your email" />
 * <Input variant="error" error aria-invalid="true" />
 * <Input inputSize="lg" />
 * ```
 */
declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;

/**
 * Label variants using class-variance-authority.
 * All visual values reference design tokens - no magic values.
 */
declare const labelVariants: (props?: ({
    variant?: "default" | "muted" | "error" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {
    /**
     * If true, shows a required indicator (*).
     */
    required?: boolean;
}
/**
 * Label component for form inputs.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Label htmlFor="password" required>Password</Label>
 * <Label variant="error">Invalid field</Label>
 * ```
 */
declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<HTMLLabelElement>>;

/**
 * Tipos de tema disponíveis.
 */
type Theme = "light" | "dark" | "system";
/**
 * Tipo do tema resolvido (light ou dark).
 */
type ResolvedTheme = "light" | "dark";
/**
 * Contexto do tema.
 */
interface ThemeContextValue {
    /** Tema atual (light, dark ou system) */
    theme: Theme;
    /** Tema resolvido (light ou dark) - útil quando theme é 'system' */
    resolvedTheme: ResolvedTheme;
    /** Função para alterar o tema */
    setTheme: (theme: Theme) => void;
    /** Alterna entre light e dark */
    toggleTheme: () => void;
}
/**
 * Hook para acessar o contexto de tema.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { theme, setTheme, toggleTheme } = useTheme();
 *   return <button onClick={toggleTheme}>Toggle</button>;
 * }
 * ```
 */
declare function useTheme(): ThemeContextValue;
interface ThemeProviderProps {
    /** Tema padrão se não houver preferência salva */
    defaultTheme?: Theme;
    /** Filhos do provider */
    children: React.ReactNode;
    /** Atributo para aplicar no documento (padrão: class) */
    attribute?: "class" | "data-theme";
    /** Desabilitar persistência no localStorage */
    disableStorage?: boolean;
    /** Desabilitar transição ao trocar tema */
    disableTransitionOnChange?: boolean;
}
/**
 * Provider de tema que gerencia o estado e aplica a classe no documento.
 *
 * @example
 * ```tsx
 * <ThemeProvider defaultTheme="system">
 *   <App />
 * </ThemeProvider>
 * ```
 */
declare function ThemeProvider({ defaultTheme, children, attribute, disableStorage, disableTransitionOnChange, }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
/**
 * Variantes do ThemeSwitcher.
 */
declare const themeSwitcherVariants: (props?: ({
    variant?: "outline" | "icon" | "filled" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ThemeSwitcherProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">, VariantProps<typeof themeSwitcherVariants> {
    /**
     * Modo de exibição do switcher.
     * - icon: botão com ícone que alterna entre sol/lua
     * - toggle: switch visual estilo iOS
     * - dropdown: dropdown com 3 opções (light, dark, system)
     */
    mode?: "icon" | "toggle" | "dropdown";
    /**
     * Rótulo acessível do botão.
     */
    label?: string;
    /**
     * Mostrar label de texto ao lado do ícone.
     */
    showLabel?: boolean;
}
/**
 * Componente ThemeSwitcher para alternar entre temas Light e Dark.
 *
 * @example
 * ```tsx
 * // Modo ícone (padrão)
 * <ThemeSwitcher />
 *
 * // Modo toggle
 * <ThemeSwitcher mode="toggle" />
 *
 * // Modo dropdown
 * <ThemeSwitcher mode="dropdown" />
 *
 * // Com label
 * <ThemeSwitcher showLabel />
 * ```
 */
declare const ThemeSwitcher: React.ForwardRefExoticComponent<ThemeSwitcherProps & React.RefAttributes<HTMLButtonElement>>;

/**
 * Card variants using class-variance-authority.
 */
declare const cardVariants: (props?: ({
    variant?: "default" | "outline" | "elevated" | "interactive" | null | undefined;
    padding?: "sm" | "default" | "lg" | "none" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
}
/**
 * Card component - a container for grouping related content.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description here</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content goes here</CardContent>
 *   <CardFooter>Footer actions</CardFooter>
 * </Card>
 * ```
 */
declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
/**
 * CardHeader - contains title and description.
 */
declare const CardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * CardTitle - the main title of the card.
 */
declare const CardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
/**
 * CardDescription - secondary text below the title.
 */
declare const CardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/**
 * CardContent - main content area of the card.
 */
declare const CardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * CardFooter - actions or secondary information.
 */
declare const CardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

/**
 * Badge variants using class-variance-authority.
 */
declare const badgeVariants: (props?: ({
    variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "softPrimary" | "softSecondary" | "softDestructive" | "softSuccess" | "softWarning" | "softInfo" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
}
/**
 * Badge component - displays a small status indicator or label.
 *
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="secondary">Draft</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="success">Active</Badge>
 * ```
 */
declare function Badge({ className, variant, size, ...props }: BadgeProps): react_jsx_runtime.JSX.Element;

/**
 * Avatar variants using class-variance-authority.
 */
declare const avatarVariants: (props?: ({
    size?: "xs" | "sm" | "default" | "lg" | "xl" | "2xl" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatarVariants> {
}
/**
 * Avatar component - displays a user's profile image or initials.
 *
 * @example
 * ```tsx
 * <Avatar>
 *   <AvatarImage src="/avatar.jpg" alt="User" />
 *   <AvatarFallback>JD</AvatarFallback>
 * </Avatar>
 * ```
 */
declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement>;
/**
 * AvatarImage - the image displayed in the avatar.
 * Não renderiza se src estiver vazio/undefined, permitindo que o Fallback apareça.
 */
declare const AvatarImage: React.ForwardRefExoticComponent<AvatarImageProps & React.RefAttributes<HTMLImageElement>>;
type AvatarFallbackProps = React.HTMLAttributes<HTMLSpanElement>;
/**
 * AvatarFallback - displayed when the image fails to load or is not provided.
 */
declare const AvatarFallback: React.ForwardRefExoticComponent<AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>>;

/**
 * Checkbox variants using class-variance-authority.
 */
declare const checkboxVariants: (props?: ({
    size?: "sm" | "default" | "lg" | null | undefined;
    variant?: "default" | "error" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">, VariantProps<typeof checkboxVariants> {
    /**
     * Label text to display next to the checkbox.
     */
    label?: string;
    /**
     * Description text below the label.
     */
    description?: string;
    /**
     * Error message to display.
     */
    error?: string;
}
/**
 * Checkbox component - a control for selecting one or more options.
 *
 * @example
 * ```tsx
 * <Checkbox label="Accept terms" />
 * <Checkbox label="Subscribe" description="Get email updates" />
 * <Checkbox checked disabled label="Selected & Disabled" />
 * ```
 */
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>>;

/**
 * Radio variants using class-variance-authority.
 */
declare const radioVariants: (props?: ({
    size?: "sm" | "default" | "lg" | null | undefined;
    variant?: "default" | "error" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The name attribute for the radio group.
     */
    name: string;
    /**
     * The controlled value of the radio group.
     */
    value?: string;
    /**
     * The default value when uncontrolled.
     */
    defaultValue?: string;
    /**
     * Callback when the value changes.
     */
    onValueChange?: (value: string) => void;
    /**
     * Whether the radio group is disabled.
     */
    disabled?: boolean;
    /**
     * Error state for the radio group.
     */
    error?: boolean;
}
/**
 * RadioGroup component - container for Radio items.
 *
 * @example
 * ```tsx
 * <RadioGroup name="plan" defaultValue="basic">
 *   <Radio value="basic" label="Basic" />
 *   <Radio value="pro" label="Pro" />
 *   <Radio value="enterprise" label="Enterprise" />
 * </RadioGroup>
 * ```
 */
declare const RadioGroup: React.ForwardRefExoticComponent<RadioGroupProps & React.RefAttributes<HTMLDivElement>>;
interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type">, VariantProps<typeof radioVariants> {
    /**
     * The value of the radio item.
     */
    value: string;
    /**
     * Label text to display next to the radio.
     */
    label?: string;
    /**
     * Description text below the label.
     */
    description?: string;
}
/**
 * Radio component - a single radio option within a RadioGroup.
 */
declare const Radio: React.ForwardRefExoticComponent<RadioProps & React.RefAttributes<HTMLInputElement>>;

/**
 * Select variants using class-variance-authority.
 */
declare const selectVariants: (props?: ({
    variant?: "default" | "primary" | "error" | null | undefined;
    size?: "sm" | "default" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size" | "children">, VariantProps<typeof selectVariants> {
    /**
     * The options for the select.
     */
    options: SelectOption[];
    /**
     * Placeholder text when no option is selected.
     */
    placeholder?: string;
    /**
     * Error message to display.
     */
    error?: string;
}
/**
 * Select component - a dropdown for selecting one option from a list.
 *
 * @example
 * ```tsx
 * <Select
 *   placeholder="Select a fruit"
 *   options={[
 *     { value: "apple", label: "Apple" },
 *     { value: "banana", label: "Banana" },
 *     { value: "orange", label: "Orange" },
 *   ]}
 * />
 * ```
 */
declare const Select: React.ForwardRefExoticComponent<SelectProps & React.RefAttributes<HTMLSelectElement>>;

/**
 * Dialog overlay variants.
 */
declare const dialogOverlayVariants: (props?: class_variance_authority_types.ClassProp | undefined) => string;
/**
 * Dialog content variants.
 */
declare const dialogContentVariants: (props?: ({
    size?: "sm" | "default" | "lg" | "xl" | "full" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface DialogProps {
    /**
     * Whether the dialog is open.
     */
    open?: boolean;
    /**
     * Default open state when uncontrolled.
     */
    defaultOpen?: boolean;
    /**
     * Callback when open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The dialog content.
     */
    children?: React.ReactNode;
}
/**
 * Dialog component - a modal window for important content.
 *
 * @example
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <Button>Open Dialog</Button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogHeader>
 *       <DialogTitle>Dialog Title</DialogTitle>
 *       <DialogDescription>Dialog description here.</DialogDescription>
 *     </DialogHeader>
 *     <div>Content goes here</div>
 *     <DialogFooter>
 *       <Button>Save</Button>
 *     </DialogFooter>
 *   </DialogContent>
 * </Dialog>
 * ```
 */
declare function Dialog({ open, defaultOpen, onOpenChange, children, }: DialogProps): react_jsx_runtime.JSX.Element;
interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Render as child element instead of button.
     */
    asChild?: boolean;
}
/**
 * DialogTrigger - opens the dialog when clicked.
 */
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * DialogPortal - renders dialog in a portal.
 */
declare function DialogPortal({ children }: {
    children: React.ReactNode;
}): react_jsx_runtime.JSX.Element | null;
/**
 * DialogOverlay - the backdrop behind the dialog.
 */
declare const DialogOverlay: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dialogContentVariants> {
}
/**
 * DialogContent - the main content container of the dialog.
 */
declare const DialogContent: React.ForwardRefExoticComponent<DialogContentProps & React.RefAttributes<HTMLDivElement>>;
/**
 * DialogHeader - container for title and description.
 */
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
/**
 * DialogFooter - container for action buttons.
 */
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): react_jsx_runtime.JSX.Element;
    displayName: string;
};
/**
 * DialogTitle - the title of the dialog.
 */
declare const DialogTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLHeadingElement>>;
/**
 * DialogDescription - secondary text describing the dialog.
 */
declare const DialogDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
/**
 * DialogClose - closes the dialog when clicked.
 */
declare const DialogClose: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;

/**
 * Alert variants using class-variance-authority.
 */
declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
}
/**
 * Alert component - displays important messages to users.
 *
 * @example
 * ```tsx
 * <Alert>
 *   <AlertTitle>Heads up!</AlertTitle>
 *   <AlertDescription>
 *     You can add components to your app using the cli.
 *   </AlertDescription>
 * </Alert>
 * ```
 */
declare const Alert: React.ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>;
/**
 * AlertTitle - the title of the alert.
 */
declare const AlertTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
/**
 * AlertDescription - the description of the alert.
 */
declare const AlertDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;

/**
 * Toast variants using class-variance-authority.
 */
declare const toastVariants: (props?: ({
    variant?: "default" | "destructive" | "success" | "warning" | "info" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
    /**
     * Whether the toast is visible.
     */
    open?: boolean;
    /**
     * Callback when the toast is closed.
     */
    onClose?: () => void;
    /**
     * Duration in milliseconds before auto-close. Set to 0 to disable.
     */
    duration?: number;
}
/**
 * Toast component - a brief notification message.
 *
 * @example
 * ```tsx
 * <Toast open={isOpen} onClose={() => setIsOpen(false)}>
 *   <ToastTitle>Success!</ToastTitle>
 *   <ToastDescription>Your changes have been saved.</ToastDescription>
 * </Toast>
 * ```
 */
declare const Toast: React.ForwardRefExoticComponent<ToastProps & React.RefAttributes<HTMLDivElement>>;
/**
 * ToastTitle - the title of the toast.
 */
declare const ToastTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * ToastDescription - the description of the toast.
 */
declare const ToastDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * ToastAction - an action button in the toast.
 */
declare const ToastAction: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;
/**
 * ToastViewport - container for positioning toasts.
 */
declare const ToastViewport: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

/**
 * Tabs list variants.
 */
declare const tabsListVariants: (props?: ({
    variant?: "default" | "outline" | "pills" | "rounded" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
/**
 * Tab trigger variants.
 */
declare const tabsTriggerVariants: (props?: ({
    variant?: "default" | "outline" | "pills" | "rounded" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TabsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsListVariants> {
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
declare const Tabs: React.ForwardRefExoticComponent<TabsProps & React.RefAttributes<HTMLDivElement>>;
interface TabsListProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tabsListVariants> {
}
/**
 * TabsList - container for tab triggers.
 */
declare const TabsList: React.ForwardRefExoticComponent<TabsListProps & React.RefAttributes<HTMLDivElement>>;
interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof tabsTriggerVariants> {
    /**
     * The unique value for this tab.
     */
    value: string;
}
/**
 * TabsTrigger - clickable tab button.
 */
declare const TabsTrigger: React.ForwardRefExoticComponent<TabsTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The unique value for this tab content.
     */
    value: string;
}
/**
 * TabsContent - content panel for a tab.
 */
declare const TabsContent: React.ForwardRefExoticComponent<TabsContentProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Accordion item variants.
 */
declare const accordionItemVariants: (props?: ({
    variant?: "default" | "ghost" | "card" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface AccordionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof accordionItemVariants> {
    /**
     * Whether one or multiple items can be open at once.
     */
    type?: "single" | "multiple";
    /**
     * The controlled value of expanded items.
     */
    value?: string | string[];
    /**
     * The default value when uncontrolled.
     */
    defaultValue?: string | string[];
    /**
     * Callback when expanded items change.
     */
    onValueChange?: (value: string | string[]) => void;
    /**
     * Whether at least one item must be open (single mode only).
     */
    collapsible?: boolean;
}
/**
 * Accordion component - collapsible content panels.
 *
 * @example
 * ```tsx
 * <Accordion type="single" defaultValue="item-1">
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Section 1</AccordionTrigger>
 *     <AccordionContent>Content for section 1</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * ```
 */
declare const Accordion: React.ForwardRefExoticComponent<AccordionProps & React.RefAttributes<HTMLDivElement>>;
interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof accordionItemVariants> {
    /**
     * The unique value for this accordion item.
     */
    value: string;
}
/**
 * AccordionItem - a single collapsible section.
 */
declare const AccordionItem: React.ForwardRefExoticComponent<AccordionItemProps & React.RefAttributes<HTMLDivElement>>;
type AccordionTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
/**
 * AccordionTrigger - button to toggle accordion item.
 */
declare const AccordionTrigger: React.ForwardRefExoticComponent<AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>>;
type AccordionContentProps = React.HTMLAttributes<HTMLDivElement>;
/**
 * AccordionContent - content panel that expands/collapses.
 */
declare const AccordionContent: React.ForwardRefExoticComponent<AccordionContentProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Tooltip content variants.
 */
declare const tooltipContentVariants: (props?: ({
    side?: "top" | "bottom" | "left" | "right" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface TooltipProviderProps {
    /**
     * The delay in milliseconds before showing the tooltip.
     */
    delayDuration?: number;
    /**
     * The delay in milliseconds before hiding the tooltip.
     */
    skipDelayDuration?: number;
    children: React.ReactNode;
}
/**
 * TooltipProvider - provides global tooltip configuration.
 */
declare function TooltipProvider({ delayDuration: _delayDuration, children, }: TooltipProviderProps): react_jsx_runtime.JSX.Element;
interface TooltipProps {
    /**
     * Whether the tooltip is open.
     */
    open?: boolean;
    /**
     * Default open state.
     */
    defaultOpen?: boolean;
    /**
     * Callback when open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * The preferred side of the trigger to render against.
     */
    side?: "top" | "bottom" | "left" | "right";
    /**
     * The delay in milliseconds before showing.
     */
    delayDuration?: number;
    children: React.ReactNode;
}
/**
 * Tooltip component - displays brief information on hover.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger>Hover me</TooltipTrigger>
 *     <TooltipContent>Tooltip content</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */
declare function Tooltip({ open, defaultOpen, onOpenChange, side, delayDuration, children, }: TooltipProps): react_jsx_runtime.JSX.Element;
interface TooltipTriggerProps extends React.HTMLAttributes<HTMLSpanElement> {
    /**
     * Render as child element.
     */
    asChild?: boolean;
}
/**
 * TooltipTrigger - element that triggers the tooltip.
 */
declare const TooltipTrigger: React.ForwardRefExoticComponent<TooltipTriggerProps & React.RefAttributes<HTMLSpanElement>>;
interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof tooltipContentVariants> {
    /**
     * Offset from the trigger element.
     */
    sideOffset?: number;
}
/**
 * TooltipContent - the content displayed in the tooltip.
 */
declare const TooltipContent: React.ForwardRefExoticComponent<TooltipContentProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Dropdown menu content variants.
 */
declare const dropdownMenuContentVariants: (props?: ({
    side?: "top" | "bottom" | "left" | "right" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface DropdownMenuProps {
    /**
     * Whether the menu is open.
     */
    open?: boolean;
    /**
     * Default open state.
     */
    defaultOpen?: boolean;
    /**
     * Callback when open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
/**
 * DropdownMenu component - action menu with multiple options.
 *
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Action 1</DropdownMenuItem>
 *     <DropdownMenuItem>Action 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
declare function DropdownMenu({ open, defaultOpen, onOpenChange, children, }: DropdownMenuProps): react_jsx_runtime.JSX.Element;
interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Render as child element.
     */
    asChild?: boolean;
}
/**
 * DropdownMenuTrigger - button to open the menu.
 */
declare const DropdownMenuTrigger: React.ForwardRefExoticComponent<DropdownMenuTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof dropdownMenuContentVariants> {
    /**
     * Alignment of the menu.
     */
    align?: "start" | "center" | "end";
    /**
     * Offset from trigger.
     */
    sideOffset?: number;
}
/**
 * DropdownMenuContent - container for menu items.
 */
declare const DropdownMenuContent: React.ForwardRefExoticComponent<DropdownMenuContentProps & React.RefAttributes<HTMLDivElement>>;
interface DropdownMenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Whether the item is destructive.
     */
    destructive?: boolean;
}
/**
 * DropdownMenuItem - a single menu item.
 */
declare const DropdownMenuItem: React.ForwardRefExoticComponent<DropdownMenuItemProps & React.RefAttributes<HTMLButtonElement>>;
/**
 * DropdownMenuSeparator - visual separator between items.
 */
declare const DropdownMenuSeparator: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
/**
 * DropdownMenuLabel - non-interactive label for a group.
 */
declare const DropdownMenuLabel: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

/**
 * Popover content variants.
 */
declare const popoverContentVariants: (props?: ({
    side?: "top" | "bottom" | "left" | "right" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface PopoverProps {
    /**
     * Whether the popover is open.
     */
    open?: boolean;
    /**
     * Default open state.
     */
    defaultOpen?: boolean;
    /**
     * Callback when open state changes.
     */
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
}
/**
 * Popover component - floating content panel.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger>Open</PopoverTrigger>
 *   <PopoverContent>
 *     Content goes here
 *   </PopoverContent>
 * </Popover>
 * ```
 */
declare function Popover({ open, defaultOpen, onOpenChange, children, }: PopoverProps): react_jsx_runtime.JSX.Element;
interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * Render as child element.
     */
    asChild?: boolean;
}
/**
 * PopoverTrigger - button to open the popover.
 */
declare const PopoverTrigger: React.ForwardRefExoticComponent<PopoverTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof popoverContentVariants> {
    /**
     * Alignment of the popover.
     */
    align?: "start" | "center" | "end";
    /**
     * Offset from trigger.
     */
    sideOffset?: number;
}
/**
 * PopoverContent - the floating content panel.
 */
declare const PopoverContent: React.ForwardRefExoticComponent<PopoverContentProps & React.RefAttributes<HTMLDivElement>>;
/**
 * PopoverClose - button to close the popover.
 */
declare const PopoverClose: React.ForwardRefExoticComponent<React.ButtonHTMLAttributes<HTMLButtonElement> & React.RefAttributes<HTMLButtonElement>>;

/**
 * Table - semantic table component.
 *
 * @example
 * ```tsx
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 * ```
 */
declare const Table: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableElement> & React.RefAttributes<HTMLTableElement>>;
/**
 * TableHeader - table header container.
 */
declare const TableHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
/**
 * TableBody - table body container.
 */
declare const TableBody: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
/**
 * TableFooter - table footer container.
 */
declare const TableFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableSectionElement> & React.RefAttributes<HTMLTableSectionElement>>;
/**
 * TableRow - table row.
 */
declare const TableRow: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableRowElement> & React.RefAttributes<HTMLTableRowElement>>;
type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;
/**
 * TableHead - table header cell.
 */
declare const TableHead: React.ForwardRefExoticComponent<TableHeadProps & React.RefAttributes<HTMLTableCellElement>>;
type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;
/**
 * TableCell - table data cell.
 */
declare const TableCell: React.ForwardRefExoticComponent<TableCellProps & React.RefAttributes<HTMLTableCellElement>>;
/**
 * TableCaption - table caption.
 */
declare const TableCaption: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLTableCaptionElement> & React.RefAttributes<HTMLTableCaptionElement>>;

interface TableToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Número de itens selecionados */
    selectedCount?: number;
    /** Callback quando limpar seleção */
    onClearSelection?: () => void;
    /** Mostrar botão de limpar seleção */
    showClearSelection?: boolean;
}
/**
 * TableToolbar - barra de ferramentas superior da tabela.
 *
 * @example
 * ```tsx
 * <TableToolbar
 *   selectedCount={20}
 *   onClearSelection={() => console.log('clear')}
 *   showClearSelection
 * >
 *   <div className="flex items-center gap-4">
 *     <Select />
 *     <Input />
 *     <Button />
 *   </div>
 * </TableToolbar>
 * ```
 */
declare const TableToolbar: React.ForwardRefExoticComponent<TableToolbarProps & React.RefAttributes<HTMLDivElement>>;

type SortDirection = "asc" | "desc" | null;
interface TableSortHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
    /** Direção atual da ordenação */
    sortDirection?: SortDirection;
    /** Callback quando clicar no cabeçalho */
    onSort?: () => void;
    /** Ícone opcional antes do texto */
    icon?: React.ReactNode;
    /** Desabilitar ordenação */
    disableSort?: boolean;
}
/**
 * TableSortHeader - cabeçalho de coluna com ordenação.
 *
 * @example
 * ```tsx
 * <TableSortHeader
 *   sortDirection="asc"
 *   onSort={() => console.log('sort')}
 * >
 *   Nome
 * </TableSortHeader>
 * ```
 */
declare const TableSortHeader: React.ForwardRefExoticComponent<TableSortHeaderProps & React.RefAttributes<HTMLTableCellElement>>;

interface TableActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Ações como array de botões/componentes */
    actions?: React.ReactNode[];
}
/**
 * TableActions - container para ações da linha da tabela.
 *
 * @example
 * ```tsx
 * <TableActions>
 *   <button><TrendingUp size={18} /></button>
 *   <button><BarChart2 size={18} /></button>
 *   <button><Users size={18} /></button>
 * </TableActions>
 * ```
 */
declare const TableActions: React.ForwardRefExoticComponent<TableActionsProps & React.RefAttributes<HTMLDivElement>>;
/**
 * TableActionButton - botão de ação individual.
 */
interface TableActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Ícone do botão */
    icon?: React.ReactNode;
    /** Variante de cor */
    variant?: "default" | "primary" | "success" | "warning" | "destructive";
}
declare const TableActionButton: React.ForwardRefExoticComponent<TableActionButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Página atual (1-indexed) */
    currentPage?: number;
    /** Total de páginas */
    totalPages?: number;
    /** Callback ao mudar página */
    onPageChange?: (page: number) => void;
    /** Índice inicial dos itens sendo exibidos */
    startIndex?: number;
    /** Índice final dos itens sendo exibidos */
    endIndex?: number;
    /** Total de itens */
    totalItems?: number;
}
/**
 * TablePagination - paginação para tabelas.
 *
 * @example
 * ```tsx
 * <TablePagination
 *   currentPage={1}
 *   totalPages={5}
 *   startIndex={1}
 *   endIndex={10}
 *   totalItems={50}
 *   onPageChange={(page) => console.log(page)}
 * />
 * ```
 */
declare const TablePagination: React.ForwardRefExoticComponent<TablePaginationProps & React.RefAttributes<HTMLDivElement>>;

/**
 * Pagination button variants.
 */
declare const paginationButtonVariants: (props?: ({
    variant?: "default" | "outline" | "ghost" | null | undefined;
    size?: "sm" | "default" | "lg" | "icon" | null | undefined;
    isActive?: boolean | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
type PaginationProps = React.HTMLAttributes<HTMLElement>;
/**
 * Pagination - navigation for multi-page content.
 *
 * @example
 * ```tsx
 * <Pagination>
 *   <PaginationContent>
 *     <PaginationItem>
 *       <PaginationPrevious href="#" />
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationLink href="#" isActive>1</PaginationLink>
 *     </PaginationItem>
 *     <PaginationItem>
 *       <PaginationNext href="#" />
 *     </PaginationItem>
 *   </PaginationContent>
 * </Pagination>
 * ```
 */
declare const Pagination: React.ForwardRefExoticComponent<PaginationProps & React.RefAttributes<HTMLElement>>;
/**
 * PaginationContent - container for pagination items.
 */
declare const PaginationContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLUListElement> & React.RefAttributes<HTMLUListElement>>;
/**
 * PaginationItem - wrapper for individual pagination element.
 */
declare const PaginationItem: React.ForwardRefExoticComponent<React.LiHTMLAttributes<HTMLLIElement> & React.RefAttributes<HTMLLIElement>>;
interface PaginationLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof paginationButtonVariants> {
    /**
     * Whether this is the current page.
     */
    isActive?: boolean;
}
/**
 * PaginationLink - link to a specific page.
 */
declare const PaginationLink: React.ForwardRefExoticComponent<PaginationLinkProps & React.RefAttributes<HTMLAnchorElement>>;
interface PaginationButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof paginationButtonVariants> {
    /**
     * Whether this is the current page.
     */
    isActive?: boolean;
}
/**
 * PaginationButton - button alternative to link.
 */
declare const PaginationButton: React.ForwardRefExoticComponent<PaginationButtonProps & React.RefAttributes<HTMLButtonElement>>;
type PaginationPreviousProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
/**
 * PaginationPrevious - link to previous page.
 */
declare const PaginationPrevious: React.ForwardRefExoticComponent<PaginationPreviousProps & React.RefAttributes<HTMLAnchorElement>>;
type PaginationNextProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
/**
 * PaginationNext - link to next page.
 */
declare const PaginationNext: React.ForwardRefExoticComponent<PaginationNextProps & React.RefAttributes<HTMLAnchorElement>>;
/**
 * PaginationEllipsis - indicates more pages.
 */
declare const PaginationEllipsis: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLSpanElement> & React.RefAttributes<HTMLSpanElement>>;

/**
 * Skeleton variants.
 */
declare const skeletonVariants: (props?: ({
    variant?: "default" | "primary" | "card" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {
}
/**
 * Skeleton component - loading placeholder.
 *
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-12 rounded-full" />
 * <Skeleton className="h-4 w-[250px]" />
 * ```
 */
declare const Skeleton: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
interface SkeletonTextProps extends SkeletonProps {
    /**
     * Number of text lines to display.
     */
    lines?: number;
    /**
     * Width of the last line (for text variation).
     */
    lastLineWidth?: string;
}
/**
 * SkeletonText - multiple lines of skeleton text.
 */
declare const SkeletonText: React.ForwardRefExoticComponent<SkeletonTextProps & React.RefAttributes<HTMLDivElement>>;
interface SkeletonCircleProps extends SkeletonProps {
    /**
     * Size of the circle.
     */
    size?: "sm" | "md" | "lg" | "xl";
}
/**
 * SkeletonCircle - circular skeleton for avatars.
 */
declare const SkeletonCircle: React.ForwardRefExoticComponent<SkeletonCircleProps & React.RefAttributes<HTMLDivElement>>;
/**
 * SkeletonCard - card-shaped skeleton.
 */
declare const SkeletonCard: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
/**
 * SkeletonAvatar - avatar with text skeleton.
 */
declare const SkeletonAvatar: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
/**
 * SkeletonTable - table skeleton with rows.
 */
declare const SkeletonTable: React.ForwardRefExoticComponent<SkeletonProps & {
    rows?: number;
    columns?: number;
} & React.RefAttributes<HTMLDivElement>>;

/**
 * Educacross Design System - Design Tokens (Primitives)
 *
 * Tokens TypeScript para uso programático.
 * Exportados do Figma.
 */
declare const spacing: {
    readonly padding: {
        readonly 1: "4px";
        readonly 2: "8px";
        readonly 3: "12px";
        readonly 4: "16px";
        readonly 5: "20px";
        readonly 6: "24px";
        readonly 7: "28px";
        readonly 8: "32px";
        readonly 9: "36px";
        readonly 10: "40px";
        readonly 11: "44px";
        readonly 12: "48px";
        readonly 13: "52px";
        readonly 14: "56px";
        readonly 15: "60px";
        readonly 16: "64px";
        readonly 25: "100px";
    };
    readonly gap: {
        readonly 1: "4px";
        readonly 2: "8px";
        readonly 3: "12px";
        readonly 4: "16px";
        readonly 5: "20px";
        readonly 6: "24px";
        readonly 7: "28px";
        readonly 8: "32px";
        readonly 9: "36px";
        readonly 10: "40px";
        readonly 11: "44px";
        readonly 12: "48px";
        readonly 13: "52px";
        readonly 14: "56px";
        readonly 15: "60px";
        readonly 16: "64px";
        readonly 25: "100px";
    };
};
declare const borderRadius: {
    readonly xs: "2px";
    readonly sm: "4px";
    readonly md: "6px";
    readonly lg: "8px";
    readonly xl: "10px";
    readonly round: "500px";
};
declare const colors: {
    readonly primary: {
        readonly 100: "#E3E1FC";
        readonly 200: "#C7C2F9";
        readonly 300: "#ABA4F6";
        readonly 400: "#8F85F3";
        readonly 500: "#7367F0";
        readonly 600: "#675DD8";
        readonly 700: "#6258CC";
        readonly 800: "#5C52C0";
        readonly 900: "#564DB4";
    };
    readonly secondary: {
        readonly 100: "#E6E6E9";
        readonly 200: "#CCCDD3";
        readonly 300: "#B3B5BC";
        readonly 400: "#999CA6";
        readonly 500: "#808390";
        readonly 600: "#737682";
        readonly 700: "#6D6F7A";
        readonly 800: "#666973";
        readonly 900: "#60626C";
    };
    readonly info: {
        readonly 100: "#CCF1F6";
        readonly 200: "#99E3ED";
        readonly 300: "#66D6E3";
        readonly 400: "#33C8DA";
        readonly 500: "#00BAD1";
        readonly 600: "#00A7BC";
        readonly 700: "#009EB2";
        readonly 800: "#0095A7";
        readonly 900: "#008C9D";
    };
    readonly success: {
        readonly 100: "#D4F4E2";
        readonly 200: "#A9E9C5";
        readonly 300: "#7EDDA9";
        readonly 400: "#53D28C";
        readonly 500: "#28C76F";
        readonly 600: "#24B364";
        readonly 700: "#22A95E";
        readonly 800: "#209F59";
        readonly 900: "#1E9553";
    };
    readonly warning: {
        readonly 100: "#FFECD9";
        readonly 200: "#FFD9B4";
        readonly 300: "#FFC58E";
        readonly 400: "#FFB269";
        readonly 500: "#FF9F43";
        readonly 600: "#E68F3C";
        readonly 700: "#D98739";
        readonly 800: "#CC7F36";
        readonly 900: "#BF7732";
    };
    readonly error: {
        readonly 100: "#FFDBDC";
        readonly 200: "#FFB7B9";
        readonly 300: "#FF9396";
        readonly 400: "#FF6F73";
        readonly 500: "#FF4B50";
        readonly 600: "#E64448";
        readonly 700: "#D94044";
        readonly 800: "#CC3C40";
        readonly 900: "#BF383C";
    };
    readonly gray: {
        readonly 100: "#F5F5F7";
        readonly 200: "#EBEBF0";
        readonly 300: "#E1E1E8";
        readonly 400: "#D7D7E0";
        readonly 500: "#CDCDD8";
        readonly 600: "#B9B9C2";
        readonly 700: "#AEAEB8";
        readonly 800: "#A4A4AD";
        readonly 900: "#9A9AA3";
    };
};
declare const opacityColors: {
    readonly primary: {
        readonly 8: "rgba(115, 103, 240, 0.08)";
        readonly 16: "rgba(115, 103, 240, 0.16)";
        readonly 24: "rgba(115, 103, 240, 0.24)";
        readonly 32: "rgba(115, 103, 240, 0.32)";
        readonly 38: "rgba(115, 103, 240, 0.38)";
    };
    readonly secondary: {
        readonly 8: "rgba(128, 131, 144, 0.08)";
        readonly 16: "rgba(128, 131, 144, 0.16)";
        readonly 24: "rgba(128, 131, 144, 0.24)";
        readonly 32: "rgba(128, 131, 144, 0.32)";
        readonly 38: "rgba(128, 131, 144, 0.38)";
    };
    readonly info: {
        readonly 8: "rgba(0, 186, 209, 0.08)";
        readonly 16: "rgba(0, 186, 209, 0.16)";
        readonly 24: "rgba(0, 186, 209, 0.24)";
        readonly 32: "rgba(0, 186, 209, 0.32)";
        readonly 38: "rgba(0, 186, 209, 0.38)";
    };
    readonly success: {
        readonly 8: "rgba(40, 199, 111, 0.08)";
        readonly 16: "rgba(40, 199, 111, 0.16)";
        readonly 24: "rgba(40, 199, 111, 0.24)";
        readonly 32: "rgba(40, 199, 111, 0.32)";
        readonly 38: "rgba(40, 199, 111, 0.38)";
    };
    readonly warning: {
        readonly 8: "rgba(255, 159, 67, 0.08)";
        readonly 16: "rgba(255, 159, 67, 0.16)";
        readonly 24: "rgba(255, 159, 67, 0.24)";
        readonly 32: "rgba(255, 159, 67, 0.32)";
        readonly 38: "rgba(255, 159, 67, 0.38)";
    };
    readonly error: {
        readonly 8: "rgba(255, 75, 80, 0.08)";
        readonly 16: "rgba(255, 75, 80, 0.16)";
        readonly 24: "rgba(255, 75, 80, 0.24)";
        readonly 32: "rgba(255, 75, 80, 0.32)";
        readonly 38: "rgba(255, 75, 80, 0.38)";
    };
    readonly gray: {
        readonly 8: "rgba(205, 205, 216, 0.08)";
        readonly 16: "rgba(205, 205, 216, 0.16)";
        readonly 24: "rgba(205, 205, 216, 0.24)";
        readonly 32: "rgba(205, 205, 216, 0.32)";
        readonly 38: "rgba(205, 205, 216, 0.38)";
    };
};
declare const themeVariables: {
    readonly light: {
        readonly textPrimary: "rgba(47, 43, 61, 0.9)";
        readonly textSecondary: "rgba(47, 43, 61, 0.7)";
        readonly textSubtitle: "rgba(47, 43, 61, 0.55)";
        readonly textDisabled: "rgba(47, 43, 61, 0.4)";
        readonly actionActive: "rgba(47, 43, 61, 0.6)";
        readonly actionHover: "rgba(47, 43, 61, 0.06)";
        readonly actionSelected: "rgba(47, 43, 61, 0.08)";
        readonly actionDisabled: "rgba(47, 43, 61, 0.3)";
        readonly actionDisabledBg: "rgba(47, 43, 61, 0.16)";
        readonly actionFocus: "rgba(47, 43, 61, 0.1)";
        readonly divider: "rgba(47, 43, 61, 0.12)";
        readonly outlineBorder: "rgba(47, 43, 61, 0.24)";
        readonly inputBorder: "rgba(47, 43, 61, 0.22)";
        readonly backdropOverlay: "rgba(47, 43, 61, 0.5)";
        readonly filledInputBg: "rgba(47, 43, 61, 0.06)";
        readonly chipBackground: "rgba(47, 43, 61, 0.08)";
        readonly bodyBg: "#F8F7FA";
        readonly paper: "#FFFFFF";
        readonly greyLight: "#FAFAFA";
        readonly chatBg: "#F3F2F5";
        readonly trackBg: "#F1F0F2";
        readonly tableHeader: "#FFFFFF";
        readonly avatarBg: "#EEEDF0";
        readonly snackbar: "#2F2B3D";
    };
    readonly dark: {
        readonly textPrimary: "rgba(225, 222, 245, 0.9)";
        readonly textSecondary: "rgba(225, 222, 245, 0.7)";
        readonly textSubtitle: "rgba(225, 222, 245, 0.55)";
        readonly textDisabled: "rgba(225, 222, 245, 0.4)";
        readonly actionActive: "rgba(225, 222, 245, 0.6)";
        readonly actionHover: "rgba(225, 222, 245, 0.06)";
        readonly actionSelected: "rgba(225, 222, 245, 0.08)";
        readonly actionDisabled: "rgba(225, 222, 245, 0.3)";
        readonly actionDisabledBg: "rgba(225, 222, 245, 0.16)";
        readonly actionFocus: "rgba(225, 222, 245, 0.1)";
        readonly divider: "rgba(225, 222, 245, 0.12)";
        readonly outlineBorder: "rgba(225, 222, 245, 0.24)";
        readonly inputBorder: "rgba(225, 222, 245, 0.22)";
        readonly backdropOverlay: "rgba(23, 25, 37, 0.6)";
        readonly filledInputBg: "rgba(225, 222, 245, 0.06)";
        readonly chipBackground: "rgba(225, 222, 245, 0.08)";
        readonly bodyBg: "#25293C";
        readonly paper: "#2F3349";
        readonly greyLight: "#353A52";
        readonly chatBg: "#202534";
        readonly trackBg: "#3A3F57";
        readonly tableHeader: "#2F3349";
        readonly avatarBg: "#373B50";
        readonly snackbar: "#F7F4FF";
    };
};
declare const misc: {
    readonly cardHeader: "24px";
    readonly cardPadding: "24px";
    readonly cardFooter: "24px";
    readonly formGap: "24px";
    readonly containerXl: "1140px";
    readonly bgWhite: "#FFFFFF";
    readonly bgBlack: "#000000";
    readonly bgFacebook: "#4267B2";
    readonly bgTwitter: "#1DA1F2";
    readonly bgLinkedin: "#007BB6";
};
type SpacingScale = keyof typeof spacing.padding;
type BorderRadiusScale = keyof typeof borderRadius;
type ColorCategory = keyof typeof colors;
type ColorScale = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type OpacityScale = 8 | 16 | 24 | 32 | 38;
type ThemeMode = 'light' | 'dark';
declare const tailwindTokens: {
    readonly spacing: {
        readonly 'padding-1': "4px";
        readonly 'padding-2': "8px";
        readonly 'padding-3': "12px";
        readonly 'padding-4': "16px";
        readonly 'padding-5': "20px";
        readonly 'padding-6': "24px";
        readonly 'padding-7': "28px";
        readonly 'padding-8': "32px";
        readonly 'padding-9': "36px";
        readonly 'padding-10': "40px";
        readonly 'padding-11': "44px";
        readonly 'padding-12': "48px";
        readonly 'padding-13': "52px";
        readonly 'padding-14': "56px";
        readonly 'padding-15': "60px";
        readonly 'padding-16': "64px";
        readonly 'padding-25': "100px";
        readonly 'gap-1': "4px";
        readonly 'gap-2': "8px";
        readonly 'gap-3': "12px";
        readonly 'gap-4': "16px";
        readonly 'gap-5': "20px";
        readonly 'gap-6': "24px";
        readonly 'gap-7': "28px";
        readonly 'gap-8': "32px";
        readonly 'gap-9': "36px";
        readonly 'gap-10': "40px";
        readonly 'gap-11': "44px";
        readonly 'gap-12': "48px";
        readonly 'gap-13': "52px";
        readonly 'gap-14': "56px";
        readonly 'gap-15': "60px";
        readonly 'gap-16': "64px";
        readonly 'gap-25': "100px";
    };
    readonly borderRadius: {
        readonly xs: "2px";
        readonly sm: "4px";
        readonly md: "6px";
        readonly lg: "8px";
        readonly xl: "10px";
        readonly round: "500px";
    };
    readonly colors: {
        readonly primary: {
            readonly 100: "#E3E1FC";
            readonly 200: "#C7C2F9";
            readonly 300: "#ABA4F6";
            readonly 400: "#8F85F3";
            readonly 500: "#7367F0";
            readonly 600: "#675DD8";
            readonly 700: "#6258CC";
            readonly 800: "#5C52C0";
            readonly 900: "#564DB4";
        };
        readonly secondary: {
            readonly 100: "#E6E6E9";
            readonly 200: "#CCCDD3";
            readonly 300: "#B3B5BC";
            readonly 400: "#999CA6";
            readonly 500: "#808390";
            readonly 600: "#737682";
            readonly 700: "#6D6F7A";
            readonly 800: "#666973";
            readonly 900: "#60626C";
        };
        readonly info: {
            readonly 100: "#CCF1F6";
            readonly 200: "#99E3ED";
            readonly 300: "#66D6E3";
            readonly 400: "#33C8DA";
            readonly 500: "#00BAD1";
            readonly 600: "#00A7BC";
            readonly 700: "#009EB2";
            readonly 800: "#0095A7";
            readonly 900: "#008C9D";
        };
        readonly success: {
            readonly 100: "#D4F4E2";
            readonly 200: "#A9E9C5";
            readonly 300: "#7EDDA9";
            readonly 400: "#53D28C";
            readonly 500: "#28C76F";
            readonly 600: "#24B364";
            readonly 700: "#22A95E";
            readonly 800: "#209F59";
            readonly 900: "#1E9553";
        };
        readonly warning: {
            readonly 100: "#FFECD9";
            readonly 200: "#FFD9B4";
            readonly 300: "#FFC58E";
            readonly 400: "#FFB269";
            readonly 500: "#FF9F43";
            readonly 600: "#E68F3C";
            readonly 700: "#D98739";
            readonly 800: "#CC7F36";
            readonly 900: "#BF7732";
        };
        readonly error: {
            readonly 100: "#FFDBDC";
            readonly 200: "#FFB7B9";
            readonly 300: "#FF9396";
            readonly 400: "#FF6F73";
            readonly 500: "#FF4B50";
            readonly 600: "#E64448";
            readonly 700: "#D94044";
            readonly 800: "#CC3C40";
            readonly 900: "#BF383C";
        };
        readonly gray: {
            readonly 100: "#F5F5F7";
            readonly 200: "#EBEBF0";
            readonly 300: "#E1E1E8";
            readonly 400: "#D7D7E0";
            readonly 500: "#CDCDD8";
            readonly 600: "#B9B9C2";
            readonly 700: "#AEAEB8";
            readonly 800: "#A4A4AD";
            readonly 900: "#9A9AA3";
        };
    };
};

/**
 * Utility function to merge Tailwind CSS classes with proper precedence.
 * Combines clsx for conditional classes with tailwind-merge to handle conflicts.
 *
 * @example
 * ```tsx
 * cn("px-4 py-2", condition && "bg-primary", className)
 * ```
 */
declare function cn(...inputs: ClassValue[]): string;

export { Accordion, AccordionContent, type AccordionContentProps, AccordionItem, type AccordionItemProps, type AccordionProps, AccordionTrigger, type AccordionTriggerProps, Alert, AlertDescription, type AlertProps, AlertTitle, Avatar, AvatarFallback, type AvatarFallbackProps, AvatarIcon, type AvatarIconProps, AvatarImage, type AvatarImageProps, type AvatarProps, Badge, type BadgeProps, type BorderRadiusScale, Button, type ButtonProps, Card, CardContent, CardDescription, CardFooter, CardHeader, type CardProps, CardTitle, Checkbox, type CheckboxProps, type ColorCategory, type ColorScale, CustomIcon, type CustomIconProps, Dialog, DialogClose, DialogContent, type DialogContentProps, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, type DialogProps, DialogTitle, DialogTrigger, type DialogTriggerProps, DropdownMenu, DropdownMenuContent, type DropdownMenuContentProps, DropdownMenuItem, type DropdownMenuItemProps, DropdownMenuLabel, type DropdownMenuProps, DropdownMenuSeparator, DropdownMenuTrigger, type DropdownMenuTriggerProps, Header, type HeaderProps, Icon, type IconCategory, type IconName, type IconProps, Input, type InputProps, Label, type LabelProps, Logo, type LogoProps, type OpacityScale, Pagination, PaginationButton, type PaginationButtonProps, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, type PaginationLinkProps, PaginationNext, type PaginationNextProps, PaginationPrevious, type PaginationPreviousProps, type PaginationProps, Popover, PopoverClose, PopoverContent, type PopoverContentProps, type PopoverProps, PopoverTrigger, type PopoverTriggerProps, Radio, RadioGroup, type RadioGroupProps, type RadioProps, type ResolvedTheme, Select, type SelectOption, type SelectProps, Sidebar, SidebarItem, type SidebarItemProps, type SidebarProps, SidebarSubItem, type SidebarSubItemProps, Skeleton, SkeletonAvatar, SkeletonCard, SkeletonCircle, type SkeletonCircleProps, type SkeletonProps, SkeletonTable, SkeletonText, type SkeletonTextProps, type SortDirection, type SpacingScale, Table, TableActionButton, type TableActionButtonProps, TableActions, type TableActionsProps, TableBody, TableCaption, TableCell, type TableCellProps, TableFooter, TableHead, type TableHeadProps, TableHeader, TablePagination, type TablePaginationProps, TableRow, TableSortHeader, type TableSortHeaderProps, TableToolbar, type TableToolbarProps, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, type TabsProps, TabsTrigger, type TabsTriggerProps, type Theme, type ThemeMode, ThemeProvider, type ThemeProviderProps, ThemeSwitcher, type ThemeSwitcherProps, Toast, ToastAction, ToastDescription, type ToastProps, ToastTitle, ToastViewport, Tooltip, TooltipContent, type TooltipContentProps, type TooltipProps, TooltipProvider, type TooltipProviderProps, TooltipTrigger, type TooltipTriggerProps, accordionItemVariants, alertVariants, avatarVariants, badgeVariants, borderRadius, buttonVariants, cardVariants, checkboxVariants, cn, colors, customIconVariants, customIcons, dialogContentVariants, dialogOverlayVariants, dropdownMenuContentVariants, iconCategories, iconNames, iconVariants, inputVariants, labelVariants, misc, opacityColors, paginationButtonVariants, popoverContentVariants, radioVariants, selectVariants, sidebarItemVariants, sidebarVariants, skeletonVariants, spacing, tabsListVariants, tabsTriggerVariants, tailwindTokens, themeSwitcherVariants, themeVariables, toastVariants, tooltipContentVariants, useTheme };
