import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Designed & Developed with ❤️ by{" "}
        <a
          href="mailto:devmdad@gmail.com"
          style={{ textDecoration: "none", color: "white", fontWeight: '500' }}
        >
          Ahmed
        </a>
      </p>
    </footer>
  );
};

export default Footer;
