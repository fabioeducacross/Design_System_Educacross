#!/usr/bin/env python3
"""
Debug Script para Educacross Design System Storybook
Valida CSS, verifica sintaxe e testa carregamento
"""

import re
import sys
from pathlib import Path

# Cores para output
class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'
    BOLD = '\033[1m'

def print_success(msg):
    print(f"{Colors.GREEN}✓{Colors.RESET} {msg}")

def print_error(msg):
    print(f"{Colors.RED}✗{Colors.RESET} {msg}")

def print_warning(msg):
    print(f"{Colors.YELLOW}⚠{Colors.RESET} {msg}")

def print_info(msg):
    print(f"{Colors.BLUE}ℹ{Colors.RESET} {msg}")

def print_header(msg):
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.RESET}")
    print(f"{Colors.BOLD}{msg}{Colors.RESET}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*60}{Colors.RESET}\n")

def validate_css_syntax(css_path: Path):
    """Valida sintaxe CSS básica"""
    print_header("VALIDAÇÃO DE SINTAXE CSS")
    
    if not css_path.exists():
        print_error(f"Arquivo não encontrado: {css_path}")
        return False
    
    print_info(f"Lendo arquivo: {css_path}")
    content = css_path.read_text(encoding='utf-8')
    
    errors = []
    warnings = []
    
    # Contadores
    open_braces = 0
    line_num = 0
    
    lines = content.split('\n')
    
    for i, line in enumerate(lines, 1):
        line_num = i
        stripped = line.strip()
        
        # Ignora comentários e linhas vazias
        if stripped.startswith('/*') or stripped.startswith('*') or not stripped:
            continue
            
        # Conta chaves
        open_braces += line.count('{')
        open_braces -= line.count('}')
        
        # Verifica ponto e vírgula faltando em propriedades
        if ':' in line and not line.strip().endswith((';', '{', '}')):
            # Verifica se não é um seletor ou comentário
            if not re.match(r'^\s*[.#@\w-]+\s*{?\s*$', stripped) and not stripped.startswith('/*'):
                if not stripped.endswith('!important') and '{' not in stripped:
                    warnings.append(f"Linha {i}: Possível ponto e vírgula faltando - '{stripped[:50]}'")
        
        # Verifica fechamento de valor CSS
        if re.search(r':\s*var\([^)]*$', line):
            errors.append(f"Linha {i}: Parêntese não fechado em var() - '{stripped[:60]}'")
        
        # Verifica propriedades CSS mal formadas
        if re.search(r':\s*[^;{}\s]+\s+[^;{}\s]+\s*$', stripped):
            if not re.search(r'!important', stripped) and '{' not in stripped:
                warnings.append(f"Linha {i}: Propriedade possivelmente mal formada - '{stripped[:50]}'")
    
    # Verifica balance de chaves
    if open_braces != 0:
        errors.append(f"ERRO CRÍTICO: {abs(open_braces)} chave(s) {'não fechada(s)' if open_braces > 0 else 'extra'}")
    
    # Verifica padrões problemáticos
    if re.search(r'\w+\s*\{[^}]*\{', content, re.MULTILINE):
        warnings.append("Possível bloco CSS aninhado incorretamente")
    
    # Output
    print_info(f"Total de linhas: {len(lines)}")
    print_info(f"Tamanho do arquivo: {len(content)} bytes")
    
    if errors:
        print(f"\n{Colors.RED}{Colors.BOLD}ERROS ENCONTRADOS ({len(errors)}):{Colors.RESET}")
        for err in errors:
            print_error(err)
    
    if warnings:
        print(f"\n{Colors.YELLOW}{Colors.BOLD}AVISOS ({len(warnings)}):{Colors.RESET}")
        for warn in warnings[:10]:  # Limita a 10 avisos
            print_warning(warn)
        if len(warnings) > 10:
            print_warning(f"... e mais {len(warnings) - 10} avisos")
    
    if not errors and not warnings:
        print_success("Nenhum erro ou aviso encontrado!")
        return True
    elif not errors:
        print_success("Nenhum erro crítico encontrado (apenas avisos)")
        return True
    else:
        return False

def find_unclosed_blocks(css_path: Path):
    """Encontra blocos CSS não fechados"""
    print_header("ANÁLISE DE BLOCOS CSS")
    
    content = css_path.read_text(encoding='utf-8')
    lines = content.split('\n')
    
    stack = []
    issues = []
    
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        
        # Ignora comentários
        if stripped.startswith('/*') or stripped.startswith('*'):
            continue
        
        # Encontra seletores (linha que termina com {)
        if '{' in line:
            # Extrai o seletor
            selector = line.split('{')[0].strip()
            if selector and not selector.startswith('/*'):
                stack.append((i, selector))
        
        # Encontra fechamentos
        if '}' in line:
            if stack:
                stack.pop()
            else:
                issues.append(f"Linha {i}: Chave de fechamento '}}' sem abertura correspondente")
    
    # Verifica se sobrou algo na pilha
    if stack:
        print_error(f"Encontrados {len(stack)} bloco(s) não fechado(s):")
        for line_num, selector in stack[-5:]:  # Mostra últimos 5
            print_error(f"  Linha {line_num}: {selector}")
        return False
    
    if issues:
        print_error("Problemas encontrados:")
        for issue in issues:
            print_error(f"  {issue}")
        return False
    
    print_success("Todos os blocos CSS estão corretamente fechados!")
    return True

