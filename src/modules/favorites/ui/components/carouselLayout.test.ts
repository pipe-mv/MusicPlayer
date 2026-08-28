import { getCarouselLayout, getDotWindowStart } from "./carouselLayout";

test.each([
  [320, { arrows: false, dotLimit: 5, slidesToShow: 2.5 }],
  [520, { arrows: false, dotLimit: 5, slidesToShow: 2.5 }],
  [521, { arrows: false, dotLimit: 10, slidesToShow: 2 }],
  [768, { arrows: false, dotLimit: 10, slidesToShow: 2 }],
  [769, { arrows: true, dotLimit: 10, slidesToShow: 3 }],
  [1024, { arrows: true, dotLimit: 10, slidesToShow: 3 }],
  [1025, { arrows: true, dotLimit: 10, slidesToShow: 4 }],
])("uses the expected carousel layout at %ipx", (viewportWidth, expected) => {
  expect(getCarouselLayout(viewportWidth)).toEqual(expected);
});

test.each([
  [0, 15, 5, 0],
  [2, 15, 5, 0],
  [7, 15, 5, 5],
  [14, 15, 5, 10],
  [0, 15, 10, 0],
  [8, 15, 10, 3],
  [14, 15, 10, 5],
  [2, 4, 5, 0],
])(
  "for active %i of %i with a limit of %i, starts the dot window at %i",
  (activeIndex, dotCount, dotLimit, expectedStart) => {
    expect(getDotWindowStart(activeIndex, dotCount, dotLimit)).toBe(
      expectedStart,
    );
  },
);
