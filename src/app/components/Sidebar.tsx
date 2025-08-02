"use client";

import React from "react";

type Props = {
  activeTab: "home" | "explore" | "profile";
  setActiveTab: React.Dispatch<React.SetStateAction<"home" | "explore" | "profile">>;
};

export default function Sidebar({ activeTab, setActiveTab }: Props) {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "explore", label: "Explore" },
    { id: "profile", label: "Profile" },
  ];

  return (
    <div className="w-24 bg-zinc-900 text-white min-h-screen flex flex-col items-center py-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id as Props["activeTab"])}
          className={`mb-4 text-sm ${
            activeTab === tab.id ? "font-bold underline" : ""
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
