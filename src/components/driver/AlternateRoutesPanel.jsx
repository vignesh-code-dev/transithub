

function AlternateRoutesPanel({
  routes,
}) {
    

  return (

    <div
      className="
      bg-white
      border
      border-[#E0E0E0]

      rounded-md
      shadow-sm

      p-5
      "
    >

      {/* HEADER */}

      <div className="mb-5">

        <h2
          className="
          text-xl
          font-semibold
          text-[#1A1A2E]
          "
        >
          Alternate Routes
        </h2>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-1
          "
        >
          Suggested routes based on traffic conditions.
        </p>

      </div>

      {/* ROUTES */}

      <div className="space-y-4">

        {routes.map((route) => (

          <div
            key={route.id}
            className="
            border
            border-[#E0E0E0]

            rounded-md

            p-4

            hover:border-[#1B5E20]

            transition-all
            "
          >

            <div
              className="
              flex
              items-start
              justify-between
              gap-4
              "
            >

              <div>

                <h3
                  className="
                  text-sm
                  font-semibold
                  text-[#1A1A2E]
                  "
                >
                  {route.route}
                </h3>

                <p
                  className="
                  text-sm
                  text-[#5D6D7E]
                  mt-1
                  "
                >
                  ETA: {route.eta}
                </p>

              </div>

              {/* TRAFFIC */}

              <span
                className={`
                px-3
                py-1

                rounded-full

                text-xs
                font-medium

                ${
                  route.traffic === "Low"
                    ? "bg-[#C8E6C9] text-[#1B5E20]"
                    : route.traffic === "Moderate"
                    ? "bg-[#FFE0B2] text-[#E65100]"
                    : "bg-[#FFCDD2] text-[#C62828]"
                }
                `}
              >

                {route.traffic}

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AlternateRoutesPanel;