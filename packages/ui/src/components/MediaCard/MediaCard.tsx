import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";
import { Play, Pause, Volume2, VolumeX, Maximize2, Download } from "lucide-react";

const mediaCardVariants = cva(
  ["rounded-lg border bg-card text-card-foreground overflow-hidden"],
  {
    variants: {
      variant: {
        image: "",
        video: "",
        audio: "",
        dynamic: "",
      },
    },
    defaultVariants: {
      variant: "image",
    },
  }
);

const mediaContainerVariants = cva(["relative"], {
  variants: {
    aspectRatio: {
      video: "aspect-video",
      square: "aspect-square",
      portrait: "aspect-[3/4]",
      wide: "aspect-[21/9]",
      auto: "",
    },
  },
  defaultVariants: {
    aspectRatio: "video",
  },
});

export interface MediaCardAction {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
}

export interface MediaCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof mediaCardVariants> {
  /**
   * URL da mídia
   */
  src: string;
  /**
   * Tipo de mídia (auto-detectado se variant="dynamic")
   */
  mediaType?: "image" | "video" | "audio";
  /**
   * Título do card
   */
  title?: React.ReactNode;
  /**
   * Descrição ou legenda
   */
  description?: React.ReactNode;
  /**
   * Proporção de aspecto
   */
  aspectRatio?: "video" | "square" | "portrait" | "wide" | "auto";
  /**
   * Ações do card (botões no footer)
   */
  actions?: MediaCardAction[];
  /**
   * Auto-play (video/audio)
   */
  autoPlay?: boolean;
  /**
   * Mostrar controles nativos
   */
  controls?: boolean;
  /**
   * Loop (video/audio)
   */
  loop?: boolean;
  /**
   * Muted (video/audio)
   */
  muted?: boolean;
  /**
   * Callback quando play
   */
  onPlay?: () => void;
  /**
   * Callback quando pause
   */
  onPause?: () => void;
  /**
   * URL do thumbnail (video/audio)
   */
  poster?: string;
  /**
   * Mostrar botão de download
   */
  downloadable?: boolean;
}

