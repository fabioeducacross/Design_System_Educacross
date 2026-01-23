# Quickstart: Multi-Framework Usage

## 1. React → Vue 2 → Vue 3 Prop Mapping

### 1.1. Core Props Translation

| Feature | React (Official) | Vue 2 Bootstrap (Functional) | Vue 3 Composition API (Conceptual) |
|---------|------------------|------------------------------|-------------------------------------|
| **Variant** | `variant="default"` | `class="btn-primary"` | `:variant="'primary'"` |
| **Size** | `size="sm"` | `class="btn-sm"` | `:size="'sm'"` |
| **Disabled** | `disabled={true}` | `:disabled="true"` | `:disabled="true"` |
| **Loading** | `loading={true}` | Custom (see below) | `:loading="true"` |
| **Children** | `<Button>Text</Button>` | `<button>Text</button>` | `<EdButton>Text</EdButton>` |
| **Class Names** | `className="extra-class"` | `:class="extraClass"` | `:class="extraClass"` |
| **asChild (Radix Slot)** | `asChild={true}` | ❌ Not supported | `:as-child="true"` |

---

### 1.2. Variant Mapping

**Button Variants:**

| DS Variant | React | Vue 2 Bootstrap Class | Vue 3 |
|------------|-------|-----------------------|-------|
| `default` | `variant="default"` | `btn-primary` | `:variant="'primary'"` |
| `destructive` | `variant="destructive"` | `btn-danger` | `:variant="'danger'"` |
| `outline` | `variant="outline"` | `btn-outline-primary` | `:variant="'outline-primary'"` |
| `secondary` | `variant="secondary"` | `btn-secondary` | `:variant="'secondary'"` |
| `ghost` | `variant="ghost"` | `btn-link` | `:variant="'ghost'"` |
| `link` | `variant="link"` | `btn-link text-primary` | `:variant="'link'"` |

**Badge Variants:**

| DS Variant | React | Vue 2 Bootstrap Class | Vue 3 |
|------------|-------|-----------------------|-------|
| `default` | `variant="default"` | `badge-primary` | `:variant="'primary'"` |
| `secondary` | `variant="secondary"` | `badge-secondary` | `:variant="'secondary'"` |
| `destructive` | `variant="destructive"` | `badge-danger` | `:variant="'danger'"` |
| `outline` | `variant="outline"` | `badge badge-outline-primary` | `:variant="'outline-primary'"` |
| `success` | `variant="success"` | `badge-success` | `:variant="'success'"` |

**Alert Variants:**

| DS Variant | React | Vue 2 Bootstrap Class | Vue 3 |
|------------|-------|-----------------------|-------|
| `default` | `variant="default"` | `alert-info` | `:variant="'info'"` |
| `destructive` | `variant="destructive"` | `alert-danger` | `:variant="'danger'"` |
| `success` | `variant="success"` | `alert-success` | `:variant="'success'"` |
| `warning` | `variant="warning"` | `alert-warning` | `:variant="'warning'"` |

---

## 2. Practical Examples

### 2.1. Button Component

#### React (Official)

```tsx
import { Button } from "@fabioeducacross/ui";

function App() {
  const handleClick = () => {
    console.log("Clicked!");
  };

  return (
    <>
      {/* Default variant */}
      <Button onClick={handleClick}>
        Click Me
      </Button>

      {/* With variant and size */}
      <Button variant="destructive" size="sm">
        Delete
      </Button>

      {/* Loading state */}
      <Button loading={true} disabled={true}>
        Saving...
      </Button>

      {/* As child (Radix Slot pattern) */}
      <Button asChild>
        <a href="/home">Go Home</a>
      </Button>
    </>
  );
}
```

#### Vue 2 Bootstrap (Functional)

