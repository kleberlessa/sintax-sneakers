# Syntax Sneakers

> O e-commerce de calçados para quem vive e respira código.

## Sobre o Projeto

Syntax Sneakers é um projeto de e-commerce desenvolvido como exercício prático do curso **DevQuest 2.0 com IA Drive**. O diferencial desta aplicação está na proposta de marca: sneakers com temática de programação, onde cada modelo é nomeado como erros, funções e conceitos da computação.

### Conceito

O nome "Syntax Sneakers" foi inspirado no movimento "Syntax Wear" - roupas voltadas para a cultura de programação e tecnologia. A diferença é que, ao invés de focar apenas em camisetas com piadas de ponto e vírgula, este projeto eleva o conceito para o universo dos sneakers, com ticket médio mais alto e público-alvo de colecionadores e entusiastas de streetwear tech.

## Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização com CSS Custom Properties
- **JavaScript Vanilla** - Interações e lógica do carrinho
- **Google Fonts** - Inter e Fira Code

## Estrutura de Arquivos

```
syntax-sneakers/
├── index.html              # Página principal
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Este arquivo
├── js/
│   └── main.js             # JavaScript principal
└── styles/
    ├── variables.css       # Design tokens (cores, fontes, spacing)
    ├── global.css          # Reset e estilos globais
    ├── header.css          # Componente do cabeçalho
    ├── hero.css           # Seção hero
    ├── catalog.css        # Catálogo de produtos e coleções
    ├── product.css        # Cards de produto
    ├── cart.css           # Sidebar do carrinho
    ├── about.css          # Seção sobre nós
    └── footer.css         # Rodapé
```

## Design System

### Paleta de Cores (Tema Dark-Tech / Syntax Highlighting)

| Variável | Cor | Uso |
|----------|-----|-----|
| `--primary` | #00f5d4 | Cyan Neon (Keyword) |
| `--secondary` | #9cdcfe | Blue Soft (Variable) |
| `--accent` | #c586c0 | Purple (Function) |
| `--bg-main` | #0b0e14 | Obsidian Deep |
| `--bg-surface` | #151921 | Card/Surface |

### Tipografia

- **Inter** - Fonte principal (sans-serif)
- **Fira Code** - Fonte monospace para elementos de código

## Nomenclatura de Produtos

Os modelos de sneakers seguem a temática de programação:

- **AIR_ERROR v1.0** - O modelo inicial, "quando o erro voa"
- **NULL_POINTER** - Design minimalista, sempre retorna style
- **STACK_OVERFLOW** - Alta pilha de conforto, overflow de estilo
- **DEPLOY_MODE** - Pronto para produção

## Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/kleberlessa/syntax-sneakers.git
   ```

2. Abra o arquivo `index.html` em seu navegador:
   ```bash
   # Via navegador
   open index.html

   # Ou usando um servidor local
   npx serve .
   ```

## Funcionalidades

- [x] Header responsivo com navegação
- [x] Seção Hero com chamada para ação
- [x] Catálogo de produtos
- [x] Cards de produtos interativos
- [x] Sidebar de carrinho de compras
- [x] Seção de coleções
- [x] Seção Sobre Nós com estatísticas
- [x] Animações e transições
- [x] Design responsivo (mobile-first)

## Inspiração e Créditos

- **Curso**: DevQuest 2.0 com IA Drive
- **Conceito**: Baseado no movimento "Syntax Wear" e marcas como Syntax Clothing, SyntaXwear
- **Comunidade**: Marketplaces como TeePublic e Amazon com designs de programação

## Licença

Este projeto é para fins educacionais.

---

> _"Código bem escrito é como um bom par de sneakers: suporta longas sessões e nunca causa erros."_
