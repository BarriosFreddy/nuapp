const es = {
  common: {
    ok: 'OK!',
    cancel: 'Cancelar',
    back: 'Back',
    logOut: 'Log Out',
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
  itemsScreen: {
    codeLabel: 'Código',
    nameLabel: "Nombre",
    descriptionLabel: 'Descripción',
    pricing: {
      measurementUnitLabel: 'U. de medida',
      priceLabel: 'Precio',
      costPerUnitLabel: 'Costo por unidad',
      totalCostLabel: 'Costo total',
      costLabel: 'Costo',
      quantityLabel: 'Cantidad',
      multipleLabel: 'Multiplo',
      buttonLabel: 'Agregar relación'
    },
    stock: {
      lotUnitsLabel: 'Stock',
      lotLabel: 'Lote',
      expirationDateLabel: 'Fecha de vencimiento',
    },
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
