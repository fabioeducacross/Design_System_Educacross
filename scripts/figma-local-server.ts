#!/usr/bin/env node
/**
 * Servidor local para conectar MCP ao Figma
 * Permite ao Claude acessar designs e tokens em tempo real
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { config } from "dotenv";

config();

const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
const FIGMA_API = "https://api.figma.com/v1";

// Criar servidor MCP
const server = new Server(
  {
    name: "educacross-figma",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// Recurso: Arquivo do Figma
server.setRequestHandler("resources/list", async () => {
  return {
    resources: [
      {
        uri: `figma://file/${FIGMA_FILE_KEY}`,
        name: "Design System Educacross",
        mimeType: "application/json",
        description: "Arquivo principal do Design System no Figma",
      },
      {
        uri: "figma://tokens/colors",
        name: "Tokens de Cores",
        mimeType: "application/json",
        description: "Paleta de cores do sistema",
      },
      {
        uri: "figma://tokens/typography",
        name: "Tokens de Tipografia",
        mimeType: "application/json",
        description: "Escalas e estilos tipográficos",
      },
    ],
  };
});

// Recurso: Ler conteúdo do Figma
server.setRequestHandler("resources/read", async (request) => {
  const uri = request.params.uri as string;

  if (uri.startsWith("figma://file/")) {
    const response = await fetch(`${FIGMA_API}/files/${FIGMA_FILE_KEY}`, {
      headers: { "X-Figma-Token": FIGMA_TOKEN || "" },
    });
    
    const data = await response.json();
    
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  if (uri === "figma://tokens/colors") {
    const response = await fetch(
      `${FIGMA_API}/files/${FIGMA_FILE_KEY}/variables/local`,
      {
        headers: { "X-Figma-Token": FIGMA_TOKEN || "" },
      }
    );
    
    const data = await response.json();
    
    return {
      contents: [
        {
          uri,
          mimeType: "application/json",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  throw new Error(`URI não suportada: ${uri}`);
});

// Ferramenta: Buscar componente específico
server.setRequestHandler("tools/list", async () => {
  return {
    tools: [
      {
        name: "get_figma_component",
        description: "Busca um componente específico do Figma por nome",
        inputSchema: {
          type: "object",
          properties: {
            componentName: {
              type: "string",
              description: "Nome do componente (ex: Button, Card, Input)",
            },
          },
          required: ["componentName"],
        },
      },
      {
        name: "compare_design_vs_code",
        description: "Compara o design do Figma com o código implementado",
        inputSchema: {
          type: "object",
          properties: {
            componentName: {
              type: "string",
              description: "Nome do componente a comparar",
            },
          },
          required: ["componentName"],
        },
      },
      {
        name: "extract_tokens",
        description: "Extrai tokens de design (cores, espaçamentos, tipografia) do Figma",
        inputSchema: {
          type: "object",
          properties: {
            tokenType: {
              type: "string",
              enum: ["colors", "spacing", "typography", "effects", "all"],
              description: "Tipo de token a extrair",
            },
          },
          required: ["tokenType"],
        },
      },
    ],
  };
});

// Implementar ferramentas
server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_figma_component") {
    const componentName = (args as any).componentName;
    
    const response = await fetch(`${FIGMA_API}/files/${FIGMA_FILE_KEY}`, {
      headers: { "X-Figma-Token": FIGMA_TOKEN || "" },
    });
    
    const data = await response.json();
    
    // Buscar componente na árvore
    function findComponent(node: any, name: string): any {
      if (node.name === name && node.type === "COMPONENT") {
        return node;
      }
      
      if (node.children) {
        for (const child of node.children) {
          const found = findComponent(child, name);
          if (found) return found;
        }
      }
      
      return null;
    }
    
    const component = findComponent(data.document, componentName);
    
    return {
      content: [
        {
          type: "text",
          text: component
            ? JSON.stringify(component, null, 2)
            : `Componente "${componentName}" não encontrado`,
        },
      ],
    };
  }

  if (name === "extract_tokens") {
    const tokenType = (args as any).tokenType;
    
    const response = await fetch(
      `${FIGMA_API}/files/${FIGMA_FILE_KEY}/variables/local`,
      {
        headers: { "X-Figma-Token": FIGMA_TOKEN || "" },
      }
    );
    
    const data = await response.json();
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(data, null, 2),
        },
      ],
    };
  }

  throw new Error(`Ferramenta não implementada: ${name}`);
});

// Iniciar servidor
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  
  console.error("🎨 Servidor MCP Figma iniciado");
  console.error(`📁 Arquivo: ${FIGMA_FILE_KEY}`);
}

main().catch((error) => {
  console.error("Erro ao iniciar servidor:", error);
  process.exit(1);
});
