# Eco Thermas: Aventura das Águas — Plano de execução

## Objetivo do slice

Entregar uma primeira fase horizontal e jogável no navegador: **O Primeiro Jato**. O jogador controla uma tartaruga provisória, atravessa três jatos, ativa um ponto de água no cais e cruza o arco de saída.

## Escopo entregue nesta etapa

- React 19 + TypeScript + Vite + Babylon.js.
- Canvas 3D em tela cheia.
- Câmera isométrica horizontal com look-ahead.
- Tartaruga provisória modelada com meshes procedurais.
- Movimento, aceleração, pulo, gravidade e colisões simples.
- Três jatos com ciclos, núcleo visual, gotas e espuma.
- Água rasa, piscina profunda, boias, palmeiras e cais.
- Checkpoint intermediário.
- Ponto de água com ativação por `E` ou botão touch.
- Condição de vitória e reinício.
- HUD em português e controles para teclado/toque.
- Pausa, modo retrato com bloqueio visual e redução de movimento.
- Rota `?demo` para validação determinística.

## Critérios de aceite

1. A página abre em landscape com a cena 3D visível.
2. O jogador consegue mover a tartaruga com A/D ou setas.
3. O jogador consegue pular com espaço.
4. Os jatos são visíveis e têm partículas de água.
5. A tartaruga pode alcançar o cais e ativar o ponto de água.
6. O arco final só conclui a fase depois da ativação.
7. O HUD informa objetivo, checkpoint e estado da água.
8. O botão `?` reabre as instruções.
9. A tecla Escape ou P pausa o jogo.
10. O jogo mostra aviso e pausa em retrato em telas menores.
11. `pnpm check` e `pnpm build` passam.
12. A cena é descartada sem listeners duplicados.

## Riscos remanescentes

- A tartaruga oficial e a identidade final da marca ainda dependem de autorização e assets fornecidos pelo parque.
- A colisão da primeira fase é deliberadamente simples; ainda não há rampas, ondas, nado ou habilidades avançadas.
- A textura gerada de água está registrada em `ASSETS.md`, mas a superfície atual usa material procedural leve para manter o primeiro slice estável.
- A publicação final depende do checkpoint e do botão Publish do WebDev.

## Próximas etapas

1. Executar type-check e build.
2. Verificar visualmente em desktop landscape e mobile landscape.
3. Corrigir qualquer erro de runtime ou de interação.
4. Salvar o primeiro checkpoint somente após a validação.
5. Implementar a arena técnica de colisão e o Giro Cascudo antes da Fase 2.
