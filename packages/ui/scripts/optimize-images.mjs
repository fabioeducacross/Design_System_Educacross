#!/usr/bin/env node
/**
 * Script de otimização de imagens para @educacross/ui
 * 
 * Funcionalidades:
 * - Comprime PNGs com sharp (qualidade 80-90)
 * - Converte imagens grandes (>50KB) para WebP
 * - Mantém PNGs pequenos (<50KB) como estão
 * - Gera relatório de economia de espaço
 * 
 * Uso:
 *   pnpm optimize-images
 *   pnpm optimize-images --source-dir=path/to/images
 *   pnpm optimize-images --png-only (não converte para WebP)
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename, dirname, relative } from 'path';
import { existsSync } from 'fs';

// Configuração
const CONFIG = {
  sourceDir: process.env.SOURCE_DIR || join(process.cwd(), '../../educacross-frontoffice/src/assets/images'),
  targetDir: join(process.cwd(), 'src/assets/images'),
  pngQuality: 90,
  webpQuality: 85,
  webpThresholdKB: 50, // Converter para WebP se > 50KB
  convertToWebp: !process.argv.includes('--png-only'),
  verbose: process.argv.includes('--verbose'),
};

// Mapeamento de pastas (frontoffice → Design System)
const FOLDER_MAPPING = {
  // Branding
  'images-educa/logo': 'branding/educacross',
  'images-educa/brand': 'branding/educacross',
  'whitelabel-teacher/logo': 'branding/educacross',
  'logo': 'branding/educacross',
  'images-educa/partners': 'branding/partners',
  
  // Illustrations
  'images-educa/belinha': 'illustrations/characters',
  'images-educa/characters': 'illustrations/characters',
  'profile-coruja': 'illustrations/characters',
  'images-educa/onboarding': 'illustrations/onboarding',
  'images-educa/welcome': 'illustrations/onboarding',
  'teacher-context/new-mission': 'illustrations/missions',
  'mission-plus': 'illustrations/missions',
  
  // Backgrounds
  'images-educa/backgrounds': 'backgrounds',
  'pages': 'backgrounds',
  
  // Gamification
  'badges-icon': 'gamification/badges',
  'teacher-context/badges': 'gamification/badges',
  'ranking-icons': 'gamification/rewards',
  'teacher-context/rewards': 'gamification/rewards',
  'ranking-exam': 'gamification/rankings',
  'ranking': 'gamification/rankings',
  
  // Icons
  'icons/file-icons': 'icons/file-types',
  'icons': 'icons/browsers',
  
  // Whitelabel
  'whitelabel-teacher/client': 'whitelabel',
  'whitelabel-teacher/themes': 'whitelabel',
  
  // Educational
  'images-educa/subjects': 'educational/subject-icons',
  'teacher-context/axis': 'educational/axis-icons',
  'how-to-play': 'educational/tutorials',
  'missions': 'educational/missions',
  'pdf': 'educational/pdf-templates',
  'pdf-progress': 'educational/pdf-templates',
  'relatorioEvidencia': 'educational/reports',
};

// Estatísticas
const stats = {
  processed: 0,
  skipped: 0,
  errors: 0,
  originalSize: 0,
  optimizedSize: 0,
  convertedToWebp: 0,
};

/**
 * Mapeia caminho do frontoffice para estrutura do Design System
 */
function mapTargetPath(sourcePath) {
  const relativePath = relative(CONFIG.sourceDir, sourcePath);
  const parts = relativePath.split('\\').join('/').split('/');
  
  // Tentar mapear pela pasta mais específica primeiro
  for (let i = parts.length - 1; i >= 0; i--) {
    const folderPath = parts.slice(0, i + 1).join('/');
    if (FOLDER_MAPPING[folderPath]) {
      const fileName = parts[parts.length - 1];
      return join(CONFIG.targetDir, FOLDER_MAPPING[folderPath], fileName);
    }
  }
  
  // Fallback: manter estrutura original em "outros"
  return join(CONFIG.targetDir, 'outros', basename(sourcePath));
}

/**
 * Verifica se arquivo deve ser convertido para WebP
 */
function shouldConvertToWebp(filePath, fileSizeKB) {
  if (!CONFIG.convertToWebp) return false;
  if (extname(filePath).toLowerCase() !== '.png') return false;
  if (fileSizeKB < CONFIG.webpThresholdKB) return false;
  
  // Não converter logos pequenos (mantêm melhor qualidade em PNG)
  const fileName = basename(filePath).toLowerCase();
  if (fileName.includes('logo') && fileSizeKB < 100) return false;
  if (fileName.includes('icon') && fileSizeKB < 30) return false;
  
  return true;
}

/**
 * Otimiza uma única imagem
 */
async function optimizeImage(sourcePath) {
  try {
    const fileStats = await stat(sourcePath);
    const fileSizeKB = Math.round(fileStats.size / 1024);
    
    stats.originalSize += fileStats.size;
    
    const targetPath = mapTargetPath(sourcePath);
    const targetDir = dirname(targetPath);
    
    // Criar diretório de destino se não existir
    if (!existsSync(targetDir)) {
      await mkdir(targetDir, { recursive: true });
    }
    
    const ext = extname(sourcePath).toLowerCase();
    
    // Apenas processar PNGs e JPGs
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      stats.skipped++;
      if (CONFIG.verbose) {
        console.log(`⏭️  Pulado: ${basename(sourcePath)} (formato não suportado)`);
      }
      return;
    }
    
    // Decidir formato de saída
    const convertToWebp = shouldConvertToWebp(sourcePath, fileSizeKB);
    const outputPath = convertToWebp 
      ? targetPath.replace(/\.(png|jpg|jpeg)$/i, '.webp')
      : targetPath;
    
    // Processar imagem
    let sharpInstance = sharp(sourcePath);
    
    if (convertToWebp) {
      sharpInstance = sharpInstance.webp({ quality: CONFIG.webpQuality });
      stats.convertedToWebp++;
    } else if (ext === '.png') {
      sharpInstance = sharpInstance.png({ 
        quality: CONFIG.pngQuality,
        compressionLevel: 9,
      });
    } else {
      sharpInstance = sharpInstance.jpeg({ 
        quality: CONFIG.pngQuality,
        mozjpeg: true,
      });
    }
    
    await sharpInstance.toFile(outputPath);
    
    const optimizedStats = await stat(outputPath);
    stats.optimizedSize += optimizedStats.size;
    stats.processed++;
    
    const reduction = ((1 - optimizedStats.size / fileStats.size) * 100).toFixed(1);
    const format = convertToWebp ? '→ WebP' : ext.toUpperCase();
    
    console.log(
      `✅ ${basename(sourcePath)} ${format} | ` +
      `${fileSizeKB} KB → ${Math.round(optimizedStats.size / 1024)} KB ` +
      `(${reduction}% redução)`
    );
    
  } catch (error) {
    stats.errors++;
    console.error(`❌ Erro ao processar ${basename(sourcePath)}:`, error.message);
  }
}

/**
 * Percorre recursivamente diretório
 */
async function processDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      await optimizeImage(fullPath);
    }
  }
}

/**
 * Formata bytes para leitura humana
 */
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Main
 */
async function main() {
  console.log('\n🎨 Otimizador de Imagens - Educacross Design System\n');
  console.log(`📂 Origem: ${CONFIG.sourceDir}`);
  console.log(`📁 Destino: ${CONFIG.targetDir}`);
  console.log(`🔧 PNG Quality: ${CONFIG.pngQuality}%`);
  console.log(`🌐 WebP Quality: ${CONFIG.webpQuality}%`);
  console.log(`📏 WebP Threshold: ${CONFIG.webpThresholdKB} KB`);
  console.log(`🔄 Conversão WebP: ${CONFIG.convertToWebp ? 'SIM' : 'NÃO'}\n`);
  
  if (!existsSync(CONFIG.sourceDir)) {
    console.error(`❌ Erro: Diretório de origem não encontrado: ${CONFIG.sourceDir}`);
    process.exit(1);
  }
  
  const startTime = Date.now();
  
  await processDirectory(CONFIG.sourceDir);
  
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);
  const reduction = ((1 - stats.optimizedSize / stats.originalSize) * 100).toFixed(1);
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 RELATÓRIO DE OTIMIZAÇÃO');
  console.log('='.repeat(60));
  console.log(`✅ Processadas: ${stats.processed}`);
  console.log(`🌐 Convertidas para WebP: ${stats.convertedToWebp}`);
  console.log(`⏭️  Puladas: ${stats.skipped}`);
  console.log(`❌ Erros: ${stats.errors}`);
  console.log(`\n📦 Tamanho original: ${formatBytes(stats.originalSize)}`);
  console.log(`📦 Tamanho otimizado: ${formatBytes(stats.optimizedSize)}`);
  console.log(`💾 Economia: ${formatBytes(stats.originalSize - stats.optimizedSize)} (${reduction}%)`);
  console.log(`⏱️  Tempo: ${duration}s\n`);
}

main().catch(console.error);
