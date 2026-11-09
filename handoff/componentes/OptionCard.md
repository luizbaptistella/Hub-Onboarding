# OptionCard

Ficha técnica do componente `OptionCard` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/OptionCard/README.md

Usado em 1 telas, 2 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `disabled` | true · false | — |
| `layout` | inline · stacked | stacked |
| `selected` | true · false | — |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| FAM-14 | 3 | `<OptionCard icon="person_add" title="Cadastrar agora" description="Preencha os dados e tire as fotos do documento e do rosto do familiar no seu celular." layout="stacked" />` | nenhuma |
| FAM-14 | 4 | `<OptionCard icon="send" title="Enviar convite" description="O familiar recebe o convite por e-mail ou SMS e confirma os próprios dados." layout="stacked" />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `icon="person_add"`, `title="Cadastrar agora"`, `description="Preencha os dados e tire as fotos do documento e do rosto do familiar no seu celular."`, `layout="stacked"`
- **Escolhido**: `icon="person_add"`, `title="Cadastrar agora"`, `description="Preencha os dados e tire as fotos do documento e do rosto do familiar no seu celular."`, `layout="stacked"`, `selected=true`
