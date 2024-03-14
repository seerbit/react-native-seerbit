#import <React/RCTBridgeModule.h>


@interface RCT_EXTERN_MODULE(SeerbitReactNativeCheckout, NSObject)

RCT_EXTERN_METHOD(
  open:(NSString *)amount 
  withB:(NSString *)phoneNumber 
  withC:(NSString *)publicKey
  withD:(NSString *)fullName
  withE:(NSString *)email
  withF:(NSString *)productDescription
  withG:(NSString *)pocketReference
  withH:(NSString *)transactionPaymentReference
  withI:(NSString *)vendorId
  withJ:(NSString *)country
  withK:(NSString *)currency
  withL:(BOOL)tokenize
  withM:(NSString *)productId
  )

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end

    