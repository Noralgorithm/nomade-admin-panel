// material-ui

import { useEffect, useState, useCallback } from 'react';
import getPaginate, { StockPaginatorPayload } from 'services/stocks/get-paginate';
import { PaginateData } from 'services/types';
import BackendError from 'exceptions/backend-error';
import { useAppDispatch } from 'store';
import { setErrorMessage, setIsLoading } from 'store/customizationSlice';
import { Stock } from '../types';

export default function usePaginate(params: StockPaginatorPayload) {
  const dispatch = useAppDispatch();
  const [items, setItems] = useState<Stock[]>([]);
  const [page, setPage] = useState(1);
  const [paginate, setPaginate] = useState<PaginateData>({
    itemCount: 0,
    pageIndex: 1,
    itemsPerPage: 5,
    pageCount: 0,
  });

  const fetchItems = useCallback(async (page?: number) => {
    try {
      dispatch(setIsLoading(true));
      const response = await getPaginate({
        page: page || 1,
        size: paginate.itemsPerPage,
      }, {
        onlyForAgencyRif: params.onlyForAgencyRif,
      });
      setItems(response.items);
      setPaginate(response.paginate);
    } catch (error) {
      if (error instanceof BackendError)
        dispatch(setErrorMessage(error.getMessage()));
    } finally {
     dispatch(setIsLoading(false));
    }
  }, [dispatch, params.onlyForAgencyRif, paginate.itemsPerPage]);

  const reload = useCallback(() => {
    fetchItems(page);
  }, [fetchItems, page]);

  useEffect(() => { reload(); }, [reload]);

  return { items, page, paginate, setPage, fetchItems, reload } as const;
}