def check_imports(storybook_dir: Path):
    """Verifica se os imports estão corretos"""
    print_header("VERIFICAÇÃO DE IMPORTS")
    
    preview_ts = storybook_dir / '.storybook' / 'preview.ts'
    custom_css = storybook_dir / '.storybook' / 'custom-styles.css'
    
    if not preview_ts.exists():
        print_error(f"preview.ts não encontrado em {preview_ts}")
        return False
    
    if not custom_css.exists():
        print_error(f"custom-styles.css não encontrado em {custom_css}")
        return False
    
    preview_content = preview_ts.read_text(encoding='utf-8')
    
    if './custom-styles.css' in preview_content or '"./custom-styles.css"' in preview_content:
        print_success("Import do custom-styles.css encontrado em preview.ts")
        
        # Mostra a linha do import
        for i, line in enumerate(preview_content.split('\n'), 1):
            if 'custom-styles' in line:
                print_info(f"  Linha {i}: {line.strip()}")
        return True
    else:
        print_error("Import do custom-styles.css NÃO encontrado em preview.ts")
        return False

def analyze_css_structure(css_path: Path):
    """Analisa estrutura do CSS"""
    print_header("ANÁLISE DE ESTRUTURA CSS")
    
    content = css_path.read_text(encoding='utf-8')
    
    # Conta elementos
    selectors = len(re.findall(r'[\w.-]+\s*\{', content))
    properties = len(re.findall(r'[\w-]+\s*:', content))
    comments = len(re.findall(r'/\*.*?\*/', content, re.DOTALL))
    media_queries = len(re.findall(r'@media', content))
    keyframes = len(re.findall(r'@keyframes', content))
    
    print_info(f"Seletores: {selectors}")
    print_info(f"Propriedades: {properties}")
    print_info(f"Comentários: {comments}")
    print_info(f"Media queries: {media_queries}")
    print_info(f"Keyframes: {keyframes}")
    
    # Verifica uso de variáveis CSS
    css_vars = re.findall(r'--[\w-]+', content)
    unique_vars = set(css_vars)
    print_info(f"Variáveis CSS definidas: {len(unique_vars)}")
    
    # Lista algumas variáveis principais
    main_vars = [v for v in unique_vars if 'educacross' in v]
    if main_vars:
        print_info(f"Variáveis Educacross: {', '.join(sorted(main_vars)[:5])}")
    
    return True

def main():
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("╔═══════════════════════════════════════════════════════════╗")
    print("║   EDUCACROSS STORYBOOK CSS DEBUG TOOL                    ║")
    print("║   Validador e Analisador de CSS                          ║")
    print("╚═══════════════════════════════════════════════════════════╝")
    print(f"{Colors.RESET}\n")
    
    # Detecta diretório
    current_dir = Path.cwd()
    
    # Tenta diferentes caminhos
    possible_paths = [
        current_dir / 'apps' / 'storybook' / '.storybook' / 'custom-styles.css',
        current_dir / '.storybook' / 'custom-styles.css',
        Path(__file__).parent / 'apps' / 'storybook' / '.storybook' / 'custom-styles.css',
    ]
    
    css_path = None
    storybook_dir = None
    
    for path in possible_paths:
        if path.exists():
            css_path = path
            storybook_dir = path.parent.parent
            break
    
    if not css_path:
        print_error("Não foi possível encontrar custom-styles.css")
        print_info("Procurado em:")
        for path in possible_paths:
            print(f"  - {path}")
        sys.exit(1)
    
    print_success(f"Encontrado CSS em: {css_path}")
    print_info(f"Diretório Storybook: {storybook_dir}\n")
    
    # Executa validações
    results = []
    
    # 1. Valida sintaxe
    results.append(("Sintaxe CSS", validate_css_syntax(css_path)))
    
    # 2. Verifica blocos
    results.append(("Blocos CSS", find_unclosed_blocks(css_path)))
    
    # 3. Verifica imports
    results.append(("Imports", check_imports(storybook_dir)))
    
    # 4. Analisa estrutura
    results.append(("Estrutura", analyze_css_structure(css_path)))
    
    # Resumo final
    print_header("RESUMO FINAL")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        if result:
            print_success(f"{test_name}: PASSOU")
        else:
            print_error(f"{test_name}: FALHOU")
    
    print(f"\n{Colors.BOLD}Resultado: {passed}/{total} testes passaram{Colors.RESET}")
    
    if passed == total:
        print(f"\n{Colors.GREEN}{Colors.BOLD}✓ TODOS OS TESTES PASSARAM!{Colors.RESET}")
        print(f"{Colors.GREEN}O CSS está válido e pronto para uso.{Colors.RESET}\n")
        sys.exit(0)
    else:
        print(f"\n{Colors.RED}{Colors.BOLD}✗ ALGUNS TESTES FALHARAM{Colors.RESET}")
        print(f"{Colors.RED}Corrija os erros acima antes de continuar.{Colors.RESET}\n")
        sys.exit(1)

if __name__ == "__main__":
    main()
