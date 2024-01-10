import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Post from './Post';
import LoadingIndicator from './LoadingIndicator';

function PostList({ data }: { data: any[] }) {
  return (
    <>
      {data.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

function LoadMoreButton({ onClick, isFetchingNextPage }: { onClick: () => void; isFetchingNextPage: boolean }) {
  return (
    <div className="text-center my-4">
      <button
        className="btn btn-primary"
        onClick={onClick}
        disabled={isFetchingNextPage}
      >
        {isFetchingNextPage ? (
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
        ) : (
          'Load More'
        )}
      </button>
    </div>
  );
}

const usePostListQuery = () => useInfiniteQuery(
  'posts',
  async ({ pageParam = 1 }) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`);
    return response.json();
  },
  {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) {
        return null;
      }
      return allPages.length + 1;
    },
  },
);

const handleLoadMore = (fetchNextPage: any, setPage: any, page: number) => {
  fetchNextPage({ pageParam: page + 1 });
  setPage(page + 1);
};

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePostListQuery();

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="container">
      <h1 className="mt-4 mb-4 text-center">Posts</h1>
      {data?.pages.map((pageData, pageIndex) => (
        <React.Fragment key={pageIndex}>
          <PostList data={pageData} />
        </React.Fragment>
      ))}
      <LoadMoreButton onClick={() => handleLoadMore(fetchNextPage, setPage, page)} isFetchingNextPage={isFetchingNextPage} />
      {!hasNextPage && <div className="text-center my-4">No more posts to load</div>}
    </div>
  );
};

export default Home;
