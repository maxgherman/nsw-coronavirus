import {
  useState, useCallback, useEffect
} from 'react';

const calculateWidth = () => {
  if (window.innerWidth < 1200) {
    return window.innerWidth;
  }

  if (window.innerWidth < 1600) {
    return window.innerWidth - 300;
  }

  return window.innerWidth - 400;
};

export const useResize = (borderWidth = 50) => {
  const [width, setWidth] = useState(calculateWidth() - borderWidth);
  const resizeListener = useCallback(
    () => setWidth(calculateWidth() - borderWidth), [borderWidth]
  );

  useEffect(() => {
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [borderWidth, resizeListener]);

  return [width];
};
