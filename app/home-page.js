import Hero from '../components/Hero';
import EpisodeCard from '../components/EpisodeCard';
import styles from '../styles/Index.module.css';

export default function Home({ items }) {
  return (
    <>
      <Hero />
      <h2>All Episodes</h2>
      <div className={styles.gridWrapper}>
        {items.map(item => {
          return <EpisodeCard {...item} key={item.title} />;
        })}
      </div>
    </>
  );
}
