import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <nav className={styles.Header}>
      <ul>
        <li>
          <a href="#">Spotify</a>
        </li>
        <li>
          <a href="#">Apple Podcasts</a>
        </li>
        <li>
          <a href="#">PocketCast</a>
        </li>
        <li>
          <a href="#">RSS Feed</a>
        </li>
        <li>
          <a href="#">Site Repo</a>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
