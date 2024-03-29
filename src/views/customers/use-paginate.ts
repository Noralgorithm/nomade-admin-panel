import { useCallback, useEffect, useState } from "react";
// Own
import { Customer } from "types/customer";
import getPaginatedCustomers from "services/customers/get-paginated-customers";
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchCustomers = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedCustomers({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response)
      setCustomers(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  return {
    customers,
    paginate,
    setPage,
    fetchCustomers,
  };
}
