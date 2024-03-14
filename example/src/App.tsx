import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { openCheckout, eventEmitter } from 'seerbit-react-native-checkout';

export default function App() {
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
      amount: '100.29',
      phoneNumber: '08131248253',
      publicKey: 'SBPUBK_SCAD2TXCTYVZOORZEGXR17OTLECBGUAI', //"SBTESTPUBK_t4G16GCA1O51AV0Va3PPretaisXubSw1"
      fullName: 'fullName miracle',
      email: 'reactbridge@gmail.com',
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
    <View style={styles.container}>
      <Text onPress={open}>Open sdk</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
