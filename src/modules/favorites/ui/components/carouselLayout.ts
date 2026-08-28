export interface CarouselLayout {
  arrows: boolean;
  dotLimit: number;
  slidesToShow: number;
}

export const getCarouselLayout = (viewportWidth: number): CarouselLayout => {
  if (viewportWidth <= 520) {
    return { arrows: false, dotLimit: 5, slidesToShow: 2.5 };
  }

  if (viewportWidth <= 768) {
    return { arrows: false, dotLimit: 10, slidesToShow: 2 };
  }

  if (viewportWidth <= 1024) {
    return { arrows: true, dotLimit: 10, slidesToShow: 3 };
  }

  return { arrows: true, dotLimit: 10, slidesToShow: 4 };
};

export const getDotWindowStart = (
  activeIndex: number,
  dotCount: number,
  dotLimit: number,
) => {
  const lastStart = Math.max(0, dotCount - dotLimit);
  const centeredStart = activeIndex - Math.floor(dotLimit / 2);

  return Math.max(0, Math.min(centeredStart, lastStart));
};
