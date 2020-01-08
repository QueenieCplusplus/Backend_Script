# Backend_Script
後端腳本語言

軟體開發設計流程
其中 SA <-> SD <-> PG 完成 IPO，輸入 -> 流程 -> 輸出的目標。 
SA 注重 IPO >>> SD 注重元件拼圖 >>> PG 注重功能性實作與單元測試 >>> QA 注重掃除 Bug >>> Deploy 注重 軟體能被安裝在所有實體機上。



          Spec  
              ｜＿

                SA
                  ｜＿

                      SD
                        ｜＿

                           PG
                             ｜＿

                                TEST/QA
                                       ｜＿

                                        Deploy & Publish
                                                     ｜＿

                                                        Maintain

# API

https://github.com/QueenieCplusplus/Backend_Script/tree/master/API

------------------------
{ 套件使用 }

   Auth, 登入驗證 很多套件可以使用，如 AD
   
   SendMail, 收發信 可使用 LDAP 套件

   Notify, 推播 可使用 BaaS 或 EWS 套件
   
   Upload, 上傳 可使用 apollo 套件

   Pub/Sub, 訂閱/發布 (TBD)
   
plz see code. 

------------------------
{ 後端功能 }

Auth

https://github.com/QueenieCplusplus/Backend_Script/blob/master/Auth/AuthorizedUser.js
   
LDAP
https://github.com/QueenieCplusplus/Backend_Script/blob/master/ldap/ldapSearch.js

RemotePush (Notification)

https://github.com/QueenieCplusplus/Backend_Script/tree/master/-Nodejs/PushNotification-master

Upload

https://github.com/QueenieCplusplus/Backend_Script/tree/master/-Nodejs/Upload-master

WebHook

https://github.com/QueenieCplusplus/Backend_Script/blob/master/WebHook.js

-----------------------------------------
{ 各種應用 }

Crawler 
https://github.com/QueenieCplusplus/Backend_Script/blob/master/Crawler.md

AI 
https://github.com/QueenieCplusplus/Backend_Script/tree/master/-Nodejs/AI-master

Secure

https://github.com/QueenieCplusplus/Backend_Script/tree/master/Security

File Transfer

https://github.com/QueenieCplusplus/Backend_Script/blob/master/-Nodejs/FS_and_URL_NodeApp-master/index.js

NodeRed

https://github.com/QueenieCplusplus/Backend_Script/tree/master/NodeRed

NodeRed Tool

https://www.youtube.com/watch?v=h0WPJqd78Qg&feature=youtu.be&fbclid=IwAR0dl7S3X7_NX-C9Gro0YEEbsgHICtoifTaKjnVY5MdUx1q8sWB9AvPA3oo

------------------------
{ 資料庫管理 }

DB connection (MongoDB)
https://github.com/QueenieCplusplus/Backend_Script/blob/master/MongoDB/db.js

DB query (find)
https://github.com/QueenieCplusplus/Backend_Script/blob/master/MongoDB/query.js

DB ops (insert)
https://github.com/QueenieCplusplus/Backend_Script/blob/master/MongoDB/insert_doc.js












