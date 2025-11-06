# Documentação do Projeto: CineVault - Conheça a Filmografia do Ator/Atriz

Olá! Bem-vindo à documentação completa do meu projeto de período. Aqui, vou explicar de forma bem detalhada e humana como eu construí este aplicativo, atendendo a cada uma das regras que foram estabelecidas. Imagine que estamos em uma apresentação: eu vou falar passo a passo, como se estivesse mostrando o código na tela, explicando o porquê de cada decisão e como tudo se conecta. O projeto é um app chamado CineVault, que ajuda as pessoas a descobrirem atores e atrizes famosos e verem todos os filmes em que eles atuaram. Vamos lá?

## Requisitos Atendidos - Uma Explicação Detalhada

### 1. O projeto deve ser montado com, no mínimo, 2 pages, incluindo a home.page.html comum ao ionic. - 0.5 ponto

Vamos começar pelo básico: o projeto precisa ter pelo menos duas páginas, e uma delas deve ser a home.page.html, que é aquela página inicial padrão do Ionic. Eu criei duas páginas principais que fazem sentido para o app:

- **Página Home (home.page.html)**: Esta é a porta de entrada do aplicativo. Quando o usuário abre o app, ele vê uma tela bonita com um título "Descubra Atores" e um botão que rola suavemente para a seção de busca. É como uma vitrine: chama a atenção e guia o usuário para começar a explorar. Usei componentes do Ionic como ion-header, ion-toolbar e ion-content para criar essa estrutura, que é bem comum em apps móveis. A página é standalone, ou seja, independente, o que facilita a manutenção no Angular.

- **Página de Detalhes do Ator (actor-details.page.html)**: Esta é a segunda página, onde mostramos informações detalhadas sobre um ator específico. Tem um cabeçalho com botão de voltar, uma foto grande do ator, o nome dele, e uma grade com todos os filmes que ele fez. É organizada de forma que o usuário possa navegar facilmente de volta para a home. Também é standalone e usa Ionic para os cards dos filmes.

Essas duas páginas estão conectadas por roteamento no Angular, então o usuário pode ir da home para os detalhes e voltar. É simples, mas funcional, e atende exatamente ao que foi pedido: mínimo duas páginas, incluindo a home padrão do Ionic.

**Localização:**
- Página Home: `src/app/home/home.page.html`
- Página de Detalhes: `src/app/detalhes-ator/actor-details.page.html`

**Trechos de Código:**
- Estrutura da Home (home.page.html):
```html
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>CineVault - Conheça a filmografia do Ator/Atriz</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <div class="secao-hero">
    <div class="conteudo-hero">
      <h1 class="titulo-hero">Descubra Atores</h1>
      <p class="subtitulo-hero">
        Explore a filmografia completa dos seus atores favoritos
      </p>
      <ion-button color="secondary" (click)="rolarParaBusca()">
        Começar a Buscar
      </ion-button>
    </div>
  </div>
  <!-- ... resto do conteúdo -->
</ion-content>
```

- Estrutura da Página de Detalhes (actor-details.page.html):
```html
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-back-button text="Voltar" defaultHref="/home"></ion-back-button>
    </ion-buttons>
    <ion-title>Detalhes do Ator/Atriz</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true" *ngIf="ator; else loading">
  <div class="heroi-ator">
    <h1 class="nome-ator">{{ ator.name }}</h1>
  </div>
  <!-- ... grade de filmes -->
</ion-content>
```

### 2. O projeto deve ter o uso da biblioteca HttpClient - 0.5 ponto

Agora, vamos falar sobre como o app se conecta com o mundo exterior. O HttpClient é uma biblioteca do Angular que permite fazer requisições HTTP, como buscar dados de uma API na internet. Sem ela, o app seria como uma ilha isolada, sem informações externas.

- **Como configurei**: No arquivo main.ts, que é o ponto de partida do app, eu adicionei o `provideHttpClient()` nos providers. Isso habilita o HttpClient em toda a aplicação, permitindo que qualquer componente ou serviço use ele.

