# CineVault

Aplicativo móvel para descobrir atores e explorar sua filmografia completa usando a API do TMDb.

## 🚀 Início Rápido

```bash
npm install
npm start
```

## 📱 Funcionalidades

- **Busca Inteligente**: Encontre atores por nome com sugestões em tempo real
- **Filmografia Completa**: Veja todos os filmes de um ator organizados por data
- **Interface Elegante**: Design inspirado no cinema com tema escuro
- **Truncamento de Texto**: Nomes de atores e títulos de filmes são truncados em 20 caracteres com "..." para melhor visualização

## 🛠️ Tecnologias

- Ionic 8.0.0
- Angular 20.0.0
- TypeScript
- TMDb API

## 📋 Requisitos do Projeto

Este projeto atende aos seguintes requisitos acadêmicos:

1. **2 Páginas**: Home e Detalhes do Ator (ambas usando Ionic)
2. **HttpClient**: Integração completa com API externa (TMDb)
3. **API Externa**: Uso da TMDb API com métodos GET
4. **2 Pipes**: Pipe personalizado (truncate - trunca texto em 20 caracteres) e pipe builtin (date)
5. **1 Serviço**: MovieService para centralizar chamadas HTTP
6. **Diretivas**: Uma personalizada (highlight) e duas estruturais (@if e @for)
7. **Parâmetros por Rota**: Navegação com ID do ator

## 🏗️ Estrutura do Projeto

```
src/app/
├── home/                    # Página inicial com busca
├── detalhes-ator/           # Página de detalhes do ator
├── services/movie.service.ts # Serviço para API
├── pipes/truncate.pipe.ts   # Pipe personalizado
└── diretivas/highlight.directive.ts # Diretiva personalizada
```

## 🛠️ Tecnologias

- **Ionic 8.0.0** - Framework mobile
- **Angular 20.0.0** - Framework web
- **TypeScript** - Linguagem
- **RxJS** - Programação reativa
- **TMDb API** - Fonte de dados

## 🚀 Instalação

1. **Clone e instale**:
   ```bash
   git clone <url-do-repositorio>
   cd marlon-app
   npm install
   ```

2. **Configure a API**:
   - Obtenha uma chave gratuita no [TMDb](https://www.themoviedb.org/settings/api)
   - Edite `src/environments/environment.ts` com sua chave

3. **Execute**:
   ```bash
   npm start
   ```

## 📱 Como Usar

1. **Busque um ator**: Digite o nome na barra de pesquisa
2. **Selecione**: Clique em um ator da lista de sugestões
3. **Explore**: Veja todos os filmes organizados por data

## 🔧 Principais Arquivos

- `src/app/services/movie.service.ts` - Serviço para API do TMDb
- `src/app/home/home.page.ts` - Lógica de busca reativa
- `src/app/detalhes-ator/actor-details.page.ts` - Detalhes do ator
- `src/environments/environment.ts` - Configuração da API


---

**Desenvolvido com ❤️ usando Ionic + Angular**
