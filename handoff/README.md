# Como ler este handoff

Este artefato reúne o hub de visualização do fluxo (página inicial), o protótipo navegável (`prototipo.html`) e esta pasta `handoff/`.

## Para devs e agentes de IA

1. Abra [INDEX.md](INDEX.md) e ache o código da tela (ex.: `CAD-02`).
2. Leia **só** a pasta daquela tela: `handoff/<CÓDIGO>-<nome>/spec.md`, `components.json` (componentes do DS com props, JSX e estados) e `screen.html`.
3. Componentes e tokens vêm do artefato **Palmeiras · Onboarding** (Design System). O `screen.html` mostra a marcação de referência; não copie classes locais (fora do DS) sem conferir.
4. Para planejar a implementação dos componentes, use [componentes.md](componentes.md): componente × telas, variantes e estados.
5. Ligações com outras telas estão nas seções **Entradas** e **Saídas** de cada spec, e no mapa completo em [flow.json](flow.json).

Para pedir uma tela a um agente, basta: "Implemente `CAD-02` conforme `handoff/CAD-02-codigo-por-sms/spec.md`".

## Convenções

- Códigos: `ENT` entrada, `CAD` cadastro, `DOC` documento, `BIO` biometria, `AREA` área logada, `AJD` ajuda, `FAM` familiares, `DEC` decisão, `*-G1` lacuna (a desenhar).
- Tipos de ligação: Caminho principal, Caminho alternativo, Erro ou nova tentativa, Automática (timer), Voltar, Sair do fluxo, Lacuna (a desenhar).
- Status: Desenhada (tem node no Figma), Sem Figma (só no protótipo), Legado (a decidir), Lacuna (não existe).
- Precedência: DS > spec.md > protótipo.

Para ler de fora com o Claude: ler o artefato https://claude.ai/artifact/11KYqUc8M7tEadXLZmQtQH com o caminho do arquivo (ex.: `handoff/INDEX.md`).
