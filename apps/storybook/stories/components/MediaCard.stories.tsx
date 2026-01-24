import type { Meta, StoryObj } from "@storybook/react";
import { MediaCard, type MediaCardAction } from "@fabioeducacross/ui";
import * as React from "react";
import { Share2, Heart, MessageCircle, Bookmark } from "lucide-react";

const meta = {
  title: "Components/MediaCard",
  component: MediaCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Card de mídia com 4 variantes: image (imagem estática), video (player de vídeo com controles custom), audio (player de áudio com visualização de ondas), dynamic (auto-detecta tipo pela extensão). Suporta ações, download, autoPlay e callbacks.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["image", "video", "audio", "dynamic"],
      description: "Tipo de mídia (dynamic auto-detecta pela extensão)",
    },
    src: {
      control: "text",
      description: "URL da mídia",
    },
    title: {
      control: "text",
      description: "Título do card",
    },
    description: {
      control: "text",
      description: "Descrição ou legenda",
    },
    aspectRatio: {
      control: "select",
      options: ["video", "square", "portrait", "wide", "auto"],
      description: "Proporção de aspecto",
    },
    autoPlay: {
      control: "boolean",
      description: "Auto-play (video/audio)",
    },
    controls: {
      control: "boolean",
      description: "Mostrar controles nativos",
    },
    downloadable: {
      control: "boolean",
      description: "Mostrar botão de download",
    },
  },
} satisfies Meta<typeof MediaCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Image - Card de imagem com título, descrição e ações.
 */
export const Image: Story = {
  args: {
    variant: "image",
    src: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800&h=600&fit=crop",
    title: "Paisagem Montanhosa",
    description: "Uma bela vista das montanhas ao amanhecer",
    aspectRatio: "video",
    actions: [
      {
        icon: <Heart className="h-4 w-4" />,
        label: "Curtir",
        onClick: () => alert("Curtido!"),
      },
      {
        icon: <Share2 className="h-4 w-4" />,
        label: "Compartilhar",
        onClick: () => alert("Compartilhar"),
      },
    ],
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { MediaCard } from "@fabioeducacross/ui";
import { Heart, Share2 } from "lucide-react";

function ImagePost() {
  return (
    <MediaCard
      variant="image"
      src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
      title="Paisagem Montanhosa"
      description="Uma bela vista das montanhas ao amanhecer"
      aspectRatio="video"
      actions={[
        {
          icon: <Heart className="h-4 w-4" />,
          label: "Curtir",
          onClick: () => console.log("Curtido"),
        },
        {
          icon: <Share2 className="h-4 w-4" />,
          label: "Compartilhar",
          onClick: () => console.log("Compartilhar"),
        },
      ]}
    />
  );
}`,
      vue2: `<!-- Bootstrap Image Card -->
<template>
  <div class="card">
    <img 
      src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
      class="card-img-top"
      alt="Paisagem Montanhosa"
      style="aspect-ratio: 16/9; object-fit: cover;"
    />
    <div class="card-body">
      <h5 class="card-title">Paisagem Montanhosa</h5>
      <p class="card-text">Uma bela vista das montanhas ao amanhecer</p>
    </div>
    <div class="card-footer d-flex gap-2">
      <button @click="handleLike" class="btn btn-primary">
        <i class="bi bi-heart"></i> Curtir
      </button>
      <button @click="handleShare" class="btn btn-primary">
        <i class="bi bi-share"></i> Compartilhar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleLike() {
      alert('Curtido!');
    },
    handleShare() {
      alert('Compartilhar');
    }
  }
};
</script>`,
      vue3: `<script setup lang="ts">
import { EdMediaCard } from "@fabioeducacross/ui-vue3";
import { Heart, Share2 } from "lucide-vue-next";

const actions = [
  {
    icon: Heart,
    label: "Curtir",
    onClick: () => console.log("Curtido"),
  },
  {
    icon: Share2,
    label: "Compartilhar",
    onClick: () => console.log("Compartilhar"),
  },
];
</script>

