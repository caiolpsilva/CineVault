# 🎬 CineVault - Aplicativo de Busca de Atores e Filmografia

Um aplicativo móvel híbrido desenvolvido em **Ionic 8.0.0 + Angular 20.0.0** (modo standalone) que permite aos usuários pesquisar atores/atrizes e explorar sua filmografia completa. Utiliza a API do TMDb (The Movie Database) para fornecer dados atualizados e precisos sobre o cinema.

![Ionic](https://img.shields.io/badge/Ionic-8.0.0-blue.svg)
![Angular](https://img.shields.io/badge/Angular-20.0.0-red.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.0-blue.svg)
![Capacitor](https://img.shields.io/badge/Capacitor-6.0.0-green.svg)

## 📋 Visão Geral do Projeto

O **CineVault** é uma aplicação mobile-first que oferece uma experiência elegante e intuitiva para descobrir e explorar o trabalho de atores famosos. Com design inspirado no universo cinematográfico, o app combina funcionalidade avançada com uma interface visualmente atraente.

### 🎯 Objetivo Principal
Permitir que usuários encontrem rapidamente atores por nome e visualizem sua filmografia completa, organizada cronologicamente (filmes mais recentes primeiro), com informações detalhadas sobre cada produção.

---

## ✨ Funcionalidades Principais

### 🔍 **Busca Inteligente de Atores**
- **Busca em Tempo Real**: Sugestões aparecem automaticamente conforme o usuário digita (mínimo 2 caracteres)
- **Debouncing Otimizado**: 500ms de delay para evitar requisições excessivas
- **Filtragem Inteligente**: Exclui automaticamente atores sem filmografia disponível
- **Limite de Resultados**: Máximo de 5 sugestões para melhor performance
- **Busca por Perfil**: Apenas atores com foto de perfil são exibidos

### 🎭 **Página de Detalhes do Ator**
- **Informações Completas**: Nome, foto de perfil e biografia (quando disponível)
- **Filmografia Ordenada**: Todos os filmes ordenados por ano de lançamento (mais recentes primeiro)
- **Filtros Automáticos**: Apenas filmes com pôster disponível são mostrados
- **Cards Interativos**: Cada filme apresenta capa, título e ano de lançamento
- **Navegação Fluida**: Botão "Voltar" para retornar à busca

### 🎨 **Interface e Experiência do Usuário**
- **Design Temático**: Tema "Cinema Elegante" com cores inspiradas em Hollywood
- **Responsividade Total**: Adapta-se perfeitamente a diferentes tamanhos de tela
- **Estados de Loading**: Spinners animados durante carregamentos
- **Tratamento de Erros**: Mensagens elegantes para estados de erro
- **Animações Suaves**: Transições fluidas entre estados

### 🔧 **Recursos Técnicos Avançados**
- **Programação Reativa**: Uso extensivo de RxJS com operadores como `debounceTime`, `switchMap` e `forkJoin`
- **Lazy Loading**: Componentes carregados sob demanda via roteamento
- **Standalone Components**: Arquitetura moderna do Angular sem módulos
- **Dependency Injection**: Injeção de dependências para serviços
- **TrackBy Functions**: Otimização de performance em listas

---

## 🏗️ Arquitetura e Estrutura do Projeto

### 📁 **Estrutura de Diretórios Detalhada**
```
src/
├── app/
│   ├── app.component.html/ts/scss      # Componente raiz da aplicação
│   ├── app.routes.ts                    # Configuração de rotas (lazy loading)
│   ├── home/                           # Página inicial (busca de atores)
│   │   ├── home.page.html              # Template com seção hero e busca
│   │   ├── home.page.ts                # Lógica de busca reativa
│   │   └── home.page.scss              # Estilos da página inicial
│   ├── detalhes-ator/                  # Página de detalhes do ator
│   │   ├── actor-details.page.html     # Template com hero e grid de filmes
│   │   ├── actor-details.page.ts       # Lógica de carregamento de dados
│   │   └── actor-details.page.scss     # Estilos da página de detalhes
│   ├── services/                       # Camada de serviços
│   │   └── movie.service.ts            # Serviço para API do TMDb
│   ├── pipes/                          # Pipes personalizados
│   │   └── truncate.pipe.ts            # Pipe para truncar textos
│   ├── diretivas/                      # Diretivas personalizadas
│   │   └── highlight.directive.ts      # Diretiva para destacar elementos
│   └── main.ts                         # Ponto de entrada da aplicação
├── environments/                       # Configurações de ambiente
│   ├── environment.ts                  # Ambiente de desenvolvimento
│   └── environment.prod.ts             # Ambiente de produção
├── theme/                              # Tema global da aplicação
│   └── variables.scss                  # Variáveis CSS e tema cinema
├── assets/                             # Recursos estáticos
├── global.scss                         # Estilos globais
└── index.html                          # HTML principal
```

### 🧩 **Componentes Principais**

#### **HomePage (`src/app/home/`)**
- **Responsabilidades**:
  - Gerenciar busca de atores
  - Exibir sugestões em tempo real
  - Navegar para página de detalhes
  - Controlar estados de loading
- **Funcionalidades Técnicas**:
  - Subject RxJS para busca reativa
  - ForkJoin para filtragem paralela
  - TrackBy para otimização de listas

#### **ActorDetailsPage (`src/app/detalhes-ator/`)**
- **Responsabilidades**:
  - Carregar detalhes do ator por ID
  - Buscar e ordenar filmografia
  - Exibir grid responsivo de filmes
  - Gerenciar estados de loading/erro
- **Funcionalidades Técnicas**:
  - ActivatedRoute para parâmetros de rota
  - Ordenação por data de lançamento
  - Filtros de conteúdo (apenas com pôster)

#### **MovieService (`src/app/services/movie.service.ts`)**
- **Métodos Disponíveis**:
  - `buscarAtor(nome: string)`: Busca atores por nome
  - `obterCreditosFilme(idAtor: number)`: Busca filmografia
  - `obterDetalhesAtor(idAtor: number)`: Detalhes completos do ator
  - `obterAtoresPopulares()`: Atores populares (não utilizado)
  - `obterFilmesPopulares()`: Filmes populares (não utilizado)

---

## 🛠️ Tecnologias e Dependências

### **Core Framework**
- **Ionic 8.0.0**: Framework para desenvolvimento mobile híbrido
- **Angular 20.0.0**: Framework web para SPAs
- **TypeScript 5.8.0**: Superset JavaScript com tipagem estática
- **Capacitor 6.0.0**: Runtime nativo para web apps

### **Bibliotecas de Programação Reativa**
- **RxJS ~7.8.0**: Programação reativa para streams de dados
- **Zone.js ~0.15.0**: Execução de tarefas assíncronas

### **UI e Estilização**
- **Ionicons 7.0.0**: Biblioteca de ícones
- **SCSS**: Pré-processador CSS para estilos avançados

### **Desenvolvimento e Build**
- **Angular CLI 20.0.0**: Ferramentas de desenvolvimento
- **Angular DevKit**: Build e desenvolvimento
- **ESLint**: Linting e qualidade de código

### **Dependências de Produção**
```json
{
  "@angular/animations": "^20.0.0",
  "@angular/common": "^20.0.0",
  "@angular/compiler": "^20.0.0",
  "@angular/core": "^20.0.0",
  "@angular/forms": "^20.0.0",
  "@angular/platform-browser": "^20.0.0",
  "@angular/platform-browser-dynamic": "^20.0.0",
  "@angular/router": "^20.0.0",
  "@ionic/angular": "^8.0.0",
  "ionicons": "^7.0.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0"
}
```

---

## 🚀 Instalação e Configuração

### **Pré-requisitos**
- **Node.js**: Versão 18 ou superior
- **npm**: Gerenciador de pacotes (incluído com Node.js)
- **Ionic CLI**: `npm install -g @ionic/cli`
- **Git**: Para controle de versão

### **Passos de Instalação**

1. **Clone o Repositório**
   ```bash
   git clone <url-do-repositorio>
   cd marlon-app
   ```

2. **Instale as Dependências**
   ```bash
   npm install
   ```

3. **Configure a API do TMDb**
   - Acesse [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Crie uma conta gratuita
   - Vá para "API" → gere uma chave de leitura
   - Edite `src/environments/environment.ts`:
     ```typescript
     export const environment = {
       production: false,
       tmdbApiKey: 'SUA_CHAVE_AQUI'
     };
     ```
   - Edite também `src/environments/environment.prod.ts` com a mesma chave

4. **Execute o Aplicativo**
   ```bash
   npm start
   # ou
   ionic serve
   ```
   - Acesse: `http://localhost:4200`

### **Execução em Dispositivo Móvel**

1. **Adicione Plataformas**
   ```bash
   npx cap add android  # Para Android
   npx cap add ios      # Para iOS
   ```

2. **Sincronize e Execute**
   ```bash
   npx cap sync
   npx cap run android  # ou ios
   ```

---

## 📱 Manual do Usuário

### **Fluxo de Uso Típico**

#### **1. Tela Inicial**
- **Seção Hero**: Apresentação visual elegante com chamada para ação
- **Campo de Busca**: Barra de pesquisa com placeholder intuitivo
- **Busca Automática**: Sugestões aparecem conforme digitação

#### **2. Busca de Atores**
- Digite pelo menos 2 caracteres no campo de busca
- Aguarde as sugestões carregarem automaticamente
- Cada sugestão mostra foto do perfil e nome do ator
- Clique em qualquer ator para ver detalhes

#### **3. Página de Detalhes**
- **Cabeçalho**: Nome do ator e botão voltar
- **Seção Hero**: Foto grande do perfil e nome destacado
- **Filmografia**: Grid responsivo com todos os filmes
- Cada filme mostra: pôster, título e ano de lançamento

### **Estados da Aplicação**
- **Carregando**: Spinner animado durante buscas
- **Erro**: Mensagens no console para debugging
- **Sem Resultados**: Estados elegantes para conteúdo vazio
- **Offline**: Tratamento de erros de conectividade

---

## 🔧 Implementação Técnica Detalhada

### **Configuração da API TMDb**

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  tmdbApiKey: '3f921d9328159de4ae601eb9ce4bcdb9'  // Exemplo
};
```

### **Serviço de Filmes (MovieService)**

```typescript
@Injectable({
  providedIn: 'root'
})
export class ServicoFilme {
  private urlBase = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  buscarAtor(nome: string): Observable<any> {
    return this.http.get(
      `${this.urlBase}/search/person?api_key=${environment.tmdbApiKey}&query=${nome}`
    );
  }

  obterCreditosFilme(idAtor: number): Observable<any> {
    return this.http.get(
      `${this.urlBase}/person/${idAtor}/movie_credits?api_key=${environment.tmdbApiKey}&language=pt-BR`
    );
  }

  obterDetalhesAtor(idAtor: number): Observable<any> {
    return this.http.get(
      `${this.urlBase}/person/${idAtor}?api_key=${environment.tmdbApiKey}&language=pt-BR`
    );
  }
}
```

### **Busca Reativa na HomePage**

```typescript
export class PaginaInicial implements OnInit, OnDestroy {
  private assuntoBusca = new Subject<string>();
  private destruir$ = new Subject<void>();

  ngOnInit() {
    this.assuntoBusca.pipe(
      debounceTime(500),           // Delay de 500ms
      distinctUntilChanged(),      // Evita buscas duplicadas
      takeUntil(this.destruir$),   // Cleanup automático
      switchMap(query => {         // Cancela requisições anteriores
        if (query.length >= 2) {
          this.carregando = true;
          return this.servicoFilme.buscarAtor(query).pipe(
            catchError(error => {
              console.error('Erro na busca:', error);
              this.carregando = false;
              return of({ results: [] });
            })
          );
        } else {
          return of({ results: [] });
        }
      })
    ).subscribe(response => {
      // Processamento dos resultados
      const atoresComProfile = (response.results || [])
        .filter(ator => ator.profile_path)
        .slice(0, 10);

      if (atoresComProfile.length > 0) {
        this.filtrarAtoresComFilmes(atoresComProfile);
      } else {
        this.atores = [];
        this.carregando = false;
      }
    });
  }

  filtrarAtoresComFilmes(atores: any[]) {
    const requisicoesCreditos = atores.map(ator =>
      this.servicoFilme.obterCreditosFilme(ator.id).pipe(
        catchError(() => of({ cast: [] }))
      )
    );

    forkJoin(requisicoesCreditos).subscribe(respostasCreditos => {
      this.atores = atores
        .map((ator, index) => ({
          ...ator,
          hasMovies: (respostasCreditos[index].cast || [])
            .filter(movie => movie.poster_path).length > 0
        }))
        .filter(ator => ator.hasMovies)
        .slice(0, 5);
      this.carregando = false;
    });
  }
}
```

### **Roteamento com Lazy Loading**

```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.PaginaInicial),
  },
  {
    path: 'detalhes-ator/:id',
    loadComponent: () => import('./detalhes-ator/actor-details.page').then(m => m.PaginaDetalhesAtor),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
```

### **Pipe Personalizado para Truncar Textos**

```typescript
@Pipe({ name: 'truncar' })
export class PipeTruncar implements PipeTransform {
  transform(valor: string, limite: number = 100): string {
    if (!valor) return '';
    return valor.length > limite ? valor.substring(0, limite) + '...' : valor;
  }
}
```

### **Diretiva Personalizada (Estrutura Preparada)**

```typescript
@Directive({ selector: '[appDestacar]' })
export class DiretivaDestacar {
  // Estrutura preparada para futuras implementações de hover/highlight
}
```

---

## 🎨 Design System e Estilização

### **Paleta de Cores (Tema Cinema)**

```scss
:root {
  // Tons escuros elegantes
  --ion-color-primary: #1a1a2e;      // Azul muito escuro
  --ion-color-secondary: #d4af37;    // Dourado clássico

  // Gradientes especiais
  --gradient-primary: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
  --gradient-secondary: linear-gradient(135deg, #d4af37 0%, #f4e87c 100%);
}
```

### **Componentes de UI Utilizados**
- `ion-header` / `ion-toolbar` / `ion-title`
- `ion-content` com fullscreen
- `ion-searchbar` com backdrop-filter
- `ion-list` / `ion-item` / `ion-avatar`
- `ion-card` com glassmorphism
- `ion-button` com bordas arredondadas
- `ion-spinner` para loading states
- `ion-back-button` para navegação

### **Técnicas de Estilização Avançadas**
- **Glassmorphism**: Efeitos de vidro com backdrop-filter
- **Gradientes**: Backgrounds dinâmicos e texturas
- **Box-shadow**: Sombras suaves para profundidade
- **Border-radius**: Bordas arredondadas consistentes
- **Responsive Grid**: Layout adaptável com CSS Grid
- **Scrollbar Customizado**: Estilização da barra de rolagem

---

## ⚡ Performance e Otimizações

### **Técnicas Implementadas**

#### **1. Debouncing na Busca**
- Delay de 500ms evita requisições excessivas
- `distinctUntilChanged()` previne buscas duplicadas

#### **2. Filtragem Paralela com forkJoin**
- Múltiplas requisições simultâneas para verificar filmografia
- Reduz tempo total de carregamento

#### **3. Lazy Loading de Componentes**
- Páginas carregadas sob demanda
- Reduz bundle inicial da aplicação

#### **4. TrackBy Functions**
- Otimização de re-renderização em listas
- Identificação única por ID do ator/filme

#### **5. Filtros de Conteúdo**
- Apenas atores com foto de perfil
- Apenas filmes com pôster disponível
- Limitação de resultados (máx. 5 sugestões)

#### **6. Loading States**
- Feedback visual durante operações assíncronas
- Prevenção de múltiplas requisições simultâneas

---

## 📊 Estrutura de Dados e APIs

### **Endpoints TMDb Utilizados**

#### **1. Busca de Pessoas**
```
GET /search/person
```
**Parâmetros**: `api_key`, `query` (nome do ator)
**Resposta**: Lista de pessoas matching a query

#### **2. Créditos de Filmes**
```
GET /person/{person_id}/movie_credits
```
**Parâmetros**: `api_key`, `language=pt-BR`
**Resposta**: Filmes em que a pessoa atuou

#### **3. Detalhes da Pessoa**
```
GET /person/{person_id}
```
**Parâmetros**: `api_key`, `language=pt-BR`
**Resposta**: Informações completas da pessoa

### **Estrutura de Dados**

#### **Objeto Ator (Person)**
```typescript
interface Ator {
  id: number;
  name: string;
  profile_path: string;     // Caminho para foto de perfil
  popularity: number;
  known_for_department: string;
}
```

#### **Objeto Filme (Movie)**
```typescript
interface Filme {
  id: number;
  title: string;
  poster_path: string;      // Caminho para pôster
  release_date: string;     // Data de lançamento
  vote_average: number;     // Avaliação média
  overview: string;         // Sinopse
}
```

---

## 🧪 Testes e Qualidade

### **Configuração de Testes**
- **Karma**: Test runner configurado
- **Jasmine**: Framework de testes
- **Angular Testing Utilities**: Utilitários para testes de componentes

### **Scripts Disponíveis**
```json
{
  "test": "ng test",
  "lint": "ng lint"
}
```

### **Estrutura de Testes**
- Testes unitários para serviços
- Testes de componentes para páginas
- Cobertura configurada com karma-coverage

---

## 🚀 Deploy e Distribuição

### **Build de Produção**
```bash
npm run build
# ou
ionic build --prod
```

### **Deploy no Capacitor**
```bash
npx cap sync
npx cap open android  # Abre no Android Studio
npx cap open ios      # Abre no Xcode
```

### **Otimização para Produção**
- **AOT Compilation**: Compilação ahead-of-time
- **Tree Shaking**: Remoção de código não utilizado
- **Minificação**: Redução do tamanho do bundle
- **Source Maps**: Para debugging em produção

---

## 🔍 Troubleshooting

### **Problemas Comuns**

#### **API Key Inválida**
- Verifique se a chave do TMDb está correta em `environment.ts`
- Confirme que a chave tem permissões de leitura

#### **Busca Não Funciona**
- Verifique conectividade com internet
- Confirme que digitou pelo menos 2 caracteres
- Verifique console para erros de CORS

#### **Imagens Não Carregam**
- URLs do TMDb podem mudar - verificar documentação
- Verificar se `poster_path` e `profile_path` existem

#### **Performance Lenta**
- Verificar se debouncing está funcionando (500ms)
- Confirmar que filtros estão aplicados corretamente

---

## 📈 Roadmap e Melhorias Futuras

### **Funcionalidades Planejadas**
- [ ] **Favoritos**: Sistema de atores favoritos
- [ ] **Cache**: Cache local de resultados
- [ ] **Offline**: Modo offline básico
- [ ] **Compartilhamento**: Compartilhar perfil de ator
- [ ] **Filtros Avançados**: Por gênero, ano, etc.
- [ ] **Biografia Completa**: Expandir seção de biografia
- [ ] **Avaliações**: Mostrar ratings dos filmes
- [ ] **Trending**: Atores em alta

### **Melhorias Técnicas**
- [ ] **PWA**: Progressive Web App
- [ ] **Service Worker**: Cache avançado
- [ ] **Unit Tests**: Cobertura completa
- [ ] **E2E Tests**: Testes end-to-end
- [ ] **CI/CD**: Pipeline de deploy automático
- [ ] **Analytics**: Rastreamento de uso

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👥 Contribuição

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter um PR.

### **Passos para Contribuir**
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ usando Ionic + Angular**
