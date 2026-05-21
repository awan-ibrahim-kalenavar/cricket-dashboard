// Footer.js

import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-section">

          <div className="footer-logo">
            🏏 CricNova
          </div>

          <p className="footer-description">
            Your ultimate cricket dashboard for live scores,
            live commentary, match highlights, and real-time updates.
          </p>

        </div>

        
        <div className="footer-section">

          <h3 className="footer-title">Quick Links</h3>

          <ul className="footer-links">

            <li>
              <Link to="/home">Home</Link>
            </li>

            <li>
              <Link to="/live-matches">Live Matches</Link>
            </li>

            <li>
              <Link to="/teams">Teams</Link>
            </li>

            <li>
              <Link to="/players">Players</Link>
            </li>

            <li>
              <Link to="/statistics">Statistics</Link>
            </li>

            <li>
              <Link to="/highlights">Highlights</Link>
            </li>

            <li>
              <Link to="/profile">Profile</Link>
            </li>

          </ul>

        </div>

        {/* Follow Us */}
        <div className="footer-section">

          <h3 className="footer-title">Follow Us</h3>

          <div className="social-links">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link twitter"
            >
              <FaTwitter />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <FaInstagram />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link youtube"
            >
              <FaYoutube />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <FaLinkedinIn />
            </a>

          </div>

        </div>

        {/* Contact */}
        <div className="footer-section">

          <h3 className="footer-title">Contact</h3>

          <p className="contact-item">
            📧 support@cricnova.com
          </p>

          <p className="contact-item">
            📞 +91 9876543210
          </p>

          <p className="contact-item">
            📍 Bangalore, India
          </p>

        </div>

      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">

        <p>
          © 2026 CricNova. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;