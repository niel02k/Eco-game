# Eco Thermas: Aventura das Águas
## Plano de ação e prompt mestre de execução

**Versão:** 2.0  
**Data:** 24 de setembro de 2026  
**Base:** briefing mestre do projeto Eco Thermas: Aventura das Águas.

## 1. Diretriz principal

O projeto deve ser executado em incrementos verificáveis. Não é recomendável tentar produzir as dez fases, todos os assets e todas as habilidades em uma única etapa. A primeira meta deve ser um **vertical slice jogável**, isto é, uma pequena parte do jogo que já demonstre a experiência final: tartaruga controlável, câmera isométrica, água como mecânica, um checkpoint, uma habilidade, uma condição de vitória, HUD básico e suporte a teclado e toque.

A ordem correta é:

1. Validar a experiência central.
2. Resolver os riscos técnicos mais altos.
3. Consolidar a arquitetura.
4. Produzir a primeira fase completa.
5. Expandir as habilidades e as fases por grupos.
6. Fazer a validação final em diferentes dispositivos.
7. Publicar somente depois que o jogo estiver visualmente e tecnicamente verificável.

A regra de controle de escopo é simples: **nenhuma nova funcionalidade deve ser adicionada antes de a etapa atual estar jogável, testada e registrada**.

## 2. O que deve ser ajustado no briefing atual

O briefing está forte como documento de visão, mas precisa de cinco ajustes para se tornar uma ordem de execução eficiente.

### 2.1 Separar MVP de visão completa

As dez fases representam a visão completa da campanha, não necessariamente o primeiro incremento de desenvolvimento. O MVP recomendado deve conter:

- Hub simplificado;
- Fase 1 completa;
- Uma versão reduzida da Praia com Ondas;
- Movimento, pulo, interação e checkpoint;
- Giro Cascudo e Nado Rápido, se o risco permitir;
- HUD, pausa, vitória, falha e salvamento local;
- Teclado, toque e redução de movimento;
- Assets provisórios, mas com direção visual aprovada.

Salto de Jato, Escudo de Bolha, Boia Planadora, Correnteza Cascuda e as fases restantes devem entrar depois da validação do núcleo.

### 2.2 Definir dependências antes de produzir conteúdo

A arte oficial da tartaruga, a autorização de uso da marca e a definição dos nomes visíveis no jogo são dependências de produto. Enquanto não estiverem disponíveis, devem ser usados assets provisórios isolados, sem misturar nomes, logotipos ou imagens oficiais com conteúdo não aprovado.

### 2.3 Priorizar os riscos

Os riscos que devem ser testados primeiro são:

1. Câmera isométrica em áreas abertas.
2. Movimento, pulo e colisão.
3. Leitura visual de água, jatos, ondas e correntes.
4. Resposta ao toque em telas menores.
5. Desempenho com transparências, partículas e sombras.
6. Montagem e desmontagem segura do Babylon.js dentro do React StrictMode.

### 2.4 Criar critérios de aceite por etapa

Cada etapa precisa terminar com uma demonstração objetiva. Exemplos: “o jogador completa a Fase 1 do início ao fim”, “o checkpoint permanece ativo após uma falha”, “a câmera mostra a plataforma de destino antes do salto” e “o jogo funciona em teclado e toque sem erros no console”.

### 2.5 Evitar sistemas que não aumentam a qualidade do MVP

Não devem ser introduzidos backend, login, multiplayer, inventário, moeda, ranking, personalização, física realista, câmera livre ou carregamento de mundo aberto. Esses sistemas aumentariam o custo e o risco sem contribuir para a validação da proposta central.

## 3. Plano de ação recomendado

### Fase 0 — Preparação e decisões bloqueadoras

**Objetivo:** remover ambiguidades antes do desenvolvimento.

Confirmar o nome provisório do jogo, o status de autorização da marca, a disponibilidade da arte oficial da tartaruga e os limites de uso de nomes, imagens e referências do parque. Registrar o que é oficial, provisório ou genérico.

Também devem ser aprovados o ângulo da câmera, a paleta inicial, o formato da tela, o estilo de iluminação e a regra de que os ambientes serão uma interpretação artística, não uma reprodução documental do parque.

**Saída:** `BRIEF_APPROVED.md`, referência visual aprovada e lista de assets oficiais pendentes.

**Critério de aceite:** nenhuma decisão de marca ou direção visual essencial permanece sem responsável e sem status.

### Fase 1 — Fundação técnica

**Objetivo:** criar uma base estável para o jogo.

Criar o projeto WebDev `web-static` com React, TypeScript, Vite e Babylon.js. Integrar um canvas de tela cheia. Garantir que o engine seja criado uma única vez, que o resize funcione e que a cena seja corretamente descartada ao desmontar o componente.

Separar React, camada de jogo e Babylon.js. React deve controlar menus e HUD. A camada de jogo deve controlar regras, estados, entidades e fases. Babylon.js deve controlar cena, câmera, meshes, materiais, animações, colisões e áudio.

**Saída:** projeto inicial, `PLAN.md`, `STRUCTURE.md`, `MEMORY.md` e `ASSETS.md`.

**Critério de aceite:** a cena vazia abre, redimensiona, fecha e reabre sem engine duplicado, listener duplicado ou erro no console.

### Fase 2 — Protótipo de risco

**Objetivo:** provar a experiência central antes de produzir a campanha.

Criar uma arena pequena com uma tartaruga provisória, chão, duas plataformas, um salto, uma área de água, um jato, uma câmera isométrica e um checkpoint. Implementar teclado e controles de toque com ações semânticas, sem verificar teclas diretamente na lógica de gameplay.

A câmera deve acompanhar o jogador, manter o caminho legível e evitar que o destino do salto fique fora da tela. A colisão deve usar volumes simples e previsíveis, sem física realista.

**Critério de aceite:** uma pessoa que nunca viu o projeto consegue atravessar a arena, entender o objetivo, falhar, retornar ao checkpoint e concluir o percurso sem explicação técnica.

### Fase 3 — Vertical slice da Fase 1

**Objetivo:** construir a primeira experiência representativa do jogo.

Implementar uma versão completa da Fase 1 com entrada, ensino, prática, combinação, desafio especial, ponto de água, checkpoint e saída. O jogador deve aprender a andar, pular, interagir e observar o intervalo dos jatos.

Adicionar HUD mínimo com objetivo, checkpoint, habilidade disponível e pausa. Implementar tela de conclusão, desbloqueio da próxima fase e salvamento local.

**Critério de aceite:** a Fase 1 é concluída do início ao fim em computador e celular. A dificuldade é baixa, o caminho é visível, os jatos são legíveis e uma falha comum não reinicia a fase inteira.

### Fase 4 — Validação de água e área aberta

**Objetivo:** validar o risco visual e de desempenho mais importante do projeto.

Criar uma versão reduzida da Praia com Ondas. Implementar água rasa, uma onda demonstrativa, uma rota terrestre, um pequeno canal e uma área aberta com câmera reenquadrada. A onda deve mostrar aproximação, passagem e recuo.

Usar materiais simples, transparências limitadas, espuma clara e partículas controladas. Criar níveis de qualidade para aparelhos mais fracos.

**Critério de aceite:** a água é reconhecida como mecânica, não encobre a tartaruga, não confunde o caminho e mantém desempenho aceitável no dispositivo-alvo mais fraco disponível.

### Fase 5 — Habilidades por risco

**Objetivo:** desenvolver e validar cada habilidade antes de usá-la em uma fase completa.

A ordem recomendada é Giro Cascudo, Nado Rápido, Salto de Jato, Escudo de Bolha, Boia Planadora e Correnteza Cascuda. Cada habilidade deve ter um teste isolado com demonstração, uso prático, falha previsível e recuperação.

Não criar uma habilidade apenas como animação. Cada habilidade deve alterar uma regra de movimentação ou interação e ter pelo menos uma situação em que seja necessária, uma situação em que seja opcional e uma situação em que o uso prematuro seja compreensível para o jogador.

**Critério de aceite:** cada habilidade responde de modo previsível, possui feedback visual e sonoro, pode ser compreendida sem texto longo e não cria estados impossíveis de recuperar.

### Fase 6 — Produção da campanha

**Objetivo:** expandir o vertical slice para as dez fases.

Produzir as fases em grupos: fases 2 a 5, depois fases 6 a 8, depois fases 9 e 10. Cada grupo deve ser concluído e testado antes do próximo. As fases devem ser definidas por dados, não por lógica espalhada em componentes React.

A Fase 10 deve ser montada por setores independentes, com checkpoints entre áreas. O carregamento deve considerar somente a fase ou o setor necessário, evitando uma cena monolítica.

**Critério de aceite:** cada fase possui entrada, ensino, prática, combinação, desafio especial, ponto de água, checkpoint e saída. O desbloqueio linear e o salvamento funcionam após recarregar o navegador.

### Fase 7 — Polimento, acessibilidade e desempenho

**Objetivo:** tornar a experiência adequada para crianças, famílias e visitantes.

Adicionar redução de movimento, contraste reforçado, indicadores que não dependam apenas de cor, volume separado, textos curtos, controles de toque, pausa acessível e efeitos de água reduzidos.

Verificar também o tamanho dos assets, o número de partículas, a quantidade de materiais transparentes, as sombras e a qualidade automática. Não armazenar assets grandes diretamente na árvore de publicação; usar o armazenamento apropriado e registrar as URLs em `ASSETS.md`.

**Critério de aceite:** as opções de acessibilidade alteram efetivamente a experiência e não apenas a aparência do menu.

### Fase 8 — Homologação e publicação

**Objetivo:** validar o produto real antes da entrega.

Executar type-check, build de produção, testes de navegador, testes em teclado e toque, testes de checkpoint, falha, vitória, pausa, áudio, salvamento e acessibilidade. Fazer capturas visuais da Fase 1, da Praia com Ondas e da Fase 10.

Corrigir todos os erros do console e verificar se a cena é descartada corretamente. Salvar um checkpoint do projeto e publicar somente pelo fluxo oficial do WebDev Publish.

**Critério de aceite:** o jogo é jogável do menu ao encerramento, sem bloqueios críticos, e as capturas comprovam que os requisitos visuais estão realmente presentes.

## 4. Prompt mestre melhorado

Use o texto abaixo como prompt principal para orientar a execução em uma ferramenta de desenvolvimento ou para iniciar uma nova etapa do projeto.

