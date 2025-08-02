import React from "react";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <p>Built by Mahmoud Davarfara</p>
        <a href="https://www.linkedin.com/in/mahmoud-davarfara-09b57933a" target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href="Mah.Davarfa@gmail.com">Email</a>
      </div>
      <div className="footer-tech">
        <p>Powered by:</p>
        <ul>
          <li>React</li>
          <li>Redux Toolkit</li>
          <li>Redux Thunk </li>
          <li>React Router</li>
          <li>Reddit JSON API</li>
          <li>Backend: Express.js </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
