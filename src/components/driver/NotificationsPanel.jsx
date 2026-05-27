import {
  Bell,
  CircleAlert,
  CircleCheck,
} from "lucide-react";

function NotificationsPanel() {

  const notifications = [

    {
      id: 1,
      title: "New ride request nearby",
      time: "2 mins ago",
      type: "alert",
    },

    {
      id: 2,
      title: "Trip completed successfully",
      time: "15 mins ago",
      type: "success",
    },

    {
      id: 3,
      title: "Peak hour pricing active",
      time: "1 hour ago",
      type: "info",
    },

  ];

  return (

    <div
      className="
      bg-white
      rounded-xl
      border
      border-[#E0E0E0]
      shadow-sm
      p-5
      "
    >

      {/* HEADER */}

      <div
        className="
        flex
        items-center
        gap-2
        mb-5
        "
      >

        <Bell
          size={20}
          className="text-[#1B5E20]"
        />

        <h2
          className="
          text-lg
          font-semibold
          text-[#1A1A2E]
          "
        >
          Notifications
        </h2>

      </div>

      {/* LIST */}

      <div className="space-y-4">

        {notifications.map((item) => (

          <div
            key={item.id}
            className="
            flex
            items-start
            gap-3

            p-4
            rounded-xl

            bg-[#F8FAFC]
            "
          >

            {/* ICON */}

            <div className="mt-0.5">

              {item.type === "alert" && (

                <CircleAlert
                  size={18}
                  className="
                  text-[#E65100]
                  "
                />

              )}

              {item.type === "success" && (

                <CircleCheck
                  size={18}
                  className="
                  text-[#1B5E20]
                  "
                />

              )}

              {item.type === "info" && (

                <Bell
                  size={18}
                  className="
                  text-[#1565C0]
                  "
                />

              )}

            </div>

            {/* CONTENT */}

            <div className="flex-1">

              <p
                className="
                text-sm
                font-medium
                text-[#1A1A2E]
                "
              >
                {item.title}
              </p>

              <p
                className="
                text-xs
                text-[#5D6D7E]
                mt-1
                "
              >
                {item.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default NotificationsPanel;