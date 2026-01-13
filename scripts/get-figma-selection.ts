#!/usr/bin/env node
/**
 * Acessa o frame/nó atualmente selecionado no Figma via MCP local
 */

import { config } from "dotenv";

config();

const FIGMA_LOCAL_URL = process.env.FIGMA_LOCAL_URL || "http://127.0.0.1:3845/mcp";

async function getCurrentSelection() {
  console.log("🎯 Buscando seleção atual no Figma...");
  console.log(`📍 URL: ${FIGMA_LOCAL_URL}\n`);

  try {
    // Tentar endpoint de seleção
    const selectionRequest = {
      jsonrpc: "2.0",
      id: 1,
      method: "figma/get-selection",
      params: {},
    };

    console.log("📤 Requisição:", JSON.stringify(selectionRequest, null, 2));

    const response = await fetch(FIGMA_LOCAL_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectionRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    console.log("\n📥 Resposta completa:");
    console.log(JSON.stringify(data, null, 2));

    if (data.error) {
      console.error("\n❌ Erro:", data.error.message);
      
      // Tentar listar métodos disponíveis
      console.log("\n🔍 Tentando descobrir métodos disponíveis...");
      
      const methodsRequest = {
        jsonrpc: "2.0",
        id: 2,
        method: "rpc.discover",
        params: {},
      };

      const methodsResponse = await fetch(FIGMA_LOCAL_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(methodsRequest),
      });

      if (methodsResponse.ok) {
        const methods = await methodsResponse.json();
        console.log("\n📋 Métodos disponíveis:");
        console.log(JSON.stringify(methods, null, 2));
      }

      return null;
    }

    if (data.result) {
      console.log("\n✅ Seleção obtida!");
      
      const selection = data.result;
      
      if (selection.nodes && selection.nodes.length > 0) {
        console.log(`\n📦 ${selection.nodes.length} nó(s) selecionado(s):\n`);
        
        selection.nodes.forEach((node, index) => {
          console.log(`${index + 1}. ${node.name || 'Sem nome'}`);
          console.log(`   Tipo: ${node.type}`);
          console.log(`   ID: ${node.id}`);
          
          if (node.absoluteBoundingBox) {
            console.log(`   Tamanho: ${node.absoluteBoundingBox.width}x${node.absoluteBoundingBox.height}px`);
          }
          
          if (node.fills && node.fills.length > 0) {
            console.log(`   Cores de fundo:`);
            node.fills.forEach(fill => {
              if (fill.type === "SOLID") {
                const r = Math.round(fill.color.r * 255);
                const g = Math.round(fill.color.g * 255);
                const b = Math.round(fill.color.b * 255);
                const a = fill.opacity !== undefined ? fill.opacity : 1;
                console.log(`     - rgba(${r}, ${g}, ${b}, ${a})`);
                console.log(`       Hex: #${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
              }
            });
          }
          
          if (node.strokes && node.strokes.length > 0) {
            console.log(`   Bordas:`);
            node.strokes.forEach(stroke => {
              if (stroke.type === "SOLID") {
                const r = Math.round(stroke.color.r * 255);
                const g = Math.round(stroke.color.g * 255);
                const b = Math.round(stroke.color.b * 255);
                console.log(`     - rgba(${r}, ${g}, ${b}, 1)`);
              }
            });
            if (node.strokeWeight) {
              console.log(`     Espessura: ${node.strokeWeight}px`);
            }
          }
          
          if (node.cornerRadius !== undefined) {
            console.log(`   Border Radius: ${node.cornerRadius}px`);
          }
          
          if (node.effects && node.effects.length > 0) {
            console.log(`   Efeitos: ${node.effects.map(e => e.type).join(', ')}`);
          }
          
          if (node.characters) {
            console.log(`   Texto: "${node.characters}"`);
            if (node.style) {
              console.log(`   Font: ${node.style.fontFamily} ${node.style.fontWeight}`);
              console.log(`   Tamanho: ${node.style.fontSize}px`);
            }
          }
          
          if (node.children && node.children.length > 0) {
            console.log(`   Filhos: ${node.children.length} elemento(s)`);
          }
          
          console.log();
        });
        
        return selection;
      } else {
        console.log("\n⚠️  Nenhum nó selecionado no Figma");
        console.log("💡 Selecione um frame, componente ou layer no Figma e tente novamente");
        return null;
      }
    }

    return data;

  } catch (error) {
    console.error("\n❌ Erro ao conectar:", error.message);
    console.log("\n🔧 Troubleshooting:");
    console.log("  1. Verifique se o Figma Desktop está aberto");
    console.log("  2. Verifique se o plugin/servidor MCP está ativo");
    console.log("  3. Confirme a URL: http://127.0.0.1:3845/mcp");
    console.log("  4. Tente reiniciar o Figma Desktop");
    
    // Tentar métodos alternativos
    console.log("\n🔄 Tentando métodos alternativos...");
    
    const alternativeMethods = [
      "selection/get",
      "get_current_selection",
      "figma.selection",
      "resources/read?uri=figma://selection",
    ];
    
    for (const method of alternativeMethods) {
      try {
        console.log(`\n   Tentando: ${method}`);
        const altResponse = await fetch(FIGMA_LOCAL_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: Date.now(),
            method: method,
            params: {},
          }),
        });
        
        if (altResponse.ok) {
          const altData = await altResponse.json();
          if (!altData.error) {
            console.log(`   ✅ Funcionou!`);
            console.log(JSON.stringify(altData, null, 2));
            return altData;
          }
        }
      } catch (e) {
        // Continuar tentando outros métodos
      }
    }
    
    process.exit(1);
  }
}

getCurrentSelection();