```text
Você é um engenheiro sênior de jogos web, designer de sistemas e líder técnico responsável por executar o projeto “Eco Thermas: Aventura das Águas”.

CONTEXTO DO PRODUTO
Crie um jogo de plataforma e exploração 3D para navegador, com câmera isométrica, voltado para crianças, famílias e visitantes de um parque aquático. O jogador controla uma tartaruga mascote em uma aventura para reativar dez pontos de água. O jogo deve ser colorido, acolhedor, acessível, não violento e fácil de entender.

A visão completa contém dez fases lineares, um hub central, progressão por habilidades, checkpoints, água como mecânica principal, controles de teclado e toque e salvamento local. Não criar multiplayer, login, backend, chat, loja, moedas complexas, ranking obrigatório, pesca, trilhas, colecionáveis, personalização ou combate como núcleo.

STACK OBRIGATÓRIA
Use React 19, TypeScript, Vite e Babylon.js dentro de um projeto WebDev web-static. Use React para menus, HUD, pausa, telas e acessibilidade. Use Babylon.js para a cena 3D, câmera, materiais, meshes, animações, colisões, partículas e áudio. Mantenha as regras de gameplay em classes TypeScript independentes de React, dentro de `client/src/game/`.

REGRAS DE EXECUÇÃO
1. Não tente construir as dez fases de uma só vez.
2. Comece por um vertical slice jogável com uma arena pequena e depois uma Fase 1 completa.
3. Resolva primeiro os riscos de câmera, movimento, colisão, água, toque e desempenho.
4. Antes de adicionar conteúdo, faça a etapa atual funcionar, testar e registrar.
5. Após cada etapa, informe o que foi implementado, o que foi testado, os riscos restantes e o próximo passo.
6. Não invente integrações, assets oficiais, permissões de marca ou APIs que não foram fornecidos.
7. Se a arte oficial da tartaruga não estiver disponível, use uma tartaruga provisória estilizada e mantenha-a isolada para substituição posterior.
8. Não reproduza exatamente a planta real do parque. Use uma interpretação artística inspirada em áreas aquáticas.
9. Não use referências visuais, sons ou mecânicas copiadas de franquias de terceiros.
10. Não esconda erros com placeholders silenciosos. Registre limitações e proponha uma alternativa testável.

ORDEM OBRIGATÓRIA
ETAPA 0 — Preparação:
- Confirmar decisões de marca, direção visual, câmera, orientação da tela e assets oficiais disponíveis.
- Registrar decisões, pendências e riscos.

ETAPA 1 — Fundação:
- Criar o canvas Babylon em tela cheia.
- Garantir inicialização única no React StrictMode.
- Implementar resize, descarte da cena e limpeza de listeners.
- Criar `PLAN.md`, `STRUCTURE.md`, `MEMORY.md` e `ASSETS.md`.

ETAPA 2 — Protótipo de risco:
- Criar tartaruga provisória, chão, plataformas e câmera isométrica.
- Implementar movimento, pulo, colisão simples e respawn.
- Implementar teclado e toque por ações semânticas.
- Criar uma área de água e um jato com feedback visual claro.

ETAPA 3 — Vertical slice:
- Criar uma Fase 1 jogável do início ao fim.
- Incluir entrada, ensino, prática, combinação, desafio especial, checkpoint, ponto de água, saída e tela de conclusão.
- Implementar HUD mínimo, pausa e salvamento local.

ETAPA 4 — Água e desempenho:
- Criar uma versão reduzida da Praia com Ondas.
- Mostrar aproximação, passagem e recuo das ondas.
- Garantir que a água não esconda a tartaruga nem confunda o caminho.
- Criar qualidade visual automática, alta, média e baixa quando necessário.

ETAPA 5 — Habilidades:
Implementar e testar isoladamente, nesta ordem:
- Giro Cascudo;
- Nado Rápido;
- Salto de Jato;
- Escudo de Bolha;
- Boia Planadora;
- Correnteza Cascuda.

Cada habilidade deve possuir feedback visual e sonoro, resposta previsível, situação de ensino, situação prática e recuperação após erro.

ETAPA 6 — Campanha:
- Criar definições de dados para as dez fases.
- Produzir as fases 2 a 5.
- Produzir as fases 6 a 8.
- Produzir as fases 9 e 10 por setores.
- Implementar desbloqueio linear, checkpoints e telas de conclusão.

ETAPA 7 — Validação:
- Executar type-check e build de produção.
- Testar Chrome, Edge, Firefox e Safari recentes quando disponíveis.
- Testar teclado, toque, pausa, falha, checkpoint, vitória, áudio, salvamento e acessibilidade.
- Corrigir erros de console.
- Fazer capturas visuais da Fase 1, da Praia com Ondas e da Fase 10.

ARQUITETURA MÍNIMA
Use componentes e módulos equivalentes a:
- `GameCanvas.tsx`;
- `GameWorld.ts`;
- `GameState.ts`;
- `GameEvents.ts`;
- `Player.ts`;
- `InputManager.ts`;
- `CameraController.ts`;
- `CollisionSystem.ts`;
- `WaterSystem.ts`;
- `CheckpointSystem.ts`;
- `ObjectiveSystem.ts`;
- `LevelSystem.ts`;
- `SaveSystem.ts`;
- `LevelFactory.ts`;
- `LevelDefinition.ts`.

A interface não deve consultar meshes, posições ou propriedades internas da cena. Use eventos semânticos entre a camada de jogo e o HUD.

DIREÇÃO VISUAL
Use estilo tropical, aquático, cartunesco, ensolarado, familiar e legível. Use formas arredondadas, cores vivas, água com espuma e reflexos simples, vegetação, placas e elementos de parque aquático. A paleta provisória inclui azul profundo `#075477`, azul água `#12A9C4`, turquesa `#5ED9D4`, verde folha `#4DAA45`, verde mata `#176B4A`, amarelo solar `#F6C644`, laranja `#F28B28`, areia `#F2E0B6` e branco espuma `#FFFFFF`.

A cor não pode ser o único indicador de perigo ou objetivo. Combine cor com ícones, formas, animações, padrões, placas e som.

CRITÉRIOS DE QUALIDADE
Considere uma etapa concluída somente quando:
- O fluxo é jogável do início ao fim.
- O objetivo pode ser entendido sem explicação técnica.
- A câmera mostra o caminho e o destino dos saltos.
- As colisões são previsíveis.
- Falhas retornam rapidamente a um checkpoint.
- Teclado e toque funcionam.
- Não há erros no console.
- React e gameplay permanecem separados.
- A cena é descartada corretamente.
- O comportamento visual foi verificado por captura no navegador.

FORMATO DE CADA ENTREGA
Ao concluir uma etapa, responda com:
1. Resumo do que foi feito.
2. Arquivos criados ou alterados.
3. Funcionalidades jogáveis.
4. Testes executados e resultados.
5. Problemas conhecidos.
6. Decisões que precisam de aprovação.
7. Próxima etapa recomendada.

Nunca avance para a etapa seguinte se houver um erro crítico de execução, uma falha de carregamento, uma câmera inutilizável, um checkpoint inconsistente ou uma funcionalidade que só exista no código, mas não esteja visível e jogável no navegador.
```

## 5. Prompt curto para iniciar a primeira implementação

Se a ferramenta funcionar melhor com instruções menores, use esta primeira solicitação:

```text
Implemente somente a Etapa 1 e a Etapa 2 do projeto Eco Thermas: Aventura das Águas.

Crie um projeto WebDev web-static com React 19, TypeScript, Vite e Babylon.js. Integre um canvas 3D em tela cheia, com inicialização única no React StrictMode, resize correto, limpeza de listeners e descarte da cena.

Depois, crie uma arena de protótipo com uma tartaruga provisória estilizada, câmera isométrica fixa, chão, duas plataformas, movimento, pulo, colisão simples, respawn, uma área de água, um jato e um checkpoint. Implemente teclado e toque por ações semânticas. Não crie ainda as dez fases, menu complexo, backend ou assets oficiais.

Mantenha a lógica de gameplay em `client/src/game/` e React apenas como moldura. Crie também `PLAN.md`, `STRUCTURE.md`, `MEMORY.md` e `ASSETS.md`.

Antes de concluir, execute type-check, abra o jogo no navegador, verifique o fluxo de movimento, pulo, falha e respawn, e informe os arquivos alterados, os testes executados e os problemas restantes.
```

## 6. Indicadores de sucesso do projeto

O projeto estará pronto para expansão quando a Fase 1 puder ser jogada por uma pessoa sem instrução técnica, quando a Praia com Ondas comprovar que a água funciona como mecânica e quando a arquitetura permitir adicionar fases sem duplicar regras. A campanha completa somente deve ser considerada pronta quando as dez fases forem concluídas, testadas e visualmente verificadas, e não apenas quando os arquivos correspondentes existirem.

O maior indicador de qualidade não será a quantidade de sistemas implementados. Será a combinação entre **clareza, controle, recuperação após erro, legibilidade visual e estabilidade no navegador**.

## Referências

[1]: /home/ubuntu/upload/Pasted_content_05.txt "Briefing mestre do jogo Eco Thermas: Aventura das Águas"

[2]: /home/ubuntu/skills/game-dev/SKILL.md "Diretrizes do pipeline de desenvolvimento de jogos web com Babylon.js"

[3]: /home/ubuntu/skills/technical-writing/SKILL.md "Diretrizes de redação técnica"


## 7. Arquitetura técnica detalhada: React + Babylon.js

### 7.1 Princípio de responsabilidade

A arquitetura deve tratar o React como a camada de interface e o Babylon.js como a camada de renderização e simulação visual. As regras do jogo não devem ficar dentro de componentes React nem espalhadas em callbacks de eventos da interface.

A divisão recomendada é:

```text
React
├── Menu principal
├── HUD
├── Pausa
├── Seleção de fase
├── Tela de vitória e falha
├── Acessibilidade
└── Overlay de orientação da tela
        │
        │ eventos e estado público
        ▼
Game layer — TypeScript puro
├── GameWorld
├── Player
├── LevelSystem
├── InputManager
├── CollisionSystem
├── WaterSystem
├── CheckpointSystem
├── ObjectiveSystem
├── SaveSystem
└── GameEvents
        │
        │ comandos de criação e atualização
        ▼
