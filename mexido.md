# Arquivos e Pastas Utilizados no Projeto "Conheça o Ator/Atriz"

Este documento detalha as pastas e arquivos utilizados no projeto, baseado nos requisitos cumpridos e nas modificações realizadas. As alterações foram feitas para atender aos pedidos do usuário, incluindo tradução para português, remoção de elementos desnecessários, busca inteligente com sugestões, e atualização do README.

## Pastas e Arquivos Utilizados

### 1. `src/app/home/`
   - **home.page.html**: Página inicial com barra de busca inteligente que mostra sugestões de atores automaticamente (máximo 5 resultados). Utiliza `ion-searchbar` e `ion-list` para interação. Cumpre o requisito de ter uma página home com navegação.
   - **home.page.ts**: Componente standalone que gerencia a busca em tempo real com RxJS (debounceTime, distinctUntilChanged), utilizando `Router` para navegar para `/detalhes-ator/:id`. Implementa a lógica de busca e seleção de atores.
   - **home.page.scss**: Estilos modernos com tema cinema (gradientes, glassmorphism), animações de entrada e responsividade.

### 2. `src/app/detalhes-ator/`
   - **detalhes-ator.page.html**: Página de detalhes do ator, exibindo foto do perfil, nome e lista completa de filmes ordenados por ano decrescente. Cada filme mostra pôster, título em maiúsculas e ano de lançamento. Utiliza diretivas estruturais `*ngFor` e `*ngIf`, e a diretiva personalizada `appDestacar`.
   - **detalhes-ator.page.ts**: Componente standalone que busca o ator via parâmetro de rota (`ActivatedRoute`), chama o `MovieService` para obter dados. Implementa loading e tratamento de erros.
   - **detalhes-ator.page.scss**: Estilos com tema cinema, layout responsivo para grid de filmes, sem hover effects.

### 3. `src/app/services/`
   - **movie.service.ts**: Serviço injetado via DI que utiliza `HttpClient` para fazer chamadas GET à API do TMDb. Métodos: `searchActor` (busca ator por nome), `getMovieCredits` (obtém créditos de filmes) e `getActorDetails` (obtém detalhes do ator por ID). Cumpre o requisito de uso de API pública e HttpClient.

### 4. `src/app/pipes/`
   - **truncate.pipe.ts**: Pipe personalizado que trunca strings. Cumpre o requisito de ter um pipe personalizado.

### 5. `src/app/diretivas/`
   - **highlight.directive.ts**: Diretiva personalizada vazia `DiretivaDestacar` com seletor `[appDestacar]`. Cumpre o requisito de diretiva personalizada.

### 6. `src/app/app.routes.ts`
   - Define as rotas: `home` (página inicial), `detalhes-ator/:id` (com parâmetro por rota), e redirecionamento. Cumpre o requisito de roteamento com parâmetro.

### 7. `src/environments/`
   - **environment.ts**: Contém a chave da API do TMDb (`tmdbApiKey`). Usado pelo `MovieService`.
   - **environment.prod.ts**: Versão de produção com a mesma chave.

### 8. `src/main.ts`
   - Arquivo de bootstrap do Angular, configurado com `provideHttpClient()` para habilitar HttpClient. Essencial para as chamadas de API.

### 9. `src/theme/variables.scss`
   - Variáveis de tema com paleta cinema: fundo escuro (#0f0f23), acentos dourados (#d4af37), gradientes e glassmorphism.

## Arquivos Não Utilizados no Projeto

- `src/app/app.component.html/ts/scss/spec.ts`: Componente raiz do app, não modificado (apenas estrutura padrão).
- `src/app/home/home.page.spec.ts`: Arquivo de testes unitários, não implementado.
- `src/app/detalhes-ator/detalhes-ator.page.spec.ts`: Arquivo de testes unitários, não implementado.
- `src/assets/`: Pasta para assets estáticos (shapes.svg, icon/), não utilizada no projeto.
- `src/theme/`: Pasta para variáveis de tema Ionic, não modificada ou utilizada além de variables.scss.
- `src/global.scss`: Estilos globais, não alterados.
- `src/index.html`: Arquivo HTML principal, padrão Ionic.
- `src/polyfills.ts`: Polyfills para compatibilidade, não modificado.
- `src/test.ts`: Configuração de testes, não utilizada.
- `src/zone-flags.ts`: Flags do Zone.js, não modificado.
- Arquivos raiz como `angular.json`, `capacitor.config.ts`, `ionic.config.json`, `karma.conf.js`, `package-lock.json`, `tsconfig.*.json`, `.browserslistrc`, `.editorconfig`, `.eslintrc.json`, `.gitignore`: Arquivos de configuração do projeto, não modificados diretamente no código do app.
- `www/`: Pasta gerada pelo Capacitor para build móvel, não utilizada no desenvolvimento.
- `.angular/`, `.vscode/`, `node_modules/`: Pastas geradas automaticamente, não parte do código fonte.

Todos os arquivos não listados acima não foram utilizados ou modificados no projeto, permanecendo com configurações padrão ou vazios.
