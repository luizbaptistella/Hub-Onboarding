# FAM-G2 · CIN · captura da verso do familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
>
> **Aprovada.** Versão da CIN da captura da verso da FAM-G2, com o mesmo padrão: câmera `CameraCapture` com moldura de cartão, sem upload. Comportamento igual ao da captura genérica, validada na FAM-G2.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-G2` · CIN · captura da verso |
| Id no protótipo | — (não implementada) |
| Raia | Familiares · Cadastro do familiar no celular do titular |
| Figma | Estrutura de referência: DOC-04, [`2788:34617`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34617) |
| Status | Aprovada |
| Marcação | [screen.html](screen.html) (Padrão, enquadrando), com [tela.js](tela.js) |
| Entradas / saídas | 1 / 2 |

## 1. Objetivo

Fotografar a verso da CIN do familiar com a câmera do celular do titular. O titular só enquadra: a foto é tirada sozinha quando a CIN está na moldura.

## 2. Componentes

| # | Componente | JSX | Observação |
|---|---|---|---|
| 0 | Barra de status do celular | — | Mock do sistema, versão escura. Não implementar. |
| 1 | `CameraCapture` | `<CameraCapture state="aligning" frame="card" instruction="Enquadre a o verso da CIN de Ana Paula na moldura" autoCapture onBack onCapture onOpenSettings>{visor}</CameraCapture>` | Igual à captura genérica da FAM-G2. **Sem `onUseUpload`**, como na família. |

## 3. Estados

Os mesmos da captura genérica: `aligning`, `aligned`, `capturing`, `denied` e `unavailable`. Ver [FAM-G2 · Captura da frente](../FAM-G2-captura-do-documento/spec.md), seção 3.

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-G2 · Confirmação da frente](../FAM-G2-confirmacao-da-frente/spec.md) | Volta à conferência da frente. |
| Tirar foto | Confirmação do verso da CIN (a desenhar) | Dispara a captura. |
| Abrir configurações | — | Só no estado `denied`. |

## 5. Comportamento

- Abre em "enquadrando". Quando o detector encontra a CIN na moldura, vai para "enquadrado" e tira a foto sozinha em cerca de 1 s. "Tirar foto" dispara na hora.
- Sem "Enviar arquivo" na câmera.
- LGPD: parar a câmera ao sair da tela, não salvar a foto na galeria, enviar só o recorte da moldura, não registrar imagem em logs.

## 6. Entradas e saídas

| De | Gatilho |
|---|---|
| [FAM-G2 · Confirmação da frente](../FAM-G2-confirmacao-da-frente/spec.md) | Salvar e continuar |

## 7. Premissas e lacunas

- **Mesmo padrão da captura genérica:** só muda a instrução para a CIN.
- **Vídeo simulado:** as fotos de DOC-04 (um CRNM de exemplo), como placeholder.
- **Upload:** não há, como na família.

## 8. Critérios de aceite

- [ ] A instrução fala da verso da CIN.
- [ ] "Tirar foto" sempre disponível enquanto a câmera está aberta.
- [ ] Sem "Enviar arquivo" no rodapé.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
