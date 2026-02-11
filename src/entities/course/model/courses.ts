import coursePreviewImg from "@/shared/assets/images/course-preview.png";

export const courses = [
  {
    id: "marketing",
    name: "Marketing",
    image: coursePreviewImg,
  },
  {
    id: "web-dev",
    name: "web development",
    image: coursePreviewImg,
  },
  {
    id: "web-design",
    name: "Web Design",
    image: coursePreviewImg,
  },
  {
    id: "graphic-design",
    name: "graphic design",
    image: coursePreviewImg,
  },
];

export type Course = (typeof courses)[number];
