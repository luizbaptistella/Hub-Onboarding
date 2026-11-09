# ProfileMenu

Ficha técnica do componente `ProfileMenu` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/ProfileMenu/README.md

Usado em 3 telas, 3 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `defaultOpen` | true · false | — |
| `divider` | true · false | true |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças implementação atual × DS |
|---|---|---|---|
| AREA-01 | 5 | `<ProfileMenu items={[{ id: "modo-escuro", label: "Modo escuro", icon: "dark_mode" }, { id: "privacidade", label: "Privacidade", icon: "lock" }, { id: "seguran-a", label: "Segurança", icon: "shield" }, { id: "senha", label: "Senha", icon: "password" }, { id: "sair", label: "Sair", icon: "logout", tone: "danger" }]} language divider />` | contêiner width: proto 40px · DS 140px; contêiner height: proto 40px · DS 44px |
| FAM-01 | 5 | `<ProfileMenu items={[{ id: "modo-escuro", label: "Modo escuro", icon: "dark_mode" }, { id: "privacidade", label: "Privacidade", icon: "lock" }, { id: "seguran-a", label: "Segurança", icon: "shield" }, { id: "senha", label: "Senha", icon: "password" }, { id: "sair", label: "Sair", icon: "logout", tone: "danger" }]} language divider />` | contêiner width: proto 40px · DS 140px; contêiner height: proto 40px · DS 44px |
| FAM-17 | 5 | `<ProfileMenu items={[{ id: "modo-escuro", label: "Modo escuro", icon: "dark_mode" }, { id: "privacidade", label: "Privacidade", icon: "lock" }, { id: "seguran-a", label: "Segurança", icon: "shield" }, { id: "senha", label: "Senha", icon: "password" }, { id: "sair", label: "Sair", icon: "logout", tone: "danger" }]} language divider />` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Implementação atual | DS |
|---|---|---|
| contêiner | 40×40 | 140×44 |
| ícone (menu) | 24×24 | — |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| ícone (menu) | font-family | `--font-icons` | --font-icons | "Material Symbols Outlined" |
| ícone (menu) | color | `--icon-default` | --icon-default → --neutral-900 → --gray-900 | rgb(20, 24, 35) |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `items=[{"id": "modo-escuro", "label": "Modo escuro", "icon": "dark_mode"}, {"id": "privacidade", "label": "Privacidade", "icon": "lock"}, {"id": "seguran-a", "label": "Segurança", "icon": "shield"}, {"id": "senha", "label": "Senha", "icon": "password"}, {"id": "sair", "label": "Sair", "icon": "logout", "tone": "danger"}]`, `language=true`, `divider=true`
