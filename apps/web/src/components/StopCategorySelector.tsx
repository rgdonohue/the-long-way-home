import type { PlaceCategory } from "../data/places";

const OPTIONS: Array<{ value: PlaceCategory | null; label: string }> = [
  { value: null, label: "Any" },
  { value: "history", label: "History" },
  { value: "culture", label: "Culture" },
  { value: "art", label: "Art" },
  { value: "civic", label: "Landmarks" },
  { value: "scenic", label: "Scenic" },
];

interface StopCategorySelectorProps {
  selected: PlaceCategory | null;
  onChange: (cat: PlaceCategory | null) => void;
}

export function StopCategorySelector({ selected, onChange }: StopCategorySelectorProps) {
  return (
    <div className="stop-category-selector" role="radiogroup" aria-label="Stop category">
      {OPTIONS.map(({ value, label }) => (
        <button
          key={label}
          type="button"
          role="radio"
          aria-checked={value === selected}
          className={`stop-category-selector__btn${value === selected ? " stop-category-selector__btn--active" : ""}`}
          onClick={() => onChange(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