<template>
  <EdMediaCard
    variant="image"
    src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
    title="Paisagem Montanhosa"
    description="Uma bela vista das montanhas ao amanhecer"
    aspect-ratio="video"
    :actions="actions"
  />
</template>`,
    },
  },
};

/**
 * Video - Player de vídeo com controles customizados no hover.
 */
export const Video: Story = {
  args: {
    variant: "video",
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
    title: "Big Buck Bunny",
    description: "Curta-metragem de animação open source",
    aspectRatio: "video",
    controls: true,
    downloadable: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { MediaCard } from "@fabioeducacross/ui";

function VideoPlayer() {
  const handlePlay = () => console.log("Video iniciado");
  const handlePause = () => console.log("Video pausado");

  return (
    <MediaCard
      variant="video"
      src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
      title="Big Buck Bunny"
      description="Curta-metragem de animação open source"
      controls={true}
      downloadable={true}
      onPlay={handlePlay}
      onPause={handlePause}
    />
  );
}`,
      vue2: `<!-- Bootstrap Video Card -->
<template>
  <div class="card">
    <video 
      ref="videoPlayer"
      class="card-img-top"
      controls
      poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
      style="aspect-ratio: 16/9;"
      @play="handlePlay"
      @pause="handlePause"
    >
      <source 
        src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
        type="video/mp4"
      />
    </video>
    <div class="card-body">
      <h5 class="card-title">Big Buck Bunny</h5>
      <p class="card-text">Curta-metragem de animação open source</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handlePlay() {
      console.log('Video iniciado');
    },
    handlePause() {
      console.log('Video pausado');
    }
  }
};
</script>`,
      vue3: `<EdMediaCard
  variant="video"
  src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
  title="Big Buck Bunny"
  description="Curta-metragem de animação open source"
  :controls="true"
  :downloadable="true"
  @play="handlePlay"
  @pause="handlePause"
/>`,
    },
  },
};

/**
 * Audio - Player de áudio com visualização de ondas e controles.
 */
export const Audio: Story = {
  args: {
    variant: "audio",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    title: "SoundHelix Song #1",
    description: "Música gerada algoritmicamente",
    downloadable: true,
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { MediaCard } from "@fabioeducacross/ui";

function AudioPlayer() {
  return (
    <MediaCard
      variant="audio"
      src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      title="SoundHelix Song #1"
      description="Música gerada algoritmicamente"
      downloadable={true}
      onPlay={() => console.log("Reproduzindo")}
      onPause={() => console.log("Pausado")}
    />
  );
}`,
      vue2: `<!-- Bootstrap Audio Card -->
<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">SoundHelix Song #1</h5>
      <p class="card-text text-muted">Música gerada algoritmicamente</p>
      
      <!-- Waveform visualization (simulada) -->
      <div class="d-flex align-items-end justify-content-around mb-3" style="height: 4rem;">
        <div v-for="i in 40" :key="i" 
             class="bg-primary rounded"
             :style="{ 
               width: '2px', 
               height: Math.random() * 60 + 20 + '%' 
             }"
        ></div>
      </div>

      <!-- Progress bar -->
      <div class="progress mb-3" style="height: 8px;">
        <div class="progress-bar" role="progressbar" :style="{ width: progress + '%' }"></div>
      </div>

      <!-- Controls -->
      <audio ref="audioPlayer" @timeupdate="updateProgress">
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
      </audio>

      <div class="d-flex gap-2">
        <button @click="togglePlay" class="btn btn-primary rounded-circle">
          <i :class="isPlaying ? 'bi-pause-fill' : 'bi-play-fill'"></i>
        </button>
        <button @click="toggleMute" class="btn btn-secondary rounded-circle">
          <i :class="isMuted ? 'bi-volume-mute-fill' : 'bi-volume-up-fill'"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPlaying: false,
      isMuted: false,
      progress: 0
    };
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audioPlayer;
      if (this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      this.isPlaying = !this.isPlaying;
    },
    toggleMute() {
      this.$refs.audioPlayer.muted = !this.isMuted;
      this.isMuted = !this.isMuted;
    },
    updateProgress(e) {
      const audio = e.target;
      this.progress = (audio.currentTime / audio.duration) * 100;
    }
  }
};
</script>`,
      vue3: `<EdMediaCard
  variant="audio"
  src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  title="SoundHelix Song #1"
  description="Música gerada algoritmicamente"
  :downloadable="true"
  @play="() => console.log('Reproduzindo')"
  @pause="() => console.log('Pausado')"
