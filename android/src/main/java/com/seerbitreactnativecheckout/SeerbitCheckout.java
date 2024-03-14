package com.seerbitreactnativecheckout;
import static com.example.seerbitsdk.SeerBitActivityKt.startSeerBitSDK;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.example.seerbitsdk.interfaces.ActionListener;
import com.example.seerbitsdk.models.query.QueryData;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Objects;

import com.facebook.react.modules.core.DeviceEventManagerModule;



public class SeerbitCheckout extends ReactContextBaseJavaModule implements ActionListener {
    SeerbitCheckout(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() { return "SeerbitCheckout"; }

    @ReactMethod
    private void sendSuccessEvent(ReactContext reactContext, String eventName, @Nullable QueryData queryData) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, queryData);
}

    @ReactMethod
    private void sendCloseEvent(ReactContext reactContext, String eventName) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, null);
    }

@ReactMethod
public void removeListeners(Integer count) {}

    @ReactMethod
    public void open(
        String amount, 
        String phoneNumber, 
        String publicKey, 
        String fullName, 
        String email, 
        String productDescription, 
        String pocketReference, 
         String transactionPaymentReference ,
         String vendorId,
        String country,
        String currency,
        Boolean tokenize,
        String productId
         ) {
      
        startSeerBitSDK (
            Objects.requireNonNull(getCurrentActivity()),
            amount,
            phoneNumber,
            publicKey,
            fullName,
            email,
            transactionPaymentReference,
            this,
            pocketReference,
            vendorId,
            productDescription,
            country,
            currency,
            productId,
            tokenize
        );
    }

    @Override
    public void onClose() { sendCloseEvent(getReactApplicationContext(), "close"); }

    @Override
    public void onSuccess(@Nullable QueryData queryData) {sendSuccessEvent(getReactApplicationContext(), "success", queryData);}
}
