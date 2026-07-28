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
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

type TypeFeedList = {
  count: number;
  messages: TypeDtoMessage[];
  pageCount: number;
};

const FeedContext = createContext<{
  createMessage: (data: TypeFormMessageCreate) => Promise<void>;
  deleteMessage: (message: TypeDtoMessage) => Promise<void>;
  filter: TypeFormFeedFilter;
  hasMore: boolean;
  list: TypeFeedList | null;
  loading: boolean;
  loadMore: () => Promise<void>;
  setFilter: (value: TypeFormFeedFilter) => void;
  setLoading: (loading: boolean) => void;
  sync: (messages: TypeDtoMessage[], count: number) => void;
  updateMessage: (message: TypeDtoMessage) => Promise<void>;
}>({
  createMessage: async () => {},
  deleteMessage: async () => {},
  filter: { dateFrom: '', dateTo: '', tag: null, authorId: null },
  hasMore: false,
  list: null,
  loading: false,
  loadMore: async () => {},
  setFilter: () => {},
  setLoading: () => {},
  sync: () => {},
  updateMessage: async () => {},
});

export function FeedProvider(props: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [list, setList] = useState<TypeFeedList | null>(null);
  const [loading, setLoading] = useState(false);

  const filtersParam = searchParams.get('filters') ?? undefined;
  const filter = useMemo<TypeFormFeedFilter>(
    () => ({
      dateFrom: '',
      dateTo: '',
      tag: null,
      authorId: null,
      ...mapObjectFromQuery<TypeFormFeedFilter>(filtersParam),
    }),
    [filtersParam],
  );

  const hasMore = !!list && list.pageCount * ConstMessagesPageSize < list.count;

  const fetchMessages = (pageIndex: number, pageSize: number) =>
    actionMessagesGet({
      filterDateFrom: filter.dateFrom || undefined,
      filterDateTo: filter.dateTo || undefined,
      filterTag: filter.tag || undefined,
      filterAuthorId: filter.authorId || undefined,
      pageIndex,
      pageSize,
    });

  const sync = useCallback(
    (messages: TypeDtoMessage[], count: number) =>
      setList({ count, messages, pageCount: 1 }),
    [],
  );

  const setFilter = (value: TypeFormFeedFilter) => {
    const param = mapObjectToQuery(value);
    router.push(param ? `/?filters=${param}` : '/');
  };

  const loadMore = async () => {
    if (!list || loading || !hasMore) {
      return;
    }

    setLoading(true);
    const page = await fetchMessages(list.pageCount, ConstMessagesPageSize);
    setList({
      count: page.count,
      messages: [...list.messages, ...page.data],
      pageCount: list.pageCount + 1,
    });
    setLoading(false);
  };

  const refetchMessages = async () => {
    if (!list) {
      return;
    }

    const fresh = await fetchMessages(
      0,
      list.pageCount * ConstMessagesPageSize,
    );
    setList({
      count: fresh.count,
      messages: fresh.data,
      pageCount: list.pageCount,
    });
  };

  const createMessage = async (data: TypeFormMessageCreate) => {
    await actionMessageCreate({ tag: data.tag, text: data.text });
    router.push('/');
  };

  const updateMessage = async (message: TypeDtoMessage) => {
    await actionMessageUpdate({
      id: message.id,
      tag: message.tag,
      text: message.text,
    });
    setList(
      list && {
        ...list,
        messages: list.messages.map((item) =>
          item.id === message.id ? message : item,
        ),
      },
    );
    await refetchMessages();
  };

  const deleteMessage = async (message: TypeDtoMessage) => {
    await actionMessageDelete({ id: message.id });
    setList(
      list && {
        ...list,
        count: list.count - 1,
        messages: list.messages.filter((item) => item.id !== message.id),
      },
    );
    await refetchMessages();
  };

  return (
    <FeedContext.Provider
      value={{
        createMessage,
        deleteMessage,
        filter,
        hasMore,
        list,
        loading,
        loadMore,
        setFilter,
        setLoading,
        sync,
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

export function FeedLoadingMark() {
  const feed = useFeed();

  const setLoading = feed.setLoading;
  useEffect(() => {
    setLoading(true);
    return () => setLoading(false);
  }, [setLoading]);

  return null;
}
