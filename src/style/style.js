import { AppBar, Box, Modal, ListItem, styled, List } from "@mui/material";

// NAVBAR
// AppBar personalizzato
export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

// Box personalizzato per il contenuto del Modal
export const ModalBox = styled(Box)(({ theme }) => ({
  padding: "20px",
  margin: "auto",
  width: "100%",
  maxWidth: "700px",
  backgroundColor: theme.palette.background.default,
  borderRadius: "8px",
  marginTop: "10%",
}));

// ListItem personalizzato per la lista degli ordini
export const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  "&:last-child": {
    borderBottom: "none",
  },
}));

// Modale personalizzato
export const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// MENU
export const StyledList = styled(List)(({ theme }) => ({
  minWidth: "20rem",
  //   backgroundColor: theme.palette.background.paper,
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