/>`,
    },
  },
};

/**
 * Dynamic - Auto-detecta tipo de mídia pela extensão do arquivo.
 */
export const Dynamic: Story = {
  render: () => {
    const [selectedMedia, setSelectedMedia] = React.useState<string>(
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
    );

    const mediaOptions = [
      {
        label: "Imagem (JPEG)",
        value: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
      },
      {
        label: "Vídeo (MP4)",
        value:
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        label: "Áudio (MP3)",
        value: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
    ];

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          {mediaOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedMedia(option.value)}
              className={`rounded-md px-3 py-2 text-sm font-medium ${
                selectedMedia === option.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <MediaCard
          variant="dynamic"
          src={selectedMedia}
          title="Mídia Auto-Detectada"
          description="O tipo é detectado automaticamente pela extensão do arquivo"
          aspectRatio="video"
          controls={true}
          downloadable={true}
        />
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { MediaCard } from "@fabioeducacross/ui";
import { useState } from "react";

function DynamicMediaPlayer() {
  const [selectedMedia, setSelectedMedia] = useState("image.jpg");

  return (
    <MediaCard
      variant="dynamic"  // Auto-detecta: .jpg → image, .mp4 → video, .mp3 → audio
      src={selectedMedia}
      title="Mídia Auto-Detectada"
      controls={true}
      downloadable={true}
    />
  );
}`,
      vue2: `<!-- Dynamic detecta automaticamente o tipo -->
<template>
  <div>
    <select v-model="selectedMedia" class="form-select mb-3">
      <option value="image.jpg">Imagem (JPEG)</option>
      <option value="video.mp4">Vídeo (MP4)</option>
      <option value="audio.mp3">Áudio (MP3)</option>
    </select>

    <!-- Bootstrap renderiza condicionalmente baseado no tipo -->
    <div class="card">
      <img v-if="mediaType === 'image'" :src="selectedMedia" class="card-img-top" />
      <video v-else-if="mediaType === 'video'" :src="selectedMedia" controls class="card-img-top" />
      <div v-else-if="mediaType === 'audio'" class="card-body">
        <audio :src="selectedMedia" controls class="w-100"></audio>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedMedia: 'image.jpg'
    };
  },
  computed: {
    mediaType() {
      const ext = this.selectedMedia.split('.').pop();
      if (['jpg', 'png', 'gif'].includes(ext)) return 'image';
      if (['mp4', 'webm'].includes(ext)) return 'video';
      if (['mp3', 'wav'].includes(ext)) return 'audio';
      return 'image';
    }
  }
};
</script>`,
      vue3: `<EdMediaCard
  variant="dynamic"
  :src="selectedMedia"
  title="Mídia Auto-Detectada"
  :controls="true"
  :downloadable="true"
/>`,
    },
  },
};

/**
 * AspectRatios - Diferentes proporções de aspecto.
 */
export const AspectRatios: Story = {
  render: () => {
    const ratios = [
      { value: "video", label: "16:9 (Video)" },
      { value: "square", label: "1:1 (Square)" },
      { value: "portrait", label: "3:4 (Portrait)" },
      { value: "wide", label: "21:9 (Wide)" },
    ] as const;

    return (
      <div className="grid grid-cols-2 gap-4">
        {ratios.map(({ value, label }) => (
          <div key={value} className="space-y-2">
            <p className="text-center text-sm font-medium">{label}</p>
            <MediaCard
              variant="image"
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
              aspectRatio={value}
              title={label}
            />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `<MediaCard
  variant="image"
  src="image.jpg"
  aspectRatio="video"  // video | square | portrait | wide | auto
