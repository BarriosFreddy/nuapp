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
import {REGEX_EMAIL} from '../utils/constants';

interface RegisterScreenProps extends AppStackScreenProps<'Register'> {}

const RegisterScreen: FC<RegisterScreenProps> = observer(
  function RegisterScreen({navigation, route}) {
    const authPasswordInput = useRef<TextInput>(null);
    const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const {
      authenticationStore: {validationError, signUp},
    } = useStores();

    const {
      control,
      handleSubmit,
      formState: {errors},
      reset,
    } = useForm({
      defaultValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
      },
    });

    const error = isSubmitted ? validationError : '';

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

    useEffect(() => {
      reset();
      return () => {
        reset();
      };
    }, []);

    // INIT

    const handleHasAccount = () => {
      navigation.navigate('Login');
    };

    const onSubmit = async (data: any) => {
      setIsSubmitted(true);
      const response = await signUp(data);
      if (response?.ok) {
        Alert.alert(
          `Registro exitoso`,
          'Genial, ahora puedes acceder!',
          [
            {
              text: 'OK',
              onPress: () => {
                reset();
                navigation.navigate('Login');
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(`Algo salió mal`);
      }
      setIsSubmitted(false);
    };

    return (
      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={['top', 'bottom']}>
        <Text
          testID="login-heading"
          tx="registerScreen.heading"
          preset="heading"
          style={$signIn}
        />
        <Text
          tx="registerScreen.enterDetails"
          preset="subheading"
          style={$enterDetails}
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
              autoCapitalize="sentences"
              autoCorrect={false}
              keyboardType="default"
              labelTx="registerScreen.firstNameLabel"
              status={errors.firstName ? 'error' : undefined}
              helper={
                errors.firstName?.message ? errors.firstName?.message : ''
              }
            />
          )}
          name="firstName"
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
              autoCapitalize="sentences"
              autoCorrect={false}
              keyboardType="default"
              labelTx="registerScreen.lastNameLabel"
              status={errors.lastName ? 'error' : undefined}
              helper={errors.lastName?.message ? errors.lastName?.message : ''}
            />
          )}
          name="lastName"
        />
        <Controller
          control={control}
          rules={{
            required: {
              message: 'Campo obligatorio',
              value: true,
            },
            minLength: {
              message: 'Diez dígitos',
              value: 10,
            },
            maxLength: {
              message: 'Diez dígitos',
              value: 10,
            },
            pattern: {
              message: 'Solo dígitos',
              value: /^\d+$/,
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
              keyboardType="phone-pad"
              labelTx="registerScreen.phoneNumberLabel"
              placeholder='(3##)#######'
              status={errors.phoneNumber ? 'error' : undefined}
              helper={
                errors.phoneNumber?.message ? errors.phoneNumber?.message : ''
              }
            />
          )}
          name="phoneNumber"
        />
        <Controller
          control={control}
          rules={{
            required: {
              message: 'Campo obligatorio',
              value: true,
            },
            pattern: {
              value: REGEX_EMAIL,
              message: 'El correo electrónico no es válido',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <>
              <TextField
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                containerStyle={$textField}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                labelTx="registerScreen.emailLabel"
                placeholder='####'
                status={errors.email ? 'error' : undefined}
                helper={errors.email?.message ? errors.email?.message : ''}
              />
            </>
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
            minLength: {
              message: 'Cuatro dígitos',
              value: 4,
            },
            maxLength: {
              message: 'Cuatro dígitos',
              value: 4,
            },
            pattern: {
              message: 'Solo dígitos',
              value: /^\d+$/,
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
              labelTx="registerScreen.passwordLabel"
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
          /*           tx="registerScreen.signUpButton" */
          text={isSubmitted ? 'REGISTRANDO...' : 'REGISTRAME!'}
          style={[$tapButton, {backgroundColor: colors.primary}]}
          textStyle={{fontWeight: 'bold'}}
          preset="reversed"
          onPress={handleSubmit(onSubmit)}
        />
        <ButtonRNE
          title="Ya tengo una cuenta!"
          type="clear"
          onPress={handleHasAccount}
        />
      </Screen>
    );
  },
);

export default RegisterScreen;

const $screenContentContainer: ViewStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignContent: 'center',
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
};

const $signIn: TextStyle = {
  marginBottom: spacing.sm,
};

const $enterDetails: TextStyle = {
  marginBottom: spacing.lg,
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
