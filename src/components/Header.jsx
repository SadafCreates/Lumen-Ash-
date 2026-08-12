import { forwardRef } from 'react';
import './Header.css';

const Header = forwardRef(function Header(_, ref) {
  return (
    <header className="site-header" ref={ref}>
      <div className="brandmark">
        LUMEN <span className="amp">&amp;</span> ASH
      </div>
      <nav>
        <ul>
          <li>
            <a href="#notes">Notes</a>
          </li>
          <li>
            <a href="#craft">Craft</a>
          </li>
          <li>
            <a href="#editions">Editions</a>
          </li>
          <li>
            <a href="#contact">Journal</a>
          </li>
        </ul>
      </nav>
      <a href="#contact" className="nav-cta">
        Discover
      </a>
    </header>
  );
});

export default Header;
