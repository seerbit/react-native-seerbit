import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { openCheckout, eventEmitter } from 'seerbit-react-native-checkout';
import CustomInput from './CustomInput';

export default function App() {

  const [amount, setAmount] = React.useState<string>('20.5')
  const [phoneNumber, setPhoneNumber] = React.useState<string>('08131248253')
  const [publicKey, setPublicKey] = React.useState<string>('SBTESTPUBK_t4G16GCA1O51AV0Va3PPretaisXubSw1')
  const [fullName, setFullName] = React.useState<string>('SeerBit Checkout')
  const [email, setEmail] = React.useState<string>('seerbitcheckout@gmail.com')


  React.useEffect(() => {
    let closeEventListener = eventEmitter.addListener('close', (event) => {
      console.log('user closed', event.eventProperty);
    });
    let successEventListener = eventEmitter.addListener('success', (event) => {
      console.log('user success ', event.eventProperty, ' sopoekm');
    });
    return () => {
      closeEventListener.remove();
      successEventListener.remove();
    };
  }, []);

  const open = () => {
    openCheckout({
      amount: amount,
      phoneNumber: phoneNumber,
      publicKey: publicKey,
      fullName: fullName,
      email: email,
      productDescription: 'productDescription',
      pocketReference: 'pocketReference',
      transactionPaymentReference: '',
      vendorId: 'vendorId',
      country: 'NG',
      currency: 'NGN',
      tokenize: false,
      productId: 'productId',
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CustomInput
          value={amount}
          onChangeText={(val: string) => setAmount(val)}
          placeholder='Amount'
          rootStyle={{ marginBottom: 15 }}
          keyboardType={'numeric'}
        />
        <CustomInput
          value={phoneNumber}
          onChangeText={(val: string) => setPhoneNumber(val)}
          placeholder='Phone number'
          rootStyle={{ marginBottom: 15 }}
          keyboardType={'numeric'}
        />
        <CustomInput
          value={publicKey}
          onChangeText={(val: string) => setPublicKey(val)}
          placeholder='Public key'
          rootStyle={{ marginBottom: 15 }}
        />
        <CustomInput
          value={fullName}
          onChangeText={(val: string) => setFullName(val)}
          placeholder='Full name'
          rootStyle={{ marginBottom: 15 }}
        />
        <CustomInput
          value={email}
          onChangeText={(val: string) => setEmail(val)}
          placeholder='Email'
          rootStyle={{ marginBottom: 15 }}
        />

        <TouchableOpacity
          onPress={open}
          style={styles.btn}>
          <Text style={{ color: 'white' }}>Open Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  btn: {
    width: '90%',
    height: 40,
    borderRadius: 5,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  }
});
