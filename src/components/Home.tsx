import React, { useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import Post from './Post';

const Home: React.FC = () => {
  const [page, setPage] = useState(1);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery(
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
    }
  );

  const handleLoadMore = () => {
    fetchNextPage({ pageParam: page + 1 });
    setPage(page + 1);
  };

  if (isLoading) {
    return (
        <div className='container mt-4 mb-4 '>
            <div className="mt-4 mb-4  d-flex justify-content-center">
                <div className="mt-4 mb-4 spinner-border" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className='container'>
      <h1 className='mt-4 mb-4 text-center'>Posts</h1>
      {data?.pages.map((pageData, pageIndex) => (
        <React.Fragment key={pageIndex}>
          {pageData.map((post: any) => (
            <Post key={post.id} post={post} />
          ))}
        </React.Fragment>
      ))}
      <div className="text-center my-4">
        <button 
          className="btn btn-primary" 
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            "Load More"
          )}
        </button>
      </div>
      {!hasNextPage && <div className="text-center my-4">No more posts to load</div>}
    </div>
  );
};

export default Home;
