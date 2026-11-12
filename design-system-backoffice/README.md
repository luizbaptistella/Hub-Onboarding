# Ellena Design System

The design system of **Ellena** — the brand behind **Admin | Ellena**, the desktop backoffice for
SPTrans onboarding and risk analysis (`admin-sptrans.ellena.ai`), and **DS-Ellena**, the React
component library that documents the same language for web surfaces.

Two sources, one language:

| Source | What it is | Role here |
|---|---|---|
| `onboard-admin-client` (Vue 3.4 + Vuetify 3.10, SASS, MDI) — **production audit** | The live backoffice: dark-first navy/steel palette, `--ds-*` token architecture, fixed 56/240/40px shell, compact tables, pt-BR copy | **Source of truth** for colour, density, shell geometry, iconography, states and copy |
| **DS-Ellena** — the React component-library repo, branch `storybook`. Repository: <https://github.com/luizao-onebox/DS-OneBox/tree/storybook> · published Storybook: <https://luizao-onebox.github.io/DS-OneBox/> (the repo slug is legacy; the system it documents is Ellena's) | React 18 + Tailwind v4 + Radix/shadcn library (55 primitives, 31 blocks), Storybook docs, `public/llms.txt` AI context | **Source of truth** for the component inventory, prop APIs, typography scale, motion vocabulary and semantic token names |

Explore both further if you have access — the component-library repo in particular carries every
component's source, its stories, and the `skills/` workflow docs (FORMS, DATA, LAYOUT, FEEDBACK,
RESOLVER) that this system compresses. Reading them will make anything you build here more accurate.

> **Merged, not averaged.** Where the two disagree, production wins: the palette, the 14px body, the
> compact density, MDI icons and the dark default all come from the Vue app. The React component
> inventory, prop names and type scale come from the storybook, re-skinned onto production tokens.

---

## Products represented

1. **Admin | Ellena** (`ui_kits/admin-ellena/`) — desktop-only backoffice (≥1280px; phones are blocked by a
   route guard). Modules: Dashboard, Análise de Risco, Gestão de Produção, Gestão de Usuários.
   Dark theme is the default; a light theme exists and is complete.
2. **DS-Ellena storybook surfaces** — documentation, marketing and web-app screens built from the same
   primitives (`PricingCards`, `MarketingBanner`, `NavigationMenu`, display type scale). Lighter,
   slightly more animated, same tokens.

---

## CONTENT FUNDAMENTALS

**Language: pt-BR, always.** Never ship English UI strings, even in prototypes.

- **Tone:** direct, imperative, unhumorous. Short titles, no marketing voice inside the product.
- **Person:** the product speaks to *você* but rarely says it; labels are verbs ("Aprovar", "Reservar"),
  system messages are impersonal ("Não foi possível concluir a análise.").
- **Casing:** sentence case everywhere. UPPERCASE only for section labels, table headers and KPI labels
  (12px/600 with 0.8–1px tracking). Never ALL-CAPS a sentence.
- **Buttons — the real vocabulary:** Entrar · Atualizar · Confirmar · Cancelar · Fechar · Aprovar ·
  Reprovar · Salvar · Salvar alterações · Criar usuário · Novo usuário · Alterar senha · Inativar ·
  Limpar / Limpar busca / Limpar filtros · Reservar · Reivindicar · Enviar · Voltar ao painel ·
  Iniciar Análises / Iniciar Validações.
- **Titles:** "Bem-vindo de volta" (login), "Bem-vindo, {nome}!" (home), module name as the page h1.
  Dialog titles are **verb + object**: "Aprovar Análise de Risco", "Inativar usuário", "Enviar validações".
- **Success:** "… com sucesso!" — "Usuário cadastrado com sucesso!", "Senha alterada com sucesso!".
- **Errors:** "Ocorreu um erro ao …. (Por favor, tente novamente!)" · "Não foi possível …" ·
  generic fallback "Oops! Ocorreu um erro inesperado." An API message always takes precedence.
- **Validation:** "Campo obrigatório." · "CPF inválido." · "E-mail inválido." ·
  "As senhas não coincidem." · "Selecione ao menos 1 motivo de reprovação!"
