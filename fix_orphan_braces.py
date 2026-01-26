#!/usr/bin/env python3
"""Fix CSS removendo chaves órfãs de forma inteligente"""

from pathlib import Path
import re

css_path = Path("apps/storybook/.storybook/custom-styles.css")
content = css_path.read_text(encoding='utf-8')
lines = content.split('\n')

print(f"Total de linhas: {len(lines)}")

# Encontra linhas que são apenas }
orphan_braces = []
for i, line in enumerate(lines):
    stripped = line.strip()
    if stripped == '}' and i > 0:
        prev_line = lines[i-1].strip()
        # Se a linha anterior termina com } também, é órfã
        if prev_line.endswith('}') or prev_line.startswith('/*'):
            orphan_braces.append((i, line))
            print(f"Linha {i+1}: Chave órfã encontrada após '{prev_line[:50]}'")

print(f"\nEncontradas {len(orphan_braces)} chave(s) órfã(s)")

# Remove as linhas (de trás para frente para não mudar índices)
for idx, _ in reversed(orphan_braces):
    print(f"Removendo linha {idx+1}")
    del lines[idx]

# Escreve de volta
new_content = '\n'.join(lines)
css_path.write_text(new_content, encoding='utf-8')

print(f"\n✓ Arquivo corrigido!")
print(f"✓ Novo total de linhas: {len(lines)}")
print(f"✓ Tamanho: {len(new_content)} bytes")
