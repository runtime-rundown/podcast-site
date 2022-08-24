import RuntimeLogo from '../public/runtime-rundown-logo.png';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Hero.module.css';

const Hero = () => {
  return (
    <div className={styles.Hero}>
      <div>
        <Link href="/">
          <a>
            <Image
              className={styles.HeroLogo}
              src={RuntimeLogo}
              alt="Runtime Rundown Logo: Depicting a laptop with the words Runtime Rundown"
              layout="responsive"
            />
          </a>
        </Link>
      </div>
      <div>
        <h2>Two Friends:</h2>
        <div>hey</div>
        <div>hey</div>
        <h2>Talking About Web Development</h2>
      </div>
    </div>
  );
};

export default Hero;
