// Interfaces
import { ITracksState, ITracksAlbum } from './interfaces';
import { IAction } from '../../../libs/helpers/actionCreator/interfaces';

// Types
import { types } from './types';

const initialState: ITracksState = {
  data: [],
  pending: false,
};

export const tracksReducer = (state = initialState, action: IAction<any>) => {
  const { payload, type } = action;

  switch (type) {
    case types.SET_TRACKS_DATA: {
      return {
        ...state,
        data: payload as ITracksAlbum[],
      };
    }

    case types.SET_IS_TRACKS_DATA_LOADING: {
      return {
        ...state,
        pending: payload as boolean,
      };
    }

    case types.TOGGLE_PLAY_AUDIO_TRACK: {
      const trackID = payload as string;
      return {
        ...state,
        data: state.data.map((playListItem) => ({
          ...playListItem,
          tracks: playListItem.tracks.map(trackItem => ({
            ...trackItem,
            isPlaying: trackItem.key === trackID && !trackItem.isPlaying,
          })),
        })),
      };
    }

    case types.START_PLAY_AUDIO_TRACK: {
      const trackID = payload as string;
      return {
        ...state,
        data: state.data.map((playListItem) => ({
          ...playListItem,
          tracks: playListItem.tracks.map(trackItem => ({
            ...trackItem,
            isPlaying: trackItem.key === trackID,
          })),
        })),
      };
    }

    case types.STOP_PLAY_AUDIO_TRACK: {
      return {
        ...state,
        data: state.data.map((playListItem) => ({
          ...playListItem,
          tracks: playListItem.tracks.map(trackItem => ({
            ...trackItem,
            isPlaying: false,
          })),
        })),
      };
    }

    default: {
      return state;
    }
  }
};
