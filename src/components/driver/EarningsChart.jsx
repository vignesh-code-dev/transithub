import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

import {
  TrendingUp,
  Wallet,
  Activity,
} from "lucide-react";

function EarningsChart({
  data,
}) {

  const CustomTooltip = ({
    active,
    payload,
    label,
  }) => {

    if (
      active &&
      payload &&
      payload.length
    ) {

      return (

        <div
          className="
          bg-white/95
          backdrop-blur-xl

          border
          border-[#E2E8F0]

          rounded-2xl

          px-4
          py-3

          shadow-[0_15px_40px_rgba(15,23,42,0.12)]
          "
        >

          <p
            className="
            text-xs
            font-medium
            text-[#94A3B8]

            uppercase
            tracking-wide
            "
          >
            {new Date(label)
.toLocaleDateString(
  "en-IN",
  {
    day: "numeric",
    month: "short",
  }
)}
          </p>

          <h3
            className="
            text-lg
            font-bold
            text-[#1A1A2E]

            mt-1
            "
          >
            ₹{payload[0].value}
          </h3>

        </div>

      );

    }

    return null;
  };

  return (

    <div
      className="
      relative
      overflow-hidden

      bg-white
        shadow-[0_10px_30px_rgba(15,23,42,0.20)]

      border
      border-[#E8EDF3]

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
        top-0
        right-0

        w-72
        h-72

        bg-[#E8F5E9]

        rounded-full

        blur-3xl
        opacity-40

        -translate-y-28
        translate-x-28
        "
      />

      {/* CONTENT */}

      <div className="relative z-10">

        {/* HEADER */}

        <div
          className="
          flex
          flex-col
          lg:flex-row
          lg:items-start
          lg:justify-between

          gap-5

          mb-7
          "
        >

          {/* LEFT */}

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

              <Activity size={14} />

              <span
                className="
                text-xs
                font-semibold
                "
              >
                Weekly Analytics
              </span>

            </div>

            {/* TITLE */}

            <h2
              className="
              text-xl
              sm:text-2xl

              leading-8

              font-bold
              text-[#1A1A2E]
              "
            >
              Earnings Overview
            </h2>

            <p
              className="
              text-sm
              sm:text-[15px]

              leading-6

              text-[#5D6D7E]

              mt-2
              max-w-xl
              "
            >
              Monitor your weekly revenue,
              ride performance and earning
              trends in real time.
            </p>

          </div>

          {/* RIGHT */}

          <div
            className="
            flex
            flex-wrap
            items-center

            gap-3
            "
          >

            {/* GROWTH */}

            <div
              className="
              flex
              items-center
              gap-2

              px-4
              py-3

              rounded-2xl

              bg-[#E8F5E9]

              border
              border-[#C8E6C9]
              "
            >

              <TrendingUp
                size={18}
                className="
                text-[#1B5E20]
                "
              />

              <div>

                <p
                  className="
                  text-xs
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  Growth
                </p>

                <h3
                  className="
                  text-sm
                  font-bold
                  text-[#1B5E20]
                  "
                >
                  +12.4%
                </h3>

              </div>

            </div>

            {/* TOTAL */}

            <div
              className="
              flex
              items-center
              gap-2

              px-4
              py-3

              rounded-2xl

              bg-[#F8FAFC]

              border
              border-[#E2E8F0]
              "
            >

              <Wallet
                size={18}
                className="
                text-[#1565C0]
                "
              />

              <div>

                <p
                  className="
                  text-xs
                  font-medium
                  text-[#5D6D7E]
                  "
                >
                  Total
                </p>

                <h3
                  className="
                  text-sm
                  font-bold
                  text-[#1A1A2E]
                  "
                >
                  ₹24.8K
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* CHART WRAPPER */}

        <div
          className="
          bg-[#FCFDFD]

          border
          border-[#EEF2F6]

          rounded-[24px]

          p-3
          sm:p-4
          lg:p-5
          "
        >

          <div
            className="
            h-[260px]
            sm:h-[320px]
            lg:h-[360px]
            "
          >

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <AreaChart
                data={data}
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 0,
                }}
              >

                <defs>

                  <linearGradient
                    id="earningsGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#1B5E20"
                      stopOpacity={0.35}
                    />

                    <stop
                      offset="100%"
                      stopColor="#1B5E20"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <XAxis
                  dataKey="date"

                  tickLine={false}
                  axisLine={false}

                  tick={{
                    fill: "#64748B",
                    fontSize: 12,
                    fontWeight: 500,
                  }}

                  dy={10}
                />

                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: "#1B5E20",
                    strokeOpacity: 0.15,
                    strokeWidth: 2,
                  }}
                />

                <Area
                  type="monotone"

                  dataKey="earnings"

                  stroke="#1B5E20"
                  strokeWidth={4}

                  fill="url(#earningsGradient)"

                  dot={{
                    r: 0,
                  }}

                  activeDot={{
                    r: 7,
                    fill: "#1B5E20",
                    stroke: "#FFFFFF",
                    strokeWidth: 3,
                  }}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EarningsChart;