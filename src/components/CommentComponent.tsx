// CommentComponent.tsx

import React, { useState, useEffect } from 'react';
import {
  addCommentToIndexedDB,
  getCommentsByMovieIdFromIndexedDB,
  deleteCommentFromIndexedDB,
} from '@/pages/api/IndexedDBService';
import { Comment, NewComment } from '@/interfaces';

interface CommentComponentProps {
  movieId: number;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ movieId }) => {
  const [username, setUsername] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const loadComments = async () => {
    try {
      const result = await getCommentsByMovieIdFromIndexedDB(movieId);
      setComments(result);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [movieId]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newComment: NewComment = { username, text: commentText, movieId: movieId || 0 };

    try {
      const savedComment = await addCommentToIndexedDB(newComment);
      setComments([...comments, savedComment]);
      setUsername('');
      setCommentText('');
    } catch (error) {
      console.error('Error saving comment:', error);
    }
  };

  const handleCommentDelete = async (id: number) => {
    try {
      await deleteCommentFromIndexedDB(id);
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div className='md:m-auto mb-4 ml-2'>
      <h2 className='font-semibold italic border-b border-gray-700'>Comments</h2>
      {comments.length>0?(
      <ul>
        {comments.map((comment) => (
          <li className='pt-4 border-b border-gray-700' key={comment.id}>
            <strong>{comment.username} say:</strong> {comment.text}
            <button className='flex items-end font-regular italic' onClick={() => handleCommentDelete(comment.id)}>Delete</button>
          </li>
        ))}
      </ul>):(
        <h2 className='font-semibold italic'>There no comments... You can be first!</h2>
      )}
      <form className='pt-4' onSubmit={handleCommentSubmit}>
        <div>
          <label className='font-semibold italic'>
            Your name:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='bg-gray-300 w-80 lg:mx-16 pr-10'
            />
          </label>
        </div>
        <div className='pt-4'>
          <label className='font-semibold italic'>
            Your comment:
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className='pl-2 pr-10 lg:mx-10 w-80 h-20 bg-gray-300'
            />
          </label>
        </div>
        <button className='lg:mx-40 bg-gray-200 rounded p-1' type="submit">Add comment!</button>
      </form>
    </div>
  );
};

export default CommentComponent;
