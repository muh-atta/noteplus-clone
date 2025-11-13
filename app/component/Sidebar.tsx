"use client";
import { useState } from "react";
import {
  PencilSquareIcon,
  FolderIcon,
  ClockIcon,
  TagIcon,
  TrashIcon,
  HashtagIcon,
  ChevronRightIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { XMarkIcon } from "@heroicons/react/24/solid";
import IconImage from "../image/5817-man-person.png";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import SideBkg from "../image/side-bkg.png";
import { useUI } from "../context/ContextPage";

export default function Sidebar({ onClose }: { onClose: () => void }) {
  const [isNotebooksOpen, setIsNotebooksOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Your Notes");
  const { userName } = useUI();
  const handleClick = (item: string) => {
    if (item === "Your Notes") {
      setActiveItem(item);
    } else {
      alert("Feature Coming soon!");
    }
  };

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
          <span className="text-xl text-gray-800 font-semibold">NotePlus</span>
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
          <span className="font-semibold text-gray-800">{userName}</span>
        </div>
      </button>

      <div className="overflow-y-auto flex-1 pb-5 custom-scroll-hide">
        <nav className="flex-1 flex flex-col space-y-4 mt-6 px-5">
          <button
            onClick={() => handleClick("Your Notes")}
            className={`flex items-center space-x-3 p-2.5 rounded-lg font-medium transition ${
              activeItem === "Your Notes"
                ? "bg-gray-200 text-gray-900 font-semibold"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            }`}
          >
            <DocumentTextIcon className="h-6 w-6" />
            <span>Your Notes</span>
          </button>

          <button
            onClick={() => {
              setIsNotebooksOpen(!isNotebooksOpen);
              alert("Feature Coming soon!");
            }}
            className="flex items-center justify-between w-full p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <div className="flex items-center space-x-3">
              <FolderIcon className="h-6 w-6" />
              <span>Notebooks</span>
            </div>
          </button>

          <button
            onClick={() => handleClick("Reminder")}
            className="flex items-center space-x-3 p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <ClockIcon className="h-6 w-6" />
            <span>Reminder</span>
          </button>

          {/* Tags */}
          <button
            onClick={() => handleClick("Tags")}
            className="flex items-center space-x-3 p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <TagIcon className="h-6 w-6" />
            <span>Tags</span>
          </button>

          {/* Bin */}
          <button
            onClick={() => handleClick("Bin")}
            className="flex items-center space-x-3 p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <TrashIcon className="h-6 w-6" />
            <span>Bin</span>
          </button>

          {/* Other Page */}
          <button
            onClick={() => handleClick("Other Page")}
            className="flex items-center justify-between p-2.5 rounded-lg text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <div className="flex items-center space-x-3">
              <HashtagIcon className="h-6 w-6" />
              <span>Other Page</span>
            </div>
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          {/* Logout */}
          <button
            onClick={() => {
              localStorage.removeItem("userSession");
              localStorage.removeItem("userId");
              signOut({ callbackUrl: "/login" });
            }}
            className="text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition flex items-center gap-2 cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
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
          <button
            className="w-24 bg-gray-800 text-white py-2.5 rounded-xl transition"
            onClick={() => handleClick("Other Page")}
          >
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}
