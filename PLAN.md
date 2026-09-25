# Eco Thermas: Aventura das Águas — Plano de execução

## Objetivo do slice

Entregar uma primeira fase horizontal e jogável no navegador: **O Primeiro Jato**. O jogador controla uma tartaruga provisória, atravessa três jatos, ativa um ponto de água no cais e cruza o arco de saída.

## Escopo entregue nesta etapa

- React 19 + TypeScript + Vite + Babylon.js.
- Canvas 3D em tela cheia.
- Câmera isométrica horizontal com look-ahead.
- Tartaruga provisória modelada com meshes procedurais.
- Movimento em quatro direções no plano 3D, aceleração, pulo, gravidade e resolução de colisão por eixo.
- Obstáculo de pedra contornável e caixa laranja quebrável com Giro Cascudo.
- Dois checkpoints visuais com progresso e respawn.
- Giro Cascudo com feedback visual, cooldown e controle teclado/touch.
- Três jatos com ciclos, núcleo visual, gotas e espuma.
- Água rasa, piscina profunda, boias, palmeiras e cais.
- Checkpoint intermediário.
- Ponto de água com ativação por `E` ou botão touch.
- Condição de vitória, tela final com estatísticas e reinício completo.
- HUD em português e controles para teclado/toque.
- Pausa, modo retrato jogável com recomendação visual e redução de movimento.
- Rota `?demo` para validação determinística.

## Critérios de aceite

1. A página abre em landscape com a cena 3D visível.
2. O jogador consegue mover a tartaruga nas quatro direções com WASD, setas ou touch.
3. O jogador consegue pular com espaço.
4. Os jatos são visíveis e têm partículas de água.
5. A tartaruga pode alcançar o cais e ativar o ponto de água.
6. O jogador consegue quebrar a caixa laranja com o Giro Cascudo e contornar o obstáculo de pedra.
7. Os checkpoints ativam visualmente, atualizam o HUD e definem o respawn.
8. O arco final só conclui a fase depois da ativação.
9. O HUD informa objetivo, checkpoint, estado da água, Giro Cascudo e jatos.
10. A tela de conclusão informa estatísticas da fase e permite recomeçar.
11. O botão `?` reabre as instruções.
12. A tecla Escape ou P pausa o jogo.
13. O jogo continua jogável em retrato em telas menores e mostra apenas uma recomendação visual para landscape.
14. `pnpm check` e `pnpm run build:web` passam.
15. A cena é descartada sem listeners duplicados.

## Riscos remanescentes

- A tartaruga oficial e a identidade final da marca ainda dependem de autorização e assets fornecidos pelo parque.
- A colisão da primeira fase continua cinemática; rampas, ondas, nado e física avançada ficam para fases futuras.
- A textura gerada de água está registrada em `ASSETS.md`, mas a superfície atual usa material procedural leve para manter o primeiro slice estável.
- A publicação final depende do checkpoint e do botão Publish do WebDev.

## Próximas etapas

1. Executar type-check e build.
2. Verificar visualmente em desktop landscape e mobile landscape.
3. Corrigir qualquer erro de runtime ou de interação.
4. Salvar o primeiro checkpoint somente após a validação.
5. Extrair a arena técnica de colisão para módulos `PlayerMotor` e `CollisionSystem` antes da Fase 2.
6. Criar a Fase 2 com novos obstáculos sem aumentar o escopo da Fase 1.
