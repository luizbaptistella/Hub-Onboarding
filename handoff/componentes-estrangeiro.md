# Componentes do fluxo de documento de estrangeiro

Gerado de `components.json` de cada tela (DOC-02 a DOC-46) por `build-tools/estrangeiro/specs_sync.py`. Não edite à mão.

Origem dos dados: captura da renderização real com o bundle do DS, cruzada com os tipos do DS (`build-tools/ds-index.d.ts`).

## Componentes do DS

| Componente | Telas | Instâncias | Telas que usam |
|---|---|---|---|
| `AppHeader` | 21 | 21 | DOC-02, DOC-05, DOC-09, DOC-11, DOC-12, DOC-13, DOC-14, DOC-15, DOC-18, DOC-21, DOC-22, DOC-23, DOC-25, DOC-28, DOC-31, DOC-32, DOC-35, DOC-38, DOC-41, DOC-44, DOC-45 |
| `Button` | 20 | 57 | DOC-05, DOC-09, DOC-11, DOC-12, DOC-13, DOC-14, DOC-15, DOC-18, DOC-21, DOC-22, DOC-23, DOC-25, DOC-28, DOC-31, DOC-32, DOC-35, DOC-38, DOC-41, DOC-44, DOC-45 |
| `PageHeading` | 12 | 12 | DOC-02, DOC-05, DOC-09, DOC-18, DOC-21, DOC-28, DOC-31, DOC-32, DOC-35, DOC-38, DOC-41, DOC-44 |
| `CameraCapture` | 11 | 55 | DOC-04, DOC-07, DOC-17, DOC-20, DOC-27, DOC-30, DOC-34, DOC-37, DOC-40, DOC-43, DOC-46 |
| `Tutorial` | 10 | 25 | DOC-03, DOC-06, DOC-16, DOC-19, DOC-26, DOC-29, DOC-33, DOC-36, DOC-39, DOC-42 |
| `ResultHero` | 9 | 9 | DOC-11, DOC-12, DOC-13, DOC-14, DOC-15, DOC-22, DOC-23, DOC-25, DOC-45 |
| `Image` | 7 | 7 | DOC-05, DOC-18, DOC-28, DOC-35, DOC-38, DOC-41, DOC-44 |
| `UploadArea` | 3 | 54 | DOC-09, DOC-21, DOC-31 |
| `StatusScreen` | 2 | 2 | DOC-10, DOC-24 |
| `JourneyStepper` | 2 | 2 | DOC-10, DOC-24 |
| `RedirectCountdown` | 2 | 2 | DOC-10, DOC-24 |
| `DocumentOption` | 1 | 5 | DOC-02 |
| `LegalFooter` | 1 | 1 | DOC-02 |
| `RadioGroup` | 1 | 6 | DOC-02 |
| `ActionRow` | 1 | 8 | DOC-02 |
| `Select` | 1 | 4 | DOC-32 |
| `TextField` | 1 | 4 | DOC-32 |

## Peças fora do DS

Só existem no protótipo ou são propostas para o DS.

| Peça | Telas | Telas que usam |
|---|---|---|
| Barra de status do celular | 44 | DOC-02, DOC-03, DOC-04, DOC-05, DOC-06, DOC-07, DOC-09, DOC-10, DOC-11, DOC-12, DOC-13, DOC-14, DOC-15, DOC-16, DOC-17, DOC-18, DOC-19, DOC-20, DOC-21, DOC-22, DOC-23, DOC-24, DOC-25, DOC-26, DOC-27, DOC-28, DOC-29, DOC-30, DOC-31, DOC-32, DOC-33, DOC-34, DOC-35, DOC-36, DOC-37, DOC-38, DOC-39, DOC-40, DOC-41, DOC-42, DOC-43, DOC-44, DOC-45, DOC-46 |
| Vídeo da câmera (simulado) | 11 | DOC-04, DOC-07, DOC-17, DOC-20, DOC-27, DOC-30, DOC-34, DOC-37, DOC-40, DOC-43, DOC-46 |
| Número do 2.º tutorial | 5 | DOC-06, DOC-19, DOC-29, DOC-36, DOC-42 |
| Faixa do código (moldura horizontal) | 5 | DOC-07, DOC-20, DOC-30, DOC-43, DOC-46 |
| Miniatura do arquivo | 3 | DOC-09, DOC-21, DOC-31 |
| Lista de motivos | 2 | DOC-11, DOC-22 |
