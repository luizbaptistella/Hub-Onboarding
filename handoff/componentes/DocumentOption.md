# DocumentOption

Ficha técnica do componente `DocumentOption` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/DocumentOption/README.md

Usado em 1 telas, 4 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `expanded` | true · false | true |
| `selected` | true · false | — |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| DOC-01 | 3 | `<DocumentOption title="CIN" badge="<Badge tone=\"success\">Aprovação mais rápida</Badge>" description="Carteira de Identidade Nacional" value="cin" name="documento" />` | nenhuma |
| DOC-01 | 4 | `<DocumentOption title="CNH" badge="<Badge tone=\"success\">Aprovação mais rápida</Badge>" description="Carteira Nacional de Habilitação" value="cnh" name="documento" />` | nenhuma |
| DOC-01 | 5 | `<DocumentOption title="RG" badge="<Badge tone=\"warning\">Aprovação pode demorar mais</Badge>" description="Registro Geral" value="rg" name="documento" />` | contêiner height: proto 81px · DS 133px; docopt-head tamanho: proto 327×80 · DS 327×132; docopt-text tamanho: proto 223×48 · DS 223×100; docopt-title tamanho: proto 223×24 · DS 223×76 |
| DOC-01 | 101 | `<DocumentOption title="CNH" badge="<Badge tone=\"success\">Aprovação mais rápida</Badge>" description="Carteira Nacional de Habilitação" value="cnh" name="documento" expanded />` | contêiner height: proto 233px · DS 81px |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×81 | 327×81 |
| docopt-head | 327×80 | 327×80 |
| docopt-radio | 20×20 | 20×20 |
| docopt-text | 223×48 | 223×48 |
| docopt-title | 223×24 | 223×24 |
| badge | 137×20 | — |
| docopt-desc | 223×20 | 223×20 |
| docopt-chevron | 20×20 | 20×20 |
| ícone (keyboard_arrow_down) | 20×20 | 20×20 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | border-top | `--border-default` | --border-default → --neutral-200 → --gray-200 | 1px solid rgb(226, 227, 232) |
| contêiner | background | `--bg-surface` | --bg-surface → --neutral-0 → --gray-0 | rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box |
| contêiner | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| docopt-head | gap | `--space-inline-loose` | --space-inline-loose | 16px |
| docopt-head | padding | `--space-inset-md` | --space-inset-md | 16px |
| docopt-radio | width | `--size-checkbox` | --size-checkbox | 20px |
| docopt-radio | height | `--size-checkbox` | --size-checkbox | 20px |
| docopt-radio | border-radius | `--radius-full` | --radius-full | 9999px |
| docopt-radio | background | `--bg-input` | --bg-input → --neutral-0 → --gray-0 | rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box |
| docopt-radio | border | `--border-input` | --border-input → --neutral-500 → --gray-500 | 1px solid rgb(97, 102, 116) |
| docopt-text | gap | `--space-stack-tight` | --space-stack-tight | 4px |
| docopt-title | gap | `--space-inline-tight` | --space-inline-tight | 4px |
| docopt-title | font-family | `--font-heading` | --font-heading | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| docopt-title | font-size | `--type-title-md-size` | --type-title-md-size | 16px |
| docopt-title | line-height | `--type-title-md-line-height` | --type-title-md-line-height | 24px |
| docopt-title | font-weight | `--type-title-md-weight` | --type-title-md-weight | 700 |
| docopt-title | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| badge | padding | `--space-025` | --space-025 | 2px 8px |
| badge | border-radius | `--radius-md` | --radius-md | 6px |
| badge | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| badge | font-size | `--type-label-xs-size` | --type-label-xs-size | 11px |
| badge | line-height | `--type-label-xs-line-height` | --type-label-xs-line-height | 16px |
| badge | font-weight | `--type-label-xs-weight` | --type-label-xs-weight | 500 |
| badge | background | `--bg-success-subtle` | --bg-success-subtle → --green-100 | rgb(209, 240, 218) none repeat scroll 0% 0% / auto padding-box border-box |
| badge | color | `--text-success` | --text-success → --green-700 | rgb(0, 100, 55) |
| docopt-desc | font-size | `--type-body-md-size` | --type-body-md-size | 14px |
| docopt-desc | line-height | `--type-body-md-line-height` | --type-body-md-line-height | 20px |
| docopt-desc | font-weight | `--type-body-md-weight` | --type-body-md-weight | 400 |
| docopt-desc | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| docopt-chevron | color | `--icon-default` | --icon-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| ícone (keyboard_arrow_down) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `title="CIN"`, `badge="Aprovação mais rápida"`, `description="Carteira de Identidade Nacional"`, `value="cin"`, `name="documento"`
- **Escolhido e aberto**: `title="CIN"`, `badge="Aprovação mais rápida"`, `description="Carteira de Identidade Nacional"`, `value="cin"`, `name="documento"`, `selected=true`, `expanded=true`
