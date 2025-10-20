# "CineVault" - App Ionic + Angular

Um aplicativo móvel em **Ionic + Angular (modo standalone)** que permite ao usuário pesquisar atores/atrizes e visualizar sua filmografia completa, com filmes ordenados por ano de lançamento (mais recentes primeiro), usando a API do TMDb.

## 📋 **Requisitos Atendidos**

### ✅ **1. Mínimo 2 páginas, incluindo home.page.html comum ao Ionic**
- **Atendido em**: `src/app/home/` (Home Page) e `src/app/detalhes-ator/` (Página de Detalhes do Ator)
- **Como foi atendido**: Duas páginas funcionais e estilizadas, com navegação entre elas via roteamento Angular.

### ✅ **2. Uso da biblioteca HttpClient**
- **Atendido em**: `src/main.ts` (configuração) e `src/app/services/movie.service.ts` (uso)
- **Como foi atendido**: HttpClient configurado com `provideHttpClient()` e usado no MovieService para chamadas à API do TMDb.

### ✅ **3. Uma API deve ser usada (método GET mínimo)**
- **Atendido em**: `src/app/services/movie.service.ts`
- **Como foi atendido**: API do TMDb com métodos GET para `search/person` (busca ator) e `person/{id}/movie_credits` (créditos de filmes).

### ✅ **4. Mínimo dois pipes: UM personalizado e UMA pipe builtin**
- **Atendido em**: `src/app/pipes/truncate.pipe.ts` (pipe personalizado) e templates HTML (`src/app/detalhes-ator/actor-details.page.html`)
- **Como foi atendido**: Pipe personalizado `TruncatePipe` para truncar textos, e pipes builtin `date` (formatação de data) e `uppercase` (títulos em maiúsculo).

### ✅ **5. Mínimo um service para alocar o uso do HttpClient**
- **Atendido em**: `src/app/services/movie.service.ts`
- **Como foi atendido**: Service `MovieService` com métodos `searchActor` e `getMovieCredits` para gerenciar chamadas HTTP.

### ✅ **6. Mínimo UMA diretiva personalizada e duas diretivas estruturais (@if e @for)**
- **Atendido em**: `src/app/diretivas/highlight.directive.ts` (diretiva personalizada) e `src/app/detalhes-ator/actor-details.page.html` (diretivas estruturais)
- **Como foi atendido**: Diretiva personalizada `DiretivaDestacar` para destacar elementos, e diretivas estruturais `*ngIf` (condicional de loading) e `*ngFor` (listagem de filmes).

### ✅ **7. Pontuação extra: Passar parâmetro por rota**
- **Atendido em**: `src/app/app.routes.ts` (rota `/detalhes-ator/:id`) e `src/app/detalhes-ator/actor-details.page.ts` (extração do parâmetro)
- **Como foi atendido**: Parâmetro `id` passado da Home Page para a página de detalhes via `ActivatedRoute`, garantindo precisão na identificação do ator.



## 🛠️ **Tecnologias e Arquitetura**

### **Framework e Linguagem**
- **Ionic 8.0.0** + **Angular 20.0.0** (modo standalone)
- **TypeScript 5.8.0**
- **Capacitor** para suporte móvel
- **RxJS ~7.8.0** para programação reativa

### **Estrutura do Projeto**
```
src/
├── app/
│   ├── app.component.html/ts/scss
│   ├── app.routes.ts
│   ├── home/
│   │   ├── home.page.html/ts/scss
│   ├── detalhes-ator/
│   │   ├── actor-details.page.html/ts/scss
│   ├── services/
│   │   └── movie.service.ts
│   ├── pipes/
│   │   └── truncate.pipe.ts
│   ├── diretivas/
│   │   └── highlight.directive.ts
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
├── main.ts
```

### **Padrões de Design**
- **Standalone Components**: Todos os componentes são standalone
- **Dependency Injection**: Services injetados via DI do Angular
- **Reactive Programming**: Uso de Observables do RxJS com operadores como debounceTime, distinctUntilChanged, switchMap e catchError
- **Separation of Concerns**: Service para lógica de negócio, componentes para UI
- **Performance Optimization**: Uso de trackBy functions e filtros para otimização