Babylon.js
├── Engine
├── Scene
├── Camera
├── Lights
├── Meshes
├── Materials
├── Particles
├── Collisions
└── Audio
```

O React não deve consultar diretamente uma mesh para descobrir a posição do jogador. O Babylon.js também não deve alterar diretamente elementos HTML do HUD. A comunicação deve ocorrer por comandos e eventos semânticos.

### 7.2 Estrutura de diretórios recomendada

```text
client/
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/
    │   ├── GameCanvas.tsx
    │   ├── GameHUD.tsx
    │   ├── MainMenu.tsx
    │   ├── PauseMenu.tsx
    │   ├── LevelSelect.tsx
    │   ├── LevelComplete.tsx
    │   ├── AccessibilityMenu.tsx
    │   ├── OrientationGuard.tsx
    │   └── TouchControls.tsx
    ├── hooks/
    │   ├── useGameBridge.ts
    │   ├── useGameEvents.ts
    │   └── useLandscapeMode.ts
    ├── lib/
    │   ├── storage.ts
    │   ├── device.ts
    │   └── constants.ts
    └── game/
        ├── scene.ts
        ├── GameWorld.ts
        ├── GameState.ts
        ├── GameEvents.ts
        ├── GameSnapshot.ts
        ├── entities/
        │   ├── Player.ts
        │   ├── WaterPoint.ts
        │   ├── Checkpoint.ts
        │   ├── LevelExit.ts
        │   └── Hazard.ts
        ├── abilities/
        │   ├── Ability.ts
        │   ├── ShellSpin.ts
        │   ├── WaterJump.ts
        │   ├── FastSwim.ts
        │   ├── BubbleShield.ts
        │   ├── FloatRing.ts
        │   └── ShellCurrent.ts
        ├── systems/
        │   ├── InputManager.ts
        │   ├── CameraController.ts
        │   ├── CollisionSystem.ts
        │   ├── WaterSystem.ts
        │   ├── CheckpointSystem.ts
        │   ├── ObjectiveSystem.ts
        │   ├── LevelSystem.ts
        │   ├── SaveSystem.ts
        │   ├── AudioSystem.ts
        │   └── AccessibilitySystem.ts
        ├── levels/
        │   ├── LevelDefinition.ts
        │   ├── LevelFactory.ts
        │   ├── LevelRuntime.ts
        │   ├── level01.ts
        │   ├── level02.ts
        │   └── ...
        ├── rendering/
        │   ├── Materials.ts
        │   ├── Lighting.ts
        │   ├── Particles.ts
        │   ├── WaterVisuals.ts
        │   └── MeshFactory.ts
        ├── assets/
        │   ├── AssetManager.ts
        │   └── AssetManifest.ts
        └── debug/
            ├── DebugOverlay.ts
            └── DemoAutopilot.ts
```

A regra é que `components/` pode importar tipos e interfaces públicas da camada de jogo, mas a camada `game/` não deve importar componentes React.

### 7.3 Ciclo de vida do `GameCanvas`

O `GameCanvas.tsx` deve ser um componente fino. Ele cria o elemento `<canvas>`, inicia a cena uma única vez e libera todos os recursos quando o componente é desmontado.

O fluxo correto é:

1. React renderiza o canvas.
2. Um `useEffect` aguarda o canvas existir.
3. `createGameScene(canvas, options)` cria o engine, a cena e o `GameWorld`.
4. A função retorna uma API pública de controle.
5. O componente registra resize e comunicação com o React.
6. Ao desmontar, a API é destruída e a cena é liberada.

A inicialização deve ser protegida contra montagem dupla do React StrictMode. Um padrão conceitual é:

```ts
const canvasRef = useRef<HTMLCanvasElement | null>(null);
const runtimeRef = useRef<GameRuntime | null>(null);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas || runtimeRef.current) return;

  const runtime = createGameScene(canvas, options);
  runtimeRef.current = runtime;

  return () => {
    runtime.dispose();
    runtimeRef.current = null;
  };
}, [options]);
```

Na implementação real, `options` deve ser estável para evitar recriar a cena quando o React renderizar novamente. Configurações que mudam durante o jogo devem ser enviadas por métodos da API, não por reconstrução do componente.

### 7.4 API pública do runtime

O Babylon.js deve ser exposto ao React por uma API pequena e estável. Um exemplo conceitual:

```ts
export interface GameRuntime {
  start(): void;
  pause(): void;
  resume(): void;
  restartLevel(): void;
  loadLevel(levelId: string): void;
  sendAction(action: InputAction, pressed: boolean): void;
  setQuality(quality: QualityPreset): void;
  setReducedMotion(enabled: boolean): void;
  getSnapshot(): GameSnapshot;
  subscribe(listener: (snapshot: GameSnapshot) => void): () => void;
  dispose(): void;
}
```

O React deve usar essa API para pausar, iniciar a fase, enviar comandos de toque e atualizar as configurações. Ele não deve receber a `Scene`, o `Engine` ou as meshes como propriedades.

### 7.5 Loop de jogo

O loop deve separar atualização lógica e renderização. O Babylon.js fornece o ciclo de renderização, mas a atualização das regras deve ocorrer em uma ordem previsível.

Ordem recomendada por frame:

```text
1. Ler ações de entrada acumuladas.
2. Atualizar estado de pausa e transições.
3. Atualizar habilidade ativa.
4. Atualizar movimento do jogador.
5. Resolver colisões e limites.
6. Atualizar água, jatos, ondas e correntes.
7. Verificar checkpoints e objetivos.
8. Atualizar câmera.
9. Atualizar animações e efeitos visuais.
10. Publicar snapshot do estado necessário ao HUD.
11. Renderizar a cena.
```

O `GameWorld` pode centralizar a atualização:

```ts
class GameWorld {
  update(deltaSeconds: number): void {
    if (this.state.mode !== 'playing') return;

    this.inputManager.flush();
    this.player.update(deltaSeconds);
    this.collisionSystem.resolve(this.player);
    this.waterSystem.update(deltaSeconds, this.player);
    this.checkpointSystem.update(this.player);
    this.objectiveSystem.update(this.player);
    this.cameraController.update(deltaSeconds, this.player);
    this.publishSnapshotIfNeeded();
  }
}
```

O `deltaSeconds` deve ser limitado para evitar saltos enormes quando a aba retorna do segundo plano. Por exemplo, o jogo pode usar um limite de 0,05 segundo por atualização. Isso impede que uma pausa do navegador faça o jogador atravessar uma plataforma ao voltar.

### 7.6 Estado do jogo e snapshot para a interface

O estado interno pode ser rico, mas o React deve receber apenas um snapshot serializável e pequeno:

```ts
export interface GameSnapshot {
  mode: GameMode;
  levelId: string;
  levelTitle: string;
  objectiveText: string;
  activeCheckpoint: number;
  waterPointsActivated: number;
  waterPointsTotal: number;
  currentAbility: AbilityId | null;
  abilityReady: boolean;
  playerStatus: PlayerStatus;
  canPause: boolean;
}
```

O snapshot não deve ser atualizado a cada mudança de posição do jogador, pois isso faria o React renderizar excessivamente. O HUD só precisa ser notificado quando houver mudança relevante, como ativação de checkpoint, alteração do objetivo, uso da habilidade, falha ou conclusão da fase.

### 7.7 Eventos entre jogo e interface

Os eventos devem representar acontecimentos do jogo, não detalhes internos da engine:

```ts
export type GameEvent =
  | { type: 'level-started'; levelId: string }
  | { type: 'objective-updated'; text: string }
  | { type: 'checkpoint-activated'; checkpointId: string }
  | { type: 'ability-unlocked'; abilityId: AbilityId }
  | { type: 'player-failed'; reason: FailureReason }
  | { type: 'level-completed'; levelId: string }
  | { type: 'paused' }
  | { type: 'resumed' };
```

O `GameEvents` publica esses eventos. O `useGameEvents` os converte em atualizações para o HUD, menus e telas de transição. Dessa forma, alterar o tipo de mesh de um checkpoint não exige alterar o `GameHUD`.

### 7.8 Câmera isométrica para orientação horizontal

A câmera deve ser configurada para uma experiência horizontal, com enquadramento pensado para mostrar o caminho à frente e espaço lateral suficiente para o HUD e os controles virtuais.

Recomendações:

- Usar câmera ortográfica ou perspectiva reduzida;
- Manter rotação fixa na primeira versão;
- Seguir o jogador com suavização;
- Aplicar limites de deslocamento por setor;
- Reenquadrar após respawn;
- Afastar a câmera em áreas abertas;
- Evitar que o personagem fique escondido por efeitos de água;
- Reservar áreas seguras nas laterais inferiores para controles de toque;
- Não deixar objetivos importantes atrás de elementos do HUD.

Para a primeira versão, a câmera deve ser tratada como parte do level design. Cada fase precisa ser testada com o enquadramento final, e não apenas com uma câmera livre de debug.

### 7.9 Níveis definidos por dados

As fases devem ser descritas por dados e construídas pelo `LevelFactory`. Isso evita criar dez implementações independentes com regras duplicadas.

Exemplo simplificado:

```ts
export interface LevelDefinition {
  id: string;
  title: string;
  difficulty: number;
  environment: EnvironmentId;
  spawn: Vector3Data;
  checkpoints: CheckpointDefinition[];
  waterPoints: WaterPointDefinition[];
  platforms: PlatformDefinition[];
  hazards: HazardDefinition[];
  abilitiesAvailable: AbilityId[];
  objective: ObjectiveDefinition;
  exit: ExitDefinition;
}
```

A definição deve descrever o que existe na fase. A lógica de como construir os objetos deve ficar no `LevelFactory`, e a lógica de como os objetos se comportam deve ficar nos sistemas correspondentes.

A Fase 10 deve ser dividida em setores. O `LevelRuntime` pode ativar e desativar grupos de meshes conforme o jogador avança, sem destruir o checkpoint nem o estado da campanha.

### 7.10 Cena e grupos de meshes

A cena deve possuir grupos claros para facilitar descarte, depuração e otimização:

```text
scene
├── environmentRoot
├── gameplayRoot
│   ├── platformsRoot
│   ├── hazardsRoot
│   ├── waterRoot
│   └── interactablesRoot
├── playerRoot
├── effectsRoot
├── cameraRoot
├── lightingRoot
└── debugRoot
```

Cada fase deve ser criada sob um `levelRoot`. Ao trocar de fase, o `LevelSystem` libera apenas esse grupo e os recursos temporários da fase. Materiais compartilhados, como água, espuma e vegetação, devem ser reutilizados por um `MaterialRegistry`.

### 7.11 Colisão e movimentação

A primeira versão deve evitar uma simulação física complexa. O jogador pode usar um volume simples, como uma cápsula ou caixa, e as plataformas podem usar volumes de colisão simplificados, invisíveis ou visualmente alinhados às bordas.

A colisão deve distinguir:

- Piso caminhável;
- Parede;
- Borda de plataforma;
- Área de água segura;
- Corrente ou jato que aplica força;
- Área de falha;
- Interação;
- Checkpoint.

Os volumes de gameplay não devem depender da precisão visual de um modelo detalhado. Um cenário bonito com colisão irregular gera sensação de injustiça, especialmente para crianças.

### 7.12 Entrada para teclado, toque e controle horizontal

O `InputManager` deve transformar dispositivos diferentes em ações iguais:

```ts
export type InputAction =
  | 'move-up'
  | 'move-down'
  | 'move-left'
  | 'move-right'
  | 'jump'
  | 'ability'
  | 'interact'
  | 'pause';