```vue
<template>
  <div>
    <!-- Default variant -->
    <button class="btn btn-primary" @click="handleClick">
      Click Me
    </button>

    <!-- With size -->
    <button class="btn btn-danger btn-sm">
      Delete
    </button>

    <!-- Loading state (manual) -->
    <button class="btn btn-primary" :disabled="loading">
      <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
      Saving...
    </button>

    <!-- As link (use <a> tag directly) -->
    <a href="/home" class="btn btn-primary">
      Go Home
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleClick() {
      console.log("Clicked!");
    },
  },
};
</script>
```

**⚠️ Requires Bootstrap CSS:**
```html
<!-- In index.html or main.js -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
```

#### Vue 3 Composition API (Conceptual)

```vue
<script setup lang="ts">
import { EdButton } from "@fabioeducacross/ui-vue3"; // ⚠️ Pacote não existe ainda

const handleClick = () => {
  console.log("Clicked!");
};
</script>

<template>
  <div>
    <!-- Default variant -->
    <EdButton @click="handleClick">
      Click Me
    </EdButton>

    <!-- With variant and size -->
    <EdButton variant="danger" size="sm">
      Delete
    </EdButton>

    <!-- Loading state -->
    <EdButton :loading="true" :disabled="true">
      Saving...
    </EdButton>

    <!-- As child (Radix-style composition) -->
    <EdButton :as-child="true">
      <RouterLink to="/home">Go Home</RouterLink>
    </EdButton>
  </div>
</template>
```

---

### 2.2. Input Component

#### React (Official)

```tsx
import { Input } from "@fabioeducacross/ui";
import { useState } from "react";

function Form() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validate = (value: string) => {
    if (!value.includes("@")) {
      setError("Email inválido");
    } else {
      setError("");
    }
  };

  return (
    <div className="space-y-4">
      {/* Default text input */}
      <Input
        type="text"
        placeholder="Digite seu nome"
      />

      {/* Email with validation */}
      <Input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validate(e.target.value);
        }}
        error={error}
      />

      {/* Password */}
      <Input
        type="password"
        placeholder="Digite sua senha"
      />

      {/* Number with min/max */}
      <Input
        type="number"
        placeholder="Idade"
        min={18}
        max={100}
      />
    </div>
  );
}
```

#### Vue 2 Bootstrap (Functional)

```vue
<template>
  <div>
    <!-- Default text input -->
    <input
      type="text"
      class="form-control"
      placeholder="Digite seu nome"
    />

    <!-- Email with validation -->
    <div class="mb-3">
      <input
        type="email"
        class="form-control"
        :class="{ 'is-invalid': error }"
        placeholder="Digite seu email"
        v-model="email"
        @input="validate"
      />
      <div v-if="error" class="invalid-feedback">
        {{ error }}
      </div>
    </div>

    <!-- Password -->
    <input
      type="password"
      class="form-control"
      placeholder="Digite sua senha"
    />

    <!-- Number with min/max -->
    <input
      type="number"
      class="form-control"
      placeholder="Idade"
      min="18"
      max="100"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      error: "",
    };
  },
  methods: {
    validate() {
      if (!this.email.includes("@")) {
        this.error = "Email inválido";
      } else {
        this.error = "";
      }
    },
  },
};
</script>
```

#### Vue 3 Composition API (Conceptual)

```vue
<script setup lang="ts">
import { EdInput } from "@fabioeducacross/ui-vue3"; // ⚠️ Conceptual
import { ref } from "vue";

const email = ref("");
const error = ref("");

const validate = (value: string) => {
  if (!value.includes("@")) {
    error.value = "Email inválido";
  } else {
    error.value = "";
  }
};
</script>

<template>
  <div class="space-y-4">
    <!-- Default text input -->
    <EdInput
      type="text"
      placeholder="Digite seu nome"
    />

    <!-- Email with validation -->
    <EdInput
      type="email"
      placeholder="Digite seu email"
      v-model="email"
      @update:modelValue="validate"
      :error="error"
    />

    <!-- Password -->
    <EdInput
      type="password"
      placeholder="Digite sua senha"
    />

    <!-- Number with min/max -->
    <EdInput
      type="number"
      placeholder="Idade"
      :min="18"
      :max="100"
    />
  </div>
</template>
```

