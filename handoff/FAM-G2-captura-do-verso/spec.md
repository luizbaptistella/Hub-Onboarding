# FAM-G2 · Captura do verso do documento do familiar

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
>
> **Proposta, ainda não validada.** Passo 4 do fluxo FAM-G2. É a parte do verso da lacuna DOC-G1. Usa a mesma câmera da frente ([FAM-G2 · Captura da frente](../FAM-G2-captura-do-documento/spec.md)), com a instrução do verso.

## Índice da tela

| Campo | Valor |
|---|---|
| Código | `FAM-G2` (passo 4 do fluxo; verso do documento) |
| Raia | Familiares · Cadastro do familiar no celular do titular |
| Figma | — (mesma câmera de DOC-04, sem tela própria do verso) |
| Status | Proposta, a validar |
| Marcação | [screen.html](screen.html) (Padrão, enquadrando), com [tela.js](tela.js) |
| Entradas / saídas | 1 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Estados · 4. Ações · 5. Comportamento · 6. Entradas · 7. Saídas · 8. Dados · 9. Lacunas · 10. Premissas e critérios

## 1. Objetivo

Fotografar o verso do documento de identidade do familiar (RG ou CNH), com a câmera do celular do titular. O titular só enquadra: a foto é tirada sozinha quando o documento está na moldura.

## 2. Componentes

| # | Componente | JSX | Observação |
|---|---|---|---|
| 0 | Barra de status do celular | — | Mock do sistema, versão escura. Não implementar. |
| 1 | `CameraCapture` | `<CameraCapture state="aligning" frame="card" instruction="Enquadre o verso do documento de Ana Paula na moldura" autoCapture onBack onCapture onOpenSettings>{visor}</CameraCapture>` | Igual à frente, com a instrução do verso. **Sem `onUseUpload`**, como na frente. |

## 3. Estados

Os mesmos da captura da frente: `aligning` (enquadrando), `aligned` (enquadrado), `capturing` (tirando a foto), `denied` (sem acesso) e `unavailable` (câmera indisponível). Ver [FAM-G2 · Captura da frente](../FAM-G2-captura-do-documento/spec.md), seção 3.

## 4. Ações na tela

| Ação | Vai para | Observação |
|---|---|---|
| Voltar | [FAM-G2 · Confirmação da frente](../FAM-G2-confirmacao-da-frente/spec.md) | Volta à conferência da frente. |
| Tirar foto | [FAM-G2 · Confirmação do verso](../FAM-G2-confirmacao-do-verso/spec.md) | Dispara a captura. |
| Abrir configurações | — | Só no estado `denied`. |

## 5. Comportamento

- Abre em "enquadrando". Quando o detector encontra o documento na moldura, vai para "enquadrado" e tira a foto sozinha em cerca de 1 s. "Tirar foto" dispara na hora.
- Depois da foto, segue para a confirmação do verso ([FAM-G2 · Confirmação do verso](../FAM-G2-confirmacao-do-verso/spec.md)).
- Sem "Enviar arquivo" na câmera, como na frente.
- LGPD: parar a câmera ao sair da tela, não salvar a foto na galeria, enviar só o recorte da moldura, não registrar imagem em logs.

## 6. Entradas

| De | Gatilho |
|---|---|
| [FAM-G2 · Confirmação da frente](../FAM-G2-confirmacao-da-frente/spec.md) | Salvar e continuar |

## 7. Saídas

| Para | Gatilho |
|---|---|
| [FAM-G2 · Confirmação da frente](../FAM-G2-confirmacao-da-frente/spec.md) | Voltar |
| [FAM-G2 · Confirmação do verso](../FAM-G2-confirmacao-do-verso/spec.md) | Foto tirada |

## 8. Dados

- Imagem do verso do documento (recorte da moldura). Não guardada na galeria.

Visão geral: [dados.md](../dados.md).

## 9. Lacunas e perguntas

- **Confirmação do verso:** a conferência é igual à da frente (BIO-04 adaptada), ou traz os dados lidos? Mesma lacuna da frente.
- **Vídeo simulado:** as fotos de DOC-04 (um CRNM de exemplo), como placeholder.
- **Tipo de documento:** mesma pendência da frente (RG ou CNH).

## 10. Premissas e critérios

**Premissas a validar:**

- **Mesma câmera da frente:** só muda a instrução. Se o verso de RG e CNH pedir moldura diferente, a tela muda.
- **Documento de identidade com foto:** RG ou CNH, em cartão ID-1.

**Critérios de aceite:**

- [ ] A instrução fala do verso.
- [ ] "Tirar foto" sempre disponível enquanto a câmera está aberta.
- [ ] Sem "Enviar arquivo" no rodapé.
- [ ] Voltar leva à confirmação da frente.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
