"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import coursePreviewImg from "@/shared/assets/images/course-preview.png";
import coursesBgImg from "@/shared/assets/images/courses-bg.png";
import { CoursePopup } from "./CoursePopup";

const courses = [
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

export function Courses() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <>
      <section className="relative h-[1048px] overflow-hidden bg-green-dark px-[100px] pt-[52px] pb-[80px] max-sm:h-auto max-sm:px-4 sm:px-8 md:px-12 md:h-auto lg:px-16 lg:h-[900px] xl:px-[100px] xl:h-[1048px]">
        {/* Decorative cross pattern background */}
        <Image
          src={coursesBgImg}
          alt=""
          fill
          className="pointer-events-none object-cover"
        />

        <div className="relative mx-auto w-[1528px] max-lg:w-full lg:w-[1200px] xl:w-[1528px]">
          {/* Title row */}
          <div className="flex items-start justify-between max-sm:flex-col max-sm:gap-4">
            <h2 className="font-sans text-[36px] font-normal uppercase leading-[1.1] tracking-tight text-yellow-accent max-sm:text-[24px]">
              Доступні курси
            </h2>
            <p className="w-[495px] font-sans text-[20px] font-medium leading-[1.2] tracking-tight text-yellow-accent max-sm:w-full max-sm:text-[16px] max-lg:w-full lg:w-[495px]">
              Whether you&apos;re starting fresh or leveling up, our courses are
              designed to help you achieve your goals.
            </p>
          </div>

          {/* Course names + hover image container */}
          <div className="relative mt-[117px] max-sm:mt-10">
            {/* Course names */}
            <div
              className="flex flex-col items-center gap-2 max-sm:flex-row max-sm:flex-wrap max-sm:justify-center max-sm:gap-x-10 max-sm:gap-y-4"
              onMouseLeave={() => setHoveredIndex(null)}>
              {courses.map((course, i) => (
                <motion.button
                  key={course.id}
                  className="cursor-pointer text-center font-sans text-[120px] font-extrabold uppercase leading-[1.1] tracking-tight text-yellow-accent max-sm:text-[40px] sm:text-[48px] md:text-[64px] lg:text-[90px] xl:text-[120px]"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onClick={() => setSelectedCourse(course)}
                  animate={{
                    filter: hoveredIndex === i ? "blur(11px)" : "blur(0px)",
                  }}
                  transition={{ duration: 0.3 }}>
                  {course.name}
                </motion.button>
              ))}
            </div>

            {/* Hover image */}
          </div>
        </div>
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              className="pointer-events-none absolute bottom-[94px] right-[67px] w-[364px] overflow-hidden rounded-lg max-md:hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}>
              <Image
                src={courses[hoveredIndex].image}
                alt={courses[hoveredIndex].name}
                width={364}
                height={518}
                className="h-[518px] w-[364px] object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Course popup */}
      <CoursePopup
        course={selectedCourse}
        courses={courses}
        onClose={() => setSelectedCourse(null)}
        onSelectCourse={setSelectedCourse}
      />
    </>
  );
}
