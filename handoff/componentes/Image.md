# Image

Ficha técnica do componente `Image` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/Image/README.md

Usado em 1 telas, 1 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `fit` | cover · contain | — |
| `loading` | lazy · eager | — |
| `rounded` | true · false | true |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| BIO-04 | 2 | `<Image alt="Foto capturada do rosto" rounded height={320} src={fotoCapturada} />` | ícone (image) tamanho: proto 24×24 · DS 40×40 |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 327×320 | 327×320 |
| ícone (image) | 24×24 | 40×40 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | background | `--bg-neutral` | --bg-neutral → --neutral-100 → --gray-100 | rgb(238, 238, 240) none repeat scroll 0% 0% / auto padding-box border-box |
| contêiner | border-radius | `--radius-lg` | --radius-lg | 8px |
| ícone (image) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `alt="Foto capturada do rosto"`, `rounded=true`, `height=320`
