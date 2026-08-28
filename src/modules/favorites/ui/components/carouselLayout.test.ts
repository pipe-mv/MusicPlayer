import { getCarouselLayout } from "./carouselLayout";

test.each([
  [320, { arrows: false, slidesToShow: 2.5 }],
  [520, { arrows: false, slidesToShow: 2.5 }],
  [521, { arrows: false, slidesToShow: 2 }],
  [768, { arrows: false, slidesToShow: 2 }],
  [769, { arrows: true, slidesToShow: 3 }],
  [1024, { arrows: true, slidesToShow: 3 }],
  [1025, { arrows: true, slidesToShow: 4 }],
])("uses the expected carousel layout at %ipx", (viewportWidth, expected) => {
  expect(getCarouselLayout(viewportWidth)).toEqual(expected);
});
