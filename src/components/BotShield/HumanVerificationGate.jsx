import { useState, useEffect } from 'react';
import { FiShield, FiCheckCircle, FiLock, FiAlertTriangle } from 'react-icons/fi';
import './HumanVerificationGate.css';

const SESSION_KEY = 'portfolio_human_verified';

function detectAutomatedBot() {
  if (typeof window === 'undefined') return false;

  const isWebDriver = Boolean(navigator.webdriver);
  const hasPhantomProps = Boolean(
    window.domAutomation ||
    window._phantom ||
    window.callPhantom ||
    window.__nightmare ||
    window.document.__selenium_unwrapped ||
    window.document.__webdriver_evaluate
  );

  const ua = (navigator.userAgent || '').toLowerCase();
  const isHeadlessUA = ua.includes('headlesschrome') || ua.includes('phantomjs') || ua.includes('selenium');

  return isWebDriver || hasPhantomProps || isHeadlessUA;
}

function HumanVerificationGate({ children }) {
  const [isVerified, setIsVerified] = useState(false);
  const [isBotDetected, setIsBotDetected] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    // Check if user is already verified in current browser session
    const storedStatus = sessionStorage.getItem(SESSION_KEY);
    if (storedStatus === 'true') {
      setIsVerified(true);
      return;
    }

    // Run automated anti-bot checks
    const botCheck = detectAutomatedBot();
    if (botCheck) {
      setIsBotDetected(true);
    }
  }, []);

  const handleHumanVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsVerified(true);
      setVerifying(false);
    }, 600);
  };

  if (isVerified) {
    return <>{children}</>;
  }

  return (
    <div className="bot-shield-overlay" role="dialog" aria-modal="true" aria-label="Human verification gate">
      <div className="bot-shield-backdrop" />

      {isBotDetected ? (
        <div className="bot-shield-card bot-shield-blocked-card">
          <div className="bot-shield-icon-wrapper bot-shield-blocked-icon">
            <FiAlertTriangle size={32} />
          </div>
          <h2 className="bot-shield-title">Access Restricted</h2>
          <p className="bot-shield-subtitle">
            Automated crawler or bot traffic signature detected. Automated scraping access to this portfolio is restricted.
          </p>
          <div className="bot-shield-status-badge">
            <span className="bot-shield-status-dot" style={{ background: '#c1666b', boxShadow: '0 0 8px #c1666b' }} />
            Automated Signature Flagged
          </div>
          <button className="bot-shield-action-btn" onClick={handleHumanVerify} style={{ background: '#c1666b', color: '#fff' }}>
            <FiLock size={18} /> Re-verify as Human
          </button>
        </div>
      ) : (
        <div className="bot-shield-card">
          <div className="bot-shield-icon-wrapper">
            <FiShield size={32} />
          </div>
          <h2 className="bot-shield-title">Security Check</h2>
          <p className="bot-shield-subtitle">
            Welcome to Jegan Baskar's portfolio. Please confirm you are a human visitor before entering.
          </p>

          <div className="bot-shield-status-badge">
            <span className="bot-shield-status-dot" />
            Automated Bot Shield Active
          </div>

          <button
            className="bot-shield-action-btn"
            onClick={handleHumanVerify}
            disabled={verifying}
            aria-label="Verify I am Human"
          >
            {verifying ? (
              <>
                <span className="bot-shield-spinner" />
                Analyzing Security...
              </>
            ) : (
              <>
                <FiCheckCircle size={18} />
                I am a Human Visitor
              </>
            )}
          </button>

          <div className="bot-shield-footer-note">
            Protected by Automated Anti-Bot Shield · One-click verification per session
          </div>
        </div>
      )}
    </div>
  );
}

export default HumanVerificationGate;