```

No computador, usar teclado e, se desejado, controle compatível. No celular e tablet, exibir um joystick virtual ou direcional no canto inferior esquerdo e botões de pulo, habilidade e interação no canto inferior direito.

Os controles de toque devem:

- Possuir áreas grandes de toque;
- Respeitar safe areas do dispositivo;
- Não bloquear o HUD;
- Permitir pressionamento contínuo para movimento;
- Evitar exigir gestos precisos para ações críticas;
- Ser ocultados quando o dispositivo não for sensível ao toque, se possível.

### 7.13 Estratégia para jogo na horizontal

A orientação oficial do jogo deve ser **paisagem**. O CSS deve usar uma área de jogo que ocupe todo o viewport, com suporte a `env(safe-area-inset-*)` para aparelhos com notch ou barras de navegação.

A experiência recomendada é:

- Desktop: janela horizontal livre, com canvas ocupando o espaço disponível;
- Tablet: paisagem como orientação prioritária, com HUD dimensionado por viewport;
- Celular: paisagem obrigatória para jogar, com aviso quando o aparelho estiver em retrato;
- Fullscreen: tentar `screen.orientation.lock('landscape')` apenas quando o navegador permitir e após uma ação do usuário;
- Retrato: pausar o jogo e mostrar um overlay “Gire o dispositivo para jogar”.

Não se deve depender apenas de `orientation: landscape` no CSS, porque isso não força a rotação em todos os navegadores. O controle deve combinar CSS, detecção de viewport, pausa do jogo e, quando permitido, a API de orientação da tela.

Exemplo conceitual:

```ts
function isPortrait(): boolean {
  return window.matchMedia('(orientation: portrait)').matches;
}

function updateOrientationState() {
  const portrait = isPortrait();
  document.documentElement.classList.toggle('is-portrait', portrait);
  runtime?.setPausedByOrientation(portrait);
}

window.addEventListener('orientationchange', updateOrientationState);
window.addEventListener('resize', updateOrientationState);
```

O overlay deve ser responsabilidade do React. O Babylon.js deve receber apenas o comando de pausa. Dessa forma, o canvas não continua simulando água, jatos ou correntes enquanto o jogador não consegue enxergar corretamente a cena.

### 7.14 Desempenho

O jogo deve ser pensado para dispositivos móveis desde o início. As principais medidas são:

- Carregar somente a fase atual;
- Usar meshes simples e instanciadas quando possível;
- Reutilizar materiais;
- Limitar partículas e transparências;
- Evitar dezenas de luzes dinâmicas;
- Reduzir sombras em qualidade média e baixa;
- Desligar efeitos distantes;
- Reduzir detalhes da água em aparelhos fracos;
- Evitar criar e destruir objetos a cada frame;
- Usar pooling para respingos, espuma e efeitos temporários;
- Medir o tempo de frame em vez de presumir desempenho.

O `QualityManager` deve alterar configurações visuais, não regras de gameplay. Um aparelho em qualidade baixa deve continuar tendo a mesma colisão, os mesmos checkpoints e a mesma leitura de objetivos.

### 7.15 Ordem prática de implementação da arquitetura

A implementação deve seguir esta ordem técnica:

1. `GameCanvas` e ciclo de vida seguro.
2. `scene.ts`, engine, cena, câmera, luz e resize.
3. `GameWorld` com estados `booting`, `playing`, `paused`, `player-failed` e `level-complete`.
4. `InputManager` para teclado e toque.
5. `Player` com movimento, pulo e respawn.
6. `CollisionSystem` com volumes simples.
7. `CameraController` com limites e reenquadramento.
8. `LevelDefinition` e `LevelFactory` para uma arena de teste.
9. `CheckpointSystem` e `ObjectiveSystem`.
10. `WaterSystem` com um jato e uma área de água.
11. `GameEvents` e snapshot para o HUD.
12. `SaveSystem` com LocalStorage.
13. `OrientationGuard` e pausa em retrato.
14. Fase 1 completa.
15. Praia com Ondas reduzida.
16. Demais habilidades e fases.

Essa ordem reduz retrabalho porque valida primeiro o contrato entre React, Babylon.js e a camada de jogo. A expansão de conteúdo só começa depois de o contrato estar estável.

## 8. Atualização da orientação do produto

A orientação oficial do jogo foi definida como **horizontal, ou landscape**. Essa decisão altera alguns requisitos do briefing original:

- A câmera deve ser enquadrada para telas largas;
- Os níveis devem usar leitura lateral e diagonal, não apenas profundidade vertical;
- O HUD deve ocupar faixas superiores ou laterais sem cobrir o caminho;
- Os controles virtuais devem ficar nos cantos inferiores;
- O jogo deve pausar em retrato e solicitar a rotação do dispositivo;
- O teste visual deve incluir celulares em landscape, tablets em landscape e monitores desktop;
- A Fase 4, com plataformas verticais, precisa garantir que o destino permaneça visível na largura disponível;
- A Fase 10 deve ser dividida por setores com reenquadramento horizontal, evitando uma câmera excessivamente afastada.

No prompt mestre, substitua a regra genérica de “telas menores” por esta instrução:

```text
A orientação oficial do jogo é horizontal (landscape). Projete câmera, HUD, níveis e controles para telas largas. Em dispositivos móveis no modo retrato, pause o jogo e mostre um aviso para girar o aparelho. Tente bloquear a orientação para landscape apenas após uma ação do usuário e somente quando a API do navegador permitir. Nunca dependa exclusivamente do bloqueio de orientação.
```

## 9. Critérios adicionais de aceite técnico

A arquitetura será considerada correta quando:

- O React puder desmontar e remontar o `GameCanvas` sem criar dois engines;
- A troca de menu para gameplay não recriar a cena desnecessariamente;
- O HUD receber snapshots e eventos sem consultar meshes;
- O Babylon.js puder ser testado sem depender de componentes React;
- Uma fase nova puder ser criada por uma definição de dados;
- A fase atual puder ser destruída sem deixar listeners ou meshes ativos;
- O jogo pausar imediatamente em retrato;
- O retorno para landscape reative o jogo apenas quando o estado anterior permitir;
- Teclado e toque produzam as mesmas ações semânticas;
- A qualidade visual altere efeitos, mas não regras de gameplay;
- A execução horizontal seja verificada visualmente em pelo menos um celular, um tablet e um desktop.


## 10. Implementação específica de movimentação e colisão

### 10.1 Decisão técnica

Para este jogo, a melhor solução inicial é um **controlador cinemático próprio**, com colisões simples e forças de gameplay controladas. Não é necessário usar uma simulação física realista nem um sistema de corpos rígidos para toda a cena.

A tartaruga deve se mover porque o jogo determina sua velocidade e sua posição. Ela não deve ser empurrada por uma simulação imprevisível. Isso é importante porque o público inclui crianças e porque as fases dependem de timing, plataformas, jatos, ondas e correntes com comportamento repetível.

A arquitetura recomendada é:

```text
InputManager
    ↓ ações semânticas
PlayerMotor
    ↓ intenção de movimento
MotionModel
    ↓ velocidade desejada + forças da fase
CollisionSystem
    ↓ posição corrigida + contatos
PlayerStateMachine
    ↓ estado visual e habilidade
CameraController
    ↓ enquadramento horizontal
```

O sistema de física Havok ou outro motor físico pode ser considerado futuramente para efeitos específicos, mas não deve controlar o movimento principal do jogador no MVP.

### 10.2 Componentes do sistema

O sistema deve ser dividido em responsabilidades pequenas:

| Componente | Responsabilidade |
|---|---|
| `InputManager` | Converter teclado e toque em ações semânticas. |
| `PlayerMotor` | Calcular direção, aceleração, velocidade e salto. |
| `CollisionSystem` | Detectar contatos e corrigir deslocamentos. |
| `SurfaceResolver` | Identificar piso, rampa, água segura, borda e área de falha. |
| `WaterSystem` | Aplicar jatos, ondas, correntes e zonas de retorno. |
| `AbilityController` | Alterar o movimento durante giro, salto de jato, boia e correnteza. |
| `CheckpointSystem` | Armazenar e restaurar a posição segura. |
| `PlayerAnimator` | Traduzir estados de movimento em animações e efeitos. |
| `CameraController` | Seguir e reenquadrar o jogador em landscape. |

O `Player` pode ser o dono desses módulos ou coordená-los, mas não deve concentrar toda a matemática em um único arquivo.

### 10.3 Representação do jogador

A tartaruga deve possuir dois elementos diferentes:

1. **Visual:** mesh ou conjunto de meshes que representa corpo, casco, olhos e efeitos.
2. **Colisor:** volume simples e invisível usado para gameplay.

O colisor não deve ser o modelo visual detalhado. Para o MVP, pode ser uma cápsula vertical ou um cilindro aproximado. A cápsula é preferível porque reduz o risco de prender o jogador em quinas.

Parâmetros conceituais:

```ts
export interface PlayerCollider {
  radius: number;
  height: number;
  footOffset: number;
  headOffset: number;
}

export interface PlayerMotionConfig {
  maxSpeed: number;
  acceleration: number;
  deceleration: number;
  airControl: number;
  jumpSpeed: number;
  gravity: number;
  terminalVelocity: number;
  skinWidth: number;
  stepHeight: number;
}
```

`skinWidth` é uma pequena margem usada para evitar que o colisor fique matematicamente colado a uma parede. Sem essa margem, pequenas imprecisões podem produzir vibração ou travamento.

### 10.4 Coordenadas e movimento em câmera isométrica

A câmera é isométrica, mas o jogador deve se mover em um plano de mundo consistente. O input não deve movimentar a tartaruga diretamente em coordenadas arbitrárias da tela.

A opção recomendada é transformar o eixo de input em uma direção relativa à orientação fixa da câmera:

```ts
const input = new Vector2(moveX, moveY);
const cameraForward = camera.getDirection(Axis.Z);
const cameraRight = camera.getDirection(Axis.X);

