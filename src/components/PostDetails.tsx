import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingIndicator from './LoadingIndicator';

const PostDetails = ({ post }: { post: any }) => (
  <div>
    <h3 className="mt-4">{post.title}</h3>
    <p>{post.body}</p>
  </div>
);

const renderContent = (isLoading: boolean, post: any) => {
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (post) {
    return <PostDetails post={post} />;
  }
  return <div>No post found</div>;
};

const usePostDetailsQuery = (postId: string) => {
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
     if (postId) {
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
    }
  }, [postId]);

  return { post, isLoading };
};

const PostDetailsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { post, isLoading } = usePostDetailsQuery(postId || '');

  return (
    <div className="container mt-4">
      <h2>Post Details</h2>
      {renderContent(isLoading, post)}
      <button className="btn btn-primary">
        <Link className='text-white' style={{ textDecoration: 'none'}} to="/">Back</Link>
      </button>
    </div>
  );
};

export default PostDetailsPage;