# TextField

Ficha técnica do componente `TextField` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/TextField/README.md

Usado em 10 telas, 22 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `clearable` | true · false | — |
| `disabled` | true · false | — |
| `hideLabel` | true · false | — |
| `loading` | true · false | — |
| `optional` | true · false | true |
| `preset` | cpf · phone · cep · date · email · name · password | cep, cpf, date, email, password, phone |
| `readOnly` | true · false | — |
| `width` | full · half · short | — |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| ENT-01 | 5 | `<TextField label="Número do seu CPF" preset="cpf" name="cpf" placeholder="000.000.000-00" autoComplete="username" />` | input tamanho: proto 327×44 · DS 325×42 |
| ENT-01 | 6 | `<TextField label="Senha" preset="password" name="senha" placeholder="Digite sua senha" autoComplete="current-password" />` | input tamanho: proto 327×44 · DS 283×42 |
| CAD-01 | 4 | `<TextField label="Número do seu CPF" preset="cpf" name="cpf" placeholder="000.000.000-00" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-01 | 5 | `<TextField label="Data de nascimento" preset="date" name="nascimento" placeholder="DD/MM/AAAA" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-01 | 6 | `<TextField label="Número do seu celular" preset="phone" name="celular" placeholder="(00) 00000-0000" autoComplete="tel-national" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-01 | 7 | `<TextField label="Seu e-mail" preset="email" name="email" placeholder="seuemail@exemplo.com" autoComplete="email" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-03 | 3 | `<TextField label="Celular" preset="phone" name="valor" placeholder="(00) 00000-0000" autoComplete="tel-national" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-03 | 4 | `<TextField label="Confirmar Celular" preset="phone" name="confirmacao" placeholder="(00) 00000-0000" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-05 | 3 | `<TextField label="E-mail" preset="email" name="valor" placeholder="seuemail@exemplo.com" autoComplete="email" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-05 | 4 | `<TextField label="Confirmar E-mail" preset="email" name="confirmacao" placeholder="seuemail@exemplo.com" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-07 | 3 | `<TextField label="CEP" preset="cep" name="cep" placeholder="00000-000" required autoComplete="postal-code" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-07 | 4 | `<TextField label="Rua" name="rua" placeholder="Nome da rua" required autoComplete="address-line1" />` | input tamanho: proto 327×44 · DS 325×42 |
| CAD-07 | 5 | `<TextField label="Número" name="numero" placeholder="000" required />` | contêiner height: proto 92px · DS 72px; field-label tamanho: proto 151×40 · DS 151×20; input tamanho: proto 151×44 · DS 149×42 |
| CAD-07 | 6 | `<TextField label="Complemento" name="complemento" placeholder="Apto, bloco" optional autoComplete="address-line2" />` | contêiner height: proto 92px · DS 72px; field-label tamanho: proto 164×40 · DS 164×20; input tamanho: proto 164×44 · DS 162×42 |
| AJD-01 | 4 | `<TextField label="O que aconteceu?" name="descricao" placeholder="Conte o problema e o que você tentou fazer" maxLength={1000} />` | contêiner height: proto 150px · DS 72px; input tamanho: proto 327×122 · DS 325×42 |
| AREA-04 | 8 | `<TextField label="Para confirmar, digite sua senha" preset="password" name="senha" placeholder="Sua senha" autoComplete="current-password" />` | input tamanho: proto 327×44 · DS 283×42; btn-content tamanho: proto 24×24 · DS 20×20; ícone (visibility) tamanho: proto 24×24 · DS 20×20 |
| FAM-09 | 3 | `<TextField label="CPF ou e-mail" name="valor" placeholder="CPF ou e-mail" required autoComplete="off" />` | nenhuma |
| FAM-12 | 4 | `<TextField label="CPF" name="cpf" placeholder="000.000.000-00" required autoComplete="off" />` | nenhuma |
| FAM-12 | 5 | `<TextField label="Nome completo" name="nome" placeholder="Nome e sobrenome" required autoComplete="off" />` | nenhuma |
| FAM-12 | 6 | `<TextField label="E-mail" preset="email" name="email" placeholder="nome@email.com" required autoComplete="off" />` | nenhuma |
| FAM-12 | 7 | `<TextField label="Celular" name="celular" placeholder="(00) 00000-0000" required autoComplete="off" />` | nenhuma |
| FAM-16 | 3 | `<TextField label="CPF" name="cpf" placeholder="000.000.000-00" autoComplete="off" />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 327×72 | 327×72 |
| field-label | 327×20 | 327×20 |
| input | 327×44 | 325×42 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | gap | `--space-stack-related` | --space-stack-related | 8px |
| field-label | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| field-label | font-size | `--type-label-md-size` | --type-label-md-size | 14px |
| field-label | line-height | `--type-label-md-line-height` | --type-label-md-line-height | 20px |
| field-label | font-weight | `--type-label-md-weight` | --type-label-md-weight | 500 |
| field-label | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| input | height | `--size-input` | --size-input | 44px |
| input | padding | `--space-control-inline` | --space-control-inline | 0px 16px |
| input | border | `--border-input` | --border-input → --neutral-500 → --gray-500 | 1px solid rgb(97, 102, 116) |
| input | border-radius | `--radius-lg` | --radius-lg | 8px |
| input | background | `--bg-page` | --bg-page → --neutral-50 → --gray-50 | rgb(248, 249, 250) none repeat scroll 0% 0% / auto padding-box border-box |
| input | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| input | font-size | `--type-body-lg-size` | --type-body-lg-size | 16px |
| input | line-height | `--type-body-lg-line-height` | --type-body-lg-line-height | 24px |
| input | font-weight | `--type-body-md-weight` | --type-body-md-weight | 400 |
| input | color | `--text-default` | --text-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |
| input | border-color | `--border-input` | --border-input → --neutral-500 → --gray-500 | rgb(97, 102, 116) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `label="Número do seu CPF"`, `preset="cpf"`, `name="cpf"`, `placeholder="000.000.000-00"`, `autoComplete="username"`
- **Preenchido**: `label="Número do seu CPF"`, `preset="cpf"`, `name="cpf"`, `placeholder="000.000.000-00"`, `autoComplete="username"`, `defaultValue="123.456.789-09"`
- **Erro**: `label="Número do seu CPF"`, `preset="cpf"`, `name="cpf"`, `placeholder="000.000.000-00"`, `autoComplete="username"`, `defaultValue="123."`, `error="CPF inválido. Use o formato 000.000.000-00."`
