import { Pagination } from "react-bootstrap";

const CustomPagination = ({ totalPages, currentPage, onPageChange }) => {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    for (let number = 0; number < totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number + 1}
        </Pagination.Item>
      );
    }
    return items;
  };

  return <Pagination>{totalPages > 0 && renderPaginationItems()}</Pagination>;
};

export default CustomPagination;
