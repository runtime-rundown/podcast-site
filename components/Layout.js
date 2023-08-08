import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div id="__next">
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
