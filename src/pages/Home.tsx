import React, { useRef } from 'react';

import Reader from '../components/Reader';
import { useAuth } from '../use-auth';


function Home(): React.ReactElement {
  const auth = useAuth();
  const readerRef = useRef(null);

  function scrollToReader() {
    if (readerRef.current !== null) {
        const readerElement = readerRef.current as unknown as HTMLDivElement
        readerElement.scrollIntoView(true);
    }
  }

  return (
    <div className="App">
      <main className="content">
        {
          !auth.user
          ?  (<section className="hero-section">
              <h1 className="hero-heading">Learn Turkish by reading</h1>
              <div className="hero-text">
                <p>Enjoy reading about anything you like in Turkish.</p>
                <p>Look up any word instantly, memorize words you looked up
                  by adding them to your flashcard program. Learning in context
                  is great for vocabulary retention!
                </p>
              </div>
              <button type="button" className="cta-button" onClick={scrollToReader}>Read in Turkish now!</button>
            </section>
            )
            : null
        }

       <Reader readerRef={readerRef} />
      </main>
    </div>
  );
}

export default Home;