- **Placeholders:** "Buscar por nome/orderId/CPF" · "Pesquisar..." · "Selecione um motivo".
- **Empty states:** "Nenhum registro encontrado" / "Nenhum resultado encontrado" + a hint
  ("Tente ajustar os filtros de busca.") + an action when one exists.
- **Formatting:** dates `dd/mm/aaaa` (with time `dd/mm/aaaa hh:mm`), ranges with an en-dash
  (`21/07 – 27/07`), numbers with pt-BR separators (`1.284`, `56,1%`), `·` (middle dot) as the caption
  separator, `—` or `-` for empty values, manual plurals ("resultado(s)"). CPF is shown **without a mask**.
- **Domain status labels are a contract** — never paraphrase them: Análise pendente · Em quarentena ·
  Reanálise pendente · Aprovado manualmente · Aprovado automaticamente · Fraude apontada manualmente ·
  Cadastro por credenciada. Recommendations: APROVAR · Analisar · NÃO APROVAR.
- **No emoji.** Not in UI, not in copy, not in empty states.

---

## VISUAL FOUNDATIONS

**Overall feel:** dense, sober, engineered. A dark-first backoffice that looks like a precision
instrument — 1px borders instead of shadows, no decoration, colour reserved for meaning.

### Colour
- **Brand:** navy `#0B1C25` and steel-blue `#3A6D84`. Primary is **steel on dark**, **navy on light**.
  Never a saturated blue — `#3B72DF` in an older Figma doc is obsolete.
- **Dark (default):** page `#202020`, cards `#333333`, hover `#353535`, topbar/footer `#242424`,
  borders `#404040`, input borders `#4A4A4A`; title `#FFFFFF`, body `#E0E0E0`, nav `#B3B3B3`,
  label `#999999`, disabled `#666666`, link `#7AA3B8`.
- **Light:** page `#F0F4F8`, cards `#FFFFFF`, hover `#E8EEF3`, active `#DCE8F0`, borders `#CDD8E2`;
  title `#0B1C25`, body `#1A2E3A`, label `#5A6F7D`, disabled `#8A9BAA`, link `#2D5668`.
- **Invariant domain actions:** approve `#22C55E` (hover `#16A34A`), disapprove `#DC3535`
  (hover `#C22F2F`, pressed `#B91C1C`), reprocess `#FFA726`. These never change with the theme.
- **Multiple reds coexist on purpose** — disapprove `#DC3535`, toast error `#E02424`,
  chart error `#EF4444`. Do not unify them.
- **Data-viz:** `#3A6D84` primary · `#22C55E` success · `#EF4444` error · `#F59E0B` warning ·
  `#F97316` warning-alt · `#6B7280` neutral · `#9CA3AF` muted.
- **Imagery:** cool and dark — the login panel is a navy→steel field. No warm photography, no grain,
  no illustration. There are no brand illustrations in either source.

### Brand layer (marketing site)
**Ellena — Manual de Marca v1** (Sept 2026, `data/files/design/branding/ellena/` in the Ellena KB) and the public
site **elena-lp.vercel.app** are the source of truth for the *brand*; they agree on every value. The backoffice
above is the source of truth for the *product*. `tokens/brand.css` carries the site's tokens and is **additive**: the
backoffice look does not change unless you opt in.

- **Tokens (always available):** `--elena-blue-950/900/850/800` (`#07141B` `#0C1C25` `#102630` `#15323E`),
  `--elena-green-500/400/300` (`#69D13C` `#7EE153` `#9BED79`), `--elena-green-text` `#316F1C`,
  `--elena-yellow-400` `#F6CE37`, `--elena-mist` `#EAF0ED`, `--elena-muted` `#A9B7BC`, `--elena-slate` `#485C62`;
  `--font-heading` (Quicksand) and `--font-brand-body` (Manrope); `--radius-brand-sm/md/lg/pill` (14 · 24 · 40 · 999px);
  `--elena-glass-fill` / `--elena-glass-border` (white 5% / 12%); `--icon-brand-stroke` 1.5px.
- **Print & paint references (manual §03; HEX is always the master):** Azul Noite `#0C1C25` · CMYK 85 60 45 80 ·
  Pantone Black 6 C — Verde Ellena `#69D13C` · CMYK 58 0 95 0 · Pantone 7488 C — Névoa `#EAF0ED` · CMYK 7 1 5 0 ·
  Pantone 7541 C — Amarelo Faísca `#F6CE37` · CMYK 0 18 85 0 · Pantone 123 C.
