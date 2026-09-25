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
    ├── colisão de plataforma
    ├── checkpoints
    ├── objetivo e vitória
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

O primeiro slice usa um controlador cinemático leve. A posição é atualizada por velocidade horizontal, gravidade e forças dos jatos. O jogador possui um volume aproximado; a fase usa limites de arena e dois volumes simples de plataforma. O próximo incremento deve extrair esses comportamentos para `PlayerMotor`, `CollisionSystem` e `WaterSystem` sem alterar o contrato público.

## VFX

As partículas dos jatos usam `ParticleSystem` com textura radial criada por `DynamicTexture`. O splash utiliza um emissor temporário. A próxima etapa deve extrair pooling e perfis de qualidade para `VfxManager`.

## Landscape

O layout e a câmera são projetados para landscape. Em viewport estreito com portrait, o runtime é pausado e React mostra o overlay de rotação. O canvas usa `viewport-fit=cover` e os controles touch ocupam os cantos inferiores.
