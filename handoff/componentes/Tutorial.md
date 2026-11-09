# Tutorial

Ficha técnica do componente `Tutorial` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/Tutorial/README.md

Usado em 1 telas, 1 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| BIO-01 | 2 | `<Tutorial label="Tutorial da captura" steps={[{ title: "Ache um lugar bem claro e com fundo simples.", description: "Fique de frente para a luz e sem coisas ou pessoas atrás de você. Assim, sua foto fica boa e ajuda a aprovar mais rápido." }, { title: "Tire óculos, boné ou o que cobrir seu rosto.", description: "Deixe seu rosto e olhos bem à mostra e sem reflexos. Assim, fica mais fácil reconhecer você e sua foto é aceita de primeira." }, { title: "Vista uma roupa apropriada.", description: "Não tire a foto sem camisa, com roupas de banho ou íntimas. Estar bem vestido faz com que sua selfie seja aprovada rápido." }]} continueLabel="Continuar" />` | contêiner height: proto 300px · DS 814px; ícone (image) tamanho: proto 24×24 · DS 40×40 |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×300 | 327×814 |
| ícone (image) | 24×24 | 40×40 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | background | `--lv-neutral` | --lv-neutral | rgb(238, 238, 240) none repeat scroll 0% 0% / auto padding-box border-box |
| ícone (image) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `label="Tutorial da captura"`, `steps=[{"title": "Ache um lugar bem claro e com fundo simples.", "description": "Fique de frente para a luz e sem coisas ou pessoas atrás de você. Assim, sua foto fica boa e ajuda a aprovar mais rápido."}, {"title": "Tire óculos, boné ou o que cobrir seu rosto.", "description": "Deixe seu rosto e olhos bem à mostra e sem reflexos. Assim, fica mais fácil reconhecer você e sua foto é aceita de primeira."}, {"title": "Vista uma roupa apropriada.", "description": "Não tire a foto sem camisa, com roupas de banho ou íntimas. Estar bem vestido faz com que sua selfie seja aprovada rápido."}]`, `continueLabel="Continuar"`, `onFinish="(fn)"`
