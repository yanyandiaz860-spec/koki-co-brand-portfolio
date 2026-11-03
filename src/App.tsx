import { MotionConfig } from 'motion/react';
import { Concept } from './components/Concept';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { LightboxProvider } from './components/Lightbox';
import { LogoChapter } from './components/LogoChapter';
import { Nav } from './components/Nav';
import { PostChapter } from './components/PostChapter';
import { PosterChapter } from './components/PosterChapter';
import { IntroProvider } from './components/Preloader';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <IntroProvider>
      <LightboxProvider>
        <a className="skip-link" href="#main">Skip to content</a>
        <div id="top" />
        <Nav />
        <main id="main" tabIndex={-1}>
          <Hero />
          <Concept />
          <LogoChapter />
          <PostChapter />
          <PosterChapter />
        </main>
        <Footer />
      </LightboxProvider>
      </IntroProvider>
    </MotionConfig>
  );
}