---

### 2.3. Card Component

#### React (Official)

```tsx
import { Card, CardHeader, CardContent, CardFooter } from "@fabioeducacross/ui";
import { Button } from "@fabioeducacross/ui";

function ProductCard() {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Product Title</h3>
        <p className="text-sm text-muted-foreground">$99.99</p>
      </CardHeader>
      <CardContent>
        <img src="/product.jpg" alt="Product" className="w-full rounded" />
        <p className="mt-4">Product description goes here.</p>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline">Add to Cart</Button>
        <Button>Buy Now</Button>
      </CardFooter>
    </Card>
  );
}
```

#### Vue 2 Bootstrap (Functional)

```vue
<template>
  <div class="card">
    <div class="card-header">
      <h3 class="h5 mb-0">Product Title</h3>
      <p class="text-muted mb-0">$99.99</p>
    </div>
    <div class="card-body">
      <img src="/product.jpg" alt="Product" class="img-fluid rounded" />
      <p class="mt-3">Product description goes here.</p>
    </div>
    <div class="card-footer d-flex justify-content-between">
      <button class="btn btn-outline-primary">Add to Cart</button>
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</template>
```

#### Vue 3 Composition API (Conceptual)

```vue
<script setup lang="ts">
import { EdCard, EdCardHeader, EdCardContent, EdCardFooter } from "@fabioeducacross/ui-vue3"; // Conceptual
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>

<template>
  <EdCard>
    <EdCardHeader>
      <h3 class="text-lg font-semibold">Product Title</h3>
      <p class="text-sm text-muted-foreground">$99.99</p>
    </EdCardHeader>
    <EdCardContent>
      <img src="/product.jpg" alt="Product" class="w-full rounded" />
      <p class="mt-4">Product description goes here.</p>
    </EdCardContent>
    <EdCardFooter class="justify-between">
      <EdButton variant="outline">Add to Cart</EdButton>
      <EdButton>Buy Now</EdButton>
    </EdCardFooter>
  </EdCard>
</template>
```

---

## 3. Event Handlers

### 3.1. Event Mapping

| Event Type | React | Vue 2/3 | Notes |
|------------|-------|---------|-------|
| Click | `onClick={handler}` | `@click="handler"` | - |
| Input Change | `onChange={(e) => handler(e.target.value)}` | `@input="handler"` (Vue 2)<br>`@update:modelValue="handler"` (Vue 3) | Vue 3 uses v-model |
| Focus | `onFocus={handler}` | `@focus="handler"` | - |
| Blur | `onBlur={handler}` | `@blur="handler"` | - |
| Key Press | `onKeyDown={(e) => handler(e.key)}` | `@keydown="handler"` | - |
| Submit | `onSubmit={(e) => { e.preventDefault(); handler(); }}` | `@submit.prevent="handler"` | Vue modifier `.prevent` |
| Mouse Enter | `onMouseEnter={handler}` | `@mouseenter="handler"` | - |
| Mouse Leave | `onMouseLeave={handler}` | `@mouseleave="handler"` | - |

---

### 3.2. v-model (Vue) vs Controlled Components (React)

**React (Controlled):**

```tsx
const [value, setValue] = useState("");

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

**Vue 2 (v-model):**

```vue
<template>
  <input v-model="value" class="form-control" />
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>
```

**Vue 3 (v-model):**

```vue
<script setup lang="ts">
import { ref } from "vue";

const value = ref("");
</script>

<template>
  <EdInput v-model="value" />
</template>
```

**Key Difference:** Vue 2/3 use `v-model` (two-way binding), React uses controlled components (explicit value + onChange).

---

## 4. Composition Patterns

### 4.1. Radix Slot Pattern (asChild)

**React:**

```tsx
import { Button } from "@fabioeducacross/ui";
import { Link } from "react-router-dom";

// Renders <Link> styled as Button
<Button asChild>
  <Link to="/home">Go Home</Link>
