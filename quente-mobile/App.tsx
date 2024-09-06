import React from 'react';
import { ViewStyle } from 'react-native';
import 'react-native-gesture-handler';
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { AppNavigator } from './src/navigators/AppNavigator';
import { useNavigationPersistence } from './src/navigators';
import * as storage from "./src/utils/storage"
import { ErrorBoundary } from './src/screens/ErrorScreen/ErrorBoundary';
import Config from './src/config';
import { useInitialRootStore } from "./src/models"
import Toast from 'react-native-toast-message';

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"


/* if (__DEV__) {
  // Load Reactotron configuration in development. We don't want to
  // include this in our production bundle, so we are using `if (__DEV__)`
  // to only execute this in development.
  require("./src/devtools/ReactotronConfig.ts")
} */

interface AppProps {
  hideSplashScreen: () => Promise<boolean>
}

function App(props: AppProps) {
  //const { hideSplashScreen } = props
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const { rehydrated } = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.
  
    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    //setTimeout(hideSplashScreen, 500)
  })

  if (!rehydrated || !isNavigationStateRestored) return null
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <ErrorBoundary catchErrors={Config.catchErrors}>
        <GestureHandlerRootView style={$container}>
          <AppNavigator
            initialState={initialNavigationState}
            onStateChange={onNavigationStateChange} 
            />
            <Toast />
        </GestureHandlerRootView>
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}

export default App;

const $container: ViewStyle = {
  flex: 1,
}

