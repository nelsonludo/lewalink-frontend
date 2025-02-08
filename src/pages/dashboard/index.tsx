// "use client";

// import { useState } from "react";
// import { Dialog, DialogPanel } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import { navigation } from "../../utils/constants";
// import { AuthInitialStateType } from "../../store/auth.slice";
// import { useSelector } from "react-redux";
// import { NavLink, Outlet } from "react-router-dom";

// export default function Example() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const { user }: AuthInitialStateType = useSelector(
//     (state: any) => state.authSlice
//   );

//   return (
//     <>
//       <div>
//         <Dialog
//           open={sidebarOpen}
//           onClose={setSidebarOpen}
//           className="relative z-50 lg:hidden"
//         >
//           <div className="fixed inset-0 flex">
//             <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
//               <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
//                 <button
//                   type="button"
//                   onClick={() => setSidebarOpen(false)}
//                   className="-m-2.5 p-2.5"
//                 >
//                   <span className="sr-only">Close sidebar</span>
//                   <XMarkIcon aria-hidden="true" className="size-6 text-white" />
//                 </button>
//               </div>

//               <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
//                 <div className="flex h-16 shrink-0 items-center">
//                   <img
//                     alt="Your Company"
//                     src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=white"
//                     className="h-8 w-auto"
//                   />
//                 </div>
//                 <nav className="flex flex-1 flex-col">
//                   <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                     <li>
//                       <ul role="list" className="-mx-2 space-y-1">
//                         {navigation.map((item) => (
//                           <li key={item.name}>
//                             <NavLink
//                               to={item.href}
//                               className={({ isActive }) =>
//                                 `group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold ${
//                                   isActive
//                                     ? "bg-indigo-700 text-white"
//                                     : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
//                                 }`
//                               }
//                             >
//                               {({ isActive }) => (
//                                 <>
//                                   <item.icon
//                                     aria-hidden="true"
//                                     className={`size-6 shrink-0 ${
//                                       isActive
//                                         ? "text-white"
//                                         : "text-indigo-200 group-hover:text-white"
//                                     }`}
//                                   />
//                                   {item.name}
//                                 </>
//                               )}
//                             </NavLink>
//                           </li>
//                         ))}
//                       </ul>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//             </DialogPanel>
//           </div>
//         </Dialog>

//         {/* Static sidebar for desktop */}
//         <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ">
//           {/* Sidebar component, swap this element with another sidebar if you like */}
//           <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
//             <div className="flex h-16 shrink-0 items-center">
//               <img
//                 alt="Your Company"
//                 src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=white"
//                 className="h-8 w-auto"
//               />
//             </div>
//             <nav className="flex flex-1 flex-col">
//               <ul role="list" className="flex flex-1 flex-col gap-y-7">
//                 <li>
//                   <ul role="list" className="-mx-2 space-y-1">
//                     {navigation.map((item) => (
//                       <li key={item.name}>
//                         <NavLink
//                           to={item.href}
//                           className={({ isActive }) =>
//                             isActive
//                               ? "bg-indigo-700 text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
//                               : "text-indigo-200 hover:bg-indigo-700 hover:text-white group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
//                           }
//                         >
//                           {({ isActive }) => (
//                             <>
//                               <item.icon
//                                 aria-hidden="true"
//                                 className={`size-6 shrink-0 ${
//                                   isActive
//                                     ? "text-white"
//                                     : "text-indigo-200 group-hover:text-white"
//                                 }`}
//                               />
//                               {item.name}
//                             </>
//                           )}
//                         </NavLink>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>

//                 <li className="-mx-6 mt-auto">
//                   <a
//                     href="#"
//                     className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-indigo-700"
//                   >
//                     <img
//                       alt=""
//                       src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                       className="size-8 rounded-full bg-indigo-700"
//                     />
//                     <span className="sr-only">Your profile</span>
//                     <span aria-hidden="true">{user?.name}</span>
//                   </a>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         </div>

//         <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-xs sm:px-6 lg:hidden">
//           <button
//             type="button"
//             onClick={() => setSidebarOpen(true)}
//             className="-m-2.5 p-2.5 text-indigo-200 lg:hidden"
//           >
//             <span className="sr-only">Open sidebar</span>
//             <Bars3Icon aria-hidden="true" className="size-6" />
//           </button>
//           <div className="flex-1 text-sm/6 font-semibold text-white">
//             Dashboard
//           </div>
//           <a href="#">
//             <span className="sr-only">Your profile</span>
//             <img
//               alt=""
//               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               className="size-8 rounded-full bg-indigo-700"
//             />
//           </a>
//         </div>

//         <main className="py-10 lg:pl-72">
//           <div className="px-4 sm:px-6 lg:px-8">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }

"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../utils/smallFunctions";
import { NavLink, Outlet } from "react-router-dom";
import { navigation } from "../../utils/constants";
import { AuthInitialStateType } from "../../store/auth.slice";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user }: AuthInitialStateType = useSelector(
    (state: any) => state.authSlice
  );

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <div className="fixed inset-0 flex">
            <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full">
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                <div className="flex h-16 shrink-0 items-center">
                  <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <NavLink
                              to={item.href}
                              className={({ isActive }) =>
                                classNames(
                                  isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                )
                              }
                            >
                              <item.icon
                                aria-hidden="true"
                                className="size-6 shrink-0"
                              />
                              {item.name}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={item.href}
                          className={({ isActive }) =>
                            classNames(
                              isActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:bg-gray-800 hover:text-white",
                              "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                            )
                          }
                        >
                          <item.icon
                            aria-hidden="true"
                            className="size-6 shrink-0"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>

                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800"
                  >
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full bg-gray-800"
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">{user?.name}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-xs sm:px-6 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
          <div className="flex-1 text-sm/6 font-semibold text-white">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              alt=""
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="size-8 rounded-full bg-gray-800"
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
