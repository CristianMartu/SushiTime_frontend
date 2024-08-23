import { useTheme } from "@mui/material";
import { StyledTablePagination } from "../style/style";

const CustomTablePagination = ({
  totalPages,
  currentPage,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  styledColor = false,
}) => {
  const theme = useTheme();
  const handleChangePage = (event, newPage) => {
    onPageChange(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsPerPageChange(parseInt(event.target.value, 10));
    onPageChange(0);
  };

  return (
    <StyledTablePagination
      component={"div"}
      count={totalPages}
      page={currentPage}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      labelRowsPerPage="Righe"
      rowsPerPageOptions={[5, 10, 25, 50]}
      showFirstButton
      showLastButton
      sx={
        styledColor && {
          backgroundColor: "#2e6a71",
          color: theme.palette.common.contrast,
        }
      }
    />
  );
};

export default CustomTablePagination;
