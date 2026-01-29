import * as React from "react";
import { cn } from "@fabioeducacross/ui";
import { QuestionContent } from "../QuestionContent";

export interface MatrixRow {
  /**
   * ID único da linha
   */
  id: string;
  
  /**
   * Texto da linha
   */
  label: string;
}

export interface MatrixColumn {
  /**
   * ID único da coluna
   */
  id: string;
  
  /**
   * Texto da coluna
   */
  label: string;
}

export interface MatrixCell {
  /**
   * ID da linha
   */
  rowId: string;
  
  /**
   * ID da coluna
   */
  columnId: string;
  
  /**
   * Se esta célula é uma resposta correta
   */
  isCorrect: boolean;
}

export interface MatrixData {
  /**
   * Linhas da matriz
   */
  rows: MatrixRow[];
  
  /**
   * Colunas da matriz
   */
  columns: MatrixColumn[];
  
  /**
   * Células corretas
   */
  correctCells: MatrixCell[];
  
  /**
   * Se permite múltiplas seleções por linha
   * @default false
   */
  multiplePerRow?: boolean;
}

export interface MatrixProps {
  /**
   * Conteúdo/enunciado da questão
   */
  content: string;
  
  /**
   * Dados da questão
   */
  data: MatrixData;
  
  /**
   * Resposta atual (array de "rowId:columnId")
   */
  answer?: string[];
  
  /**
   * Callback quando a resposta é alterada
   */
  onAnswerChange?: (answer: string[]) => void;
  
  /**
   * Se a questão está em modo de visualização
   */
  readOnly?: boolean;
  
  /**
   * Se deve mostrar feedback/correção
   */
  showFeedback?: boolean;
}

/**
 * Template Matrix - Questões em formato de matriz/tabela
 * 
 * Permite selecionar células em uma matriz de linhas x colunas.
 * 
 * @example
 * ```tsx
 * <Matrix
 *   content="Marque as afirmações corretas:"
 *   data={{
 *     rows: [
 *       { id: "r1", label: "Brasil" },
 *       { id: "r2", label: "Argentina" }
 *     ],
 *     columns: [
 *       { id: "c1", label: "América do Sul" },
 *       { id: "c2", label: "Europa" }
 *     ],
 *     correctCells: [
 *       { rowId: "r1", columnId: "c1", isCorrect: true },
 *       { rowId: "r2", columnId: "c1", isCorrect: true }
 *     ]
 *   }}
 *   answer={["r1:c1", "r2:c1"]}
 *   onAnswerChange={(answer) => console.log(answer)}
 * />
 * ```
 */
export const Matrix = React.forwardRef<HTMLDivElement, MatrixProps>(
  ({ content, data, answer = [], onAnswerChange, readOnly = false, showFeedback = false }, ref) => {
    const { rows = [], columns = [], correctCells = [], multiplePerRow = false } = data;
    
    /**
     * Cria key da célula
     */
    const getCellKey = (rowId: string, columnId: string) => `${rowId}:${columnId}`;
    
    /**
     * Verifica se uma célula está selecionada
     */
    const isCellSelected = React.useCallback(
      (rowId: string, columnId: string) => {
        return answer.includes(getCellKey(rowId, columnId));
      },
      [answer]
    );
    
    /**
     * Verifica se uma célula é correta
     */
    const isCellCorrect = React.useCallback(
      (rowId: string, columnId: string): boolean | undefined => {
        const cellCorrect = correctCells.find(
          c => c.rowId === rowId && c.columnId === columnId
        );
        return cellCorrect?.isCorrect;
      },
      [correctCells]
    );
    
    /**
     * Handler para mudança de seleção de célula
     */
    const handleCellChange = React.useCallback(
      (rowId: string, columnId: string, selected: boolean) => {
        if (readOnly || !onAnswerChange) return;
        
        const cellKey = getCellKey(rowId, columnId);
        let newAnswer: string[];
        
        if (multiplePerRow) {
          // Permite múltiplas seleções por linha
          newAnswer = selected
            ? [...answer, cellKey]
            : answer.filter(k => k !== cellKey);
        } else {
          // Apenas uma seleção por linha (radio)
          if (selected) {
            // Remove outras seleções da mesma linha
            newAnswer = answer.filter(k => !k.startsWith(`${rowId}:`));
            newAnswer.push(cellKey);
          } else {
            newAnswer = answer.filter(k => k !== cellKey);
          }
        }
        
        onAnswerChange(newAnswer);
      },
      [answer, multiplePerRow, readOnly, onAnswerChange]
    );
    
    /**
     * Obtém status da célula para feedback
     */
    const getCellStatus = React.useCallback(
      (rowId: string, columnId: string): "correct" | "incorrect" | undefined => {
        if (!showFeedback) return undefined;
        
        const isSelected = isCellSelected(rowId, columnId);
        const isCorrect = isCellCorrect(rowId, columnId);
        
        if (isSelected && isCorrect) return "correct";
        if (isSelected && !isCorrect) return "incorrect";
        if (!isSelected && isCorrect) return "correct"; // Mostrar resposta correta
        
        return undefined;
      },
      [showFeedback, isCellSelected, isCellCorrect]
    );
    
    return (
      <div ref={ref} className="space-y-4">
        {/* Enunciado */}
        <QuestionContent content={content} />
        
        {/* Tabela/Matriz */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-border p-2 bg-muted/50"></th>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className="border border-border p-2 bg-muted/50 text-sm font-medium text-foreground"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td className="border border-border p-2 bg-muted/50 text-sm font-medium text-foreground">
                    {row.label}
                  </td>
                  {columns.map((column) => {
                    const isSelected = isCellSelected(row.id, column.id);
                    const status = getCellStatus(row.id, column.id);
                    
                    // Classes de feedback
                    const feedbackClass = status
                      ? status === "correct"
                        ? "bg-green-50 dark:bg-green-950 border-green-500"
                        : "bg-red-50 dark:bg-red-950 border-red-500"
                      : "";
                    
                    return (
                      <td
                        key={column.id}
                        className={cn(
                          "border border-border p-2 text-center cursor-pointer hover:bg-accent/50 transition-colors",
                          {
                            "cursor-not-allowed hover:bg-transparent": readOnly,
                            "bg-accent": isSelected && !showFeedback,
                          },
                          feedbackClass
                        )}
                        onClick={() => !readOnly && handleCellChange(row.id, column.id, !isSelected)}
                        role="checkbox"
                        aria-checked={isSelected}
                        aria-label={`${row.label} - ${column.label}`}
                        tabIndex={readOnly ? -1 : 0}
                        onKeyDown={(e) => {
                          if (!readOnly && (e.key === "Enter" || e.key === " ")) {
                            e.preventDefault();
                            handleCellChange(row.id, column.id, !isSelected);
                          }
                        }}
                      >
                        {isSelected && (
                          <span className="text-lg" aria-hidden="true">
                            {multiplePerRow ? "☑" : "⦿"}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Informações */}
        <div className="text-xs text-muted-foreground">
          <p>
            {multiplePerRow 
              ? "Clique para selecionar múltiplas células (checkboxes)"
              : "Clique para selecionar uma célula por linha (radio)"}
          </p>
          <p className="mt-1">
            {answer.length} {answer.length === 1 ? "célula selecionada" : "células selecionadas"}
          </p>
        </div>
      </div>
    );
  }
);

Matrix.displayName = "Matrix";
