"use client";
import { useEffect, useState } from "react";
import {
  PencilSquareIcon,
  FolderIcon,
  ClockIcon,
  TrashIcon,
  DocumentTextIcon,
  ChevronLeftIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import IconImage from "../image/5817-man-person.png";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import SideBkg from "../image/Gemini_Generated_Image_ggcvbxggcvbxggcv.png";
import { useUI } from "../context/ContextPage";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function Sidebar({
  onClose,
  isCollapsed,
  setIsCollapsed,
}: {
  onClose: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}) {
  const [isNotebooksOpen, setIsNotebooksOpen] = useState(true);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState("tasks");
  const { userName } = useUI();
  const router = useRouter();
  const handleClick = (item: string) => {
    setActiveItem(item);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const sidebarWidthClass = isCollapsed ? "w-20" : "w-74";
  const textVisibilityClass = isCollapsed ? "hidden" : "inline-block";

  useEffect(() => {
    console.log("pathname", pathname)
    handleClick(pathname.substring(1));
  }, [pathname]);

  return (
   <aside
  className={`
    fixed lg:static top-0 left-0 h-full
    px-3 py-4 ${sidebarWidthClass}
    flex flex-col bg-white border-r border-gray-200 space-y-6
    z-50 transition-transform duration-300 ease-in-out
    ${isCollapsed ? "-translate-x-[110%]" : "translate-x-0"} 
    lg:translate-x-0
  `}
>

      <div className={`flex items-center justify-between px-2 pt-5`}>
        {isCollapsed ? (
          <button
            onClick={toggleCollapse}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition"
            title="Open Sidebar"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        ) : (
          <div className="flex items-center space-x-3 shrink-0">
            <div className="bg-gray-800 p-2.5 rounded-xl">
              <PencilSquareIcon className="h-10 w-10 text-white" />
            </div>
            <span className="text-xl text-gray-800 font-semibold">
              NotePlus
            </span>
          </div>
        )}

        {!isCollapsed && (
          <button
            onClick={toggleCollapse}
            className="p-1 rounded-full text-gray-600 hover:bg-gray-100 transition ml-auto"
            title="Collapse Sidebar"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      <hr className="border-gray-300 mx-3" />

      <div className="overflow-y-auto custom-scroll-hide  flex flex-col justify-between h-screen relative">
        <div>
          <button
            className={`flex items-center w-full mb-8 px-4 py-2.5 
          ${isCollapsed ? "justify-center" : "justify-between"}`}
          >
            <div
              className={`flex items-center  ${
                isCollapsed ? "justify-center" : "space-x-4"
              }`}
            >
              <div
                className={`w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden`}
              >
                <Image
                  src={IconImage}
                  alt="User Avatar"
                  width={43}
                  height={43}
                  className="object-cover"
                />
              </div>
              <div
                className={`font-semibold text-lg transition text-gray-800 ${textVisibilityClass}`}
              >
                {userName ? (
                  userName
                ) : (
                  <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                )}
              </div>
            </div>
          </button>
          <nav className="flex-1 flex flex-col space-y-4 px-2">
            <button
              onClick={() => {
                handleClick("tasks"), router.push("/tasks");
              }}
              className={`flex items-center p-2.5 rounded-lg font-medium transition 
              ${isCollapsed ? "justify-center" : "space-x-3"} 
              ${
                activeItem === "tasks"
                  ? "bg-gray-200 text-gray-900 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <DocumentTextIcon className="h-6 w-6 shrink-0" />
              <span className={textVisibilityClass}>Your Tasks</span>
            </button>

            <div>
              <button
                onClick={() => {
                  setIsNotebooksOpen(!isNotebooksOpen);
                }}
                className={`flex items-center w-full p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition 
                ${isCollapsed ? "justify-center" : "justify-between"}`}
              >
                <div
                  className={`flex items-center ${
                    isCollapsed ? "justify-center" : "space-x-3"
                  }`}
                >
                  <FolderIcon className="h-6 w-6 shrink-0" />
                  <span className={textVisibilityClass}>Notebooks</span>
                </div>
                {!isCollapsed && (
                  <ChevronDownIcon
                    className={`h-5 w-5 transition-transform duration-300 shrink-0 ${
                      isNotebooksOpen ? "transform rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {isNotebooksOpen && !isCollapsed && (
                <div className="pl-4 mt-2 space-y-2">
                  <button
                    onClick={() => {
                      handleClick("project"), router.push("/project");
                    }}
                    className={`flex items-center w-full p-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition space-x-3 ${
                      activeItem === "project"
                        ? "bg-gray-200 text-gray-900 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <FolderIcon className="h-5 w-5 shrink-0 text-gray-400" />{" "}
                    <span>Project Plans</span>
                  </button>
                  <button
                    onClick={() => {
                      handleClick("routine"), router.push("/routine");
                    }}
                    className={`flex items-center w-full p-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition space-x-3 ${
                      activeItem === "routine"
                        ? "bg-gray-200 text-gray-900 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <FolderIcon className="h-5 w-5 shrink-0 text-gray-400" />
                    <span>Routine Notes</span>
                  </button>
                  <button
                    onClick={() => {
                      handleClick("plans"), router.push("/plans");
                    }}
                    className={`flex items-center w-full p-2 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition space-x-3 ${
                      activeItem === "plans"
                        ? "bg-gray-200 text-gray-900 font-semibold"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    }`}
                  >
                    <FolderIcon className="h-5 w-5 shrink-0 text-gray-400" />
                    <span>Planning</span>
                  </button>
                </div>
              )}
            </div>

            {/* Reminder */}
            <button
              onClick={() => {
                handleClick("completed"), router.push("/completed");
              }}
              className={`flex items-center p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition ${
                isCollapsed ? "justify-center" : "space-x-3"
              }${
                activeItem === "completed"
                  ? "bg-gray-200 text-gray-900 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <ClockIcon className="h-6 w-6 shrink-0" />
              <span className={textVisibilityClass}> &nbsp; Completed </span>
            </button>

            <button
              onClick={() => {
                handleClick("deleted"), router.push("/deleted");
              }}
              className={`flex items-center p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition ${
                isCollapsed ? "justify-center" : "space-x-3"
              }
              ${
                activeItem === "deleted"
                  ? "bg-gray-200 text-gray-900 font-semibold"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
              }`}
            >
              <TrashIcon className="h-6 w-6 shrink-0" />
              <span className={textVisibilityClass}>Bin</span>
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("userSession");
                localStorage.removeItem("userId");
                signOut({ callbackUrl: "/login" });
              }}
              className={`text-gray-800 p-2.5 rounded-lg hover:bg-gray-100 transition flex items-center cursor-pointer 
              ${isCollapsed ? "justify-center" : "space-x-3 px-4"}`}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span
                className={`text-gray-600 font-medium ${textVisibilityClass}`}
              >
                Logout
              </span>
            </button>
          </nav>
        </div>
        <div
          className={`flex flex-col items-center justify-center text-center space-y-4 mt-15 px-5 transition-opacity duration-300 ${
            isCollapsed ? "opacity-0 h-0 overflow-hidden" : "opacity-100"
          }`}
        >
          <div className="relative w-full h-[210px] overflow-hidden">
            <Image
              src={SideBkg}
              alt="Upgrade"
              fill
              className="object-cover object-center scale-110"
              priority
            />
          </div>
          <p className="text-gray-400">
            Stay organized and simplify your daily task tracking.
          </p>
        </div>
      </div>
    </aside>
  );
}
