import { useCallback, useEffect, useState } from "react";
// Own
import { PaginateData } from "services/types";
import { useAppDispatch } from "store";
import { setIsLoading, setErrorMessage } from "store/customizationSlice";
import BackendError from "exceptions/backend-error";
import { Event } from "types/event";
import getPaginatedEvents from "services/events/get-paginated-events";

export default function usePaginate() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [events, setTrainTickets] = useState<Event[]>([]);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchEvents = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginatedEvents({
        page,
        "per-page": paginate.itemsPerPage,
      });
      console.log(response);
      setTrainTickets(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
      dispatch(setIsLoading(false));
    }
  }, [dispatch, page, paginate.itemsPerPage]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    paginate,
    setPage,
    fetchEvents,
  };
}
