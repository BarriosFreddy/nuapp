import {observer} from 'mobx-react-lite';
import React, {
  ComponentType,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {Alert, TextInput, TextStyle, ViewStyle} from 'react-native';
import {
  Button,
  Icon,
  Screen,
  Text,
  TextField,
  TextFieldAccessoryProps,
} from '../components';
import {useStores} from '../models';
import {AppStackScreenProps} from '../navigators';
import {colors, spacing} from '../theme';
import {Button as ButtonRNE} from '@rneui/base';
import {useForm, Controller} from 'react-hook-form';
import {LoginType} from '../shared/types';

interface LoginScreenProps extends AppStackScreenProps<'Login'> {}

const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen({
  navigation,
  route,
}) {
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attemptsCount, setAttemptsCount] = useState(0);
  const {
    authenticationStore: {setAuthToken, validationError, login},
  } = useStores();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      email: 'dev@nuapp.com',
      password: 'fbarrios',
    },
  });

  const error = isSubmitted ? validationError : '';

  useEffect(() => {
    reset();
    return () => {
      reset();
    };
  }, []);

  //INIT

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? 'view' : 'hidden'}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        );
      },
    [isAuthPasswordHidden],
  );

  async function handleLogin(data: LoginType) {
    setIsSubmitted(true);
    setAttemptsCount(attemptsCount + 1);
    const response = await login(data);
    if (response?.status !== 200) Alert.alert('Credenciales incorrectas!');
    setIsSubmitted(false);
  }

  const handleHasNotAccount = () => {
    navigation.navigate('Register');
  };

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={['top', 'bottom']}>
      <Text
        testID="login-heading"
        tx="loginScreen.signIn"
        preset="heading"
        style={$signIn}
      />
      <Text
        tx="loginScreen.enterDetails"
        preset="subheading"
        style={$enterDetails}
      />
      {attemptsCount > 2 && (
        <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />
      )}
      <Controller
        control={control}
        rules={{
          required: {
            message: 'Campo obligatorio',
            value: true,
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextField
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            containerStyle={$textField}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            labelTx="loginScreen.emailFieldLabel"
            placeholder='name@domain.com'
            status={errors.email ? 'error' : undefined}
            helper={
              errors.email?.message ? errors.email?.message : ''
            }
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: {
            message: 'Campo obligatorio',
            value: true,
          },
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextField
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            containerStyle={$textField}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            labelTx="loginScreen.passwordLabel"
            placeholder=''
            status={errors.password ? 'error' : undefined}
            helper={errors.password?.message ? errors.password?.message : ''}
            RightAccessory={PasswordRightAccessory}
            secureTextEntry={isAuthPasswordHidden}
          />
        )}
        name="password"
      />

      <Button
        testID="login-button"
        /* tx='loginScreen.tapToSignIn' */
        text={isSubmitted ? 'INICIANDO...' : 'INICIAR SESIÓN'}
        style={[$tapButton, {backgroundColor: colors.primary}]}
        textStyle={{fontWeight: 'bold'}}
        preset="reversed"
        onPress={handleSubmit(handleLogin)}
        disabled={isSubmitted}
      />
      {/* <ButtonRNE
        title="Quiero registrarme!"
        type="clear"
        onPress={handleHasNotAccount}
      /> */}
    </Screen>
  );
});

export default LoginScreen;

const $screenContentContainer: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
};

const $signIn: TextStyle = {
  marginTop: spacing.sm,
  textAlign: 'center'
};

const $enterDetails: TextStyle = {
  marginTop: spacing.xxl,
  marginBottom: spacing.xxxl,
  textAlign: 'center'
};

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.md,
};

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
};

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
};
