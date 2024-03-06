import React from "react";
import { Pagination, Divider } from "rsuite";

const PagePagination = ({ pagination, paginationHandler }) => {
  return (
    <div>
      <Divider />
      <Pagination
        prev
        last
        next
        first
        size="lg"
        total={pagination?.totalItems}
        limit={pagination?.itemsPerPage}
        activePage={pagination?.currentPage}
        onChangePage={paginationHandler}
      />
      <Divider />
    </div>
  );
};

export default PagePagination;