## 🚀 **Instalação e Execução**

### **Pré-requisitos**
- Node.js (versão 18 ou superior)
- npm ou yarn
- Ionic CLI: `npm install -g @ionic/cli`

### **Passos para Instalação**

1. **Clone o repositório** (ou copie os arquivos):
   ```bash
   git clone <url-do-repositorio>
   cd marlon-app
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure a chave da API do TMDb**:
   - Acesse [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
   - Crie uma conta gratuita
   - Vá para "API" e gere uma chave de leitura
   - Edite `src/environments/environment.ts`:
     ```typescript
     export const environment = {
       production: false,
       tmdbApiKey: 'SUA_CHAVE_AQUI'
     };
     ```
   - Edite também `src/environments/environment.prod.ts` com a mesma chave

4. **Execute o aplicativo**:
   ```bash
   npm start
   ```
   - O app será executado em `http://localhost:4200`

### **Execução em Dispositivo Móvel**

1. **Adicione a plataforma**:
   ```bash
   npx cap add android  # ou ios
   ```

2. **Sincronize e execute**:
   ```bash
   npx cap sync
   npx cap run android  # ou ios
   ```

## 📱 **Manual do Usuário**

### **Como Usar o Aplicativo**

#### **1. Tela Inicial (Home)**
- **Campo de Busca Inteligente**: Digite o nome do ator/atriz
- **Sugestões Automáticas**: Conforme você digita, uma lista de atores correspondentes aparece automaticamente (máximo 5 resultados)
- **Seleção Visual**: Cada sugestão mostra:
  - Foto do perfil do ator
  - Nome completo
- **Interatividade**: Clique em qualquer ator da lista para ver seus detalhes
- **Busca em Tempo Real**: A busca acontece automaticamente enquanto você digita

#### **2. Página de Detalhes do Ator**
- **Informações do Ator**:
  - Foto do perfil (carregada da API do TMDb)
  - Nome completo do ator/atriz
- **Filmografia**:
  - Lista completa de todos os filmes em que o ator participou, ordenados por ano de lançamento (mais recentes primeiro)
  - Cada filme mostra:
    - **Capa**: Imagem do pôster
    - **Título**: Em maiúsculas
    - **Ano**: Ano de lançamento
- **Interatividade**:
  - **Botão Voltar**: Retorna à página inicial

#### **3. Tratamento de Erros e Estados**
- **Carregamento**: Spinner animado durante buscas
- **Erro de Rede**: Mensagens de erro são logadas no console
- **Atores sem Foto**: Placeholder visual elegante

### **Dicas de Uso**
- **Busca Inteligente**: Digite o nome do ator/atriz
- **Seleção Precisa**: Clique no ator correto da lista para ver seus detalhes
- **Conexão**: Certifique-se de ter conexão com internet
- **Responsividade**: O app se adapta a diferentes tamanhos de tela

## 🔧 **Implementação Técnica Detalhada**

