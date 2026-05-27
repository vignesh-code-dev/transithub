// import ReviewCard
// from "../../components/driver/ReviewCard";

// import { driverReviewsData }
// from "../../data/driverReviewsData";

// function DriverReviews() {

//   return (

//     <div>

    

//       <div
//         className="
//         flex
//         flex-col
//         lg:flex-row
//         lg:items-center
//         lg:justify-between

//         gap-4
//         mb-8
//         "
//       >

//         <div>

//           <h1
//             className="
//             text-3xl
//             font-bold
//             text-[#1A1A2E]
//             "
//           >
//             Driver Reviews
//           </h1>

//           <p
//             className="
//             text-[#5D6D7E]
//             mt-2
//             "
//           >
//             Passenger ratings and trip feedback overview.
//           </p>

//         </div>

//       </div>

    

//       <div
//         className="
//         bg-[#E8F4FD]
//         border
//         border-[#AED6F1]

//         rounded-md

//         p-6
//         mb-8
//         "
//       >

//         <p
//           className="
//           text-sm
//           text-[#5D6D7E]
//           "
//         >
//           Overall Driver Rating
//         </p>

//         <h2
//           className="
//           text-5xl
//           font-bold
//           text-[#1A1A2E]

//           mt-2
//           "
//         >
//           4.8
//         </h2>

//         <p
//           className="
//           text-sm
//           text-[#5D6D7E]

//           mt-3
//           "
//         >
//           Based on 248 passenger reviews.
//         </p>

//       </div>

   

//       <div
//         className="
//         grid
//         grid-cols-1
//         xl:grid-cols-2
//         gap-6
//         "
//       >

//         {driverReviewsData.map((review) => (

//           <ReviewCard
//             key={review.id}
//             review={review}
//           />

//         ))}

//       </div>

//     </div>
//   );
// }

// export default DriverReviews;










import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
} from "recharts";

import ReviewCard
from "../../components/driver/ReviewCard";

import { driverReviewsData }
from "../../data/driverReviewsData";

import { ratingTrendData }
from "../../data/ratingTrendData";

function DriverReviews() {

  return (

    <div>

      {/* HEADER */}

      <div className="mb-8">

        <h1
          className="
          text-3xl
          font-bold
          text-[#1A1A2E]
          "
        >
          Driver Reviews
        </h1>

        <p
          className="
          text-[#5D6D7E]
          mt-2
          "
        >
          View customer feedback and rating trends.
        </p>

      </div>

      {/* TOP GRID */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-3
        gap-6
        mb-8
        "
      >

        {/* RATING SUMMARY */}

        <div
          className="
          bg-[#E8F4FD]
          border
          border-[#AED6F1]

          rounded-md

          p-6
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
            text-5xl
            font-bold
            text-[#1A1A2E]

            mt-3
            "
          >
            4.7
          </h2>

          <p
            className="
            text-sm
            text-[#1A1A2E]

            mt-3
            "
          >
            Based on 248 customer reviews
          </p>

        </div>

        {/* TREND CHART */}

        <div
          className="
          xl:col-span-2

          bg-white
          border
          border-[#E0E0E0]

          rounded-md
          shadow-sm

          p-5
          "
        >

          <h2
            className="
            text-lg
            font-semibold
            text-[#1A1A2E]
            mb-4
            "
          >
            Rating Trend
          </h2>

          <div className="h-[240px]">

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
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

      {/* REVIEWS GRID */}

      <div
        className="
        grid
        grid-cols-1
        xl:grid-cols-2
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
  );
}

export default DriverReviews;