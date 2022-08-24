import RuntimeLogo from '../public/runtime-rundown-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.Hero}>
      {/* <div className={styles.HeroLogo}>
        <Link href="/">
          <Image
            className={styles.HeroLogo}
            src={RuntimeLogo}
            alt="Runtime Rundown Logo: Depicting a laptop with the words Runtime Rundown"
            layout="responsive"
          />
        </Link>
      </div> */}
      <h1 className={styles.HeroTitle}>Runtime Rundown</h1>
      <h2 className={styles.HeroTitleText}>
        Breaking Down Interesting Web Dev Blog Posts And Videos
      </h2>
      <hr className={styles.HeroLine} data-content="The Hosts" />
      <div className={styles.HeroIntro}>
        <div className={styles.HeroFriends}>
          <a href="https://github.com/Cooperbuilt" target="_blank">
            <div className={styles.HeroFriendWrapper}>
              <div className={styles.HeroFriend}>
                <img
                  src="https://avatars.githubusercontent.com/cooperbuilt?size=200"
                  alt="Evan Cooper"
                  className={styles.HeroImage}
                />
                <div className={styles.HeroInformation}>
                  <h3>Evan Cooper</h3>
                  <p>Frontend Engineer at Amazon, former U.S Army Infantry</p>
                </div>
              </div>
            </div>
          </a>
          <a href="https://github.com/helloitsjoe" target="_blank">
            <div className={styles.HeroFriendWrapper}>
              <div className={styles.HeroFriend}>
                <img
                  src="https://avatars.githubusercontent.com/helloitsjoe?size=200"
                  alt="Joe Boyle"
                  className={styles.HeroImage}
                />
                <div>
                  <h3>Joe Boyle</h3>
                  <p>Frontend Engineer at Wayfair, Learning Japanese, Other stuff</p>
                </div>
              </div>
            </div>
          </a>
        </div>
        <hr className={styles.HeroLine} data-content="The Call to Action" />
        <div className={styles.HeroSubmitWrapper}>
          <Link href="/submit">
            <a className={styles.HeroSubmit}>Suggest A Post / Video</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