- **Onde usei**: Criei um serviço chamado MovieService (que na verdade chamei de ServicoFilme no código, mas é a mesma ideia). Nesse serviço, o HttpClient é injetado no construtor, e eu uso ele para fazer várias chamadas GET à API do TMDb. Por exemplo, para buscar atores por nome ou pegar detalhes de um filme. É como se o serviço fosse um mensageiro que vai até a API, pega os dados e traz de volta para o app.

Isso garante que o app possa buscar informações em tempo real da internet, tornando ele dinâmico e útil.

**Localização:**
- Configuração: `src/main.ts`
- Serviço: `src/app/services/movie.service.ts`

**Trechos de Código:**
- Configuração no main.ts:
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
// ...
bootstrapApplication(AppComponent, {
  providers: [
    // ...
    provideHttpClient(),
  ],
});
```

- Uso no Serviço (movie.service.ts):
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicoFilme {
  constructor(private http: HttpClient) {}

  buscarAtor(nome: string): Observable<any> {
    return this.http.get(`${this.urlBase}/search/person?api_key=${environment.tmdbApiKey}&query=${nome}`);
  }
  // ... outros métodos
}
```

### 3. Uma API deve ser usada (de escolha aberta, exceto o pokeapi, a não ser que se faça alguma coisa diferente da minha aula). Tem que haver, no mínimo, um método get. - 0.5 ponto

Aqui, o foco é integrar com uma API externa. Eu escolhi a API do TMDb (The Movie Database), que é perfeita para um app de cinema porque tem dados sobre filmes, atores e muito mais. É gratuita, pública e confiável.

- **Por que TMDb?**: É diferente do PokeAPI que vimos em aula, e oferece dados ricos sobre cinema. Usei ela para buscar atores e seus filmes, o que combina perfeitamente com o tema do app.

- **Métodos GET implementados**: No serviço, criei vários métodos que fazem requisições GET:
  - `buscarAtor(nome)`: Busca atores pelo nome digitado pelo usuário.
  - `obterDetalhesAtor(id)`: Pega informações detalhadas de um ator específico, como nome e foto.
  - `obterCreditosFilme(id)`: Busca todos os filmes em que o ator atuou.

Cada método usa o HttpClient para fazer uma chamada GET à API, passando a chave da API (que guardei no environment.ts para segurança). Isso garante que o app tenha dados reais e atualizados.

**Localização:**
- Serviço: `src/app/services/movie.service.ts`
- Chave da API: `src/environments/environment.ts`

**Trechos de Código:**
- Métodos no Serviço (movie.service.ts):
```typescript
buscarAtor(nome: string): Observable<any> {
  return this.http.get(`${this.urlBase}/search/person?api_key=${environment.tmdbApiKey}&query=${nome}`);
}

obterDetalhesAtor(idAtor: number): Observable<any> {
  return this.http.get(`${this.urlBase}/person/${idAtor}?api_key=${environment.tmdbApiKey}&language=pt-BR`);
}

obterCreditosFilme(idAtor: number): Observable<any> {
  return this.http.get(`${this.urlBase}/person/${idAtor}/movie_credits?api_key=${environment.tmdbApiKey}&language=pt-BR`);
}
```

- Chave da API no environment.ts:
```typescript
export const environment = {
  production: false,
  tmdbApiKey: '3f921d9328159de4ae601eb9ce4bcdb9'
};
```

### 4. O projeto deve ter, no mínimo, dois pipes, UM personalizado e UMA pipe builtin - 0.5 ponto cada (total de 1 ponto)

Pipes no Angular são como filtros que transformam dados antes de mostrar na tela. Por exemplo, formatar datas ou cortar textos longos.

- **Pipe Personalizado**: Criei o TruncatePipe (chamado de 'truncar' no template), que corta textos longos e adiciona "..." no final. Embora eu não esteja usando ele agora nos templates (decidi mostrar os nomes completos dos atores), ele está pronto e implementado. É útil para quando você tem textos muito longos e quer economizar espaço na tela.

