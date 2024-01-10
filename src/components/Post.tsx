import React from 'react';
import { Link } from 'react-router-dom';

interface PostProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
}

const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.id}. {post.title}</h5>
            <p className="card-text">{post.body.length > 100 ? `${post.body.slice(0, 100)}...` : post.body}</p>
            <button className="btn btn-primary">
                <Link className='text-white' style={{ textDecoration: 'none'}} to={`/post/${post.id}`}>View</Link>
            </button>
          </div>
        </div>
      );
};

export default Post;
