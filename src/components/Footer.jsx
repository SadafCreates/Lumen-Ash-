import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="foot-top">
        <div className="foot-brand">
          <div className="brandmark">
            LUMEN <span className="amp">&amp;</span> ASH
          </div>
          <p>A parfum maison working at the seam between ember and pigment. Hand-blended in Grasse, worn everywhere else.</p>
        </div>
        <div className="foot-cols">
          <div className="foot-col">
            <h5>Collection</h5>
            <a href="#">Ash Édition</a>
            <a href="#">Lumen Édition</a>
            <a href="#">Dusk Édition</a>
            <a href="#">Discovery Set</a>
          </div>
          <div className="foot-col">
            <h5>Maison</h5>
            <a href="#">Our Story</a>
            <a href="#">The Atelier</a>
            <a href="#">Journal</a>
            <a href="#">Stockists</a>
          </div>
          <div className="foot-col">
            <h5>Follow</h5>
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="#">Newsletter</a>
          </div>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2026 Lumen &amp; Ash Parfums. All rights reserved.</span>
        <span>Grasse — Paris — New York</span>
      </div>
    </footer>
  );
}
