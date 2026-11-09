# ListItem

Ficha técnica do componente `ListItem` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/ListItem/README.md

Usado em 3 telas, 14 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `disabled` | true · false | — |
| `tone` | default · danger | danger |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| AREA-02 | 3 | `<ListItem title="Ingresso confirmado" description="Palmeiras x Corinthians · 12/11, setor Norte" icon="confirmation_number" />` | contêiner height: proto 78px · DS 62px; list-text tamanho: proto 205×54 · DS 261×38; list-title tamanho: proto 205×20 · DS 261×20; list-desc tamanho: proto 205×32 · DS 261×16 |
| AREA-02 | 4 | `<ListItem title="Cadastro atualizado" description="Seu e-mail foi alterado. Se não foi você, fale com a gente." icon="mail" />` | list-text tamanho: proto 205×54 · DS 261×54; list-title tamanho: proto 205×20 · DS 261×20; list-desc tamanho: proto 205×32 · DS 261×32 |
| AREA-02 | 6 | `<ListItem title="Meia-entrada aprovada" description="Estudante · válido até 31/12/2026" icon="school" />` | nenhuma |
| AREA-02 | 7 | `<ListItem title="Bem-vindo ao Sócio Torcedor" description="Seu cadastro foi concluído" icon="celebration" />` | nenhuma |
| AREA-03 | 3 | `<ListItem title="Senha" description="Alterada há 3 meses" icon="password" action={{ label: "Alterar" }} />` | nenhuma |
| AREA-03 | 4 | `<ListItem title="Verificação em duas etapas" description="Código por SMS ao entrar e ao alterar dados" icon="password" />` | contêiner height: proto 98px · DS 62px; list-text tamanho: proto 149×74 · DS 261×38; list-title tamanho: proto 149×40 · DS 261×20; list-desc tamanho: proto 149×32 · DS 261×16 |
| AREA-03 | 6 | `<ListItem title="Google" description="Conectado · roberto.silva@gmail.com" icon="(logo do provedor)" action={{ label: "Desconectar", tone: "danger" }} />` | nenhuma |
| AREA-03 | 7 | `<ListItem title="Apple" description="Não conectado" icon="(logo do provedor)" action={{ label: "Conectar" }} />` | nenhuma |
| AREA-03 | 8 | `<ListItem title="Microsoft" description="Não conectado" icon="(logo do provedor)" action={{ label: "Conectar" }} />` | nenhuma |
| AREA-03 | 10 | `<ListItem title="Encerrar conta" icon="person_remove" tone="danger" />` | list-text tamanho: proto 229×20 · DS 261×20; list-title tamanho: proto 229×20 · DS 261×20 |
| AREA-04 | 4 | `<ListItem title="Você perde o acesso a ingressos e benefícios" icon="cancel" />` | nenhuma |
| AREA-04 | 5 | `<ListItem title="Sua biometria é removida das catracas" icon="shield" />` | nenhuma |
| AREA-04 | 6 | `<ListItem title="Compras e histórico ficam guardados pelo prazo legal" icon="folder" />` | nenhuma |
| AREA-04 | 7 | `<ListItem title="Para voltar, fale com o atendimento" icon="chat" />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 325×78 | 325×62 |
| list-icon | 20×20 | 20×20 |
| ícone (confirmation_number) | 20×20 | 20×20 |
| list-text | 205×54 | 261×38 |
| list-title | 205×20 | 261×20 |
| list-desc | 205×32 | 261×16 |
| list-trailing | 44×20 | — |
| badge | 44×20 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-inline-group` | --space-inline-group | 12px |
| contêiner | min-height | `--size-menu-item` | --size-menu-item | 48px |
| contêiner | padding | `--space-150` | --space-150 | 12px 16px |
| contêiner | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| list-icon | color | `--icon-subtle` | --icon-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| ícone (confirmation_number) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| list-text | gap | `--space-025` | --space-025 | 2px |
| list-title | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| list-title | font-size | `--type-label-md-size` | --type-label-md-size | 14px |
| list-title | line-height | `--type-label-md-line-height` | --type-label-md-line-height | 20px |
| list-title | font-weight | `--type-label-md-weight` | --type-label-md-weight | 500 |
| list-title | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| list-desc | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| list-desc | font-size | `--type-body-sm-size` | --type-body-sm-size | 12px |
| list-desc | line-height | `--type-body-sm-line-height` | --type-body-sm-line-height | 16px |
| list-desc | font-weight | `--type-body-sm-weight` | --type-body-sm-weight | 400 |
| list-desc | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| badge | padding | `--space-025` | --space-025 | 2px 8px |
| badge | border-radius | `--radius-md` | --radius-md | 6px |
| badge | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| badge | font-size | `--type-label-xs-size` | --type-label-xs-size | 11px |
| badge | line-height | `--type-label-xs-line-height` | --type-label-xs-line-height | 16px |
| badge | font-weight | `--type-label-xs-weight` | --type-label-xs-weight | 500 |
| badge | background | `--bg-info-subtle` | --bg-info-subtle → --blue-100 | rgb(219, 234, 254) none repeat scroll 0% 0% / auto padding-box border-box |
| badge | color | `--text-info` | --text-info → --blue-700 | rgb(29, 78, 216) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `title="Ingresso confirmado"`, `description="Palmeiras x Corinthians · 12/11, setor Norte"`, `icon="confirmation_number"`
