/**
 * CSS Audit Script - Frontoffice vs Design System
 * 
 * Este script valida se as cores e estilos do Frontoffice
 * estão sincronizados com o Design System.
 * 
 * Uso: npx tsx scripts/css-audit.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// DEFINIÇÃO DE TOKENS
// ============================================

interface ColorToken {
    name: string;
    frontoffice: string | null;
    designSystem: string;
    status: 'match' | 'mismatch' | 'missing';
    impact: 'critical' | 'high' | 'medium' | 'low';
}

interface ComponentAudit {
    name: string;
    frontofficeExists: boolean;
    storyExists: boolean;
    cssPropertiesToCheck: string[];
    status: 'pending' | 'validated' | 'issues';
    issues: string[];
}

// Cores do Design System (styles.css)
const DS_COLORS = {
    primary: {
        100: '#E3E1FC',
        200: '#C7C2F9',
        300: '#ABA4F6',
        400: '#8F85F3',
        500: '#7367F0',
        600: '#675DD8',
        700: '#6258CC',
        800: '#5C52C0',
        900: '#564DB4',
    },
    secondary: {
        100: '#E6E6E9',
        200: '#CCCDD3',
        300: '#B3B5BC',
        400: '#999CA6',
        500: '#808390',
        600: '#737682',
        700: '#6D6F7A',
        800: '#666973',
        900: '#60626C',
    },
    success: {
        100: '#D4F4E2',
        200: '#A9E9C5',
        300: '#7EDDA9',
        400: '#53D28C',
        500: '#28C76F',
        600: '#24B364',
        700: '#22A95E',
        800: '#209F59',
        900: '#1E9553',
    },
    warning: {
        100: '#FFECD9',
        200: '#FFD9B4',
        300: '#FFC58E',
        400: '#FFB269',
        500: '#FF9F43',
        600: '#E68F3C',
        700: '#D98739',
        800: '#CC7F36',
        900: '#BF7732',
    },
    error: {
        100: '#FFDBDC',
        200: '#FFB7B9',
        300: '#FF9396',
        400: '#FF6F73',
        500: '#FF4B50',
        600: '#E64448',
        700: '#D94044',
        800: '#CC3C40',
        900: '#BF383C',
    },
    info: {
        100: '#CCF1F6',
        200: '#99E3ED',
        300: '#66D6E3',
        400: '#33C8DA',
        500: '#00BAD1',
        600: '#00A7BC',
        700: '#009EB2',
        800: '#0095A7',
        900: '#008C9D',
    },
};

// Cores do Frontoffice (_variables.scss)
const FO_COLORS = {
    primary: '#6e63e8',
    secondary: '#b4b7bd',
    success: '#28c76f',
    danger: '#ea5455',
    warning: '#ffd643',
    dark: '#1e1e1e',
    // Cores de legenda
    legendAdvanced: '#6e63e8',
    legendProficient: '#28c76f',
    legendBasic: '#ff9f43',
    legendBelowBasic: '#ea5455',
    legendNotCompleted: '#b4b7bd',
    legendInProgress: '#00cfe8',
    legendComplete: '#14693a',
    legendWarning: '#ffd643',
};

// ============================================
// FUNÇÕES DE COMPARAÇÃO
// ============================================

function normalizeColor(color: string): string {
    return color.toLowerCase().replace(/\s/g, '');
}

function colorsMatch(color1: string, color2: string): boolean {
    return normalizeColor(color1) === normalizeColor(color2);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}

function colorDistance(color1: string, color2: string): number {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);
    if (!rgb1 || !rgb2) return Infinity;

    // Euclidean distance in RGB space
    return Math.sqrt(
        Math.pow(rgb1.r - rgb2.r, 2) +
            Math.pow(rgb1.g - rgb2.g, 2) +
            Math.pow(rgb1.b - rgb2.b, 2)
    );
}

// ============================================
// AUDITORIA DE CORES
// ============================================

function auditColors(): ColorToken[] {
    const results: ColorToken[] = [];

    // Primary
    results.push({
        name: 'primary-500',
        frontoffice: FO_COLORS.primary,
        designSystem: DS_COLORS.primary[500],
        status: colorsMatch(FO_COLORS.primary, DS_COLORS.primary[500])
            ? 'match'
            : 'mismatch',
        impact: 'critical',
    });

    // Secondary
    results.push({
        name: 'secondary-500',
        frontoffice: FO_COLORS.secondary,
        designSystem: DS_COLORS.secondary[500],
        status: colorsMatch(FO_COLORS.secondary, DS_COLORS.secondary[500])
            ? 'match'
            : 'mismatch',
        impact: 'high',
    });

    // Success
    results.push({
        name: 'success-500',
        frontoffice: FO_COLORS.success,
        designSystem: DS_COLORS.success[500],
        status: colorsMatch(FO_COLORS.success, DS_COLORS.success[500])
            ? 'match'
            : 'mismatch',
        impact: 'high',
    });

    // Danger/Error
    results.push({
        name: 'error-500 (danger)',
        frontoffice: FO_COLORS.danger,
        designSystem: DS_COLORS.error[500],
        status: colorsMatch(FO_COLORS.danger, DS_COLORS.error[500])
            ? 'match'
            : 'mismatch',
        impact: 'critical',
    });

    // Warning
    results.push({
        name: 'warning-500',
        frontoffice: FO_COLORS.warning,
        designSystem: DS_COLORS.warning[500],
        status: colorsMatch(FO_COLORS.warning, DS_COLORS.warning[500])
            ? 'match'
            : 'mismatch',
        impact: 'critical',
    });

    // Legend colors
    results.push({
        name: 'legend-advanced',
        frontoffice: FO_COLORS.legendAdvanced,
        designSystem: DS_COLORS.primary[500],
        status: colorsMatch(FO_COLORS.legendAdvanced, DS_COLORS.primary[500])
            ? 'match'
            : 'mismatch',
        impact: 'high',
    });

    results.push({
        name: 'legend-basic',
        frontoffice: FO_COLORS.legendBasic,
        designSystem: DS_COLORS.warning[500],
        status: colorsMatch(FO_COLORS.legendBasic, DS_COLORS.warning[500])
            ? 'match'
            : 'mismatch',
        impact: 'high',
    });

    return results;
}

// ============================================
// AUDITORIA DE COMPONENTES
// ============================================

function auditComponents(): ComponentAudit[] {
    const components: ComponentAudit[] = [
        {
            name: 'Badge',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'background-color',
                'color',
                'border-radius',
                'padding',
                'font-size',
            ],
            status: 'pending',
            issues: [],
        },
        {
            name: 'Button',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'background-color',
                'color',
                'border',
                'border-radius',
                'padding',
                'height',
                'font-weight',
            ],
            status: 'pending',
            issues: [],
        },
        {
            name: 'Card',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'background-color',
                'border',
                'border-radius',
                'box-shadow',
                'padding',
            ],
            status: 'pending',
            issues: [],
        },
        {
            name: 'Input',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'border-color',
                'border-radius',
                'height',
                'padding',
                'background-color',
            ],
            status: 'pending',
            issues: [],
        },
        {
            name: 'Select',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'border-color',
                'border-radius',
                'background-color',
                'padding',
            ],
            status: 'pending',
            issues: [],
        },
        {
            name: 'Table',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'border-color',
                'background-color',
                'padding',
                'font-size',
            ],
            status: 'pending',
            issues: [],
        },
        {
            name: 'Modal/Dialog',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'background-color',
                'border-radius',
                'box-shadow',
                'overlay-color',
            ],
            status: 'pending',
            issues: [],
        },
        {
            name: 'Progress',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'background-color',
                'fill-color',
                'height',
                'border-radius',
            ],
            status: 'pending',
            issues: [],
        },
        {
            name: 'Tabs',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'border-color',
                'active-color',
                'background-color',
            ],
            status: 'pending',
            issues: [],
        },
        {
            name: 'Legend',
            frontofficeExists: true,
            storyExists: true,
            cssPropertiesToCheck: [
                'background-color',
                'border-radius',
                'padding',
            ],
            status: 'pending',
            issues: [],
        },
    ];

    return components;
}

// ============================================
// RELATÓRIO
// ============================================

function generateReport(): void {
    console.log('\n╔══════════════════════════════════════════════════════════════╗');
    console.log('║       🔍 CSS AUDIT: FRONTOFFICE vs DESIGN SYSTEM             ║');
    console.log('╚══════════════════════════════════════════════════════════════╝\n');

    // Auditoria de cores
    console.log('📊 AUDITORIA DE CORES');
    console.log('─'.repeat(60));

    const colorResults = auditColors();
    let matchCount = 0;
    let mismatchCount = 0;

    colorResults.forEach((token) => {
        const statusIcon = token.status === 'match' ? '✅' : '⚠️ ';
        const impactIcon =
            token.impact === 'critical'
                ? '🔴'
                : token.impact === 'high'
                  ? '🟠'
                  : '🟡';

        console.log(`${statusIcon} ${token.name}`);
        console.log(`   Frontoffice:   ${token.frontoffice}`);
        console.log(`   Design System: ${token.designSystem}`);

        if (token.status === 'mismatch') {
            const distance = colorDistance(
                token.frontoffice!,
                token.designSystem
            );
            console.log(`   ${impactIcon} Diferença: ${distance.toFixed(1)} (distância RGB)`);
            mismatchCount++;
        } else {
            matchCount++;
        }
        console.log('');
    });

    console.log('─'.repeat(60));
    console.log(`📈 Resumo: ${matchCount} sincronizados, ${mismatchCount} divergentes\n`);

    // Auditoria de componentes
    console.log('\n📦 COMPONENTES PARA VALIDAÇÃO VISUAL');
    console.log('─'.repeat(60));

    const components = auditComponents();
    components.forEach((comp) => {
        console.log(`⏳ ${comp.name}`);
        console.log(`   Propriedades: ${comp.cssPropertiesToCheck.join(', ')}`);
    });

    console.log('─'.repeat(60));
    console.log(`📋 Total: ${components.length} componentes para validar\n`);

    // Recomendações
    console.log('\n🛠️  AÇÕES RECOMENDADAS');
    console.log('─'.repeat(60));
    console.log('1. Atualizar $primary no Frontoffice: #6e63e8 → #7367F0');
    console.log('2. Atualizar $danger no Frontoffice: #ea5455 → #FF4B50');
    console.log('3. Atualizar $warning no Frontoffice: #ffd643 → #FF9F43');
    console.log('4. Criar mapeamento de CSS vars para SCSS vars');
    console.log('5. Validar visualmente cada componente lado a lado');
    console.log('─'.repeat(60));
}

// ============================================
// EXPORTAR RELATÓRIO JSON
// ============================================

function exportAuditJson(): void {
    const audit = {
        timestamp: new Date().toISOString(),
        colors: auditColors(),
        components: auditComponents(),
        recommendations: [
            'Atualizar $primary: #6e63e8 → #7367F0',
            'Atualizar $danger: #ea5455 → #FF4B50',
            'Atualizar $warning: #ffd643 → #FF9F43',
            'Criar mapeamento CSS vars → SCSS vars',
            'Validação visual de componentes',
        ],
    };

    const outputPath = path.join(__dirname, '../specs/css-audit-results.json');
    fs.writeFileSync(outputPath, JSON.stringify(audit, null, 2));
    console.log(`\n📄 Relatório JSON salvo em: ${outputPath}`);
}

// ============================================
// EXECUÇÃO
// ============================================

generateReport();
exportAuditJson();