cameraForward.y = 0;
cameraRight.y = 0;
cameraForward.normalize();
cameraRight.normalize();

const desired = cameraRight.scale(input.x)
  .add(cameraForward.scale(input.y));
```

Depois, o vetor deve ser normalizado para impedir que o jogador ande mais rápido na diagonal:

```ts
if (desired.lengthSquared() > 1) {
  desired.normalize();
}
```

Como a câmera não gira livremente na primeira versão, também é aceitável usar eixos fixos de fase. O importante é escolher um único contrato e aplicá-lo em todas as fases. O jogador deve perceber que “cima” no controle significa avançar no caminho, não deslocar-se de forma inesperada na tela.

### 10.5 Aceleração e desaceleração

O movimento deve usar aceleração e desaceleração, não trocar instantaneamente de velocidade. Isso melhora a sensação de controle e torna rampas, água e curvas mais previsíveis.

A velocidade horizontal desejada pode ser calculada assim:

```ts
const targetVelocity = desiredDirection.scale(maxSpeed);

velocity.x = moveTowards(
  velocity.x,
  targetVelocity.x,
  acceleration * deltaSeconds,
);

velocity.z = moveTowards(
  velocity.z,
  targetVelocity.z,
  acceleration * deltaSeconds,
);
```

Quando não houver input, usar uma desaceleração própria:

```ts
const braking = desiredDirection.lengthSquared() > 0
  ? acceleration
  : deceleration;

velocity.x = moveTowards(velocity.x, 0, braking * deltaSeconds);
velocity.z = moveTowards(velocity.z, 0, braking * deltaSeconds);
```

A função `moveTowards` deve impedir ultrapassagem do valor-alvo:

```ts
function moveTowards(current: number, target: number, maxDelta: number) {
  const delta = target - current;
  if (Math.abs(delta) <= maxDelta) return target;
  return current + Math.sign(delta) * maxDelta;
}
```

O controle deve ser ajustado para que o jogador pare em uma distância curta quando soltar o botão. Um personagem com muita inércia pode parecer escorregadio demais para o público infantil.

### 10.6 Gravidade, chão e salto

O salto deve ser controlado por velocidade vertical, não por uma animação que ignora a colisão. Um salto básico usa:

```ts
if (jumpPressed && surface.isGrounded && !abilityController.blocksJump()) {
  velocity.y = jumpSpeed;
  stateMachine.set('jumping');
}

velocity.y -= gravity * deltaSeconds;
velocity.y = Math.max(velocity.y, -terminalVelocity);
```

O chão deve ser validado por um `ground probe`, um teste curto abaixo dos pés do jogador. Esse teste informa:

- Se existe superfície abaixo;
- A normal da superfície;
- A altura do chão;
- Se a superfície é caminhável;
- Se o jogador está em uma rampa;
- Se a superfície é água segura ou área de falha.

Não se deve considerar o jogador no chão apenas porque a posição `y` está próxima de um valor. Cada plataforma pode estar em uma altura diferente.

### 10.7 Resolução de colisão por etapas

A movimentação deve ser resolvida em etapas para evitar que um deslocamento grande atravesse uma parede ou uma plataforma:

```text
1. Ler intenção de movimento.
2. Aplicar aceleração horizontal.
3. Aplicar forças da água.
4. Aplicar gravidade.
5. Dividir o deslocamento em subpassos.
6. Testar e resolver eixo horizontal.
7. Testar e resolver eixo vertical.
8. Atualizar grounded, wallContact e waterContact.
9. Verificar áreas de falha e checkpoints.
10. Atualizar a mesh visual.
```

O deslocamento deve ser dividido quando o frame estiver lento ou quando a velocidade for alta:

```ts
const displacement = velocity.scale(deltaSeconds);
const distance = displacement.length();
const steps = Math.max(1, Math.ceil(distance / maxSubstepDistance));
const step = displacement.scale(1 / steps);

for (let i = 0; i < steps; i += 1) {
  resolveHorizontal(step.x, step.z);
  resolveVertical(step.y);
}
```

Essa subdivisão é importante para o Giro Cascudo, a Correnteza Cascuda e os deslocamentos provocados por jatos. Ela reduz o risco de o jogador atravessar uma barreira entre dois frames.

### 10.8 Colisão horizontal com paredes e bordas

Para cada subpasso horizontal:

1. Calcular a posição candidata.
2. Testar o colisor contra volumes sólidos próximos.
3. Se não houver contato, aceitar a posição.
4. Se houver contato, projetar o deslocamento para fora da normal da parede.
5. Zerar ou reduzir apenas a componente da velocidade que aponta para a parede.

Conceitualmente:

```ts
const hit = collisionWorld.sweepCapsule(position, horizontalStep);

if (!hit) {
  position.addInPlace(horizontalStep);
  return;
}

position.addInPlace(hit.safeDisplacement);

const intoWall = Vector3.Dot(velocity, hit.normal);
if (intoWall < 0) {
  velocity.subtractInPlace(hit.normal.scale(intoWall));
}
```

A resposta deve permitir deslizar pela parede. Não é desejável parar completamente quando a tartaruga toca uma quina em diagonal.

As bordas de plataformas devem possuir uma regra clara. Uma borda pode ser:

- Caminhável, se houver suporte suficiente para os pés;
- Escorregadia, se a fase indicar uma rampa molhada;
- Não caminhável, se o volume de suporte terminar;
- Área de respawn, se a queda for intencionalmente segura.

### 10.9 Colisão vertical e rampas

O eixo vertical deve distinguir subida, queda e contato com o teto.

Ao descer, usar um teste para descobrir o chão mais próximo. Se o jogador estiver dentro da altura permitida para uma superfície caminhável, ajustar a posição dos pés para a altura do chão, zerar a velocidade vertical e marcar `grounded = true`.

Ao subir, testar o teto. Se houver teto, ajustar a posição abaixo da superfície e zerar a velocidade vertical positiva.

Rampas devem ser classificadas por inclinação. A normal da superfície define se ela é caminhável:

```ts
const walkable = surface.normal.y >= Math.cos(maxSlopeRadians);
```

Para este jogo, as rampas devem ser largas e previsíveis. Não é necessário suportar inclinações extremas. Rampas molhadas podem reduzir a desaceleração e aumentar a velocidade máxima, mas isso deve ser uma regra explícita do `SurfaceResolver`, não um efeito acidental da geometria.

### 10.10 Jatos como volumes de força

Um jato não deve ser uma força física genérica aplicada a qualquer mesh. Ele deve ser um volume de gameplay com direção, intensidade, duração e regra de proteção.

```ts
export interface JetVolume {
  id: string;
  bounds: BoundingBoxData;
  direction: Vector3Data;
  pushSpeed: number;
  verticalImpulse?: number;
  activePattern: WaterPattern;
  ignoresBubbleShield: boolean;
}
```

Durante a atualização:

```ts
const jet = waterSystem.getActiveJetAt(player.position);

if (jet) {
  const force = jet.direction.scale(jet.pushSpeed);
  player.addExternalVelocity(force, 'jet');

  if (jet.verticalImpulse && player.isGrounded()) {
    player.addVerticalImpulse(jet.verticalImpulse);
  }
}
```

A força deve ser limitada por uma velocidade máxima. Caso contrário, jatos sucessivos podem acumular velocidade até lançar a tartaruga para fora da fase.

O jogador deve receber feedback antes de ser empurrado: espuma, som, animação de ativação e uma indicação de direção. O jato precisa ser visível na câmera horizontal antes de entrar no seu volume.

### 10.11 Ondas e água rasa

A onda deve ser modelada como um volume que se desloca por uma rota conhecida. Ela possui uma frente, uma zona de impacto e uma zona de recuo.

```text
onda
├── aproximação: feedback visual e sonoro
├── impacto: aplica empurrão ou altera estado
└── recuo: libera a passagem e atualiza o fluxo
```

A onda não deve depender de uma malha animada para detectar o jogador. A malha é visual; a colisão é um volume invisível sincronizado com o tempo da onda.

A água rasa deve ser uma superfície ou volume com propriedades próprias:

```ts
export interface SurfaceProperties {
  kind: 'ground' | 'wet-floor' | 'shallow-water' | 'current' | 'hazard';
  movementMultiplier: number;
  jumpMultiplier: number;
  friction: number;
  swimAllowed: boolean;
  lethal: boolean;
}
```

Assim, a água pode reduzir a velocidade ou ativar o estado de nado sem precisar trocar toda a lógica de colisão.

### 10.12 Correntes

Correntes devem ser volumes direcionais. O jogador continua controlável, mas recebe uma velocidade adicional limitada:

```ts
const currentVelocity = current.direction.scale(current.speed);
player.addExternalVelocity(currentVelocity, 'current');
```

A corrente não deve teletransportar o jogador. O jogador precisa poder sair dela quando houver uma rota terrestre ou uma área segura. Para a Boia Planadora, a corrente pode controlar parcialmente a direção, mas deve conservar uma margem de correção pelo input.

A direção da corrente deve ser indicada por espuma, setas, partículas e movimento da água. Não depender somente da cor.

### 10.13 Estados de movimento

O jogador deve usar uma máquina de estados simples, porque pular, nadar, girar e usar a boia possuem regras diferentes.

Estados recomendados:

```text
idle
walking
running
jumping
falling
sliding
swimming
shell-spinning
water-jumping
bubble-shield
floating
current-riding
respawning
celebrating
```

Cada estado deve declarar:

- Se aceita movimento normal;
- Se aceita pulo;
- Se aceita habilidade;
- Se pode ser interrompido;
- Qual colisor usa;
- Qual animação toca;
- Como termina;
- Qual velocidade máxima permite.

Exemplo:

```ts
interface MovementState {
  enter(): void;
  update(deltaSeconds: number): void;
  exit(): void;
  canJump(): boolean;
  canUseAbility(): boolean;
}
```

O estado não deve ser trocado apenas por uma animação. A regra de gameplay vem primeiro; a animação acompanha o estado real.

### 10.14 Giro Cascudo

O Giro Cascudo deve usar um modo de movimento próprio, com duração limitada, direção travada ou parcialmente ajustável e colisão especial contra barreiras frágeis.

Regras sugeridas:

- Ativar somente no chão ou em uma rampa permitida;
- Conservar uma velocidade inicial definida;
- Permitir correção horizontal moderada;
- Ignorar pequenas colisões laterais;
- Quebrar somente objetos marcados como `breakable = true`;
- Encerrar ao atingir parede forte, perder velocidade ou terminar o tempo;
- Não permitir atravessar barreiras sólidas.

A barreira frágil deve receber um evento de impacto, e não ser destruída porque duas meshes se sobrepuseram:

```ts
if (player.isShellSpinning() && hit.target.isBreakable) {
  hit.target.break({ source: 'shell-spin' });
}
```

### 10.15 Salto de Jato

O Salto de Jato deve ser uma sequência controlada de impulsos verticais. O volume do jato define quando o jogador pode ativá-lo. A habilidade não deve depender de uma física de fluido real.

Fluxo:

1. Detectar o jogador em um jato vertical ativo.
2. Mostrar indicação de ativação.
3. Aplicar impulso vertical limitado.
4. Permitir controle horizontal reduzido.
5. Detectar pouso em plataforma válida.
6. Encerrar ou permitir o próximo salto conforme a fase.

A plataforma de destino deve permanecer dentro da área visível da câmera horizontal. Se isso não for possível, a fase precisa usar um reenquadramento ou uma plataforma intermediária.

### 10.16 Nado Rápido

O nado deve substituir parcialmente o motor terrestre, não apenas aumentar a velocidade em qualquer lugar. O jogador só pode nadar em volumes marcados como `swimAllowed`.

No nado:

- A gravidade deve ser reduzida ou suspensa;
- A velocidade vertical deve ser controlada por input ou por uma altura-alvo;
- A aceleração deve ser mais suave;
- Correntes devem aplicar força limitada;
- A saída da água deve exigir uma borda ou ponto de transição válido.

O jogador não deve ficar preso na borda entre água e terra. Cada transição precisa ter uma área de saída explícita, com altura máxima permitida.

### 10.17 Escudo de Bolha

O Escudo de Bolha deve ser uma regra de proteção, não um aumento genérico de vida. Ele pode impedir um empurrão ou reduzir o efeito de uma zona de jatos durante sua duração.

```ts
const response = waterSystem.getHazardResponse(player, hazard);

