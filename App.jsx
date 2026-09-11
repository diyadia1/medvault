import { useState } from "react";
import "./styles.css";

function App() {
  const [connected, setConnected] = useState(false);
  const [records, setRecords] = useState([
    {
      type: "Medical Report",
      date: "12 Aug 2026",
      status: "Secure",
    },
    {
      type: "Prescription",
      date: "04 Jul 2026",
      status: "Secure",
    },
  ]);

  const addRecord = () => {
    setRecords([
      ...records,
      {
        type: "New Medical Record",
        date: "Today",
        status: "Pending",
      },
    ]);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span>✚</span> MedVault
        </div>

        <div className="nav-links">
          <a href="#dashboard">Dashboard</a>
          <a href="#records">Records</a>
          <a href="#access">Access Control</a>
        </div>

        <button
          className="connect-btn"
          onClick={() => setConnected(!connected)}
        >
          {connected ? "Wallet Connected" : "Connect Wallet"}
        </button>
      </nav>

      <main>
        <section className="hero">
          <div>
            <p className="eyebrow">DECENTRALIZED HEALTHCARE</p>

            <h1>
              Your health records.
              <br />
              <span>Your control.</span>
            </h1>

            <p className="hero-text">
              MedVault uses blockchain and decentralized storage to give
              patients greater control, privacy, and transparency over their
              medical records.
            </p>

            <div className="hero-actions">
              <button className="primary-btn" onClick={addRecord}>
                Add Medical Record
              </button>

              <a href="#access" className="secondary-btn">
                Manage Access
              </a>
            </div>
          </div>

          <div className="vault-card">
            <div className="vault-icon">🔐</div>
            <p>VAULT STATUS</p>
            <h2>Protected</h2>

            <div className="status-row">
              <span>Blockchain</span>
              <strong>Connected</strong>
            </div>

            <div className="status-row">
              <span>IPFS Storage</span>
              <strong>Encrypted</strong>
            </div>

            <div className="status-row">
              <span>Access</span>
              <strong>Patient Controlled</strong>
            </div>
          </div>
        </section>

        <section className="stats" id="dashboard">
          <div>
            <span>01</span>
            <h3>Patient Owned</h3>
            <p>Your records remain under your control.</p>
          </div>

          <div>
            <span>02</span>
            <h3>Decentralized</h3>
            <p>Built around blockchain and IPFS technology.</p>
          </div>

          <div>
            <span>03</span>
            <h3>Transparent</h3>
            <p>Control who can access your medical information.</p>
          </div>
        </section>

        <section className="records-section" id="records">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MEDICAL VAULT</p>
              <h2>Your Records</h2>
            </div>

            <button className="small-btn" onClick={addRecord}>
              + Add Record
            </button>
          </div>

          <div className="records-list">
            {records.map((record, index) => (
              <div className="record" key={index}>
                <div className="record-icon">▣</div>

                <div>
                  <h3>{record.type}</h3>
                  <p>{record.date}</p>
                </div>

                <span className="record-status">{record.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="access-section" id="access">
          <div>
            <p className="eyebrow">ACCESS CONTROL</p>
            <h2>You decide who sees your records.</h2>
            <p>
              Grant or revoke access for authorized healthcare professionals
              through patient-controlled permissions.
            </p>
          </div>

          <div className="access-card">
            <div className="doctor">
              <div className="avatar">DR</div>
              <div>
                <strong>Authorized Doctor</strong>
                <span>Healthcare Provider</span>
              </div>
              <button>Revoke</button>
            </div>

            <div className="doctor">
              <div className="avatar">+</div>
              <div>
                <strong>Add Healthcare Provider</strong>
                <span>Manage new access</span>
              </div>
              <button>Grant</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <strong>MedVault</strong>
        <span>Decentralized Medical Record Hub</span>
      </footer>
    </div>
  );
}

export default App;
