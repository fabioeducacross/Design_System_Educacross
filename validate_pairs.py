#!/usr/bin/env python3
"""Debug CSS com stack tracking detalhado"""

from pathlib import Path
import re

css_path = Path("apps/storybook/.storybook/custom-styles.css")
lines = css_path.read_text(encoding='utf-8').split('\n')

stack = []  # pilha de blocos abertos
problems = []

for i, line in enumerate(lines, 1):
    stripped = line.strip()
    
    # Conta { e }
    opens = line.count('{')
    closes = line.count('}')
    
    for _ in range(opens):
        # Guarda qual linha abriu o bloco
        stack.append((i, line[:50]))
    
    for _ in range(closes):
        if stack:
            opener = stack.pop()
        else:
            # Fechamento sem abertura!
            problems.append(f"❌ Linha {i}: Fechamento '}}' sem abertura correspondente")
            problems.append(f"   Conteúdo: {line[:80]}")

print(f"Total de linhas: {len(lines)}")
print(f"Chaves na pilha no final: {len(stack)}")

if problems:
    print(f"\n{'='*70}")
    print("PROBLEMAS ENCONTRADOS:")
    print('='*70)
    for p in problems:
        print(p)
else:
    print("\n✓ Nenhum fechamento sem abertura detectado!")

if stack:
    print(f"\n{'='*70}")
    print(f"BLOCOS NÃO FECHADOS ({len(stack)}):")
    print('='*70)
    for line_num, content in stack:
        print(f"Linha {line_num}: {content}")
