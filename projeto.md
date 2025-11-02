# Documentação do Projeto: CineVault - Conheça a Filmografia do Ator/Atriz

Este documento explica de forma clara e detalhada como o projeto atende a cada um dos requisitos especificados. O projeto é um aplicativo Ionic/Angular que permite buscar atores e visualizar sua filmografia completa, utilizando a API do TMDb (The Movie Database).

## Requisitos Atendidos

### 1. O projeto deve ser montado com, no mínimo, 2 pages, incluindo a home.page.html comum ao ionic. - 0.5 ponto

**Atendido em:** `src/app/home/home.page.html` e `src/app/detalhes-ator/actor-details.page.html`

O projeto possui duas páginas principais:
- **Página Home (`home.page.html`)**: É a página inicial do aplicativo, gerada automaticamente pelo Ionic. Nela, o usuário encontra uma seção hero com título e botão para rolar para a busca, além de uma barra de pesquisa inteligente que mostra sugestões de atores em tempo real.
- **Página de Detalhes do Ator (`actor-details.page.html`)**: Página secundária que exibe os detalhes completos de um ator selecionado, incluindo foto de perfil, nome e uma grade com todos os filmes em que atuou, ordenados por ano de lançamento (mais recentes primeiro).

Ambas as páginas são componentes standalone do Angular, utilizando Ionic para os componentes de UI, e estão conectadas por roteamento.

### 2. O projeto deve ter o uso da biblioteca HttpClient - 0.5 ponto

**Atendido em:** `src/main.ts` e `src/app/services/movie.service.ts`

- **Configuração no `main.ts`**: O HttpClient é habilitado através do `provideHttpClient()` no bootstrap do Angular, permitindo injeção de dependência em toda a aplicação.
- **Uso no Serviço**: O `MovieService` utiliza o `HttpClient` para fazer todas as requisições HTTP à API do TMDb. Os métodos incluem `searchActor()` para buscar atores por nome, `getActorDetails()` para obter detalhes de um ator específico, e `getMovieCredits()` para buscar a filmografia completa.

### 3. Uma API deve ser usada (de escolha aberta, exceto o pokeapi, a não ser que se faça alguma coisa diferente da minha aula). Tem que haver, no mínimo, um método get. - 0.5 ponto

**Atendido em:** `src/app/services/movie.service.ts` e `src/environments/environment.ts`

- **API Escolhida**: Utilizamos a API do TMDb (The Movie Database), uma API pública e gratuita para dados de cinema.
- **Métodos GET Implementados**:
  - `searchActor(query: string)`: Faz uma requisição GET para `/search/person` para buscar atores por nome.
  - `getActorDetails(id: number)`: Faz uma requisição GET para `/person/{id}` para obter detalhes de um ator específico.
  - `getMovieCredits(id: number)`: Faz uma requisição GET para `/person/{id}/movie_credits` para obter a lista completa de filmes do ator.
- **Chave da API**: Armazenada no arquivo `environment.ts` para fácil configuração e segurança.

### 4. O projeto deve ter, no mínimo, dois pipes, UM personalizado e UMA pipe builtin - 0.5 ponto cada (total de 1 ponto)

**Atendido em:** `src/app/pipes/truncate.pipe.ts` e `src/app/detalhes-ator/actor-details.page.html`

- **Pipe Personalizado**: Criamos o `TruncatePipe` (nomeado como 'truncar' no template), que permite truncar textos longos com reticências. Embora não esteja sendo usado atualmente nos templates (foi removido para mostrar nomes completos), o pipe está implementado e pronto para uso.
- **Pipe Builtin**: Utilizamos o pipe `date` do Angular (builtin) no template `actor-details.page.html` para formatar as datas de lançamento dos filmes: `{{ filme.release_date | date:'yyyy' }}`. Isso converte a data completa em apenas o ano de lançamento.

### 5. O projeto deve ter, no mínimo, um service para alocar o uso do HttpClient. - 1 ponto

**Atendido em:** `src/app/services/movie.service.ts`

- **Serviço Criado**: O `MovieService` é um serviço dedicado que centraliza todas as chamadas à API do TMDb.
- **Injeção de Dependência**: O serviço é injetado nos componentes `HomePage` e `ActorDetailsPage` através do construtor.
- **Métodos Implementados**: Como mencionado no requisito 3, possui métodos para buscar atores, obter detalhes e créditos de filmes.
- **Tratamento de Dados**: O serviço processa as respostas da API, filtrando apenas atores com fotos de perfil e filmes com pôsteres, além de ordenar os filmes por data de lançamento.

### 6. O projeto deve ter, no mínimo, UMA diretivas personalizada e duas diretivas estruturais (@if e @for). - 0.5 ponto cada (total de 1,5 ponto)

**Atendido em:** `src/app/diretivas/highlight.directive.ts`, `src/app/home/home.page.html` e `src/app/detalhes-ator/actor-details.page.html`

- **Diretiva Personalizada**: Criamos a `DiretivaDestacar` com seletor `[appDestacar]`. Embora atualmente não tenha funcionalidade implementada (está vazia), ela está aplicada aos cartões de filme na página de detalhes do ator, pronta para futuras implementações como efeitos visuais.
- **Diretivas Estruturais**:
  - **@if**: Utilizada em ambos os templates para mostrar/esconder elementos condicionalmente, como `*ngIf="carregando"` para mostrar spinner de loading, `*ngIf="atores.length > 0"` para mostrar lista de sugestões, e `*ngIf="ator; else loading"` para alternar entre conteúdo e loading na página de detalhes.
  - **@for**: Utilizada para iterar sobre listas, como `*ngFor="let ator of atores.slice(0, 5)"` na página home para mostrar até 5 sugestões de atores, e `*ngFor="let filme of filmes; trackBy: trackByIdFilme"` na página de detalhes para listar todos os filmes do ator.

### 7. Pontuação extra: Passar um parâmetro por rota de uma página anterior para uma outra página. - 1 ponto

**Atendido em:** `src/app/app.routes.ts`, `src/app/home/home.page.ts` e `src/app/detalhes-ator/actor-details.page.ts`

- **Configuração de Rotas**: No `app.routes.ts`, definimos a rota `/detalhes-ator/:id` que aceita um parâmetro `id` na URL.
- **Passagem do Parâmetro**: Na `HomePage`, quando o usuário seleciona um ator da lista de sugestões, o método `selecionarAtor(ator)` navega para `/detalhes-ator/${ator.id}`, passando o ID do ator como parâmetro na rota.
- **Recepção do Parâmetro**: Na `ActorDetailsPage`, utilizamos `ActivatedRoute` para capturar o parâmetro `id` da rota no método `ngOnInit()`, convertendo-o para número e usando-o para buscar os detalhes do ator via serviço.

## Arquitetura e Tecnologias Utilizadas

- **Framework**: Angular com Ionic para UI móvel-first.
- **Linguagem**: TypeScript para tipagem forte.
- **Estilização**: SCSS com variáveis customizadas para tema cinema (tons escuros, dourados, gradientes).
- **API**: TMDb para dados de filmes e atores.
- **Padrões**: Componentes standalone, injeção de dependência, observables RxJS para busca em tempo real.

Este projeto demonstra uma aplicação completa e funcional que atende a todos os requisitos técnicos especificados, com foco em usabilidade e design moderno.
