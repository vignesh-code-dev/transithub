const STATUS_STYLES = {

  active: {
    bg: "#AED6F1",
    text: "#1A1A2E",
    label: "Active",
  },

  pending: {
    bg: "#FFF9C4",
    text: "#7D6608",
    label: "Pending",
  },

  completed: {
    bg: "#C8E6C9",
    text: "#1B5E20",
    label: "Completed",
  },

  cancelled: {
    bg: "#FFCDD2",
    text: "#C62828",
    label: "Cancelled",
  },

  offline: {
    bg: "#ECEFF1",
    text: "#5D6D7E",
    label: "Offline",
  },

};

function StatusBadge({
  status = "active",
}) {

  const current =
    STATUS_STYLES[status];

  return (

    <span
      className="
      inline-flex
      items-center

      px-3
      py-1

      rounded-full

      text-xs
      font-medium
      "
      style={{
        background: current.bg,
        color: current.text,
      }}
    >

      {current.label}

    </span>
  );
}

export default StatusBadge;