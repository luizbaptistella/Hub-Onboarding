# ContactRow

Ficha técnica do componente `ContactRow` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/ContactRow/README.md

Usado em 2 telas, 2 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `channel` | sms · email | email, sms |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| CAD-02 | 3 | `<ContactRow channel="sms" value={maskPhone(celular)} editLabel="Editar Celular" />` | contêiner height: proto 44px · DS 20px |
| CAD-04 | 4 | `<ContactRow channel="email" value={maskEmail(email)} editLabel="Editar Email" />` | contêiner height: proto 44px · DS 20px |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×44 | 327×20 |
| contact-value | 134×20 | 134×20 |
| ícone (sms) | 16×16 | 16×16 |
| contact-edit | 113×44 | — |
| ícone (edit_square) | 18×18 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-inline-group` | --space-inline-group | 12px |
| contêiner | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| contêiner | font-size | `--type-body-md-size` | --type-body-md-size | 14px |
| contêiner | line-height | `--type-body-md-line-height` | --type-body-md-line-height | 20px |
| contêiner | font-weight | `--type-body-md-weight` | --type-body-md-weight | 400 |
| contact-value | gap | `--space-inline-tight` | --space-inline-tight | 4px |
| contact-value | font-weight | `--type-label-md-strong-weight` | --type-label-md-strong-weight | 600 |
| contact-value | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| ícone (sms) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| contact-edit | gap | `--space-inline-tight` | --space-inline-tight | 4px |
| contact-edit | font-size | `--type-label-md-strong-size` | --type-label-md-strong-size | 14px |
| contact-edit | line-height | `--type-label-md-strong-line-height` | --type-label-md-strong-line-height | 20px |
| contact-edit | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| contact-edit | font-weight | `--type-label-md-strong-weight` | --type-label-md-strong-weight | 600 |
| contact-edit | color | `--text-brand` | --text-brand → --brand-800 → --green-800 | rgb(0, 82, 46) |
| contact-edit | min-height | `--size-touch-target` | --size-touch-target | 44px |
| ícone (edit_square) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `channel="sms"`, `value="(11) 9****-5432"`, `editLabel="Editar Celular"`
