'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './card.module.css';
import BlurText from '../components/BlurText';

export default function CardPage() {
  useEffect(() => {
    document.title = 'BS Realty LLC | Digital Card';
  }, []);
  const [activePage, setActivePage] = useState('home');

  const handlePageChange = (page: string) => {
    setActivePage(page);
  };

  return (
    <main className={styles.wrap}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Image
              src="/images/logo/logo_bbg.png"
              alt="BS Realty LLC"
              width={52}
              height={52}
              style={{ borderRadius: '15px' }}
            />
          </div>
          <div className={styles.brandtext}>
            <div className={styles.company}>BS Realty LLC</div>
            <div className={styles.tagline}>Your trusted partner in Real estate, Mortgage, and Insurance, Tax & Accounting solutions.</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <button className={`${styles.tab} ${activePage === 'home' ? styles.active : ''}`} onClick={() => handlePageChange('home')}>Card</button>
          <a href="/services" className={styles.tab}>Services</a>
          <a href="/contact" className={styles.tab}>Next</a>
        </nav>
      </header>

      <section className={`${styles.card} ${styles.page} ${activePage === 'home' ? styles.active : ''}`} id="page-home">
        <div className={styles.hero}>
          <div className={styles.person}>
            <div className={styles.name}>
              <BlurText
                text="Bal Khadka"
                delay={100}
                animateBy="letters"
                direction="top"
                className={styles.blurText}
              />
            </div>
            <div className={styles.role}>
              <BlurText
                text="Educator | Realtor | Loan Officer | Insurance Agent"
                delay={300}
                animateBy="words"
                direction="bottom"
                className={styles.blurText}
              />
            </div>

            <div className={styles.actions}>
              <a className={`${styles.btn} ${styles.primary}`} href="https://bsrealtyllc.com" target="_blank" rel="noreferrer">Visit Website</a>
              <a className={styles.btn} href="tel:+17062618948">Call</a>
              <a className={styles.btn} href="mailto:bsrealtyllc@gmail.com">Email</a>
              <a className={styles.btn} href="/BS_Realty_Bal_Khadka.vcf" download>Save Contact</a>
            </div>

            <div className={styles.small}>
              <div><span className={styles.k}>Web:</span> <a href="https://bsrealtyllc.com" target="_blank" rel="noreferrer">https://bsrealtyllc.com</a></div>
              <div><span className={styles.k}>Phone:</span> <a href="tel:+17062618948">+1-706-261-8948</a></div>
              <div><span className={styles.k}>Email:</span> <a href="mailto:bsrealtyllc@gmail.com">bsrealtyllc@gmail.com</a></div>
            </div>
          </div>

          <div className={styles.qrbox}>
            <img className={styles.qr} src="/images/qr/bsrealtyllc_qr.png" alt="QR code linking to https://bsrealtyllc.com" />
            <div className={styles.qrtext}>Scan to visit<br />https://bsrealtyllc.com</div>
          </div>
        </div>

        <footer className={styles.footer}>
          <div className={styles.pill}>Real Estate</div>
          <div className={styles.pill}>Mortgage</div>
          <div className={styles.pill}>Insurance</div>
          <div className={styles.pill}>Tax &amp; Accounting</div>
          <div className={styles.pill}>Home Improvement</div>
          <div className={styles.pill}>Online Licensing Courses</div>
        </footer>
      </section>

      
    </main>
  );
}