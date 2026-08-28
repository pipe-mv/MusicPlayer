export interface CarouselLayout {
  arrows: boolean;
  slidesToShow: number;
}

export const getCarouselLayout = (viewportWidth: number): CarouselLayout => {
  if (viewportWidth <= 520) {
    return { arrows: false, slidesToShow: 2.5 };
  }

  if (viewportWidth <= 768) {
    return { arrows: false, slidesToShow: 2 };
  }

  if (viewportWidth <= 1024) {
    return { arrows: true, slidesToShow: 3 };
  }

  return { arrows: true, slidesToShow: 4 };
};
