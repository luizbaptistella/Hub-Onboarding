# AppHeader

Ficha técnica do componente `AppHeader` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/AppHeader/README.md

Usado em 28 telas, 28 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `language` | pt-BR · es · en | false, true |
| `showBack` | true · false | — |
| `showHelp` | true · false | — |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| ENT-01 | 1 | `<AppHeader back={false} title="Login" language help={false} />` | contêiner height: proto 56px · DS 48px; header-title tamanho: proto 211×16 · DS 169×20; lang tamanho: proto 80×44 · DS 78×32; ícone (expand_more) tamanho: proto 18×18 · DS 20×20 |
| CAD-01 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language help={false} />` | contêiner height: proto 56px · DS 48px; progress tamanho: proto 211×24 · DS 209×24; progress-label tamanho: proto 211×16 · DS 52×16; progress-track tamanho: proto 211×4 · DS 209×4; lang tamanho: proto 80×44 · DS 78×32 |
| CAD-02 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 263×24; progress-label tamanho: proto 247×16 · DS 52×16; progress-track tamanho: proto 247×4 · DS 263×4; progress-seg tamanho: proto 59×4 · DS 63×4 |
| CAD-03 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Editar celular" language={false} help />` | contêiner height: proto 56px · DS 40px; header-title tamanho: proto 247×16 · DS 263×20 |
| CAD-04 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 263×24; progress-label tamanho: proto 247×16 · DS 52×16; progress-track tamanho: proto 247×4 · DS 263×4; progress-seg tamanho: proto 59×4 · DS 63×4 |
| CAD-05 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Editar e-mail" language={false} help />` | contêiner height: proto 56px · DS 40px; header-title tamanho: proto 247×16 · DS 263×20 |
| CAD-06 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 263×24; progress-label tamanho: proto 247×16 · DS 52×16; progress-track tamanho: proto 247×4 · DS 263×4; progress-seg tamanho: proto 59×4 · DS 63×4 |
| CAD-07 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Cadastro" progress={{ current: 1, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 263×24; progress-label tamanho: proto 247×16 · DS 52×16; progress-track tamanho: proto 247×4 · DS 263×4; progress-seg tamanho: proto 59×4 · DS 63×4 |
| DOC-01 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Captura de documentos" progress={{ current: 2, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 263×24; progress-label tamanho: proto 247×16 · DS 138×16; progress-track tamanho: proto 247×4 · DS 263×4; progress-seg tamanho: proto 59×4 · DS 63×4 |
| BIO-01 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 263×24; progress-label tamanho: proto 247×16 · DS 89×16; progress-track tamanho: proto 247×4 · DS 263×4; progress-seg tamanho: proto 59×4 · DS 63×4 |
| BIO-02 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 263×24; progress-label tamanho: proto 247×16 · DS 89×16; progress-track tamanho: proto 247×4 · DS 263×4; progress-seg tamanho: proto 59×4 · DS 63×4 |
| BIO-03 | 1 | `<AppHeader back={false} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 303×24; progress-label tamanho: proto 247×16 · DS 89×16; progress-track tamanho: proto 247×4 · DS 303×4; progress-seg tamanho: proto 59×4 · DS 73×4 |
| BIO-04 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 263×24; progress-label tamanho: proto 247×16 · DS 89×16; progress-track tamanho: proto 247×4 · DS 263×4; progress-seg tamanho: proto 59×4 · DS 63×4 |
| BIO-05 | 1 | `<AppHeader back={false} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 303×24; progress-label tamanho: proto 247×16 · DS 89×16; progress-track tamanho: proto 247×4 · DS 303×4; progress-seg tamanho: proto 59×4 · DS 73×4 |
| BIO-06 | 1 | `<AppHeader back={false} title="Biometria facial" progress={{ current: 3, total: 4 }} language={false} help />` | contêiner height: proto 56px · DS 40px; progress tamanho: proto 247×24 · DS 303×24; progress-label tamanho: proto 247×16 · DS 89×16; progress-track tamanho: proto 247×4 · DS 303×4; progress-seg tamanho: proto 59×4 · DS 73×4 |
| AREA-02 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Notificações" language={false} help={false} />` | contêiner height: proto 56px · DS 40px; header-title tamanho: proto 247×16 · DS 263×20 |
| AJD-01 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Ajuda e atendimento" language={false} help={false} />` | contêiner height: proto 56px · DS 40px; header-title tamanho: proto 247×16 · DS 263×20 |
| AJD-02 | 1 | `<AppHeader back={{ label: "Fechar" }} title="Ajuda e atendimento" language={false} help={false} />` | contêiner height: proto 56px · DS 40px; header-title tamanho: proto 247×16 · DS 263×20 |
| AREA-03 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Segurança" language={false} help />` | contêiner height: proto 56px · DS 40px; header-title tamanho: proto 247×16 · DS 263×20 |
| AREA-04 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Encerrar conta" language={false} help />` | contêiner height: proto 56px · DS 40px; header-title tamanho: proto 247×16 · DS 263×20 |
| FAM-03 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Adicionar familiar" language={false} help />` | contêiner height: proto 56px · DS 40px; header-title tamanho: proto 247×16 · DS 263×20 |
| FAM-09 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Vincular familiar" language={false} help={false} />` | nenhuma |
| FAM-10 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Vincular familiar" language={false} help={false} />` | nenhuma |
| FAM-11 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Vincular familiar" language={false} help={false} />` | nenhuma |
| FAM-12 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Cadastrar familiar" language={false} help={false} />` | nenhuma |
| FAM-13 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Cadastrar familiar" language={false} help={false} />` | nenhuma |
| FAM-14 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Cadastrar familiar" language={false} help={false} />` | nenhuma |
| FAM-16 | 1 | `<AppHeader back={{ label: "Voltar" }} title="Convite de familiar" language={false} help={false} />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 375×56 | 375×48 |
| header-slot | 48×48 | — |
| header-center | 211×16 | — |
| header-title | 211×16 | 169×20 |
| lang | 80×44 | 78×32 |
| imagem | 20×20 | — |
| lang-code | 18×20 | — |
| ícone (expand_more) | 18×18 | 20×20 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-inline-related` | --space-inline-related | 8px |
| contêiner | padding | `--space-100` | --space-100 | 0px 8px |
| contêiner | background | `--bg-surface` | --bg-surface → --neutral-0 → --gray-0 | rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box |
| header-center | gap | `--space-stack-tight` | --space-stack-tight | 4px |
| header-title | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| header-title | font-size | `--type-label-sm-size` | --type-label-sm-size | 12px |
| header-title | line-height | `--type-label-sm-line-height` | --type-label-sm-line-height | 16px |
| header-title | font-weight | `--type-label-sm-weight` | --type-label-sm-weight | 500 |
| header-title | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |
| lang | gap | `--space-inline-tight` | --space-inline-tight | 4px |
| lang | height | `--size-touch-target` | --size-touch-target | 44px |
| lang | padding | `--space-100` | --space-100 | 0px 8px |
| lang | background | `--bg-surface` | --bg-surface → --neutral-0 → --gray-0 | rgb(255, 255, 255) none repeat scroll 0% 0% / auto padding-box border-box |
| lang | border-radius | `--radius-full` | --radius-full | 9999px |
| lang | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| lang | font-size | `--type-label-md-strong-size` | --type-label-md-strong-size | 14px |
| lang | line-height | `--type-label-md-strong-line-height` | --type-label-md-strong-line-height | 20px |
| lang | font-weight | `--type-label-md-strong-weight` | --type-label-md-strong-weight | 600 |
| lang | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| ícone (expand_more) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| ícone (expand_more) | color | `--icon-subtle` | --icon-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `back=false`, `title="Login"`, `language={}`, `help=false`
