function KpiCard({
  title,
  value,
  subtitle,
  icon,
  color,
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

      flex
      items-start
      justify-between
      "
    >

      <div>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          "
        >
          {title}
        </p>

        <h2
          className="
          text-3xl
          font-bold
          text-[#1A1A2E]
          mt-2
          "
        >
          {value}
        </h2>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-2
          "
        >
          {subtitle}
        </p>

      </div>

      <div
        className="
        w-12
        h-12
        rounded-xl

        flex
        items-center
        justify-center
        "
        style={{
          background: color,
        }}
      >

        {icon}

      </div>

    </div>
  );
}

export default KpiCard;