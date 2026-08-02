import styles from "./Footer.module.css";
import { footerMockData } from "@/lib/mock/footer";

/**
 * Footer — Server Component.
 *
 * Renders the final copyright row and a back-to-top pill.
 * All styles are from design/design-system.md tokens.
 * The pill re-uses .back-to-top from globals.css; no JS needed — the
 * root scroll-behavior: smooth handles the scroll in globals.css line 76.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { backToTopLabel } = footerMockData;

  // Build copyright text at build time; name portion comes from mock data
  const copyrightText = `© ${currentYear} Nguyễn Minh Anh. Được thiết kế và phát triển bởi chính tôi.`;

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copyright}>{copyrightText}</p>

        <a
          href="#top"
          className="back-to-top"
          aria-label="Lên đầu trang"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5" />
            <path d="M5 12l7-7" />
            <path d="M19 12l-7-7" />
          </svg>
          {backToTopLabel}
        </a>
      </div>
    </footer>
  );
}