/>`,
      vue2: `<img 
  src="image.jpg" 
  style="aspect-ratio: 16/9; object-fit: cover;"
  class="card-img-top"
/>`,
      vue3: `<EdMediaCard
  variant="image"
  src="image.jpg"
  aspect-ratio="video"
/>`,
    },
  },
};

/**
 * SocialMediaPost - Simulação de post em rede social.
 */
export const SocialMediaPost: Story = {
  render: () => {
    const [liked, setLiked] = React.useState(false);
    const [bookmarked, setBookmarked] = React.useState(false);

    const actions: MediaCardAction[] = [
      {
        icon: <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />,
        label: liked ? "Descurtir" : "Curtir",
        onClick: () => setLiked(!liked),
      },
      {
        icon: <MessageCircle className="h-4 w-4" />,
        label: "Comentar",
        onClick: () => alert("Abrir comentários"),
      },
      {
        icon: <Share2 className="h-4 w-4" />,
        label: "Compartilhar",
        onClick: () => alert("Compartilhar"),
      },
      {
        icon: <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />,
        label: bookmarked ? "Remover" : "Salvar",
        onClick: () => setBookmarked(!bookmarked),
        variant: "default",
      },
    ];

    return (
      <div className="w-[500px]">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
          <div>
            <p className="font-semibold">@fotografo_aventuras</p>
            <p className="text-xs text-muted-foreground">2 horas atrás</p>
          </div>
        </div>

        <MediaCard
          variant="image"
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=800&fit=crop"
          aspectRatio="square"
          description="Montanhas cobertas de neve no pôr do sol 🏔️✨ #paisagem #fotografia #natureza"
          actions={actions}
        />

        <div className="mt-3 text-sm text-muted-foreground">
          <p>
            <strong>1.234 curtidas</strong>
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `import { MediaCard } from "@fabioeducacross/ui";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { useState } from "react";

function SocialPost() {
  const [liked, setLiked] = useState(false);

  const actions = [
    {
      icon: <Heart className={liked ? "fill-red-500" : ""} />,
      label: liked ? "Descurtir" : "Curtir",
      onClick: () => setLiked(!liked),
    },
    {
      icon: <MessageCircle />,
      label: "Comentar",
      onClick: () => console.log("Comentar"),
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
        <div>
          <p className="font-semibold">@fotografo_aventuras</p>
          <p className="text-xs text-muted-foreground">2 horas atrás</p>
        </div>
      </div>

      <MediaCard
        variant="image"
        src="image.jpg"
        aspectRatio="square"
        description="Montanhas ao pôr do sol 🏔️✨"
        actions={actions}
      />

      <p className="mt-3 text-sm"><strong>1.234 curtidas</strong></p>
    </div>
  );
}`,
      vue2: `<!-- Bootstrap Social Media Post -->
<template>
  <div>
    <div class="d-flex align-items-center gap-3 mb-3">
      <div class="rounded-circle" style="width: 40px; height: 40px; background: linear-gradient(135deg, #a855f7, #ec4899);"></div>
      <div>
        <p class="mb-0 fw-bold">@fotografo_aventuras</p>
        <small class="text-muted">2 horas atrás</small>
      </div>
    </div>

    <div class="card">
      <img src="image.jpg" class="card-img-top" style="aspect-ratio: 1/1; object-fit: cover;" />
      <div class="card-body">
        <p class="card-text">Montanhas ao pôr do sol 🏔️✨</p>
      </div>
      <div class="card-footer d-flex gap-2">
        <button @click="liked = !liked" class="btn btn-sm" :class="liked ? 'btn-danger' : 'btn-outline-secondary'">
          <i class="bi" :class="liked ? 'bi-heart-fill' : 'bi-heart'"></i> {{ liked ? 'Descurtir' : 'Curtir' }}
        </button>
        <button class="btn btn-sm btn-outline-secondary">
          <i class="bi bi-chat"></i> Comentar
        </button>
        <button class="btn btn-sm btn-outline-secondary">
          <i class="bi bi-share"></i> Compartilhar
        </button>
      </div>
    </div>

    <p class="mt-2 small"><strong>1.234 curtidas</strong></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      liked: false
    };
  }
};
</script>`,
      vue3: `<script setup lang="ts">
