// Helpers
import { actionCreator } from '../../../libs/helpers/actionCreator';

// Interfaces
import { ITracksAlbum } from './interfaces';

// Types
import { types } from './types';

export const actions = Object.freeze({
  togglePlayAudioTrack(id: string) {
    return actionCreator(types.TOGGLE_PLAY_AUDIO_TRACK, id);
  },
  stopPlayAudioTrack() {
    return actionCreator(types.STOP_PLAY_AUDIO_TRACK);
  },
  startPlayAudioTrack(id: string) {
    return actionCreator(types.START_PLAY_AUDIO_TRACK, id);
  },
  setTracksData(data: ITracksAlbum[]) {
    return actionCreator(types.SET_TRACKS_DATA, data);
  },
  setIsTracksDataLoading(isLoading: boolean) {
    return actionCreator(types.SET_IS_TRACKS_DATA_LOADING, isLoading);
  },
});