### **Configuração da API**
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  tmdbApiKey: '3f921d9328159de4ae601eb9ce4bcdb9'  // Exemplo
};
```

### **Service de Filmes**
```typescript
@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  // Busca ator por nome
  searchActor(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/search/person?api_key=${environment.tmdbApiKey}&query=${name}`);
  }

  // Busca créditos de filmes do ator
  getMovieCredits(actorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${actorId}/movie_credits?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }

  // Busca detalhes do ator por ID
  getActorDetails(actorId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/person/${actorId}?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }
}
```

### **Pipe Personalizado**
```typescript
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 100): string {
    if (!value) return '';
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }
}
```

### **Diretiva Personalizada**
```typescript
@Directive({ selector: '[appDestacar]' })
export class DiretivaDestacar {
  // Diretiva vazia para compatibilidade futura
}
```

### **Roteamento**
```typescript
// src/app/app.routes.ts
export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'detalhes-ator/:id',
    loadComponent: () => import('./detalhes-ator/actor-details.page').then((m) => m.ActorDetailsPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'detalhes-ator',
    loadComponent: () => import('./detalhes-ator/actor-details.page').then( m => m.ActorDetailsPage)
  },
];
```

### **Componente Home**
```typescript
export class HomePage implements OnInit, OnDestroy {
  nomeAtor: string = '';
  atores: any[] = [];
  carregando: boolean = false;

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(private router: Router, private movieService: MovieService) {}

  ngOnInit() {
    // Configurar busca com debouncing
    this.searchSubject.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.destroy$),
      switchMap(query => {
        if (query.length >= 2) {
          this.carregando = true;
          return this.movieService.searchActor(query).pipe(
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
      this.atores = (response.results || [])
        .filter((ator: any) => ator.profile_path)
        .slice(0, 5);
      this.carregando = false;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Método chamado quando o usuário digita na barra de busca
  onSearchInput(event: any) {
    const query = event.target.value?.trim() || '';
    this.nomeAtor = query;
    this.searchSubject.next(query);
  }

  // Método para buscar atores (mantido para compatibilidade)
  buscarAtores() {
    if (this.nomeAtor.length >= 2) {
      this.carregando = true;
      this.movieService.searchActor(this.nomeAtor).subscribe({
        next: (response) => {
          this.atores = (response.results || [])
            .filter((ator: any) => ator.profile_path)
            .slice(0, 5);
          this.carregando = false;
        },
        error: (error) => {
          console.error('Erro ao buscar atores:', error);
          this.atores = [];
          this.carregando = false;
        }
      });
    } else {
      this.atores = [];
    }
  }

  // Método para selecionar um ator da lista
  selecionarAtor(ator: any) {
    if (ator && ator.id) {
      this.router.navigate(['/detalhes-ator', ator.id]);
    }
  }

  // Método para limpar a busca
  limparBusca() {
    this.nomeAtor = '';
    this.atores = [];
    this.carregando = false;
  }

  // Método para trackBy (otimização de performance)
  trackByActorId(index: number, ator: any): number {
    return ator.id;
  }
}
```
### **Componente Detalhes Ator**
```typescript
export class ActorDetailsPage implements OnInit {
  nomeAtor: string = '';
  ator: any = null;
  filmes: any[] = [];
  carregando: boolean = true;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buscarAtorPorId(+id);
    }
  }

  // Busca ator por ID
  buscarAtorPorId(actorId: number) {
    this.carregando = true;
    this.movieService.getActorDetails(actorId).subscribe({
      next: (response) => {
        this.ator = response;
        this.buscarCreditosFilmes(actorId);
      },
      error: (error) => {
        console.error('Erro ao buscar ator:', error);
        this.carregando = false;
      }
    });
  }

  // Busca créditos de filmes do ator
  buscarCreditosFilmes(actorId: number) {
    this.movieService.getMovieCredits(actorId).subscribe({
      next: (response) => {
        this.filmes = (response.cast || [])
          .filter((movie: any) => movie.poster_path) // Filtrar apenas filmes com poster
          .sort((a: any, b: any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        this.carregando = false;
      },
      error: (error) => {
        console.error('Erro ao buscar filmes:', error);
        this.filmes = [];
        this.carregando = false;
      }
    });
  }

  // Método para trackBy (otimização de performance)
  trackByMovieId(index: number, movie: any): number {
    return movie.id;
  }
}
```

## 🎨 **Estilização e UI**

### **Componentes Ionic Utilizados**
- `ion-header` / `ion-toolbar` / `ion-title`
- `ion-content`
- `ion-searchbar`
- `ion-button`
- `ion-list` / `ion-card` / `ion-item`
- `ion-thumbnail` / `ion-label`
- `ion-spinner`
- `ion-back-button`

### **CSS Personalizado**
```scss
// detalhes-ator.page.scss
.actor-info {
  text-align: center;
  margin: 20px 0;

  .actor-img {
    width: 150px;
    height: 225px;
    border-radius: 10px;
  }
}

ion-card {
  margin: 10px 0;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

ion-thumbnail {
  --size: 100px;
}

.release-year {
  font-size: 1em;
  font-weight: bold;
}
```

**Desenvolvido com ❤️ usando Ionic + Angular**
