// import { Pagination } from "react-bootstrap";

// const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
//   const handlePageChange = (pageNumber) => {
//     onPageChange(pageNumber);
//   };

//   const renderPaginationItems = () => {
//     const items = [];
//     for (let number = 0; number < totalPages; number++) {
//       items.push(
//         <Pagination.Item
//           key={number}
//           active={number === currentPage}
//           onClick={() => handlePageChange(number)}
//         >
//           {number + 1}
//         </Pagination.Item>
//       );
//     }
//     return items;
//   };

//   return <Pagination>{totalPages > 0 && renderPaginationItems()}</Pagination>;
// };

// export default CustomPagination;
import { Pagination } from "@mui/material";

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (event, pageNumber) => {
    onPageChange(pageNumber - 1); // MUI Pagination is 1-based, adjust to 0-based if needed
  };

  return (
    <Pagination
      count={totalPages}
      page={currentPage + 1} // MUI Pagination is 1-based, adjust to 1-based index
      onChange={handlePageChange}
      variant="outlined" // You can change the variant (outlined/contained/etc.) based on your design
      color="primary" // You can adjust the color as per your theme
      showFirstButton
      showLastButton
    />
  );
};

export default CustomPagination;
