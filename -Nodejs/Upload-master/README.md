# Upload
上傳檔案或是圖片的功能

# npm install

* apollo-upload-client

* apollo-upload-server

    $ npm install apollo-upload-client
===>+ apollo-upload-client@11.0.0

    $ npm install apollo-upload-server
===>+ apollo-upload-server@7.1.0

# 上傳檔案的資料編碼解碼

* form-data

# Http 傳輸

* client : 

在瀏覽器捕捉檔案並利用操作傳給伺服器端。

* server : 

處理 client 端傳入的檔案，捕捉檔案後，將其對應至適當的查詢引數(參數)，透過引數將它送給函數去做解析處理。

# 伺服器需要做的事情

*捕捉 stream 中的檔案

*mimetype

*encode & decode

# 需要使用的其他套件和元件

path

node module 裡面的 ../lib/uploadStream

express.static

# 定義純量為上傳的資料型別

scalar Uplod




