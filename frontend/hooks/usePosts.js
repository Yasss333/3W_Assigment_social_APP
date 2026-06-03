import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

const usePosts = () => {
  const [posts,   setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [page,    setPage]    = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async (pageNum = 1) => {
    try {
      setLoading(true);
      const { data } = await api.get(`/posts?page=${pageNum}&limit=10`);
      setPosts(prev => pageNum === 1 ? data.posts : [...prev, ...data.posts]);
      setHasMore(pageNum < data.pages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(1); }, [fetchPosts]);

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchPosts(next);
  };

  const addPost = (post) => setPosts(prev => [post, ...prev]);

  const updatePost = (id, updater) =>
    setPosts(prev => prev.map(p => p._id === id ? updater(p) : p));

  return { posts, loading, hasMore, loadMore, addPost, updatePost };
};

export default usePosts;