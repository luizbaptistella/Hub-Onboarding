# Select

Ficha técnica do componente `Select` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/Select/README.md

Usado em 4 telas, 5 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `disabled` | true · false | true |
| `hideLabel` | true · false | — |
| `optional` | true · false | — |
| `readOnly` | true · false | — |
| `width` | full · half · short | — |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| CAD-07 | 8 | `<Select label="Cidade" options={cidadesDoEstado} placeholder="Selecione a cidade" disabled required name="cidade" />` | select-chevron tamanho: proto 18×18 · DS 20×20; ícone (keyboard_arrow_down) tamanho: proto 18×18 · DS 20×20 |
| CAD-07 | 9 | `<Select label="Estado" options={["SP", "RJ", "MG", "PR", "RS", "BA", "PE", "DF"]} placeholder="Selecione" required name="uf" />` | select-chevron tamanho: proto 18×18 · DS 20×20; ícone (keyboard_arrow_down) tamanho: proto 18×18 · DS 20×20 |
| AJD-01 | 3 | `<Select label="Categoria" options={["Cadastro e dados pessoais", "Familiares", "Documentos", "Biometria facial", "Acesso e segurança", "Sócio torcedor", "Outros"]} placeholder="Selecione a categoria" required name="categoria" />` | select-chevron tamanho: proto 18×18 · DS 20×20; ícone (keyboard_arrow_down) tamanho: proto 18×18 · DS 20×20 |
| FAM-10 | 3 | `<Select label="Tipo de vínculo" options={["Filho(a)", "Pai ou mãe", "Irmão ou irmã", "Cônjuge ou companheiro(a)", "Sobrinho(a)", "Outros"]} placeholder="Selecione o tipo de vínculo" required name="relation" />` | nenhuma |
| FAM-12 | 3 | `<Select label="Tipo de vínculo" options={["Filho(a)", "Pai ou mãe", "Irmão ou irmã", "Cônjuge ou companheiro(a)", "Sobrinho(a)", "Outros"]} placeholder="Selecione o tipo de vínculo" required name="relation" />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 203×72 | 203×72 |
| field-label | 203×20 | 203×20 |
| select | 203×44 | — |
| select-trigger | 201×42 | — |
| select-value | 125×17 | — |
| select-chevron | 18×18 | 20×20 |
| ícone (keyboard_arrow_down) | 18×18 | 20×20 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-stack-related` | --space-stack-related | 8px |
| field-label | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| field-label | font-size | `--type-label-md-size` | --type-label-md-size | 14px |
| field-label | line-height | `--type-label-md-line-height` | --type-label-md-line-height | 20px |
| field-label | font-weight | `--type-label-md-weight` | --type-label-md-weight | 500 |
| field-label | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| select | height | `--size-input` | --size-input | 44px |
| select | border | `--border-input` | --border-input → --neutral-500 → --gray-500 | 1px solid rgb(97, 102, 116) |
| select | border-radius | `--radius-lg` | --radius-lg | 8px |
| select | background | `--bg-page` | --bg-page → --neutral-50 → --gray-50 | rgb(248, 249, 250) none repeat scroll 0% 0% / auto padding-box border-box |
| select-trigger | padding | `--space-150` | --space-150 | 0px 26px 0px 12px |
| select-trigger | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| select-trigger | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| select-trigger | font-size | `--type-body-md-size` | --type-body-md-size | 14px |
| select-trigger | line-height | `--type-body-md-line-height` | --type-body-md-line-height | 20px |
| select-chevron | right | `--space-150` | --space-150 | 12px |
| select-chevron | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| ícone (keyboard_arrow_down) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `label="Cidade"`, `options=["São Paulo", "Campinas"]`, `placeholder="Selecione a cidade"`, `disabled=true`, `required=true`, `name="cidade"`
- **Preenchido**: `label="Cidade"`, `options=["São Paulo", "Campinas"]`, `placeholder="Selecione a cidade"`, `disabled=false`, `required=true`, `name="cidade"`, `defaultValue="São Paulo"`
- **Erro**: `label="Cidade"`, `options=["São Paulo", "Campinas"]`, `placeholder="Selecione a cidade"`, `disabled=false`, `required=true`, `name="cidade"`, `error="Selecione a cidade."`
