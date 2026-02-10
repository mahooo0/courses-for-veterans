import coursePreviewImg from "@/shared/assets/images/course-preview.png";

export const courses = [
  {
    id: "marketing",
    name: "Marketing",
    image: coursePreviewImg,
    descriptions: [
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
    ],
  },
  {
    id: "web-dev",
    name: "web development",
    image: coursePreviewImg,
    descriptions: [
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
    ],
  },
  {
    id: "web-design",
    name: "Web Design",
    image: coursePreviewImg,
    descriptions: [
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
    ],
  },
  {
    id: "graphic-design",
    name: "graphic design",
    image: coursePreviewImg,
    descriptions: [
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
      "Lorem ipsum dolor sit amet consectetur. Donec aenean sagittis urna cursus tellus odio.",
      "Lorem ipsum dolor sit amet consectetur. Facilisis quam non at aliquam faucibus hendrerit.",
    ],
  },
];

export type Course = (typeof courses)[number];
