#!/usr/bin/env python3
"""Remove linhas 465 e 469 que contêm chaves extras"""

from pathlib import Path

css_path = Path("apps/storybook/.storybook/custom-styles.css")
content = css_path.read_text(encoding='utf-8')
lines = content.split('\n')

# Remove linhas 465 e 469 (índices 464 e 468)
print(f"Linha 465: '{lines[464]}'")
print(f"Linha 469: '{lines[468]}'")

# Remove as linhas
del lines[468]  # Remove 469 primeiro (índice maior)
del lines[464]  # Depois remove 465

# Escreve de volta
new_content = '\n'.join(lines)
css_path.write_text(new_content, encoding='utf-8')

print("\n✓ Chaves extras removidas!")
print(f"✓ Novo tamanho: {len(new_content)} bytes")
print(f"✓ Total de linhas: {len(lines)}")
