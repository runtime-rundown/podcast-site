import RuntimeLogo from '../public/runtime-rundown-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.leftRail}>
        <div className={styles.logo}>
          <Link href="/">
            <Image
              className={styles.HeroLogo}
              src={RuntimeLogo}
              alt="Runtime Rundown Logo: Depicting a laptop with the words Runtime Rundown"
              height={400}
              width={400}
            />
          </Link>
        </div>
      </div>

      <div className={styles.rightRail}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>Runtime Rundown</h1>
          <p className={styles.subtitle}>
            Breaking Down Interesting Web Dev Blog Posts And Videos
          </p>
        </div>
        <div className={styles.profileWrapper}>
          <hr className={styles.lineBreak} data-content="Your Hosts" />
          <div className={styles.profileCardsWrapper}>
            <div className={styles.profileCardWrapper}>
              <a href="https://github.com/helloitsjoe" target="_blank">
                <div className={styles.profileCard}>
                  <img
                    src="https://avatars.githubusercontent.com/helloitsjoe?size=200"
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
              <a href="https://github.com/Cooperbuilt" target="_blank">
                <div className={styles.profileCard}>
                  <img
                    src="https://avatars.githubusercontent.com/cooperbuilt?size=200"
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
          <hr className={styles.lineBreak} data-content="Please Help" />
          <div className={styles.linkWrapper}>
            <Link href="/submit">
              <a className={styles.link}>Suggest A Post / Video</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
