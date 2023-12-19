// Файл IndexedDBService.ts

import { Comment, NewComment } from '@/interfaces';

const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('CommentsDatabase', 1);

    request.onerror = (event) => {
      reject('Error opening database');
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;

      if (!db.objectStoreNames.contains('comments')) {
        const objectStore = db.createObjectStore('comments', { autoIncrement: true });
        objectStore.createIndex('movieId', 'movieId', { unique: false });
      }
    };
  });
};

const addCommentToIndexedDB = async (newComment: NewComment): Promise<Comment> => {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(['comments'], 'readwrite');
      const objectStore = transaction.objectStore('comments');
  
      const commentToAdd: Partial<Comment> = {
        username: newComment.username,
        text: newComment.text,
        movieId: newComment.movieId,
      };
  
      const request = objectStore.add(commentToAdd);
  
      return new Promise<Comment>((resolve, reject) => {
        request.onsuccess = (event) => {
          const commentId = (event.target as IDBRequest).result as number;
          // Добавляем id в объект комментария перед разрешением промиса
          resolve({ ...commentToAdd, id: commentId } as Comment);
        };
  
        request.onerror = (event) => {
          reject('Error adding comment to IndexedDB');
        };
      });
    } catch (error) {
      console.error('Error adding comment to IndexedDB:', error);
      throw error;
    }
  };

const getCommentsByMovieIdFromIndexedDB = async (movieId: number): Promise<Comment[]> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(['comments'], 'readonly');
    const objectStore = transaction.objectStore('comments');
    const index = objectStore.index('movieId');
    const range = IDBKeyRange.only(movieId);
    const request = index.openCursor(range);

    const comments: Comment[] = [];

    return new Promise<Comment[]>((resolve) => {
      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result as IDBCursorWithValue;
        if (cursor) {
          comments.push(cursor.value);
          cursor.continue();
        } else {
          resolve(comments);
        }
      };
    });
  } catch (error) {
    console.error('Error getting comments by movieId from IndexedDB:', error);
    throw error;
  }
};

const deleteCommentFromIndexedDB = async (commentId: number): Promise<void> => {
  try {
    const db = await openDatabase();
    const transaction = db.transaction(['comments'], 'readwrite');
    const objectStore = transaction.objectStore('comments');
    objectStore.delete(commentId);

    return new Promise<void>((resolve) => {
      transaction.oncomplete = () => {
        resolve();
      };
    });
  } catch (error) {
    console.error('Error deleting comment from IndexedDB:', error);
    throw error;
  }
};

export { addCommentToIndexedDB, getCommentsByMovieIdFromIndexedDB, deleteCommentFromIndexedDB };
