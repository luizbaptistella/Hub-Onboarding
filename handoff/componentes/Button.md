# Button

Ficha técnica do componente `Button` do DS Palmeiras · Onboarding.

Doc do DS: https://claude.ai/artifact/SK7jtbwnYjaiwT9tKd3ynU · project/components/Button/README.md

Usado em 23 telas, 35 instâncias.

## Props

| Prop | Opções do DS | Usado no fluxo |
|---|---|---|
| `disabled` | true · false | true |
| `fullWidth` | true · false | false, true |
| `loading` | true · false | — |
| `size` | md · sm | — |
| `variant` | primary · secondary · tertiary · accent · danger | accent, danger, primary, secondary |

## Instâncias no fluxo

| Tela | Instância | JSX | Diferenças protótipo × DS |
|---|---|---|---|
| ENT-01 | 8 | `<Button variant="primary" fullWidth type="submit">Entrar</Button>` | nenhuma |
| ENT-01 | 9 | `<Button variant="accent" fullWidth>Criar cadastro</Button>` | nenhuma |
| CAD-01 | 11 | `<Button variant="primary" fullWidth type="submit">Iniciar validação</Button>` | nenhuma |
| CAD-03 | 5 | `<Button variant="primary" fullWidth type="submit">Confirmar e enviar código</Button>` | nenhuma |
| CAD-05 | 5 | `<Button variant="primary" fullWidth type="submit">Confirmar e enviar código</Button>` | nenhuma |
| CAD-06 | 4 | `<Button variant="primary" fullWidth>Continuar</Button>` | nenhuma |
| CAD-07 | 10 | `<Button variant="primary" fullWidth type="submit">Continuar</Button>` | nenhuma |
| BIO-01 | 3 | `<Button variant="primary" fullWidth disabled iconEnd="arrow_forward">Continuar</Button>` | btn-content tamanho: proto 101×24 · DS 103×24; ícone (arrow_forward) tamanho: proto 18×18 · DS 20×20 |
| BIO-04 | 4 | `<Button variant="primary" fullWidth iconEnd="arrow_forward">Salvar e continuar</Button>` | btn-content tamanho: proto 164×24 · DS 166×24; ícone (arrow_forward) tamanho: proto 18×18 · DS 20×20 |
| BIO-04 | 5 | `<Button variant="secondary" fullWidth iconEnd="photo_camera">Tirar outra foto</Button>` | btn-content tamanho: proto 141×24 · DS 143×24; ícone (photo_camera) tamanho: proto 18×18 · DS 20×20 |
| BIO-05 | 3 | `<Button variant="secondary" fullWidth>Sair e continuar depois</Button>` | nenhuma |
| BIO-06 | 4 | `<Button variant="primary" fullWidth iconEnd="support_agent">Falar com o suporte</Button>` | btn-content tamanho: proto 178×24 · DS 180×24; ícone (support_agent) tamanho: proto 18×18 · DS 20×20 |
| BIO-06 | 5 | `<Button variant="secondary" fullWidth>Sair e continuar depois</Button>` | nenhuma |
| AREA-01 | 103 | `<Button variant="primary" fullWidth iconEnd="arrow_forward">Concluir validação</Button>` | nenhuma |
| AREA-01 | 107 | `<Button variant="primary" fullWidth iconEnd="arrow_forward">Tentar novamente</Button>` | nenhuma |
| AJD-01 | 6 | `<Button variant="primary" fullWidth type="submit">Abrir chamado</Button>` | nenhuma |
| AJD-02 | 4 | `<Button variant="secondary" fullWidth={false} iconStart="content_copy">Copiar número</Button>` | contêiner width: proto 187px · DS 183px; btn-content tamanho: proto 145×24 · DS 141×24; ícone (content_copy) tamanho: proto 24×24 · DS 20×20 |
| AJD-02 | 5 | `<Button variant="primary" fullWidth>Voltar para a área logada</Button>` | nenhuma |
| AREA-04 | 9 | `<Button variant="danger" fullWidth type="submit">Encerrar conta</Button>` | nenhuma |
| AREA-04 | 10 | `<Button variant="secondary" fullWidth>Cancelar</Button>` | nenhuma |
| FAM-01 | 8 | `<Button variant="secondary" fullWidth={false} iconEnd="add">Incluir novo familiar</Button>` | contêiner width: proto 327px · DS 220px; contêiner height: proto 48px · DS 50px; btn-content tamanho: proto 176×24 · DS 178×24; ícone (add) tamanho: proto 18×18 · DS 20×20 |
| FAM-03 | 5 | `<Button variant="primary" fullWidth iconEnd="add">Adicionar familiar</Button>` | contêiner height: proto 48px · DS 77px |
| FAM-09 | 4 | `<Button variant="primary" fullWidth type="submit">Buscar</Button>` | nenhuma |
| FAM-10 | 4 | `<Button variant="primary" fullWidth type="submit">Prosseguir</Button>` | nenhuma |
| FAM-11 | 3 | `<Button variant="primary" fullWidth type="submit" iconEnd="send">Enviar link</Button>` | nenhuma |
| FAM-11 | 4 | `<Button variant="secondary" fullWidth iconEnd="link">Copiar link</Button>` | nenhuma |
| FAM-12 | 8 | `<Button variant="primary" fullWidth type="submit" iconEnd="arrow_forward">Continuar</Button>` | nenhuma |
| FAM-13 | 4 | `<Button variant="primary" fullWidth iconEnd="arrow_forward">Aceitar e continuar</Button>` | nenhuma |
| FAM-16 | 4 | `<Button variant="primary" fullWidth type="submit">Continuar</Button>` | nenhuma |
| FAM-16 | 5 | `<Button variant="secondary" fullWidth>Já tenho conta</Button>` | nenhuma |
| FAM-17 | 9 | `<Button variant="secondary" fullWidth={false}>Copiar link</Button>` | nenhuma |
| FAM-17 | 11 | `<Button variant="secondary" fullWidth={false}>Reenviar convite</Button>` | nenhuma |
| FAM-17 | 28 | `<Button variant="secondary" fullWidth={false} iconEnd="add">Incluir novo familiar</Button>` | nenhuma |
| FAM-17 | 30 | `<Button variant="primary" fullWidth={false}>Aceitar</Button>` | nenhuma |
| FAM-17 | 31 | `<Button variant="secondary" fullWidth={false}>Recusar</Button>` | nenhuma |

