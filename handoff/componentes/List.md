# List

Ficha técnica do componente `List` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/List/README.md

Usado em 3 telas, 6 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| AREA-02 | 2 | `<List label="Hoje" />` | contêiner height: proto 183px · DS 26px; list tamanho: proto 327×159 · DS 327×2 |
| AREA-02 | 5 | `<List label="Anteriores" />` | contêiner height: proto 151px · DS 26px; list tamanho: proto 327×127 · DS 327×2 |
| AREA-03 | 2 | `<List label="Acesso" />` | contêiner height: proto 187px · DS 26px; list tamanho: proto 327×163 · DS 327×2 |
| AREA-03 | 5 | `<List label="Login social" />` | contêiner height: proto 230px · DS 26px; list tamanho: proto 327×206 · DS 327×2 |
| AREA-03 | 9 | `<List ariaLabel="Conta" />` | contêiner height: proto 47px · DS 2px |
| AREA-04 | 3 | `<List label="O que acontece" />` | contêiner height: proto 253px · DS 26px; list tamanho: proto 327×229 · DS 327×2 |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×183 | 327×26 |
| list-label | 327×16 | 327×16 |
| list | 327×159 | 327×2 |
| list-li | 325×78 | — |
| list-item | 325×78 | — |
| list-icon | 20×20 | — |
| ícone (confirmation_number) | 20×20 | — |
| list-text | 205×54 | — |
| list-title | 205×20 | — |
| list-desc | 205×32 | — |
| list-trailing | 44×20 | — |
| badge | 44×20 | — |
| ícone (mail) | 20×20 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-stack-related` | --space-stack-related | 8px |
| list-label | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| list-label | font-size | `--type-label-xs-size` | --type-label-xs-size | 11px |
| list-label | line-height | `--type-label-xs-line-height` | --type-label-xs-line-height | 16px |
| list-label | font-weight | `--type-label-sm-strong-weight` | --type-label-sm-strong-weight | 600 |
| list-label | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| list | background | `--bg-surface` | --bg-surface → --neutral-0 → --gray-0 | rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box |
| list | border | `--border-default` | --border-default → --neutral-200 → --gray-200 | 1px solid rgb(226, 227, 232) |
| list | border-radius | `--radius-lg` | --radius-lg | 8px |
| list-item | gap | `--space-inline-group` | --space-inline-group | 12px |
| list-item | min-height | `--size-menu-item` | --size-menu-item | 48px |
| list-item | padding | `--space-150` | --space-150 | 12px 16px |
| list-item | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| list-icon | color | `--icon-subtle` | --icon-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| ícone (confirmation_number) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| list-text | gap | `--space-025` | --space-025 | 2px |
| list-title | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| list-title | font-size | `--type-label-md-size` | --type-label-md-size | 14px |
| list-title | line-height | `--type-label-md-line-height` | --type-label-md-line-height | 20px |
| list-title | font-weight | `--type-label-md-weight` | --type-label-md-weight | 500 |
| list-title | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| list-desc | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| list-desc | font-size | `--type-body-sm-size` | --type-body-sm-size | 12px |
| list-desc | line-height | `--type-body-sm-line-height` | --type-body-sm-line-height | 16px |
| list-desc | font-weight | `--type-body-sm-weight` | --type-body-sm-weight | 400 |
| list-desc | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| badge | padding | `--space-025` | --space-025 | 2px 8px |
| badge | border-radius | `--radius-md` | --radius-md | 6px |
| badge | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| badge | font-size | `--type-label-xs-size` | --type-label-xs-size | 11px |
| badge | line-height | `--type-label-xs-line-height` | --type-label-xs-line-height | 16px |
| badge | font-weight | `--type-label-xs-weight` | --type-label-xs-weight | 500 |
| badge | background | `--bg-info-subtle` | --bg-info-subtle → --blue-100 | rgb(219, 234, 254) none repeat scroll 0% 0% / auto padding-box border-box |
| badge | color | `--text-info` | --text-info → --blue-700 | rgb(29, 78, 216) |
| ícone (mail) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `label="Hoje"`
