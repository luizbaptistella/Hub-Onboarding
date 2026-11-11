# Versionamento de telas e fluxos

O git é a fonte única. O hub só lê e mostra o que já está nele, em dois lugares:

- **Aba Histórico** (em cada tela): os commits da `main` que mexeram na pasta da tela em `handoff/` ou que citam o código dela (ex.: `CAD-02`) no título, no corpo ou no trailer `Tela:`. Cada item mostra o que mudou (título), por quê (trailer `Motivo:` ou, sem ele, o corpo do commit), a referência e o PR.
- **Em validação** (menu do topo): PRs abertos e branches com trabalho que ainda não está na `main`, com as telas que cada um altera. As telas tocadas ganham o selo *Em validação* na lista. Branches já mescladas aparecem à parte, como "podem ser apagadas".

## Regras do time

1. Nada vai direto para a `main`. Toda mudança de tela ou fluxo entra por PR, e a validação acontece nele.
2. Preencha no PR (o modelo já traz os campos):
   ```
   Tela: CAD-02, CAD-03
   Motivo: feedback do jurídico sobre o texto do SMS
   Ref: Figma 1620:29884
   ```
3. Use **squash merge**. No GitHub, em *Settings → General → Pull Requests*, deixe a mensagem padrão do squash como *Pull request title and description*, para o texto do PR virar o commit da `main`.
4. Apague a branch depois do merge (*Automatically delete head branches*).
5. Em commits feitos direto (fora de PR), use os mesmos trailers. Modelo pronto: `git config commit.template .gitmessage`.

## Configuração no Render

| Variável | Para quê |
|---|---|
| `GITHUB_TOKEN` | Token *fine-grained*, só neste repositório: *Contents* e *Pull requests*. Leitura basta para o histórico e a aba Em validação; as propostas do modo de edição (ver `handoff/PROPOSTAS.md`) precisam de escrita. Sem ele, o hub usa o git local, que não conhece PRs. |
| `GITHUB_REPO` | `dono/repositório`. Padrão: `luizbaptistella/Hub-Onboarding`. |

O token fica só no servidor; a interface recebe apenas título, autor, datas, links e códigos de tela.