- **Pipe Builtin**: Usei o pipe `date` do Angular, que vem pronto na biblioteca. No template da página de detalhes, eu aplico ele nas datas de lançamento dos filmes: `{{ filme.release_date | date:'yyyy' }}`. Isso transforma uma data completa (como "2023-05-15") em apenas o ano ("2023"), deixando a interface mais limpa.

Esses pipes ajudam a melhorar a apresentação dos dados, tornando o app mais profissional.

**Localização:**
- Pipe Personalizado: `src/app/pipes/truncate.pipe.ts`
- Pipe Builtin usado em: `src/app/detalhes-ator/actor-details.page.html`

**Trechos de Código:**
- Pipe Personalizado (truncate.pipe.ts):
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncar'
})
export class PipeTruncar implements PipeTransform {
  transform(valor: string, limite: number = 100): string {
    if (!valor) return '';
    return valor.length > limite ? valor.substring(0, limite) + '...' : valor;
  }
}
```

- Uso do Pipe Builtin no Template (actor-details.page.html):
```html
<p class="ano-filme" *ngIf="filme.release_date">
  {{ filme.release_date | date:'yyyy' }}
</p>
```

### 5. O projeto deve ter, no mínimo, um service para alocar o uso do HttpClient. - 1 ponto

Serviços no Angular são como caixas organizadoras: centralizam lógica que pode ser reutilizada em vários lugares. Aqui, criei o MovieService (ServicoFilme) especificamente para lidar com o HttpClient e as chamadas à API.

- **Por que um serviço?**: Em vez de colocar as requisições HTTP diretamente nos componentes, usei um serviço. Isso deixa o código mais organizado e facilita testes. O serviço é injetado nos componentes HomePage e ActorDetailsPage via construtor.

- **O que ele faz?**: Além de fazer as chamadas GET (como expliquei no requisito 3), o serviço também processa os dados. Por exemplo, filtra apenas atores que têm foto de perfil e filmes que têm pôster, para evitar mostrar itens "vazios". Também ordena os filmes por data de lançamento, dos mais recentes para os antigos.

É como um assistente pessoal que cuida de toda a comunicação com a API, deixando os componentes focados apenas na interface.

**Localização:**
- Serviço: `src/app/services/movie.service.ts`
- Injeção nos Componentes: `src/app/home/home.page.ts` e `src/app/detalhes-ator/actor-details.page.ts`

**Trechos de Código:**
- Classe do Serviço (movie.service.ts):
```typescript
@Injectable({
  providedIn: 'root'
})
export class ServicoFilme {
  private urlBase = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  buscarAtor(nome: string): Observable<any> {
    return this.http.get(`${this.urlBase}/search/person?api_key=${environment.tmdbApiKey}&query=${nome}`);
  }

