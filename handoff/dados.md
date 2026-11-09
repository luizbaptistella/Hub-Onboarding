# Dados que atravessam telas

Estado compartilhado entre as telas do onboarding. No protótipo fica só em memória (ou no navegador, quando indicado). No produto, cada item vem do backend.

| Dado | Escrito em | Lido em | Regra |
|---|---|---|---|
| `celular` | CAD-01, CAD-03 | CAD-02 (mascarado), AJD-01 | Mascarado como (11) 9****-5432 |
| `email` | CAD-01, CAD-05 | CAD-04 (mascarado), AJD-01 | Mascarado como joao****@email.com |
| `emailEditado` | CAD-01 (false), CAD-05 (true) | CAD-06 (título), CAD-04 (toast) | — |
| Tentativas de código | CAD-02, CAD-04 | os mesmos | 3 por canal; reenvio a cada 30 s; contato novo zera |
| Tentativas da biometria | BIO-02 | BIO-05 | 3; bloqueio de 5 min; BIO-01 zera |
| Cenário do titular | backend | AREA-01 | completo, pendente, reprovado ou análise |
| Familiares vinculados | FAM-10 a FAM-14, FAM-17 (remoção) | FAM-01, FAM-17 | Sem familiares → FAM-01. Hoje não há vínculos reais; os exibidos são placeholder de exemplo. Sem migração do FAM-08 |
| Aviso de conta encerrada | AREA-04 | ENT-01 | Some ao digitar ou trocar de tela |
| Protocolo do chamado | AJD-01 | AJD-02 | PAL-AAAA-NNNNNN (no protótipo, gerado no front) |
| Foto de perfil | AREA-01, FAM-01, FAM-17 | todos os avatares | 256 px JPEG; no protótipo, salva no navegador |
| Consultas de busca de familiar | FAM-09 | FAM-09 | 5 por titular; depois espera de 15 min; mais 5, espera de 30 min; depois bloqueia e orienta a abrir chamado |
| Reenvios de convite | FAM-11, FAM-17 | FAM-17 | 3 por convite; ao atingir, o card some |
| Limite de familiares | FAM-03 | FAM-17 | 10 por titular; ao atingir, o botão Incluir fica desabilitado com aviso |
| Máscara de nome e CPF | backend | FAM-09, FAM-10, FAM-17 | CPF `***.456.789-**`; nome com o primeiro nome e a inicial seguida de `*` nos demais (padrão de mercado) |
| Retenção de cadastros abandonados | backend | — | 30 dias; assumido também para validações da Receita, a confirmar |
| Tema escuro | menu do perfil | todas as telas | No protótipo, salvo no navegador |
