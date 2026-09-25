# Estrutura técnica do primeiro slice

## Camadas

```text
React
└── GameCanvas.tsx
    ├── HUD
    ├── modal de instruções
    ├── pausa
    ├── controles touch
    └── guard de orientação

Game layer / runtime
└── scene.ts
    ├── GameRuntime
    ├── InputAction
    ├── GameSnapshot
    ├── movimento e pulo
    ├── colisão resolvida por eixo
    ├── obstáculos estáticos e quebráveis
    ├── Giro Cascudo com cooldown
    ├── checkpoints visuais e respawn
    ├── objetivo, estatísticas e vitória
    └── sistema visual de jatos

Babylon.js
├── Engine
├── Scene
├── ArcRotateCamera
├── HemisphericLight
├── meshes procedurais
├── StandardMaterial
├── ParticleSystem
└── DynamicTexture
```

## Contrato React/Babylon

`GameCanvas.tsx` cria o canvas e chama `createGameScene(canvas)` uma única vez. O runtime expõe somente métodos semânticos: `start`, `pause`, `resume`, `restart`, `setAction`, `setPausedByOrientation`, `setReducedMotion`, `subscribe` e `dispose`.

O React recebe `GameSnapshot` e não consulta meshes, posições ou materiais da cena. O Babylon mantém o loop, a câmera, o jogador, os jatos e os efeitos.

## Movimento e colisões

O primeiro slice usa um controlador cinemático leve. A posição é atualizada por velocidade nos eixos X/Z, gravidade e forças dos jatos. O jogador possui um volume aproximado; a fase usa limites de arena, plataformas e obstáculos com resolução por eixo, permitindo contornar pedras e quebrar caixas laranja durante o Giro Cascudo. O próximo incremento deve extrair esses comportamentos para `PlayerMotor`, `CollisionSystem` e `WaterSystem` sem alterar o contrato público.

## VFX

As partículas dos jatos usam `ParticleSystem` com textura radial criada por `DynamicTexture`. O splash utiliza um emissor temporário. Checkpoints e objetivo usam materiais emissivos, torus, orbes pulsantes e neblina EXP2 para leitura de cena. A próxima etapa deve extrair pooling e perfis de qualidade para `VfxManager`.

## Landscape

O layout e a câmera são projetados prioritariamente para landscape. Em portrait, o runtime continua jogável e React mostra apenas uma recomendação discreta para girar o dispositivo. O canvas usa `viewport-fit=cover` e os controles touch ocupam os cantos inferiores.
