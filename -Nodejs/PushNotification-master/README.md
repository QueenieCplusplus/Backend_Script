# Cloud/ Remote Pushing Notification, 遠端訊息推播

FCM, Firebase Cloud Message
kind of Remote Push, not system push in Local.

# 3 Main Factors, 遠端推播三要素

* Auth, 驗證

* Device, 設備（目標機器）

* Content, 內文

# Push Flow, 推送進程

     Content Provider  =>  PNS  =>  Taregt Device  =>  Client App
     
# 3 ways Handshake, 三方交握

// iOS App :

     Content Provider     PNS(APNS)             Taregt Device              Client App
     
                                        <-----1. connect to PNS
     
                      2. generate Token ------>
                                    
                                        <-----3. generate device id 
                                                
                      4. send token     ------>
                              
         <------------------------------------5. send token
         
     (content, taregtAppID, taregtUser, sendTime, expiredTime) ---------------->
     
     /////
     
// Android App :
     
      Content Provider      PNS(GCM)             Taregt Device              Client App
     
                                        <-----1. connect to PNS
     
                      2. generate Token ------>
                                    
                                        <-----3. generate device id 
                                                
                      4. send token     ------>
                              
         <------------------------------------5. send token
         
     (content, taregtAppID, taregtUser, androidChannel, sendTime, expiredTime) ---->
     
     /////
                              
     


