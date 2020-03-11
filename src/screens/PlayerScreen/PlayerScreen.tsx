// Core
import React, { useEffect, useCallback } from 'react';

// UI
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ListRenderItem,
  Text,
  View,
} from 'react-native';

// Components
import AudioTrack from '../../components/AudioTrack/AudioTrack';

// Hooks
import { useTracks } from './hooks/useTracks';

// Interfaces
import { ITracksAlbum } from '../../engine/core/tracks/interfaces';

// Styles
import styles from './PlayerScreenStyles';

const PlayerScreen: React.FC<{}> = () => {
  const {
    getTracksAsync,
    startPlayAudioTrack,
    stopPlayAudioTrack,
    tracks,
    togglePlayAudioTrack,
    isLoading,
  } = useTracks();

  const getTrackId = useCallback((item: ITracksAlbum) => item.id, []);

  const renderTrackItem = useCallback(({ item }) => {
    const { cover, id, title, tracks } = item as ITracksAlbum;

    return (
      <View key={id}>
        <View style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Image
            source={{ uri: cover.url }}
            style={{ backgroundColor: '#fff', height: 75, marginVertical: 25, width: 75 }}
          />
          <Text style={{ marginHorizontal: 10 }}>{title}</Text>
        </View>
        {tracks.map((trackItem) => {
          const url = trackItem?.media?.mp3?.url;
          const isPlaying = !!trackItem.isPlaying;

          return (
            <AudioTrack
              key={trackItem.key}
              filename={url}
              title={trackItem.title}
              isPlaying={isPlaying}
              togglePlay={togglePlayAudioTrack}
              startPlay={startPlayAudioTrack}
              stopPlay={stopPlayAudioTrack}
              trackID={trackItem.key}
            />
          );
        })}
      </View>
    );
  }, []);

  useEffect(() => {
    getTracksAsync();
  }, [getTracksAsync]);

  if (isLoading) {
    return (
      <SafeAreaView>
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={tracks}
          renderItem={renderTrackItem}
          keyExtractor={getTrackId}
        />
      </View>
    </SafeAreaView>
  );
};

export default PlayerScreen;
