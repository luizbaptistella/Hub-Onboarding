# Badge

Ficha técnica do componente `Badge` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/Badge/README.md

Usado em 3 telas, 20 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `tone` | neutral · info · success · warning · danger | danger, info, success, warning |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| AREA-01 | 2 | `<Badge tone="success">Cadastro completo</Badge>` | nenhuma |
| AREA-01 | 15 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| AREA-01 | 101 | `<Badge tone="warning">Cadastro pendente</Badge>` | nenhuma |
| AREA-01 | 105 | `<Badge tone="danger">Cadastro reprovado</Badge>` | contêiner height: proto 20px · DS 36px |
| AREA-01 | 108 | `<Badge tone="info">Cadastro em análise</Badge>` | nenhuma |
| FAM-01 | 2 | `<Badge tone="success">Cadastro completo</Badge>` | nenhuma |
| FAM-17 | 2 | `<Badge tone="success">Cadastro completo</Badge>` | nenhuma |
| FAM-17 | 8 | `<Badge tone="info">Pendente</Badge>` | nenhuma |
| FAM-17 | 10 | `<Badge tone="warning">Expirado</Badge>` | nenhuma |
| FAM-17 | 13 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| FAM-17 | 18 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| FAM-17 | 21 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| FAM-17 | 26 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| FAM-17 | 29 | `<Badge tone="info">Pendente</Badge>` | nenhuma |
| FAM-17 | 33 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| FAM-17 | 38 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| FAM-17 | 40 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| FAM-17 | 45 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| FAM-17 | 47 | `<Badge tone="success">Ativo</Badge>` | nenhuma |
| FAM-17 | 52 | `<Badge tone="success">Ativo</Badge>` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 116×20 | 116×20 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | padding | `--space-025` | --space-025 | 2px 8px |
| contêiner | border-radius | `--radius-md` | --radius-md | 6px |
| contêiner | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| contêiner | font-size | `--type-label-xs-size` | --type-label-xs-size | 11px |
| contêiner | line-height | `--type-label-xs-line-height` | --type-label-xs-line-height | 16px |
| contêiner | font-weight | `--type-label-xs-weight` | --type-label-xs-weight | 500 |
| contêiner | background | `--bg-success-subtle` | --bg-success-subtle → --green-100 | rgb(209, 240, 218) none repeat scroll 0% 0% / auto padding-box border-box |
| contêiner | color | `--text-success` | --text-success → --green-700 | rgb(0, 100, 55) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `tone="success"`
