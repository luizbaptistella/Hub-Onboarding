# Documento de estrangeiro · regras do módulo (DOC-02 a DOC-13)
> **Reorganizado em 2026-11-08.** Este era o spec do antigo DOC-02 (um nó só com 64 telas). As telas agora estão em um nó por fluxo: DOC-02 seleção, DOC-03/04 CRNM, DOC-05/06 DPRNM, DOC-07/08 RNE, DOC-09 Cédula, DOC-10 Passaporte, DOC-11 status, DOC-12 resultado, DOC-13 erros. Os links para `telas/` abaixo apontam para a estrutura antiga; use o spec de cada nó para a marcação.

> Handoff Palmeiras · Onboarding. Fonte de verdade de componentes e tokens: artefato **Palmeiras · Onboarding** (Design System). Em caso de conflito: DS > este spec.
> **Rascunho.** Decisões tomadas com o time estão marcadas como **Decidido**. O que falta está na seção 10. Telas: 64 `screen.html` em [telas/](telas/), montadas com os componentes reais do DS (`ds/bundle.js`). Galeria para revisão: [Telas do DOC-02](https://claude.ai/artifact/Jf5trHM9UMbTJ6bM6TsLHS). Textos das telas de erro em 3 idiomas: [telas-erro.json](../DOC-13-erros-de-captura-e-envio/telas-erro.json).

## Índice do módulo

| Campo | Valor |
|---|---|
| Código | `DOC-02` (nova numeração; `DOC-G1` continua como lacuna da captura de CIN, CNH e RG) |
| Raia | Documento e biometria · Etapa 2 de 4 · documento |
| Figma | `2283:33539` (seção "Onboarding / Documento de identidade"). Frames por fluxo: CRNM `2788:34526` a `2788:37492`, DPRNM `2794:35275` a `2794:35902`, Cédula `2799:36027` a `2799:36727`, conferência `2802:36833`. Passaporte: seleção `3080:59740`; intros e câmera no print do time, sem node próprio |
| Status | Desenhada no Figma para CRNM, DPRNM, RNE e Cédula. Passaporte com seleção no Figma e intros no print. Telas de erro desenhadas com os componentes do DS, sem desenho final no Figma. |
| Marcação | 64 telas em [telas/](telas/), uma pasta por tela (`telas/<tela>/screen.html`). Componentes por tela: [components.json](components.json) |
| Entradas / saídas | 2 / 2 |

**Seções:** 1. Objetivo · 2. Componentes · 3. Campos e validações · 4. Ações · 5. Estados · 6. Comportamento · 7. Entradas · 8. Saídas · 9. Dados · 10. Lacunas · 11. Critérios de aceite

## 1. Objetivo

Capturar a frente e o verso de um documento de identidade de estrangeiro, enviar para validação e seguir para a validação facial, sem bloquear o usuário enquanto a validação roda.

Documentos cobertos: **CRNM**, **DPRNM**, **RNE**, **Passaporte** e **Cédula de identidade (Mercosul)**. O usuário escolhe o documento na seleção (§7).

## 2. Componentes

Componentes previstos (de `componentes.md`, para DOC-G1): `UploadArea`, `CameraCapture`, `ScanFrame`. Demais peças vêm do DS:

| Componente | Uso no módulo |
|---|---|
| `AppHeader` | Cabeçalho com "Voltar" e ajuda, título "Validação de Identidade" |
| `PageHeading` | Título e subtítulo de cada tela |
| `CameraCapture` + `ScanFrame` | Câmera com moldura de enquadramento (cantos verdes), para frente, verso e código MRZ. Captura automática. |
| `UploadArea` | Área tracejada para o PDF, com botão "Fazer upload do documento" |
| `CarouselDots` | Indicador das telas de intro |
| `StepNumber` | Número do passo na intro ("1", "2", …) |
| `Button` | "Continuar", "Tirar outra foto", "Tirar novas fotos", "Revisar dados informados" |
| `Select` | Seleção de país e tipo de documento (Cédula) |
| `TextField` | Número do documento (Cédula) |
| `FormMessage` | Dica "Digite o número exatamente como aparece no documento." e erros de campo |
| `StatusScreen` | Telas de divergência, de status e de erro |
| `RedirectCountdown` | Texto genérico de redirecionamento para a validação facial |

Componentes sem equivalente no DS: tela de divergência (ícone de documento com alerta, fundo vermelho), tela de bloqueio com contador e telas de erro (§6.9). Ver §10.

## 3. Campos e validações

### 3.1 Formulário da Cédula (só para Cédula)

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| País | `Select` | Sim | Lista de países aceitos (ver §10.2) |
| Documento de identidade | `Select` | Sim | Tipo de documento emitido pelo país escolhido (ex.: Cédula de Ciudadanía) |
| Número do documento | `TextField` | Sim | Digitado exatamente como aparece no documento. Validação de formato por país ainda a definir (EXC-CED-01). |

Ação: **Continuar** habilitado com os três campos preenchidos.

### 3.2 Upload (CRNM, DPRNM, RNE)

- **Decidido:** apenas documentos oficiais em **PDF**.
- **Decidido:** tamanho máximo de **5 MB**.
- Erros de formato, tamanho, senha e arquivo corrompido: §6.9 (EXC-UPL).

### 3.3 Captura por câmera

- **Decidido:** a captura é **automática**. O usuário só enquadra a câmera sobre o documento. Não há botão de disparo.
- Quando o documento está dentro da moldura, nítido e legível, a foto é tirada sozinha.
- Enquanto não está pronto, a câmera mostra um aviso (EXC-CAM-03, 04 e 05) e não captura.
- Frente e verso (CRNM, DPRNM, RNE e Cédula).
- Passaporte: página de dados e código MRZ (§6.2).
- Depois da captura automática, a tela de confirmação mostra a foto com **Continuar** e **Tirar outra foto**.
- A câmera é a do celular do usuário.

### 3.4 Validade

- **Decidido:** a validade é a **data de validade impressa no documento**, quando ela existe.
- **Decidido:** documento **sem data de validade é aceito**. A validação usa outros fatores (§6.10).
- Documento com data impressa já vencida: divergência, com o item "Documento fora da validade" (§6.5 e EXC-CON-02).

## 4. Ações na tela

| Ação | Resultado |
|---|---|
| Voltar | Volta à seleção de documento de estrangeiro (§7) |
| Ajuda | Abre a ajuda da captura |
| Tirar foto do documento | Abre a intro da câmera do documento escolhido |
| Fazer upload do documento | Abre a intro de upload (CRNM, DPRNM e RNE). Cédula e Passaporte não têm essa ação. |
| Continuar (intro) | Avança para o próximo passo da intro ou para a câmera |
| Tirar outra foto | Volta à câmera do mesmo lado |
| Continuar (confirmação) | Avança para o verso, para o MRZ ou para a conferência |
| Revisar dados informados | Volta ao formulário da Cédula, com os dados preenchidos |
| Tirar novas fotos | Reinicia a captura da frente |

## 5. Estados

- **Seleção:** um documento aberto por vez. Ações: **Tirar foto** e **Fazer upload** (CRNM, DPRNM e RNE). Cédula e Passaporte só têm **Tirar foto**.
- **Intro:**
  - CRNM, DPRNM e RNE: 3 passos para foto ou upload.
  - Cédula: 5 passos.
  - Passaporte: 5 passos (§6.2).
  - Indicador de passo com `CarouselDots`.
- **Câmera:** moldura com cantos verdes, instrução no topo. Captura automática quando o documento está enquadrado. Avisos de enquadramento aparecem na câmera (EXC-CAM-03, 04, 05, PAS-02).
- **Upload:** área vazia com instrução, pronta para receber o PDF.
- **Confirmação:** imagem capturada, com **Continuar** e **Tirar outra foto**.
- **Divergência:** tela de erro com a lista do que não confere (§6.5).
- **Bloqueado:** tela com contador de 5 minutos (§6.11).
- **Análise em andamento:** status, sem bloquear o usuário (§6.4).
- **Status:** tela de transição com texto de redirecionamento (§6.6).
- **Erros e exceções:** §6.9.

## 6. Comportamento

### 6.0 Idioma

- **Decidido:** o módulo tem **3 idiomas**: português, inglês e espanhol.
- **Decidido:** o usuário escolhe o idioma na **tela de login** ([ENT-01](../ENT-01-login/spec.md)). A escolha vale para o fluxo inteiro e para todos os módulos.
- **Decidido:** o idioma também pode ser trocado nas **configurações da área logada**. A troca vale a partir da próxima tela.
- **Decidido:** todos os textos do módulo estão nos 3 idiomas: títulos, textos, botões, erros, avisos da câmera e notificações (e-mail e SMS).
- Nomes oficiais dos documentos (CRNM, DPRNM, RNE, Passaporte, Cédula de identidade) são mantidos. A descrição abaixo de cada um é traduzida.

### 6.1 Seleção e captura

1. O usuário escolhe, na seleção, o documento que quer validar. Só um fica aberto por vez.
2. **Tirar foto** ou **Fazer upload** abre a intro correspondente.
3. Pela câmera: o usuário enquadra o documento, a foto é tirada automaticamente, o usuário confirma (ou tira outra foto). Depois o verso, com a mesma sequência.
4. Pelo upload (CRNM, DPRNM, RNE): o usuário envia o PDF da frente, confirma, depois envia o PDF do verso.
5. Cédula: o usuário preenche o formulário (§3.1) antes da câmera. Depois, captura frente e verso só por câmera.
6. Passaporte: ver §6.2.

### 6.2 Passaporte

Fontes: seleção no Figma `3080:59740` e print das intros e da câmera enviado pelo time. A captura do MRZ tem a tela de intro (passo 5), mas as telas de câmera e de confirmação do MRZ ainda não foram desenhadas (§10.6).

Sequência:

1. **Seleção:** "Passaporte · Documento internacional", com a ação **Tirar foto do documento**. Não há upload no node.
2. **Intro 1, 2 e 3:** títulos e textos abaixo.
3. **Câmera da página:** instrução no topo, moldura com cantos. Captura automática quando a página está enquadrada. Se a página está errada, EXC-PAS-01.
4. **Confirmação:** título, texto e ações **Continuar** e **Tirar outra foto**.
5. **Intro 4:** título e texto abaixo.
6. **Intro 5:** título e texto abaixo. A moldura mostra a faixa MRZ da página.
7. **Captura do MRZ:** câmera com captura automática. Se a faixa não aparece, EXC-PAS-02. Tela de confirmação a desenhar (§10.6).

Textos do passaporte, nos 3 idiomas. O espanhol é o texto do print. Os textos em português e inglês são **propostas, a revisar**. Os textos completos ficam em [telas-erro.json](../DOC-13-erros-de-captura-e-envio/telas-erro.json) e nas telas de intro.

| Passo | Elemento | Português (proposta) | Inglês (proposta) | Espanhol (print) |
|---|---|---|---|---|
| Intro 1 | Título | Abra o passaporte na página com sua foto | Open your passport to the page with your photo | Abre el pasaporte en la página con tu foto |
| Intro 1 | Texto | Mantenha o documento aberto na página com seus dados pessoais e sua foto. | Keep the document open on the page with your personal details and photo. | Mantén el documento abierto en la página que contiene tus datos personales y tu foto. |
| Intro 2 | Título | Coloque o documento sobre uma superfície plana | Place the document on a flat surface | Coloca el documento en una superficie plana |
| Intro 2 | Texto | A superfície deve ser plana, limpa e clara, em um lugar bem iluminado. | The surface should be flat, clean and light-colored, in a well-lit place. | La superficie debe ser plana, clara y limpia, en un lugar bien iluminado. |
| Intro 3 | Título | Enquadre o documento dentro da moldura | Frame the document inside the outline | Encuadra el documento dentro del marco |
| Intro 3 | Texto | Posicione o documento dentro da moldura e confirme que a imagem está nítida e todos os dados estão legíveis. | Position the document inside the frame and make sure the image is sharp and all data is readable. | Coloca el documento dentro del marco y asegúrate de que la imagen sea nítida y todos los datos sean legibles. |
| Câmera | Instrução | Enquadre o documento no centro da moldura | Frame the document in the center of the outline | Encuadra el documento en el centro del marco |
| Enquadrado | Aviso | Enquadramento perfeito! | Perfect framing! | ¡Encuadre perfecto! |
| Confirmação | Título | Confira se o documento que você enviou está legível | Check that the document you sent is readable | Comprueba que el documento que enviaste sea legible |
| Confirmação | Texto | É importante que a foto do seu documento esteja legível para validá-lo o quanto antes. | It's important that your document photo is readable so we can validate it as soon as possible. | Es importante que la foto de tu documento sea legible para validarlo lo antes posible. |
| Confirmação | Ações | Continuar · Tirar outra foto | Continue · Retake photo | Continuar · Tomar otra foto |
| Intro 4 | Título | Mantenha seu passaporte aberto | Keep your passport open | Mantén tu pasaporte abierto |
| Intro 4 | Texto | Mantenha o passaporte na mesma posição da captura anterior. | Keep the passport in the same position as the previous capture. | Mantén el pasaporte en la misma posición que en la captura del paso anterior. |
| Intro 5 | Título | Enquadre o código dentro da moldura | Frame the code inside the outline | Encuadra el código dentro del marco |
| Intro 5 | Texto | Aponte a câmera do seu celular para o documento, dentro da moldura, e confirme que a imagem está nítida e legível. | Point your phone's camera at the document, inside the frame, and make sure the image is sharp and readable. | Ajusta la cámara del móvil al documento dentro del marco y asegúrate de que la imagen sea nítida y legible. |

Observações:

- No print do espanhol, o passo 9 dizia "cámara de la mini". Foi corrigido para "cámara del móvil", porque se trata da câmera do celular do usuário.
- O passaporte não tem upload no node `3080:59740`.

### 6.3 Textos das telas de intro (CRNM, DPRNM, RNE e Cédula)

- Passo 1: "Vamos capturar a frente do {documento}". Texto: "É importante que o documento esteja atualizado e com todas as informações legíveis." Traduções a fazer para inglês e espanhol.
- Passos seguintes: a definir (§10.8).

### 6.4 Envio e análise

- A validação é enviada quando a captura da frente e do verso (ou da página e do MRZ, no passaporte) está confirmada.
- **Decidido:** a validação roda **em segundo plano**. O usuário segue o fluxo sem esperar o resultado.
- **Decidido:** a análise é feita por **IA**, com um **score** de validação (§6.10). Quando a IA não consegue decidir (por exemplo, score na zona intermediária ou falha técnica), o caso vai para **revisão humana**. Essa revisão é interna: o usuário não vê tela de análise manual.
- **Decidido:** o resultado é avisado ao usuário por **e-mail e SMS** (§6.7).
- Leitura do documento, a detalhar com o time:
  - Procura MRZ (ICAO TD1, 3 linhas de 30 caracteres) nas imagens, quando o documento tiver.
  - Com MRZ: lê os campos e valida os dígitos verificadores.
  - Sem MRZ: lê a zona visual por OCR.
  - Lê nome, data de nascimento, país emissor, tipo e número do documento, e a data de validade impressa, quando existir.
- Se a leitura não é possível (IA e revisão humana sem resultado técnico): tela de falha (EXC-CON-04).

### 6.5 Divergência

Quando os dados lidos não conferem com os informados ou com o cadastro, aparece a tela "Os dados do documento não conferem" (EXC-CON-01), com a lista do que está diferente:

- Número do documento diferente do informado
- País emissor diferente do informado
- Tipo de documento diferente do informado
- Nome diferente do cadastro
- Data de nascimento diferente do cadastro
- Documento fora da validade (só quando a data impressa já passou)

Ações: **Revisar dados informados** (volta ao formulário, §3.1) e **Tirar novas fotos** (reinicia a captura).

Cada tentativa que termina em divergência conta para o limite de tentativas (§6.11).

### 6.6 Transição para a validação facial

- Tela "Recebemos seus dados" com texto genérico: **"Estamos te redirecionando para a próxima etapa"**, nos 3 idiomas.
- **Decidido:** o texto não cita o nome da próxima tela, porque a ordem dos módulos é modular e pode variar.
- **Decidido:** a próxima etapa é a **validação facial**. O primeiro passo dela é [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md).

### 6.7 Resultado

- **Decidido:** o usuário recebe o resultado por **e-mail e SMS**, no idioma escolhido.
- Estados do resultado: **aprovado**, **reprovado** e **em análise** (revisão humana em andamento).
- Texto dos e-mails e SMS e eventos que disparam o aviso a definir (§10.11).
- Na área logada, o estado aparece em [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) (pendente ou reprovado).

### 6.8 Erros de conexão e tempo

- Erro de conexão e tempo de resposta acima de 20 s: guias de erro do DS (`.Guide/Connection-error`, `.Guide/Unexpected-error`). Ver §6.9 (EXC-SYS).

### 6.9 Telas de erro e cenários de exceção

Os cenários abaixo estão desenhados com os componentes do DS em [telas/](telas/) (pastas `erro-*` e `conferencia-*`). Os textos estão nos 3 idiomas em [telas-erro.json](../DOC-13-erros-de-captura-e-envio/telas-erro.json), com a mesma numeração. O desenho final no Figma ainda não existe.

**Câmera**

| Código | Cenário | Quando acontece | Tela ou feedback | Ações |
|---|---|---|---|---|
| EXC-CAM-01 | Permissão de câmera negada | Ao abrir a câmera sem permissão | Tela explicando o motivo da permissão | Abrir configurações do celular · Voltar |
| EXC-CAM-02 | Câmera indisponível | Erro do dispositivo ao abrir | Tela de aviso | Tentar novamente · Voltar |
| EXC-CAM-03 | Imagem borrada ou sem nitidez | Verificação antes da captura automática | Aviso na câmera; sem captura até a imagem ficar nítida | Sem botão |
| EXC-CAM-04 | Documento cortado ou fora da moldura | Documento não cabe na moldura | Aviso na câmera; sem captura até enquadrar | Sem botão |
| EXC-CAM-05 | Pouca luz ou reflexo | Imagem escura ou com brilho forte | Aviso na câmera; sem captura até corrigir | Sem botão |
| EXC-CAM-06 | Documento diferente do escolhido | Ex.: RNE enviado como CRNM | Tela de aviso | Tirar outra foto · Escolher outro documento |

**Passaporte**

| Código | Cenário | Quando acontece | Tela ou feedback | Ações |
|---|---|---|---|---|
| EXC-PAS-01 | Página errada (sem foto ou dados) | Captura da página de dados | Tela de aviso | Tirar outra foto |
| EXC-PAS-02 | MRZ não encontrado | Captura do código | Aviso na câmera; sem captura até a faixa aparecer | Sem botão |
| EXC-PAS-03 | Página e MRZ de passaportes diferentes | Conferência | Divergência (§6.5) | Revisar dados informados · Tirar novas fotos |

**Upload (CRNM, DPRNM, RNE)**

| Código | Cenário | Quando acontece | Tela ou feedback | Ações |
|---|---|---|---|---|
| EXC-UPL-01 | Formato diferente de PDF | Arquivo escolhido não é PDF | Erro abaixo da área de upload | Escolher outro arquivo |
| EXC-UPL-02 | Arquivo acima de 5 MB | Tamanho maior que o limite | Erro abaixo da área de upload | Escolher outro arquivo |
| EXC-UPL-03 | PDF protegido por senha | Não é possível ler o arquivo | Erro abaixo da área de upload | Escolher outro arquivo |
| EXC-UPL-04 | PDF vazio ou corrompido | Arquivo sem conteúdo legível | Erro abaixo da área de upload | Escolher outro arquivo |
| EXC-UPL-05 | Falha no envio | Erro de rede durante o envio | Aviso | Tentar novamente |

**Cédula (formulário)**

| Código | Cenário | Quando acontece | Tela ou feedback | Ações |
|---|---|---|---|---|
| EXC-CED-01 | Número com formato inválido para o país | Campo número preenchido | Mensagem no campo | Corrigir número |
| EXC-CED-02 | País sem suporte | País fora da lista aceita (§10.2) | Mensagem no campo País | Escolher outro país |

**Conferência e análise**

| Código | Cenário | Quando acontece | Tela ou feedback | Ações |
|---|---|---|---|---|
| EXC-CON-01 | Dados não conferem | Score abaixo do limite, ou divergência de dados (§6.5) | Divergência (§6.5) | Revisar dados informados · Tirar novas fotos |
| EXC-CON-02 | Documento com validade impressa vencida | Data impressa anterior a hoje | Tela própria, com o motivo | Escolher outro documento |
| EXC-CON-03 | IA sem decisão | Score na zona intermediária ou falha técnica da IA | Sem erro. Vai para revisão humana. Status "Em análise" | Nenhuma. Usuário recebe e-mail e SMS |
| EXC-CON-04 | Leitura não possível | IA e revisão humana sem resultado técnico | Tela "Falha na validação" | Tirar novas fotos · Voltar |
| EXC-CON-05 | Bloqueio por tentativas | Limite de tentativas atingido (§6.11) | Tela de bloqueio com contador de 5 min | Nenhuma até o fim do contador |
| EXC-CON-06 | Documento reprovado | Resultado final reprovado | Sem tela neste módulo. AREA-01 em "reprovado" e aviso por e-mail e SMS | Ver AREA-01 |

**Sistema**

| Código | Cenário | Quando acontece | Tela ou feedback | Ações |
|---|---|---|---|---|
| EXC-SYS-01 | Sem conexão | Falha de rede | Guia `.Guide/Connection-error` | Tentar novamente. Fotos e dados preservados |
| EXC-SYS-02 | Tempo acima de 20 s | Resposta demorada no envio | Guia `.Guide/Unexpected-error` | Tentar novamente |
| EXC-SYS-03 | Sessão expirada | Sessão encerrada durante o fluxo | Tela própria | Entrar |
| EXC-SYS-04 | Erro inesperado | Falha não prevista | Guia `.Guide/Unexpected-error` | Tentar novamente · Voltar |

**Textos:** todos têm versão em português, inglês e espanhol. As versões em português e inglês são propostas a revisar (§10.9).

### 6.10 Score de validação

**Decidido:** a validação do documento é um **score** que soma vários fatores. Não há um único critério que aprova ou reprova.

Fatores (cada um retorna **confere**, **não confere** ou **não disponível**):

| Fator | Compara com | Observação |
|---|---|---|
| Nome | Cadastro (CAD-01) | Comparação normalizada (acentos e caixa) |
| Data de nascimento | Cadastro (CAD-01) | — |
| País de origem | Formulário (Cédula) ou cadastro (demais) | País emissor do documento |
| Número do documento | Formulário (Cédula) ou MRZ (passaporte) | Campo opcional da MRZ conta (§6.4) |
| MRZ e dígitos verificadores | Próprio documento | Só existe em documentos com MRZ. Ausência não penaliza, e o peso vai para os outros fatores (§10.7) |
| Grafismos e elementos de segurança | Análise visual da IA | Presença de padrões e marcas do documento |
| Foto do rosto no documento | Captura facial (BIO-02) | **Depende da validação facial.** O score final só fecha depois dela (§10.13) |
| Validade impressa | Data atual | Vencida: divergência fixa (§6.5). Ausente: não penaliza (§3.4) |

Regras:

- Cada fator tem peso. Os pesos e o limiar de aprovação ainda não foram definidos (§10.7).
- Score acima do limiar: aprovado.
- Score na zona intermediária: revisão humana (EXC-CON-03).
- Score abaixo do limiar: divergência (EXC-CON-01), com a lista dos fatores que não conferem.
- Validade impressa vencida: divergência, independentemente do score.

### 6.11 Bloqueio por tentativas

- **Decidido:** após excesso de tentativas, o usuário fica **bloqueado por 5 minutos**.
- Tela "Tente novamente em 5 minutos", com contador regressivo (EXC-CON-05). Durante o bloqueio, não há ação na tela.
- Quando o contador zera, o usuário volta para a seleção ou para a captura, conforme o ponto de origem.
- **Proposta, a confirmar:** o limite é **3 tentativas**, com base na nota do Figma (§10.4).
- Dúvidas em aberto: contagem por documento ou por módulo, o que conta como tentativa e se o bloqueio continua valendo ao fechar o app (§10.4).

## 7. Entradas (de onde se chega)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [ENT-01 · Login](../ENT-01-login/spec.md) | Idioma escolhido | Idioma vale para o fluxo inteiro (§6.0) | Caminho alternativo (define o idioma) |
| [CAD-08 · Status · dados recebidos](../CAD-08-status-dados-recebidos/spec.md) | 10 s ou Continuar agora | — | Automática (timer) |
| Seleção de documento de estrangeiro (Figma `2283:33539`) | Tirar foto ou Fazer upload | Documento de estrangeiro escolhido | Caminho principal |
| [AREA-01 · Meu cadastro](../AREA-01-meu-cadastro/spec.md) | Concluir validação ou Tentar novamente | Cenário pendente ou reprovado | Caminho alternativo |

Ponto de entrada a confirmar: a aba Estrangeiro de [CAD-01](../CAD-01-cadastro-dados-pessoais/spec.md) leva a essa seleção (§10.1).

## 8. Saídas (para onde se vai)

| Tela | Gatilho | Condição | Tipo |
|---|---|---|---|
| [BIO-01 · Tutorial da captura](../BIO-01-tutorial-da-captura/spec.md) (validação facial) | Redirecionamento após o envio | — | Caminho principal |
| Seleção de documento de estrangeiro | Voltar | — | Voltar |
| Divergência (§6.5) | Score abaixo do limiar | — | Caminho alternativo |
| Telas de erro e exceção (§6.9) | Cenários EXC-* | — | Erro |

## 9. Dados

- **Coletados:** país, tipo de documento e número do documento (Cédula); imagens da frente e do verso; página e MRZ do passaporte; PDFs (CRNM, DPRNM e RNE).
- **Usados no score:** nome, data de nascimento e país do cadastro (CAD-01); foto do rosto da captura facial (BIO-02).
- **Preferência:** idioma escolhido (português, inglês ou espanhol), vindo de ENT-01 e das configurações da área logada.
- **Resultado:** aprovado, reprovado ou em análise, consumido pela AREA-01 (Meu cadastro). Enviado ao usuário por e-mail e SMS.
- **Contatos:** e-mail e celular já cadastrados em CAD-01 a CAD-06.
- **Bloqueio:** contador de tentativas e fim do bloqueio. Pode ficar no servidor, para não depender do app.
- Visão geral: [dados.md](../dados.md). Ajustar lá se o backend guardar as imagens, o número do documento, o idioma ou o contador de tentativas.

## 10. Lacunas e perguntas

**Decidido** (respostas do time):

- Upload só em **PDF**, máximo **5 MB**.
- Cédula: **só captura por foto**, sem upload.
- Passaporte entra no módulo, com a seleção do node `3080:59740` e as intros do print (§6.2). Sem upload.
- **Captura automática** da câmera: o usuário só enquadra (§3.3).
- Validade: data impressa, quando existe. Documento sem validade é aceito (§3.4).
- **Sem análise manual visível.** A análise é feita por IA, com score (§6.10) e revisão humana quando a IA não decide (§6.4).
- **Score** com múltiplos fatores: nome, data de nascimento, país de origem, número, MRZ quando existe, grafismos, foto do rosto e validade (§6.10).
- **Bloqueio de 5 minutos** após excesso de tentativas (§6.11).
- Resultado por **e-mail e SMS**.
- **3 idiomas** (português, inglês e espanhol). Escolhidos no login e alteráveis nas configurações da área logada. O fluxo inteiro segue o idioma escolhido (§6.0).
- Próxima etapa: **validação facial** (BIO-01). A ordem dos módulos é modular, então o redirecionamento usa texto genérico.
- Textos de redirecionamento genéricos, sem nome da próxima etapa.
- Telas de erro desenhadas com os componentes do DS (`telas/`), textos em 3 idiomas (`telas-erro.json`).
- Imagens provisórias (DPRNM, Cédula e RNE usando a arte do CRNM) são placeholders.
- Blocos de status do Figma com erro de execução foram ignorados.

**Em aberto:**

1. **Entrada.** Confirmar que a aba Estrangeiro de CAD-01 leva à seleção do Figma `2283:33539`. Hoje DOC-01 lista só CIN, CNH e RG.
2. **Pesquisa de países e modelos aceitos.** Precisa de pesquisa. Pontos de partida: a tabela do Figma (Paraguai "a confirmar"; Venezuela sem MRZ, só OCR; Peru com lado da MRZ diferente conforme o modelo). Também definir a lista de países do Select (§3.1).
3. **Desenho final das telas de erro no Figma.** As telas estão em `telas/`, com os componentes do DS. Falta levar ao Figma e revisar os textos em português e inglês.
4. **Bloqueio: regras.** Confirmar o limite de tentativas (proposta: 3). Definir se a contagem é por documento ou por módulo, o que conta como tentativa, se o bloqueio sobrevive a fechar o app e se a tentativa zera após uma aprovação.
5. **Captura automática: detalhes.** Tempo mínimo de enquadramento antes de disparar, e o que acontece quando a captura automática falha (ex.: três avisos seguidos).
6. **Passaporte: câmera do MRZ.** Desenhar a tela de câmera e a confirmação do MRZ. Confirmar que o passaporte não tem upload.
7. **Pesos e limiar do score.** Definir o peso de cada fator, o limiar de aprovação e a zona intermediária. Definir o que acontece quando um fator está "não disponível" (ex.: sem MRZ).
8. **Textos das intros.** Passos 2 a 5 de CRNM, DPRNM, RNE e Cédula, nos 3 idiomas. Os textos do passaporte em português e inglês são propostas a revisar.
9. **Revisão dos textos.** Os textos de erro em português e inglês são propostas. Espanhol: revisar com o time de conteúdo.
10. **Componente de divergência e de bloqueio.** Criar no DS ou usar `StatusScreen` com tom de erro? O contador de bloqueio também precisa de componente.
11. **Notificações de resultado.** Texto de e-mail e SMS nos 3 idiomas. Eventos que disparam (aprovado, reprovado, em análise, falha). Canal e tempo de envio.
12. **Guias de erro.** Qual erro vai para cada guia (`Connection-error`, `Unexpected-error`, `Doc-ID`)?
13. **Foto do rosto no score.** A comparação com o rosto do documento depende da captura facial (BIO-02). Definir se o score é fechado depois da validação facial, ou se há um score parcial antes.
14. **Idioma nas outras specs.** A escolha de idioma precisa entrar em [ENT-01](../ENT-01-login/spec.md) e nas configurações da área logada. Os outros módulos ainda não citam idioma. Atualizar depois de você confirmar.
15. **Sessão expirada.** Volta ao login? Mantém o idioma escolhido e o estado da captura?

## 11. Critérios de aceite

- [ ] Seleção de documento de estrangeiro mostra CRNM, DPRNM, RNE, Passaporte e Cédula.
- [ ] Passaporte segue a sequência de §6.2, com a captura da página e do MRZ, e não tem upload.
- [ ] Cédula abre formulário com País, Documento de identidade e Número, e só permite captura por foto.
- [ ] CRNM, DPRNM e RNE aceitam foto ou upload. O upload aceita apenas PDF de até 5 MB.
- [ ] A câmera captura sozinha quando o documento está enquadrado. Não há botão de disparo.
- [ ] Frente e verso (ou página e MRZ) são capturados e confirmados antes da conferência.
- [ ] Documento sem validade impressa é aceito. Documento com validade impressa vencida entra na divergência.
- [ ] O score de validação combina os fatores de §6.10, e cada fator tem resultado "confere", "não confere" ou "não disponível".
- [ ] A validação roda em segundo plano, e o usuário segue para a validação facial.
- [ ] A análise é feita por IA, com revisão humana interna quando a IA não decide. Não há tela de análise manual.
- [ ] Após o limite de tentativas, a tela de bloqueio mostra o contador de 5 minutos e não permite ação até o fim.
- [ ] Divergência mostra a lista do que não confere e as ações Revisar dados informados e Tirar novas fotos.
- [ ] Todos os cenários de §6.9 têm tela ou feedback definido, com texto nos 3 idiomas.
- [ ] O fluxo inteiro segue o idioma escolhido no login (português, inglês ou espanhol), e troca nas configurações vale a partir da próxima tela.
- [ ] A transição mostra o texto genérico "Estamos te redirecionando para a próxima etapa", nos 3 idiomas.
- [ ] O resultado é avisado por e-mail e SMS, no idioma escolhido.
- [ ] Nenhum texto cita o nome da próxima etapa.

---
[Índice geral](../INDEX.md) · [Fluxo completo](../INDEX.md#fluxo-completo) · [flow.json](../flow.json)
