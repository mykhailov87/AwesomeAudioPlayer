// Core
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Engine
import { actions } from '../../../engine/core/tracks/actions';
import { asyncActions } from '../../../engine/core/tracks/saga/asyncActions';
import { tracksSelector, isTracksLoadingSelector } from '../../../engine//core/tracks/selectors';

// Interfaces
import { ITracksAlbum } from '../../../engine/core/tracks/interfaces';

export function useTracks() {
  const tracks: ITracksAlbum[] = useSelector(tracksSelector);
  const isLoading: boolean = useSelector(isTracksLoadingSelector);
  const dispatch = useDispatch();

  const togglePlayAudioTrack = useCallback((trackId: string) => {
    dispatch(actions.togglePlayAudioTrack(trackId));
  }, [dispatch]);

  const stopPlayAudioTrack = useCallback(() => {
    dispatch(actions.stopPlayAudioTrack());
  }, [dispatch]);

  const startPlayAudioTrack = useCallback((trackId: string) => {
    dispatch(actions.startPlayAudioTrack(trackId));
  }, [dispatch]);

  const getTracksAsync = useCallback(() => {
    dispatch(asyncActions.getTracksAsync());
  }, [dispatch]);

  return {
    getTracksAsync,
    startPlayAudioTrack,
    stopPlayAudioTrack,
    togglePlayAudioTrack,
    tracks,
    isLoading,
  };
}
