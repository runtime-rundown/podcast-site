import LogoBanner from '../components/LogoBanner';
import Link from 'next/link';
import Image from 'next/image';
import JoesPicture from '../public/helloitsjoe.jpg';
import EvansPicture from '../public/cooperbuilt.jpg';
import styles from '../styles/Hero.module.css';

const Hero = ({ isShort = false }) => {
  const hideProfileCards = isShort ? styles.hide : '';
  return (
    <div className={styles.hero}>
      <LogoBanner />
      <div className={styles.profileWrapper}>
        <div className={hideProfileCards}>
          <hr className={styles.lineBreak} data-content="Your Hosts" />
          <div className={styles.profileCardsWrapper}>
            <div className={styles.profileCardWrapper}>
              <a
                href="https://github.com/helloitsjoe"
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.profileCard}>
                  <Image
                    height={75}
                    width={75}
                    src={JoesPicture}
                    alt="Joe Boyle"
                    className={styles.avatar}
                  />
                  <div>
                    <h3>Joe Boyle</h3>
                    <p>Frontend Platform Engineer, former animator</p>
                  </div>
                </div>
              </a>
            </div>
            <div className={styles.profileCardWrapper}>
              <a
                href="https://github.com/Cooperbuilt"
                target="_blank"
                rel="noreferrer"
              >
                <div className={styles.profileCard}>
                  <Image
                    height={75}
                    width={75}
                    src={EvansPicture}
                    alt="Evan Cooper"
                    className={styles.avatar}
                  />
                  <div className={styles.HeroInformation}>
                    <h3>Evan Cooper</h3>
                    <p>Principal Engineer @ Stackpoint Ventures, former U.S Army Infantry</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <hr className={styles.lineBreak} data-content="Get Involved" />
        <div className={styles.linkWrapper}>
          <Link href="/suggestions" className={styles.link}>
            Make a Suggestion
          </Link>
        </div>
        <div className={styles.linkWrapper}>
          <Link href="/questions" className={styles.link}>
            Ask a Question
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
