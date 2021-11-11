import { useEffect } from 'react';

const useHorizontalScroll = (ref: any) => {
  useEffect(() => {
    const el: any = ref.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY === 0) return;
        if (
          !(el.scrollLeft === 0 && e.deltaY < 0) &&
          !(el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) === 0 &&
              e.deltaY > 0)
        ) {
          e.preventDefault();
        }
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: 'smooth'
        });
      };
      el.addEventListener('wheel', onWheel);
      return () => el.removeEventListener('wheel', onWheel);
    }
	}, [ref]);
  return ref;
}

export default useHorizontalScroll;
