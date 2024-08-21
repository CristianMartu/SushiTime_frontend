import {
  AppBar,
  Box,
  ListItem,
  styled,
  List,
  TextField,
  alpha,
  InputBase,
  GlobalStyles,
  useTheme,
} from "@mui/material";

export const GlobalScrollbarStyles = () => {
  const theme = useTheme();
  return (
    <GlobalStyles
      styles={{
        "*::-webkit-scrollbar": {
          width: "6px",
          height: "6px",
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.secondary.main,
          borderRadius: "10px",
        },
        "*::-webkit-scrollbar-track": {
          marginBlock: "5px",
        },
      }}
    />
  );
};

// NAVBAR
// AppBar personalizzato
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

// Box personalizzato per il contenuto del Modal
export const ModalBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  maxWidth: "800px",
  padding: "1.5rem",
  borderRadius: "8px",
  marginInline: "auto",
  marginBlockStart: "10vh",
  // borderColor: theme.palette.primary.light,
  // border: "1px solid",
}));

// ListItem personalizzato per la lista degli ordini
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

// MENU
export const StyledList = styled(List)(({ theme }) => ({
  minWidth: "20rem",
  backgroundColor: theme.palette.primary.main,
  borderRadius: "4px",
  boxShadow: theme.shadows[1],
  height: "calc(100vh - 4rem)",
  overflowY: "auto",
}));

// Styled ListItem
export const StyledListItemMenu = styled(ListItem, {
  shouldForwardProp: (prop) => prop !== "isActive",
})(({ theme, isActive }) => ({
  backgroundColor: theme.palette.primary.main,
  color: isActive ? theme.palette.secondary.main : theme.palette.text.light,
  borderBottom: `1px solid ${theme.palette.text.light}`,
  ":last-of-type": {
    borderBottom: `0px`,
  },
  width: "80%",
  margin: "0 auto",
  borderLeft: isActive ? `10px solid ${theme.palette.secondary.main}` : "none",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFilledInput-root": {
    borderRadius: 4,
    backgroundColor: theme.palette.common.contrast,
    border: "1px solid",
    borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    "&.Mui-focused": {
      backgroundColor: theme.palette.common.white,
      boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.secondary.main,
    },
  },
}));

export const BootstrapInput = styled(InputBase)(({ theme, error }) => ({
  "label + &": {
    marginTop: theme.spacing(4),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.contrast,
    border: "1px solid",
    // borderColor: theme.palette.secondary.main,
    borderColor: error
      ? theme.palette.error.main
      : theme.palette.secondary.main,
    fontSize: 20,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    "&:focus": {
      // boxShadow: `${alpha(theme.palette.secondary.main, 0.25)} 0 0 0 0.2rem`,
      // borderColor: theme.palette.secondary.main,
      boxShadow: `${alpha(
        error ? theme.palette.error.main : theme.palette.secondary.main,
        0.25
      )} 0 0 0 0.2rem`,
      borderColor: error
        ? theme.palette.error.main
        : theme.palette.secondary.main,
    },
  },
}));
