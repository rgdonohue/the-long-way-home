import { NavLink, Link } from "react-router-dom";
import type { ReactNode } from "react";

interface AppHeaderProps {
  /** Optional actions rendered after the nav (e.g. Reset button on the builder page) */
  actions?: ReactNode;
}

export function AppHeader({ actions }: AppHeaderProps) {
  return (
    <header className="app-header">
      <Link to="/" className="app-header__brand">
        <h1>Santa Fe Detour</h1>
      </Link>
      <p>routes shaped by place</p>
      <nav className="app-header__nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            "app-header__nav-link" + (isActive ? " app-header__nav-link--active" : "")
          }
        >
          Explore
        </NavLink>
        <NavLink
          to="/build"
          className={({ isActive }) =>
            "app-header__nav-link" + (isActive ? " app-header__nav-link--active" : "")
          }
        >
          Build
        </NavLink>
        <NavLink
          to="/tours"
          className={({ isActive }) =>
            "app-header__nav-link" + (isActive ? " app-header__nav-link--active" : "")
          }
        >
          Tours
        </NavLink>
      </nav>
      {actions}
    </header>
  );
}
