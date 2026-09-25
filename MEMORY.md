# Memória do projeto

- O projeto WebDev foi inicializado como `web-static` em `/home/ubuntu/eco-thermas-game`.
- Babylon.js foi adicionado como dependência.
- A direção visual é tropical, aquática, ensolarada e cartunesca, com landscape como orientação oficial.
- A tartaruga é provisória e foi construída com meshes procedurais até existir arte oficial autorizada.
- O primeiro slice evita física realista: movimento cinemático, colisões por eixo e jatos como forças limitadas.
- A Fase 1 usa quatro direções de plano (X/Z) mais salto vertical. O Giro Cascudo é acionado por Q ou touch e quebra a caixa laranja.
- Há dois checkpoints visuais: o primeiro em terra define respawn intermediário; o segundo é ativado no ponto de água.
- `?demo` percorre uma sequência determinística de movimento, salto, Giro Cascudo, aproximação e interação; `?demo=win` valida a tela final.
- O Babylon é criado dentro de `GameCanvas.tsx` por `createGameScene` e desmontado em cleanup.
- O modo `?demo` existe para capturas determinísticas.
- Os assets gerados fora da árvore do projeto ficam em `/home/ubuntu/webdev-static-assets/`; o fluxo de upload para WebDev deve ser usado antes de incorporar imagens grandes.
- Não alterar `server/` para este jogo estático.
- O próximo risco técnico é extrair a colisão e o motor do jogador para módulos sem tornar a fase instável; a Fase 2 só deve começar depois dessa extração.
