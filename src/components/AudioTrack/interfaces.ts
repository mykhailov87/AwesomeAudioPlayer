// Core
import { Animated } from 'react-native';

export interface IAudioTrackProps {
  filename: string;
  title: string;
  isPlaying: boolean;
  startPlay: (trackID: string) => void;
  stopPlay: () => void;
  togglePlay: (trackID: string) => void;
  trackID: string;
}

export interface IAudioTrackState {
  animation: Animated.Value;
  error: null | Error;
  progress: number;
  viewState: boolean;
}
