import { useState } from 'react';
import { Card, CardContent, CardHeader, CardActions, CardMedia, Avatar, IconButton, Typography, Box, Chip, Tooltip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ModeCommentOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import CommentDrawer from './CommentDrawer';

const PostCard = ({ post, onUpdate }) => {
  const { user } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  const liked = user ? post.likes?.includes(user.id) : false;

  const handleLike = async () => {
    if (!user) return;
    setLikeLoading(true);
    try {
      const { data } = await api.put(`/posts/${post._id}/like`);
      onUpdate(post._id, p => ({
        ...p,
        likes: data.liked
          ? [...(p.likes || []), user.id]
          : (p.likes || []).filter(id => id !== user.id),
      }));
    } finally {
      setLikeLoading(false);
    }
  };

  const handleCommentAdded = (postId, comment) => {
    onUpdate(postId, p => ({ ...p, comments: [...(p.comments || []), comment] }));
  };

  return (
    <>
      <Card sx={{ mb: 2.5 }}>
        <CardHeader
          avatar={
            <Avatar src={post.author?.avatar}
              sx={{ bgcolor: 'primary.main', border: '2px solid rgba(108,99,255,0.4)', fontWeight: 700 }}>
              {post.author?.username?.[0]?.toUpperCase()}
            </Avatar>
          }
          action={<IconButton size="small" sx={{ color: 'text.secondary' }}><MoreHorizIcon /></IconButton>}
          title={<Typography variant="body1" fontWeight={700}>{post.author?.username}</Typography>}
          subheader={
            <Typography variant="caption" color="text.secondary">
              {post.createdAt ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true }) : ''}
            </Typography>
          }
        />

        {post.text && (
          <CardContent sx={{ pt: 0, pb: post.imageUrl ? 1 : 0 }}>
            <Typography variant="body2" sx={{ lineHeight: 1.7, color: 'text.primary' }}>{post.text}</Typography>
          </CardContent>
        )}

        {post.imageUrl && (
          <CardMedia component="img" image={post.imageUrl} alt="post"
            sx={{ maxHeight: 400, objectFit: 'cover', borderTop: '1px solid rgba(108,99,255,0.1)', borderBottom: '1px solid rgba(108,99,255,0.1)' }} />
        )}

        <CardActions sx={{ px: 2, justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Tooltip title={liked ? 'Unlike' : 'Like'}>
              <span>
                <IconButton size="small" onClick={handleLike} disabled={likeLoading || !user}
                  sx={{ color: liked ? 'secondary.main' : 'text.secondary', transition: 'transform 0.15s', '&:active': { transform: 'scale(1.3)' } }}>
                  {liked ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
                </IconButton>
              </span>
            </Tooltip>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>{post.likes?.length || 0}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.5}>
            <IconButton size="small" onClick={() => setDrawerOpen(true)} sx={{ color: 'text.secondary' }}>
              <ChatBubbleOutlineIcon fontSize="small" />
            </IconButton>
            <Typography variant="body2" color="text.secondary" fontWeight={600}>{post.comments?.length || 0}</Typography>
          </Box>

          <Chip label={`@${post.author?.username}`} size="small"
            sx={{ bgcolor: 'rgba(108,99,255,0.1)', color: 'primary.main', fontSize: 11, height: 22 }} />
        </CardActions>
      </Card>

      <CommentDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}
        post={post} onCommentAdded={handleCommentAdded} />
    </>
  );
};

export default PostCard;