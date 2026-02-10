"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Modal } from "@/shared/ui";
import closeIcon from "@/shared/assets/icons/close.svg";
import bulletImg from "@/shared/assets/images/bullet.png";
import type { Course } from "./Courses";

interface CoursePopupProps {
  course: Course | null;
  courses: Course[];
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
}

export function CoursePopup({
  course,
  courses,
  onClose,
  onSelectCourse,
}: CoursePopupProps) {
  if (!course) return null;

  return (
    <Modal isOpen={!!course} onClose={onClose}>
      <div className="w-[1260px] rounded-[20px] bg-lilac p-10 max-sm:w-full max-sm:h-full max-sm:rounded-none max-sm:p-6 max-sm:max-h-[100vh] max-sm:overflow-y-auto max-lg:w-[90vw] lg:w-[1000px] xl:w-[1260px]">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between max-sm:flex-col-reverse max-sm:items-end max-sm:gap-4">
          {/* Course tabs */}
          <div className="flex gap-6 max-sm:flex-wrap max-sm:gap-3">
            {courses.map((c) => (
              <button
                key={c.id}
                className={`cursor-pointer font-sans text-[24px] font-extrabold uppercase leading-[1.1] tracking-tight transition-colors duration-200 max-sm:text-[16px] md:text-[20px] xl:text-[24px] ${
                  c.id === course.id
                    ? "text-green-secondary"
                    : "text-yellow-accent"
                }`}
                onClick={() => onSelectCourse(c)}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="flex h-[24px] w-[24px] cursor-pointer items-center justify-center shrink-0"
          >
            <Image src={closeIcon} alt="Close" width={24} height={24} />
          </button>
        </div>

        {/* Course image banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={course.id}
            className="mb-6 overflow-hidden rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={course.image}
              alt={course.name}
              width={1180}
              height={180}
              className="h-[180px] w-full object-cover max-sm:h-[120px]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Course title */}
        <AnimatePresence mode="wait">
          <motion.h3
            key={course.id}
            className="mb-6 font-sans text-[48px] font-extrabold uppercase leading-[1.1] tracking-tight text-green-secondary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {course.name}
          </motion.h3>
        </AnimatePresence>

        {/* Course details grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={course.id}
            className="mb-8 grid grid-cols-2 gap-x-8 gap-y-6 max-sm:grid-cols-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}
          >
            {course.descriptions.map((desc, i) => (
              <div key={i} className="flex items-start gap-3">
                <Image
                  src={bulletImg}
                  alt=""
                  width={24}
                  height={26}
                  className="mt-0.5 h-[26px] w-[24px] shrink-0"
                />
                <p className="font-sans text-[16px] font-medium leading-[1.5] text-green-dark max-sm:text-[14px]">
                  {desc}
                </p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA button */}
        <button className="w-full cursor-pointer rounded-lg bg-yellow-accent px-6 py-4 font-sans text-[24px] font-medium uppercase leading-[1.1] tracking-tight text-green-dark transition-opacity hover:opacity-90">
          [почати сьогодні]
        </button>
      </div>
    </Modal>
  );
}