if (player.hasBubbleShield() && response.canBeBlocked) {
  response.force = response.force.scale(0.15);
  response.causesFailure = false;
}
```

A bolha precisa informar visualmente quanto tempo resta. O jogador deve ter tempo suficiente para aprender o uso antes do corredor mais difícil.

### 10.18 Boia Planadora

A boia deve usar um motor de movimento com velocidade reduzida, gravidade menor e resistência lateral. Ela não deve funcionar como uma plataforma física solta.

Modelo sugerido:

```ts
floatVelocity.y = approach(floatVelocity.y, targetVerticalSpeed, buoyancy * dt);
floatVelocity.x = approach(floatVelocity.x, desiredX, steering * dt);
floatVelocity.z = approach(floatVelocity.z, desiredZ, steering * dt);
```

A corrente pode alterar o vetor desejado, mas o jogador deve manter algum controle. O contato com uma plataforma segura deve encerrar o estado de flutuação de modo previsível.

### 10.19 Respawn e checkpoints

O checkpoint deve salvar uma fotografia lógica do estado, não apenas uma posição:

```ts
export interface CheckpointSnapshot {
  checkpointId: string;
  position: Vector3Data;
  rotationY: number;
  activeWaterPoints: string[];
  levelFlags: Record<string, boolean>;
  availableAbilities: AbilityId[];
}
```

Ao falhar:

1. Bloquear input durante a transição.
2. Tocar feedback curto de falha.
3. Limpar forças externas.
4. Restaurar posição e rotação.
5. Restaurar o estado da fase necessário.
6. Reenquadrar a câmera.
7. Liberar input após a tartaruga estar estável.

Não deve haver um frame em que a tartaruga apareça fora da fase antes da câmera chegar ao checkpoint.

### 10.20 Detecção de falha

As áreas de falha devem ser volumes explícitos. Não usar apenas “caiu abaixo de `y = 0`”, porque fases horizontais podem ter diferentes alturas e setores.

Tipos de falha:

- `fell-from-level`;
- `hit-strong-current`;
- `missed-wave-route`;
- `left-playable-area`;
- `ability-timeout`;
- `hazard-contact`.

Cada falha deve ter uma resposta curta e recuperável. Uma falha comum nunca deve apagar o progresso dos checkpoints já ativados.

### 10.21 Integração com a câmera horizontal

O movimento e a câmera devem ser testados juntos. Quando o jogador se aproxima de uma borda, a câmera deve antecipar parcialmente o caminho, sem revelar áreas que possam confundir o objetivo.

Regras recomendadas:

- Aplicar look-ahead na direção do movimento;
- Limitar o look-ahead para não deixar o jogador pequeno demais;
- Usar limites por setor da fase;
- Reenquadrar depois de uma habilidade vertical;
- Manter os controles de toque fora da área importante da cena;
- Não mover a câmera bruscamente ao receber um empurrão de jato;
- Reduzir o deslocamento de câmera quando “redução de movimento” estiver ativa.

### 10.22 Testes específicos de movimentação e colisão

Antes de produzir as dez fases, criar uma arena de testes com casos isolados:

1. Caminhar contra uma parede.
2. Deslizar diagonalmente pela parede.
3. Pular sob um teto.
4. Cair sobre uma plataforma.
5. Pousar na borda de uma plataforma.
6. Descer uma rampa.
7. Subir uma rampa.
8. Entrar e sair de água rasa.
9. Ser empurrado por um jato.
10. Resistir a um jato com bolha.
11. Entrar e sair de uma corrente.
12. Usar Giro Cascudo em barreira frágil.
13. Atravessar um vão com Boia Planadora.
14. Falhar e retornar ao checkpoint.
15. Rotacionar o celular para retrato durante o movimento.
16. Retornar para landscape e continuar sem duplicar input.

Critérios mínimos:

- A tartaruga nunca atravessa uma parede sólida.
- A tartaruga nunca fica presa em uma quina comum.
- O salto não depende de um frame específico.
- A velocidade diagonal não é maior que a velocidade cardinal.
- Jatos e correntes têm limite de força.
- O respawn remove forças externas anteriores.
- O checkpoint é restaurado sem perda indevida de progresso.
- O modo retrato pausa a simulação.
- O retorno para landscape não duplica listeners.
- O mesmo comando funciona de modo equivalente no teclado e no toque.

### 10.23 Ordem de implementação do sistema

A implementação prática deve seguir esta sequência:

1. Input semântico.
2. Movimento horizontal em plano sem obstáculos.
3. Aceleração e desaceleração.
4. Gravidade e pulo.
5. Colisão com piso, paredes e teto.
6. Rampas e ground probe.
7. Áreas de queda e respawn.
8. Checkpoints.
9. Jatos.
10. Água rasa e nado.
11. Ondas.
12. Correntes.
13. Giro Cascudo.
14. Salto de Jato.
15. Escudo de Bolha.
16. Boia Planadora.
17. Correnteza Cascuda.
18. Integração final com câmera e controles horizontais.

Só depois que os itens 1 a 8 estiverem estáveis a equipe deve começar a usar a Fase 1 como conteúdo definitivo. Os itens 9 a 17 podem ser validados em pequenas arenas antes de serem incorporados às fases da campanha.

## 11. Bloco adicional para o prompt mestre

Adicionar este bloco ao prompt principal do projeto:

```text
MOVIMENTAÇÃO E COLISÃO
Use um controlador cinemático próprio para a tartaruga. Não use física realista ou corpos rígidos para controlar o jogador no MVP. O movimento deve ser determinístico, previsível e adequado para crianças.

Separe o mesh visual do colisor. Use cápsula ou volume simples para o jogador. Implemente aceleração, desaceleração, gravidade, velocidade terminal, pulo, ground probe, rampas e resolução de colisão por subpassos. Não permita atravessar paredes, plataformas ou barreiras durante deslocamentos rápidos.

Transforme teclado e toque em ações semânticas. Normalize o movimento diagonal. Em câmera isométrica fixa, converta o input para a orientação da câmera ou para os eixos fixos da fase, usando uma única regra consistente.

Trate jatos, ondas e correntes como volumes de gameplay com direção, intensidade, duração e limite de velocidade. A malha visual da água não deve ser usada sozinha para detectar colisão. A água rasa, as correntes e as áreas de falha devem possuir propriedades explícitas.

Use uma máquina de estados para idle, caminhada, corrida, salto, queda, nado, Giro Cascudo, Salto de Jato, Escudo de Bolha, Boia Planadora, Correnteza Cascuda, respawn e comemoração. Cada estado deve declarar quais ações aceita e como termina.

Os checkpoints devem salvar posição, rotação, pontos de água ativados e flags necessárias da fase. Ao falhar, remova forças externas, restaure o checkpoint, reenquadre a câmera e só então libere o input.

O jogo é horizontal. Teste câmera, colisão, controles e HUD em landscape. Em portrait, pause a simulação e mostre um aviso para girar o dispositivo.

