import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Maximize2, ZoomIn, ZoomOut, RotateCcw, X } from 'lucide-react';

interface MermaidDiagramProps {
  chart: string;
  caption?: string;
  enableZoom?: boolean;
  enableFullscreen?: boolean;
}

mermaid.initialize({ 
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true
  }
});

const ControlButton: React.FC<{
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  isDark?: boolean;
}> = ({ onClick, icon, label, isDark = false }) => (
  <button
    onClick={onClick}
    title={label}
    style={{
      padding: '0.6rem 1rem',
      backgroundColor: isDark ? 'var(--color-primary)' : 'white',
      color: isDark ? 'white' : 'var(--color-primary)',
      border: `2px solid var(--color-primary)`,
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.4rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      boxShadow: isDark ? '0 2px 8px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.08)',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = isDark ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = isDark ? '0 2px 8px rgba(0, 0, 0, 0.15)' : '0 1px 3px rgba(0, 0, 0, 0.08)';
    }}
  >
    {icon}
    <span style={{ display: { '@media': '(max-width: 640px)' } ? 'none' : 'inline' }}>
      {label}
    </span>
  </button>
);

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ 
  chart, 
  caption,
  enableZoom = true,
  enableFullscreen = true
}) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (mermaidRef.current) {
      mermaidRef.current.innerHTML = chart;
      mermaid.contentLoaded();
    }
  }, [chart]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const DiagramContent = () => (
    <div
      ref={mermaidRef}
      className="mermaid"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '350px',
        width: '100%',
        padding: '1.5rem'
      }}
    />
  );

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          margin: '2.5rem 0',
          padding: '2rem',
          backgroundColor: 'var(--color-neutral-50)',
          border: '2px solid var(--color-neutral-200)',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.12)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        }}
      >
        {enableZoom ? (
          <TransformWrapper
            initialScale={1}
            minScale={0.5}
            maxScale={3}
            centerOnInit
            wheel={{ step: 0.1 }}
          >
            {({ zoomIn, zoomOut, resetTransform }) => (
              <>
                {/* Controles de Zoom - Barra compacta */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'flex-end',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--color-neutral-200)'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--color-neutral-500)',
                      fontWeight: '500',
                      marginRight: '0.5rem'
                    }}
                  >
                    🔍 Zoom:
                  </span>
                  <ControlButton
                    onClick={() => zoomOut()}
                    icon={<ZoomOut size={18} />}
                    label="Reduzir"
                  />
                  <ControlButton
                    onClick={() => resetTransform()}
                    icon={<RotateCcw size={18} />}
                    label="Resetar"
                  />
                  <ControlButton
                    onClick={() => zoomIn()}
                    icon={<ZoomIn size={18} />}
                    label="Ampliar"
                  />
                  {enableFullscreen && (
                    <ControlButton
                      onClick={toggleFullscreen}
                      icon={<Maximize2 size={18} />}
                      label="Tela Cheia"
                      isDark
                    />
                  )}
                </div>

                {/* Diagrama com Zoom/Pan */}
                <TransformComponent
                  wrapperStyle={{
                    width: '100%',
                    height: '550px',
                    cursor: 'grab',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid var(--color-neutral-150)',
                    overflow: 'hidden'
                  }}
                  contentStyle={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <DiagramContent />
                </TransformComponent>
              </>
            )}
          </TransformWrapper>
        ) : (
          <DiagramContent />
        )}

        {caption && (
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-neutral-600)',
              marginTop: '0.5rem',
              fontStyle: 'italic',
              textAlign: 'center',
              lineHeight: '1.5',
              borderTop: '1px solid var(--color-neutral-200)',
              paddingTop: '1rem'
            }}
          >
            📝 {caption}
          </p>
        )}
      </div>

      {/* Modal Fullscreen - Premium */}
      {isFullscreen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.98)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            padding: '2rem',
            backdropFilter: 'blur(4px)'
          }}
          onClick={toggleFullscreen}
        >
          {/* Header Fullscreen */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid var(--color-primary)'
            }}
          >
            <h2
              style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '600',
                margin: 0
              }}
            >
              📊 Visualizador de Diagrama
            </h2>
            <button
              onClick={toggleFullscreen}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.2s',
                zIndex: 10000
              }}
              title="Fechar"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <X size={20} /> Fechar
            </button>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TransformWrapper
              initialScale={1}
              minScale={0.3}
              maxScale={5}
              centerOnInit
              wheel={{ step: 0.1 }}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  {/* Controles Fullscreen - Premium */}
                  <div
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <ControlButton
                      onClick={() => zoomOut()}
                      icon={<ZoomOut size={20} />}
                      label="Reduzir"
                      isDark
                    />
                    <ControlButton
                      onClick={() => resetTransform()}
                      icon={<RotateCcw size={20} />}
                      label="Resetar"
                      isDark
                    />
                    <ControlButton
                      onClick={() => zoomIn()}
                      icon={<ZoomIn size={20} />}
                      label="Ampliar"
                      isDark
                    />
                  </div>

                  <TransformComponent
                    wrapperStyle={{
                      width: '100%',
                      height: 'calc(100vh - 12rem)',
                      cursor: 'grab',
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      overflow: 'hidden'
                    }}
                    contentStyle={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <DiagramContent />
                  </TransformComponent>
                </div>
              )}
            </TransformWrapper>
          </div>

          {/* Caption Fullscreen */}
          {caption && (
            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--color-neutral-200)',
                marginTop: '2rem',
                fontStyle: 'italic',
                textAlign: 'center',
                lineHeight: '1.6',
                maxWidth: '90%',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              📝 {caption}
            </p>
          )}
        </div>
      )}
    </>
  );
};
