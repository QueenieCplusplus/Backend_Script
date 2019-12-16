# Auth_Verification
授權驗證和權杖 token

# 運作原理

1. 利用 Client_ID 將 end user redirect to Auth Provider

2. 連同代碼 轉址回網址: http://localhost:3000?code=XYZ

3. 利用代碼 傳送資訊 authUser(code)

4. 利用 Client_, Client_sercret, client_code 向 Auth Provider 請求 access_token

5. Auth Provider 回應 access_token

6. API 使用此 token 請求 user info，並回應 user info

7. 解析與儲存 token (運用 AuthPaylod 解析 authUer(code)，內含 token 與 user)

# 框架

   React

# 前置作業，安裝套件

    $npm install react-router-dom
====>+ react-router-dom@5.1.2

    $npm install react-apollo
====>+ react-apollo@3.1.3

    $npm install apollo-boost
====>+ apollo-boost@0.4.4

# code 

./User.js 使用 apollo 伺服器提供的 gql 元件與 react-apollo 套件的 Mutation 元件

./AuthorizedUser.js 使用 react-router-dom 套件的 withRouter 元件

App.js 使用 react-router-dom 的 BrowseRouter 元件 和 appollo-boost 的 gql 元件，並且引入如上兩頁 code 模組。

# options, 額外設定

可在 ./User.js 使用 apollo 伺服器提供的 gql 元件 中
額外設定 Poll 輪詢的功能機制。

參考請詳：
https://github.com/poupougo/Poll/blob/master/README.md