## Anatomia (medidas do DS, primeira instância)

| Parte | Protótipo | DS |
|---|---|---|
| contêiner | 327×50 | 327×50 |
| btn-content | 46×24 | 46×24 |

## Tokens (primeira instância)

| Parte | Propriedade | Token | Cadeia | Valor |
|---|---|---|---|---|
| contêiner | font-family | `--font-body` | --font-body | Inter, system-ui, -apple-system, "Segoe UI", sans-serif |
| contêiner | font-size | `--type-label-lg-size` | --type-label-lg-size | 16px |
| contêiner | line-height | `--type-label-lg-line-height` | --type-label-lg-line-height | 24px |
| contêiner | font-weight | `--type-label-lg-weight` | --type-label-lg-weight | 500 |
| contêiner | min-height | `--size-button` | --size-button | 48px |
| contêiner | padding | `--space-150` | --space-150 | 12px 20px |
| contêiner | border-radius | `--radius-lg` | --radius-lg | 8px |
| contêiner | background | `--bg-brand-bold` | --bg-brand-bold → --brand-800 → --green-800 | rgb(0, 82, 46) none repeat scroll 0% 0% / auto padding-box border-box |
| contêiner | color | `--text-on-brand` | --text-on-brand → --brand-on → --gray-0 | rgb(255, 255, 255) |
| contêiner | gap | `--space-inline-related` | --space-inline-related | 8px |

## Estados renderizados

Cada estado é o componente real do DS com as props indicadas. Veja no hub, aba Componentes, ou em [ds-render.html]../ds-render.html.

- **Nesta tela**: `variant="primary"`, `fullWidth=true`
