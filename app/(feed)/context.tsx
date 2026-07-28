'use client';

import {
  actionMessageCreate,
  actionMessageDelete,
  actionMessagesGet,
  actionMessageUpdate,
} from '@dispatch/actions';
import { ConstMessagesPageSize } from '@dispatch/consts';
import { mapObjectFromQuery, mapObjectToQuery } from '@dispatch/maps';
import {
  TypeDtoMessage,
  TypeFormFeedFilter,
  TypeFormMessageCreate,
} from '@dispatch/types';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const emptyFilter: TypeFormFeedFilter = {
  dateFrom: '',
  dateTo: '',
  tag: null,
  authorId: null,
};

function fetchMessages(
  filter: TypeFormFeedFilter,
  pageIndex: number,
  pageSize: number,
) {
  return actionMessagesGet({
    filterDateFrom: filter.dateFrom || undefined,
    filterDateTo: filter.dateTo || undefined,
    filterTag: filter.tag || undefined,
    filterAuthorId: filter.authorId || undefined,
    pageIndex,
    pageSize,
  });
}

const FeedContext = createContext<{
  page: number;
  count: number;
  filter: TypeFormFeedFilter;
  hasMore: boolean;
  loading: boolean;
  loadMore: () => Promise<void>;
  messages: TypeDtoMessage[] | null;
  setFilter: (value: TypeFormFeedFilter) => void;
  createMessage: (data: TypeFormMessageCreate) => Promise<void>;
  deleteMessage: (message: TypeDtoMessage) => Promise<void>;
  updateMessage: (message: TypeDtoMessage) => Promise<void>;
}>({
  page: 1,
  count: 0,
  filter: emptyFilter,
  hasMore: false,
  loading: false,
  loadMore: async () => {},
  messages: null,
  setFilter: () => {},
  createMessage: async () => {},
  deleteMessage: async () => {},
  updateMessage: async () => {},
});

export function FeedProvider(props: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [state, setState] = useState<{
    page: number;
    count: number;
    messages: TypeDtoMessage[];
    param?: string;
  } | null>(null);
  const [pending, setPending] = useState(false);

  const filtersParam = searchParams.get('filters') ?? undefined;
  const filter = useMemo<TypeFormFeedFilter>(
    () => ({
      ...emptyFilter,
      ...mapObjectFromQuery<TypeFormFeedFilter>(filtersParam),
    }),
    [filtersParam],
  );

  const synced = !!state && state.param === filtersParam;
  const messages = synced ? state.messages : null;
  const count = synced ? state.count : 0;
  const page = synced ? state.page : 1;
  const hasMore = !!messages && page * ConstMessagesPageSize < count;
  const loading = !synced || pending;

  useEffect(() => {
    let stale = false;

    fetchMessages(filter, 0, ConstMessagesPageSize).then((page) => {
      if (!stale) {
        setState({
          count: page.count,
          messages: page.data,
          page: 1,
          param: filtersParam,
        });
      }
    });

    return () => {
      stale = true;
    };
  }, [filter, filtersParam]);

  const setFilter = (value: TypeFormFeedFilter) => {
    const param = mapObjectToQuery(value);
    router.push(param ? `/?filters=${param}` : '/');
  };

  const loadMore = async () => {
    if (!messages || pending || !hasMore) {
      return;
    }

    setPending(true);
    const response = await fetchMessages(filter, page, ConstMessagesPageSize);
    setState({
      count: response.count,
      messages: [...messages, ...response.data],
      page: page + 1,
      param: filtersParam,
    });
    setPending(false);
  };

  const refetchMessages = async () => {
    if (!messages) {
      return;
    }

    const fresh = await fetchMessages(filter, 0, page * ConstMessagesPageSize);
    setState({
      page,
      count: fresh.count,
      messages: fresh.data,
      param: filtersParam,
    });
  };

  const createMessage = async (data: TypeFormMessageCreate) => {
    await actionMessageCreate({ tag: data.tag, text: data.text });
    const fresh = await fetchMessages(emptyFilter, 0, ConstMessagesPageSize);
    setState({
      page: 1,
      count: fresh.count,
      messages: fresh.data,
      param: undefined,
    });
    router.push('/');
  };

  const updateMessage = async (message: TypeDtoMessage) => {
    await actionMessageUpdate({
      id: message.id,
      tag: message.tag,
      text: message.text,
    });
    if (messages) {
      setState({
        count,
        messages: messages.map((item) =>
          item.id === message.id ? message : item,
        ),
        page,
        param: filtersParam,
      });
    }
    await refetchMessages();
  };

  const deleteMessage = async (message: TypeDtoMessage) => {
    await actionMessageDelete({ id: message.id });
    if (messages) {
      setState({
        count: count - 1,
        messages: messages.filter((item) => item.id !== message.id),
        page,
        param: filtersParam,
      });
    }
    await refetchMessages();
  };

  return (
    <FeedContext.Provider
      value={{
        page,
        count,
        filter,
        hasMore,
        loading,
        messages,
        loadMore,
        setFilter,
        createMessage,
        deleteMessage,
        updateMessage,
      }}
    >
      {props.children}
    </FeedContext.Provider>
  );
}

export function useFeed() {
  return useContext(FeedContext);
}
