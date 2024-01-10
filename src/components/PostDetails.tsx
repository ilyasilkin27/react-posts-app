import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const LoadingIndicator = () => (
  <div className='container mt-4 mb-4'>
    <div className="mt-4 mb-4 d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  </div>
);

const PostDetails = ({ post }: { post: any }) => (
  <div>
    <h3 className="mt-4">{post.title}</h3>
    <p>{post.body}</p>
  </div>
);

const PostDetailsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          throw new Error('Failed to fetch post data');
        }
      } catch (error: any) {
        console.error('Error fetching post data:', error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [postId]);

  return (
    <div className="container mt-4">
      <h2>Post Details</h2>
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <React.Fragment>
          {post ? <PostDetails post={post} /> : <div>No post found</div>}
          <button className="btn btn-primary">
            <Link className='text-white' style={{ textDecoration: 'none'}} to="/">Back</Link>
          </button>
        </React.Fragment>
      )}
    </div>
  );
};

export default PostDetailsPage;