import { EdMediaCard } from "@fabioeducacross/ui-vue3";
import { Heart, MessageCircle, Share2 } from "lucide-vue-next";
import { ref } from "vue";

const liked = ref(false);
const actions = [
  {
    icon: Heart,
    label: liked.value ? "Descurtir" : "Curtir",
    onClick: () => (liked.value = !liked.value),
  },
];
</script>

<template>
  <div>
    <div class="flex items-center gap-3 mb-3">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
      <div>
        <p class="font-semibold">@fotografo_aventuras</p>
        <p class="text-xs text-muted-foreground">2 horas atrás</p>
      </div>
    </div>

    <EdMediaCard
      variant="image"
      src="image.jpg"
      aspect-ratio="square"
      description="Montanhas ao pôr do sol 🏔️✨"
      :actions="actions"
    />
  </div>
</template>`,
    },
  },
};

/**
 * VideoThumbnailGrid - Grade de thumbnails de vídeos.
 */
export const VideoThumbnailGrid: Story = {
  render: () => {
    const videos = [
      {
        id: 1,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
        title: "Big Buck Bunny",
        description: "8:23",
      },
      {
        id: 2,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
        poster:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Elephants_Dream_s5_both.jpg/400px-Elephants_Dream_s5_both.jpg",
        title: "Elephant's Dream",
        description: "10:53",
      },
      {
        id: 3,
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
        poster:
          "https://storage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
        title: "For Bigger Blazes",
        description: "0:15",
      },
    ];

    return (
      <div className="grid grid-cols-3 gap-4">
        {videos.map((video) => (
          <MediaCard
            key={video.id}
            variant="video"
            src={video.src}
            poster={video.poster}
            title={video.title}
            description={video.description}
            aspectRatio="video"
            controls={true}
          />
        ))}
      </div>
    );
  },
  parameters: {
    multiFrameworkCode: {
      react: `const videos = [
  { id: 1, src: "video1.mp4", poster: "thumb1.jpg", title: "Vídeo 1", duration: "8:23" },
  { id: 2, src: "video2.mp4", poster: "thumb2.jpg", title: "Vídeo 2", duration: "10:53" },
  { id: 3, src: "video3.mp4", poster: "thumb3.jpg", title: "Vídeo 3", duration: "0:15" },
];

<div className="grid grid-cols-3 gap-4">
  {videos.map(video => (
    <MediaCard
      key={video.id}
      variant="video"
      src={video.src}
      poster={video.poster}
      title={video.title}
      description={video.duration}
      controls={true}
    />
  ))}
</div>`,
      vue2: `<div class="row">
  <div v-for="video in videos" :key="video.id" class="col-md-4">
    <div class="card">
      <video :src="video.src" :poster="video.poster" controls class="card-img-top"></video>
      <div class="card-body">
        <h6 class="card-title">{{ video.title }}</h6>
        <small class="text-muted">{{ video.duration }}</small>
      </div>
    </div>
  </div>
</div>`,
      vue3: `<div class="grid grid-cols-3 gap-4">
  <EdMediaCard
    v-for="video in videos"
    :key="video.id"
    variant="video"
    :src="video.src"
    :poster="video.poster"
    :title="video.title"
    :description="video.duration"
    :controls="true"
  />
</div>`,
    },
  },
};
