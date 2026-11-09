# Alert

Ficha técnica do componente `Alert` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/Alert/README.md

Usado em 5 telas, 5 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `live` | polite · assertive · off | — |
| `tone` | error · info · success · warning · danger | danger, info, success |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| ENT-01 | 4 | `<Alert tone="info" title="Sua conta foi encerrada.">O cadastro ficou inativo. Para voltar, fale com o atendimento.</Alert>` | nenhuma |
| CAD-06 | 3 | `<Alert tone="success" title="E-mail verificado">Validação de e-mail concluída com sucesso.</Alert>` | contêiner height: proto 78px · DS 90px |
| BIO-05 | 2 | `<Alert tone="danger" title="Excesso de tentativas.">Você excedeu o limite de 3 tentativas. Tente novamente em 5:00.</Alert>` | contêiner height: proto 118px · DS 90px; alert-icon tamanho: proto 24×24 · DS 20×20; ícone (error) tamanho: proto 24×24 · DS 20×20; alert-text tamanho: proto 269×92 · DS 273×64; alert-title tamanho: proto 269×20 · DS 273×20; alert-body tamanho: proto 269×40 · DS 273×40 |
| BIO-06 | 2 | `<Alert tone="danger" title="Não conseguimos validar sua identidade.">Entre em contato com o suporte para continuar.</Alert>` | contêiner height: proto 138px · DS 110px; alert-icon tamanho: proto 24×24 · DS 20×20; ícone (error) tamanho: proto 24×24 · DS 20×20; alert-text tamanho: proto 269×112 · DS 273×84; alert-title tamanho: proto 269×40 · DS 273×40; alert-body tamanho: proto 269×40 · DS 273×40 |
| FAM-03 | 4 | `<Alert tone="info">Menores de 18 anos ficam sob sua responsabilidade. Maiores de 18 recebem um convite e confirmam o vínculo.</Alert>` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×78 | 327×90 |
| status-icon | 20×20 | — |
| ícone (check_circle) | 20×20 | 20×20 |
| status-text | 252×44 | — |
| status-title | 252×24 | — |
| status-desc | 252×16 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-inline-group` | --space-inline-group | 12px |
| contêiner | padding | `--space-inset-md` | --space-inset-md | 16px |
| contêiner | border | `--border-success` | --border-success → --green-300 | 1px solid rgb(122, 207, 162) |
| contêiner | border-radius | `--radius-lg` | --radius-lg | 8px |
| contêiner | background | `--bg-success-subtlest` | --bg-success-subtlest → --green-50 | rgb(235, 249, 232) none repeat scroll 0% 0% / auto padding-box border-box |
| status-icon | border-radius | `--radius-full` | --radius-full | 9999px |
| status-icon | background | `--bg-success-subtle` | --bg-success-subtle → --green-100 | rgb(209, 240, 218) none repeat scroll 0% 0% / auto padding-box border-box |
| status-icon | color | `--icon-success` | --icon-success → --green-500 | rgb(16, 160, 102) |
| ícone (check_circle) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| status-text | gap | `--space-stack-tight` | --space-stack-tight | 4px |
| status-text | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| status-title | font-size | `--type-label-lg-size` | --type-label-lg-size | 16px |
| status-title | line-height | `--type-label-lg-line-height` | --type-label-lg-line-height | 24px |
| status-title | font-weight | `--type-label-lg-weight` | --type-label-lg-weight | 500 |
| status-title | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| status-desc | font-size | `--type-body-sm-size` | --type-body-sm-size | 12px |
| status-desc | line-height | `--type-body-sm-line-height` | --type-body-sm-line-height | 16px |
| status-desc | font-weight | `--type-body-sm-weight` | --type-body-sm-weight | 400 |
| status-desc | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `tone="info"`, `title="Sua conta foi encerrada."`
