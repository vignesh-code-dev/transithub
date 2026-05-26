module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    // ─────────────────────────────────────────────
    // BREAKPOINTS (Kept at theme root level)
    // ─────────────────────────────────────────────
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primaryBg: "#FFFFFF",
        brand: "#FFC200",
        highlight: "#AED6F1",
        bodyText: "#1A1A2E",
        secondaryText: "#5D6D7E",
        border: "#E0E0E0",

        // Custom colors for form states
        placeholder: "#BDBDBD",
        inputfield: "#FFFDE7",
        error: "#C0392B",
        disableBg: "#F2F2F2",
        disableText: "#BDBDBD",

        // Custom status colors
        activeBg: "#AED6F1",
        activeText: "#1A1A2E",
        pendingBg: "#FFF9C4",
        pendingText: "#7D6608",
        completedBg: "#D5F5E3",
        completedText: "#1E8449",
        rejectedBg: "#FADBD8",
        rejectedText: "#C0392B",
        warningBg: "#FDEBD0",
        warningText: "#D35400",
        inactiveBg: "#F2F2F2",
        inactiveText: "#5D6D7E",
    
        // Brand Colors
        yellow: {
          DEFAULT: "#FFC200",
          dark: "#E6AD00",
          light: "#FFFDE7",
          pale: "#FFF9C4",
        },

        // Customer Portal
        customer: {
          navy: "#002A73",
          blue: "#0057D9",
          yellow: "#FFC107",
          lightBlue: "#E8F0FD",
          hoverBlue: "#DBEAFE",
        },

        // Super Admin Portal
        superAdmin: {
          maroon: "#880E4F",
          rose: "#AD1457",
          palePink: "#FCE4EC",
          danger: "#B71C1C",
        },

        // Accent / Highlight
        sky: {
          DEFAULT: "#AED6F1",
          light: "#E8F4FD",
        },

        // Text Colors
        ink: {
          DEFAULT: "#1A1A2E",
          muted: "#5D6D7E",
        },

        // Borders
        border: {
          DEFAULT: "#E0E0E0",
        },

        // Semantic Colors
        success: {
          DEFAULT: "#1E8449",
          light: "#D5F5E3",
        },

        danger: {
          DEFAULT: "#C0392B",
          light: "#FADBD8",
        },

        warning: {
          DEFAULT: "#D35400",
          light: "#FDEBD0",
        },

        // Status Colors
        status: {
          confirmed: "#1E8449",
          pending: "#D35400",
          cancelled: "#C0392B",
          refunded: "#5D6D7E",
        },

        // Layout Colors
        page: "#F8FAFC",
        card: "#FFFFFF",
      },

      // ─────────────────────────────────────────────
      // TYPOGRAPHY
      // ─────────────────────────────────────────────
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
        heading: ["Inter", "sans-serif"],
        code: ["Roboto Mono", "monospace"],
      },

      fontSize: {
        xs: ["12px", { lineHeight: "16px" }],
        sm: ["13px", { lineHeight: "18px" }],
        base: ["14px", { lineHeight: "22px" }],
        md: ["16px", { lineHeight: "24px" }],
        lg: ["20px", { lineHeight: "28px" }],
        xl: ["24px", { lineHeight: "32px" }],
        "2xl": ["28px", { lineHeight: "36px" }],
        "3xl": ["32px", { lineHeight: "40px" }],
      },

      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },

      // ─────────────────────────────────────────────
      // SPACING
      // ─────────────────────────────────────────────
      spacing: {
        navbar: "64px",
        sidebar: "240px",
        sidebarCollapsed: "64px",
        content: "24px",
      },

      // ─────────────────────────────────────────────
      // WIDTH
      // ─────────────────────────────────────────────
      width: {
        sidebar: "240px",
        "sidebar-collapsed": "64px",
      },

      // ─────────────────────────────────────────────
      // HEIGHT
      // ─────────────────────────────────────────────
      height: {
        navbar: "64px",
        footer: "48px",
      },

      // ─────────────────────────────────────────────
      // BORDER RADIUS
      // ─────────────────────────────────────────────
      borderRadius: {
        none: "0px",
        sm: "4px",
        DEFAULT: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },

      // ─────────────────────────────────────────────
      // SHADOWS
      // ─────────────────────────────────────────────
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.08)",
        focus: "0 0 0 3px rgba(255,194,0,0.25)",
        "focus-red": "0 0 0 3px rgba(192,57,43,0.2)",
        none: "none",
      },

      // ─────────────────────────────────────────────
      // ANIMATIONS
      // ─────────────────────────────────────────────
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: ".7" },
        },
      },

      animation: {
        fadeIn: "fadeIn 0.3s ease-in-out",
        slideUp: "slideUp 0.3s ease-out",
        pulseSoft: "pulseSoft 2s infinite",
      },

      // ─────────────────────────────────────────────
      // TRANSITIONS
      // ─────────────────────────────────────────────
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "200ms",
        slow: "300ms",
      },

      // ─────────────────────────────────────────────
      // Z INDEX
      // ─────────────────────────────────────────────
      zIndex: {
        sidebar: "90",
        navbar: "100",
        dropdown: "150",
        modal: "200",
        toast: "300",
      },
    },
  },
  plugins: [],
};