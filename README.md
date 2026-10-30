<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/img/adia-logo-dark.png">
    <img src="public/img/adia-logo.png" alt="ADIA-Framework" width="250">
  </picture>
</p>

<p align="center"><strong>Acerto assistido não prova domínio autônomo.</strong></p>

<p align="center">
  Portal da pesquisa ADIA-Framework · UNISENAI Cuiabá · 2026
</p>

---

O ADIA-Framework é uma estratégia de tutoria com IA que mede o acerto do aluno
com e sem ajuda e só reduz a ajuda quando ele mostra que resolve sozinho. O
mecanismo central é o **CognitiveLoop**, um ciclo que compara os dois acertos e
decide o teto de ajuda do ciclo seguinte.

Este repositório contém o portal que apresenta a pesquisa. O motor do tutor
fica em outro repositório,
[ADIA-Framework-IA](https://github.com/LucasEstrela-FullStack/ADIA-Framework-IA).

> **Situação:** pesquisa em preparação. Ainda não houve coleta com estudantes.
> Os gráficos e cenários do site são ilustrativos e não representam resultados.

## O problema

Estudos recentes mostram que a IA sem limites pode atrapalhar o aprendizado.
Alunos com acesso irrestrito acertam mais durante a prática e pior na prova sem
a ferramenta (Bastani et al., 2025), passam para a IA o raciocínio que
deveriam fazer (Risko e Gilbert, 2016) e superestimam o próprio desempenho
(Fernandes et al., 2026). O acerto com ajuda, sozinho, não mostra o que o aluno
aprendeu.

## O CognitiveLoop

Cada ciclo tem três medidas:

| Sigla | Medida | Origem |
|---|---|---|
| A | Acerto com ajuda | Prática assistida, com dicas até o teto atual |
| I | Acerto sem ajuda | Desafio independente, com itens equivalentes |
| C | Confiança média declarada | Cada item sem IA, de 0 a 10, normalizado para 0 a 1 |

Delas saem o **gap** (G = A − I) e o **viés** (B = C − I). A ajuda vai de L1,
uma pergunta metacognitiva, a L4, um exemplo resolvido de problema análogo.
O tutor nunca entrega a resposta do item avaliado.

A regra segue esta ordem de prioridade. A primeira condição verdadeira decide:

| # | Condição | Decisão |
|---|---|---|
| 1 | I ≥ 0,80, G ≤ 0,25 e \|B\| ≤ 0,20 | Reduz o teto um nível |
| 2 | G > 0,25 | Mantém o teto e pede explicação do conceito |
| 3 | I < 0,40 e G ≤ 0,25 | Eleva o teto um nível |
| 4 | Demais casos | Mantém o teto |

Em qualquer caso, B > 0,25 pede uma justificativa ao aluno, sem mudar o teto.
Sem itens válidos com ou sem ajuda, a regra não decide e registra dados
insuficientes. O teto fica sempre entre L1 e L4.

A implementação usada no site está em
[`lib/cognitive-loop.ts`](lib/cognitive-loop.ts), com os seis cenários
hipotéticos (S1 a S6) do artigo.

## O que o site mostra

| Seção | Conteúdo |
|---|---|
| Desafio | Os efeitos da IA sem limites e as fontes |
| Solução | O ciclo em quatro passos e um simulador da regra, com os cenários S1 a S6 |
| Pesquisa | As três condições do estudo (suporte constante, ADIA adaptativo e fading fixo), o ciclo em seis etapas, o protótipo e os fundamentos |
| Métricas | As hipóteses H1 a H3 e os seis indicadores, com fórmula, escala e exceções |
| Documentação | Os repositórios e as 17 referências com DOI conferido na Crossref |

## Tecnologias

- [Next.js 16](https://nextjs.org) com App Router, Cache Components e React Compiler
- React 19 e TypeScript
- Tailwind CSS 4 e componentes do [shadcn/ui](https://ui.shadcn.com) sobre [Base UI](https://base-ui.com)
- [Motion](https://motion.dev) para animações e [Recharts](https://recharts.org) para o gráfico das condições
- [next-themes](https://github.com/pacocoursey/next-themes) para os temas claro e escuro

## Como rodar

Requer Node.js 20.9 ou mais recente.

```bash
npm install
npm run dev
```

O site abre em <http://localhost:3000>.

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Checagem de tipos |

> Esta versão do Next.js muda APIs e convenções em relação às anteriores.
> Antes de alterar código, consulte a documentação em `node_modules/next/dist/docs/`.

## Estrutura

```
app/            layout, página única e estilos globais
components/     seções do site, simulador e gráfico
components/ui/  componentes base (shadcn/ui sobre Base UI)
lib/            regra do CognitiveLoop, navegação e utilitários
public/img/     logotipo nas versões clara e escura
```

## Acessibilidade

O site é verificado com axe-core, sem violações nos temas claro e escuro, de
320 px a 1440 px de largura. As animações respeitam a preferência "reduzir
movimento" do sistema. O conteúdo das abas e das referências recolhidas fica no
HTML, mesmo quando não está visível.

## Autores

- Kauã Marques Almeida
- Lucas Abreu Estrela
- Adriano Vedana Vargas
- Guilherme Athayde Miguéis Alves

Orientação: Prof. Paulo Guilherme Paes da Silva. UNISENAI Cuiabá, Centro
Universitário SENAI Mato Grosso.

## Como citar

Use o botão "Cite this repository" do GitHub, que lê o
[`CITATION.cff`](CITATION.cff), ou a referência:

> ALMEIDA, Kauã Marques; ESTRELA, Lucas Abreu; VARGAS, Adriano Vedana; ALVES,
> Guilherme Athayde Miguéis. **ADIA-Framework**: tutoria com IA que reduz a
> ajuda conforme o aluno resolve sozinho. Cuiabá: UNISENAI, 2026.

## Contribuição

Leia o [`CONTRIBUTING.md`](CONTRIBUTING.md) antes de abrir um pull request.
Os commits precisam da linha `Signed-off-by` (`git commit -s`) e o conteúdo
científico deve seguir o artigo.

## Licença

- **Código:** [GNU AGPL-3.0-only](LICENSE).
- **Textos, figuras e documentação:** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br).
- **Nome "ADIA", "ADIA-Framework" e "CognitiveLoop" e logotipo:** todos os direitos reservados.

Os detalhes estão em [`NOTICE.md`](NOTICE.md).

© 2026 Kauã Marques Almeida, Lucas Abreu Estrela, Adriano Vedana Vargas e
Guilherme Athayde Miguéis Alves.
