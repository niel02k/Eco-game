import { useEffect, useRef, useState } from "react";
import type { GameRuntime, GameSnapshot, InputAction } from "../game/scene";
import { createGameScene } from "../game/scene";

type TouchAction = Exclude<InputAction, "pause">;

const initialSnapshot: GameSnapshot = {
  mode: "booting",
  levelTitle: "O Primeiro Jato",
  objective: "Ative o ponto de água no cais",
  waterPointActive: false,
  checkpointActive: false,
  activeJet: 0,
  totalJets: 3,
  hint: "Carregando a aventura...",
  playerStatus: "pronto",
  reducedMotion: false,
};

function useLandscapeGuard(runtime: GameRuntime | null) {
  const [portrait, setPortrait] = useState(false);

  useEffect(() => {
    const update = () => {
      const next = window.matchMedia("(orientation: portrait)").matches && window.innerWidth < 900;
      setPortrait(next);
      // Landscape remains the preferred composition, but portrait must stay playable on phones.
      runtime?.setPausedByOrientation(false);
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, [runtime]);

  return portrait;
}

function TouchButton({ action, label, runtime }: { action: TouchAction; label: string; runtime: GameRuntime | null }) {
  const setPressed = (pressed: boolean) => runtime?.setAction(action, pressed);
  return (
    <button
      className="touch-button"
      aria-label={label}
      onPointerDown={(event) => {
        event.preventDefault();
        setPressed(true);
      }}
      onPointerUp={(event) => {
        event.preventDefault();
        setPressed(false);
      }}
      onPointerCancel={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
    >
      {label}
    </button>
  );
}

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const runtimeRef = useRef<GameRuntime | null>(null);
  const [runtime, setRuntime] = useState<GameRuntime | null>(null);
  const [snapshot, setSnapshot] = useState<GameSnapshot>(initialSnapshot);
  const [showHelp, setShowHelp] = useState(() => !new URLSearchParams(window.location.search).has("demo"));
  const portrait = useLandscapeGuard(runtime);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || runtimeRef.current) return;

    const game = createGameScene(canvas);
    runtimeRef.current = game;
    setRuntime(game);
    const unsubscribe = game.subscribe(setSnapshot);
    game.start();

    const onKeyDown = (event: KeyboardEvent) => {
      const keyMap: Record<string, InputAction | undefined> = {
        ArrowLeft: "move-left",
        a: "move-left",
        A: "move-left",
        ArrowRight: "move-right",
        d: "move-right",
        D: "move-right",
        ArrowUp: "move-up",
        w: "move-up",
        W: "move-up",
        ArrowDown: "move-down",
        s: "move-down",
        S: "move-down",
        " ": "jump",
        Enter: "interact",
        e: "interact",
        E: "interact",
        Escape: "pause",
        p: "pause",
        P: "pause",
      };
      const action = keyMap[event.key];
      if (!action) return;
      event.preventDefault();
      game.setAction(action, true);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      const keyMap: Record<string, InputAction | undefined> = {
        ArrowLeft: "move-left",
        a: "move-left",
        A: "move-left",
        ArrowRight: "move-right",
        d: "move-right",
        D: "move-right",
        ArrowUp: "move-up",
        w: "move-up",
        W: "move-up",
        ArrowDown: "move-down",
        s: "move-down",
        S: "move-down",
        " ": "jump",
        Enter: "interact",
        e: "interact",
        E: "interact",
        Escape: "pause",
        p: "pause",
        P: "pause",
      };
      const action = keyMap[event.key];
      if (action) game.setAction(action, false);
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    window.addEventListener("keyup", onKeyUp, { passive: false });

    return () => {
      unsubscribe();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      game.dispose();
      runtimeRef.current = null;
      setRuntime(null);
    };
  }, []);

  const togglePause = () => {
    if (!runtime) return;
    if (snapshot.mode === "paused") runtime.resume();
    else if (snapshot.mode === "playing") runtime.pause();
  };

  const begin = () => {
    setShowHelp(false);
    runtime?.resume();
  };

  return (
    <main className="game-shell">
      <canvas ref={canvasRef} className="game-canvas" aria-label="Eco Thermas: Aventura das Águas" />

      <section className="hud" aria-label="Informações da fase">
        <div className="brand-lockup">
          <span className="brand-mark">ET</span>
          <div>
            <strong>Eco Thermas</strong>
            <span>Aventura das Águas</span>
          </div>
        </div>
        <div className="level-pill">
          <span>FASE 01</span>
          <strong>{snapshot.levelTitle}</strong>
        </div>
        <div className="objective-card">
          <span className="eyebrow">MISSÃO</span>
          <strong>{snapshot.objective}</strong>
          <small>{snapshot.hint}</small>
        </div>
        <div className="status-row">
          <span className={snapshot.checkpointActive ? "status-chip active" : "status-chip"}>
            {snapshot.checkpointActive ? "✓ CHECKPOINT ATIVO" : "○ CHECKPOINT"}
          </span>
          <span className={snapshot.waterPointActive ? "status-chip active" : "status-chip"}>
            {snapshot.waterPointActive ? "● ÁGUA RESTAURADA" : "○ PONTO DE ÁGUA"}
          </span>
        </div>
        <button className="pause-button" onClick={togglePause} aria-label="Pausar ou continuar">
          {snapshot.mode === "paused" ? "▶" : "Ⅱ"}
        </button>
      </section>

      <div className="progress-track" aria-label={`Jatos ativos: ${snapshot.activeJet} de ${snapshot.totalJets}`}>
        <span>JATOS</span>
        <div className="progress-dots">
          {Array.from({ length: snapshot.totalJets }).map((_, index) => (
            <i key={index} className={index < snapshot.activeJet ? "jet-dot on" : "jet-dot"} />
          ))}
        </div>
      </div>

      <section className="controls-hint" aria-label="Controles">
        <span><kbd>WASD</kbd> mover em 3D</span>
        <span><kbd>ESPAÇO</kbd> pular</span>
        <span><kbd>E</kbd> interagir</span>
      </section>

      <section className="touch-controls" aria-label="Controles de toque">
        <div className="touch-dpad">
          <TouchButton action="move-up" label="▲" runtime={runtime} />
          <TouchButton action="move-left" label="◀" runtime={runtime} />
          <TouchButton action="move-right" label="▶" runtime={runtime} />
          <TouchButton action="move-down" label="▼" runtime={runtime} />
        </div>
        <div className="touch-actions">
          <TouchButton action="jump" label="PULAR" runtime={runtime} />
          <TouchButton action="interact" label="ATIVAR" runtime={runtime} />
        </div>
      </section>

      {showHelp && snapshot.mode !== "level-complete" && (
        <div className="modal-backdrop">
          <section className="intro-card" aria-label="Como jogar">
            <div className="intro-kicker">PRIMEIRA AVENTURA</div>
            <h1>O Primeiro Jato</h1>
            <p>A tartaruga precisa reativar o ponto de água do parque. Atravesse os jatos, chegue ao cais e abra o arco de saída.</p>
            <div className="intro-grid">
              <span><b>01</b><small>Mova-se em 4 direções com WASD ou o direcional</small></span>
              <span><b>02</b><small>Pule com espaço ou PULAR</small></span>
              <span><b>03</b><small>Use E ou ATIVAR no ponto dourado</small></span>
            </div>
            <button className="primary-button" onClick={begin}>COMEÇAR A AVENTURA <span>→</span></button>
            <p className="microcopy">Feito para jogar na horizontal · sem combate · falhas retornam ao checkpoint</p>
          </section>
        </div>
      )}

      {snapshot.mode === "paused" && !portrait && (
        <div className="pause-overlay">
          <div className="pause-card">
            <span className="intro-kicker">PAUSA</span>
            <h2>As águas estão esperando.</h2>
            <button className="primary-button" onClick={togglePause}>CONTINUAR <span>→</span></button>
            <button className="secondary-button" onClick={() => runtime?.restart()}>RECOMEÇAR FASE</button>
          </div>
        </div>
      )}

      {snapshot.mode === "level-complete" && (
        <div className="modal-backdrop victory-backdrop">
          <section className="victory-card">
            <div className="victory-spark">✦</div>
            <span className="intro-kicker">PONTO DE ÁGUA ATIVADO</span>
            <h2>O parque voltou a respirar!</h2>
            <p>Você atravessou o Primeiro Jato e reativou a primeira fonte de água.</p>
            <div className="victory-stat"><span>FASE 01</span><strong>CONCLUÍDA</strong></div>
            <button className="primary-button" onClick={() => runtime?.restart()}>JOGAR NOVAMENTE <span>↻</span></button>
          </section>
        </div>
      )}

      {portrait && !showHelp && snapshot.mode !== "level-complete" && (
        <div className="orientation-hint" role="status">
          <span>↔</span> Melhor em horizontal, mas você já pode jogar aqui.
        </div>
      )}

      <button className="help-button" onClick={() => setShowHelp(true)} aria-label="Abrir ajuda">?</button>
    </main>
  );
}
