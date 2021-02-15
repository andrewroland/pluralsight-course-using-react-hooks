import React, { useEffect, useRef, useState } from 'react';

const ImageToggleOnScroll = ({ primaryImg, secondaryImg }) => {
  const imageRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isInView = () => {
    const rect = imageRef.current.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  useEffect(() => {
    setIsLoading(false);
    setInView(isInView());
    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = () => {
    setInView(isInView());
  };

  return (
    <img
      src={
        isLoading ? 'data:image/gif;base64' : inView ? secondaryImg : primaryImg
      }
      alt=""
      ref={imageRef}
    />
  );
};

export default ImageToggleOnScroll;
