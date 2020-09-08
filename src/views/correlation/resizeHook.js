import {
  useState, useCallback, useEffect
} from 'react';

export const useResize = (borderWidth = 50) => {
  const [width, setWidth] = useState(window.innerWidth - borderWidth);
  const resizeListener = useCallback(
    () => setWidth(window.innerWidth - borderWidth), [borderWidth]
  );

  useEffect(() => {
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [borderWidth, resizeListener]);

  return [width];
};
