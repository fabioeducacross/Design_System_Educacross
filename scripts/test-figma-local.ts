#!/usr/bin/env node
/**
 * Testa conexão com servidor Figma local e busca design específico
 */

import { config } from "dotenv";

config();

const FIGMA_LOCAL_URL = process.env.FIGMA_LOCAL_URL || "http://127.0.0.1:3845/mcp";
const FILE_KEY = process.env.FIGMA_FILE_KEY || "mouf1Vc5WyhnDoYNBM1rWn";
const NODE_ID = process.env.FIGMA_NODE_ID || "822-8191";

async function testConnection() {
  console.log("🔄 Conectando ao servidor Figma local...");
  console.log(`📍 URL: ${FIGMA_LOCAL_URL}`);
  console.log(`📁 Arquivo: ${FILE_KEY}`);
  console.log(`🎯 Nó: ${NODE_ID}`);
  console.log("=".repeat(60));

  try {
    // Testar se o servidor está respondendo
    const healthCheck = await fetch(FIGMA_LOCAL_URL, {
      method: "GET",
    }).catch(() => null);

    if (!healthCheck || !healthCheck.ok) {
      console.error("❌ Servidor local não está respondendo");
      console.log("💡 Verifique se o Figma está aberto e o plugin está ativo");
      console.log("💡 URL esperada: http://127.0.0.1:3845/mcp");
      process.exit(1);
    }

    console.log("✅ Servidor local conectado!");

    // Listar recursos disponíveis
    const listResourcesRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "resources/list",
      params: {},
    };

    const listResponse = await fetch(FIGMA_LOCAL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listResourcesRequest),
    });

    const resources = await listResponse.json();
    
    console.log("\n📚 Recursos disponíveis:");
    if (resources.result?.resources) {
      resources.result.resources.forEach((resource: any) => {
        console.log(`  - ${resource.name} (${resource.uri})`);
      });
    } else {
      console.log("  Nenhum recurso listado");
    }

    // Buscar nó específico
    const readNodeRequest = {
      jsonrpc: "2.0",
      id: 2,
      method: "resources/read",
      params: {
        uri: `figma://file/${FILE_KEY}/node/${NODE_ID}`,
      },
    };

    console.log(`\n🎯 Buscando nó ${NODE_ID}...`);

    const nodeResponse = await fetch(FIGMA_LOCAL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readNodeRequest),
    });

    const nodeData = await nodeResponse.json();

    if (nodeData.error) {
      console.error("❌ Erro ao buscar nó:", nodeData.error.message);
      console.log("\n💡 Tentando listar ferramentas disponíveis...");
      
      // Listar ferramentas
      const toolsRequest = {
        jsonrpc: "2.0",
        id: 3,
        method: "tools/list",
        params: {},
      };

      const toolsResponse = await fetch(FIGMA_LOCAL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toolsRequest),
      });

      const tools = await toolsResponse.json();
      
      if (tools.result?.tools) {
        console.log("\n🔧 Ferramentas disponíveis:");
        tools.result.tools.forEach((tool: any) => {
          console.log(`  - ${tool.name}: ${tool.description}`);
        });
      }
    } else {
      console.log("✅ Nó encontrado!");
      console.log("\n📋 Dados do design:");
      console.log(JSON.stringify(nodeData, null, 2));
    }

  } catch (error: any) {
    console.error("❌ Erro:", error.message);
    console.log("\n🔍 Troubleshooting:");
    console.log("  1. Verifique se o Figma está aberto");
    console.log("  2. Verifique se o plugin MCP está ativo");
    console.log("  3. Confirme a porta: http://127.0.0.1:3845/mcp");
    process.exit(1);
  }
}

testConnection();