Antes de criar as dez fases, valide uma arena de colisão com paredes, rampas, plataformas, água rasa, jatos, correntes, respawn, Giro Cascudo e Boia Planadora. Capture evidência visual no navegador e execute type-check e build.
```


## 12. Sistema de partículas e efeitos visuais de água e jatos

### 12.1 Princípio geral

A água não deve ser implementada como um único efeito complexo. Para manter desempenho, legibilidade e controle em telas horizontais, separar a apresentação em camadas independentes:

```text
Água visual
├── Superfície ou volume principal
├── Movimento de material ou textura
├── Espuma de borda
├── Partículas contínuas
├── Partículas de impacto
├── Decalques ou marcas temporárias
├── Som sincronizado
└── Resposta de gameplay
```

A geometria e as partículas representam o que o jogador vê. O `WaterSystem` representa o que realmente acontece com o jogador. Um respingo visual não deve ser usado como detector de colisão, e um jato invisível não deve aplicar força sem possuir uma indicação visual correspondente.

### 12.2 Tipos de efeito necessários

O projeto pode começar com os seguintes efeitos reutilizáveis:

| Efeito | Uso | Tipo recomendado |
|---|---|---|
| `WaterSurface` | Piscinas, canais e áreas rasas | Mesh simples com material animado |
| `FoamLine` | Bordas, ondas e jatos | Faixa de mesh ou partículas leves |
| `JetColumn` | Jato vertical ou lateral | Mesh cilíndrica + partículas contínuas |
| `SplashBurst` | Impacto de personagem ou objeto | Emissor de partículas em rajada |
| `DropletTrail` | Rastro de água durante movimento | Partículas de curta duração |
| `WaveFront` | Frente de uma onda | Mesh animada + espuma |
| `CurrentFlow` | Correnteza | Partículas direcionais ou faixas animadas |
| `BubbleShieldFx` | Escudo de bolha | Esfera transparente + bolhas pequenas |
| `WaterPointActivation` | Ativação do objetivo | Anel, gotas, brilho e som |
| `VictoryFountain` | Celebração final | Emissores em rajada e colunas de água |

Esses efeitos devem ser criados por fábricas ou um `VfxManager`. Não criar manualmente um novo sistema de partículas dentro de cada fase.

### 12.3 Organização de código

Adicionar a seguinte estrutura:

```text
client/src/game/
├── vfx/
│   ├── VfxManager.ts
│   ├── VfxProfile.ts
│   ├── ParticleFactory.ts
│   ├── TextureAtlas.ts
│   ├── WaterSurfaceFx.ts
│   ├── JetFx.ts
│   ├── SplashFx.ts
│   ├── FoamFx.ts
│   ├── CurrentFx.ts
│   ├── BubbleShieldFx.ts
│   └── FountainCelebrationFx.ts
├── rendering/
│   ├── Materials.ts
│   ├── WaterMaterials.ts
│   ├── Lighting.ts
│   └── MeshFactory.ts
└── systems/
    ├── WaterSystem.ts
    └── QualityManager.ts
```

O `WaterSystem` informa eventos e estado. O `VfxManager` decide como apresentar o efeito. Isso permite reduzir partículas ou desativar espuma sem alterar a lógica de jatos e correntes.

### 12.4 Camada 1 — superfície da água

A superfície da água deve começar com uma geometria simples, como um plano subdividido ou uma caixa rasa. Para o MVP, não é necessário simular ondas reais com física de fluidos.

A aparência pode ser obtida com:

- Material azul-turquesa;
- Transparência moderada;
- Textura de ruído ou ondas em movimento;
- Reflexo simples ou brilho especular controlado;
- Variação de cor por profundidade;
- Faixas de espuma nas bordas;
- Pequeno deslocamento de vértices, se o desempenho permitir.

O material não deve ser excessivamente transparente. Em um jogo infantil com câmera isométrica, o jogador precisa identificar onde pode andar e onde pode cair.

Uma superfície de água pode ser criada por uma classe própria:

```ts
export interface WaterSurfaceConfig {
  size: Vector2;
  height: number;
  color: Color3;
  opacity: number;
  flowDirection: Vector2;
  flowSpeed: number;
  foamEnabled: boolean;
  quality: QualityPreset;
}
```

A textura animada deve ser atualizada por parâmetros de material, como offset ou tempo, e não por recriação de textura a cada frame.

### 12.5 Camada 2 — espuma de borda

A espuma ajuda o jogador a entender limites e direção. Ela pode ser criada de três formas, em ordem de preferência para o MVP:

1. Faixas de mesh posicionadas nas bordas da água;
2. Planos pequenos com textura de espuma e transparência aditiva ou alpha blend;
3. Partículas para espuma que se desloca em trechos de corrente.

A espuma de borda deve ser orientada para a câmera quando for um billboard. Em trechos com geometria fixa, uma faixa de mesh é mais barata e mais estável que centenas de partículas.

A espuma deve aumentar em:

- Frente de uma onda;
- Saída de um jato;
- Bordas de uma queda d’água;
- Áreas de corrente;
- Local de pouso ou impacto.

### 12.6 Camada 3 — partículas contínuas

Partículas contínuas representam vapor de água, respingos pequenos, gotas de jatos e movimento de corrente. Elas devem ter vida curta, emitters limitados e textura compartilhada.

No Babylon.js, usar `ParticleSystem` como caminho compatível e `GPUParticleSystem` quando a capacidade do dispositivo permitir. A escolha deve ser encapsulada no `ParticleFactory`, e o restante do jogo não deve depender de uma implementação específica.

Estrutura conceitual:

```ts
export interface ParticleProfile {
  name: string;
  capacity: number;
  emitRate: number;
  minLifeTime: number;
  maxLifeTime: number;
  minSize: number;
  maxSize: number;
  minPower: number;
  maxPower: number;
  colorStart: Color4;
  colorEnd: Color4;
  gravity: Vector3;
  blendMode: number;
  textureKey: string;
}
```

Perfis iniciais:

```ts
const waterDroplets: ParticleProfile = {
  name: 'water-droplets',
  capacity: 80,
  emitRate: 24,
  minLifeTime: 0.25,
  maxLifeTime: 0.7,
  minSize: 0.035,
  maxSize: 0.11,
  minPower: 0.4,
  maxPower: 1.1,
  colorStart: new Color4(0.75, 0.98, 1.0, 0.8),
  colorEnd: new Color4(0.4, 0.85, 0.95, 0.0),
  gravity: new Vector3(0, -2.2, 0),
  blendMode: ParticleSystem.BLENDMODE_STANDARD,
  textureKey: 'water-soft',
};
```

Os valores são referências iniciais. Devem ser ajustados por captura visual no navegador, não apenas por inspeção do código.

### 12.7 Fábrica de partículas

A fábrica deve centralizar textura, capacidade, blend mode e regras de qualidade:

```ts
class ParticleFactory {
  constructor(
    private readonly scene: Scene,
    private readonly textureAtlas: TextureAtlas,
    private readonly qualityManager: QualityManager,
  ) {}

  createContinuous(profile: ParticleProfile, emitter: Node): ParticleSystem {
    const quality = this.qualityManager.getParticleScale();
    const system = new ParticleSystem(
      profile.name,
      Math.max(8, Math.floor(profile.capacity * quality)),
      this.scene,
    );

    system.particleTexture = this.textureAtlas.get(profile.textureKey);
    system.emitter = emitter;
    system.emitRate = Math.floor(profile.emitRate * quality);
    system.minLifeTime = profile.minLifeTime;
    system.maxLifeTime = profile.maxLifeTime;
    system.minSize = profile.minSize;
    system.maxSize = profile.maxSize;
    system.minEmitPower = profile.minPower;
    system.maxEmitPower = profile.maxPower;
    system.gravity = profile.gravity;
    system.color1 = profile.colorStart;
    system.color2 = profile.colorEnd;
    system.blendMode = profile.blendMode;

    return system;
  }
}
```

Em uma implementação real, propriedades que variam por dispositivo devem ser aplicadas por um método de configuração, evitando que cada efeito conheça as regras de qualidade.

### 12.8 Texturas e atlas

Usar poucas texturas pequenas e reutilizáveis:

```text
water-soft.png       gota suave e espuma difusa
water-streak.png     faixa direcional para jatos
splash-star.png      impacto radial
foam-cloud.png       espuma arredondada
bubble-soft.png      bolha transparente
sparkle-soft.png     brilho de ativação
```

As texturas podem ser reunidas em um atlas para reduzir trocas de material. Todas devem possuir fundo transparente e bordas suaves para evitar quadrados visíveis.

Não criar uma textura exclusiva para cada jato. O jato deve variar por direção, escala, cor e perfil de emissão.

### 12.9 Efeito de jato

Um jato deve combinar quatro elementos:

```text
JetFx
├── núcleo visual do jato
├── gotas contínuas
├── espuma na origem ou no impacto
└── estado de ativação sincronizado com o gameplay
```

O núcleo pode ser um cilindro ou cone alongado com material translúcido. Para um jato vertical, partículas devem sair com velocidade para cima e leve dispersão lateral. Para um jato horizontal, a direção deve ser rotacionada com o emissor.

```ts
class JetFx {
  private readonly droplets: ParticleSystem;
  private readonly foam: ParticleSystem;
  private readonly core: Mesh;

  setActive(active: boolean): void {
    if (active) {
      this.core.setEnabled(true);
      this.droplets.start();
      this.foam.start();
    } else {
      this.core.setEnabled(false);
      this.droplets.stop();
      this.foam.stop();
    }
  }

  dispose(): void {
    this.droplets.dispose();
    this.foam.dispose();
    this.core.dispose(false, true);
  }
}
```

A ativação visual deve ocorrer alguns instantes antes do pico de força, ou possuir uma animação de carregamento curta. Isso dá ao jogador uma oportunidade de compreender o perigo.

O `JetFx` não decide se o jogador será empurrado. O `WaterSystem` decide a força; o `JetFx` apenas acompanha o estado do jato.

### 12.10 Respingo de impacto

Respingo é um efeito de curta duração e deve ser tratado como um efeito reutilizável de rajada. Exemplos de gatilho:

- Pouso da tartaruga na água;
- Entrada no canal de nado;
- Saída da água;
- Impacto de onda;
- Ativação de ponto de água;
- Queda de uma pequena plataforma;
- Quebra por Giro Cascudo.

O `SplashFx` pode receber posição, normal e intensidade:

```ts
interface SplashRequest {
  position: Vector3;
  normal: Vector3;
  intensity: 'small' | 'medium' | 'large';
  direction?: Vector3;
}
```

A normal deve orientar a emissão. Um respingo em uma superfície horizontal se abre para cima; um respingo contra uma parede deve se espalhar lateralmente.

Para evitar criar e destruir sistemas a todo momento, usar um pool:

```ts
class SplashPool {
  private readonly available: SplashFx[] = [];
  private readonly active: SplashFx[] = [];

