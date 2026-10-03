import { GraduationCap, Star, Wifi, Feather } from "lucide-react";
import { COURSE_CATEGORIES } from "../../lib/courses";
import CategorySection from "../coursesCategories";
import Footer from "../ftsection.tsx";

export default function CoursesPage() {
  const totalCourses = COURSE_CATEGORIES.reduce((sum, c) => sum + c.courses.length, 0);

  return (
    <main className="bg-background">
      <nav className="fixed inset-x-0 top-0 z-30 mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 md:px-10">
              <a href="#" className="rounded-full title-font bg-background px-5 py-1.5 text-sm tracking-tight ring-1 ring-border backdrop-blur-md">
                DLAN ACADEMY
              </a>
      
              <div className="hidden items-center gap-1 rounded-full bg-white/75
               px-1 py-1 text-sm font-medium shadow-sm backdrop-blur-md md:flex">
                <a
                  href="#courses"
                  className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
                >
                  <span aria-hidden className="text-xs">
                    <GraduationCap size={20}/>
                  </span>
                  Courses
                </a>
                <a
                  href="#offer"
                  className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
                >
                  <span aria-hidden className="text-xs">
                     <Wifi size={20}/>
                  </span>
                  Our Offer
                </a>
                <a
                  href="#reviews"
                  className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
                >
                  <span aria-hidden >
                      <Star size={20}/>
                  </span>
                  Reviews
                </a>
                <a
                  href="#contact"
                  className="flex items-center gap-1.5 rounded-full px-4 py-1.5 text-foreground/70 transition hover:bg-foreground/10 hover:text-foreground"
                >
                  <span aria-hidden className="text-xs">
                      <Feather size={20}/>
                  </span>
                  Contact
                </a>
              </div>
      
              <div className="flex items-center gap-2.5">
                <div className="hidden items-center gap-1 rounded-full bg-overlay px-4 py-1.5 text-sm text-foreground/70 ring-1 ring-border backdrop-blur-md sm:flex">
                  NG <span aria-hidden>▾</span>
                </div>
                <a
                  href="/sign-in"
                  className="rounded-full med-font bg-foreground px-5 py-1.5 text-sm text-background transition hover:opacity-90"
                >
                  Enroll
                </a>
              </div>
            </nav>
      <div className="mx-auto max-w-[1320px] px-3 pb-8 pt-32 text-center sm:px-6 sm:pt-40 md:px-10">
        <span className="inline-flex select-none items-center gap-2 whitespace-nowrap rounded-full bg-foreground/10 px-3.5 py-2 text-[0.8125rem] text-foreground/70 backdrop-blur-md">
          All courses
        </span>
        <h1 className="mx-auto mt-6 max-w-[22ch] text-balance text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.06em] text-foreground">
          Every path we teach,
          <br />
          <span className="text-muted-foreground">in one place.</span>
        </h1>
        <p className="med-font mx-auto mt-3 max-w-2xl text-muted-foreground">
          {COURSE_CATEGORIES.length} categories, {totalCourses} courses. Scroll through each
          one — the courses that fit you will be the ones that make you stop.
        </p>
      </div>

      {COURSE_CATEGORIES.map((category, i) => (
        <CategorySection
          key={category.slug}
          category={category}
          index={i}
          total={COURSE_CATEGORIES.length}
        />
      ))}
      <Footer/>
    </main>
  );
}