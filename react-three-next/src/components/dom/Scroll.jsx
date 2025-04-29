import { useEffect } from 'react';
import { addEffect } from '@react-three/fiber';
import { useRef } from 'react';
import Lenis from 'lenis';
import useScrollStore from '@/stores/scrollStore';
import data from '@/data/sea-level-recife-nested.json';

export default function Scroll({ children }) {
  const content = useRef(null);
  const wrapper = useRef(null);

  useEffect(() => {
    // Extract relevant data
    const scenarioData = data.scenarios.ssp119.confidence.medium.quantiles["5"].data;
    const minYear = scenarioData[0].year;
    const maxYear = scenarioData[scenarioData.length - 1].year;

    const lenis = new Lenis({
      wrapper: wrapper.current,
      content: content.current,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true
    });

    lenis.on('scroll', ({ progress }) => {
      const targetYear = minYear + progress * (maxYear - minYear);
      let index = 0;

      while (index < scenarioData.length - 1 && scenarioData[index + 1].year <= targetYear) {
        index++;
      }

      let seaLevel;
      if (index >= scenarioData.length - 1) {
        seaLevel = scenarioData[scenarioData.length - 1].value;
      } else {
        const start = scenarioData[index];
        const end = scenarioData[index + 1];
        const t = (targetYear - start.year) / (end.year - start.year);
        seaLevel = start.value + t * (end.value - start.value);
      }

      const fadeIn = Math.pow(Math.min(1, Math.max(0, progress * 5)), 1.5);
      seaLevel *= fadeIn;

      useScrollStore.getState().setScrollState({
        progress,
        year: targetYear,
        seaLevel,
      });
    });


    const effectSub = addEffect((time) => lenis.raf(time));
    return () => {
      effectSub();
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={wrapper} style={{ position: 'absolute', overflow: 'hidden', width: '100%', height: '100%', top: 0 }}>
      <div ref={content} style={{ position: 'relative', minHeight: '200vh' }}>
        {children}
      </div>
    </div>
  );
}
