import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Footer } from "@/widgets/footer";
import faqBg from "@/shared/assets/images/faq-bg.png";

const faqItems = [
  {
    question: "Чи потрібен попередній досвід для проходження курсів?",
    answer:
      "Ні, попередній досвід не потрібен. Наші курси розроблені таким чином, щоб бути доступними для всіх рівнів підготовки. Ми починаємо з основ і поступово переходимо до більш складних тем.",
  },
  {
    question: "Скільки часу потрібно на проходження одного курсу?",
    answer:
      "Тривалість курсу залежить від обраної програми. В середньому курс розрахований на 4-8 тижнів при навантаженні 2-3 години на тиждень.",
  },
  {
    question: "Чи є можливість отримати сертифікат після завершення?",
    answer:
      "Так, після успішного завершення курсу ви отримаєте сертифікат, який підтверджує ваші навички та знання.",
  },
  {
    question: "Як записатися на курс?",
    answer:
      "Для запису на курс залиште заявку на нашому сайті або зв'яжіться з нами за телефоном. Наш менеджер зв'яжеться з вами протягом робочого дня.",
  },
  {
    question: "Чи є курси безкоштовними для ветеранів?",
    answer:
      "Так, всі наші курси є повністю безкоштовними для ветеранів та членів їхніх родин.",
  },
];

export function Faq() {
  return (
    <section className="relative z-20 ">
      <Image
        src={faqBg}
        alt=""
        className="w-full -mt-[260px] max-sm:-mt-[60px] sm:-mt-[80px] md:-mt-[120px] lg:-mt-[280px] "
      />
      <div className="absolute inset-0 z-10 flex flex-col  ">
        <div className="flex gap-[132px] px-[100px] pb-0 pt-[300px] h-fit max-md:flex-col max-md:gap-6 max-sm:px-4 max-sm:pt-[80px] sm:px-8 sm:gap-8 sm:pt-[120px] md:px-12 md:gap-12 md:pt-[180px] lg:px-16 lg:gap-20 lg:pt-[240px] xl:px-[100px] xl:gap-[132px] xl:pt-[300px] max-sm:bg-[#203236]">
          <h2 className="font-sans text-[48px] uppercase leading-tight tracking-tight text-lilac h-fit max-sm:text-[24px] sm:text-[32px] md:text-[40px] lg:text-[48px]">
            Популярні
            <br />
            питання
          </h2>
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="w-[884px] h-fit max-lg:w-full lg:w-[700px] xl:w-[884px]">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-white/20">
                <AccordionTrigger className="gap-[110px] py-6 font-sans text-2xl font-semibold text-lilac hover:no-underline [&>svg]:hidden max-sm:gap-4 max-sm:text-[16px] md:gap-8 lg:gap-16 xl:gap-[110px]">
                  <span className="w-[747px] max-lg:w-full lg:w-[600px] xl:w-[747px]">
                    {item.question}
                  </span>
                  <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                    <span className="absolute h-[2px] w-4 bg-lilac" />
                    <span className="absolute h-4 w-[2px] bg-lilac transition-transform duration-300 [[data-state=open]_&]:rotate-90" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="font-sans text-base leading-[1.5] text-lilac max-sm:text-[14px]">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    </section>
  );
}
