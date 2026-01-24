import * as React from "react";
import { cn } from "../../utils";

export interface PlayerProps
  extends Omit<React.AudioHTMLAttributes<HTMLAudioElement>, "title"> {
  /** URL do áudio */
  src: string;
  /** Título exibido acima do player */
  title?: React.ReactNode;
  /** Mostrar botão de download */
  downloadable?: boolean;
}

/**
 * Placeholder leve do Player (áudio) até a paridade completa com o frontoffice.
 * Inclui controles nativos, título opcional e link de download.
 */
export const Player = React.forwardRef<HTMLAudioElement, PlayerProps>(
  ({ src, title, downloadable = false, className, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)}>
        {title ? <div className="font-semibold text-sm">{title}</div> : null}
        <audio
          ref={ref}
          src={src}
          controls
          className="w-full"
          controlsList={downloadable ? undefined : "nodownload"}
          {...props}
        />
        {downloadable ? (
          <a
            className="text-sm text-primary hover:underline"
            href={src}
            download
            aria-label="Baixar áudio"
          >
            Baixar
          </a>
        ) : null}
      </div>
    );
  }
);

Player.displayName = "Player";

export default Player;
