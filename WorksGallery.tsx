
"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { projects, ProjectCategory, Project } from "@/shared/data/projects";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";

type FilterType = "all" | ProjectCategory;

const filters: { label: string; value: FilterType }[] = [
    { label: "All Works", value: "all" },
    { label: "Des Gothic", value: "des-gothic" },
    { label: "Monsters", value: "monster" },
    { label: "Visuals & Char", value: "visual-char" },
];

function GalleryContent() {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get("category") as FilterType | null;

    const [activeFilter, setActiveFilter] = useState<FilterType>(
        categoryParam &&
            filters.some((filter) => filter.value === categoryParam)
            ? categoryParam
            : "all",
    );

    const [selectedProject, setSelectedProject] =
        useState<Project | null>(null);

    const gridRef = useRef<HTMLDivElement>(null);

    /*
     * Keep URL category and active filter synchronized.
     */
    useEffect(() => {
        const validCategory =
            categoryParam &&
            filters.some((filter) => filter.value === categoryParam)
                ? categoryParam
                : "all";

        setActiveFilter(validCategory);
    }, [categoryParam]);

    /*
     * Lock page scrolling while modal is open.
     */
    useEffect(() => {
        if (!selectedProject) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedProject]);

    /*
     * Close modal with Escape.
     */
    useEffect(() => {
        if (!selectedProject) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedProject(null);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [selectedProject]);

    /*
     * Always restore body scrolling when component unmounts.
     */
    useEffect(() => {
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const filteredProjects =
        activeFilter === "all"
            ? projects
            : projects.filter(
                  (project) => project.category === activeFilter,
              );

    /*
     * GSAP card entrance animation.
     */
    useGSAP(
        () => {
            if (!gridRef.current) return;

            const cards =
                gridRef.current.querySelectorAll(".project-card");

            if (!cards.length) return;

            gsap.fromTo(
                cards,
                {
                    y: 40,
                    opacity: 0,
                    scale: 0.96,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.04,
                    ease: "power3.out",
                    overwrite: true,
                },
            );
        },
        {
            scope: gridRef,
            dependencies: [activeFilter],
        },
    );

    const handleFilterChange = (filter: FilterType) => {
        setActiveFilter(filter);
    };

    const closeModal = () => {
        setSelectedProject(null);
    };

    return (
        <section className="relative min-h-screen w-full min-w-0 overflow-x-clip px-4 pb-32 md:px-12 lg:px-24">
            <style jsx>{`
                .card-image-wrap {
                    transition: filter 0.7s ease;
                }

                /* Lightweight glow by default */
                .card-glow .card-image-wrap {
                    filter: drop-shadow(
                        0 0 10px rgba(138, 3, 3, 0.15)
                    );
                }

                /* Mobile */
                @media (max-width: 768px) {
                    .card-glow .card-image-wrap {
                        filter: drop-shadow(
                            0 4px 8px rgba(138, 3, 3, 0.25)
                        );
                    }

                    .card-glow:hover .card-image-wrap {
                        filter: drop-shadow(
                            0 4px 12px rgba(138, 3, 3, 0.5)
                        );
                    }
                }

                /* Desktop */
                @media (min-width: 769px) {
                    .card-glow:hover .card-image-wrap {
                        filter:
                            drop-shadow(0 0 6px rgba(255, 0, 0, 0.8))
                            drop-shadow(0 0 18px rgba(161, 0, 0, 0.6))
                            drop-shadow(0 0 40px rgba(102, 0, 0, 0.4));
                    }
                }
            `}</style>

            {/* FILTERS */}
            <div className="relative z-20 -mx-4 mb-8 min-w-0 overflow-x-auto px-8 pb-4 scrollbar-hide md:mx-0 md:mb-24 md:overflow-visible md:px-0">
                <div className="flex w-max min-w-full flex-nowrap items-center justify-start gap-6 md:w-full md:justify-center">
                    {filters.map((filter) => {
                        const isActive = activeFilter === filter.value;

                        return (
                            <button
                                key={filter.value}
                                type="button"
                                onClick={() =>
                                    handleFilterChange(filter.value)
                                }
                                className={`shrink-0 whitespace-nowrap text-xs font-sans uppercase tracking-[0.2em] transition-all duration-500 md:text-sm ${
                                    isActive
                                        ? "scale-110 text-[#ff1a1a] drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]"
                                        : "text-neutral-500 hover:text-neutral-300"
                                }`}
                            >
                                {filter.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* PROJECT GRID */}
            <div
                ref={gridRef}
                className="relative z-20 grid w-full min-w-0 grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-12 md:gap-y-16 lg:grid-cols-4"
            >
                {filteredProjects.map((project, index) => {
                    /*
                     * Only first 4 images are preloaded.
                     * Remaining images use Next.js lazy loading.
                     */
                    const isPriority = index < 4;

                    return (
                        <button
                            key={project.id}
                            type="button"
                            className="project-card card-glow group flex min-w-0 w-full max-w-full cursor-pointer flex-col overflow-hidden text-left"
                            onClick={() =>
                                setSelectedProject(project)
                            }
                            aria-label={`Open ${project.title}`}
                        >
                            {/* IMAGE */}
                            <div className="card-image-wrap relative aspect-[3/4] w-full min-w-0 overflow-hidden rounded-sm border border-white/5 bg-[#0a0a0a]/50">
                                <Image
                                    src={project.src}
                                    alt={project.title}
                                    fill
                                    priority={isPriority}
                                    quality={70}
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                                    className="object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                                />

                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-10" />
                            </div>

                            {/* CARD INFO */}
                            <div className="mt-4 flex min-w-0 max-w-full flex-col md:mt-6">
                                <span className="mb-1 text-center text-[8px] font-sans uppercase tracking-[0.3em] text-[#8a0303] md:mb-2 md:text-left md:text-[10px]">
                                    {project.category.replace(
                                        "-",
                                        " ",
                                    )}
                                </span>

                                <span className="block min-w-0 max-w-full break-words text-center text-lg font-cinzel leading-tight text-neutral-300 transition-colors duration-300 group-hover:text-white md:text-left md:text-2xl">
                                    {project.title}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="fixed inset-0 z-[9999] flex h-dvh w-full max-w-[100vw] items-center justify-center overflow-hidden bg-black/95 p-4 backdrop-blur-md md:p-12 md:backdrop-blur-2xl"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{
                                scale: 0.94,
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                y: 0,
                            }}
                            exit={{
                                scale: 0.94,
                                opacity: 0,
                                y: 20,
                            }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 200,
                            }}
                            className="relative flex h-[70vh] w-full min-w-0 max-w-5xl max-h-[85vh] flex-col items-center justify-center"
                            onClick={(event) =>
                                event.stopPropagation()
                            }
                        >
                            {/* CLOSE */}
                            <button
                                type="button"
                                className="absolute right-0 top-0 z-[10000] p-4 text-white/50 transition-all duration-300 hover:rotate-90 hover:text-[#ff1a1a] md:-right-12 md:p-2"
                                onClick={closeModal}
                                title="Close"
                                aria-label="Close project"
                            >
                                <IconX
                                    size={32}
                                    stroke={1.5}
                                />
                            </button>

                            {/* FULL IMAGE */}
                            <div className="relative h-full w-full min-w-0 overflow-hidden border border-white/5 bg-black/20 shadow-[0_0_100px_rgba(138,3,3,0.2)]">
                                <Image
                                    src={selectedProject.src}
                                    alt={selectedProject.title}
                                    fill
                                    quality={80}
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                    className="object-contain"
                                />
                            </div>

                            {/* TITLE */}
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 10,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                transition={{
                                    delay: 0.15,
                                }}
                                className="pointer-events-none absolute bottom-4 left-0 w-full min-w-0 px-6 py-4 text-center bg-black/40 backdrop-blur-md md:bottom-[-80px] md:bg-transparent md:p-0 md:backdrop-blur-none"
                            >
                                <p className="mb-1 text-[8px] font-sans uppercase tracking-[0.4em] text-[#8a0303] drop-shadow-sm md:text-[10px]">
                                    {selectedProject.category.replace(
                                        "-",
                                        " ",
                                    )}
                                </p>

                                <h4 className="break-words text-xl font-cinzel uppercase tracking-widest text-neutral-200 drop-shadow-md md:text-3xl">
                                    {selectedProject.title}
                                </h4>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export const WorksGallery = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black" />}>
            <GalleryContent />
        </Suspense>
    );
};
