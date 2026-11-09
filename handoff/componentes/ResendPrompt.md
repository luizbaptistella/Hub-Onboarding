# ResendPrompt

Ficha técnica do componente `ResendPrompt` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/ResendPrompt/README.md

Usado em 2 telas, 2 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `disabled` | true · false | — |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| CAD-02 | 5 | `<ResendPrompt question="Não recebeu o código?" actionLabel="Reenviar código" cooldown={30} />` | resend-action tamanho: proto 108×20 · DS 118×20 |
| CAD-04 | 6 | `<ResendPrompt question="Não recebeu o código?" actionLabel="Reenviar código" cooldown={30} />` | resend-action tamanho: proto 108×20 · DS 118×20 |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 375×20 | 375×20 |
| resend-action | 108×20 | 118×20 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| contêiner | font-size | `--type-label-md-size` | --type-label-md-size | 14px |
| contêiner | line-height | `--type-label-md-line-height` | --type-label-md-line-height | 20px |
| contêiner | font-weight | `--type-label-md-weight` | --type-label-md-weight | 500 |
| contêiner | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| contêiner | column-gap | `--space-inline-related` | --space-inline-related | 8px |
| resend-action | color | `--text-brand` | --text-brand → --brand-800 → --green-800 | rgb(0, 82, 46) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `question="Não recebeu o código?"`, `actionLabel="Reenviar código"`, `cooldown=30`
- **Desativado**: `question="Não recebeu o código?"`, `actionLabel="Reenviar código"`, `cooldown=30`, `disabled=true`