</Button>
```

**Vue 2:** ❌ Not supported (use slots instead)

```vue
<!-- Alternative: Custom wrapper -->
<template>
  <router-link to="/home" custom v-slot="{ navigate }">
    <button class="btn btn-primary" @click="navigate">
      Go Home
    </button>
  </router-link>
</template>
```

**Vue 3:** ✅ Supported (conceptual API)

```vue
<EdButton :as-child="true">
  <RouterLink to="/home">Go Home</RouterLink>
</EdButton>
```

---

### 4.2. Slots (Vue) vs Children (React)

**React (Children Prop):**

```tsx
<Card>
  <CardHeader>Title</CardHeader>
  <CardContent>Body</CardContent>
</Card>
```

**Vue 2 (Named Slots):**

```vue
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot> <!-- Default slot -->
    </div>
  </div>
</template>

<!-- Usage -->
<my-card>
  <template v-slot:header>Title</template>
  Body content
</my-card>
```

**Vue 3 (Named Slots):**

```vue
<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<!-- Usage -->
<MyCard>
  <template #header>Title</template>
  Body content
</MyCard>
```

---

## 5. Styling & Tailwind

### 5.1. Class Names

**React:**

```tsx
import { cn } from "@fabioeducacross/ui";

<Button className={cn("mt-4", "hover:bg-primary-dark")}>
  Custom Styled
</Button>
```

**Vue 2:**

```vue
<button :class="['btn btn-primary', 'mt-4', customClass]">
  Custom Styled
</button>
```

**Vue 3:**

```vue
<EdButton :class="cn('mt-4', 'hover:bg-primary-dark')">
  Custom Styled
</EdButton>
```

**Note:** Vue 2 uses array syntax, Vue 3 can use `cn()` helper (if imported).

---

### 5.2. Dynamic Classes

**React:**

```tsx
const [isActive, setIsActive] = useState(false);

<Button className={cn(isActive && "bg-green-500")}>
  {isActive ? "Active" : "Inactive"}
</Button>
```

**Vue 2:**

```vue
<button :class="['btn btn-primary', { 'bg-success': isActive }]">
  {{ isActive ? 'Active' : 'Inactive' }}
</button>
```

**Vue 3:**

```vue
<script setup lang="ts">
import { ref } from "vue";

const isActive = ref(false);
</script>

<template>
  <EdButton :class="{ 'bg-green-500': isActive }">
    {{ isActive ? 'Active' : 'Inactive' }}
  </EdButton>
</template>
```

---

## 6. Common Gotchas & Troubleshooting

### 6.1. Issue: "Bootstrap styles not applied (Vue 2)"

**Problem:** Button shows no styling.

**Solution:** Ensure Bootstrap CSS is imported:

```js
// main.js
import 'bootstrap/dist/css/bootstrap.min.css';
```

Or via CDN:

```html
<!-- index.html -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
```

---

### 6.2. Issue: "Module not found: @fabioeducacross/ui-vue3"

**Problem:** Trying to import Vue 3 components.

**Solution:** Package doesn't exist yet. Use code examples as API reference only:

```vue
<!-- ❌ Won't work -->
<script setup>
import { EdButton } from "@fabioeducacross/ui-vue3";
</script>

<!-- ✅ Use Bootstrap instead (Vue 2) -->
<template>
  <button class="btn btn-primary">Click</button>
</template>
```

---

### 6.3. Issue: "asChild not working (Vue 2)"

**Problem:** `asChild` prop doesn't exist in Vue 2.

**Solution:** Use Vue Router's custom slot:

```vue
<router-link to="/home" custom v-slot="{ navigate, href }">
  <button class="btn btn-primary" @click="navigate" :href="href">
    Go Home
  </button>
</router-link>
```

---

### 6.4. Issue: "TypeScript errors with Vue 3"

**Problem:** `EdButton` has no type definitions.

**Solution:** Package is conceptual; manually define types:

```typescript
// types/ui-vue3.d.ts
declare module "@fabioeducacross/ui-vue3" {
  import { DefineComponent } from "vue";

