import { Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header
      className="
        fixed top-0 left-0 right-0
        h-16
        bg-[#FFC200]
        text-[#1A1A2E]
        flex items-center
        justify-between
        px-6
        z-50
      "
    >
      {/* LEFT - Logo */}
      <div className="font-bold text-lg">TransitHub</div>

      {/* CENTER - Search */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search..."
          className="
            w-full max-w-md
            px-4 py-2
            rounded-full
            bg-white
            placement:text-placeholder
            outline-none
            text-sm
          "
        />
      </div>

      {/* RIGHT - Icons */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="hover:opacity-80 transition">
          <Bell className="w-[20px] h-[20px]" />
        </button>

        {/* Profile */}
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-semibold">
          <img
            src="https://i.pravatar.cc/300"
            alt="Profile"
            className="w-full h-full rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
