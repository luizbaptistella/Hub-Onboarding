# StatusScreen

Ficha técnica do componente `StatusScreen` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/StatusScreen/README.md

Usado em 2 telas, 2 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `focusOnMount` | true · false | — |
| `tone` | success · pending | success |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| CAD-08 | 1 | `<StatusScreen title="Recebemos seus dados cadastrais!" tone="success" badge="success" />` | contêiner height: proto 768px · DS 224px |
| BIO-07 | 1 | `<StatusScreen title="Recebemos seus dados cadastrais!" tone="success" badge="success" />` | contêiner height: proto 768px · DS 224px |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 375×768 | 375×224 |
| status-screen-head | 327×160 | 327×160 |
| imagem | 80×80 | — |
| status-screen-title | 327×64 | 327×64 |
| status-screen-body | 327×328 | — |
| journey | 327×328 | — |
| journey-step | 311×68 | — |
| journey-row | 302×44 | — |
| journey-circle | 44×44 | — |
| ícone (check) | 26×26 | — |
| journey-label | 88×28 | — |
| journey-connector | 2×24 | — |
| ícone (description) | 28×28 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-stack-section` | --space-stack-section | 24px |
| contêiner | padding | `--space-inset-lg` | --space-inset-lg | 24px 24px 40px |
| contêiner | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |
| status-screen-head | gap | `--space-stack-loose` | --space-stack-loose | 16px |
| status-screen-title | font-family | `--font-heading` | --font-heading | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| status-screen-title | font-size | `--type-heading-xl-size` | --type-heading-xl-size | 24px |
| status-screen-title | line-height | `--type-heading-xl-line-height` | --type-heading-xl-line-height | 32px |
| status-screen-title | font-weight | `--type-heading-xl-weight` | --type-heading-xl-weight | 700 |
| status-screen-title | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |
| journey | padding | `--space-inset-md` | --space-inset-md | 36px 0px 16px 16px |
| journey | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| journey-row | gap | `--space-inline-related` | --space-inline-related | 8px |
| journey-circle | border-radius | `--radius-full` | --radius-full | 9999px |
| journey-circle | background | `--journey-step-current` | --journey-step-current → --brand-800 → --green-800 | rgb(0, 82, 46) none repeat scroll 0% 0% / auto padding-box border-box |
| journey-circle | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |
| ícone (check) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| journey-label | font-family | `--font-heading` | --font-heading | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| journey-label | font-size | `--type-title-lg-size` | --type-title-lg-size | 20px |
| journey-label | line-height | `--type-title-lg-line-height` | --type-title-lg-line-height | 28px |
| journey-label | font-weight | `--type-title-lg-weight` | --type-title-lg-weight | 600 |
| journey-label | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |
| journey-connector | border-radius | `--radius-full` | --radius-full | 9999px |
| journey-connector | background | `--journey-step-done` | --journey-step-done → --brand-400 → --green-400 | rgb(70, 183, 128) none repeat scroll 0% 0% / auto padding-box border-box |
| ícone (description) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `title="Recebemos seus dados cadastrais!"`, `tone="success"`, `badge="success"`
