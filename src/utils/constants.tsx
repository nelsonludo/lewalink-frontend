import { IconType } from "react-icons";
import { MdAutoGraph } from "react-icons/md";

type Navigation = {
  name: string;
  href: string;
  icon: IconType;
  current: boolean;
};

export const navigation: Navigation[] = [
  {
    name: "Statistics",
    href: "/dashboard/statistics",
    icon: MdAutoGraph,
    current: true,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: MdAutoGraph,
    current: false,
  },
  {
    name: "Courses",
    href: "/dashboard/courses",
    icon: MdAutoGraph,
    current: false,
  },
  {
    name: "Programs",
    href: "/dashboard/programs",
    icon: MdAutoGraph,
    current: false,
  },
  {
    name: "Schools",
    href: "/dashboard/schools",
    icon: MdAutoGraph,
    current: false,
  },
];
