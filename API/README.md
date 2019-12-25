# AI_API
自製API

(1)額外注入套件包含 Watson & noSQL 的 Clodant

(2)製作 API 注入套件包含：

 * querystring
 
 * request
 
 * request-promise
 
 * xlsx
 
 (3) 製作 config.js，放在專案根目錄下
 
 (4) 製作控制器，在其 code 內均需引用常數為 (3) 模組，並放入稱為設定的變數
 
     const settings = require('../configs.js');
     
 (5) 關於 API 的控制器，請詳範例 ../service/QAPI
 
      (function() {
         const request = require('request-promise');
         const querystring = require('querystring');
         const settings = require('../configs.js');

         var baseUrl = '';

         class QAPI {
             constructor() {
                 this.callAPI = this.callAPI.bind(this);
             }

             /**
              * 呼叫api
              * @param {String} apiCode 編號 帳號
              * @param {String} params 傳入參數
             */
             callAPI(apiCode, params) {

                 let environment = settings.environment;
                 environment = environment == 'product' ? 'product' : 'develop';
                 baseUrl = settings.hoitalApi[environment];

                 let url = baseUrl + apiCode;

                 let endPoint = {
                     'url': url,
                     'method': 'POST',
                     'headers': {
                         'content-type': 'application/x-www-form-urlencoded'
                     },
                     'body': querystring.stringify({ 'jsonstr': JSON.stringify(params) })
                 };

                 return request.post(endPoint).then((body) => {
                     let bodyJSON = JSON.parse(body);
                     return bodyJSON;

                 }).catch((error) => {
                     console.log('cll api error :' + error);
                     return null;
                 })
             }

         }

         module.exports = new QAPI();
     }());



