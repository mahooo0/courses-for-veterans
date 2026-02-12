import courseWebDevImg from "@/shared/assets/images/course-preview.png";
import courseMarketingImg from "@/shared/assets/images/course-marketing.png";
import courseWebDesignImg from "@/shared/assets/images/course-web-design.png";
import courseGraphicDesignImg from "@/shared/assets/images/course-graphic-design.png";

export const courses = [
  {
    id: "marketing",
    name: "Marketing",
    image: courseMarketingImg,
  },
  {
    id: "web-dev",
    name: "web development",
    image: courseWebDevImg,
  },
  {
    id: "web-design",
    name: "Web Design",
    image: courseWebDesignImg,
  },
  {
    id: "graphic-design",
    name: "graphic design",
    image: courseGraphicDesignImg,
  },
];

export type Course = (typeof courses)[number];
