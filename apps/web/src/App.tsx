import { useRef, useState } from "react";
import { Map } from "./components/Map";
import { ModeToggle } from "./components/ModeToggle";
import { parseShareableRouteState } from "./lib/urlState";
import type { TravelMode } from "./lib/api";

function App() {
  const [mode, setMode] = useState<TravelMode>(() =>
    parseShareableRouteState().mode,
  );
  const resetRef = useRef<() => void>(() => {});
  const modeChangeRef = useRef<(m: TravelMode) => void>((m) => setMode(m));

  return (
    <div className="app">
      <header className="app-header">
        <h1>Santa Fe Detour</h1>
        <p>routes shaped by place</p>
        <button
          type="button"
          className="header-reset-btn"
          onClick={() => resetRef.current()}
        >
          Reset
        </button>
      </header>
      <div className="app-mode-toggle-mobile">
        <ModeToggle mode={mode} onChange={(m) => modeChangeRef.current(m)} />
      </div>
      <div className="app-map-wrapper">
        <Map
          resetRef={resetRef}
          modeChangeRef={modeChangeRef}
          mode={mode}
          onModeChange={setMode}
        />
      </div>
    </div>
  );
}

export default App;
