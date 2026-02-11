"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { useTranslation } from "@/shared/i18n";
import closeIcon from "@/shared/assets/icons/close.svg";
import bulletImg from "@/shared/assets/images/bullet.png";
import type { Course } from "@/entities/course";

interface CoursePopupProps {
  course: Course | null;
  courses: Course[];
  onClose: () => void;
  onSelectCourse: (course: Course) => void;
  onStartToday: () => void;
}

export function CoursePopup({
  course,
  courses,
  onClose,
  onSelectCourse,
  onStartToday,
}: CoursePopupProps) {
  const { t } = useTranslation();

  if (!course) return null;

  const handleStartToday = () => {
    onClose();
    onStartToday();
  };

  return (
    <Dialog
      open={!!course}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}>
      <DialogContent
        showCloseButton={false}
        className="!min-w-[1260px] max-md:!min-w-screen  rounded-[20px] border-none bg-lilac p-10 max-sm:!w-full max-sm:top-0 max-sm:left-0 max-sm:!h-full max-sm:translate-x-0 max-sm:translate-y-0 max-sm:rounded-none max-sm:p-6 max-sm:overflow-y-auto">
        {/* Accessible hidden description */}
        <DialogDescription className="sr-only">
          Course details
        </DialogDescription>

        {/* Top bar */}
        <div className="flex items-center justify-between max-sm:flex-col-reverse max-sm:items-end max-sm:gap-4">
          {/* Course tabs */}
          <div className="flex gap-6 max-sm:flex-wrap max-sm:gap-3">
            {courses.map((c) => (
              <button
                key={c.id}
                className={`cursor-pointer font-sans text-[24px] font-extrabold uppercase leading-[1.1] tracking-tight transition-colors duration-200 max-sm:text-[16px] md:text-[20px] xl:text-[24px] ${
                  c.id === course.id ?
                    "text-green-secondary"
                  : "text-yellow-accent"
                }`}
                onClick={() => onSelectCourse(c)}>
                {c.name}
              </button>
            ))}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="flex h-[24px] w-[24px] shrink-0 cursor-pointer items-center justify-center">
            <Image src={closeIcon} alt="Close" width={24} height={24} />
          </button>
        </div>

        {/* Course image banner */}
        <AnimatePresence mode="wait">
          <motion.div
            key={course.id}
            className="overflow-hidden rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}>
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
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}>
            <DialogTitle className="font-sans text-[48px] font-extrabold uppercase leading-[1.1] tracking-tight text-green-secondary">
              {course.name}
            </DialogTitle>
          </motion.div>
        </AnimatePresence>

        {/* Course details grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={course.id}
            className="grid grid-cols-2 gap-x-8 gap-y-6 max-sm:grid-cols-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.05 }}>
            {(t.courses.courseDescriptions[course.id] ?? []).map((desc, i) => (
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
        <button
          onClick={handleStartToday}
          className="w-full cursor-pointer rounded-lg bg-yellow-accent px-6 py-4 font-sans text-[24px] font-medium uppercase leading-[1.1] tracking-tight text-green-dark transition-opacity hover:opacity-90">
          {t.courses.startToday}
        </button>
      </DialogContent>
    </Dialog>
  );
}
