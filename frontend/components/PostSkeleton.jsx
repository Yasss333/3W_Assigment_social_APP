import { Card, CardContent, CardHeader, Skeleton, Box } from '@mui/material';

const PostSkeleton = () => (
  <Card sx={{ mb: 2 }}>
    <CardHeader
      avatar={<Skeleton variant="circular" width={44} height={44} />}
      title={<Skeleton width="30%" />}
      subheader={<Skeleton width="20%" />}
    />
    <CardContent>
      <Skeleton variant="text" />
      <Skeleton variant="text" width="80%" />
      <Box mt={1}>
        <Skeleton variant="rounded" height={220} sx={{ borderRadius: 3 }} />
      </Box>
    </CardContent>
  </Card>
);

export default PostSkeleton;