  play(request: SplashRequest): void {
    const effect = this.available.pop() ?? this.createEffect();
    effect.play(request, () => {
      this.active.splice(this.active.indexOf(effect), 1);
      this.available.push(effect);
    });
    this.active.push(effect);
  }
}
```

Se a versão específica do Babylon oferecer emissão manual de partículas, usar uma rajada em um sistema pré-alocado. Caso contrário, controlar `start`, `stop`, tempo de vida e reinicialização do emissor no próprio `SplashFx`.

### 12.11 Ondas

A onda deve ser dividida em uma camada de gameplay e três camadas visuais:

```text
Wave
├── volume de impacto invisível
├── malha da frente da onda
├── espuma da crista
├── gotas projetadas
└── áudio de aproximação e impacto
```

A malha visual pode ser deslocada ao longo de um spline simples ou de um eixo da fase. O volume de impacto deve seguir a mesma trajetória, mas pode ser um box ou cápsula alongada.

Estados visuais:

```text
idle
building
approaching
impacting
receding
cooldown
```

A onda precisa fornecer sinais antecipados:

- Aumento de espuma;
- Som crescente;
- Mudança de cor ou brilho;
- Sombra ou faixa de água avançando;
- Pequenas gotas antes da frente principal.

O jogador nunca deve sofrer o impacto sem que a frente da onda esteja visível na câmera horizontal.

### 12.12 Correntes e partículas direcionais

Correntes podem usar uma faixa de espuma animada e pequenas partículas alongadas. A direção deve ser evidente mesmo quando o jogador está parado.

Configuração conceitual:

```ts
interface CurrentFxConfig {
  direction: Vector3;
  length: number;
  width: number;
  particleSpeed: number;
  emitRate: number;
  foamDensity: number;
}
```

A partícula deve nascer na origem, viajar na direção da corrente e desaparecer após uma distância curta. Não é necessário fazer cada partícula colidir com o cenário.

O vetor visual e o vetor de gameplay devem compartilhar a mesma configuração de direção. Se a espuma indica fluxo para a esquerda, a força aplicada ao jogador não pode empurrá-lo para a direita.

### 12.13 Bubble Shield

O Escudo de Bolha deve combinar:

- Esfera ou elipsoide transparente ao redor da tartaruga;
- Pequenas bolhas em movimento;
- Brilho suave na borda;
- Anel ou indicador de duração;
- Som curto de ativação;
- Efeito de distorção somente em qualidade alta, se o custo permitir.

Evitar transparências excessivas. Em mobile, a bolha pode usar um material alpha simples e duas ou três partículas orbitais. O efeito visual não deve cobrir o rosto ou o casco da tartaruga.

O tempo restante deve ser indicado por mudança gradual de escala, intensidade ou um anel no HUD. Não usar apenas mudança de cor, pois a acessibilidade exige indicadores além de cor.

### 12.14 Ativação de pontos de água

A ativação de um ponto de água deve ser um evento visual importante, mas curto:

```text
1. Botão ou ponto começa a emitir brilho.
2. Anel de água expande.
3. Gotas sobem em pequena rajada.
4. Fonte ou fluxo próximo é ativado.
5. HUD recebe evento de objetivo atualizado.
6. Som de confirmação toca.
```

O efeito deve ser reutilizável e parametrizado por cor de objetivo. O evento de gameplay deve ocorrer uma única vez, mesmo que a área seja carregada ou descarregada novamente.

### 12.15 Celebração final

A celebração da Fase 10 deve usar os mesmos componentes da campanha em uma escala maior, não um sistema completamente diferente. Reutilizar:

- Jatos;
- Splash bursts;
- Espuma;
- Bolhas;
- Pontos de água;
- Anéis de ativação.

A celebração deve ser limitada por duração e capacidade. Em dispositivos de baixa qualidade, reduzir a quantidade de partículas e manter apenas as silhuetas principais das fontes.

### 12.16 Materiais e transparência

Água e partículas precisam de cuidado porque transparência é uma das partes mais caras e visualmente instáveis do WebGL.

Recomendações:

- Reutilizar materiais sempre que possível;
- Evitar muitas camadas transparentes sobrepostas;
- Usar alpha test ou materiais opacos com textura quando a transparência suave não for necessária;
- Evitar dezenas de partículas grandes sobre a tartaruga;
- Manter a espuma branca em contraste com água azul;
- Desativar reflexos complexos em qualidade média e baixa;
- Não usar pós-processamento obrigatório para tornar a água legível.

Os efeitos devem continuar compreensíveis mesmo que o navegador não suporte o nível visual mais alto.

### 12.17 Qualidade visual adaptativa

O `QualityManager` deve controlar efeitos por perfil:

```ts
export type QualityPreset = 'low' | 'medium' | 'high';

interface VfxQualityConfig {
  particleMultiplier: number;
  maxActiveSystems: number;
  enableRefraction: boolean;
  enableDistortion: boolean;
  enableFoamParticles: boolean;
  waterResolution: number;
  shadowQuality: number;
}
```

Configuração sugerida:

| Recurso | Baixa | Média | Alta |
|---|---:|---:|---:|
| Partículas | 35% | 70% | 100% |
| Espuma dinâmica | Não ou reduzida | Simples | Completa |
| Distorção | Não | Não | Opcional |
| Reflexo complexo | Não | Não | Opcional |
| Sombras | Baixas | Médias | Altas |
| Splash simultâneo | 2 | 5 | 8 |

O sistema deve possuir um limite global de efeitos ativos. Se muitos jatos e respingos ocorrerem ao mesmo tempo, priorizar o efeito mais próximo da câmera e descartar efeitos decorativos distantes.

### 12.18 Atualização por distância da câmera

Efeitos fora da área visível ou muito distantes devem ter sua emissão reduzida. O `VfxManager` pode calcular uma prioridade simples:

```ts
const distance = Vector3.DistanceSquared(effect.position, camera.position);
const visible = frustum.isPointInFrustum(effect.position);

if (!visible || distance > farEffectDistanceSquared) {
  effect.setEmissionScale(0);
} else if (distance > mediumEffectDistanceSquared) {
  effect.setEmissionScale(0.35);
} else {
  effect.setEmissionScale(1);
}
```

Essa otimização é especialmente importante na Fase 10, que combina vários setores e efeitos de água.

### 12.19 Sincronização com gameplay e áudio

O efeito visual deve acompanhar eventos do jogo, não detectar sozinho o que aconteceu. Exemplos:

```ts
waterSystem.on('jet-activated', event => {
  vfxManager.playJet(event.jetId);
  audioSystem.play('jet-start');
});

waterSystem.on('wave-impact', event => {
  vfxManager.playWaveImpact(event.position, event.normal);
  audioSystem.play('wave-impact');
});

player.on('entered-water', event => {
  vfxManager.playSplash(event.position, event.intensity);
  audioSystem.play('water-entry');
});
```

O áudio deve ser limitado por prioridade para evitar uma sequência confusa de sons. O efeito visual e o áudio precisam usar o mesmo evento semântico, com pequenos offsets apenas quando necessário para dar sensação de antecipação.

### 12.20 Descarte e limpeza

Todo efeito deve possuir `dispose()`. Sistemas de partículas, texturas criadas dinamicamente, meshes auxiliares e observables precisam ser liberados ao trocar de fase ou destruir a cena.

O `VfxManager` deve manter uma lista de recursos próprios:

```ts
class VfxManager {
  private readonly ownedSystems = new Set<ParticleSystem>();
  private readonly ownedMeshes = new Set<Mesh>();
  private readonly observers: Observer<Scene>[] = [];

  dispose(): void {
    for (const observer of this.observers) observer.remove();
    for (const system of this.ownedSystems) system.dispose();
    for (const mesh of this.ownedMeshes) mesh.dispose(false, true);
    this.observers.clear();
    this.ownedSystems.clear();
    this.ownedMeshes.clear();
  }
}
```

Listeners de `window`, `document` e controles de toque não são necessariamente removidos pela disposição da cena. A camada que os criou deve removê-los explicitamente.

### 12.21 Ordem de implementação dos efeitos

Implementar os efeitos nesta ordem:

1. Material simples da superfície da água.
2. Espuma estática nas bordas.
3. Gotas contínuas de um único jato.
4. Splash de entrada na água.
5. Perfil de qualidade baixa, média e alta.
6. Efeito de ativação do ponto de água.
7. Corrente com partículas direcionais.
8. Frente de onda e espuma de impacto.
9. Bubble Shield.
10. Boia Planadora com rastro de água.
11. Celebração final.
12. Otimização por distância e pooling.

A primeira versão não deve começar com reflexos complexos, refração, espuma procedural avançada ou pós-processamento. Esses efeitos só devem ser adicionados depois que a água estiver legível e com desempenho comprovado.

### 12.22 Testes visuais e de desempenho

Criar uma cena de testes de VFX com:

- Um jato vertical;
- Um jato horizontal;
- Uma piscina rasa;
- Uma corrente;
- Uma onda;
- Um splash pequeno, médio e grande;
- Um ponto de água;
- Um Bubble Shield;
- Pelo menos seis efeitos simultâneos.

Validar:

- A água permanece visível em landscape;
- Os efeitos não cobrem a tartaruga;
- A direção visual coincide com a força de gameplay;
- O jato mostra antecipação antes de empurrar;
- A onda mostra aproximação, impacto e recuo;
- As partículas desaparecem sem deixar objetos órfãos;
- A troca de fase libera todos os sistemas;
- A qualidade baixa reduz o custo sem remover feedback essencial;
- Não há erros no console;
- O FPS ou tempo de frame permanece aceitável no celular-alvo.

### 12.23 Bloco para adicionar ao prompt mestre

```text
EFEITOS VISUAIS DE ÁGUA E JATOS
Separe água visual, partículas e regras de gameplay. Use uma superfície simples, espuma, partículas contínuas, partículas de impacto, malhas de onda e efeitos de ativação. Não use a malha visual ou as partículas como detector principal de colisão.

Centralize os efeitos em `VfxManager`, `ParticleFactory`, perfis de partículas e pools reutilizáveis. Use texturas pequenas compartilhadas. Prefira `ParticleSystem` como caminho compatível e `GPUParticleSystem` quando suportado, com fallback automático. Não crie e destrua um novo sistema de partículas a cada splash.

Jatos devem combinar núcleo visual, gotas, espuma e estado de ativação sincronizado com o `WaterSystem`. Ondas devem mostrar aproximação, impacto e recuo antes de aplicar a força. Correntes devem usar partículas direcionais e espuma que apontem na mesma direção da força de gameplay.

Implemente qualidade baixa, média e alta. Reduza partículas, espuma, reflexos e transparências em dispositivos móveis. Priorize efeitos próximos da câmera e limite o número de sistemas ativos. Desative ou reduza efeitos fora do campo de visão.

Todo efeito deve possuir `dispose()` e liberar partículas, meshes, texturas e listeners. Valide a cena em landscape, com jato vertical, jato horizontal, onda, corrente, splash, ponto de água e Bubble Shield simultaneamente.
```
