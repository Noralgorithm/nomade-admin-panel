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
            columnLabel: "Nombre empleado",
            fieldName: "employeeName",
            cellAlignment: "left",
          },
          {
            columnLabel: "Cantidad de órdenes",
            fieldName: "orderCount",
            cellAlignment: "left",
          },
          {
            columnLabel: "Horas tomadas",
            fieldName: "serviceCount",
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
