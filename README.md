
![seerbit](https://user-images.githubusercontent.com/74198009/230321289-beb6c9ec-6d29-4d79-84cb-abb0606a23ab.png)
                                                      


 # SeerBit React Native  Checkout
 
SeerBit React Native sdk is used to seamlessly integrate SeerBit payment gateways into React Native applications. It is very simple and easy to integrate. It is a wrapper built around SeerBit checkout on native ios and android.

## Requirements:

- The merchant must have an account with SeerBit or create one on [SeerBit Merchant Dashboard](https://www.dashboard.seerbitapi.com/#/auth/login) to get started.
- Obtain the live public key of the merchant.

## Implementation:

- Add the package to your React native project: 

```
npm install react-native-seerbit
```

or 

```
yarn add react-native-seerbit
```

- Then navigate the ios folder of your project, run 

```
pod install
```

 - If you encounter an error, be sure that flipper is disabled by commenting out the following line in your podfile
 ```
  :flipper_configuration => flipper_config,
 ```
 and be sure that use_frameworks is enabled by adding the following line in your podfile before target
 ```
 use_frameworks! :linkage => :static 
 ```

 If you still encounter an error that states like "Multiple commands produce........./Assets.car", then also add the below code to your podfile, before target. 
 
 ```
 install! 'cocoapods', :disable_input_output_paths => true
 ```
 This should fix all problems.

- After adding the package to your project, import SeerBitCheckout methods into the file you want to use them like so:

```
import { openCheckout, eventEmitter } from 'react-native-seerbit';
```

### Configure deeplink in your project

- Add deeplink configuration to ios part of your project with the following custom uri scheme:

```
seerbitioscheckout
```
- The most straightforward way to add a deeplink is to click on the info tab when you select your project target on Xcode. Click on the URL Types chevron and paste "seerbitioscheckout" on URL Schemes placeholder.

- This sdk works for iOS 16.0 and above. Make sure your project is targeting iOS 16.0 and above. In the case where your project targets ios 15 and below, the sdk will install, but users running ios 15 and below will be prompted to update thier ios version.

- Note that if you already have a url scheme for your project, you still have to create another one with the custom url scheme above.
 
 ## Usage: These parameters must be supplied to the openCheckout method;
 
  ### Required:
  
 - Merchant's live public key // SBTESTPUBK_t4G16GCA1O51AV0Va3PPretaisXubSw1 (This a test public key for test purpose)
 - Amount
 - Customer's full name
 - Customer's email
 - Customer's phone number
 
 ### Optional
 
 - productId // defaults to empty string
 - vendorId //defaults to empty string
 - currency //defaults to merchant's country currency
 - country //defaults to merchant's country
 - pocketReference // used when money is to be moved to pocket
 - transactionPaymentReference //we generate payment reference for each transaction, but if you supply yours, the sdk will use it.
 - tokenize // used only when card is to be tokenized -  defaults to false
 - productDescription //defaults to empty string


 ## Example
 
 
 ```
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { openCheckout, eventEmitter } from 'react-native-seerbit';

interface Props {
    placeholder: string,
    value: string,
    onChangeText: any,
    style?: object,
    rootStyle?: object,
    isForPassword?: boolean,
    keyboardType?: 'default' | 'numeric',
    editable?: boolean,
    placeholderStyle?: string,
    onEnterPressed?: any,
    returnKeyType?: 'next' | 'done',
    disabled?: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
    toFocus?: boolean
}
const CustomInput: React.FC<Props> = ({
    placeholder,
    placeholderStyle,
    value,
    onChangeText = () => { },
    style,
    rootStyle,
    editable = true,
    keyboardType = 'default',
    onEnterPressed = () => { },
    returnKeyType = 'next',
    onBlur = () => { },
    onFocus = () => { },
}) => {
    const [focus, setFocus] = useState<boolean>(false)
    const inputRef = useRef<any>(null)


    return (
        <View
            style={[focus ? styles.root1 : styles.root2, rootStyle]}
        >
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[styles.input, style]}
                onFocus={() => {
                    setFocus(true)
                    onFocus()
                }}
                onBlur={() => {
                    setFocus(false)
                    onBlur()
                }}
                editable={editable}
                placeholderTextColor={placeholderStyle ? placeholderStyle : 'gray'}
                keyboardType={keyboardType}
                returnKeyType={returnKeyType}
                onSubmitEditing={onEnterPressed}
                ref={inputRef}
            />
        </View>
    )
}



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
  },
  input: {
        width: '80%',
        color: '#1E2234',
    },
    root1: {
        width: '90%',
        height: 50,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderWidth: 1.2,
        borderColor: '#F24736',
        flexDirection: 'row',
        alignItems: 'center'
    },
    root2: {
        width: '90%',
        height: 50,
        backgroundColor: '#F5F5F5',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderRadius: 8,
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        alignItems: 'center'
    }
});


 ```

## Properties:

| Property                    | type     | required  | default | Desc                                                                        |
|-----------------------------|----------|-----------|---------|-----------------------------------------------------------------------------|
| currency                    | String   | Optional  | NGN     | The currency for the transaction e.g NGN                                    |
| email                       | String   | Required  | None    | The email of the user to be charged                                         |
| publicKey                   | String   | Required  | None    | Your Public key or see above step to get yours                              |
| amount                      | String   | Required  | None    | The transaction amount                                                      |
| fullName                    | String   | Required  | None    | The fullname of the user to be charged                                      |
| phoneNumber                 | String   | Required  | None    | User phone Number                                                           |
| pocketReference             | String   | Optional  | None    | This is your pocket reference for vendors with pocket                       |
| vendorId                    | String   | Optional  | None    | This is the vendorId of your business using pocket                          |
| tokenize                    | bool     | Optional  | False   | Tokenize card                                                               |
| country                     | String   | Optional  | NG      | Transaction country which can be optional                                   |
| transactionPaymentReference | String   | Optional  | None    | Set a unique transaction reference for every transaction                    |
| productId                   | String   | Optional  | None    | This is the productId which is optional                                     |
| productDescription          | String   | Optional  | None    | The transaction description which is optional                               |

 
 ## Support:
 
 If you encounter any problems, or you have questions or suggestions, create an issue on this repo or send your inquiry to developers@seerbit.com
 

