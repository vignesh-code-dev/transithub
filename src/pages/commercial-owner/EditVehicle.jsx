function EditVehicle() {

  return (

    <div>

      {/* PAGE HEADER */}

      <div className="mb-8">

        <h1
          className="
          text-2xl
          leading-8
          font-bold
          text-[#1A1A2E]
          "
        >
          Edit Vehicle
        </h1>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-2
          "
        >
          Update vehicle information,
          pricing and operational settings.
        </p>

      </div>

      {/* FORM CARD */}

      <div
        className="
        bg-white
        border
        border-[#E0E0E0]

        rounded-2xl
        shadow-sm

        p-6
        "
      >

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-6
          "
        >

          {/* VEHICLE NAME */}

          <div>

            <label
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              Vehicle Name
            </label>

            <input
              type="text"
              defaultValue="Force Traveller"

              className="
              w-full
              h-11

              mt-2
              px-4

              rounded-md
              border
              border-[#E0E0E0]

              text-sm

              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#BF360C]
              "
            />

          </div>

          {/* REG NUMBER */}

          <div>

            <label
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              Registration Number
            </label>

            <input
              type="text"
              defaultValue="TN 45 AB 2211"

              className="
              w-full
              h-11

              mt-2
              px-4

              rounded-md
              border
              border-[#E0E0E0]

              text-sm

              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#BF360C]
              "
            />

          </div>

          {/* PRICE */}

          <div>

            <label
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              Price Per KM
            </label>

            <input
              type="text"
              defaultValue="₹24/km"

              className="
              w-full
              h-11

              mt-2
              px-4

              rounded-md
              border
              border-[#E0E0E0]

              text-sm

              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#BF360C]
              "
            />

          </div>

          {/* STATUS */}

          <div>

            <label
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              Vehicle Status
            </label>

            <select
              className="
              w-full
              h-11

              mt-2
              px-4

              rounded-md
              border
              border-[#E0E0E0]

              text-sm

              focus:outline-none
              focus:ring-2
              focus:ring-offset-2
              focus:ring-[#BF360C]
              "
            >

              <option>
                Active
              </option>

              <option>
                Pending
              </option>

              <option>
                Inactive
              </option>

            </select>

          </div>

        </div>

        {/* ACTIONS */}

        <div
          className="
          flex
          items-center
          justify-end
          gap-4

          mt-8
          "
        >

          <button
            className="
            h-11
            px-5

            rounded-md

            border
            border-[#E0E0E0]

            text-sm
            font-semibold
            text-[#1A1A2E]
            "
          >
            Cancel
          </button>

          <button
            className="
            h-11
            px-5

            rounded-md

            bg-[#BF360C]

            text-white
            text-sm
            font-semibold

            shadow-sm
            "
          >
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditVehicle;