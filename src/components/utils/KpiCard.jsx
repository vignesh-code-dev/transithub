function KpiCard({
  title,
  value,
  subtitle,
  icon,
  color,
  onClick
}) {

  return (

    <div

    onClick={onClick}
      className="
      group
  cursor-pointer

      relative
      overflow-hidden

      bg-white/95
      backdrop-blur-sm
        shadow-[0_10px_30px_rgba(15,23,42,0.20)]

      border
      border-[#E8ECF2]

      rounded-[24px]

      p-5
      lg:p-6

      transition-all
      duration-300

      hover:-translate-y-1
      hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]

      shadow-[0_8px_30px_rgba(15,23,42,0.04)]
      "
    >

      {/* TOP GLOW */}

      <div
        className="
        absolute
        top-0
        right-0

        w-32
        h-32

        rounded-full
        blur-3xl
        opacity-40

        transition-all
        duration-500

        group-hover:scale-125
        "
        style={{
          background: color,
        }}
      />

      {/* GRID PATTERN */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.03]
        pointer-events-none
        "
        style={{
          backgroundImage:
            "linear-gradient(#1A1A2E 1px, transparent 1px), linear-gradient(to right, #1A1A2E 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* CONTENT */}

      <div
        className="
        relative
        z-10

        flex
        items-start
        justify-between
        gap-4
        "
      >

        {/* LEFT SECTION */}

        <div className="flex-1">

          {/* TITLE + STATUS */}

          <div
            className="
            flex
            items-center
            gap-2
            flex-wrap
            "
          >

            <p
              className="
              text-sm
              font-medium
              tracking-wide

              text-[#5D6D7E]
              "
            >
              {title}
            </p>

            {/* LIVE CHIP */}

            <div
              className="
              inline-flex
              items-center
              gap-1.5

              px-2
              py-1

              rounded-full

              bg-[#E8F5E9]

              text-[11px]
              font-semibold
              text-[#1B5E20]
              "
            >

              <span
                className="
                w-1.5
                h-1.5

                rounded-full
                bg-[#43A047]

                animate-pulse
                "
              />

              Live

            </div>

          </div>

          {/* VALUE */}

          <div className="mt-4">

            <h2
              className="
              text-[30px]
              leading-[36px]

              font-bold
              tracking-tight

              text-[#1A1A2E]
              "
            >
              {value}
            </h2>

          </div>

          {/* BOTTOM */}

          <div
            className="
            mt-5

            flex
            items-center
            justify-between
            gap-4
            "
          >

            {/* SUBTITLE */}

            <p
              className="
              text-sm
              text-[#5D6D7E]
              leading-6
              "
            >
              {subtitle}
            </p>

            {/* TREND */}

            <div
              className="
              shrink-0

              px-2.5
              py-1.5

              rounded-lg

              bg-[#F8FAFC]
              border
              border-[#EEF2F6]

              text-xs
              font-semibold
              text-[#1B5E20]
              "
            >
              +12.4%
            </div>

          </div>

          {/* MINI GRAPH */}

          <div
            className="
            mt-5

            flex
            items-end
            gap-1
            h-10
            "
          >

            {[30, 55, 38, 70, 58, 82, 65].map(
              (height, index) => (

                <div
                  key={index}

                  className="
                  flex-1

                  rounded-full

                  transition-all
                  duration-300

                  group-hover:opacity-100
                  opacity-80
                  "
                  style={{
                    height: `${height}%`,
                    background: color,
                  }}
                />

              )
            )}

          </div>

        </div>

        {/* ICON SECTION */}

        <div
          className="
          relative
          shrink-0
          "
        >

          {/* OUTER GLOW */}

          <div
            className="
            absolute
            inset-0

            rounded-[22px]

            blur-xl
            opacity-50
            scale-110
            "
            style={{
              background: color,
            }}
          />

          {/* ICON BOX */}

          <div
            className="
            relative

            w-[68px]
            h-[68px]

            rounded-[22px]

            flex
            items-center
            justify-center

            border
            border-white/80

            shadow-[0_10px_25px_rgba(15,23,42,0.08)]

            backdrop-blur-md
            "
            style={{
              background: `
                linear-gradient(
                  135deg,
                  ${color},
                  #FFFFFF
                )
              `,
            }}
          >

            <div
              className="
              scale-110
              "
            >
              {icon}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default KpiCard;