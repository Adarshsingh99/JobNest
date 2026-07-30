import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__brand">
        <div className="navbar__brand-icon">💼</div>
        <span className="navbar__brand-text">JobBoard</span>
      </NavLink>

      <div className="navbar__nav">
        <NavLink
          to="/"
          className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
        >
          Browse Jobs
        </NavLink>
      </div>

      <NavLink to="/add" className="navbar__cta">
        + Post a Job
      </NavLink>
    </nav>
  );
}
