import '../styles/globals.css';
import Layout from '../components/Layout';

export const metadata = {
  title: 'Runtime Rundown',
};

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
