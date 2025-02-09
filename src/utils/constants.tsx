import { IconType } from "react-icons";
import { MdLibraryBooks } from "react-icons/md";
import { RiBookShelfLine } from "react-icons/ri";
import { UserType } from "../types/entities/user";
import { FaBuildingColumns, FaUsers } from "react-icons/fa6";
import { BsFileBarGraph } from "react-icons/bs";

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
    icon: BsFileBarGraph,
    access: [UserType.Admin, UserType.Editor],
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: FaUsers,
    access: [UserType.Admin],
  },
  {
    name: "Courses",
    href: "/dashboard/courses",
    icon: MdLibraryBooks,
    access: [UserType.Admin, UserType.Editor],
  },
  {
    name: "Programs",
    href: "/dashboard/programs",
    icon: RiBookShelfLine,
    access: [UserType.Admin, UserType.Editor],
  },
  {
    name: "Schools",
    href: "/dashboard/schools",
    icon: FaBuildingColumns,
    access: [UserType.Admin, UserType.Editor],
  },
];
