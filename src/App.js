import { useEffect, useRef, useState } from "react";
import "./App.css";
import FloatingWidget from "./FloatingWidget";

function App() {
  const models = [
    {
      name: "S-Class Sedan",
      tag: "THE ICON OF LUXURY",
      desc: "Crafted for those who expect the extraordinary in every detail.",
      price: "Starting from $114,500",
    },
    {
      name: "EQS SUV",
      tag: "ALL-ELECTRIC LUXURY",
      desc: "Electric intelligence meets SUV versatility and comfort.",
      price: "Starting from $104,400",
    },
    {
      name: "C-Class Sedan",
      tag: "ATHLETIC & REFINED",
      desc: "Agile, dynamic and effortlessly modern for everyday driving.",
      price: "Starting from $46,950",
    },
    {
      name: "G-Class",
      tag: "LEGENDARY OFF-ROADER",
      desc: "Unmistakable design with uncompromising off-road capability.",
      price: "Starting from $144,150",
    },
  ];

  const [visibleText, setVisibleText] = useState("");
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;

        const allElements = document.querySelectorAll(
          "p, h1, h2, h3, h4, h5, h6, span, div"
        );

        let capturedText = "";

        allElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= viewportHeight) {
            const text = element.textContent.trim();
            if (text && !capturedText.includes(text)) {
              capturedText += text + " ";
            }
          }
        });

        setVisibleText(capturedText.trim());
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <div className="App">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-left">
          <div className="logo-circle" />
          <span className="brand-name">Mercedes-Benz</span>
        </div>
        <nav className="navbar-links">
          <a href="#models">Models</a>
          <a href="#innovation">Innovation</a>
          <a href="#luxury">Luxury</a>
          <a href="#amg">AMG</a>
          <a href="#electric">Electric</a>
          <a href="#ownership">Ownership</a>
        </nav>
        <div className="navbar-right">
          <button className="btn-outline">Locate a Dealer</button>
          <button className="btn-primary">Build & Price</button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="section hero-section">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="hero-eyebrow">MERCEDES-BENZ</p>
            <h1>Luxury, reimagined for every journey.</h1>
            <p className="hero-subtitle">
              Discover the latest generation of Mercedes-Benz vehicles – where
              intelligent technology meets timeless design.
            </p>
            <div className="hero-actions">
              <button className="btn-primary large">Explore Models</button>
              <button className="btn-ghost large">Watch the film</button>
            </div>
            <div className="hero-meta">
              <span>Electric • AMG • SUV • Sedans</span>
              <span>Designed in Germany • Available worldwide</span>
            </div>
          </div>
          <div className="hero-bottom-gradient" />
        </section>

      
        {/* INNOVATION */}
        <section id="innovation" className="section full-section innovation-section">
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">INNOVATION</p>
            <h2>Intelligence that feels human.</h2>
            <p>
              MBUX infotainment, driver-assist features and OTA updates bring a
              new level of connection between you, your vehicle and the world.
            </p>
            <div className="pill-row">
              <span className="pill">MBUX Hyperscreen</span>
              <span className="pill">Level 2+ Assist</span>
              <span className="pill">Over-the-air updates</span>
              <span className="pill">Personalized profiles</span>
            </div>
          </div>
        </section>

        {/* LUXURY */}
        <section id="luxury" className="section full-section luxury-section">
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">INTERIOR LUXURY</p>
            <h2>A lounge that moves with you.</h2>
            <p>
              Finest materials, ambient lighting and climate systems turn every
              drive into a calm, immersive experience.
            </p>
            <div className="pill-row">
              <span className="pill">Nappa leather</span>
              <span className="pill">Burmester® 3D audio</span>
              <span className="pill">64-color ambient light</span>
              <span className="pill">Executive rear seating</span>
            </div>
          </div>
        </section>

        {/* AMG */}
        <section id="amg" className="section full-section amg-section">
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">MERCEDES-AMG</p>
            <h2>Performance, handcrafted.</h2>
            <p>
              From precision-built engines to track-ready suspensions, AMG
              models carry the spirit of motorsport into every corner.
            </p>
            <div className="pill-row">
              <span className="pill">Handcrafted engines</span>
              <span className="pill">AMG 4MATIC+</span>
              <span className="pill">Race interiors</span>
              <span className="pill">Launch control</span>
            </div>
          </div>
        </section>

        {/* ELECTRIC */}
        <section id="electric" className="section full-section electric-section">
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">THE ELECTRIC FUTURE</p>
            <h2>Driven by electricity. Guided by intelligence.</h2>
            <p>
              From modular EV platforms to ultra-fast charging, Mercedes-Benz is
              redefining the future of sustainable mobility.
            </p>

            <div className="pill-row">
              <span className="pill">EQS Sedan</span>
              <span className="pill">EQS SUV</span>
              <span className="pill">EQE SUV</span>
              <span className="pill">Zero-emission platforms</span>
              <span className="pill">Battery tech</span>
            </div>
          </div>
        </section>

        {/* DESIGN */}
        <section id="design" className="section full-section design-section">
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">DESIGN PHILOSOPHY</p>
            <h2>Sensual purity. The core of our design.</h2>
            <p>
              Smooth surfaces, sculpted edges and iconic lighting signatures make
              Mercedes unmistakable from any angle.
            </p>

            <div className="pill-row">
              <span className="pill">Digital lights</span>
              <span className="pill">3D tail lamps</span>
              <span className="pill">Aero design</span>
              <span className="pill">Luxury interiors</span>
            </div>
          </div>
        </section>

        {/* SAFETY */}
        <section id="safety" className="section full-section safety-section">
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">SAFETY</p>
            <h2>Engineered to protect what matters most.</h2>
            <p>
              With PRE-SAFE®, lane assist and advanced radar tech, your Mercedes
              anticipates danger before it happens.
            </p>

            <div className="pill-row">
              <span className="pill">PRE-SAFE®</span>
              <span className="pill">Lane Assist</span>
              <span className="pill">360° Radar</span>
              <span className="pill">Emergency Braking</span>
            </div>
          </div>
        </section>

        {/* SUSTAINABILITY */}
        <section
          id="sustainability"
          className="section full-section sustainability-section"
        >
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">SUSTAINABILITY</p>
            <h2>Luxury meets responsibility.</h2>
            <p>
              Carbon-neutral production, recycled materials and circular battery
              ecosystems by 2039.
            </p>

            <div className="pill-row">
              <span className="pill">Recycled materials</span>
              <span className="pill">Neutral factories</span>
              <span className="pill">Green charging</span>
              <span className="pill">Battery recycling</span>
            </div>
          </div>
        </section>

        {/* CONNECT */}
        <section id="connect" className="section full-section connect-section">
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">MERCEDES ME CONNECT</p>
            <h2>Your car. Your smartphone. Connected.</h2>
            <p>
              Remote start, vehicle tracking, digital keys and more from the
              Mercedes me app.
            </p>

            <div className="pill-row">
              <span className="pill">Remote Start</span>
              <span className="pill">Track Vehicle</span>
              <span className="pill">Digital Key</span>
              <span className="pill">Service Alerts</span>
            </div>
          </div>
        </section>

        {/* HERITAGE */}
        <section id="heritage" className="section full-section heritage-section">
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">HERITAGE</p>
            <h2>A legacy of innovation since 1886.</h2>
            <p>
              From the first petrol car to today's electric intelligence,
              Mercedes has shaped mobility for 138+ years.
            </p>

            <div className="pill-row">
              <span className="pill">1886 Motorwagen</span>
              <span className="pill">Gullwing 300SL</span>
              <span className="pill">S-Class Evolution</span>
              <span className="pill">AMG Legacy</span>
            </div>
          </div>
        </section>

        {/* FORMULA 1 */}
        <section id="f1" className="section full-section f1-section">
          <div className="section-overlay" />
          <div className="full-section-content">
            <p className="section-eyebrow">MOTORSPORT</p>
            <h2>Formula 1 DNA in every AMG.</h2>
            <p>
              The Mercedes-AMG PETRONAS F1 team brings aerodynamics and racing
              innovation straight to the road.
            </p>

            <div className="pill-row">
              <span className="pill">F1 Hybrid Tech</span>
              <span className="pill">AMG Sound</span>
              <span className="pill">Track Mode</span>
              <span className="pill">Aero Engineering</span>
            </div>
          </div>
        </section>

        {/* OWNERSHIP */}
        <section id="ownership" className="section ownership-section">
          <div className="ownership-inner">
            <div className="section-header">
              <h2>Ownership made effortless.</h2>
              <p>
                Flexible finance, service booking and connected care — always
                ready.
              </p>
            </div>

            <div className="ownership-grid">
              <div className="ownership-card">
                <h3>Book a test drive</h3>
                <p>Experience your preferred model with a nearby dealership.</p>
                <button className="btn-outline full-width">
                  Find a test drive
                </button>
              </div>

              <div className="ownership-card">
                <h3>Estimate your payment</h3>
                <p>Explore leasing and finance options tailored to you.</p>
                <button className="btn-outline full-width">
                  Open payment calculator
                </button>
              </div>

              <div className="ownership-card">
                <h3>Service & care</h3>
                <p>
                  Schedule maintenance, track service history and stay updated.
                </p>
                <button className="btn-outline full-width">
                  Manage service
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-top">
            <span>© {new Date().getFullYear()} Mercedes-Benz Group AG.</span>
            <div className="footer-links">
              <a href="#hero">Back to top</a>
              <a href="/">Privacy</a>
              <a href="/">Legal</a>
              <a href="/">Cookies</a>
            </div>
          </div>
        </footer>
      </main>
      <FloatingWidget contextText={visibleText} />
    </div>
  );
}

export default App;
