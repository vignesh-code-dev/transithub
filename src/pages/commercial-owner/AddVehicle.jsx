import {
  Upload,
} from "lucide-react";

function AddVehicle() {

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
          Add Vehicle
        </h1>

        <p
          className="
          text-sm
          text-[#5D6D7E]
          mt-2
          "
        >
          Register a new commercial vehicle
          for ride operations.
        </p>

      </div>

      {/* FORM */}

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
              placeholder="Enter vehicle name"

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

          {/* VEHICLE TYPE */}

          <div>

            <label
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              Vehicle Type
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
                Select vehicle type
              </option>

              <option>
                Mini Bus
              </option>

              <option>
                Premium Cab
              </option>

              <option>
                Commercial Van
              </option>

            </select>

          </div>

          {/* REGISTRATION */}

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
              placeholder="TN 45 AB 2211"

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

          {/* CAPACITY */}

          <div>

            <label
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              Passenger Capacity
            </label>

            <input
              type="number"
              placeholder="Enter capacity"

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
              placeholder="₹20/km"

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

          {/* AVAILABILITY */}

          <div>

            <label
              className="
              text-sm
              font-medium
              text-[#1A1A2E]
              "
            >
              Availability Schedule
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
                Full Time
              </option>

              <option>
                Day Shift
              </option>

              <option>
                Night Shift
              </option>

            </select>

          </div>

        </div>

        {/* DOCUMENT UPLOAD */}

        <div className="mt-8">

          <h2
            className="
            text-base
            font-semibold
            text-[#1A1A2E]
            "
          >
            Vehicle Documents
          </h2>

          <div
            className="
            mt-4

            border-2
            border-dashed
            border-[#E0E0E0]

            rounded-2xl

            p-8

            flex
            flex-col
            items-center
            justify-center
            text-center
            "
          >

            <div
              className="
              w-14
              h-14

              rounded-full

              bg-[#FFF3E0]

              flex
              items-center
              justify-center
              "
            >

              <Upload
                size={24}
                className="
                text-[#BF360C]
                "
              />

            </div>

            <p
              className="
              text-sm
              font-medium
              text-[#1A1A2E]

              mt-4
              "
            >
              Upload RC, Insurance & Pollution Certificate
            </p>

            <p
              className="
              text-sm
              text-[#5D6D7E]

              mt-2
              "
            >
              PDF, JPG or PNG up to 10MB
            </p>

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
            Register Vehicle
          </button>

        </div>

      </div>

    </div>
  );
}

export default AddVehicle;