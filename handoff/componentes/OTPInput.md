# OTPInput

Ficha técnica do componente `OTPInput` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/OTPInput/README.md

Usado em 2 telas, 2 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `disabled` | true · false | — |
| `hideLabel` | true · false | — |
| `state` | default · success · error | default |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| CAD-02 | 4 | `<OTPInput length={6} state="default" />` | nenhuma |
| CAD-04 | 5 | `<OTPInput length={6} state="default" />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 327×48 | 327×48 |
| otp-cell | 45×48 | 45×48 |
| otp-sep | 12×2 | 12×2 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-stack-loose` | --space-stack-loose | 16px |
| otp-cell | height | `--size-control` | --size-control | 48px |
| otp-cell | border | `--border-input` | --border-input → --neutral-500 → --gray-500 | 1px solid rgb(97, 102, 116) |
| otp-cell | border-radius | `--radius-lg` | --radius-lg | 8px |
| otp-cell | background | `--bg-input` | --bg-input → --neutral-0 → --gray-0 | rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box |
| otp-cell | font-family | `--font-heading` | --font-heading | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| otp-cell | font-size | `--type-title-lg-size` | --type-title-lg-size | 20px |
| otp-cell | line-height | `--type-title-lg-line-height` | --type-title-lg-line-height | 28px |
| otp-cell | font-weight | `--type-title-lg-weight` | --type-title-lg-weight | 600 |
| otp-cell | color | `--text-brand` | --text-brand → --brand-800 → --green-800 | rgb(0, 82, 46) |
| otp-sep | background | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) none repeat scroll 0% 0% / auto padding-box border-box |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `length=6`, `state="default"`
- **Erro**: `length=6`, `state="error"`, `error="Tentativas restantes: 2/3"`
- **Sucesso**: `length=6`, `state="success"`
- **Bloqueado**: `length=6`, `state="default"`, `disabled=true`
