import { useRef } from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../hooks/useFocusTrap";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef, isOpen, onClose);

  if (!isOpen) return null;

  return createPortal(
    <>
      <div
        className="about-overlay"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className="about-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="about-title"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="about-modal__header">
          <h2 id="about-title" className="about-modal__title">
            About Santa Fe Detour
          </h2>
          <button
            type="button"
            className="about-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            &#215;
          </button>
        </div>

        <div className="about-modal__body">
          <section className="about-modal__section">
            <h3>Vision</h3>
            <p>
              Detour explores how interactive mapping can help people understand
              space and place in Santa Fe through the lens of historical and
              cultural geography. Rather than listing attractions, the map
              surfaces locations that make the city more legible — its landscape,
              its layers of history, and the patterns of everyday life.
            </p>
          </section>

          <section className="about-modal__section">
            <h3>Current Status</h3>
            <p>
              This is an early prototype. The map, place data, and interface are
              all under active development. We're looking for feedback from
              expert tour guides working in Santa Fe and from the visitors they
              serve. If you'd like to help shape what this becomes, we'd welcome
              your input.
            </p>
          </section>

          <section className="about-modal__section">
            <h3>Methodology</h3>
            <p>
              The map is seeded from a curated place dataset designed to help
              people read the city. Descriptions are generated through an
              evidence-weighted process that combines existing place records with
              official context, GIS layers, and source metadata, then turns that
              material into short, grounded summaries for the map and place
              cards. We prefer stronger corroboration first — register data,
              official and quasi-official sources, specific source tags — and
              avoid inventing dates, events, or unsupported claims. This layer is
              an editorial bridge: better than generic templates, but still
              subject to review and refinement.
            </p>
          </section>

          <footer className="about-modal__footer">
            Created, designed, and developed by Richard Donohue, PhD
            <br />
            <a href="https://smallbatchmaps.com" target="_blank" rel="noopener noreferrer">
              smallbatchmaps.com
            </a>
          </footer>
        </div>
      </div>
    </>,
    document.body,
  );
}
