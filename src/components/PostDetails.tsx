import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PostDetailsPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  // Здесь можно добавить логику загрузки данных поста по его ID и отображение полной информации

  return (
    <div>
      <h2>Post Details</h2>
      {/* Отобразите информацию о посте */}
      <Link to="/">Back</Link>
    </div>
  );
};

export default PostDetailsPage;
