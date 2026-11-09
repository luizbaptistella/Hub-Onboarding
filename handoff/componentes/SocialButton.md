# SocialButton

Ficha técnica do componente `SocialButton` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/SocialButton/README.md

Usado em 1 telas, 3 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `disabled` | true · false | — |
| `intent` | continue · signin · signup | signin |
| `layout` | full · icon | icon |
| `loading` | true · false | — |
| `provider` | google · apple · microsoft | apple, google, microsoft |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| ENT-01 | 11 | `<SocialButton provider="google" layout="icon" intent="signin" />` | contêiner font-size: proto 13.3333px · DS 16px; contêiner line-height: proto normal · DS 24px; contêiner font-weight: proto 400 · DS 600 |
| ENT-01 | 12 | `<SocialButton provider="apple" layout="icon" intent="signin" />` | contêiner font-size: proto 13.3333px · DS 16px; contêiner line-height: proto normal · DS 24px; contêiner font-weight: proto 400 · DS 600 |
| ENT-01 | 13 | `<SocialButton provider="microsoft" layout="icon" intent="signin" />` | contêiner font-size: proto 13.3333px · DS 16px; contêiner line-height: proto normal · DS 24px; contêiner font-weight: proto 400 · DS 600 |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 64×64 | 64×64 |
| imagem | 32×32 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | width | `--size-social-button` | --size-social-button | 64px |
| contêiner | height | `--size-social-button` | --size-social-button | 64px |
| contêiner | background | `--color-white` | --color-white | rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box |
| contêiner | border | `--border-width-thin` | --border-width-thin | 1px solid rgb(242, 244, 247) |
| contêiner | border-radius | `--radius-lg` | --radius-lg | 8px |
| contêiner | box-shadow | `--shadow-100` | --shadow-100 | rgba(12, 12, 13, 0.05) 0px 1px 4px 0px |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `provider="google"`, `layout="icon"`, `intent="signin"`
