import { BestSellingProducts } from "services/stadistics/types";
import DynamicTable from "components/DynamicTable";
import { Pagination } from "@mui/material";
import styled from "styled-components";
// Own
import { FunctionComponent } from "react";
import { PaginateData } from "services/types";

const Table: FunctionComponent<Prop> = ({
  items,
  paginate,
  className,
  onChange,
}) => {
  return (
    <div className={className}>
      <DynamicTable
        headers={[
          {
            columnLabel: "Id producto",
            fieldName: "productId",
            cellAlignment: "left",
          },
          {
            columnLabel: "Nombre corto",
            fieldName: "shortNameProduct",
            cellAlignment: "left",
          },
          {
            columnLabel: "Precio",
            fieldName: "price",
            cellAlignment: "left",
          },
          {
            columnLabel: "Total cantidad vendida",
            fieldName: "totalQuantitySold",
            cellAlignment: "left",
          },
        ]}
        rows={items}
        components={[]}
      />
      <div className={"paginator-container"}>
        <Pagination
          count={paginate.pageCount}
          page={paginate.pageIndex}
          variant="outlined"
          shape="rounded"
          color="primary"
          onChange={(event, page) => {
            onChange(page);
          }}
        />
      </div>
    </div>
  );
};

interface Prop {
  items: BestSellingProducts[];
  paginate: PaginateData;
  className?: string;
  onChange: (page: number) => void;
}

export default styled(Table)`
  display: flex;
  flex-direction: column;

  .paginator-container {
    margin-top: 12px;
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
`;
