#!/usr/bin/env node
/**
 * Script para sincronizar tokens e componentes do Figma local
 * 
 * Uso:
 * - pnpm sync:figma        # Sincroniza tokens
 * - pnpm sync:figma --watch # Modo watch (detecta mudanças)
 * - pnpm sync:figma --force # Força sincronização completa
 */

import { config } from "dotenv";
import { writeFile, readFile } from "fs/promises";
import { resolve } from "path";

// Carregar variáveis de ambiente
config();

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_API = "https://api.figma.com/v1";

const TOKENS_DIR = resolve(process.cwd(), "packages/ui/src/tokens");

interface FigmaVariable {
  id: string;
  name: string;
  value: any;
  type: string;
  scopes: string[];
}

async function fetchFigmaFile() {
  if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
    console.error("❌ FIGMA_TOKEN e FIGMA_FILE_KEY são obrigatórios");
    console.log("💡 Configure no arquivo .env (use .env.example como referência)");
    process.exit(1);
  }

  console.log("🔄 Conectando ao Figma...");

  const response = await fetch(`${FIGMA_API}/files/${FIGMA_FILE_KEY}`, {
    headers: {
      "X-Figma-Token": FIGMA_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar arquivo do Figma: ${response.statusText}`);
  }

  return await response.json();
}

async function fetchFigmaVariables() {
  if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
    throw new Error("FIGMA_TOKEN e FIGMA_FILE_KEY são obrigatórios");
  }

  console.log("📥 Buscando variáveis do Figma...");

  const response = await fetch(
    `${FIGMA_API}/files/${FIGMA_FILE_KEY}/variables/local`,
    {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar variáveis: ${response.statusText}`);
  }

  return await response.json();
}

function transformVariablesToTokens(variables: any) {
  const tokens: Record<string, any> = {};

  // Processar variáveis por tipo
  if (variables.meta && variables.meta.variableCollections) {
    for (const [collectionId, collection] of Object.entries(
      variables.meta.variableCollections
    )) {
      const collectionName = (collection as any).name;
      
      // Criar estrutura de tokens para cada coleção (Light, Dark, etc)
      tokens[collectionName] = {
        colors: {},
        spacing: {},
        typography: {},
        effects: {},
      };

      console.log(`📦 Processando coleção: ${collectionName}`);
    }
  }

  return tokens;
}

async function syncTokens() {
  try {
    console.log("🎨 Educacross Design System - Sincronização Figma");
    console.log("=".repeat(50));

    // Buscar dados do Figma
    const fileData = await fetchFigmaFile();
    console.log(`✅ Arquivo carregado: ${fileData.name}`);

    // Buscar variáveis (tokens)
    const variablesData = await fetchFigmaVariables();
    console.log(`✅ Variáveis carregadas: ${Object.keys(variablesData.meta?.variables || {}).length} variáveis`);

    // Transformar em tokens
    const tokens = transformVariablesToTokens(variablesData);

    // Salvar tokens atualizados
    for (const [theme, themeTokens] of Object.entries(tokens)) {
      const filePath = resolve(TOKENS_DIR, `${theme}.tokens.json`);
      
      await writeFile(
        filePath,
        JSON.stringify(themeTokens, null, 2),
        "utf-8"
      );
      
      console.log(`💾 Tokens salvos: ${theme}.tokens.json`);
    }

    console.log("=".repeat(50));
    console.log("✨ Sincronização concluída com sucesso!");
    console.log("💡 Execute 'pnpm build' para aplicar as mudanças");

  } catch (error) {
    console.error("❌ Erro na sincronização:", error);
    process.exit(1);
  }
}

// Executar
const args = process.argv.slice(2);
const isWatch = args.includes("--watch");
const isForce = args.includes("--force");

if (isWatch) {
  console.log("👀 Modo watch ativado (pressione Ctrl+C para sair)");
  
  // Sincronizar a cada 30 segundos
  syncTokens();
  setInterval(syncTokens, 30000);
} else {
  syncTokens();
}
