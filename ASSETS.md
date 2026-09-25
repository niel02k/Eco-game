# Manifesto de assets — Eco Thermas: Aventura das Águas

## Direção visual

A referência visual do primeiro slice foi gerada com foco em uma aventura tropical aquática, com composição widescreen, câmera isométrica, tartaruga verde original, água turquesa, areia quente, jatos legíveis, boias, palmeiras e pontos de objetivo amarelos. O arquivo original está em `/home/ubuntu/webdev-static-assets/eco-thermas-visual-target.png`.

## Assets gerados

| Asset | Origem | Uso atual |
|---|---|---|
| `eco-thermas-visual-target.png` | Manus built-in image generation | Referência de direção visual para o vertical slice. |
| `eco-thermas-water-pattern.png` | Manus built-in image generation | Textura aquática aplicada ao material da piscina via `/manus-storage/eco-thermas-water-pattern_112562cd.png`; original em `/home/ubuntu/webdev-static-assets/eco-thermas-water-pattern.png`. |

## Assets procedurais no slice

A tartaruga, as palmeiras, boias, cais, arco, ponto de água, jatos e partículas foram construídos com meshes, materiais e `DynamicTexture` do Babylon.js. Essa solução é provisória e permite validar gameplay sem bloquear o projeto pela ausência da arte oficial da mascote.

## Pendências de marca

A arte oficial da tartaruga, logotipo, nomes protegidos, imagens reais e demais elementos proprietários devem ser incorporados somente após autorização do titular. O primeiro slice não depende desses assets para ser testado.
