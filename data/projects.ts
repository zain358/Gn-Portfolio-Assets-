export type ProjectCategory = "des-gothic" | "monster" | "visual-char";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  src: string;
  size: "small" | "medium" | "large";
}

export const projects: Project[] = [
  {
    id: "dg-1",
    title: "Fusehime Soryu",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg1.webp",
    size: "large",
  },
  {
    id: "dg-3",
    title: "Cursed Chalice",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg3.webp",
    size: "medium",
  },
  {
    id: "dg-4",
    title: "Angeletta",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg4.webp",
    size: "large",
  },
  {
    id: "dg-5",
    title: "Yoruki Matsunoa",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg5.webp",
    size: "small",
  },
  {
    id: "dg-6",
    title: "Irae",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg6.webp",
    size: "large",
  },
  {
    id: "dg-8",
    title: "Darcelle L.Nocturne",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg8.webp",
    size: "medium",
  },
  {
    id: "dg-10",
    title: "Pearlie",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg10.webp",
    size: "medium",
  },
  {
    id: "dg-11",
    title: "Jean Baptiste",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg11.webp",
    size: "small",
  },
  {
    id: "dg-12",
    title: "Akuma",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg12.webp",
    size: "large",
  },
  {
    id: "dg-13",
    title: "Lysandra Onyx Nocté",
    category: "des-gothic",
    src: "/assets/projects-optimized/des-gothic/dg13.webp",
    size: "medium",
  },

  {
    id: "m-1",
    title: "Asaktra",
    category: "monster",
    src: "/assets/projects-optimized/monsters/asaktra.webp",
    size: "large",
  },
  {
    id: "m-2",
    title: "Belican Acedia",
    category: "monster",
    src: "/assets/projects-optimized/monsters/belican-acedia.webp",
    size: "small",
  },
  {
    id: "m-3",
    title: "Butler",
    category: "monster",
    src: "/assets/projects-optimized/monsters/butler.webp",
    size: "medium",
  },
  {
    id: "m-4",
    title: "Cat Cuu Linh",
    category: "monster",
    src: "/assets/projects-optimized/monsters/cat-cuu-linh.webp",
    size: "medium",
  },
  {
    id: "m-5",
    title: "Chimera",
    category: "monster",
    src: "/assets/projects-optimized/monsters/chimera.webp",
    size: "large",
  },
  {
    id: "m-6",
    title: "Coeden",
    category: "monster",
    src: "/assets/projects-optimized/monsters/coeden.webp",
    size: "large",
  },
  {
    id: "m-7",
    title: "Imerion Almost",
    category: "monster",
    src: "/assets/projects-optimized/monsters/imerion-almost.webp",
    size: "medium",
  },
  {
    id: "m-8",
    title: "Momos",
    category: "monster",
    src: "/assets/projects-optimized/monsters/momos.webp",
    size: "small",
  },
  {
    id: "m-9",
    title: "Nihilia",
    category: "monster",
    src: "/assets/projects-optimized/monsters/nihilia.webp",
    size: "medium",
  },
  {
    id: "m-10",
    title: "Qixiao",
    category: "monster",
    src: "/assets/projects-optimized/monsters/qixiao.webp",
    size: "large",
  },
  {
    id: "m-11",
    title: "Tekina",
    category: "monster",
    src: "/assets/projects-optimized/monsters/tekina.webp",
    size: "medium",
  },
  {
    id: "m-12",
    title: "Veles Mabuz",
    category: "monster",
    src: "/assets/projects-optimized/monsters/veles-mabuz.webp",
    size: "large",
  },
  {
    id: "m-13",
    title: "Zueh",
    category: "monster",
    src: "/assets/projects-optimized/monsters/zueh.webp",
    size: "medium",
  },

  {
    id: "vc-1",
    title: "Kantel Board",
    category: "visual-char",
    src: "/assets/projects-optimized/visuals/kantel-board.webp",
    size: "large",
  },
];

