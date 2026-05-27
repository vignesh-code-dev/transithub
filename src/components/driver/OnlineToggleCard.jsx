import { useState } from "react";

import {
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

function OnlineToggleCard() {

  const [isOnline, setIsOnline] =
    useState(true);

  return (

    <div
      className="
      bg-white
      rounded-xl
      border
      border-[#E0E0E0]
      shadow-sm
      p-5
      mb-6

      flex
      items-center
      justify-between
      "
    >

      {/* LEFT */}

      <div>

        <h2
          className="
          text-lg
          font-semibold
          text-[#1A1A2E]
          "
        >
          Driver Availability
        </h2>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-1
          "
        >
          You will receive ride requests only when online.
        </p>

      </div>

      {/* RIGHT */}

      <button
        onClick={() =>
          setIsOnline(!isOnline)
        }
        className="
        flex
        items-center
        gap-3
        "
      >

        <span
          className={`
          text-sm
          font-medium

          ${isOnline
            ? "text-[#1B5E20]"
            : "text-[#5D6D7E]"
          }
          `}
        >

          <div className="flex items-center gap-2">

  {isOnline && (

    <span
      className="
      w-2.5
      h-2.5
      rounded-full
      bg-[#43A047]
      animate-pulse
      "
    />

  )}

  <span>

    {isOnline
      ? "Online"
      : "Offline"}

  </span>

</div>

        </span>

        {isOnline ? (

          <ToggleRight
            size={42}
            className="
            text-[#43A047]
            "
          />

        ) : (

          <ToggleLeft
            size={42}
            className="
            text-[#B0BEC5]
            "
          />

        )}

      </button>

    </div>
  );
}

export default OnlineToggleCard;