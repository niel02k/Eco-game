# Memória do projeto

- O projeto WebDev foi inicializado como `web-static` em `/home/ubuntu/eco-thermas-game`.
- Babylon.js foi adicionado como dependência.
- A direção visual é tropical, aquática, ensolarada e cartunesca, com landscape como orientação oficial.
- A tartaruga é provisória e foi construída com meshes procedurais até existir arte oficial autorizada.
- O primeiro slice evita física realista: movimento cinemático e jatos como forças limitadas.
- O Babylon é criado dentro de `GameCanvas.tsx` por `createGameScene` e desmontado em cleanup.
- O modo `?demo` existe para capturas determinísticas.
- Os assets gerados fora da árvore do projeto ficam em `/home/ubuntu/webdev-static-assets/`; o fluxo de upload para WebDev deve ser usado antes de incorporar imagens grandes.
- Não alterar `server/` para este jogo estático.
- O próximo risco técnico é extrair a colisão e testar as habilidades sem tornar a fase instável.
