# Checkbox

Ficha técnica do componente `Checkbox` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/Checkbox/README.md

Usado em 4 telas, 5 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `checked` | true · false | — |
| `defaultChecked` | true · false | — |
| `indeterminate` | true · false | — |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| CAD-01 | 8 | `<Checkbox name="termos">Li e concordo com os Termos de Uso.</Checkbox>` | nenhuma |
| CAD-01 | 10 | `<Checkbox name="marketing">Quero receber novidades e ofertas do Palmeiras.</Checkbox>` | contêiner height: proto 21px · DS 40px |
| CAD-07 | 7 | `<Checkbox name="sem-complemento">Não possuo complemento</Checkbox>` | nenhuma |
| AREA-01 | 12 | `<Checkbox disabled>Não possuo complemento</Checkbox>` | nenhuma |
| FAM-13 | 3 | `<Checkbox name="aceite">Li e concordo com o termo de responsabilidade.</Checkbox>` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×21 | 327×20 |
| check-input | 20×20 | — |
| check-box | 20×20 | — |
| ícone (check) | 14×14 | — |
| check-label | 215×16 | — |
| link | 86×16 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-inline-related` | --space-inline-related | 8px |
| check-input | width | `--size-checkbox` | --size-checkbox | 20px |
| check-input | height | `--size-checkbox` | --size-checkbox | 20px |
| check-box | width | `--size-checkbox` | --size-checkbox | 20px |
| check-box | height | `--size-checkbox` | --size-checkbox | 20px |
| check-box | border | `--border-input` | --border-input → --neutral-500 → --gray-500 | 1px solid rgb(97, 102, 116) |
| check-box | border-radius | `--radius-sm` | --radius-sm | 4px |
| check-box | background | `--bg-page` | --bg-page → --neutral-50 → --gray-50 | rgb(248, 249, 250) none repeat scroll 0% 0% / auto padding-box border-box |
| check-box | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |
| ícone (check) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| check-label | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| check-label | font-size | `--type-body-sm-size` | --type-body-sm-size | 12px |
| check-label | line-height | `--type-body-sm-line-height` | --type-body-sm-line-height | 16px |
| check-label | font-weight | `--type-body-sm-weight` | --type-body-sm-weight | 400 |
| check-label | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| link | color | `--text-link` | --text-link → --brand-800 → --green-800 | rgb(0, 82, 46) |
| link | font-weight | `--font-weight-semibold` | --font-weight-semibold | 400 |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `name="termos"`
- **Marcado**: `name="termos"`, `defaultChecked=true`
- **Erro**: `name="termos"`, `error="Para continuar, aceite os Termos de Uso."`
