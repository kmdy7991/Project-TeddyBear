export interface VideoThumbnail {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface PreviewVideoProps {
  video: VideoThumbnail;
}
