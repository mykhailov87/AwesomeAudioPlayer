// Core
import { AppRegistry } from 'react-native';

// Containers
import App from './src/containers/App/App';

// Data
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
