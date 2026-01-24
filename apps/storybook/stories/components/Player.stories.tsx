import type { Meta, StoryObj } from "@storybook/react";
import { Player } from "@fabioeducacross/ui";

const meta: Meta<typeof Player> = {
  title: "Components/Player",
  component: Player,
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "URL do arquivo de áudio",
    },
    title: {
      control: "text",
      description: "Título exibido acima do player",
    },
    downloadable: {
      control: "boolean",
      description: "Permite download do áudio",
    },
    autoPlay: {
      control: "boolean",
      description: "Inicia reprodução automaticamente",
    },
    loop: {
      control: "boolean",
      description: "Reproduz em loop",
    },
    muted: {
      control: "boolean",
      description: "Inicia sem som",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Player de áudio com controles nativos, título opcional e opção de download. Placeholder temporário até implementação completa com controles custom, exibição de letras e modo fullscreen.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Player>;

/**
 * Player básico com controles nativos do navegador.
 */
export const Default: Story = {
  args: {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "SoundHelix Song #1",
  },
  parameters: {
    docs: {
      source: {
        code: `<Player
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  title="SoundHelix Song #1"
/>`,
      },
    },
    multiFrameworkCode: {
      react: `import { Player } from "@fabioeducacross/ui";

export default function App() {
  return (
    <Player
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      title="SoundHelix Song #1"
    />
  );
}`,
      vue2: `<template>
  <audio-player
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    title="SoundHelix Song #1"
  />
</template>

<script>
import { BMediaPlayer } from "bootstrap-vue";

export default {
  components: { AudioPlayer: BMediaPlayer },
};
</script>`,
      vue3: `<template>
  <audio
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    controls
    class="w-full"
  />
  <div class="font-semibold text-sm mt-2">SoundHelix Song #1</div>
</template>`,
    },
  },
};

/**
 * Player sem título.
 */
export const WithoutTitle: Story = {
  args: {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  parameters: {
    docs: {
      source: {
        code: `<Player src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" />`,
      },
    },
    multiFrameworkCode: {
      react: `import { Player } from "@fabioeducacross/ui";

export default function App() {
  return (
    <Player src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" />
  );
}`,
      vue2: `<template>
  <audio-player src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" />
</template>

<script>
import { BMediaPlayer } from "bootstrap-vue";

export default {
  components: { AudioPlayer: BMediaPlayer },
};
</script>`,
      vue3: `<template>
  <audio
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    controls
    class="w-full"
  />
</template>`,
    },
  },
};

/**
 * Player com opção de download habilitada.
 */
export const WithDownload: Story = {
  args: {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    title: "SoundHelix Song #3",
    downloadable: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<Player
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  title="SoundHelix Song #3"
  downloadable
/>`,
      },
    },
    multiFrameworkCode: {
      react: `import { Player } from "@fabioeducacross/ui";

export default function App() {
  return (
    <Player
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
      title="SoundHelix Song #3"
      downloadable
    />
  );
}`,
      vue2: `<template>
  <div>
    <audio-player
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
      title="SoundHelix Song #3"
    />
    <a
      :href="src"
      download
      class="text-sm text-primary hover:underline"
    >
      Baixar
    </a>
  </div>
</template>

<script>
import { BMediaPlayer } from "bootstrap-vue";

export default {
  components: { AudioPlayer: BMediaPlayer },
  data() {
    return {
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    };
  },
};
</script>`,
      vue3: `<template>
  <div class="space-y-2">
    <div class="font-semibold text-sm">SoundHelix Song #3</div>
    <audio
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
      controls
      class="w-full"
    />
    <a
      href="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
      download
      class="text-sm text-primary hover:underline"
    >
      Baixar
    </a>
  </div>
</template>`,
    },
  },
};

/**
 * Player com autoplay e loop.
 */
export const AutoPlayLoop: Story = {
  args: {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    title: "SoundHelix Song #4 (Loop)",
    autoPlay: true,
    loop: true,
    muted: true, // Muted por padrão para evitar som inesperado
  },
  parameters: {
    docs: {
      description: {
        story: "Player configurado para iniciar automaticamente e reproduzir em loop. Inicia mudo por boas práticas de UX.",
      },
      source: {
        code: `<Player
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  title="SoundHelix Song #4 (Loop)"
  autoPlay
  loop
  muted
/>`,
      },
    },
    multiFrameworkCode: {
      react: `import { Player } from "@fabioeducacross/ui";

export default function App() {
  return (
    <Player
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
      title="SoundHelix Song #4 (Loop)"
      autoPlay
      loop
      muted
    />
  );
}`,
      vue2: `<template>
  <audio-player
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
    title="SoundHelix Song #4 (Loop)"
    autoplay
    loop
    muted
  />
</template>

<script>
import { BMediaPlayer } from "bootstrap-vue";

export default {
  components: { AudioPlayer: BMediaPlayer },
};
</script>`,
      vue3: `<template>
  <div class="space-y-2">
    <div class="font-semibold text-sm">SoundHelix Song #4 (Loop)</div>
    <audio
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
      controls
      autoplay
      loop
      muted
      class="w-full"
    />
  </div>
</template>`,
    },
  },
};

/**
 * Player com título como ReactNode complexo.
 */
export const ComplexTitle: Story = {
  args: {
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    title: (
      <div className="flex items-center gap-2">
        <span className="text-primary font-bold">SoundHelix Song #5</span>
        <span className="text-xs text-muted-foreground">· 2:45</span>
      </div>
    ),
    downloadable: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Título pode ser qualquer ReactNode, permitindo composições complexas com badges, ícones, metadados, etc.",
      },
      source: {
        code: `<Player
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  title={
    <div className="flex items-center gap-2">
      <span className="text-primary font-bold">SoundHelix Song #5</span>
      <span className="text-xs text-muted-foreground">· 2:45</span>
    </div>
  }
  downloadable
/>`,
      },
    },
    multiFrameworkCode: {
      react: `import { Player } from "@fabioeducacross/ui";

export default function App() {
  return (
    <Player
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
      title={
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">SoundHelix Song #5</span>
          <span className="text-xs text-muted-foreground">· 2:45</span>
        </div>
      }
      downloadable
    />
  );
}`,
      vue2: `<template>
  <div>
    <div class="d-flex align-items-center mb-2">
      <span class="text-primary font-weight-bold">SoundHelix Song #5</span>
      <span class="text-muted small ml-2">· 2:45</span>
    </div>
    <audio-player
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
    />
    <a
      :href="src"
      download
      class="text-sm text-primary hover:underline mt-2 d-block"
    >
      Baixar
    </a>
  </div>
</template>

<script>
import { BMediaPlayer } from "bootstrap-vue";

export default {
  components: { AudioPlayer: BMediaPlayer },
  data() {
    return {
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    };
  },
};
</script>`,
      vue3: `<template>
  <div class="space-y-2">
    <div class="flex items-center gap-2">
      <span class="text-primary font-bold">SoundHelix Song #5</span>
      <span class="text-xs text-muted-foreground">· 2:45</span>
    </div>
    <audio
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
      controls
      class="w-full"
    />
    <a
      href="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
      download
      class="text-sm text-primary hover:underline"
    >
      Baixar
    </a>
  </div>
</template>`,
    },
  },
};

/**
 * Múltiplos players em sequência.
 */
export const MultiplePlayersPlaylist: Story = {
  render: () => (
    <div className="space-y-4">
      <Player
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        title="Track 1: Intro"
      />
      <Player
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
        title="Track 2: Main Theme"
        downloadable
      />
      <Player
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
        title="Track 3: Outro"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Exemplo de playlist com múltiplos players. Útil para podcasts, cursos em áudio, ou coleções de música.",
      },
      source: {
        code: `<div className="space-y-4">
  <Player
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    title="Track 1: Intro"
  />
  <Player
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    title="Track 2: Main Theme"
    downloadable
  />
  <Player
    src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    title="Track 3: Outro"
  />
</div>`,
      },
    },
    multiFrameworkCode: {
      react: `import { Player } from "@fabioeducacross/ui";

export default function Playlist() {
  const tracks = [
    { src: "...Song-1.mp3", title: "Track 1: Intro" },
    { src: "...Song-2.mp3", title: "Track 2: Main Theme", downloadable: true },
    { src: "...Song-3.mp3", title: "Track 3: Outro" },
  ];

  return (
    <div className="space-y-4">
      {tracks.map((track, i) => (
        <Player key={i} {...track} />
      ))}
    </div>
  );
}`,
      vue2: `<template>
  <div>
    <div v-for="(track, i) in tracks" :key="i" class="mb-3">
      <div class="font-weight-bold mb-1">{{ track.title }}</div>
      <audio-player :src="track.src" />
      <a
        v-if="track.downloadable"
        :href="track.src"
        download
        class="text-sm text-primary d-block mt-1"
      >
        Baixar
      </a>
    </div>
  </div>
</template>

<script>
import { BMediaPlayer } from "bootstrap-vue";

export default {
  components: { AudioPlayer: BMediaPlayer },
  data() {
    return {
      tracks: [
        { src: "...Song-1.mp3", title: "Track 1: Intro" },
        { src: "...Song-2.mp3", title: "Track 2: Main Theme", downloadable: true },
        { src: "...Song-3.mp3", title: "Track 3: Outro" },
      ],
    };
  },
};
</script>`,
      vue3: `<template>
  <div class="space-y-4">
    <div v-for="(track, i) in tracks" :key="i" class="space-y-2">
      <div class="font-semibold text-sm">{{ track.title }}</div>
      <audio :src="track.src" controls class="w-full" />
      <a
        v-if="track.downloadable"
        :href="track.src"
        download
        class="text-sm text-primary hover:underline"
      >
        Baixar
      </a>
    </div>
  </div>
</template>

<script setup>
const tracks = [
  { src: "...Song-1.mp3", title: "Track 1: Intro" },
  { src: "...Song-2.mp3", title: "Track 2: Main Theme", downloadable: true },
  { src: "...Song-3.mp3", title: "Track 3: Outro" },
];
</script>`,
    },
  },
};
