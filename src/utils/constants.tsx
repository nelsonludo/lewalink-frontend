import { IconType } from "react-icons";
import { MdAutoGraph } from "react-icons/md";
import { UserType } from "../types/entities/user";

type Navigation = {
  name: string;
  href: string;
  icon: IconType;
  access: UserType[];
};

export const navigation: Navigation[] = [
  {
    name: "Statistics",
    href: "/dashboard/statistics",
    icon: MdAutoGraph,
    access: [UserType.Admin, UserType.Editor],
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: MdAutoGraph,
    access: [UserType.Admin],
  },
  {
    name: "Courses",
    href: "/dashboard/courses",
    icon: MdAutoGraph,
    access: [UserType.Admin, UserType.Editor],
  },
  {
    name: "Programs",
    href: "/dashboard/programs",
    icon: MdAutoGraph,
    access: [UserType.Admin, UserType.Editor],
  },
  {
    name: "Schools",
    href: "/dashboard/schools",
    icon: MdAutoGraph,
    access: [UserType.Admin, UserType.Editor],
  },
];
