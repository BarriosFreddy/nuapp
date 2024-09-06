const es = {
  common: {
    ok: 'OK!',
    cancel: 'Cancelar',
    back: 'Back',
    logOut: 'Log Out',
  },
  requests: {
    loadingText: 'Cargando solicitudes de viajes',
    details: {
      title: 'Solciitud de viaje',
      offerYourFare: 'Oferta tu tarifa',
    },
  },
  errorScreen: {
    title: 'Something went wrong!',
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: 'RESET APP',
    traceTitle: 'Error from %{name} stack',
  },
  emptyStateComponent: {
    generic: {
      heading: 'So empty... so sad',
      content:
        'No data found yet. Try clicking the button to refresh or reload the app.',
      button: "Let's try this again",
    },
  },
  errors: {
    invalidEmail: 'Invalid email address.',
  },
  loginScreen: {
    signIn: 'Inicio de sesión',
    enterDetails:
      'Ingresa tu número de célular y clave para comenzar a tener la mejor experiencia en tu viaje',
    phoneNumberPlaceholder: 'Ingresa tu número de teléfono',
    tapToSignIn: 'INICIAR SESIÓN!',
    signInLoading: 'INICIANDO...',
    hint: 'Hint: you can use any email address and your favorite password :)',
    phoneNumberLabel: 'Número de teléfono',
    emailFieldLabel: 'Correo electrónico',
    passwordLabel: 'Clave',
  },
  registerScreen: {
    heading: 'Crear cuenta Teik',
    enterDetails:
      'Diligencia el siguiente formulario para hacer parte de esta gran comunidad',
    firstNameLabel: 'Nombre',
    lastNameLabel: 'Apellidos',
    phoneNumberLabel: 'Número de célular',
    emailLabel: 'Correo electrónico',
    passwordLabel: 'Clave de acceso (4 dígitos)',
    signUpButton: 'REGISTRAME!',
  },
  updateDriverScreen: {
    heading: 'Haz parte de esta gran comunidad de conductores',
    subheading: 'Registrate ya!',
    dniLabel: 'Cédula de ciudadanía'
  },
  demoNavigator: {
    componentsTab: 'Components',
    debugTab: 'Debug',
    communityTab: 'Community',
    podcastListTab: 'Podcast',
  },
  demoCommunityScreen: {
    title: 'Connect with the community',
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: 'Join us on Slack',
    joinUsOnSlack:
      'Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.',
    joinSlackLink: 'Join the Slack Community',
    makeIgniteEvenBetterTitle: 'Make Ignite even better',
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: 'Contribute to Ignite',
    theLatestInReactNativeTitle: 'The latest in React Native',
    theLatestInReactNative:
      "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: 'React Native Radio',
    reactNativeNewsletterLink: 'React Native Newsletter',
    reactNativeLiveLink: 'React Native Live',
    chainReactConferenceLink: 'Chain React Conference',
    hireUsTitle: 'Hire Infinite Red for your next project',
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: 'Send us a message',
  },
  demoShowroomScreen: {
    jumpStart: 'Components to jump start your project!',
    lorem2Sentences:
      'Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.',
    demoHeaderTxExample: 'Yay',
    demoViaTxProp: 'Via `tx` Prop',
    demoViaSpecifiedTxProp: 'Via `{{prop}}Tx` Prop',
  },
  demoDebugScreen: {
    howTo: 'HOW TO',
    title: 'Debug',
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: 'Send to Reactotron',
    reportBugs: 'Report Bugs',
    demoList: 'Demo List',
    demoPodcastList: 'Demo Podcast List',
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: 'React Native Radio episodes',
    onlyFavorites: 'Only Show Favorites',
    favoriteButton: 'Favorite',
    unfavoriteButton: 'Unfavorite',
    accessibility: {
      cardHint:
        'Double tap to listen to the episode. Double tap and hold to {{action}} this episode.',
      switch: 'Switch on to only show favorites',
      favoriteAction: 'Toggle Favorite',
      favoriteIcon: 'Episode not favorited',
      unfavoriteIcon: 'Episode favorited',
      publishLabel: 'Published {{date}}',
      durationLabel:
        'Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds',
    },
    noFavoritesEmptyState: {
      heading: 'This looks a bit empty',
      content:
        'No favorites have been added yet. Tap the heart on an episode to add it to your favorites!',
    },
  },
};

export default es;
export type Translations = typeof es;
