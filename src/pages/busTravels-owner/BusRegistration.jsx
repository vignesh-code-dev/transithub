import { useState } from "react";
import Layout from "../../layouts/Layout";
import { busTravelsOwnerMenu } from "../../config/busTravelsOwnerMenu";
import {
  Bus,
  Image,
  Wifi,
  Tv,
  Snowflake,
  BatteryCharging,
} from "lucide-react";

export default function BusRegistration() {
  const [formData, setFormData] = useState({
    registrationNumber: "",
    busName: "",
    make: "",
    model: "",
    busType: "",
    totalSeats: "",
    amenities: [],
    photos: [],
  });

  const amenitiesList = [
    {
      label: "WiFi",
      value: "wifi",
      icon: Wifi,
    },
    {
      label: "AC",
      value: "ac",
      icon: Snowflake,
    },
    {
      label: "Charging Port",
      value: "charging",
      icon: BatteryCharging,
    },
    {
      label: "TV",
      value: "tv",
      icon: Tv,
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmenities = (value) => {
    if (formData.amenities.includes(value)) {
      setFormData({
        ...formData,
        amenities: formData.amenities.filter(
          (item) => item !== value
        ),
      });
    } else {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, value],
      });
    }
  };

  const handlePhotoUpload = (e) => {
    setFormData({
      ...formData,
      photos: [...e.target.files],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Bus Registered Successfully");
  };

  return (
    <Layout menus={busTravelsOwnerMenu}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[28px] font-bold text-bodyText">
            Bus Registration
          </h1>

          <p className="text-secondaryText mt-2">
            Add and manage bus details for your fleet.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-border rounded-2xl shadow-sm p-8">

          <form onSubmit={handleSubmit}>

            {/* Section Title */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#FFF4CC] flex items-center justify-center">
                <Bus className="text-[#1A1A2E]" size={22} />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-bodyText">
                  Bus Information
                </h2>

                <p className="text-sm text-secondaryText mt-1">
                  Fill all required details.
                </p>
              </div>
            </div>

            {/* Grid Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Registration Number */}
              <div>
                <label className="block text-sm font-medium text-bodyText mb-2">
                  Registration Number
                </label>

                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="TN 45 AB 1234"
                  className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#FFC200] focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)] transition"
                />
              </div>

              {/* Bus Name */}
              <div>
                <label className="block text-sm font-medium text-bodyText mb-2">
                  Bus Name
                </label>

                <input
                  type="text"
                  name="busName"
                  value={formData.busName}
                  onChange={handleChange}
                  placeholder="KPN Travels"
                  className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#FFC200] focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)] transition"
                />
              </div>

              {/* Make */}
              <div>
                <label className="block text-sm font-medium text-bodyText mb-2">
                  Make
                </label>

                <select
                  name="make"
                  value={formData.make}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#FFC200] focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)] transition bg-white"
                >
                  <option value="">Select Make</option>
                  <option value="Ashok Leyland">
                    Ashok Leyland
                  </option>
                  <option value="Tata">
                    Tata
                  </option>
                  <option value="Volvo">
                    Volvo
                  </option>
                  <option value="Bharat Benz">
                    Bharat Benz
                  </option>
                </select>
              </div>

              {/* Model */}
              <div>
                <label className="block text-sm font-medium text-bodyText mb-2">
                  Model
                </label>

                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  placeholder="9400 Multi Axle"
                  className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#FFC200] focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)] transition"
                />
              </div>

              {/* Bus Type */}
              <div>
                <label className="block text-sm font-medium text-bodyText mb-2">
                  Bus Type
                </label>

                <select
                  name="busType"
                  value={formData.busType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#FFC200] focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)] transition bg-white"
                >
                  <option value="">Select Type</option>
                  <option value="Sleeper">
                    Sleeper
                  </option>
                  <option value="Semi Sleeper">
                    Semi Sleeper
                  </option>
                  <option value="Seater">
                    Seater
                  </option>
                </select>
              </div>

              {/* Total Seats */}
              <div>
                <label className="block text-sm font-medium text-bodyText mb-2">
                  Total Seats
                </label>

                <input
                  type="number"
                  name="totalSeats"
                  value={formData.totalSeats}
                  onChange={handleChange}
                  placeholder="40"
                  className="w-full px-4 py-3 rounded-xl border border-border outline-none focus:border-[#FFC200] focus:shadow-[0_0_0_3px_rgba(255,194,0,0.2)] transition"
                />
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-bodyText mb-4">
                Amenities
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {amenitiesList.map((item) => {
                  const Icon = item.icon;
                  const selected = formData.amenities.includes(item.value);

                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handleAmenities(item.value)}
                      className={`
                        border rounded-2xl p-4 transition
                        flex flex-col items-center justify-center gap-3

                        ${selected
                          ? "bg-[#FFFDE7] border-[#FFC200]"
                          : "border-border hover:border-[#FFC200]"
                        }
                      `}
                    >
                      <Icon size={22} />

                      <span className="text-sm font-medium">
                        {item.label}
                      </span>
                    </button>
                  );
                })}

              </div>
            </div>

            {/* Upload Photos */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-bodyText mb-4">
                Upload Bus Photos
              </label>

              <label className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#FFC200] transition bg-[#FAFAFA]">
                <Image size={40} className="text-secondaryText mb-4" />

                <p className="font-medium text-bodyText">
                  Click to upload photos
                </p>

                <p className="text-sm text-secondaryText mt-1">
                  PNG, JPG up to 10MB
                </p>

                <input
                  type="file"
                  multiple
                  hidden
                  onChange={handlePhotoUpload}
                />
              </label>

              {/* Preview */}
              {formData.photos.length > 0 && (
                <div className="mt-4 text-sm text-secondaryText">
                  {formData.photos.length} file(s) selected
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-10 flex justify-end">
              <button
                type="submit"
                className="bg-[#FFC200] hover:bg-[#E6AD00] transition px-6 py-3 rounded-xl font-semibold text-[#1A1A2E]"
              >
                Save Bus
              </button>
            </div>

          </form>
        </div>
      </div>
    </Layout>
  );
}
