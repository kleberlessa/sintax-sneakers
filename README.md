---
title: Syntax Sneakers
emoji: 👟
colorFrom: blue
colorTo: purple
sdk: static
sdk_version: 1.0
app_file: index.html
pinned: false
license: mit
short_description: O e-commerce de calçados para quem vive e respira código.
tags:
- e-commerce
- sneakers
- programming
- tech
- dark-mode
---

# Syntax Sneakers

**O e-commerce de calçados para quem vive e respira código.**

Este é um projeto de e-commerce desenvolvido como exercício prático do curso **DevQuest 2.0 com IA Drive**. O diferencial está na proposta de marca: sneakers com temática de programação.

### Nossos Modelos

- **AIR_ERROR v1.0** - O modelo inicial
- **NULL_POINTER** - Design minimalista
- **STACK_OVERFLOW** - Alta pilha de conforto
- **DEPLOY_MODE** - Pronto para produção

### Tecnologias

- HTML5, CSS3, JavaScript Vanilla
- Design System Dark-Tech com Syntax Highlighting

## Diretrizes de Commit

Este projeto segue o padrão de Conventional Commits.

### Formato

```
<tipo>(<escopo>): <descrição>

[corpo opcional]

[footer opcional]
```

### Tipos

| Tipo | Descrição |
|------|-----------|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `docs` | Alterações em documentação |
| `style` | Alterações de formatação (CSS, indentação) |
| `refactor` | Refatoração de código |
| `perf` | Melhorias de performance |
| `test` | Adição ou correção de testes |
| `chore` | Tarefas de manutenção |

### Exemplos

```bash
# Nova funcionalidade
git commit -m "feat(catalog): add product cards with hover effects"

# Correção de bug
git commit -m "fix(cart): resolve cart overlay close on escape"

# Documentação
git commit -m "docs: update README with commit guidelines"

# Estilo
git commit -m "style(index): indent HTML with 4 spaces"

# Refatoração
git commit -m "refactor(css): extract button styles to global.css"
```

### Regras

1. Use imperative mood ("add" não "added")
2. Limite o título a 50 caracteres
3. Corpo opcional após linha em branco
4. Referencie issues quando aplicável: `Closes #123`
