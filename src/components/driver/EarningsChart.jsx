import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

function EarningsChart({
  data,
}) {

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

      <div className="mb-6">

        <h2
          className="
          text-lg
          font-semibold
          text-[#1A1A2E]
          "
        >
          Weekly Earnings
        </h2>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-1
          "
        >
          Earnings overview for the last 7 days.
        </p>

      </div>

      {/* CHART */}

      <div className="h-[300px]">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <AreaChart data={data}>

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
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#5D6D7E",
                fontSize: 12,
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="earnings"
              stroke="#1B5E20"
              strokeWidth={3}
              fill="url(#earningsGradient)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default EarningsChart;