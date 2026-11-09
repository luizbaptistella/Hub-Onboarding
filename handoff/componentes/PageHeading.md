# PageHeading

Ficha técnica do componente `PageHeading` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/PageHeading/README.md

Usado em 20 telas, 20 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `focusOnMount` | true · false | — |
| `size` | md · sm | — |
| `spaced` | true · false | true |
| `tone` | brand · neutral | brand, neutral |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| ENT-01 | 3 | `<PageHeading title="Faça seu login" subtitle="Faça seu login para começar ou cadastre-se." tone="brand" />` | nenhuma |
| CAD-01 | 2 | `<PageHeading title="Bem-vindo(a) ao Palmeiras" subtitle="Crie o seu cadastro em poucos passos" tone="brand" />` | nenhuma |
| CAD-02 | 2 | `<PageHeading title="Insira o seu código" subtitle="Enviamos um código de 6 dígitos por SMS para o seu celular." tone="neutral" spaced />` | contêiner height: proto 148px · DS 80px |
| CAD-03 | 2 | `<PageHeading title="Atualize seu celular" subtitle="Informe o novo número para receber um novo código de verificação." tone="neutral" spaced />` | contêiner height: proto 88px · DS 80px |
| CAD-04 | 3 | `<PageHeading title="Insira o seu código" subtitle="Enviamos um código de 6 dígitos para o seu e-mail." tone="neutral" spaced />` | contêiner height: proto 148px · DS 80px |
| CAD-05 | 2 | `<PageHeading title="Atualize seu e-mail" subtitle="Informe o novo e-mail para receber um novo código de verificação." tone="neutral" spaced />` | contêiner height: proto 88px · DS 80px |
| CAD-07 | 2 | `<PageHeading title="Qual é o seu endereço?" subtitle="Informe onde você mora para concluir o cadastro." tone="neutral" />` | nenhuma |
| DOC-01 | 2 | `<PageHeading title="Escolha um documento" subtitle="Selecione um dos documentos listados abaixo para continuar com a validação." tone="neutral" />` | nenhuma |
| BIO-04 | 3 | `<PageHeading title="Confira se sua foto está legível." subtitle="Confira se sua foto está nítida para agilizar a análise." tone="neutral" spaced />` | contêiner height: proto 120px · DS 112px |
| AJD-01 | 2 | `<PageHeading title="Como podemos ajudar?" tone="neutral" />` | nenhuma |
| AJD-02 | 2 | `<PageHeading title="Chamado aberto" subtitle="Guarde o número de protocolo. Enviamos uma cópia para o seu e-mail." tone="neutral" />` | nenhuma |
| AREA-04 | 2 | `<PageHeading title="Encerrar sua conta" subtitle="Por exigência legal e pela segurança do estádio, seu cadastro não é apagado: ele fica inativo e bloqueado para uso." tone="neutral" />` | nenhuma |
| FAM-03 | 2 | `<PageHeading title="Sua família no Torcedor 360" subtitle="Adicione familiares para comprar ingressos para eles. Cada um tem a própria identidade validada." tone="neutral" />` | nenhuma |
| FAM-09 | 2 | `<PageHeading title="Buscar familiar" tone="neutral" spaced />` | nenhuma |
| FAM-10 | 2 | `<PageHeading title="Confirme o familiar" tone="neutral" spaced />` | nenhuma |
| FAM-11 | 2 | `<PageHeading title="Enviar convite ao familiar" tone="neutral" spaced />` | nenhuma |
| FAM-12 | 2 | `<PageHeading title="Dados do familiar" tone="neutral" spaced />` | nenhuma |
| FAM-13 | 2 | `<PageHeading title="Termo de responsabilidade" subtitle="Como responsável, você responde pelo cadastro de quem tem menos de 18 anos. Leia o termo antes de confirmar." tone="neutral" />` | nenhuma |
| FAM-14 | 2 | `<PageHeading title="Como deseja concluir o cadastro?" subtitle="Você pode preencher agora, no seu celular, ou enviar um convite para o familiar confirmar os próprios dados." tone="neutral" />` | nenhuma |
| FAM-16 | 2 | `<PageHeading title="Roberto Silva convidou você" tone="neutral" spaced />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×60 | 327×60 |
| heading-title | 327×32 | 327×32 |
| heading-sub | 327×20 | 327×20 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-stack-related` | --space-stack-related | 8px |
| heading-title | font-family | `--font-heading` | --font-heading | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| heading-title | font-size | `--type-heading-xl-size` | --type-heading-xl-size | 24px |
| heading-title | line-height | `--type-heading-xl-line-height` | --type-heading-xl-line-height | 32px |
| heading-title | font-weight | `--type-heading-xl-weight` | --type-heading-xl-weight | 700 |
| heading-title | color | `--text-brand` | --text-brand → --brand-800 → --green-800 | rgb(0, 82, 46) |
| heading-sub | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| heading-sub | font-size | `--type-body-md-size` | --type-body-md-size | 14px |
| heading-sub | line-height | `--type-body-md-line-height` | --type-body-md-line-height | 20px |
| heading-sub | font-weight | `--type-body-md-weight` | --type-body-md-weight | 400 |
| heading-sub | color | `--text-subtle` | --text-subtle → --neutral-500 → --gray-500 | rgb(97, 102, 116) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `title="Faça seu login"`, `subtitle="Faça seu login para começar ou cadastre-se."`, `tone="brand"`
