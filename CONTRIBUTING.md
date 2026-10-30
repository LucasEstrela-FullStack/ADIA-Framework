# Como contribuir com o ADIA-Framework

Obrigado pelo interesse. Este documento define as condições para colaborar.
Ao abrir um pull request, você declara que leu e aceita estes termos.

## 1. Termos da contribuição

### 1.1 Origem do material (Certificado de Origem)

Ao contribuir, você declara que:

1. criou a contribuição, total ou parcialmente, e tem o direito de enviá-la sob
   as licenças deste projeto; ou
2. a contribuição se baseia em trabalho anterior que, até onde você sabe, está
   coberto por licença compatível, e você tem o direito de enviá-lo com as suas
   modificações; e
3. entende que a contribuição e o registro dela (incluindo seu nome e e-mail)
   são públicos e serão mantidos por tempo indeterminado.

Esses termos seguem o Developer Certificate of Origin 1.1
(<https://developercertificate.org/>). Cada commit deve trazer a linha
`Signed-off-by`, gerada com `git commit -s`:

```
Signed-off-by: Seu Nome <seu@email.com>
```

Contribuições sem essa linha não serão aceitas.

### 1.2 Licença da contribuição

- Código é licenciado sob a `AGPL-3.0-only`, a mesma do projeto.
- Textos, figuras e documentação são licenciados sob a `CC BY-NC-SA 4.0`.

Além disso, você concede aos titulares do projeto (Kauã Marques Almeida, Lucas
Abreu Estrela, Adriano Vedana Vargas e Guilherme Athayde Miguéis Alves) uma
licença não exclusiva, mundial, gratuita, irrevogável e por tempo
indeterminado para usar, modificar, publicar e sublicenciar a sua contribuição,
inclusive sob outras licenças. Essa licença permite aos titulares manter o
projeto coerente, por exemplo ao publicá-lo em eventos e periódicos ou
licenciá-lo à instituição de ensino.

### 1.3 O que continua seu

- Você continua sendo autor da sua contribuição, com os direitos morais de
  autoria previstos no art. 24 da Lei nº 9.610/1998.
- Você pode usar o seu próprio trabalho em outros projetos.
- Seu nome fica registrado no histórico do Git e, para contribuições
  relevantes, na seção de colaboradores abaixo.

### 1.4 O que a contribuição não muda

- Contribuir não torna o colaborador coautor da pesquisa nem do artigo
  científico. A autoria acadêmica segue as regras de autoria da publicação e é
  decidida pelos autores.
- Contribuir não dá direito de uso do nome "ADIA", "ADIA-Framework" ou
  "CognitiveLoop" nem do logotipo (ver [`NOTICE.md`](NOTICE.md), seção 3).

## 2. Regras de conteúdo científico

Este portal divulga uma pesquisa em andamento. Toda contribuição deve
respeitar estas regras:

1. **O artigo prevalece.** Regras, limiares e métricas seguem o artigo
   CognitiveLoop/ADIA. Divergências são corrigidas no site, não no artigo.
2. **Nada de resultado inventado.** O estudo ainda não coletou dados de
   alunos. Números projetados ou cenários hipotéticos devem aparecer sempre
   identificados como tais.
3. **Toda fonte com DOI conferido.** Referências novas precisam de DOI válido,
   conferido na Crossref (<https://search.crossref.org/>).
4. **Dados pessoais.** Não inclua dados de estudantes, nem anonimizados, sem
   aprovação do Comitê de Ética em Pesquisa e conformidade com a LGPD
   (Lei nº 13.709/2018).

## 3. Fluxo de trabalho

1. Abra uma issue descrevendo a mudança antes de começar trabalhos grandes.
2. Crie um branch a partir de `main`.
3. Antes de enviar, rode:

   ```bash
   npx tsc --noEmit
   npm run lint
   npm run build
   ```

4. Use Conventional Commits em português, por exemplo
   `feat(metricas): adiciona exemplo do IIC` ou `fix(footer): corrige link`.
5. Abra o pull request explicando o que mudou e por quê.
6. Ao menos um dos titulares revisa e aprova antes do merge.

## 4. Acessibilidade

O site deve continuar sem violações no axe-core, nos temas claro e escuro, de
320 px a 1440 px de largura, e deve respeitar a preferência "reduzir
movimento".

## 5. Colaboradores

Contribuições relevantes são creditadas aqui, com o consentimento do autor.

| Nome | Contribuição |
|---|---|
| | |
