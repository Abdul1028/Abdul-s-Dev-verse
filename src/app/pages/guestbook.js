import Script from 'next/script';
import Head from 'next/head';

function GuestbookPage() {
  return (
    <>
      <Head>
        <title>Guestbook</title>
        <meta name="description" content="Leave your comments and messages on the guestbook." />
      </Head>
      <div className="guestbook-container">
        <h1>Guestbook</h1>
        <p>Share your thoughts, comments, or just say hi!</p>
        
        <div className="giscus-embed">
          <Script
            src="https://giscus.app/client.js"
            data-repo="abdul1028/KalTrack"
            data-repo-id="R_kgDOMxa8Bg"
            data-category="General"
            data-category-id="DIC_kwDOMxa8Bs4CqPAs"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="bottom"
            data-theme="fro"
            data-lang="en"
            crossOrigin="anonymous"
            async
            strategy="afterInteractive" // Ensures the script loads after the page is interactive
          />
        </div>
      </div>

      <style jsx>{`
        .guestbook-container {
          max-width: 800px;
          margin: 3rem auto;
          padding: 2rem;
          text-align: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        h1 {
          color: #333;
          margin-bottom: 1rem;
        }
        p {
          color: #555;
          margin-bottom: 2rem;
          font-size: 1.1rem;
        }
        .giscus-embed {
          margin-top: 2rem;
          min-height: 400px; /* Placeholder for Giscus iframe */
        }
      `}</style>
      <style jsx global>{`
        body {
          margin: 0;
          background-color: #f4f4f4;
          color: #333;
        }
      `}</style>
    </>
  );
}

export default GuestbookPage; 