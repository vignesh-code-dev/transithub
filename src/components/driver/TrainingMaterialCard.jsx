import {
  FileText,
} from "lucide-react";

function TrainingMaterialCard({
  material,
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

      <div
        className="
        w-12
        h-12

        rounded-md

        bg-[#E8F4FD]

        flex
        items-center
        justify-center

        mb-5
        "
      >

        <FileText
          size={22}
          className="
          text-[#1B5E20]
          "
        />

      </div>

      <h2
        className="
        text-base
        leading-6
        font-semibold
        text-[#1A1A2E]
        "
      >
        {material.title}
      </h2>

      <p
        className="
        text-sm
        text-[#5D6D7E]

        mt-3
        leading-6
        "
      >
        {material.description}
      </p>

      <button
        className="
        mt-6

        h-10
        px-4

        rounded-md

        bg-[#1B5E20]

        text-white
        text-sm
        font-semibold
        "
      >
        View Material
      </button>

    </div>
  );
}

export default TrainingMaterialCard;