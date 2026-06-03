import { useState } from 'react';
import { Drawer, Box, Typography, Avatar, TextField, IconButton, Divider, List, ListItem, ListItemAvatar, ListItemText, CircularProgress } from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CommentDrawer = ({ open, onClose, post, onCommentAdded }) => {
  const { user } = useAuth();
  const [text,    setText]    = useState('');
  const [loading, setLoading] = useState(false);

  const handleComment = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const { data } = await api.post(`/posts/${post._id}/comment`, { text });
      onCommentAdded(post._id, data.comment);
      setText('');
      toast.success('Comment added!');
    } catch {
      toast.error('Failed to comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer anchor="bottom" open={open} onClose={onClose}
      PaperProps={{ sx: { borderRadius: '20px 20px 0 0', background: '#13131A', maxHeight: '75vh' } }}>

      <Box px={3} pt={2} pb={1} display="flex" justifyContent="space-between" alignItems="center">
        <Typography fontWeight={700}>Comments ({post?.comments?.length || 0})</Typography>
        <IconButton size="small" onClick={onClose}><Close /></IconButton>
      </Box>
      <Divider sx={{ borderColor: 'rgba(108,99,255,0.15)' }} />

      <List sx={{ flex: 1, overflowY: 'auto', px: 2 }}>
        {post?.comments?.length === 0 && (
          <Typography color="text.secondary" textAlign="center" py={4} fontSize={14}>No comments yet. Be the first!</Typography>
        )}
        {post?.comments?.map((c, i) => (
          <ListItem key={i} alignItems="flex-start" sx={{ px: 0 }}>
            <ListItemAvatar>
              <Avatar src={c.avatar} sx={{ width: 34, height: 34, bgcolor: 'secondary.main', fontSize: 13 }}>
                {c.username?.[0]?.toUpperCase()}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="body2" fontWeight={700}>{c.username}</Typography>}
              secondary={<Typography variant="body2" color="text.primary" sx={{ mt: 0.3 }}>{c.text}</Typography>}
            />
          </ListItem>
        ))}
      </List>

      {user && (
        <Box px={2} py={2} display="flex" gap={1.5} alignItems="center" sx={{ borderTop: '1px solid rgba(108,99,255,0.15)' }}>
          <Avatar src={user.avatar} sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 13 }}>
            {user.username?.[0]?.toUpperCase()}
          </Avatar>
          <TextField fullWidth size="small" placeholder="Write a comment..." value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleComment()}
          />
          <IconButton onClick={handleComment} disabled={loading || !text.trim()}
            sx={{ bgcolor: 'primary.main', color: '#fff', '&:hover': { bgcolor: '#5a52d5' }, '&:disabled': { bgcolor: 'rgba(108,99,255,0.3)' } }}>
            {loading ? <CircularProgress size={18} color="inherit" /> : <Send fontSize="small" />}
          </IconButton>
        </Box>
      )}
    </Drawer>
  );
};

export default CommentDrawer;