/**
 * metadata-integration.test.ts
 *
 * Testes de integração para validar sincronização entre:
 * - src/metadata.ts (fonte de verdade)
 * - dist/manifest.json (gerado)
 * - src/index.ts (exports reais)
 */

import { describe, it, expect, beforeAll } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { componentList, metadata } from "../metadata";

const MANIFEST_PATH = path.join(__dirname, "../../dist/manifest.json");
const INDEX_PATH = path.join(__dirname, "../index.ts");

interface ManifestComponent {
    name: string;
    category: string;
    hasTests?: boolean;
    hasStories?: boolean;
    hasReadme?: boolean;
    hasVariants?: boolean;
    exports: string[];
    path: string;
}

interface Manifest {
    name: string;
    description: string;
    components: ManifestComponent[];
    totalComponents: number;
    version: string;
    generatedAt: string;
}

describe("Metadata Integration", () => {
    let manifest: Manifest;
    let indexContent: string;

    beforeAll(() => {
        // Lê manifest gerado
        if (fs.existsSync(MANIFEST_PATH)) {
            manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8")) as Manifest;
        }

        // Lê index.ts
        if (fs.existsSync(INDEX_PATH)) {
            indexContent = fs.readFileSync(INDEX_PATH, "utf-8");
        }
    });

    describe("Sincronização metadata.ts ↔ manifest.json", () => {
        it("manifest deve usar versão de metadata.ts", () => {
            expect(manifest.version).toBe(metadata.version);
        });

        it("manifest deve usar nome de metadata.ts", () => {
            expect(manifest.name).toBe(metadata.name);
        });

        it("manifest deve usar descrição de metadata.ts", () => {
            expect(manifest.description).toBe(metadata.description);
        });

        it("total de componentes no manifest deve ser >= totalRootComponents", () => {
            expect(manifest.totalComponents).toBeGreaterThanOrEqual(
                metadata.totalRootComponents
            );
        });
    });

    describe("Sincronização componentList ↔ manifest.json", () => {
        it("componentes do manifest devem estar em componentList", () => {
            const allComponentNames: string[] = [];
            for (const components of Object.values(componentList)) {
                allComponentNames.push(...([...components] as string[]));
            }

            for (const component of manifest.components) {
                expect(allComponentNames).toContain(component.name);
            }
        });

        it("categorias do manifest devem corresponder a componentList", () => {
            const categories = Object.keys(componentList);
            for (const component of manifest.components) {
                expect(categories).toContain(component.category);
            }
        });
    });

    describe("Sincronização index.ts ↔ manifest.json", () => {
        it("componentes no manifest devem ser exportados em index.ts", () => {
            for (const component of manifest.components) {
                // Suporta exports inline (export { X }) e multi-linha (export {\n  X,\n})
                const exportPattern = new RegExp(
                    `export\\s*\\{[^}]*\\b${component.name}\\b[^}]*\\}`,
                    "gs"
                );
                expect(indexContent).toMatch(exportPattern);
            }
        });

        it("exports do manifest devem estar em index.ts", () => {
            for (const component of manifest.components) {
                for (const exportName of component.exports) {
                    // Pula types
                    if (exportName.endsWith("Props") || exportName.includes("Type")) continue;

                    // Suporta exports inline e multi-linha
                    const exportPattern = new RegExp(
                        `export\\s*\\{[^}]*\\b${exportName}\\b[^}]*\\}`,
                        "gs"
                    );
                    expect(indexContent).toMatch(exportPattern);
                }
            }
        });
    });

    describe("Consistência de metadados", () => {
        it("componentes com variantes devem exportar *Variants", () => {
            for (const component of manifest.components) {
                if (component.hasVariants) {
                    const variantsExport = component.exports.some((e) =>
                        e.toLowerCase().includes("variants")
                    );
                    expect(variantsExport).toBe(true);
                }
            }
        });

        it("componentes devem ter pelo menos 1 export", () => {
            for (const component of manifest.components) {
                expect(component.exports.length).toBeGreaterThan(0);
            }
        });

        it("paths devem seguir padrão ./components/NomeComponente", () => {
            for (const component of manifest.components) {
                expect(component.path).toBe(`./components/${component.name}`);
            }
        });
    });

    describe("Cobertura de documentação", () => {
        it("pelo menos 80% dos componentes devem ter testes", () => {
            const withTests = manifest.components.filter(
                (c) => c.hasTests
            ).length;
            const coverage = (withTests / manifest.totalComponents) * 100;
            expect(coverage).toBeGreaterThanOrEqual(80);
        });

        it("pelo menos 80% dos componentes devem ter stories", () => {
            const withStories = manifest.components.filter(
                (c) => c.hasStories
            ).length;
            const coverage = (withStories / manifest.totalComponents) * 100;
            expect(coverage).toBeGreaterThanOrEqual(80);
        });

        it("componentes novos (v0.2.0) devem ter README", () => {
            const logo = manifest.components.find((c) => c.name === "Logo");
            expect(logo?.hasReadme).toBe(true);
        });
    });
});
