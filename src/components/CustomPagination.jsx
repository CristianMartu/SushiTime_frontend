import { Pagination } from "@mui/material";

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (event, pageNumber) => {
    onPageChange(pageNumber - 1);
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage + 1}
      onChange={handlePageChange}
      variant="outlined"
      color="primary"
      showFirstButton
      showLastButton
    />
  );
};

export default CustomPagination;
