
import { useState, type FormEvent } from 'react';

type Page = 'login' | 'register' | 'dashboard';

const API_URL = 'http://localhost:8080/api/auth';

export default function App() {
  const [page, setPage] = useState<Page>('login');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('');
    setLoading(true);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};

    formData.forEach((value, key) => {
      data[key] = String(value).trim();
    });

    try {
      const response = await fetch(
        `${API_URL}/${page === 'login' ? 'login' : 'register'}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || 'Something went wrong.');
        return;
      }

      if (page === 'register') {
        setPage('login');
        setMessage('Registration successful! Please log in.');
        return;
      }

      setUserName(result.name || 'Farmer');
      setPage('dashboard');
      setMessage('');
    } catch {
      setMessage('Backend connection failed. Check that Spring Boot is running.');
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setPage('login');
    setMessage('');
    setUserName('');
  }

  if (page === 'dashboard') {
    return (
      <main className="agri-page">
        <header className="navbar">
          <a className="brand" href="#dashboard">
            <span className="brand-leaf">🌱</span>
            <span>Agri<span className="brand-light">Smart</span>
              <small>SMART AGRICULTURE MANAGEMENT</small>
            </span>
          </a>
          <button className="submit-button" onClick={logout}>
            Logout
          </button>
        </header>

        <section className="dashboard-content">
          <span className="eyebrow">FARMER DASHBOARD</span>
          <h1>Welcome, {userName}! 🌿</h1>
          <p className="hero-description">
            Welcome to your Smart Agriculture Management System.
            Choose a section to manage your farm.
          </p>

          <div className="dashboard-grid">
            <article className="dashboard-card">
              <span className="dashboard-icon">🌱</span>
              <h2>Crop Management</h2>
              <p>Manage your crops and monitor their growth.</p>
              <span className="coming-soon">Ready for development</span>
            </article>

            <article className="dashboard-card">
              <span className="dashboard-icon">💧</span>
              <h2>Soil Monitoring</h2>
              <p>Keep track of soil moisture and soil conditions.</p>
              <span className="coming-soon">Ready for development</span>
            </article>

            <article className="dashboard-card">
              <span className="dashboard-icon">🌤️</span>
              <h2>Weather Information</h2>
              <p>View weather information to support farm decisions.</p>
              <span className="coming-soon">Ready for development</span>
            </article>

            <article className="dashboard-card">
              <span className="dashboard-icon">🌾</span>
              <h2>Smart Irrigation</h2>
              <p>Plan water usage for healthier crop growth.</p>
              <span className="coming-soon">Ready for development</span>
            </article>
          </div>
        </section>

        <footer className="footer">
          <span>© 2026 AgriSmart</span>
          <span>Growing a smarter, more sustainable future. 🌱</span>
        </footer>
      </main>
    );
  }

  return (
    <main className="agri-page">
      <header className="navbar">
        <a className="brand" href="#home">
          <span className="brand-leaf">🌱</span>
          <span>Agri<span className="brand-light">Smart</span>
            <small>SMART AGRICULTURE MANAGEMENT</small>
          </span>
        </a>
        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>
        <span className="nav-tag">🌿 Better Farming, Brighter Future</span>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">GROW SMARTER. FARM BETTER.</span>
          <h1>Smart Agriculture <span>Management System</span></h1>
          <p className="hero-description">
            Manage your crops, monitor soil health, track weather and make
            better decisions for a more productive and sustainable future.
          </p>

          <div className="feature-list" id="features">
            <div className="feature"><span>🌱</span><strong>Crop<br />Management</strong></div>
            <div className="feature"><span>💧</span><strong>Soil Moisture<br />Monitoring</strong></div>
            <div className="feature"><span>🌤️</span><strong>Weather<br />Forecasting</strong></div>
            <div className="feature"><span>🌾</span><strong>Smart<br />Irrigation</strong></div>
          </div>

          <div className="farm-note" id="about">
            <span>🍃</span>
            <div>
              <strong>Healthy Soil, Happy Future</strong>
              <p>Growing a greener tomorrow.</p>
            </div>
          </div>
        </div>

        <section className="auth-card">
          <div className="card-icon">🌿</div>
          <h2>{page === 'login' ? 'Welcome Back!' : 'Join AgriSmart!'}</h2>
          <p className="card-description">
            {page === 'login'
              ? 'Sign in to manage your agricultural journey.'
              : 'Create an account to get started.'}
          </p>

          <div className="tabs">
            <button type="button" className={page === 'login' ? 'tab active' : 'tab'}
              onClick={() => { setPage('login'); setMessage(''); }}>
              Login
            </button>
            <button type="button" className={page === 'register' ? 'tab active' : 'tab'}
              onClick={() => { setPage('register'); setMessage(''); }}>
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {page === 'register' && (
              <>
                <label htmlFor="name">Full name</label>
                <input id="name" name="name" placeholder="Enter your full name" required />
              </>
            )}

            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email"
              placeholder="Enter your email address" required />

            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password"
              placeholder="Enter your password" minLength={8} required />

            {page === 'register' && (
              <>
                <label htmlFor="phone">Phone number</label>
                <input id="phone" name="phone" type="tel"
                  placeholder="Enter your phone number" required />
                <label htmlFor="location">Farm location</label>
                <input id="location" name="location"
                  placeholder="Village, district or city" required />
              </>
            )}

            <button className="submit-button" type="submit" disabled={loading}>
              {loading ? 'Please wait...' :
                page === 'login' ? 'Sign In →' : 'Create Account →'}
            </button>

            {message && <p className="form-message" role="status">{message}</p>}
          </form>

          <p className="switch-text">
            {page === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button className="link-button" type="button"
              onClick={() => {
                setPage(page === 'login' ? 'register' : 'login');
                setMessage('');
              }}>
              {page === 'login' ? 'Register here' : 'Login here'}
            </button>
          </p>
        </section>
      </section>

      <footer className="footer">
        <span>© 2026 AgriSmart</span>
        <span>Growing a smarter, more sustainable future. 🌱</span>
      </footer>
    </main>
  );
}
