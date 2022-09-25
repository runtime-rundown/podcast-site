import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Header.module.css';
import SpotifyLogo from '../public/spotify-logo.png';
import AppleLogo from '../public/apple-podcasts-logo.png';
import PocketLogo from '../public/pocket-casts-logo.png';
import GithubLogo from '../public/gh-logo.png';

const Header = () => {
  return (
    <nav className={styles.Header}>
      <div className={styles.HeaderContainer}>
        <Link href="/">
          <a className={styles.HeaderLink}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className={styles.HeaderHome}
            >
              <circle cx="256" cy="256" r="256" fill="#104285" />
              <path
                fill="#93DDDE"
                d="m256 72.272-132.448 94.736v41.04L256 113.312l132.448 94.736v-41.04z"
              />
              <path
                fill="#93DDDE"
                d="M145.728 387.728v-168.16L256 140.16l110.272 79.408v168.16z"
              />
            </svg>
          </a>
        </Link>

        <ul className={styles.HeaderLinks}>
          <li className={styles.HeaderLink}>
            <a
              aria-label="Link to Spotify Podcast Page"
              target="_blank"
              rel="noreferrer"
              className={styles.HeaderLink}
              href="https://open.spotify.com/show/5mGILWYFVP2IueThL9HgVP?si=0f698b8ec82e4aba"
            >
              <Image
                src={SpotifyLogo}
                alt="Spotify Logo"
                width="28"
                height="28"
              />
            </a>
          </li>
          <li className={styles.HeaderLink}>
            <a
              aria-label="Link to Apple Podcast Page"
              target="_blank"
              rel="noreferrer"
              className={styles.HeaderLink}
              href="https://podcasts.apple.com/us/podcast/runtime-rundown/id1635132420"
            >
              <Image
                src={AppleLogo}
                alt="Apple Podcasts Logo"
                width="28"
                height="28"
              />
            </a>
          </li>
          <li className={styles.HeaderLink}>
            <a
              aria-label="Link to PocketCasts Podcast Page"
              target="_blank"
              rel="noreferrer"
              className={styles.HeaderLink}
              href="https://pca.st/9ifdo34s"
            >
              <Image
                src={PocketLogo}
                alt="PocketCasts Logo"
                width="28"
                height="28"
              />
            </a>
          </li>
          <li className={styles.HeaderLink}>
            <a
              aria-label="Link to Website Github Repo"
              target="_blank"
              rel="noreferrer"
              className={styles.HeaderLink}
              href="https://github.com/Cooperbuilt/runtime-rundown"
            >
              <Image
                src={GithubLogo}
                height="28"
                width="28"
                alt="Github Octocat logo"
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
