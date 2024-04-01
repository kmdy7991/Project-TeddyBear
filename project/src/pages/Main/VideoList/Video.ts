export interface VideoResultProps {
  id: number;
  videoTitle?: string;
  videoDiscription?: string | undefined;
  videoUrl?: string;
  videoId?: string;
  videoTime?: string;
  videoThumbnail?: string;
  videoGrade?: string;
}

export interface PreviewVideoProps {
  video: VideoResultProps;
  hoverIndex: number;
}
