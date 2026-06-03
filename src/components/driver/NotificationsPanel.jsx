import {
  Bell,
  CircleAlert,
  CircleCheck,
  Zap,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

function NotificationsPanel() {

   const [notifications, setNotifications] = useState([
    

    {
      id: 1,
      title: "New ride request nearby",
      description:
        "Passenger pickup request received within your active zone.",
      time: "2 mins ago",
      type: "alert",
    },

    {
      id: 2,
      title: "Trip completed successfully",
      description:
        "Payment has been added to today's earnings summary.",
      time: "15 mins ago",
      type: "success",
    },

    {
      id: 3,
      title: "Peak hour pricing active",
      description:
        "Dynamic pricing multiplier enabled for your current area.",
      time: "1 hour ago",
      type: "info",
    },
    {
      id: 4,
      title: "System maintenance scheduled",
      description:
        "Planned maintenance will occur in the next 2 hours.",
      time: "3 hours ago",
      type: "info",
    },
    {
      id: 5,
      title: "New safety guidelines",
      description:
        "Review the updated safety protocols for drivers.",
      time: "5 hours ago",
      type: "alert",
    },
    {
      id: 6,
      title: "Earnings report available",
      description: "Your weekly earnings report is now ready to view.",
      time: "1 day ago",
      type: "success",
    }





  ]);

  const styles = {

    alert: {
      icon: (
        <CircleAlert
          size={18}
          className="
          text-[#E65100]
          "
        />
      ),

      bg: "bg-[#FFF8F1]",

      border:
        "border-[#FFE0B2]",

      badge:
        "bg-[#FFE0B2] text-[#E65100]",
    },

    success: {
      icon: (
        <CircleCheck
          size={18}
          className="
          text-[#1B5E20]
          "
        />
      ),

      bg: "bg-[#F3FBF4]",

      border:
        "border-[#C8E6C9]",

      badge:
        "bg-[#C8E6C9] text-[#1B5E20]",
    },

    info: {
      icon: (
        <Zap
          size={18}
          className="
          text-[#1565C0]
          "
        />
      ),

      bg: "bg-[#F4F8FF]",

      border:
        "border-[#D6E4FF]",

      badge:
        "bg-[#DCEBFF] text-[#1565C0]",
    },

  };

  return (

    <div
      className="
      relative
      overflow-hidden

      bg-white

      border
      border-[#E8EDF3]
        shadow-[0_10px_30px_rgba(15,23,42,0.20)]

      rounded-[28px]

      p-4
      sm:p-5
      lg:p-6
      "
    >

      {/* BACKGROUND GLOW */}

      <div
        className="
        absolute
        bottom-0
        right-0

        w-56
        h-56

        bg-[#E8F5E9]

        rounded-full

        blur-3xl
        opacity-40

        translate-x-20
        translate-y-20
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">

        {/* HEADER */}

        <div
          className="
          flex
          items-start
          justify-between

          gap-4

          mb-6
          "
        >

          <div>

            {/* BADGE */}

            <div
              className="
              inline-flex
              items-center
              gap-2

              px-3
              py-1.5

              rounded-full

              bg-[#E8F5E9]

              text-[#1B5E20]

              mb-4
              "
            >

              <Bell size={14} />

              <span
                className="
                text-xs
                font-semibold
                "
              >
                Live Updates
              </span>

            </div>

            {/* TITLE */}

            <h2
              className="
              text-xl
              sm:text-2xl

              font-bold
              text-[#1A1A2E]
              "
            >
              Notifications
            </h2>

            <p
              className="
              text-sm
              sm:text-[15px]

              leading-6

              text-[#5D6D7E]

              mt-2
              max-w-md
              "
            >
              Real-time ride alerts,
              operational updates and
              driver activity notifications.
            </p>

          </div>






          {/* COUNT */}

          <div
            className="
            hidden
            sm:flex

            items-center
            justify-center

            min-w-[58px]
            h-[58px]

            rounded-2xl

            bg-[#F8FAFC]

            border
            border-[#E2E8F0]
            "
          >

            <div className="text-center">

              <h3
                className="
                text-lg
                font-bold
                text-[#1A1A2E]
                "
              >
                {notifications.length}
              </h3>

              <p
                className="
                text-[11px]
                font-medium
                text-[#94A3B8]
                "
              >
                NEW
              </p>

            </div>

          </div>

        </div>

        {/* LIST */}
        <div className="flex justify-end mb-4">
          {notifications.length > 0 && (
  <button variant="outline" className="
            sm:flex
 text-[13px]
            items-center
            justify-center

            p-2
            rounded-2xl

            bg-[#F8FAFC]

            border
            border-[#E2E8F0]"  size="sm"
            
            onClick={() => setNotifications([])}>
            Clear All
           </button>
)}
        </div>
        <div
          className="
          space-y-4
          "
        >


          {notifications.map((item) => {

            const current =
              styles[item.type];

            return (

              <div
                key={item.id}

                className={`
                relative
                overflow-hidden

                rounded-2xl

                border

                p-4
                sm:p-5

                transition-all
                duration-300

                hover:-translate-y-1
                hover:shadow-[0_16px_40px_rgba(15,23,42,0.08)]

                ${current.bg}
                ${current.border}
                `}
              >

                {/* SIDE GLOW */}

                <div
                  className="
                  absolute
                  top-0
                  left-0

                  w-1
                  h-full

                  bg-[#1B5E20]
                  opacity-10
                  "
                />

                <div
                  className="
                  flex
                  items-start
                  gap-4
                  "
                >

                  {/* ICON */}

                  <div
                    className="
                    w-11
                    h-11

                    rounded-2xl

                    bg-white/70

                    border
                    border-white/60

                    flex
                    items-center
                    justify-center

                    shrink-0
                    "
                  >

                    {current.icon}

                  </div>

                  {/* CONTENT */}

                  <div className="flex-1 min-w-0">

                    {/* TOP */}

                    <div
                      className="
                      flex
                      items-start
                      justify-between

                      gap-3
                      "
                    >

                      <div>

                        <h3
                          className="
                          text-sm
                          sm:text-[15px]

                          leading-6

                          font-semibold
                          text-[#1A1A2E]
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                          text-sm
                          leading-6

                          text-[#5D6D7E]

                          mt-1
                          "
                        >
                          {item.description}
                        </p>

                      </div>

                      <ChevronRight
                        size={18}
                        className="
                        text-[#94A3B8]
                        shrink-0
                        "
                      />

                    </div>

                    {/* BOTTOM */}

                    <div
                      className="
                      flex
                      flex-wrap
                      items-center

                      gap-3

                      mt-4
                      "
                    >

                      <div
                        className={`
                        inline-flex
                        items-center

                        px-2.5
                        py-1

                        rounded-full

                        text-[11px]
                        font-semibold

                        ${current.badge}
                        `}
                      >
                        Active
                      </div>

                      <p
                        className="
                        text-xs
                        font-medium
                        text-[#94A3B8]
                        "
                      >
                        {item.time}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
}

export default NotificationsPanel;