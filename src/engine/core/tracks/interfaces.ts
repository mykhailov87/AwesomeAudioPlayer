export interface ITracksState {
  data: ITracksAlbum[];
  pending: boolean;
}

export interface ITracksResponseData {
  _type: string;
  data: ITracksAlbum[];
}

export interface ITracksAlbum {
  id: string;
  title: string;
  isAvailable: boolean;
  isFree: boolean;
  isFeatured: boolean;
  banner?: IBanner;
  cover: ICover;
  headphones: boolean;
  descriptionHTML?: string;
  tracks: ITracks[];
}

export interface IBanner {
  url: string;
  thumbnail: string;
  resolutions: IResolution<ISize>[];
}

export interface IResolution<T> {
  url: string;
  size: T;
}

export interface ISize {
  height: number;
  width: number;
}

export interface ICover {
  url: string;
  thumbnail: string;
  resolutions: IResolution<number>[];
}

export interface ITracks {
  key: string;
  title: string;
  order: number | null;
  duration: number;
  media: IMedia;
  isAvailable: boolean;
  isPlaying?: boolean;
}

export interface IMedia {
  mp3: IMp3;
}

export interface IMp3 {
  headUrl: string;
  url: string;
}
