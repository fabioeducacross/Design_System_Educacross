#!/usr/bin/env node
/**
 * Script para buscar um nó específico do Figma
 * Uso: tsx scripts/fetch-figma-node.ts <node-id>
 */

import { config } from "dotenv";
import { writeFile } from "fs/promises";
import { resolve } from "path";

config();

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY || "mouf1Vc5WyhnDoYNBM1rWn";
const FIGMA_API = "https://api.figma.com/v1";

async function fetchFigmaNode(nodeId: string) {
  if (!FIGMA_TOKEN) {
    console.error("❌ FIGMA_TOKEN não encontrado no .env");
    console.log("💡 Obtenha seu token em: https://www.figma.com/settings");
    process.exit(1);
  }

  console.log(`🔄 Buscando nó ${nodeId} do Figma...`);
  console.log(`📁 Arquivo: ${FIGMA_FILE_KEY}`);

  // Buscar arquivo completo
  const fileResponse = await fetch(
    `${FIGMA_API}/files/${FIGMA_FILE_KEY}?ids=${nodeId}`,
    {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
      },
    }
  );

  if (!fileResponse.ok) {
    throw new Error(`Erro ao buscar Figma: ${fileResponse.status} ${fileResponse.statusText}`);
  }

  const fileData = await fileResponse.json();

  // Buscar imagens do nó
  const imagesResponse = await fetch(
    `${FIGMA_API}/images/${FIGMA_FILE_KEY}?ids=${nodeId}&format=svg`,
    {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN,
      },
    }
  );

  const imagesData = imagesResponse.ok ? await imagesResponse.json() : null;

  const result = {
    file: fileData,
    images: imagesData,
    nodeId,
    timestamp: new Date().toISOString(),
  };

  // Salvar resultado
  const outputPath = resolve(process.cwd(), "figma-node-data.json");
  await writeFile(outputPath, JSON.stringify(result, null, 2), "utf-8");

  console.log("✅ Dados salvos em: figma-node-data.json");
  console.log("\n📋 Estrutura do nó:");
  
  // Encontrar o nó na resposta
  if (fileData.nodes && fileData.nodes[nodeId]) {
    const node = fileData.nodes[nodeId].document;
    console.log(`\nNome: ${node.name}`);
    console.log(`Tipo: ${node.type}`);
    
    if (node.absoluteBoundingBox) {
      console.log(`Dimensões: ${node.absoluteBoundingBox.width}x${node.absoluteBoundingBox.height}`);
    }

    if (node.children) {
      console.log(`\nFilhos (${node.children.length}):`);
      node.children.forEach((child: any, i: number) => {
        console.log(`  ${i + 1}. ${child.name} (${child.type})`);
      });
    }

    // Extrair estilos
    if (node.fills) {
      console.log(`\nCores:`);
      node.fills.forEach((fill: any) => {
        if (fill.type === "SOLID") {
          const r = Math.round(fill.color.r * 255);
          const g = Math.round(fill.color.g * 255);
          const b = Math.round(fill.color.b * 255);
          console.log(`  rgba(${r}, ${g}, ${b}, ${fill.opacity || 1})`);
        }
      });
    }

    if (node.strokes && node.strokes.length > 0) {
      console.log(`\nBordas:`);
      node.strokes.forEach((stroke: any) => {
        if (stroke.type === "SOLID") {
          const r = Math.round(stroke.color.r * 255);
          const g = Math.round(stroke.color.g * 255);
          const b = Math.round(stroke.color.b * 255);
          console.log(`  rgba(${r}, ${g}, ${b}, ${stroke.opacity || 1})`);
        }
      });
      if (node.strokeWeight) {
        console.log(`  Espessura: ${node.strokeWeight}px`);
      }
    }

    if (node.cornerRadius) {
      console.log(`\nBorder Radius: ${node.cornerRadius}px`);
    }

    if (node.effects && node.effects.length > 0) {
      console.log(`\nEfeitos:`);
      node.effects.forEach((effect: any) => {
        console.log(`  ${effect.type}: ${JSON.stringify(effect)}`);
      });
    }

    // Texto
    if (node.characters) {
      console.log(`\nTexto: "${node.characters}"`);
      if (node.style) {
        console.log(`  Font: ${node.style.fontFamily} ${node.style.fontWeight}`);
        console.log(`  Size: ${node.style.fontSize}px`);
        console.log(`  Line Height: ${node.style.lineHeightPx}px`);
      }
    }
  }

  return result;
}

// Executar
const nodeId = process.argv[2] || process.env.FIGMA_TOKENS_NODE_ID || "822-8191";

fetchFigmaNode(nodeId)
  .then(() => {
    console.log("\n✨ Concluído!");
  })
  .catch((error) => {
    console.error("\n❌ Erro:", error.message);
    process.exit(1);
  });
