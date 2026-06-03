import {
  Wallet,
  BadgeIndianRupee,
  Gift,
  TrendingUp,
} from "lucide-react";

function RevenueBreakdownCard() {

  const breakdown = [

    {
      title: "Ride Earnings",
      amount: "₹24,500",
      icon: <Wallet size={18} />,
      bg: "bg-[#E8F5E9]",
      color: "text-[#1B5E20]",
    },

    {
      title: "Peak Bonuses",
      amount: "₹3,200",
      icon: <TrendingUp size={18} />,
      bg: "bg-[#E8F4FD]",
      color: "text-[#1565C0]",
    },

    {
      title: "Tips",
      amount: "₹1,250",
      icon: <Gift size={18} />,
      bg: "bg-[#FFF8E1]",
      color: "text-[#E65100]",
    },

    {
      title: "Incentives",
      amount: "₹2,100",
      icon: <BadgeIndianRupee size={18} />,
      bg: "bg-[#F3E5F5]",
      color: "text-[#6A1B9A]",
    },

  ];

  return (

    <div
      className="
      bg-white
      border
      border-[#E8EDF3]

      rounded-[28px]

      shadow-[0_10px_30px_rgba(15,23,42,0.05)]

      p-5
      sm:p-6
      "
    >

      <div className="mb-6">

        <h2
          className="
          text-xl
          font-bold
          text-[#1A1A2E]
          "
        >
          Revenue Breakdown
        </h2>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-2
          "
        >
          Earnings distribution by source.
        </p>

      </div>

      <div className="space-y-4">

        {breakdown.map((item) => (

          <div
            key={item.title}
            className="
            flex
            items-center
            justify-between

            p-4

            rounded-2xl

            bg-[#F8FAFC]

            border
            border-[#EEF2F6]
            "
          >

            <div
              className="
              flex
              items-center
              gap-3
              "
            >

              <div
                className={`
                w-12
                h-12

                rounded-2xl

                flex
                items-center
                justify-center

                ${item.bg}
                ${item.color}
                `}
              >
                {item.icon}
              </div>

              <div>

                <p
                  className="
                  text-sm
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  {item.title}
                </p>

                <h3
                  className="
                  text-lg
                  font-bold
                  text-[#1A1A2E]
                  "
                >
                  {item.amount}
                </h3>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RevenueBreakdownCard;