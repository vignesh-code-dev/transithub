// function StatusBadge({
//   status,
// }) {

//   const statusConfig = {

//     active: {
//       bg: "bg-[#AED6F1]",
//       text: "text-[#1A1A2E]",
//       label: "Active",
//     },

//     online: {
//       bg: "bg-[#AED6F1]",
//       text: "text-[#1A1A2E]",
//       label: "Online",
//     },

//     pending: {
//       bg: "bg-[#FFF9C4]",
//       text: "text-[#7D6608]",
//       label: "Pending",
//     },

//     completed: {
//       bg: "bg-[#C8E6C9]",
//       text: "text-[#1B5E20]",
//       label: "Completed",
//     },

//     cancelled: {
//       bg: "bg-[#FFCDD2]",
//       text: "text-[#C62828]",
//       label: "Cancelled",
//     },

//     rejected: {
//       bg: "bg-[#FFCDD2]",
//       text: "text-[#C62828]",
//       label: "Rejected",
//     },

//     warning: {
//       bg: "bg-[#FFE0B2]",
//       text: "text-[#E65100]",
//       label: "Warning",
//     },

//     inactive: {
//       bg: "bg-[#ECEFF1]",
//       text: "text-[#5D6D7E]",
//       label: "Inactive",
//     },

//     offline: {
//       bg: "bg-[#ECEFF1]",
//       text: "text-[#5D6D7E]",
//       label: "Offline",
//     },

//   };

//   const currentStatus =
//     statusConfig[status] ||
//     statusConfig.inactive;

//   return (

//     <span
//       className={`
//         inline-flex
//         items-center
//         justify-center

//         px-3
//         py-1

//         rounded-full

//         text-xs
//         font-medium

//         ${currentStatus.bg}
//         ${currentStatus.text}
//       `}
//     >

//       {currentStatus.label}

//     </span>
//   );
// }

// export default StatusBadge;


function StatusBadge({
  status,
}) {

  const statusConfig = {

    active: {
      bg: "bg-[#E8F4FD]",
      text: "text-[#1A1A2E]",
      dot: "bg-[#42A5F5]",
      label: "Active",
    },

    online: {
      bg: "bg-[#E8F5E9]",
      text: "text-[#1B5E20]",
      dot: "bg-[#43A047]",
      label: "Online",
    },

    pending: {
      bg: "bg-[#FFF8E1]",
      text: "text-[#7D6608]",
      dot: "bg-[#F9A825]",
      label: "Pending",
    },

    completed: {
      bg: "bg-[#E8F5E9]",
      text: "text-[#1B5E20]",
      dot: "bg-[#43A047]",
      label: "Completed",
    },

    cancelled: {
      bg: "bg-[#FFEBEE]",
      text: "text-[#C62828]",
      dot: "bg-[#E53935]",
      label: "Cancelled",
    },

    rejected: {
      bg: "bg-[#FFEBEE]",
      text: "text-[#C62828]",
      dot: "bg-[#E53935]",
      label: "Rejected",
    },

    warning: {
      bg: "bg-[#FFF3E0]",
      text: "text-[#E65100]",
      dot: "bg-[#FB8C00]",
      label: "Warning",
    },

    inactive: {
      bg: "bg-[#ECEFF1]",
      text: "text-[#5D6D7E]",
      dot: "bg-[#90A4AE]",
      label: "Inactive",
    },

    offline: {
      bg: "bg-[#ECEFF1]",
      text: "text-[#5D6D7E]",
      dot: "bg-[#90A4AE]",
      label: "Offline",
    },

  };

  const currentStatus =
    statusConfig[status] ||
    statusConfig.inactive;

  return (

    <span
      className={`
      inline-flex
      items-center
      gap-2

      h-8

      px-3.5

      rounded-full

      whitespace-nowrap

      text-xs
      sm:text-[13px]

      font-semibold

      border
      border-white/40

      shadow-sm

      backdrop-blur-sm

      ${currentStatus.bg}
      ${currentStatus.text}
      `}
    >

      {/* STATUS DOT */}

      <span
        className={`
        w-2
        h-2

        rounded-full

        ${currentStatus.dot}

        ${
          status === "online" ||
          status === "active"
            ? "animate-pulse"
            : ""
        }
        `}
      />

      {/* LABEL */}

      <span>
        {currentStatus.label}
      </span>

    </span>
  );
}

export default StatusBadge;