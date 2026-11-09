# FAM-G2 · Captura da frente do documento do familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec > protótipo.
>
> **Aprovada.** Passo 2 do fluxo FAM-G2 (preenchimento e capturas no celular do titular, em nome do familiar). É a versão familiar da lacuna DOC-G1 (captura do documento). Usa a estrutura de DOC-04 (câmera da frente), com o `CameraCapture` do DS. Premissas na seção 10.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-G2` (passo 2 do fluxo; variante familiar de DOC-G1) |
| Id no protótipo | — (não implementada) |
| Raia | Familiares · Cadastro do familiar no celular do titular |
| Figma | Estrutura de referência: DOC-04, [`2788:34617`](https://www.figma.com/design/apbNVzymCikALAJtrz0Zjp/?node-id=2788-34617). Telas próprias do FAM-G2: não desenhadas |
| Status | Aprovada |
| Marcação | [screen.html](screen.html) (Padrão, enquadrando), com [tela.js](tela.js) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Estados · 4. Ações · 5. Comportamento · 6. Entradas · 7. Saídas · 8. Dados · 9. Lacunas · 10. Premissas e critérios

## 1. Objetivo

Fotografar a frente do documento de identidade do familiar (RG ou CNH) com a câmera do celular do titular. O titular só enquadra: a foto é tirada sozinha quando o documento está na moldura.

## 2. Componentes

| # | Componente | JSX | Observação |
|---|---|---|---|
| 0 | Barra de status do celular | — | Mock do sistema, versão escura, como pede o `CameraCapture`. Não implementar. |
| 1 | `CameraCapture` | `<CameraCapture state="aligning" frame="card" instruction="Enquadre a frente do documento de Ana Paula na moldura" autoCapture onBack onCapture onOpenSettings>{visor}</CameraCapture>` | Faixa com Voltar e instrução, visor com máscara e moldura de cartão (ID-1), rodapé com "Tirar foto". **Sem `onUseUpload`**: sem "Enviar arquivo", como em DOC-04. |

## 3. Estados

| Variante | `state` | Faixa | Figma |
|---|---|---|---|
| Enquadrando | `aligning` | "Enquadre a frente do documento de Ana Paula na moldura", cantos brancos | — |
| Enquadrado | `aligned` | Faixa verde, "Enquadramento perfeito!", moldura contínua | — |
| Tirando a foto | `capturing` | "Tirando a foto…", disparo ocupado | — |
| Sem acesso à câmera | `denied` | "Sem acesso à câmera", como liberar e "Abrir configurações" | — |
| Câmera indisponível | `unavailable` | "Câmera indisponível", sem ação (só o Voltar) | — |

Os estados `aligning`, `aligned` e `capturing` vêm do `CameraCapture`. Os estados `denied` e `unavailable` são do próprio componente (ver seção 10).

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-G2 · Tutorial da captura do familiar](../FAM-G2-preparacao-do-cadastro/spec.md) (passo 3) | Volta ao tutorial. |
| Tirar foto | Confirmação da frente (próxima tela) | Dispara a captura. |
| Abrir configurações | — | Só no estado `denied`. |

## 5. Comportamento

- Abre em "enquadrando". Quando o detector encontra o documento na moldura, vai para "enquadrado" e tira a foto sozinha em cerca de 1 s. "Tirar foto" dispara na hora.
- Depois da foto, segue para a confirmação da frente (próxima tela, a desenhar).
- Sem "Enviar arquivo" na câmera, como em DOC-04. Na família, o upload não aparece nesta etapa.
- Voltar retorna ao tutorial do passo 3.
- **Demonstração no hub:** as variantes abrem paradas. Tocar no visor alterna enquadrando ↔ enquadrado; depois do primeiro toque, a captura automática passa a correr.
- LGPD: parar a câmera ao sair da tela, não salvar a foto na galeria, enviar só o recorte da moldura, não registrar imagem em logs (regra do `CameraCapture`).

## 6. Entradas

| De | Gatilho |
|---|---|
| Sem entrada no fluxo atual: a captura genérica fica para RG e CNH (a desenhar). A CIN usa FAM-G2 · CIN · captura da frente | — |

## 7. Saídas

| Para | Gatilho |
|---|---|
| FAM-G2 · Tutorial da captura do familiar | Voltar |
| Confirmação da frente (a desenhar) | Foto tirada |

## 8. Dados

- Imagem da frente do documento (recorte da moldura). Não guardada na galeria.
- Tipo de documento: RG ou CNH (cartão ID-1). A escolha do tipo ainda não existe nesta etapa (ver seção 9).

Visão geral: [dados.md](../dados.md).

## 9. Lacunas e perguntas

**Em aberto:**

- **Tipo de documento:** a moldura é de cartão ID-1 (RG e CNH). O titular precisa escolher o tipo antes da câmera? A seleção é DOC-01 do titular, ou uma lista própria para o familiar?
- **Upload:** segue a decisão de 2026-11-08 (sem "Enviar arquivo" na câmera). A lacuna DOC-G1 original previa foto ou upload. Confirmar se na família também não há upload.
- **Textos dos estados de erro:** os textos fixos do DS em `denied` e `unavailable` falam em enviar arquivo. Sem o upload, esses textos ficam sem ação. Mesma pendência de DOC-04.
- **Verso e conferência:** DOC-G1 também cobre o verso e a conferência. Ainda não desenhados.

## 10. Premissas e critérios

**Premissas a validar:**

- **Documento de identidade com foto:** RG ou CNH, em cartão ID-1 (moldura `card`).
- **Vídeo simulado:** as fotos de DOC-04 (um CRNM de exemplo), como placeholder. Não é o documento do familiar.
- **Captura automática:** igual a DOC-04, em cerca de 1 s quando enquadrado.
- **Instrução:** "Enquadre a frente do documento de Ana Paula na moldura". O nome aparece no texto, como nas outras telas da família.

**Critérios de aceite:**

- [ ] A instrução é a única região viva; trocar de estado não relê o Voltar.
- [ ] Em "enquadrado", forma, ícone e texto mostram o enquadramento, não só a cor.
- [ ] "Tirar foto" sempre disponível enquanto a câmera está aberta.
- [ ] Sem "Enviar arquivo" no rodapé.
- [ ] Voltar leva ao tutorial do passo 3 de FAM-G2.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
