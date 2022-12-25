import { ThemeProvider } from 'next-themes';
import Script from 'next/script';

import { Footer, Navbar } from '../components';
import { NFTProvider } from '../context/NFTContext';
import '../styles/globals.css';

/**
 * Marketplace component
 * @param {*} param0 component & pageProps
 * @returns NFTProvider component
 */
const Marketplace = ({ Component, pageProps }) => (
  <NFTProvider>
    <ThemeProvider attribute="class">
      <div className="dark:bg-nft-dark bg-white min-h-screen">
        <Navbar />
        <div className="pt-65">
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>

      <Script
        src="https://kit.fontawesome.com/d45b25ceeb.js"
        crossorigin="anonymous"
      />
    </ThemeProvider>
  </NFTProvider>
);

export default Marketplace;
