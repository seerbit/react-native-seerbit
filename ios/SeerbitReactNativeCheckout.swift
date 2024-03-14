import UIKit
import SwiftUI
import SeerBitCheckout
import Foundation


@objc(SeerbitReactNativeCheckout)
class SeerbitReactNativeCheckout: NSObject {

  private var viewController: UIHostingController<InitSeerbitCheckout>?

  @objc (open:withB:withC:withD:withE:withF:withG:withH:withI:withJ:withK:withL:withM:)
  func open(
    amount: String,
    phoneNumber: String,
    publicKey: String,
    fullName: String,
    email: String,
    productDescription: String,
    pocketReference: String,
    transactionPaymentReference: String,
    vendorId: String,
    country: String,
    currency: String,
    tokenize: Bool,
    productId: String
 ) -> Void {

     notificationCenterObserver()
    //code to open the swiftui library
     let initSeerbitCheckout = InitSeerbitCheckout(
            amount: Double(amount) ?? -1.0,
            fullName: fullName,
            mobileNumber: phoneNumber,
            publicKey: publicKey,
            email: email
        )
     
        DispatchQueue.main.async {

        do{
           self.viewController = UIHostingController(rootView: initSeerbitCheckout)

        //     guard let rootViewController = UIApplication.shared.keyWindow?.rootViewController else {
        //    throw NSError(domain: "SeerbitError", code: 1, userInfo: nil)
        // }

        guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
         let rootViewController = windowScene.windows.first?.rootViewController else {
           throw NSError(domain: "SeerbitError", code: 1, userInfo: nil)
     }
        
          rootViewController.present(self.viewController!, animated: true, completion: nil)

        } catch{print("Error occurred: \(error.localizedDescription)")}
    }

  }

   @objc func didCloseSdk() {
        // Dismiss the presented hosting controller
             DispatchQueue.main.async {
            self.viewController?.dismiss(animated: true, completion: nil)
        }
    }

     deinit {
        NotificationCenter.default.removeObserver(self)
    }

    @objc func notificationCenterObserver(){

      NotificationCenter.default.addObserver(
            forName: Notification.Name(NotificationListenerConstants.closeCheckout.rawValue),
            object: nil,
            queue: nil
        ){ notification in
                
            if let jsonData = notification.userInfo?[NotificationListenerConstants.jsonData.rawValue] as? Data,
                   let decodedData = try? JSONDecoder().decode(QueryTransactionDataModel.self, from: jsonData) {
                    // Handle the decoded data
                    print(decodedData,"transaction response")
                    //close the checkout after
                    self.didCloseSdk()
                }else{
                    //you can perform any custom logic here, after which you close the sdk
                    self.didCloseSdk()
                }
            }

    }
}
