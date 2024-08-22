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
  Button,
  Menu,
  TableCell,
  tableCellClasses,
  TablePagination,
  Paper,
  DialogTitle,
  DialogContent,
  ToggleButtonGroup,
} from "@mui/material";
import { ToggleButton } from "react-bootstrap";

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

export const NavbarButton = styled((props) => (
  <Button disableRipple {...props} />
))(({ theme }) => ({
  color: theme.palette.text.light,
  marginRight: "2.5rem",
  "&:hover": {
    color: theme.palette.common.white,
  },
}));

export const NavbarToggleButton = styled((props) => (
  <ToggleButton {...props} />
))(({ theme }) => ({
  color: theme.palette.text.light,
  marginRight: "2.5rem",
  "&:hover": {
    color: theme.palette.common.white,
  },
  "&.Mui-selected": {
    color: theme.palette.primary.main, // Colore per il pulsante selezionato
    backgroundColor: theme.palette.background.default, // Background del pulsante selezionato
  },
}));

export const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: "165px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.contrast,
  },
  "& .MuiMenuItem-root": {
    "&:hover": {
      color: theme.palette.common.white,
    },
  },
}));

export const StyledTableCell = styled((props) => (
  <TableCell size="small" {...props} />
))(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.primary,
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    borderColor: theme.palette.background.dark,
  },
}));

export const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
  color: theme.palette.common.primary,
  border: 0,
}));

export const TablePaper = styled(Paper)({
  borderRadius: "6px",
  overflow: "hidden",
  marginBlockEnd: "1rem",
});

export const ModalDialogTitle = styled(DialogTitle)(({ theme }) => ({
  borderBlockEnd: `1px solid ${theme.palette.background.dark}`,
  color: theme.palette.common.primary,
}));

export const ModalDialogContent = styled(DialogContent)(({ theme }) => ({
  color: theme.palette.common.primary,
  marginBlock: "2rem",
}));

export const ModalToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    "& .MuiToggleButton-root": {
      // backgroundColor: theme.palette.common.lightDark,
      // color: theme.palette.common.contrast,
      "&.Mui-selected": {
        backgroundColor: theme.palette.common.darkContrast,
        color: theme.palette.common.darkRed,
        // color: theme.palette.common.lightDark,
        // border: "1.5px solid",
        // borderColor: theme.palette.common.lightGray,
      },
    },
  })
);
