# RedirectCountdown

Ficha técnica do componente `RedirectCountdown` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/RedirectCountdown/README.md

Usado em 2 telas, 2 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| CAD-08 | 3 | `<RedirectCountdown seconds={10} continueLabel="Continuar agora" />` | contêiner height: proto 100px · DS 40px |
| BIO-07 | 3 | `<RedirectCountdown seconds={10} continueLabel="Continuar agora" />` | contêiner height: proto 100px · DS 40px |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 279×100 | 279×40 |
| countdown-number | 40×40 | 40×40 |
| countdown-text | 279×48 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-inline-group` | --space-inline-group | 12px |
| countdown-number | border-radius | `--radius-full` | --radius-full | 9999px |
| countdown-number | background | `--bg-brand-bold` | --bg-brand-bold → --brand-800 → --green-800 | rgb(0, 82, 46) none repeat scroll 0% 0% / auto padding-box border-box |
| countdown-number | font-family | `--font-heading` | --font-heading | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| countdown-number | font-size | `--type-heading-xl-size` | --type-heading-xl-size | 24px |
| countdown-number | line-height | `--type-heading-xl-line-height` | --type-heading-xl-line-height | 32px |
| countdown-number | font-weight | `--type-heading-xl-weight` | --type-heading-xl-weight | 700 |
| countdown-number | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |
| countdown-text | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| countdown-text | font-size | `--type-label-lg-strong-size` | --type-label-lg-strong-size | 16px |
| countdown-text | line-height | `--type-label-lg-strong-line-height` | --type-label-lg-strong-line-height | 24px |
| countdown-text | font-weight | `--type-label-lg-strong-weight` | --type-label-lg-strong-weight | 600 |
| countdown-text | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `seconds=10`, `continueLabel="Continuar agora"`