const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
  (
    {
      className,
      variant = "dynamic",
      src,
      mediaType,
      title,
      description,
      aspectRatio = "video",
      actions,
      autoPlay = false,
      controls = true,
      loop = false,
      muted = false,
      onPlay,
      onPause,
      poster,
      downloadable = false,
      ...props
    },
    ref
  ) => {
    const [isPlaying, setIsPlaying] = React.useState(autoPlay);
    const [isMuted, setIsMuted] = React.useState(muted);
    const [progress, setProgress] = React.useState(0);
    const [showControls, setShowControls] = React.useState(false);
    const mediaRef = React.useRef<HTMLVideoElement | HTMLAudioElement>(null);

    // Auto-detect media type
    const detectedType = React.useMemo(() => {
      if (variant !== "dynamic") return variant;
      if (mediaType) return mediaType;

      const extension = src.split(".").pop()?.toLowerCase();
      if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "")) {
        return "image";
      }
      if (["mp4", "webm", "ogg", "mov"].includes(extension || "")) {
        return "video";
      }
      if (["mp3", "wav", "ogg", "m4a"].includes(extension || "")) {
        return "audio";
      }
      return "image";
    }, [src, mediaType, variant]);

    // Handle play/pause
    const handlePlayPause = () => {
      if (!mediaRef.current) return;

      if (isPlaying) {
        mediaRef.current.pause();
        setIsPlaying(false);
        onPause?.();
      } else {
        mediaRef.current.play();
        setIsPlaying(true);
        onPlay?.();
      }
    };

    // Handle mute/unmute
    const handleMuteToggle = () => {
      if (!mediaRef.current) return;
      mediaRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    };

    // Update progress
    React.useEffect(() => {
      const media = mediaRef.current;
      if (!media) return;

      const updateProgress = () => {
        const percent = (media.currentTime / media.duration) * 100;
        setProgress(percent);
      };

      media.addEventListener("timeupdate", updateProgress);
      media.addEventListener("play", () => {
        setIsPlaying(true);
        onPlay?.();
      });
      media.addEventListener("pause", () => {
        setIsPlaying(false);
        onPause?.();
      });

      return () => {
        media.removeEventListener("timeupdate", updateProgress);
      };
    }, [onPlay, onPause]);

    // Handle download
    const handleDownload = () => {
      const link = document.createElement("a");
      link.href = src;
      link.download = src.split("/").pop() || "media";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    // Render Image
    if (detectedType === "image") {
      return (
        <div
          ref={ref}
          className={cn(mediaCardVariants({ variant: detectedType }), className)}
          {...props}
        >
          <div className={cn(mediaContainerVariants({ aspectRatio }))}>
            <img
              src={src}
              alt={typeof title === "string" ? title : "Media"}
              className="h-full w-full object-cover"
            />
            {downloadable && (
              <button
                type="button"
                onClick={handleDownload}
                className="absolute right-2 top-2 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover/card:opacity-100"
                aria-label="Download"
              >
                <Download className="h-4 w-4" />
              </button>
            )}
          </div>

          {(title || description) && (
            <div className="p-4">
              {title && <h3 className="font-semibold">{title}</h3>}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}

          {actions && actions.length > 0 && (
            <div className="flex gap-2 border-t p-4">
              {actions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={action.onClick}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    action.variant === "destructive"
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Render Video
    if (detectedType === "video") {
      return (
        <div
          ref={ref}
          className={cn(
            mediaCardVariants({ variant: detectedType }),
            "group/card",
            className
          )}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          {...props}
        >
          <div className={cn(mediaContainerVariants({ aspectRatio }), "relative")}>
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={src}
              poster={poster}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              controls={controls && !showControls}
              className="h-full w-full object-cover"
            />

            {/* Custom controls overlay */}
            {showControls && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="rounded-full bg-white/90 p-4 backdrop-blur-sm transition-transform hover:scale-110"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="h-8 w-8 text-black" />
                  ) : (
                    <Play className="h-8 w-8 text-black" />
                  )}
                </button>

                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleMuteToggle}
                    className="rounded-full bg-white/90 p-2 backdrop-blur-sm"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? (
                      <VolumeX className="h-4 w-4 text-black" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-black" />
                    )}
                  </button>

                  <div className="flex-1 rounded-full bg-white/30 backdrop-blur-sm">
                    <div
                      className="h-1 rounded-full bg-white transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {downloadable && (
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="rounded-full bg-white/90 p-2 backdrop-blur-sm"
                      aria-label="Download"
                    >
                      <Download className="h-4 w-4 text-black" />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => mediaRef.current?.requestFullscreen()}
                    className="rounded-full bg-white/90 p-2 backdrop-blur-sm"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="h-4 w-4 text-black" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {(title || description) && (
            <div className="p-4">
              {title && <h3 className="font-semibold">{title}</h3>}
              {description && (
                <p className="mt-1 text-sm text-muted-foreground">{description}</p>
              )}
            </div>
          )}

          {actions && actions.length > 0 && (
            <div className="flex gap-2 border-t p-4">
              {actions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={action.onClick}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    action.variant === "destructive"
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Render Audio
    if (detectedType === "audio") {
      return (
        <div
          ref={ref}
          className={cn(mediaCardVariants({ variant: detectedType }), className)}
          {...props}
        >
          <div className="p-6">
            <audio
              ref={mediaRef as React.RefObject<HTMLAudioElement>}
              src={src}
              autoPlay={autoPlay}
              loop={loop}
              muted={muted}
              className="hidden"
            />

            {(title || description) && (
              <div className="mb-4">
                {title && <h3 className="text-lg font-semibold">{title}</h3>}
                {description && (
                  <p className="mt-1 text-sm text-muted-foreground">{description}</p>
                )}
              </div>
            )}

            {/* Audio waveform visualization (simplified) */}
            <div className="mb-4 flex h-16 items-end justify-around gap-1">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-1 rounded-full bg-primary transition-all",
                    isPlaying && "animate-pulse"
                  )}
                  style={{
                    height: `${Math.random() * 60 + 20}%`,
                    animationDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>

            {/* Progress bar */}
            <div className="mb-4">
              <div className="h-2 rounded-full bg-secondary">
                <div
                  className="h-2 rounded-full bg-primary transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </button>

                <button
                  type="button"
                  onClick={handleMuteToggle}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>

              {downloadable && (
                <button
                  type="button"
                  onClick={handleDownload}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent"
                  aria-label="Download"
                >
                  <Download className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          {actions && actions.length > 0 && (
            <div className="flex gap-2 border-t p-4">
              {actions.map((action, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={action.onClick}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    action.variant === "destructive"
                      ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {action.icon}
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  }
);

MediaCard.displayName = "MediaCard";

export { MediaCard, mediaCardVariants };
