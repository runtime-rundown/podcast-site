const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Runtime Rundown</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>
        <p>Joe and Evan, Webmasters™</p>
      </footer>
    </>
  );
};

export default Layout;
