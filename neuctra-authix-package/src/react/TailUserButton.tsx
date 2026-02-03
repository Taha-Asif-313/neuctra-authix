"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";

export const TailUserButton = () => {
  const [open, setOpen] = useState(false);
  const [dropUp, setDropUp] = useState(false); // flip vertically
  const [alignRight, setAlignRight] = useState(true); // flip horizontally
  const ref = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();

      const dropdownHeight = 220; // approximate height of dropdown
      const dropdownWidth = 256; // w-64 in px

      // Vertical flip
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setDropUp(spaceBelow < dropdownHeight && spaceAbove > dropdownHeight);

      // Horizontal flip
      const spaceRight = window.innerWidth - rect.right;
      const spaceLeft = rect.left;
      setAlignRight(spaceRight >= dropdownWidth || spaceRight > spaceLeft);
    }

    setOpen((prev) => !prev);
  };

  return (
    <div ref={ref} className="relative inline-block text-left">
      {/* Trigger */}
      <button
        onClick={handleToggle}
        className="group flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-3 py-1.5 shadow-sm transition hover:bg-neutral-100 focus:outline-none dark:border-neutral-800 dark:bg-black dark:hover:bg-neutral-900"
      >
        <img
          src="https://api.dicebear.com/9.x/initials/svg?seed=Alex"
          alt="User Avatar"
          className="h-8 w-8 rounded-full border border-neutral-300 dark:border-neutral-700"
        />

        <div className="hidden md:flex flex-col items-start leading-tight">
          <span className="text-sm font-medium text-neutral-900 dark:text-white">
            Alex Morgan
          </span>
          <span className="text-xs text-neutral-500">alex@email.com</span>
        </div>

        <ChevronDown
          size={16}
          className={`text-neutral-500 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute z-50 w-64 rounded-2xl border border-neutral-200 bg-white shadow-xl transition-all duration-150 dark:border-neutral-800 dark:bg-black
          ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}
          ${dropUp ? "bottom-full mb-3" : "top-full mt-3"}
          ${alignRight ? "right-0 origin-top-right" : "left-0 origin-top-left"}
        `}
      >
        {/* User card */}
        <div className="flex items-center gap-3 border-b border-neutral-200 p-4 dark:border-neutral-800">
          <img
            src="https://api.dicebear.com/9.x/initials/svg?seed=Alex"
            className="h-10 w-10 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-neutral-900 dark:text-white">
              Alex Morgan
            </p>
            <p className="text-xs text-neutral-500">alex@email.com</p>
          </div>
        </div>

        {/* Menu */}
        <div className="p-2">
          <MenuItem icon={<User size={16} />} label="My Profile" />
          <MenuItem icon={<Settings size={16} />} label="Settings" />
          <div className="my-1 h-px bg-neutral-200 dark:bg-neutral-800" />
          <MenuItem icon={<LogOut size={16} />} label="Sign out" danger />
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({
  icon,
  label,
  danger = false,
}: {
  icon: React.ReactNode;
  label: string;
  danger?: boolean;
}) => {
  return (
    <button
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition
      ${
        danger
          ? "text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
          : "text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-900"
      }`}
    >
      {icon}
      {label}
    </button>
  );
};
