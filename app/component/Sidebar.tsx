"use client";
import { useState } from "react";
import {
  PencilSquareIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  DocumentTextIcon,
  FolderIcon,
  ClockIcon,
  TagIcon,
  TrashIcon,
  HashtagIcon,
  ChevronRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import IconImage from "../image/5817-man-person.png";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import SideBkg from "../image/side-bkg.png";

export default function Sidebar({ onClose }: { onClose: () => void }) {
  const [isNotebooksOpen, setIsNotebooksOpen] = useState(true);
  const activeItem = "Routine Notes";

  return (
    <aside
      className="h-full sticky top-0 w-66 flex flex-col bg-white border-r border-gray-200 
  lg:rounded-t-xl space-y-6"
    >
      <div className="flex justify-between px-5 pt-5">
        <div className="flex items-center space-x-3 px-1">
          <div className="bg-gray-800 p-2.5 rounded-xl">
            <PencilSquareIcon className="h-10 w-10 text-white" />
          </div>
          <span className="text-xl text-gray-800">NotePlus</span>
        </div>
        <div className="flex justify-end lg:hidden">
          <button onClick={onClose} className="p-2 text-gray-900">
            <XMarkIcon className="h-8 w-8" />
          </button>
        </div>
      </div>

      <hr className="border-gray-300 mx-5" />

      <button className="flex items-center justify-between w-full px-5 py-2.5 hover:bg-gray-100 transition">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src={IconImage}
              alt="User Avatar"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="font-semibold text-gray-800">Bud Wiser</span>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-gray-500" />
      </button>

      <div className="overflow-y-auto flex-1 pb-5 custom-scroll-hide">
        <div className="relative mb-6 px-5">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-8 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-100 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="flex items-center justify-between w-full mx-5 px-3 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition max-w-[calc(100%-40px)]">
          <div className="flex items-center space-x-3">
            <PlusIcon className="h-5 w-5" />
            <span className="font-semibold">Add New</span>
          </div>
          <ChevronDownIcon className="h-5 w-5" />
        </button>

        <nav className="flex-1 flex flex-col space-y-4 mt-6 px-5">
          <a
            href="#"
            className="flex items-center space-x-3 p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <DocumentTextIcon className="h-6 w-6" />
            <span>Your Notes</span>
          </a>

          <div>
            <button
              onClick={() => setIsNotebooksOpen(!isNotebooksOpen)}
              className="flex items-center justify-between w-full p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
            >
              <div className="flex items-center space-x-3">
                <FolderIcon className="h-6 w-6" />
                <span>Notebooks</span>
              </div>
              <ChevronDownIcon
                className={`h-5 w-5 transition-transform ${
                  isNotebooksOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isNotebooksOpen && (
              <div className="pl-6 mt-2 space-y-1">
                <a
                  href="#"
                  className={`flex items-center space-x-3 p-2.5 rounded-lg font-medium transition text-gray-500 hover:bg-gray-100 hover:text-gray-800`}
                >
                  <FolderIcon className="h-5 w-5" />
                  <span>Project Plans</span>
                </a>
                <a
                  href="#"
                  className={`flex items-center space-x-3 p-2.5 rounded-lg font-medium transition ${
                    activeItem === "Routine Notes"
                      ? "text-gray-900 font-semibold bg-gray-100"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                  }`}
                >
                  <FolderIcon className="h-5 w-5" />
                  <span>Routine Notes</span>
                </a>
                <a
                  href="#"
                  className={`flex items-center space-x-3 p-2.5 rounded-lg font-medium transition text-gray-500 hover:bg-gray-100 hover:text-gray-800`}
                >
                  <FolderIcon className="h-5 w-5" />
                  <span>Planning</span>
                </a>
              </div>
            )}
          </div>
          <a
            href="#"
            className="flex items-center space-x-3 p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <ClockIcon className="h-6 w-6" />
            <span>Reminder</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <TagIcon className="h-6 w-6" />
            <span>Tags</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-3 p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <TrashIcon className="h-6 w-6" />
            <span>Bin</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <div className="flex items-center space-x-3">
              <HashtagIcon className="h-6 w-6" />
              <span>Other Page</span>
            </div>
            <ChevronRightIcon className="h-5 w-5" />
          </a>
          <a
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </a>
        </nav>
        <div className="flex flex-col items-center justify-center text-center space-y-4 mt-8 px-5">
          <Image
            src={SideBkg}
            width={200}
            height={180}
            alt="Upgrade"
            className="mx-auto"
          />
          <p className="text-gray-400">
            Set Business Account To Explore Premium Features
          </p>
          <button className="w-24 bg-gray-800 text-white py-2.5 rounded-xl transition">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
