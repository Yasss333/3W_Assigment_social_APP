import { useState } from 'react';
import { Card, CardContent, Box, Avatar, TextField, Button, IconButton, Typography, LinearProgress, Chip } from '@mui/material';
import { Image, Close, Send } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [text,     setText]     = useState('');
  const [image,    setImage]    = useState(null);
  const [preview,  setPreview]  = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => { setImage(null); setPreview(''); };

  const handleSubmit = async () => {
    if (!text.trim() && !image) return toast.error('Add text or an image');
    setLoading(true);
    try {
      console.log("Submitting post with text:", text.substring(0, 20));
      
      // For now, send as JSON - no multipart
      const { data } = await api.post('/posts', { 
        text: text.trim(),
        image: image ? image.name : ""  // Just send filename, no actual image yet
      });
      
      console.log("Response:", data);
      onPostCreated(data.post);
      setText(''); 
      removeImage();
      toast.success('Posted!');
    } catch (err) {
      console.error("Post error:", err);
      toast.error(err.response?.data?.message || 'Failed to post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      {loading && <LinearProgress sx={{ borderRadius: '16px 16px 0 0' }} />}
      <CardContent>
        <Box display="flex" gap={2}>
          <Avatar src={user?.avatar} sx={{ bgcolor: 'primary.main', border: '2px solid #6C63FF', mt: 0.5 }}>
            {user?.username?.[0]?.toUpperCase()}
          </Avatar>
          <Box flex={1}>
            <TextField
              fullWidth multiline minRows={2} maxRows={6}
              placeholder="What's on your mind?"
              value={text} onChange={e => setText(e.target.value)}
              variant="outlined" size="small"
              sx={{ mb: preview ? 1.5 : 0 }}
            />

            {preview && (
              <Box position="relative" display="inline-block" mb={1.5}>
                <img src={preview} alt="preview" style={{ maxHeight: 220, borderRadius: 12, display: 'block', maxWidth: '100%' }} />
                <IconButton size="small" onClick={removeImage}
                  sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(0,0,0,0.6)', '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' } }}>
                  <Close fontSize="small" />
                </IconButton>
              </Box>
            )}

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={1.5}>
              <Box display="flex" gap={1} alignItems="center">
                <IconButton component="label" size="small" sx={{ color: 'primary.main', bgcolor: 'rgba(108,99,255,0.1)', '&:hover': { bgcolor: 'rgba(108,99,255,0.2)' } }}>
                  <Image fontSize="small" />
                  <input type="file" hidden accept="image/*" onChange={handleImage} />
                </IconButton>
                {image && <Chip label={image.name} size="small" onDelete={removeImage} sx={{ maxWidth: 160 }} />}
              </Box>
              <Button variant="contained" endIcon={<Send />} onClick={handleSubmit} disabled={loading || (!text.trim() && !image)} size="small">
                Post
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreatePost;