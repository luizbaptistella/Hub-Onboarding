# ActionRow

Ficha técnica do componente `ActionRow` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/ActionRow/README.md

Usado em 1 telas, 2 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `disabled` | true · false | — |
| `icon` | camera · upload | camera, upload |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| DOC-01 | 102 | `<ActionRow icon="camera">Tirar foto do documento</ActionRow>` | action-label tamanho: proto 162×20 · DS 177×20 |
| DOC-01 | 103 | `<ActionRow icon="upload">Fazer upload do documento</ActionRow>` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 295×62 | 295×62 |
| action-icon | 40×40 | 40×40 |
| ícone (photo_camera) | 32×32 | 32×32 |
| action-label | 162×20 | 177×20 |
| action-arrow | 44×44 | 44×44 |
| ícone (chevron_right) | 20×20 | 20×20 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-inline-related` | --space-inline-related | 8px |
| contêiner | padding | `--space-100` | --space-100 | 8px 4px 8px 12px |
| contêiner | background | `--bg-surface` | --bg-surface → --neutral-0 → --gray-0 | rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box |
| contêiner | border | `--border-default` | --border-default → --neutral-200 → --gray-200 | 1px solid rgb(226, 227, 232) |
| contêiner | border-radius | `--radius-lg` | --radius-lg | 8px |
| contêiner | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| action-icon | padding | `--space-050` | --space-050 | 4px |
| action-icon | color | `--icon-brand` | --icon-brand → --brand-800 → --green-800 | rgb(0, 82, 46) |
| ícone (photo_camera) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| action-label | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| action-label | font-size | `--type-label-md-size` | --type-label-md-size | 14px |
| action-label | line-height | `--type-label-md-line-height` | --type-label-md-line-height | 20px |
| action-label | font-weight | `--type-label-md-weight` | --type-label-md-weight | 500 |
| action-label | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| action-arrow | padding | `--space-150` | --space-150 | 12px |
| action-arrow | border-radius | `--radius-full` | --radius-full | 9999px |
| action-arrow | color | `--icon-brand` | --icon-brand → --brand-800 → --green-800 | rgb(0, 82, 46) |
| ícone (chevron_right) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `icon="camera"`
