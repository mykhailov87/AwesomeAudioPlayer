// Core
import React from 'react';
import { Provider } from 'react-redux';

// Screens
import PlayerScreen from '../../screens/PlayerScreen/PlayerScreen';

// Store
import { store } from '../../engine/init/store';

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <PlayerScreen />
    </Provider>
  );
};

export default App;
