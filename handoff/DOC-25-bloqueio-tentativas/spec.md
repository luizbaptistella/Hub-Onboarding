# DOC-25 · Bloqueio por tentativas no documento

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
> **Aprovada em 2026-11-09.** Tela de bloqueio para o CRNM e o DPRNM. Regra decidida pelo time (3 tentativas, 5 minutos). Sem desenho no Figma para documento (a biometria tem o BIO-05).

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `DOC-25` |
| Raia | Documento de identidade · estrangeiro |
| Figma | sem desenho para documento (a biometria tem o BIO-05, sem Figma) |
| Status | Proposta do hub, com o DS aplicado |
| Marcação | 1 variantes em [telas/](telas/) ([tela.js](tela.js)) · gerador `build-tools/estrangeiro/doc25-bloqueio-tentativas.html` |

## Objetivo

Avisar que o limite de validações foi atingido, quanto tempo falta, e deixar a pessoa sair e voltar depois sem perder os dados.

## Componentes

3 componentes do DS, 3 instâncias, mais 1 peça fora do DS. Todos são renderizados pelo bundle real do DS (`palmeiras-hub/ds/bundle.js`). Lista para máquina, com props, opções e estados: [components.json](components.json). Documentação de cada componente no artefato do DS (Palmeiras · Onboarding), em `project/components/<Nome>/README.md`.

| Componente | Instâncias | JSX (exemplo) | Varia entre variantes | Observação |
|---|---|---|---|---|
| `AppHeader` | 1 | `<AppHeader back={false} title="Validação do documento de identidade" language={false} help={{ label: "Ajuda" }} />` | — | — |
| `ResultHero` | 1 | `<ResultHero tone="danger" icon="lock_clock" title="Excesso de tentativas" description="Você atingiu o limite de tentativas de validação do documento. Tente novamente em 5:00. Você pode sa…` | — | No app, use o padrão de focusOnMount e documentTitle. No hub ficam desligados para não roubar o foco do iframe. |
| `Button` | 1 | `<Button variant="primary" iconEnd="logout" onClick={() => {}}>Sair e continuar depois</Button>` | — | — |

Peças fora do DS (só no protótipo ou propostas para o DS):

| Peça | Observação |
|---|---|
| Barra de status do celular | Mock do sistema operacional (hora, sinal, Wi-Fi, bateria). Não implementar. |

## Variantes

Gerado do mapa do hub (`handoff/flow.json`).

| # | Variante | Figma | Arquivo |
|---|---|---|---|
| 1 | Padrão (sem Figma) | sem Figma | [telas/padrao](telas/padrao/screen.html) |

## Comportamento

- O bloqueio dura 5 minutos. Depois disso, a pessoa volta à etapa de documento (regra decidida pelo time).
- A contagem não aparece na tela nesta versão: o texto diz "5:00". Confirmar se a tela deve contar regressivamente.
- Os dados e os arquivos enviados ficam salvos durante o bloqueio.

## Entradas e saídas

Gerado do mapa do hub (`handoff/flow.json`).

**Entradas (de onde se chega)**

| De | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| DOC-11 | Falha na validação do documento | Terceira validação reprovada | Erro ou nova tentativa | Três tentativas esgotadas |
| DOC-22 | Os dados do documento não conferem | Terceira validação com dados divergentes | Erro ou nova tentativa | Três tentativas esgotadas |

**Saídas (para onde se vai)**

| Para | Tela | Gatilho | Tipo | Condição |
|---|---|---|---|---|
| ENT-01 | Login | Sair e continuar depois | Sair do fluxo | Dados e documentos enviados ficam salvos |

## Pendências

- **Contagem regressiva:** a tela mostra 5:00 fixo. Confirmar se deve contar até liberar.
- **Contagem por documento ou por módulo:** o bloqueio vale para o documento ou para a validação inteira? Decidido no spec antigo como pendência.
- **Fechar o app:** o bloqueio sobrevive a fechar o app? Não definido.
- **Tentativas:** a tentativa zera depois de uma aprovação? Não definido.
- Os textos precisam ir para o Figma, se aprovados.

## Critérios de aceite

- O título é o único `h1`.
- O texto informa o limite e o tempo de espera.
- "Sair e continuar depois" leva ao login e mantém os dados.
