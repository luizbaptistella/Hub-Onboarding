# Tabs

Ficha técnica do componente `Tabs` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/Tabs/README.md

Usado em 4 telas, 4 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| CAD-01 | 3 | `<Tabs label="Nacionalidade" items={[{ value: "Brasileiro", label: "Brasileiro" }, { value: "Estrangeiro", label: "Estrangeiro" }]} value="Brasileiro" />` | nenhuma |
| AREA-01 | 6 | `<Tabs items={[{ value: "Meus cadastro", label: "Meus cadastro" }, { value: "Meus familiares", label: "Meus familiares" }]} value="Meus cadastro" />` | tab tamanho: proto 164×48 · DS 188×48 |
| FAM-01 | 6 | `<Tabs items={[{ value: "Meus cadastro", label: "Meus cadastro" }, { value: "Meus familiares", label: "Meus familiares" }]} value="Meus familiares" />` | tab tamanho: proto 164×48 · DS 188×48 |
| FAM-17 | 6 | `<Tabs items={[{ value: "Meus cadastro", label: "Meus cadastro" }, { value: "Meus familiares", label: "Meus familiares" }]} value="Meus familiares" />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 327×48 | 327×48 |
| tab | 164×48 | 164×48 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | border-bottom | `--border-default` | --border-default → --neutral-200 → --gray-200 | 1px solid rgb(226, 227, 232) |
| tab | height | `--size-control` | --size-control | 48px |
| tab | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| tab | font-size | `--type-label-lg-strong-size` | --type-label-lg-strong-size | 16px |
| tab | line-height | `--type-label-lg-strong-line-height` | --type-label-lg-strong-line-height | 24px |
| tab | font-weight | `--type-label-lg-strong-weight` | --type-label-lg-strong-weight | 600 |
| tab | color | `--text-brand` | --text-brand → --brand-800 → --green-800 | rgb(0, 82, 46) |
| tab | border-bottom-color | `--border-brand` | --border-brand → --brand-800 → --green-800 | rgb(0, 82, 46) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `label="Nacionalidade"`, `items=[{"value": "Brasileiro", "label": "Brasileiro"}, {"value": "Estrangeiro", "label": "Estrangeiro"}]`, `value="Brasileiro"`
