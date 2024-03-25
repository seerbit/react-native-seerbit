import {
  NativeModules,
  Platform,
  NativeEventEmitter,
  Alert,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-seerbit' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const throwableError = () => {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );
};

const SeerbitCheckoutForIos = NativeModules.SeerbitReactNativeCheckout
  ? NativeModules.SeerbitReactNativeCheckout
  : throwableError();
const SeerbitCheckoutForAndroid = NativeModules.SeerbitCheckout
  ? NativeModules.SeerbitCheckout
  : throwableError();

export const eventEmitter = new NativeEventEmitter(
  Platform.OS === 'android' ? SeerbitCheckoutForAndroid : SeerbitCheckoutForIos
);

type CheckoutData = {
  amount: string;
  phoneNumber: string;
  publicKey: string;
  fullName: string;
  email: string;
  productDescription?: string;
  pocketReference?: string;
  transactionPaymentReference?: string;
  vendorId?: string;
  country?: string;
  currency?: string;
  tokenize?: boolean;
  productId?: string;
};

export async function openCheckout({
  amount,
  phoneNumber,
  publicKey,
  fullName,
  email,
  productDescription = '',
  pocketReference = '',
  transactionPaymentReference = '',
  vendorId = '',
  country = '',
  currency = '',
  tokenize = false,
  productId = '',
}: CheckoutData) {
  if (Platform.OS === 'ios' && Number(Platform.Version) < 16)
    return Alert.alert(
      'This gateway works on ios 16 and later. You may need to upgrade your ios version.'
    );

  return Platform.OS === 'android'
    ? SeerbitCheckoutForAndroid.open(
        amount,
        phoneNumber,
        publicKey,
        fullName,
        email,
        productDescription,
        pocketReference,
        transactionPaymentReference,
        vendorId,
        country,
        currency,
        tokenize,
        productId
      )
    : await SeerbitCheckoutForIos.open(
        amount,
        phoneNumber,
        publicKey,
        fullName,
        email,
        productDescription,
        pocketReference,
        transactionPaymentReference,
        vendorId,
        country,
        currency,
        tokenize,
        productId
      );
}
