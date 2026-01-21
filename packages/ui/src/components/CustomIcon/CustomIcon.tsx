import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

/**
 * Categorias de ícones customizados do Educacross
 */
export type CustomIconCategory =
    | "conhecimento"
    | "acao"
    | "menu"
    | "interface"
    | "metricas"
    | "social"
    | "usuarios"
    | "agrupamentos"
    | "gamificacao"
    | "idioma"
    | "proficiencia"
    | "educacao-infantil"
    | "lingua-portuguesa-bncc"
    | "lingua-portuguesa-saeb"
    | "lingua-portuguesa-saresp"
    | "lingua-portuguesa-topicos"
    | "matematica-bncc"
    | "matematica-saeb-saresp"
    | "matematica-avalia";

/**
 * Mapeamento de ícones por categoria
 */
export const customIcons = {
    conhecimento: [
        "liga-corujinhas-enabled",
        "liga-corujinhas-disabled",
        "lingua-portuguesa-enabled",
        "lingua-portuguesa-disabled",
        "math-enabled",
        "math-disabled",
        "matematica-sigla-enabled",
        "matematica-sigla-disabled",
        "todas-disciplinas-enabled",
        "todas-disciplinas-disabled",
    ],
    acao: [
        "badge",
        "delete",
        "edit",
        "ios_share",
        "link",
        "mail_lock",
        "missao-mista",
        "person_search",
        "pie_chart",
        "social_leaderboard",
        "trophy",
        "upload_file",
        "visibility",
        "workspace_premium",
    ],
    menu: [
        "auto_stories",
        "Avaliação",
        "camera",
        "download",
        "Eventos",
        "fiber_manual_record",
        "flag",
        "grid_view",
        "group",
        "groups",
        "how_to_reg",
        "map",
        "person_play",
        "pie_chart",
        "search",
        "work",
    ],
    interface: [
        "Acesso",
        "classroom",
        "Group 9555",
        "open-book",
        "videogame-asset",
    ],
    metricas: [
        "Desafios",
        "Dificuldade",
        "Jogos",
        "Percentual de acertos",
        "Pontos",
        "Progresso",
        "Tempo de Aprendizagem",
        "Top",
    ],
    social: ["facebook", "instagram", "whatsapp", "youtube"],
    usuarios: [
        "Administrador",
        "Aluno",
        "Coordenadores",
        "Diretor",
        "Gestor de rede",
        "Professor",
    ],
    agrupamentos: ["Ano", "Escola", "Rede", "Turmas"],
    gamificacao: [
        "Estrelas",
        "Insignia-Bronze",
        "Insignia-Ouro",
        "Insignia-Prata",
        "Moedas",
        "Pontos-Eventos",
        "Pontos-XP",
        "Trofeu-bronze",
        "Trofeu-Prata",
        "Troféu-Ouro",
    ],
    idioma: ["brasil", "eua", "espanha"],
    proficiencia: [
        "abaixo do básico",
        "avançado",
        "básico",
        "não fizeram",
        "proficiente",
    ],
    "educacao-infantil": [
        "Bncc-CorpoGestosMovimentos",
        "Bncc-EscutaFalaPensamentoImaginacao",
        "Bncc-EspacosTemposQuantidadesRelacoesTransformacoes",
        "Bncc-OEuOOutroONos",
        "Bncc-TracosSonsCoresFormas",
        "progress-classes",
        "student-hat",
    ],
    "lingua-portuguesa-bncc": [
        "Bncc-CampoArtisticoLiterario",
        "Bncc-CampodaVidaCotidiana",
        "Bncc-Campojornalisticomidiatico",
        "Bncc-CampoPraticasEstudoPesquisa",
        "Bncc-CampoVidaPublica",
        "bncc-todososcampos",
    ],
    "lingua-portuguesa-saeb": [
        "Saeb-CoerenciasCoesaoProcessamentoTexto",
        "Saeb-ImplicacoesSuporteGeneroEnunciadorCompreensaoTexto",
        "Saeb-ProcedimentosLeitura",
        "Saeb-RelacaoEntreRecursosExpressivosEfeitosSentido",
        "Saeb-RelacaoEntreTextos",
        "Saeb-VariacaoLinguistica",
    ],
    "lingua-portuguesa-saresp": [
        "Saresp-CompreensaoTextosLiterarios",
        "Saresp-ReconstruçãoCondicoesProducaoPercepcaoTextos",
        "Saresp-ReconstrucaoIntertextualiudadeRelacaoEntreTextos",
        "Saresp-ReconstrucaoSentidosTexto",
        "Saresp-ReconstrucaoTextualidade",
        "Saresp-ReflexaoUsosLinguaFaladaEscrita",
    ],
    "lingua-portuguesa-topicos": [
        "Tópico-analise-linguistica",
        "Tópico-escrita",
        "Tópico-leitura-escuta",
        "Tópico-oralidade",
    ],
    "matematica-bncc": [
        "bncc-álgebra",
        "bncc-geometria",
        "bncc-grandezas e medidas",
        "bncc-números",
        "bncc-probabilidade e estatística",
    ],
    "matematica-saeb-saresp": [
        "Saeb-EspacoForma",
        "Saeb-grandezas e medidas",
        "Saeb-NumerosOperacoesAlgebraFuncoes",
        "Saeb-TratamentoInformacao",
    ],
    "matematica-avalia": [
        "Avalia-AlgebrizacaoRelacao",
        "Avalia-EspacoForma",
        "Avalia-Incerteza",
        "Avalia-QuantidadeMedida",
    ],
} as const;

/**
 * Variantes do CustomIcon.
 */
const customIconVariants = cva(["inline-block"], {
    variants: {
        size: {
            xs: "w-3 h-3",
            sm: "w-4 h-4",
            default: "w-5 h-5",
            md: "w-6 h-6",
            lg: "w-8 h-8",
            xl: "w-10 h-10",
            "2xl": "w-12 h-12",
        },
        variant: {
            default: "text-foreground",
            muted: "text-muted-foreground",
            primary: "text-[#6E63E8]",
            secondary: "text-[#82868B]",
            destructive: "text-[#EA5455]",
            success: "text-[#28C76F]",
            warning: "text-[#FF9F43]",
            info: "text-[#00CFE8]",
        },
    },
    defaultVariants: {
        size: "default",
        variant: "default",
    },
});

export interface CustomIconProps
    extends Omit<React.SVGAttributes<SVGElement>, "name">,
        VariantProps<typeof customIconVariants> {
    /**
     * Categoria do ícone.
     */
    category: CustomIconCategory;
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
export const CustomIcon = React.forwardRef<SVGSVGElement, CustomIconProps>(
    ({ category, name, size, variant, className, ...props }, ref) => {
        // Normalizar nome do arquivo
        const normalizedName = name
            .replace(/\s+/g, " ")
            .trim();

        // Mapear nome para arquivo SVG
        const iconPath = `/icons/${category}/${normalizedName}.svg`;

        return (
            <img
                ref={ref as any}
                src={iconPath}
                alt={name}
                className={cn(customIconVariants({ size, variant }), className)}
                {...(props as any)}
            />
        );
    }
);

CustomIcon.displayName = "CustomIcon";

export { customIconVariants };