  export const EdButton: DefineComponent<{
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    loading?: boolean;
  }>;
}
```

---

### 6.5. Issue: "onChange vs @input vs @update:modelValue"

**React:**

```tsx
<Input onChange={(e) => setValue(e.target.value)} />
```

**Vue 2:**

```vue
<!-- Option 1: @input -->
<input @input="value = $event.target.value" />

<!-- Option 2: v-model (recommended) -->
<input v-model="value" />
```

**Vue 3:**

```vue
<!-- Option 1: @update:modelValue -->
<EdInput @update:modelValue="value = $event" />

<!-- Option 2: v-model (recommended) -->
<EdInput v-model="value" />
```

---

## 7. Migration Checklist

### 7.1. React Project (Official)

- [x] Install package: `pnpm add @fabioeducacross/ui`
- [x] Import components: `import { Button } from "@fabioeducacross/ui"`
- [x] Import styles: `import "@fabioeducacross/ui/styles.css"` (if not auto-imported)
- [x] Use TypeScript for type safety
- [x] Follow CVA patterns (variant, size, etc.)

---

### 7.2. Vue 2 Project (Bootstrap)

- [x] Install Bootstrap: `pnpm add bootstrap@5`
- [x] Import Bootstrap CSS: `import 'bootstrap/dist/css/bootstrap.min.css'`
- [x] Copy code examples from Storybook
- [x] Replace DS variant names with Bootstrap classes:
  - `variant="default"` → `class="btn-primary"`
  - `variant="destructive"` → `class="btn-danger"`
- [x] Implement loading state manually (spinner)
- [ ] ⚠️ Avoid `asChild` (not supported)

---

### 7.3. Vue 3 Project (Conceptual)

- [ ] ⚠️ Package doesn't exist yet (`@fabioeducacross/ui-vue3`)
- [x] Use code examples as API reference
- [x] Manually implement components or use Bootstrap temporarily
- [x] Follow Composition API patterns (ref, computed, etc.)
- [x] Prepare for future migration when package is released

---

## 8. Quick Reference Table

| Feature | React | Vue 2 Bootstrap | Vue 3 (Conceptual) |
|---------|-------|-----------------|---------------------|
| **Installation** | `pnpm add @fabioeducacross/ui` | `pnpm add bootstrap@5` | N/A (not published) |
| **Imports** | `import { Button } from "@fabioeducacross/ui"` | `import 'bootstrap/dist/css/bootstrap.min.css'` | `import { EdButton } from "@fabioeducacross/ui-vue3"` |
| **Button** | `<Button>Text</Button>` | `<button class="btn btn-primary">Text</button>` | `<EdButton>Text</EdButton>` |
| **Variants** | `variant="default"` | `class="btn-primary"` | `:variant="'primary'"` |
| **Loading** | `loading={true}` | Manual spinner | `:loading="true"` |
| **Events** | `onClick={handler}` | `@click="handler"` | `@click="handler"` |
| **v-model** | N/A (controlled) | `v-model="value"` | `v-model="value"` |
| **asChild** | `asChild={true}` | ❌ Not supported | `:as-child="true"` |
| **TypeScript** | ✅ Full support | ⚠️ Manual types | ⚠️ Conceptual types |

---

## 9. Resources

**Official Documentation:**
- React: [packages/ui/README.md](../packages/ui/README.md)
- Storybook: [https://69727df0ab06437ceb56a008-puidqfjhhm.chromatic.com/](https://69727df0ab06437ceb56a008-puidqfjhhm.chromatic.com/)

**Bootstrap (Vue 2):**
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Bootstrap Components](https://getbootstrap.com/docs/5.3/components/buttons/)

**Vue 3 (Future):**
- Status: Conceptual (API examples only)
- ETA: TBD (depends on demand)

---

**Status:** ✅ COMPLETA  
**Próximo Passo:** Resolver ambiguidades em plan.md  
**Revisão:** 23/01/2026