  obterCreditosFilme(idAtor: number): Observable<any> {
    return this.http.get(`${this.urlBase}/person/${idAtor}/movie_credits?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }

  obterDetalhesAtor(idAtor: number): Observable<any> {
    return this.http.get(`${this.urlBase}/person/${idAtor}?api_key=${environment.tmdbApiKey}&language=pt-BR`);
  }
  // ... outros métodos
}
```

- Injeção no Componente Home (home.page.ts):
```typescript
export class PaginaInicial implements OnInit, OnDestroy {
  // ...
  constructor(private router: Router, private servicoFilme: ServicoFilme) {}
  // ...
}
```

### 6. O projeto deve ter, no mínimo, UMA diretivas personalizada e duas diretivas estruturais (@if e @for). - 0.5 ponto cada (total de 1,5 ponto)

Diretivas são comandos especiais no Angular que modificam o comportamento do HTML. Elas tornam os templates mais dinâmicos.

- **Diretiva Personalizada**: Criei a DiretivaDestacar (com seletor [appDestacar]). Embora ela esteja vazia agora (sem funcionalidade implementada), ela está aplicada aos cards dos filmes na página de detalhes. No futuro, poderia adicionar efeitos visuais, como brilho ao passar o mouse, mas por enquanto é um placeholder para mostrar que sei criar diretivas customizadas.

- **Diretivas Estruturais**:
  - **@if**: Usei várias vezes para mostrar ou esconder elementos baseado em condições. Por exemplo, `*ngIf="carregando"` mostra um spinner enquanto os dados carregam, ou `*ngIf="atores.length > 0"` só mostra a lista de sugestões se houver atores encontrados. É como um "se-então" no template.
  - **@for**: Para repetir elementos, como `*ngFor="let ator of atores.slice(0, 5)"` que cria uma lista com até 5 atores sugeridos, ou `*ngFor="let filme of filmes"` para mostrar todos os filmes do ator. Usei trackBy para otimizar performance.

Essas diretivas tornam a interface responsiva e interativa, mudando conforme os dados chegam.

**Localização:**
- Diretiva Personalizada: `src/app/diretivas/highlight.directive.ts`
- Diretivas Estruturais usadas em: `src/app/home/home.page.html` e `src/app/detalhes-ator/actor-details.page.html`

**Trechos de Código:**
- Diretiva Personalizada (highlight.directive.ts):
```typescript
import { Directive } from '@angular/core';

@Directive({
  selector: '[appDestacar]'
})
export class DiretivaDestacar {
}
```

- Uso de @if no Template Home (home.page.html):
```html
<div *ngIf="carregando" class="container-carregando">
  <ion-spinner name="crescent"></ion-spinner>
  <p class="texto-carregando">Buscando atores...</p>
</div>

<div *ngIf="atores.length > 0 && !carregando" class="lista-sugestoes">
  <!-- lista de atores -->
</div>
```

- Uso de @for no Template Detalhes (actor-details.page.html):
```html
<ion-card
  *ngFor="let filme of filmes; trackBy: trackByIdFilme"
  class="cartao-filme"
  appDestacar
>
  <!-- conteúdo do card -->
</ion-card>
```

### 7. Pontuação extra: Passar um parâmetro por rota de uma página anterior para uma outra página. - 1 ponto

Esta é a cereja do bolo: navegação com parâmetros. Quando o usuário clica em um ator na home, ele vai para a página de detalhes, e o app "lembra" qual ator foi selecionado.

- **Como funciona**: No app.routes.ts, defini a rota `/detalhes-ator/:id`, onde `:id` é um parâmetro variável (o ID do ator).

- **Passando o parâmetro**: Na HomePage, quando o usuário clica em um ator, o método `selecionarAtor(ator)` usa o Router para navegar para `/detalhes-ator/${ator.id}`, passando o ID na URL.

- **Recebendo o parâmetro**: Na ActorDetailsPage, uso ActivatedRoute para pegar o `id` da URL no ngOnInit, converto para número e busco os dados do ator.

É como passar uma mensagem de uma página para outra através da URL, permitindo que o app mostre conteúdo específico baseado na escolha do usuário.

**Localização:**
- Configuração de Rotas: `src/app/app.routes.ts`
- Passagem do Parâmetro: `src/app/home/home.page.ts`
- Recepção do Parâmetro: `src/app/detalhes-ator/actor-details.page.ts`

**Trechos de Código:**
- Configuração de Rotas (app.routes.ts):
```typescript
export const routes: Routes = [
  {
    path: 'home',
    component: PaginaInicial,
  },
  {
    path: 'detalhes-ator/:id',
    component: PaginaDetalhesAtor,
  },
  // ...
];
```

- Passagem do Parâmetro na Home (home.page.ts):
```typescript
selecionarAtor(ator: any) {
  if (ator && ator.id) {
    this.router.navigate(['/detalhes-ator', ator.id]);
  }
}
```

- Recepção do Parâmetro nos Detalhes (actor-details.page.ts):
```typescript
export class PaginaDetalhesAtor implements OnInit {
  constructor(private route: ActivatedRoute, private servicoFilme: ServicoFilme) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.buscarAtorPorId(+id);
    }
  }
  // ...
}
```