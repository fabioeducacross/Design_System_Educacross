import { 
  Button, 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Input,
  Label,
  Badge,
  Separator
} from "@educacross/ui";
import { Github, Palette, Zap, Shield } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">E</span>
            </div>
            <span className="font-bold text-xl">Educacross DS</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href="http://localhost:6006" target="_blank" rel="noopener noreferrer">
              Storybook
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <Badge className="mb-4" variant="secondary">Next.js 15 + App Router</Badge>
        <h1 className="text-4xl font-bold mb-4">
          Educacross Design System
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Sistema de design moderno com 20+ componentes React, 
          totalmente acessível e pronto para produção.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">
            Começar Agora
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href="https://github.com/fabioeducacross/Design_System_Educacross" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Principais Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Palette className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Design Tokens</CardTitle>
              <CardDescription>
                Sistema completo de tokens CSS para cores, espaçamento e tipografia.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Acessível</CardTitle>
              <CardDescription>
                WCAG 2.1 AA compliant. Todos os componentes testados com leitores de tela.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Performance</CardTitle>
              <CardDescription>
                Tree-shaking automático. Apenas o que você usa é incluído no bundle.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Form Example */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Exemplo de Formulário</h2>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Entre com suas credenciais</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" required>Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="seu@email.com" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" required>Senha</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                />
              </div>

              <Button type="submit" className="w-full">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Feito com ❤️ pela equipe Educacross</p>
        </div>
      </footer>
    </main>
  );
}
