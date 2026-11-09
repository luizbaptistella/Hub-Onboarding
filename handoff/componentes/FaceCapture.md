# FaceCapture

Ficha técnica do componente `FaceCapture` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/FaceCapture/README.md

Usado em 1 telas, 1 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `direction` | left · right | — |
| `state` | idle · progress · frame · success · warning · countdown | progress |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| BIO-02 | 2 | `<FaceCapture state="progress" />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×327 | 327×327 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | background | `--lv-neutral` | --lv-neutral | rgb(238, 238, 240) none repeat scroll 0% 0% / auto padding-box border-box |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **progress (esquerda)**: `state="progress"`, `progress=0.6`, `direction="left"`
- **success**: `state="success"`
- **frame**: `state="frame"`
- **warning**: `state="warning"`
- **countdown**: `state="countdown"`, `countdown=3`
