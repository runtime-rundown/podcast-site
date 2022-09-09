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
                    height="75px"
                    width="75px"
                    src={JoesPicture}
                    alt="Joe Boyle"
                    className={styles.avatar}
                  />
                  <div>
                    <h3>Joe Boyle</h3>
                    <p>
                      Frontend Engineer at Wayfair, Learning Japanese, Other
                      stuff
                    </p>
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
                    height="75px"
                    width="75px"
                    src={EvansPicture}
                    alt="Evan Cooper"
                    className={styles.avatar}
                  />
                  <div className={styles.HeroInformation}>
                    <h3>Evan Cooper</h3>
                    <p>Frontend Engineer at Amazon, former U.S Army Infantry</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <hr className={styles.lineBreak} data-content="Get Involved" />
        <div className={styles.linkWrapper}>
          <Link href="/submit">
            <a className={styles.link}>Make a Suggestion</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
