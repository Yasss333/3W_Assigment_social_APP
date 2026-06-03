import { Box, Container, Typography, Button, Divider } from '@mui/material';
import { AutoAwesome } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import usePosts from '../hooks/usePosts';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import PostSkeleton from '../components/PostSkeleton';

const Feed = () => {
  const { user } = useAuth();
  const { posts, loading, hasMore, loadMore, addPost, updatePost } = usePosts();

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      {user && <CreatePost onPostCreated={addPost} />}

      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <AutoAwesome sx={{ color: 'primary.main', fontSize: 18 }} />
        <Typography variant="body2" fontWeight={700} color="text.secondary" letterSpacing={1} textTransform="uppercase">
          Live Feed
        </Typography>
      </Box>

      {loading && posts.length === 0
        ? Array.from({ length: 4 }).map((_, i) => <PostSkeleton key={i} />)
        : posts.map(post => <PostCard key={post._id} post={post} onUpdate={updatePost} />)
      }

      {!loading && posts.length === 0 && (
        <Box textAlign="center" py={8}>
          <Typography fontSize={40}>✨</Typography>
          <Typography color="text.secondary" mt={1}>No posts yet. Be the first!</Typography>
        </Box>
      )}

      {hasMore && (
        <Box textAlign="center" mt={2}>
          <Button variant="outlined" onClick={loadMore} disabled={loading} sx={{ borderColor: 'rgba(108,99,255,0.4)' }}>
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Feed;