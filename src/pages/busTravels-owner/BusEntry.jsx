import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { Bus, Upload, Check, X, Crop } from "lucide-react";

export default function BusEntry() {
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  const [formData, setFormData] = useState({
    regNumber: "",
    makeModel: "",
    seatLayout: "Seater",
    amenities: [],
    photos: [], // File Objects
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [cropModal, setCropModal] = useState({
    isOpen: false,
    imageSrc: "",
    photoIndex: null,
    fileName: "",
    fileType: "",
  });
  const [cropArea, setCropArea] = useState({
    x: 15,
    y: 15,
    width: 80,
    height: 70,
  });
  const [dragMode, setDragMode] = useState(null); // 'move', 'nw', 'ne', 'se', 'sw'
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
    areaX: 0,
    areaY: 0,
    areaW: 0,
    areaH: 0,
  });

  const availableAmenities = [
    "AC",
    "Wi-Fi",
    "Charging Point",
    "Water Bottle",
    "Blanket",
    "Reading Light",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAmenityChange = (amenity) => {
    setFormData((prev) => {
      const updatedAmenities = prev.amenities.includes(amenity)
        ? prev.amenities.filter((item) => item !== amenity)
        : [...prev.amenities, amenity];
      return { ...prev, amenities: updatedAmenities };
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, ...selectedFiles],
      }));
    }
  };

  const removePhoto = (indexToRemove, e) => {
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, idx) => idx !== indexToRemove),
    }));
  };

  const openCropModal = (file, index) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCropModal({
        isOpen: true,
        imageSrc: reader.result,
        photoIndex: index,
        fileName: file.name,
        fileType: file.type,
      });
      setCropArea({ x: 20, y: 20, width: 60, height: 60 }); // Default Size
    };
    reader.readAsDataURL(file);
  };

  const handleDragStart = (e, mode) => {
    e.stopPropagation();
    e.preventDefault();

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    setDragMode(mode);
    setDragStart({
      x: clientX,
      y: clientY,
      areaX: cropArea.x,
      areaY: cropArea.y,
      areaW: cropArea.width,
      areaH: cropArea.height,
    });
  };

  const handleDragMove = (e) => {
    if (!dragMode) return;
    e.preventDefault();

    const container = e.currentTarget.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    const deltaX = ((clientX - dragStart.x) / container.width) * 100;
    const deltaY = ((clientY - dragStart.y) / container.height) * 100;

    setCropArea(() => {
      let nextX = dragStart.areaX;
      let nextY = dragStart.areaY;
      let nextW = dragStart.areaW;
      let nextH = dragStart.areaH;

      const minSize = 15;

      if (dragMode === "move") {
        nextX = Math.max(
          0,
          Math.min(dragStart.areaX + deltaX, 100 - dragStart.areaW),
        );
        nextY = Math.max(
          0,
          Math.min(dragStart.areaY + deltaY, 100 - dragStart.areaH),
        );
      } else {
        if (dragMode.includes("n")) {
          const potentialY = dragStart.areaY + deltaY;
          if (potentialY >= 0 && dragStart.areaH - deltaY >= minSize) {
            nextY = potentialY;
            nextH = dragStart.areaH - deltaY;
          }
        }
        if (dragMode.includes("w")) {
          const potentialX = dragStart.areaX + deltaX;
          if (potentialX >= 0 && dragStart.areaW - deltaX >= minSize) {
            nextX = potentialX;
            nextW = dragStart.areaW - deltaX;
          }
        }

        if (dragMode.includes("s")) {
          nextH = Math.max(
            minSize,
            Math.min(dragStart.areaH + deltaY, 100 - dragStart.areaY),
          );
        }
        if (dragMode.includes("e")) {
          nextW = Math.max(
            minSize,
            Math.min(dragStart.areaW + deltaX, 100 - dragStart.areaX),
          );
        }
      }

      return { x: nextX, y: nextY, width: nextW, height: nextH };
    });
  };

  const handleDragEnd = () => {
    setDragMode(null);
  };

  const saveCroppedImage = () => {
    const image = new Image();
    image.src = cropModal.imageSrc;
    image.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      const sourceX = (cropArea.x / 100) * image.naturalWidth;
      const sourceY = (cropArea.y / 100) * image.naturalHeight;
      const sourceWidth = (cropArea.width / 100) * image.naturalWidth;
      const sourceHeight = (cropArea.height / 100) * image.naturalHeight;

      canvas.width = sourceWidth;
      canvas.height = sourceHeight;

      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        0,
        0,
        sourceWidth,
        sourceHeight,
      );

      canvas.toBlob((blob) => {
        if (!blob) return;
        const croppedFile = new File([blob], cropModal.fileName, {
          type: cropModal.fileType,
        });

        setFormData((prev) => {
          const updatedPhotos = [...prev.photos];
          updatedPhotos[cropModal.photoIndex] = croppedFile;
          return { ...prev, photos: updatedPhotos };
        });

        setCropModal({
          isOpen: false,
          imageSrc: "",
          photoIndex: null,
          fileName: "",
          fileType: "",
        });
      }, cropModal.fileType);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");

    setTimeout(() => {
      const existingBuses =
        JSON.parse(localStorage.getItem("registeredBuses")) || [];
      const busDataToSave = {
        ...formData,
        id: Date.now().toString(),
        photos: formData.photos.map((file) => file.name),
      };

      const updatedBuses = [...existingBuses, busDataToSave];
      localStorage.setItem("registeredBuses", JSON.stringify(updatedBuses));
      localStorage.setItem(
        "currentConfiguringBus",
        JSON.stringify(busDataToSave),
      );

      setIsSubmitting(false);
      setSuccessMessage("Bus Registered & Saved Successfully!");

      setTimeout(() => {
        navigate("/bus-owner/seat-layout", {
          state: { busData: busDataToSave },
        });
      }, 1500);
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl font-sans shadow-sm p-5 my-8 relative">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header Section */}
      <div className="flex items-center gap-3 border-b border-gray-100 pb-3 mb-5">
        <div className="bg-blue-600 w-10 h-10 flex items-center justify-center rounded-full">
          <Bus size={24} className="text-white" />
        </div>
        <div>
          <h2 className="text-[16px] leading-[24px] font-semibold text-gray-900">
            Bus Registration
          </h2>
        </div>
      </div>

      {/* Success Notification */}
      {successMessage && (
        <div className="mb-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-2 rounded-xl text-xs font-semibold">
          <Check size={16} className="shrink-0" />
          {successMessage}
        </div>
      )}

      {/* Form Started */}
      <form onSubmit={handleSubmit} className="space-y-4 text-[12px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-full sm:w-32 font-bold text-bodyText uppercase tracking-wide shrink-0">
              Reg Number <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="regNumber"
              required
              placeholder="e.g., TN 45 AB 2233"
              value={formData.regNumber}
              onChange={handleInputChange}
              className="w-full border border-border text-[14px] leading-[18px] rounded-md px-3 py-2 text-bodyText bg-white outline-none hover:border-royalBlue transition uppercase focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none transition duration-300"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="w-full sm:w-32 font-bold text-bodyText uppercase tracking-wide shrink-0">
              Make & Model <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="makeModel"
              required
              placeholder="e.g., Volvo B11R"
              value={formData.makeModel}
              onChange={handleInputChange}
              className="w-full border border-border text-[14px] rounded-md px-3 py-2 text-bodyText bg-white outline-none hover:border-royalBlue transition focus:ring-1 focus:ring-royalBlue focus:ring-offset-[3px] focus:outline-none focus:border-none transition duration-300"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 border-t border-gray-50 pt-3">
          <label className="w-full md:w-32 font-bold text-[#1A1A2E] uppercase tracking-wide shrink-0">
            Layout Config <span className="text-rose-500">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2 flex-1">
            {["Seater", "Sleeper", "Semi-Sleeper"].map((layout) => (
              <label
                key={layout}
                className={`border rounded p-2 flex items-center justify-center font-bold cursor-pointer transition ${
                  formData.seatLayout === layout
                    ? "border-blue-600 bg-blue-50 text-blue-600 font-extrabold"
                    : "border-gray-200 text-[#5D6D7E] hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="seatLayout"
                  value={layout}
                  checked={formData.seatLayout === layout}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                {layout}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-start gap-2 border-t border-gray-50 pt-3">
          <label className="w-full md:w-32 font-bold text-[#1A1A2E] uppercase tracking-wide shrink-0 md:pt-2">
            Amenities
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 flex-1 bg-gray-50/50 border border-gray-100 p-2.5 rounded-xl">
            {availableAmenities.map((amenity) => {
              const isChecked = formData.amenities.includes(amenity);
              return (
                <button
                  type="button"
                  key={amenity}
                  onClick={() => handleAmenityChange(amenity)}
                  className={`flex items-center gap-1.5 px-2 py-1.5 border rounded font-semibold transition text-left bg-white text-[11px] ${
                    isChecked
                      ? "border-blue-600 text-blue-600 bg-blue-50 font-bold"
                      : "border-gray-200 text-[#5D6D7E] hover:border-gray-300"
                  }`}
                >
                  <div
                    className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-all shrink-0 ${
                      isChecked
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300"
                    }`}
                  >
                    {isChecked && (
                      <Check size={8} className="text-white stroke-[3]" />
                    )}
                  </div>
                  <span className="truncate">{amenity}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PHOTO SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 border-t border-gray-50 pt-3">
          <label className="w-full md:col-span-2 font-bold text-[#1A1A2E] uppercase tracking-wide md:pt-2">
            Photos
          </label>

          <div className="md:col-span-4 border-2 border-dashed border-gray-200 hover:border-blue-600/50 rounded-xl p-4 text-center cursor-pointer transition bg-gray-50/30 group relative flex flex-col justify-center min-h-[100px]">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-1.5 bg-white rounded-lg border text-gray-400 group-hover:text-blue-600 group-hover:border-blue-600/30 transition shrink-0">
                <Upload size={14} />
              </div>
              <div className="text-center">
                <p className="font-bold text-[#1A1A2E] text-[11px]">
                  Upload Photos
                </p>
                <p className="text-[10px] text-[#7F8C8D]">
                  Click image to Crop
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-6 flex flex-col justify-start">
            {formData.photos.length > 0 ? (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 max-h-[160px] overflow-y-auto space-y-2">
                <p className="text-[10px] font-bold text-[#1A1A2E] uppercase tracking-wide sticky top-0 bg-gray-50 pb-1 z-10">
                  Selected Assets ({formData.photos.length})
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {formData.photos.map((file, idx) => {
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div
                        key={idx}
                        onClick={() => openCropModal(file, idx)}
                        className="relative w-full h-16 rounded-lg overflow-hidden border border-gray-200 bg-white group cursor-pointer hover:border-blue-500 transition"
                      >
                        <img
                          src={previewUrl}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <Crop size={14} className="text-white" />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => removePhoto(idx, e)}
                          className="absolute top-1 right-1 bg-rose-600 text-white p-0.5 rounded-full hover:bg-rose-700 transition z-20"
                        >
                          <X size={10} className="stroke-[3]" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center md:text-left text-[11px] text-[#7F8C8D] p-4 bg-gray-50/50 border border-dashed border-gray-100 rounded-xl flex items-center justify-center h-full min-h-[100px]">
                No active assets uploaded yet.
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-gray-50 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 h-9 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 font-bold text-[14px] leading-[18px] rounded-md transition flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Registering..." : "Build Layout"}
          </button>
        </div>
      </form>

      {/* NEW ADVANCED ARROW RESIZABLE CROP MODAL POPUP */}
      {cropModal.isOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 select-none animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 bg-gray-50/50">
              <div className="flex items-center gap-1.5 text-gray-900 font-bold text-sm">
                <Crop size={16} className="text-blue-600" />
                <span>Crop & Resize Image</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  setCropModal({
                    isOpen: false,
                    imageSrc: "",
                    photoIndex: null,
                    fileName: "",
                    fileType: "",
                  })
                }
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition"
              >
                <X size={16} />
              </button>
            </div>

            {/* Workspace Arena */}
            <div className="p-4 flex flex-col items-center">
              <div
                className="relative bg-gray-950 rounded-lg overflow-hidden w-full h-72 flex items-center justify-center border border-gray-800 touch-none"
                onMouseMove={handleDragMove}
                onTouchMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onTouchEnd={handleDragEnd}
              >
                <img
                  src={cropModal.imageSrc}
                  alt="To Crop"
                  className="max-w-full max-h-full object-contain pointer-events-none select-none"
                />

                {/* Movable & Resizable Selection Box */}
                <div
                  onMouseDown={(e) => handleDragStart(e, "move")}
                  onTouchStart={(e) => handleDragStart(e, "move")}
                  className={`absolute border-2 border-blue-500 bg-blue-500/10 shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] ${
                    dragMode === "move" ? "cursor-grabbing" : "cursor-move"
                  }`}
                  style={{
                    left: `${cropArea.x}%`,
                    top: `${cropArea.y}%`,
                    width: `${cropArea.width}%`,
                    height: `${cropArea.height}%`,
                  }}
                >
                  {/* Grid Lines inside selection area */}
                  <div className="w-full h-full border border-dashed border-white/30 pointer-events-none relative">
                    <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/20"></div>
                    <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white/20"></div>
                    <div className="absolute top-0 left-1/3 w-[1px] h-full bg-white/20"></div>
                    <div className="absolute top-0 left-2/3 w-[1px] h-full bg-white/20"></div>
                  </div>

                  {/* Top Left (NW) */}
                  <div
                    onMouseDown={(e) => handleDragStart(e, "nw")}
                    onTouchStart={(e) => handleDragStart(e, "nw")}
                    className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-blue-600 rounded-full cursor-nwse-resize shadow-md hover:bg-blue-50"
                  />
                  {/* Top Right (NE) */}
                  <div
                    onMouseDown={(e) => handleDragStart(e, "ne")}
                    onTouchStart={(e) => handleDragStart(e, "ne")}
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-blue-600 rounded-full cursor-nesw-resize shadow-md hover:bg-blue-50"
                  />
                  {/* Bottom Left (SW) */}
                  <div
                    onMouseDown={(e) => handleDragStart(e, "sw")}
                    onTouchStart={(e) => handleDragStart(e, "sw")}
                    className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 bg-white border-2 border-blue-600 rounded-full cursor-nesw-resize shadow-md hover:bg-blue-50"
                  />
                  {/* Bottom Right (SE) */}
                  <div
                    onMouseDown={(e) => handleDragStart(e, "se")}
                    onTouchStart={(e) => handleDragStart(e, "se")}
                    className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 bg-white border-2 border-blue-600 rounded-full cursor-nwse-resize shadow-md hover:bg-blue-50"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-2 border-t border-gray-100 px-4 py-3 bg-gray-50/50">
              <button
                type="button"
                onClick={() =>
                  setCropModal({
                    isOpen: false,
                    imageSrc: "",
                    photoIndex: null,
                    fileName: "",
                    fileType: "",
                  })
                }
                className="px-3 py-1.5 border border-gray-200 hover:bg-gray-100 text-gray-600 rounded-md font-semibold text-xs transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCroppedImage}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-bold text-xs shadow-md transition"
              >
                Save Crop
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
