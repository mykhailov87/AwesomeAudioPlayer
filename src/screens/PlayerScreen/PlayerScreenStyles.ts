// Core
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PlayerScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    height: '100%',
    paddingHorizontal: wp('5%'),
  },
  loadingContainer: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
});

export default PlayerScreenStyles;
