#!/usr/bin/env python3
"""Conta e identifica chaves desbalanceadas no CSS"""

from pathlib import Path

css_path = Path("apps/storybook/.storybook/custom-styles.css")
content = css_path.read_text(encoding='utf-8')

lines = content.split('\n')
stack = []
balance = 0

print(f"Total de linhas: {len(lines)}\n")

for i, line in enumerate(lines, 1):
    stripped = line.strip()
    
    # Ignora comentários
    if stripped.startswith('/*') or stripped.startswith('*'):
        continue
    
    open_count = line.count('{')
    close_count = line.count('}')
    
    balance += open_count
    balance -= close_count
    
    if open_count > 0:
        print(f"Linha {i:4d} [+{open_count}] Balance: {balance:3d} | {stripped[:70]}")
    
    if close_count > 0:
        print(f"Linha {i:4d} [-{close_count}] Balance: {balance:3d} | {stripped[:70]}")

print(f"\n{'='*80}")
print(f"BALANCE FINAL: {balance}")
print(f"{'='*80}")

if balance == 0:
    print("✓ Arquivo balanceado corretamente!")
elif balance > 0:
    print(f"✗ ERRO: {balance} chave(s) de abertura sem fechamento")
elif balance < 0:
    print(f"✗ ERRO: {abs(balance)} chave(s) de fechamento extra")
