# JourneyStepper

Ficha técnica do componente `JourneyStepper` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/JourneyStepper/README.md

Usado em 2 telas, 2 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| CAD-08 | 2 | `<JourneyStepper steps={[{ label: "Cadastro", state: "done" }, { label: "Captura de documentos", state: "current" }, { label: "Biometria facial", state: "upcoming" }, { label: "Validação de benefícios", state: "upcoming" }]} />` | ícone (check) tamanho: proto 26×26 · DS 24×24 |
| BIO-07 | 2 | `<JourneyStepper steps={[{ label: "Cadastro", state: "done" }, { label: "Captura de documentos", state: "done" }, { label: "Biometria facial", state: "done" }, { label: "Validação de benefícios", state: "current" }]} />` | ícone (check) tamanho: proto 26×26 · DS 24×24 |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×328 | 327×328 |
| journey-step | 311×68 | 311×68 |
| journey-row | 302×44 | 302×44 |
| journey-circle | 44×44 | 44×44 |
| ícone (check) | 26×26 | 24×24 |
| journey-label | 88×28 | 88×28 |
| journey-connector | 2×24 | 2×24 |
| ícone (description) | 28×28 | — |
| journey-pill | 258×40 | 258×40 |
| journey-pill-bg | 258×40 | 258×40 |
| ícone (familiar_face_and_zone) | 22×22 | — |
| ícone (assignment_turned_in) | 22×22 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | padding | `--space-inset-md` | --space-inset-md | 36px 0px 16px 16px |
| contêiner | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| journey-row | gap | `--space-inline-related` | --space-inline-related | 8px |
| journey-circle | border-radius | `--radius-full` | --radius-full | 9999px |
| journey-circle | background | `--journey-step-current` | --journey-step-current → --brand-800 → --green-800 | rgb(0, 82, 46) none repeat scroll 0% 0% / auto padding-box border-box |
| journey-circle | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |
| ícone (check) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| journey-label | font-family | `--font-heading` | --font-heading | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| journey-label | font-size | `--type-title-lg-size` | --type-title-lg-size | 20px |
| journey-label | line-height | `--type-title-lg-line-height` | --type-title-lg-line-height | 28px |
| journey-label | font-weight | `--type-title-lg-weight` | --type-title-lg-weight | 600 |
| journey-label | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |
| journey-connector | border-radius | `--radius-full` | --radius-full | 9999px |
| journey-connector | background | `--journey-step-done` | --journey-step-done → --brand-400 → --green-400 | rgb(70, 183, 128) none repeat scroll 0% 0% / auto padding-box border-box |
| ícone (description) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| journey-pill | padding | `--space-050` | --space-050 | 4px 8px 4px 18px |
| journey-pill-bg | fill | `--journey-step-current` | --journey-step-current → --brand-800 → --green-800 | rgb(0, 82, 46) |
| journey-pill-bg | stroke | `--journey-step-current-ring` | --journey-step-current-ring → --neutral-0 → --gray-0 | rgb(255, 255, 255) |
| ícone (familiar_face_and_zone) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| ícone (assignment_turned_in) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `steps=[{"label": "Cadastro", "state": "done"}, {"label": "Captura de documentos", "state": "current"}, {"label": "Biometria facial", "state": "upcoming"}, {"label": "Validação de benefícios", "state": "upcoming"}]`
