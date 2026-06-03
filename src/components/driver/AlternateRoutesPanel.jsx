

// function AlternateRoutesPanel({
//   routes,
// }) {
    

//   return (

//     <div
//       className="
//       bg-white
//       border
//       border-[#E0E0E0]

//       rounded-md
//       shadow-sm

//       p-5
//       "
//     >

//       {/* HEADER */}

//       <div className="mb-5">

//         <h2
//           className="
//           text-xl
//           font-semibold
//           text-[#1A1A2E]
//           "
//         >
//           Alternate Routes
//         </h2>

//         <p
//           className="
//           text-sm
//           text-[#5D6D7E]
//           mt-1
//           "
//         >
//           Suggested routes based on traffic conditions.
//         </p>

//       </div>

//       {/* ROUTES */}

//       <div className="space-y-4">

//         {routes.map((route) => (

//           <div
//             key={route.id}
//             className="
//             border
//             border-[#E0E0E0]

//             rounded-md

//             p-4

//             hover:border-[#1B5E20]

//             transition-all
//             "
//           >

//             <div
//               className="
//               flex
//               items-start
//               justify-between
//               gap-4
//               "
//             >

//               <div>

//                 <h3
//                   className="
//                   text-sm
//                   font-semibold
//                   text-[#1A1A2E]
//                   "
//                 >
//                   {route.route}
//                 </h3>

//                 <p
//                   className="
//                   text-sm
//                   text-[#5D6D7E]
//                   mt-1
//                   "
//                 >
//                   ETA: {route.eta}
//                 </p>

//               </div>

//               {/* TRAFFIC */}

//               <span
//                 className={`
//                 px-3
//                 py-1

//                 rounded-full

//                 text-xs
//                 font-medium

//                 ${
//                   route.traffic === "Low"
//                     ? "bg-[#C8E6C9] text-[#1B5E20]"
//                     : route.traffic === "Moderate"
//                     ? "bg-[#FFE0B2] text-[#E65100]"
//                     : "bg-[#FFCDD2] text-[#C62828]"
//                 }
//                 `}
//               >

//                 {route.traffic}

//               </span>

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }

// export default AlternateRoutesPanel;



import {
  Route,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

function AlternateRoutesPanel({
  routes,
}) {

  return (

    <div
      className="
      bg-white

      border
      border-[#E8EDF3]

      rounded-3xl

        shadow-[0_10px_30px_rgba(15,23,42,0.20)]

      p-4
      sm:p-5
      lg:p-6
      "
    >

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

            <Route size={14} />

            <span
              className="
              text-xs
              font-semibold
              "
            >
              Smart Routing
            </span>

          </div>

          <h2
            className="
            text-[20px]
            leading-7

            font-bold
            text-[#1A1A2E]
            "
          >
            Alternate Routes
          </h2>

          <p
            className="
            text-sm
            text-[#5D6D7E]

            mt-2
            "
          >
            Suggested routes based on
            live traffic conditions.
          </p>

        </div>

        <div
          className="
          hidden
          sm:flex

          w-12
          h-12

          rounded-2xl

          bg-[#F4F7FA]

          items-center
          justify-center
          "
        >

          <ArrowUpRight
            size={20}
            className="
            text-[#1A1A2E]
            "
          />

        </div>

      </div>

      {/* ROUTES */}

      <div className="space-y-4">

        {routes.map((route) => (

          <div
            key={route.id}

            className="
            group

            border
            border-[#EEF2F6]

            rounded-2xl

            p-4

            bg-[#FCFDFD]

            hover:border-[#CFE5D1]
            hover:shadow-[0_6px_20px_rgba(15,23,42,0.04)]

            transition-all
            duration-300
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
              "
            >

              {/* LEFT */}

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

                  bg-[#E8F5E9]

                  flex
                  items-center
                  justify-center

                  shrink-0
                  "
                >

                  <Route
                    size={18}
                    className="
                    text-[#1B5E20]
                    "
                  />

                </div>

                {/* CONTENT */}

                <div>

                  <h3
                    className="
                    text-sm
                    sm:text-[15px]

                    font-semibold
                    text-[#1A1A2E]
                    "
                  >
                    {route.route}
                  </h3>

                  <div
                    className="
                    flex
                    items-center
                    gap-2

                    mt-2
                    "
                  >

                    <Clock3
                      size={14}
                      className="
                      text-[#5D6D7E]
                      "
                    />

                    <p
                      className="
                      text-sm
                      text-[#5D6D7E]
                      "
                    >
                      ETA: {route.eta}
                    </p>

                  </div>

                </div>

              </div>

              {/* TRAFFIC */}

              <span
                className={`
                inline-flex
                items-center
                justify-center

                w-fit

                px-3
                py-1.5

                rounded-full

                text-xs
                font-semibold

                ${
                  route.traffic === "Low"
                    ? "bg-[#DDF5E0] text-[#1B5E20]"
                    : route.traffic === "Moderate"
                    ? "bg-[#FFF1D6] text-[#E65100]"
                    : "bg-[#FFE1E1] text-[#C62828]"
                }
                `}
              >

                <span
                  className={`
                  w-2
                  h-2

                  rounded-full

                  mr-2

                  ${
                    route.traffic === "Low"
                      ? "bg-[#43A047]"
                      : route.traffic === "Moderate"
                      ? "bg-[#FB8C00]"
                      : "bg-[#E53935]"
                  }
                  `}
                />

                {route.traffic} Traffic

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AlternateRoutesPanel;