# Palmeiras Benefício — Design System

Fonte: Figma `MVP Palmeiras - Benefício` (`apbNVzymCikALAJtrz0Zjp`). Construído tela a tela.
Tokens em [tokens.css](tokens.css); assets em [assets/](assets/).

## Telas incorporadas

| # | Tela | Node | Status |
|---|------|------|--------|
| 1 | login-01 | 1620:26870 | ✅ extraída |
| 2 | Cadastro / Mobile — formulário 1/4 (vazio, preenchido, 4 estados de erro) | 1619:11919 | ✅ extraída |

## Fluxos

**Cadastro 1/4 — Dados pessoais:** CPF, data de nascimento, celular (SMS), e-mail + aceite dos termos + opt-in de marketing → "Iniciar validação". Se "Preencheu corretamente?" = Não, o campo inválido mostra o estado de erro (um frame por campo).

## Componentes

### StatusBar
Mock do iOS. Fundo `--color-surface-statusbar` (#fcfcfe) no cadastro e branco no login. Hora em Roboto Medium 14.

### Header (app bar) — `.Header/Mobile`
Fundo branco, altura 48, padding 8/16, gap 16. Slots: botão voltar (chevron 24, [icon-chevron-left.svg](assets/icon-chevron-left.svg)) · ProgressBar · seletor de idioma.
No login, o voltar está vazio e o progresso mostra só o label "Login".

### ProgressBar (`Progress Bars` + `Progress-Step`)
- Label: Inter Medium 12/1.5, gray-500 (ex.: "Dados pessoais")
- Gap label→barra: 4
- 4 segmentos flex, altura 4, raio 3, gap 8; ativo `--color-brand-progress`, inativo `--color-progress-track`
- Prop no Figma: `step` (só vimos o `1` até agora)

### LanguageSelector
Pílula (`radius-full`), bandeira 24px + texto `PT-BR ▾` (Roboto 14/24, `#212521`). Tem lista de opções oculta (5 países), então funciona como dropdown.

### Tabs (segmented) — Brasileiro / Estrangeiro
- 2 abas de largura igual, altura 48, linha inferior de 1px em toda a largura
- Ativa: Inter Bold 16, `--color-brand-primary`, borda inferior 2px na mesma cor
- Inativa: Inter Medium 16, `--color-tab-inactive`, borda transparente
- Ainda não vimos a aba "Estrangeiro" ativa (o formulário dela também não)

### TextField
Base comum: label Inter Medium 14/20 `--color-input-label`, gap label→campo 6.

| Tamanho | Onde | Altura | Raio | Padding-x | Fundo | Borda | Texto |
|---|---|---|---|---|---|---|---|
| `md` | login | 40 | 8 | 14 | branco | `--color-input-border` | 14 |
| `sm` | cadastro | 32 | 6 | 10 | gray-50 | gray-300 | 13/20 |

**Estados**
- `placeholder` — texto `--color-input-placeholder`
- `filled` — texto `--color-input-label`
- `error` — fundo `--color-destructive-subtle`, borda `--color-destructive` + FormMessage logo abaixo (gap 4)

### FormMessage (erro)
Ponto de 6px vermelho + texto Inter Regular 12 `--color-destructive`, gap 6. Quebra em várias linhas. Mensagens vistas:
- Celular: "Número de celular inválido. Use o formato (XX) XXXXX-XXXX."
- CPF, data e e-mail: um frame de erro para cada (textos ainda não lidos)

### Checkbox + label
- Caixa 16, raio 4, borda 0.5px
- `unchecked`: fundo gray-50, borda gray-300
- `checked`: fundo e borda `--color-brand-primary-alt`, check branco 10px ([icon-check.svg](assets/icon-check.svg))
- Label: Inter Regular 12/1.5 gray-500, gap 8, alinhado ao topo; pode ter um link inline (Inter SemiBold, verde) — ex.: "Termos de Uso."
- Instâncias: `Terms and condition`, `Marketing option`

### Button
Altura 48, raio 8, padding 12/20, texto Inter Medium 16 branco, largura total.
- `primary` — fundo `--color-brand-primary-alt`
- `secondary` — fundo `--color-brand-secondary`
- Anotação do Figma (login): o botão principal fica **desabilitado** até os campos serem preenchidos. A variante `disabled` ainda não apareceu em nenhuma tela.

### Link
Inter Medium 14/1.5, sublinhado, `--color-brand-link`.

### Divider com texto
Linha 1px gray-200 · texto `sm/medium` gray-500 · linha. Gap 8.

### SocialButton
64×64, fundo branco, borda gray-100, raio 8, `shadow-100`, ícone 32. Provedores: Google, Apple e Microsoft (o da Microsoft é feito com 4 quadrados, sem SVG).

### Footer
Inter Regular 11, gray-500, centralizado, padding 8/16/24.

### Heading block
Título Inter Bold 24/1.25 em verde + subtítulo Inter Medium 14/1.5 gray-500.

### Layout de página (mobile)
Frame 375×812, fundo gray-50, conteúdo com padding-x 24. Card com gap 24 entre header, inputs e rodapé. Inputs com gap 14 no cadastro e 8 no login.

## Pontos de atenção no Figma (para limpar)

1. **Quatro verdes diferentes** — `#01532f` (a única variável, `Palmeiras / Color-Primary`, usada só nas abas), `#00522e` (botões, títulos, checkbox, hardcoded), `#006437` (progresso, hardcoded) e `#0b5136` (link, via `status/success/800`). Sugestão: usar só `brand/primary` e, se preciso, criar uma escala (`primary/600`, `/700`…).
2. **Dois TextFields diferentes** — login (40px, raio 8, fundo branco, borda slate) e cadastro (32px, raio 6, fundo gray-50, borda gray-300). Decidir se são tamanhos oficiais (`md`/`sm`) ou se é inconsistência. Um input de 32px fica abaixo do alvo de toque recomendado (44px).
3. **Duas escalas de cinza** — `gray/*` vs. slate nos inputs (#64748b, #e2e8f0, #020817), e mais um cinza solto na aba inativa (#6b7280).
4. **Link dos termos inconsistente** — em SemiBold na tela vazia e no erro, em Regular na tela preenchida.
5. **Duplicatas** — `Gray/500` e `gray/500`, `Gray/50` e `gray/50`, `Gray/300` e `gray/300`, `Gray/800` e `gray/800`; `white`, `Flowkit/White` e `Color/Base/white`.
6. **Três nomenclaturas de espaçamento** — `0…8` (inclusive `3․5` e `2․5`, escritos com um caractere de ponto especial), `Spacing/Positive/*` e `spacing/sm`.
7. **Duas fontes** — Inter (UI) e Roboto (status bar e seletor de idioma).
8. `gray/gray-900` tem valor `#A4B7A7` em um modo e `#000000` em outro — conferir.
9. Fundo da status bar muda entre telas (branco × #fcfcfe).
10. Ícone do voltar ainda tem o nome de placeholder `Shapes/circle-plus/[Substitua aqui o ícone]`.
