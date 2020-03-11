// Core
import React, { PureComponent } from 'react';

// UI
import { Player } from '@react-native-community/audio-toolkit';
import Slider from '@react-native-community/slider';

import {
  Animated,
  Platform,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

// Interfaces
import { IAudioTrackProps, IAudioTrackState } from './interfaces';

// Styles
import styles from './AudioTrackStyles';

class AudioTrack extends PureComponent<IAudioTrackProps, IAudioTrackState> {
  private player: Player | null;
  private lastSeek: number;
  private progressInterval: number;
  private isAndroid: boolean;
  private isIOS: boolean;

  constructor(props: IAudioTrackProps) {
    super(props);

    this.state = {
      animation : new Animated.Value(0),
      progress: 0,
      error: null,
      viewState: false,
    };

    this.player = new Player(props.filename);
    this.lastSeek = 0;
    this.progressInterval = 0;
    this.isAndroid = Platform.OS === 'android';
    this.isIOS = Platform.OS === 'ios';

    this.reloadPlayer = this.reloadPlayer.bind(this);
    this.shouldUpdateProgressBar = this.shouldUpdateProgressBar.bind(this);
    this.seek = this.seek.bind(this);
    this.playPause = this.playPause.bind(this);
    this.toggleAnimation = this.toggleAnimation.bind(this);
    this.setIsTrackPlaying = this.setIsTrackPlaying.bind(this);
  }

  public componentDidMount(): void {
    if (this.isAndroid) {
      return;
    }
    this.player = null;
    this.lastSeek = 0;
  }

  public componentDidUpdate(prevProps: IAudioTrackProps): void {
    const { isPlaying } = this.props;

    if (isPlaying !== prevProps.isPlaying) {
      this.playPause();
    }
  }

  public componentWillUnmount(): void {
    clearInterval(this.progressInterval);
  }

  private reloadPlayer(shouldPlay: boolean): void {
    if (this.player) {
      this.player.destroy();
    }

    this.player = new Player(this.props.filename, {
      autoDestroy: false,
    });

    this.player.prepare((err) => {
      if (err) {
        console.log(err);
      }

      if (shouldPlay && this.props.isPlaying) {
        this.player?.play();
      }
    });

    this.progressInterval = setInterval(() => {
      if (this.player && this.shouldUpdateProgressBar()) {
        let currentProgress = Math.max(0, this.player.currentTime) / this.player.duration;
        if (isNaN(currentProgress)) {
          currentProgress = 0;
        }
        this.setState({ progress: currentProgress });
      }
    }, 100);

    this.player?.on('ended', () => {
      this.props.stopPlay();
      this.player?.stop();
    });

    this.player?.on('pause', () => {
      // TODO: add
    });
  }

  private shouldUpdateProgressBar() {
    return Date.now() - this.lastSeek > 200; // Debounce progress bar update by 200 ms
  }

  private seek(percentage: number): void {
    if (!this.player) {
      return;
    }

    this.lastSeek = Date.now();
    this.player.seek(percentage * this.player.duration);
  }

  private playPause(): void {
    if (!this.player) {
      this.reloadPlayer(true);
    }

    this.player?.playPause((err: Error) => {
      if (err) {
        this.setState({ error: err });
      }
    });

    this.toggleAnimation();
  }

  private toggleAnimation(): void {
    const { animation, viewState } = this.state;

    Animated.timing(animation, {
      toValue : viewState ? 0 : 50,
    }).start(() => {
      this.setState(prevState => ({ viewState : !prevState.viewState }));
    });
  }

  private setIsTrackPlaying(): void {
    if (this.props.isPlaying) {
      this.props.stopPlay();
      return;
    }
    this.props.startPlay(this.props.trackID);
  }

  render() {
    const { title } = this.props;
    const { animation, progress } = this.state;

    const animatedStyle = {
      height : animation,
    }

    return (
      <View>
        <TouchableOpacity onPress={this.setIsTrackPlaying} style={{ alignSelf: 'flex-start', marginBottom: 15 }}>
          <Text>{title}</Text>
        </TouchableOpacity>
        {this.isIOS && (
          <Animated.View style={[styles.slider, animatedStyle]}>
            <Slider
              step={0.0001}
              onValueChange={this.seek}
              value={progress}
            />
          </Animated.View>
        )}
      </View>
    );
  }
}

export default AudioTrack;
