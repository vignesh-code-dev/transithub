import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

import {
  Star,
  TrendingUp,
  MessageSquareMore,
} from "lucide-react";

import ReviewCard
from "../../components/driver/ReviewCard";

import { driverReviewsData }
from "../../data/driverReviewsData";

import { ratingTrendData }
from "../../data/ratingTrendData";

function DriverReviews() {

  return (

    <div className="space-y-8">

      {/* HERO */}

      <div
        className="
        relative
        overflow-hidden

        bg-white

        border
        border-[#E8EDF3]

        rounded-[32px]

        shadow-[0_10px_35px_rgba(15,23,42,0.05)]

        p-5
        sm:p-7
        xl:p-8
        "
      >

        <div
          className="
          absolute
          top-0
          right-0

          w-72
          h-72

          rounded-full

          bg-[#FFF8E1]

          blur-3xl

          opacity-60

          -translate-y-24
          translate-x-24
          "
        />

        <div className="relative z-10">

          <div
            className="
            inline-flex
            items-center
            gap-2

            px-3
            py-1.5

            rounded-full

            bg-[#FFF8E1]

            text-[#F9A825]

            text-xs
            font-semibold

            mb-5
            "
          >

            <Star size={14} />

            Customer Feedback

          </div>

          <h1
            className="
            text-2xl
            sm:text-3xl

            font-bold
            text-[#1A1A2E]
            "
          >
            Driver Reviews
          </h1>

          <p
            className="
            text-sm
            sm:text-base

            text-[#5D6D7E]

            mt-3
            max-w-2xl
            "
          >
            Track passenger satisfaction,
            monitor rating trends and
            improve your service quality.
          </p>

        </div>

      </div>

      {/* KPI CARDS */}

      <div
        className="
        grid
        grid-cols-2
        xl:grid-cols-4

        gap-5
        "
      >

        <div
          className="
          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.05)]
          "
        >

          <p
            className="
            text-sm
            text-[#5D6D7E]
            "
          >
            Overall Rating
          </p>

          <h2
            className="
            text-4xl
            font-bold

            text-[#1A1A2E]

            mt-3
            "
          >
            4.7
          </h2>

          <p
            className="
            text-xs
            text-[#43A047]

            mt-2
            "
          >
            ↑ 0.2 this month
          </p>

        </div>

        <div
          className="
          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.05)]
          "
        >

          <p
            className="
            text-sm
            text-[#5D6D7E]
            "
          >
            Total Reviews
          </p>

          <h2
            className="
            text-4xl
            font-bold

            text-[#1A1A2E]

            mt-3
            "
          >
            248
          </h2>

          <p
            className="
            text-xs
            text-[#1565C0]

            mt-2
            "
          >
            All customer reviews
          </p>

        </div>

        <div
          className="
          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.05)]
          "
        >

          <p
            className="
            text-sm
            text-[#5D6D7E]
            "
          >
            5 Star Reviews
          </p>

          <h2
            className="
            text-4xl
            font-bold

            text-[#1A1A2E]

            mt-3
            "
          >
            193
          </h2>

          <p
            className="
            text-xs
            text-[#F9A825]

            mt-2
            "
          >
            Excellent feedback
          </p>

        </div>

        <div
          className="
          bg-white

          border
          border-[#E8EDF3]

          rounded-[28px]

          p-5

          shadow-[0_10px_30px_rgba(15,23,42,0.05)]
          "
        >

          <p
            className="
            text-sm
            text-[#5D6D7E]
            "
          >
            Reply Rate
          </p>

          <h2
            className="
            text-4xl
            font-bold

            text-[#1A1A2E]

            mt-3
            "
          >
            94%
          </h2>

          <p
            className="
            text-xs
            text-[#43A047]

            mt-2
            "
          >
            Customer engagement
          </p>

        </div>

      </div>

      {/* CHART */}

      <div
        className="
        bg-white

        border
        border-[#E8EDF3]

        rounded-[32px]

        shadow-[0_10px_35px_rgba(15,23,42,0.05)]

        p-5
        sm:p-6
        "
      >

        <div
          className="
          flex
          flex-col
          sm:flex-row
          sm:items-center
          sm:justify-between

          gap-4

          mb-8
          "
        >

          <div>

            <h2
              className="
              text-2xl
              font-bold
              text-[#1A1A2E]
              "
            >
              Customer Satisfaction
            </h2>

            <p
              className="
              text-sm
              text-[#5D6D7E]

              mt-2
              "
            >
              Rating performance over
              recent weeks.
            </p>

          </div>

          <div
            className="
            inline-flex
            items-center
            gap-2

            px-4
            py-2

            rounded-2xl

            bg-[#E8F5E9]

            text-[#1B5E20]

            text-sm
            font-semibold
            "
          >

            <TrendingUp size={16} />

            +8% Improvement

          </div>

        </div>

        <div className="h-[260px] sm:h-[320px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={ratingTrendData}
            >

              <XAxis
                dataKey="week"
                tickLine={false}
                axisLine={false}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="rating"
                stroke="#1B5E20"
                strokeWidth={4}
                dot={{
                  r: 5,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* REVIEWS */}

      <div>

        <div
          className="
          flex
          flex-col
          sm:flex-row

          sm:items-center
          sm:justify-between

          gap-4

          mb-6
          "
        >

          <div>

            <h2
              className="
              text-2xl
              font-bold
              text-[#1A1A2E]
              "
            >
              Recent Reviews
            </h2>

            <p
              className="
              text-sm
              text-[#5D6D7E]

              mt-1
              "
            >
              Latest passenger feedback
              and comments.
            </p>

          </div>

          <div
            className="
            inline-flex
            items-center
            gap-2

            px-4
            py-2

            rounded-full

            bg-[#FFF8E1]

            text-[#F9A825]

            text-sm
            font-semibold
            "
          >

            <MessageSquareMore
              size={16}
            />

            {driverReviewsData.length}
            Reviews

          </div>

        </div>

        <div
          className="
          grid
          grid-cols-1

          2xl:grid-cols-2

          gap-6
          "
        >

          {driverReviewsData.map((review) => (

            <ReviewCard
              key={review.id}
              review={review}
            />

          ))}

        </div>

      </div>

    </div>
  );
}

export default DriverReviews;