# Eco Thermas: Aventura das Águas

Primeiro vertical slice jogável de um jogo 3D de plataforma e exploração aquática para navegador. O projeto usa React, TypeScript, Vite e Babylon.js, com experiência desenhada prioritariamente para orientação horizontal.

## Estado atual

A **Fase 1 — O Primeiro Jato** está implementada e jogável. O jogador controla uma tartaruga provisória em uma área tropical com piscina, três jatos, obstáculos direcionais, caixa quebrável, dois checkpoints visuais, ponto de água e arco de saída.

O slice inclui movimento em quatro direções no plano 3D, salto vertical, colisão resolvida por eixo, Giro Cascudo, quebra de obstáculos, checkpoints com respawn, câmera isométrica, partículas de água, neblina tropical, materiais emissivos, HUD, pausa, controles touch e tela de conclusão com estatísticas.

A tartaruga e parte dos elementos visuais são procedurais e provisórios. A substituição pela mascote oficial depende de autorização e fornecimento dos assets do titular da marca.

## Como executar

```bash
pnpm install
pnpm dev
```

Para validar o código e gerar a versão de produção:

```bash
pnpm check
pnpm build
```

A rota `/?demo` inicia a cena diretamente no modo de demonstração para inspeção visual automatizada. A rota `/?demo=win` abre a conclusão determinística da fase para revisão visual.

## Deploy na Vercel

O repositório possui um `vercel.json` que força o deploy como aplicação Vite estática. A configuração usa `pnpm run build:web` e publica `dist/public`. No painel da Vercel, selecione o repositório `niel02k/Eco-game`, mantenha a raiz do projeto em `/` e deixe a configuração do `vercel.json` prevalecer. Não use `server/index.ts` como entrada e não configure o projeto como uma função Node.

## Controles

| Ação | Teclado | Touch |
|---|---|---|
| Mover em 3D | `W/A/S/D` ou setas | Direcional com frente, trás, esquerda e direita |
| Pular | Espaço | `PULAR` |
| Interagir | `E` ou `Enter` | `ATIVAR` |
| Giro Cascudo | `Q` | `GIRO` |
| Pausar | `Esc` ou `P` | Botão no HUD |

O jogo foi projetado prioritariamente para landscape. Em telas móveis no modo portrait, a experiência continua jogável com controles touch; o usuário recebe apenas uma recomendação visual para girar o dispositivo quando quiser uma composição mais ampla.

## Arquitetura

React funciona como a moldura da experiência: HUD, menus, pausa, controles touch e orientação da tela. Babylon.js controla o canvas, a cena, a câmera, os meshes, os materiais e as partículas. O runtime de jogo fica em TypeScript e expõe uma API semântica para o React.

A implementação usa imports modulares do Babylon.js para reduzir o custo de build. O movimento do jogador é cinemático e determinístico. Jatos, ondas e correntes futuras devem ser implementados como volumes de gameplay com forças limitadas, enquanto os efeitos visuais permanecem em uma camada de VFX separada.

A documentação técnica está em:

- [`PLAN.md`](./PLAN.md): escopo e critérios de aceite;
- [`STRUCTURE.md`](./STRUCTURE.md): arquitetura do slice;
- [`MEMORY.md`](./MEMORY.md): decisões e descobertas;
- [`ASSETS.md`](./ASSETS.md): manifesto de assets e pendências de marca;
- [`docs/eco-thermas-plano-acao-e-prompt-mestre.md`](./docs/eco-thermas-plano-acao-e-prompt-mestre.md): plano mestre e prompt de execução.

## Pendências conhecidas

A próxima etapa deve extrair o controlador de colisão para módulos próprios e criar a Fase 2 com novas barreiras. O Giro Cascudo já está reservado como habilidade-base da Fase 1; depois disso, o projeto pode avançar para Salto de Jato, Nado Rápido e a Praia com Ondas.

O backend, login, multiplayer, loja, ranking, compras, personalização e demais sistemas fora do MVP continuam deliberadamente fora do escopo.

## Marca e assets oficiais

O uso da mascote oficial, logotipo, nomes protegidos, imagens reais e trilhas do parque depende de autorização do titular. Este repositório contém uma proposta técnica e um protótipo jogável, não uma publicação oficial do parque.
