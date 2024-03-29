import LaptopLogo from './LaptopLogo';
import Link from 'next/link';
import styles from '../styles/LogoBanner.module.css';

const LogoBanner = () => {
  return (
    <Link href="/" legacyBehavior>
      <div className={styles.logoBanner}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.logoTitle}>Runtime Rundown</h1>
          <p className={styles.subtitle}>
            A Weekly Podcast Breaking Down Web-Dev Blog Posts And Videos
          </p>
        </div>
        <div className={styles.logoWrapper}>
          <LaptopLogo height="12em" />
        </div>
      </div>
    </Link>
  );
};

export default LogoBanner;
