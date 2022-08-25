import RuntimeLogo from '../public/runtime-rundown-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.hero}>
      {/* LOGO */}
      <div className={styles.logo}>
        <Link href="/">
          <Image
            className={styles.HeroLogo}
            src={RuntimeLogo}
            alt="Runtime Rundown Logo: Depicting a laptop with the words Runtime Rundown"
            layout="responsive"
          />
        </Link>
      </div>
      {/* Title and Subtitle */}

      <h1 className={styles.title}>Runtime Rundown</h1>
      <h2 className={styles.subtitle}>
        Breaking Down Interesting Web Dev Blog Posts And Videos
      </h2>

      <hr className={styles.lineBreak} data-content="The Hosts" />
      <div className={styles.profileCardsWrapper}>
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
                  Frontend Engineer at Wayfair, Learning Japanese, Other stuff
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
      <hr className={styles.lineBreak} data-content="The Call to Action" />
      <div className={styles.linkWrapper}>
        <Link href="/submit">
          <a className={styles.link}>Suggest A Post / Video</a>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
