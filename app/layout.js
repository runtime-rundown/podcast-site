import '../styles/globals.css';
import Layout from '../components/Layout';

// TODO: Metadata

function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}

export default RootLayout;
