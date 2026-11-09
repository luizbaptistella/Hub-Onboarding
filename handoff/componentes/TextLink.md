# TextLink

Ficha técnica do componente `TextLink` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/TextLink/README.md

Usado em 2 telas, 2 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `external` | true · false | — |
| `variant` | inline · standalone | inline, standalone |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| ENT-01 | 7 | `<TextLink variant="standalone" href="#">Esqueceu sua senha?</TextLink>` | contêiner height: proto 15px · DS 44px; contêiner font-size: proto 13.3333px · DS 14px; contêiner line-height: proto normal · DS 20px; contêiner font-weight: proto 400 · DS 500 |
| CAD-01 | 9 | `<TextLink variant="inline" href="#">Termos de Uso</TextLink>` | contêiner width: proto 86px · DS 82px; contêiner height: proto 16px · DS 40px; contêiner font-size: proto 12px · DS 16px; contêiner line-height: proto 16px · DS normal; contêiner font-weight: proto 400 · DS 600 |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 132×15 | 132×44 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | color | `--text-link` | --text-link → --brand-800 → --green-800 | rgb(0, 82, 46) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `variant="standalone"`, `href="#"`
