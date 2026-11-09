# ResultHero

Ficha técnica do componente `ResultHero` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/ResultHero/README.md

Usado em 1 telas, 1 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `focusOnMount` | true · false | — |
| `tone` | success · info · warning · danger | success |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| CAD-06 | 2 | `<ResultHero title="E-mail verificado com sucesso!" description="Agora vamos completar o seu cadastro com o seu endereço." tone="success" icon="mail" />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 327×216 | 327×216 |
| hero-badge | 64×64 | 64×64 |
| hero-badge-inner | 48×48 | 48×48 |
| ícone (mail) | 32×32 | 32×32 |
| hero-text | 327×120 | 327×120 |
| hero-title | 327×64 | 327×64 |
| hero-desc | 327×40 | 327×40 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-stack-section-lg` | --space-stack-section-lg | 32px |
| hero-badge | width | `--size-status-badge` | --size-status-badge | 64px |
| hero-badge | height | `--size-status-badge` | --size-status-badge | 64px |
| hero-badge | border-radius | `--radius-full` | --radius-full | 9999px |
| hero-badge | background | `--bg-success-subtle` | --bg-success-subtle → --green-100 | rgb(209, 240, 218) none repeat scroll 0% 0% / auto padding-box border-box |
| hero-badge-inner | width | `--size-status-badge` | --size-status-badge | 48px |
| hero-badge-inner | height | `--size-status-badge` | --size-status-badge | 48px |
| hero-badge-inner | border-radius | `--radius-full` | --radius-full | 9999px |
| hero-badge-inner | background | `--bg-success-bold` | --bg-success-bold → --green-500 | rgb(16, 160, 102) none repeat scroll 0% 0% / auto padding-box border-box |
| hero-badge-inner | color | `--text-on-success` | --text-on-success → --neutral-0 → --gray-0 | rgb(255, 255, 255) |
| ícone (mail) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| hero-text | gap | `--space-stack-loose` | --space-stack-loose | 16px |
| hero-text | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| hero-title | font-family | `--font-heading` | --font-heading | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| hero-title | font-size | `--type-heading-xl-size` | --type-heading-xl-size | 24px |
| hero-title | line-height | `--type-heading-xl-line-height` | --type-heading-xl-line-height | 32px |
| hero-title | font-weight | `--type-heading-xl-weight` | --type-heading-xl-weight | 700 |
| hero-title | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| hero-desc | font-size | `--type-body-md-size` | --type-body-md-size | 14px |
| hero-desc | line-height | `--type-body-md-line-height` | --type-body-md-line-height | 20px |
| hero-desc | font-weight | `--type-body-md-weight` | --type-body-md-weight | 400 |
| hero-desc | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `title="E-mail verificado com sucesso!"`, `description="Agora vamos completar o seu cadastro com o seu endereço."`, `tone="success"`, `icon="mail"`