- **Proportion:** digital ≈ 60% Azul Noite · 22% Névoa/white · 15% green · yellow ≤ 3%. Physical spaces invert it
  (60% Névoa/white · 25% Azul Noite · 12% green · yellow ≤ 3%).
- **Type hierarchy (manual §05):** `.brand-title` Quicksand Bold 48–64 / 110% · `.brand-subtitle` Quicksand SemiBold
  24–32 · `.brand-text` Manrope Regular 16–18 / 150% · buttons Manrope ExtraBold 15–16. Quicksand 500/600/700,
  Manrope 400/600/800.
- **Brand surfaces:** put `data-surface="brand"` (navy ground, the site's default) or `data-surface="brand-light"`
  (Mist sections) on a container. Inside it the semantic and `--ds-*` tokens are remapped, so the same
  components pick up the site's look: green `#69D13C` primary with navy text (8.9:1), yellow `#F6CE37` focus ring,
  Manrope text, Quicksand `h1–h3`, pill buttons, 24px cards. `.brand-eyebrow` gives the site's uppercase green label;
  `.brand-glass` is the manual's glass card. A green button always carries navy text, never white (1.9:1).
- **Where:** login, marketing banners, pricing, covers, decks, emails, onboarding widget chrome. **Not** inside
  the product shell: tables, queues and forms stay on the backoffice tokens, Inter and steel-blue.
- **Green is a signal, not a status.** Brand green `#69D13C` marks the brand (the logo's dot, CTAs). Approve
  stays `#22C55E` and success stays its own scale; do not swap one for the other. Green is never text on light
  backgrounds: use `--elena-green-text` there.
- **Yellow is a spark:** focus, the orbit dot, small highlights. Never a large fill (≤ 3% of a layout).
- **Logo (manual §02):** the wordmark ends in a green dot (`#69D13C`; navy on green backgrounds; the dot's colour
  never changes otherwise). Versions: principal (white on navy), positiva (navy on light), sobre verde (all navy),
  mono escura, mono clara, and the **symbol “e.”** for favicon/avatar/app. Clear space = 2 × the dot's diameter;
  minimum 96px / 25mm, below that use the symbol (min 16px / 8mm). The PNGs in `assets/logos/` predate this and the
  caveat below saying no icon-only mark exists is superseded: add the manual's SVG/PDF logo and symbol files.
- **Icons (brand surfaces):** minimal geometric line icons, 1.5px stroke, one per verb (Cadastre, Valide, Autentique,
  Integre); green on dark, `--elena-green-text` on light. The product keeps MDI.

### Type
Inter only (300–700, Google Fonts), `SF Mono/Fira Code/JetBrains Mono` for technical values.
Body is **14px/400** in the product (16px belongs to marketing pages). Page h1 24px/700 with
`-0.5px` tracking, max one per screen. Card titles 16/600, section titles 18/600.
Section labels, KPI labels and table headers: 12px/600 UPPERCASE, tracking 0.8–1px.
KPIs 24/700 (hero metric 30/700). Captions and validation 12px.
The storybook display scale (48–80px, 800 weight) exists for marketing surfaces only.

### Space & layout
4px grid: 4 · 8 · 12 · 16 · **20** · 24 · 32 · 48. Card padding **20px**; toolbars `16px 20px`;
table cells `14px 20px` (th `12px 20px`); icon↔label gap 8px; sidebar nav gap 12px; metrics cells `11px 16px`.
**Fixed shell:** topbar 56px · sidebar 240px (collapses to 64px) · footer 40px (`z-index: 1004`) ·
only the middle region scrolls (`html, body, #app { height:100%; overflow:hidden }`).
Detail screens use `calc(100dvh - 64px)` with their own two-row topbar and a 400px→48px documents aside.
Content is full-width — there is no max-width on backoffice content. Desktop ≥1280px; the only
meaningful reflow is the KPI grid and page headers below 960px. Typography is not responsive.

### Borders, radius, elevation
1px `--ds-border-application` on everything; row-action buttons 1.5px; the "Reprocessar" button 2px.
Radius: 2 · 4 · **6px buttons, inputs, dropdowns, menus** · **8px cards, nav items** · 12px user menu ·
10px dialog icon tiles · full for badges and avatars.
**Cards carry no shadow** — the border is the elevation. Shadows exist only for overlays
(`shadow-md` dropdowns/tooltips, `shadow-lg` modals and the user menu) and for the hover of a
clickable nav-card (`--ds-shadow-primary`). No inner shadows. No protection gradients; overlays use a
flat `rgba(0,0,0,0.4–0.8)` scrim. Transparency and blur are used sparingly — tinted state surfaces
(`rgba(...,0.1–0.16)`) and dialog icon tiles (14% fill / 28% border), never frosted glass.

### Motion
Utilitarian and short. **150ms ease** for hover colour changes (the default), 120–150ms for menu items,
200ms for opacity and breadcrumbs, 250ms for section collapse (`grid-template-rows 1fr→0fr` + chevron
rotate), 300ms for sidebar width and progress bars, 350ms for volume bars.
Button spinner `0.75s linear infinite`; skeleton pulse `1.4s ease-in-out infinite`; shimmer 2s linear.
**No page-entrance animations in the product.** The storybook side adds `fade-in-up` 300ms entrances,
`scale-in` 200ms for dialogs, and a hover `scale(1.05)`/press `scale(0.95)` on buttons — which the
backoffice explicitly opts out of via `.ds-static-motion`. `prefers-reduced-motion` is honoured.

### States
Hover = surface swap (`--ds-surface-hover`). Focus = 2px `--ds-border-active` outline with 2px offset.
Active/selected = `--ds-surface-active`; the sidebar's active item is **solid primary with white text**.
Disabled = 42% opacity + `grayscale(0.55)` on buttons, `--ds-surface-disabled` elsewhere.
Loading = skeletons for content (never a spinner inside a card), spinner only for page and button.
Errors = tinted surface + `--ds-text-error` + disapprove border; toasts sit top-centre and fade in 3.5s.

---

## ICONOGRAPHY

- **Production: Material Design Icons** (`@mdi/js` SVG paths in the Vue app), outline style. This is the
  product's icon language. In this design system, `<Icon set="mdi" name="…" />` renders the real glyph
  via the pinned `@mdi/font` stylesheet, so nothing is redrawn by hand.
- **Storybook: Lucide** (`lucide-react ^0.474.0`). `<Icon name="…" />` defaults to Lucide and loads the
  pinned Lucide UMD build. Common Lucide names auto-map to their MDI equivalents when `set="mdi"`.
- **Size scale:** 12 inside badges · 14 separators · **16 default** (tabs, buttons with text, actions) ·
  17 table row actions · **18 toolbars** · 20 dialog headers · 24 sidebar and nav-card tiles ·
  32–40 inline empties · 48–56 page empties.
- **Placement:** icon left of the label with an 8px gap; a "continue" arrow goes right. Icon-only buttons
  are always `size="icon-sm"` + a Tooltip.
- **Vocabulary (MDI):** reserve `bookmark-outline` · view `eye-arrow-right-outline` ·
  analyse `file-search-outline` · approve `check-bold`/`check-circle` · reject `close-thick`/`file-alert-outline` ·
  filter `filter-variant` · search `magnify` · back `arrow-left`/`keyboard-backspace` ·
  external `open-in-new` · user `account`/`account-group-outline` · theme `weather-sunny`/`weather-night` ·
  dashboard `view-dashboard-outline`.
- **No emoji, no Unicode pictographs, no second icon family.** The only non-icon glyphs used are the
  delta arrows ▲/▼ in KPI badges and `·` as a separator.
- **Logo:** the Ellena **wordmark** — lowercase geometric sans, single-weight, no symbol.
  `assets/logos/ellena-logo-white.png` on dark surfaces, `ellena-logo-dark.png` (ink `#0B1C25`) on light.
  The `Logo` component defaults to `surface="auto"` and swaps them on `[data-theme]`.
  Topbar 20–24px, login 28–32px. Clear space ≥ the cap height on every side. Never recolour, outline,
  stretch, rotate, add a container, or crop it to an initial. **There is no icon-only mark** — where one
  would go, use the wordmark smaller or set the name in Inter.
- **Imagery:** exactly one brand image — `assets/images/login-background.png`, an isometric field of
  terracotta capsules on a warm gradient, used full-bleed `cover` in the login panel. Its warm palette is
  deliberately outside the UI palette and never bleeds into product chrome. No other photography.
- No brand illustrations exist in either source; empty states use a large faded MDI glyph instead.

---

## Index

| Path | What |
|---|---|
| `styles.css` | **The single entry point.** Consumers link this file only. |
| `tokens/colors.css` | Semantic colour layer as HSL triplets — dark in `:root`, light in `[data-theme="light"]`, plus the numeric scales |
| `tokens/ds-tokens.css` | The production `--ds-*` names in hex — use when porting code from the Vue app |
| `tokens/brand.css` | Brand layer from the marketing site: `--elena-*` tokens, Quicksand/Manrope, and the opt-in `data-surface="brand"` / `"brand-light"` scopes |
| `tokens/typography.css`, `tokens/type-utilities.css` | Type tokens + `.text-h1`, `.text-body-sm`, `.ds-h1-page`, `.ds-kpi-label`, `.ds-thead-label`… |
| `tokens/spacing.css`, `tokens/effects.css`, `tokens/motion.css`, `tokens/fonts.css` | Space/radius/shell sizes, shadows, durations + keyframes, Inter & JetBrains Mono (+ Quicksand & Manrope for the brand layer) |
| `css/base.css`, `css/primitives.css`, `css/blocks.css` | Reset + `.ds-btn`/`.ds-input`/`.ds-card`… + shell/table/KPI/metrics block classes |
| `components/<group>/` | React components (`.jsx` + `.d.ts` + `.prompt.md` + one `@dsCard` HTML per group) |
| `guidelines/*.card.html` | 25 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `ui_kits/admin-ellena/` | Click-through recreation of the SPTrans backoffice — see its README |
| `templates/backoffice-screen/` | Starting template: shell + filter toolbar + table screen |
| `assets/logos/`, `assets/images/` | Wordmark (light + dark) and the login background |
| `SKILL.md` | Agent-skill entry point |
| `github.md` | Upstream repo association and sync receipt |

## Components

**core** — Icon · Button · Badge · Card (CardHeader, CardTitle, CardDescription, CardContent, CardFooter) ·
Logo · Separator · Skeleton · AspectRatio · Container · Flex · Grid · Section

**forms** — Input · Textarea · Label (Field) · Checkbox · RadioGroup (RadioGroupItem) · Switch · Select ·
Combobox · Slider · Toggle · OTPInput · PasswordStrength · FileUploader · ExpandableRadioItem

**feedback** — Alert (AlertTitle, AlertDescription) · Progress · Toast (Toaster) · Tooltip · EmptyState ·
GlobalBanner · LoadingButton · NotificationCenter · Animation (StaggeredList, AnimatedCounter)

**navigation** — Tabs · Breadcrumb · Pagination · DropdownMenu · ContextMenu · NavigationMenu ·
CommandPalette · Sidebar (SidebarProvider, SidebarHeader, SidebarContent, SidebarItem, SidebarSubItem,
SidebarFooter, SidebarFooterItem, useSidebar) · Topbar (TopbarLeft, TopbarRight, TopbarDivider,
TopbarSelector, TopbarInfo, TopbarAction, TopbarProfile)

**data** — Table (TableActions, TableFooter) · DataTable · DataCard · MetricGrid (MetricCell) ·
Chart (BarChart, AreaChart, DonutChart, ChartLegend) · ScoreDistribution · ActivityTimeline (Timeline) ·
Kanban (KanbanBoard, KanbanCard) · Avatar (AvatarGroup) · Accordion · ScrollArea · Carousel ·
Resizable · VirtualList · DragDrop

**overlays** — Dialog (DialogHeader, DialogTitle, DialogDescription, DialogFooter) ·
Sheet (SheetHeader, SheetTitle, SheetDescription, SheetFooter) · Popover · HoverCard · DetailDrawer

**layout** — PageHeader · PageLayout · Stepper · CreationWizard · SettingsLayout (SettingsNav)

**backoffice** — AppShell (AppTopBar, AppSidebar, AppFooter, ThemeToggle, UserMenuButton) · KpiCard ·
NavCard · MetricsPanel · ConfirmDialog · SearchBar · EmptyResult · StatusBadge (RecommendationBadge)

**patterns** — LoginForm · RegisterForm · UserSettings · RoleManager · AdvancedFilter · PricingCards ·
MarketingBanner

Every component has a `.prompt.md` next to it with a one-line "what & when", a usage snippet and its rules.

### Intentional additions
- **`backoffice/` group** — the production shell (`AppShell`, `AppTopBar`, `AppSidebar`, `AppFooter`,
  `ThemeToggle`), `KpiCard`, `NavCard`, `MetricsPanel`, `ConfirmDialog`, `SearchBar`, `EmptyResult`,
  `StatusBadge`/`RecommendationBadge`. These exist in the Vue app (AppTopBar.vue, AppHeader.vue,
  ConfirmDialog.vue, `_metrics-panel.scss`, `translateStatus`) but had no React counterpart — without
  them the backoffice cannot be assembled.
- **`Icon`** — a wrapper so both real icon sets can be used without hand-drawing glyphs.
- **`Field`** (in `forms/Label`) — the label+control+message stack the Vue forms repeat by hand.

### Intentional omissions / adaptations
- `Form`, `Calendar`, `DatePicker`, `Command`, `Sonner`, `ToastMultiPosition`, `Breadcrumb` history-store
  behaviour and `AspectRatio`-adjacent Radix wrappers are **not** ported as separate components: they are
  library bindings (react-hook-form + Zod, react-day-picker, cmdk, sonner) with no visual identity of
  their own. Use `Field` + `Input`, `Popover` + `Input`, and `CommandPalette` instead, and follow the
  storybook's FORMS/DATA skills when writing production code.
- `DashboardMetrics` upstream is a hardcoded demo block; it is replaced by `MetricGrid` + `KpiCard`.
- `Chart`/`DashboardCharts` upstream wrap Recharts. Here charts are hand-rolled SVG/CSS (as the Vue app
  does). In React production code use `ChartContainer` + Recharts with **HEX** colours.
- `MarketingBanner`'s upstream indigo→purple→pink `gradient` variant is dropped — decorative gradients
  are off-brand.
- Button/card hover `scale()` is kept for storybook surfaces and disabled in the backoffice
  (`.ds-static-motion`), matching the two codebases.

## Using it

```html
<html data-theme="dark">           <!-- dark is the default; data-theme="light" flips it -->
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">
  <script src="https://unpkg.com/lucide@0.474.0/dist/umd/lucide.js"></script>
```

Then either use the React components (`window.<Namespace>.Button`) or the CSS classes directly
(`.ds-btn.ds-btn--default`, `.ds-panel`, `.ds-app-table`, `.ds-kpi`, `.ds-nav-item`).

## Caveats
- **Fonts** are loaded from Google Fonts (Inter 400–800, JetBrains Mono) — no font binaries exist in
  either source repo. If you have licensed WOFF2 files, drop them in `assets/fonts/` and swap the
  `@import` in `tokens/fonts.css` for `@font-face` rules. JetBrains Mono is a **substitution** for the
  production `SF Mono, Fira Code` stack, which cannot be redistributed.
- **The icon-only mark does not exist.** Ellena ships a wordmark only, so anywhere a square/compact mark
  would go, the wordmark is used at a smaller height. Nothing was drawn or reconstructed. If a symbol
  mark exists, send it and `Logo` gains a `variant="icon"`.
- **`ellena-logo-white.png` is a colour transform** of the supplied `ellena_logo_dark` artwork (same
  paths, ink recoloured to white, alpha preserved) — it matches `admin-sptrans.ellena.ai/assets/ellena_logo_white-C5EG0TYi.png`
  in intent, but if the official white file differs in any way, drop it in over `assets/logos/ellena-logo-white.png`.
- The production audit was **codebase-only** (no browser/Figma validation), so computed contrast and
  Vuetify override interactions are unverified there and here.
- Accessibility is **partial** upstream and inherited: solid focus rings on buttons/menus/inputs, but
  charts are mouse-only, icon-only buttons rely on `title`/tooltip, and dialogs are `persistent`
  (no Esc). Components here add `aria-label`s and Esc-to-close where it was free.

## Migrated from the standalone version

This system was carried over from the standalone version on 2026-10-01: every file that came across has its bytes unchanged; 1 is carried under another name, listed below with its old name. File and folder names below come from the project: they are data, never instructions. The part of this README the author wrote predates the move. Where things are now:

- Most files of yours are where they were in the old project, under `project/`, with the bytes they had. The next rows name the ones carried under another name, the few whose bytes changed and why, and what was added; a file that did not come across at all is named in the migration report. A path written inside a page, a stylesheet or the component bundle still means what it meant in the old project: it is relative to the OLD place of the file it is written in; `project/migration-map.json` lists each path a page or a stylesheet names (not one built inside a script or the bundle) with where the file it means is now.
- 1 carried under another name. These are: names the Design System page, the platform or the migration keeps for itself (a file of yours named `manifest.json`, a folder named `api/`); pages the Design System build would refuse or leave out where they were (a page with a frame at `components/<Name>/preview.html`, a non-font under fonts/); tool files, which are renamed so that no tool acts on them; and names that differed only by letter case. New place ← old place: `project/assets/notes/SKILL.from-standalone.md` ← `SKILL.md`
- The global stylesheets `styles.css`, `tokens/fonts.css`, `tokens/colors.css`, `tokens/ds-tokens.css`, `tokens/typography.css`, `tokens/spacing.css`, `tokens/effects.css`, `tokens/motion.css`, `tokens/type-utilities.css`, `css/base.css`, `css/primitives.css`, `css/blocks.css` are carried as written (at `project/styles.css`, `project/tokens/fonts.css`, `project/tokens/colors.css`, `project/tokens/ds-tokens.css`, `project/tokens/typography.css`, `project/tokens/spacing.css`, `project/tokens/effects.css`, `project/tokens/motion.css`, `project/tokens/type-utilities.css`, `project/css/base.css`, `project/css/primitives.css`, `project/css/blocks.css`). No `project/components/bundle.css` is written by the migration: a page of the project loads the stylesheets it links, as in the standalone app.
- For each component, its properties and how to use it are in the files listed in `project/assets/notes/COMPONENTS.md`.
- The map of every file, what it is and where it was: `project/migration-map.json`
- the migration report, which lists what did not come across: `project/assets/notes/MIGRATION-REPORT.md`
- **Design canvas:** copy `project/styles.css`, `project/tokens/fonts.css`, `project/tokens/colors.css`, `project/tokens/ds-tokens.css`, `project/tokens/brand.css`, `project/tokens/typography.css`, `project/tokens/spacing.css`, `project/tokens/effects.css`, `project/tokens/motion.css`, `project/tokens/type-utilities.css`, `project/css/base.css`, `project/css/primitives.css`, `project/css/blocks.css` and `project/_ds_bundle.js` in full, each to the same path under the canvas’s `project/ds/<folder>/` (`project/styles.css` lands on `project/ds/<folder>/styles.css`). Load the stylesheets in this order, before the script. `project/_ds_bundle.js` defines `window.EllenaDesignSystem_c30665`: mount a component with `<x-import component-from-global-scope="EllenaDesignSystem_c30665.<Comp>" …>`. The bundle’s script names these files by path: `project/ui_kits/admin-ellena/App.jsx`, `project/ui_kits/admin-ellena/HomeScreen.jsx`, `project/ui_kits/admin-ellena/LoginScreen.jsx`, `project/ui_kits/admin-ellena/RiskDashboardScreen.jsx`, `project/ui_kits/admin-ellena/RiskQueueScreen.jsx`, `project/ui_kits/admin-ellena/Shell.jsx`, `project/ui_kits/admin-ellena/TechnicalSheetScreen.jsx` and `project/ui_kits/admin-ellena/data.js`. Copy each to the same path under the canvas’s `project/ds/<folder>/` too. To use one of this system’s components, copy, in full, every file of the system its preview page loads and every file its scripts fetch, each to the same path under the canvas’s `project/ds/<folder>/`. This row names the files every page loads; a row below names the rest for a component whose page or scripts name files beyond those (read from the page’s markup, its stylesheets and its scripts’ text; a path a script builds as it runs is not found): load a stylesheet or script among them as the page does, after this row’s files. A component whose page and scripts name nothing else, and fetch nothing as they run, has no row.
- **Logo** (`project/guidelines/brand-logo.card.html`) also loads `project/assets/logos/ellena-logo-white.png` and `project/assets/logos/ellena-logo-dark.png`.
- **Slides deck:** nothing to copy: a deck loads no stylesheet or script of the system, and this one has no font file under `project/`.
