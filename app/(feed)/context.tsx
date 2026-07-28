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

const FeedContext = createContext<{
  count: number;
  createMessage: (data: TypeFormMessageCreate) => Promise<void>;
  deleteMessage: (message: TypeDtoMessage) => Promise<void>;
  filter: TypeFormFeedFilter;
  hasMore: boolean;
  loading: boolean;
  loadMore: () => Promise<void>;
  messages: TypeDtoMessage[] | null;
  pageCount: number;
  setFilter: (value: TypeFormFeedFilter) => void;
  setLoading: (loading: boolean) => void;
  sync: (messages: TypeDtoMessage[], count: number) => void;
  updateMessage: (message: TypeDtoMessage) => Promise<void>;
}>({
  count: 0,
  createMessage: async () => {},
  deleteMessage: async () => {},
  filter: { dateFrom: '', dateTo: '', tag: null, authorId: null },
  hasMore: false,
  loading: false,
  loadMore: async () => {},
  messages: null,
  pageCount: 1,
  setFilter: () => {},
  setLoading: () => {},
  sync: () => {},
  updateMessage: async () => {},
});

export function FeedProvider(props: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [messages, setMessages] = useState<TypeDtoMessage[] | null>(null);
  const [count, setCount] = useState(0);
  const [pageCount, setPageCount] = useState(1);
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

  const hasMore = !!messages && pageCount * ConstMessagesPageSize < count;

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
    (nextMessages: TypeDtoMessage[], nextCount: number) => {
      setMessages(nextMessages);
      setCount(nextCount);
      setPageCount(1);
    },
    [],
  );

  const setFilter = (value: TypeFormFeedFilter) => {
    const param = mapObjectToQuery(value);
    router.push(param ? `/?filters=${param}` : '/');
  };

  const loadMore = async () => {
    if (!messages || loading || !hasMore) {
      return;
    }

    setLoading(true);
    const page = await fetchMessages(pageCount, ConstMessagesPageSize);
    setMessages([...messages, ...page.data]);
    setCount(page.count);
    setPageCount(pageCount + 1);
    setLoading(false);
  };

  const refetchMessages = async () => {
    if (!messages) {
      return;
    }

    const fresh = await fetchMessages(0, pageCount * ConstMessagesPageSize);
    setMessages(fresh.data);
    setCount(fresh.count);
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
    setMessages(
      messages &&
        messages.map((item) => (item.id === message.id ? message : item)),
    );
    await refetchMessages();
  };

  const deleteMessage = async (message: TypeDtoMessage) => {
    await actionMessageDelete({ id: message.id });
    setMessages(messages && messages.filter((item) => item.id !== message.id));
    setCount(count - 1);
    await refetchMessages();
  };

  return (
    <FeedContext.Provider
      value={{
        count,
        createMessage,
        deleteMessage,
        filter,
        hasMore,
        loading,
        loadMore,
        messages,
        pageCount,
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
