interface DistancePresetsProps {
  presets: number[];
  selected: number;
  onChange: (miles: number) => void;
}

export function DistancePresets({ presets, selected, onChange }: DistancePresetsProps) {
  return (
    <div className="distance-presets" role="radiogroup" aria-label="Distance range">
      {presets.map((miles) => (
        <button
          key={miles}
          type="button"
          role="radio"
          aria-checked={miles === selected}
          className={`distance-presets__btn ${miles === selected ? "distance-presets__btn--active" : ""}`}
          onClick={() => onChange(miles)}
        >
          {miles} mi
        </button>
      ))}
    </div>
  );
}
