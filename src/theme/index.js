import _ from "lodash";
import { colors, createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: "transparent",
        width:'33.5%'
      },
      head: {
        background: "#F4F7FF",
      },
    },
    MuiTableRow: {
      root: {},
    },
    MuiFormLabel: {
      root: { color: "#222" },
      colorSecondary: {
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiListSubheader: {
      root: {
        color: "#000000",
        fontSize: "22px !important",
        fontWeight: "600 !important",
        lineHeight: "33px !important",
      },
    },
    MuiOutlinedInput: {
      root: {
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: "7px",
        height: "48px",
      },
      notchedOutline: {
        borderColor: "rgba(0, 0, 0, 0.08)",
      },
      colorSecondary: {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          color: "#222",
          borderColor: "#222",
        },
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiPaper: {
      outlined: {
        padding: "20px",
        width: "100%",
      },
      elevation1: {
        background: "#fff",
        borderRadius: "10px",
        padding: "26px 20px",
        boxShadow: "none",
      },
      elevation2: {
        // background:
        //   "linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0) 68.15%)",
        border: "none",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "none",
      },
    },
    MuiPopover: {
      root: {
        zIndex: 99999,
      },
    },
    MuiMenuItem: { root: { paddingLeft: "20px" } },
    MuiListItem: {
      root: {
        alignItems: "self-start",
      },
      gutters: {
        paddingLeft: 0,
      },
    },
    MuiCheckbox: {
      root: {
        padding: "4px",
        fontSize: "12px",
      },
      colorSecondary: {
        "&.Mui-checked": { color: "#4D164F" },
      },
    },
    MuiFormControlLabel: {
      root: {
        paddingBottom: "0",
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        right: 0,
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        Width: 450,
        maxWidth: "100%",
      },
      paper: {
        overflowY: "unset",
        borderRadius: "20px !important",
        padding: "20px",
      },
      paperWidthSm: {
        maxWidth: "900px !important",
      },
    },
    MuiInputBase: {
      input: {
        fontSize: 14,
        color: "#222",
        height: "0.1876em",
      },
    },
    MuiBackdrop: {
      root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
    },
    MuiAutocomplete: {
      option: {
        fontFamily: "Poppins !important",
        fontSize: "12px !important",
        fontWeight: "400 !important",
        lineHeight: "18px !important",
        letterSpacing: "0px !important",
        textAlign: "left !important",
      },
    },
    MuiButton: {
      containedSecondary: {
        color: "#681E65",
        height: "50px",
        padding: "15px 40px",
        fontSize: "18px",
        border: "2px solid #681E65",
        background: "#fff",
        fontWeight: "500",
        lineHeight: "21px",
        fontFamily: "'Outfit'",
        borderRadius: "50px",
        // backgroundColor: "#F2F2F2",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) !important",
        "&:hover": {
          background: "linear-gradient(275deg, #4D164F 4.07%, #681E65 98.21%)",
          border: "2px solid #4D164F",
          boxShadow: "none !important",
          color: "#fff",
          backgroundColor:
            "linear-gradient(275deg, #4D164F 4.07%, #681E65 98.21%)",
        },
      },

      containedPrimary: {
        color: "#fff",
        height: "50px",
        padding: "15px 40px",
        fontSize: "18px",
        background: "linear-gradient(275deg, #4D164F 4.07%, #681E65 98.21%)",
        border: "2px solid #4D164F",
        fontWeight: "500",
        lineHeight: "21px",
        fontFamily: "Outfit",
        borderRadius: "50px",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) !important",
        // backgroundColor:
        //   "linear-gradient(275deg, #4D164F 4.07%, #681E65 98.21%)",
        "&:hover": {
          color: "#681E65",
          border: "2px solid #681E65",
          background: "#fff !important",
        },
      },
      contained: {
        color: "#fff",
        height: "40px",
        padding: "10px 39px",
        fontSize: "14px",
        background: "linear-gradient(275deg, #4D164F 4.07%, #681E65 98.21%)",
        border: "1px solid #4D164F",
        fontWeight: "500",
        lineHeight: "21px",
        fontFamily: "Outfit",
        borderRadius: "50px",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) !important",
        backgroundColor:
          "linear-gradient(275deg, #4D164F 4.07%, #681E65 98.21%)",
        "&:hover": {
          color: "#fff",
          border: "1px solid #E1E1E1",
          backgroundColor: "#F2F2F2",
        },
      },
      outlinedPrimary: {
        color: "#080515",
        border: "1px solid #4D164F",
        padding: "5px 25px",
        fontWeight: "500",
        borderRadius: "50px",
        fontSize: "13px",
        "&:hover": {
          backgroundColor: "#4D164F",
          border: "1px solid #4D164F",
          color: "#fff",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
      containedDisabled: {
        color: "#fff !important",
        height: "50px",
        padding: "15px 40px",
        fontSize: "14px",
        background: "linear-gradient(275deg, #4D164F 4.07%, #681E65 98.21%)",
        border: "2px solid #4D164F",
        fontWeight: "500",
        lineHeight: "21px",
        fontFamily: "Outfit",
        borderRadius: "50px",
        // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25) !important",
        // backgroundColor:
        //   "linear-gradient(275deg, #4D164F 4.07%, #681E65 98.21%)",
        "&:hover": {
          color: "#681E65",
          border: "2px solid #681E65",
          background: "#fff !important",
        },
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "0",
      },
    },
    MuiMenu: {
      paper: { top: "47px" },
    },

    MuiTypography: {
      subtitle1: {
        color: "#000",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: " 16px",
        colorSecondary: {
          color: "#8d8989",
        },
      },
    },
  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#fff",
      dark: "#f3f7f9",
      paper: colors.common.white,
    },
    primary: {
      main: "#681E65",
      dark: "#080515",
      light: "rgba(0, 0, 0, 0.60)",
    },
    secondary: {
      main: "#fff",
    },
    warning: {
      main: "#ffae33",
      dark: "#ffae33",
      light: "#fff1dc",
    },
    success: {
      main: "#54e18c",
      dark: "#54e18c",
      light: "#e2faec",
    },
    error: {
      main: "#DC0404",
      dark: "#DC0404",
      light: "#DC0404",
    },
    text: {
      primary: "#161E29",
      secondary: "rgba(8, 5, 21, 0.60)",
    },
    common: {
      black: "#222222",
    },
  },
};

export const createTheme = (config = {}) => {
  let theme = createMuiTheme(_.merge({}, baseOptions, themesOptions));

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
