# AI_API
自製API

(1)額外注入套件包含

    Watson
   
    noSQL 的 Clodant

(2)製作 API 注入套件包含：

   * querystring

   * request

   * request-promise

   * xlsx

 (3) 製作 config.js，放在專案根目錄下
 
 (4) 製作控制器或是服務，在其 code 內均需引用常數為 (3) 模組，並放入稱為設定的變數
 
     const settings = require('../configs.js');
     
 (5) 關於 API 的第一層封裝，請詳範例 ../service/QAPI.js
 
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
                 baseUrl = settings.QApi[environment];

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

(6) 關於 API 的第二層封裝，請詳範例 ../controller/QController.js

        (function() {
            const request = require('request-promise');
            const querystring = require('querystring');
            const settings = require('../configs.js');

            var baseUrl = '';

            class QController {
                constructor() {
                    this.QLogin = this.QLogin.bind(this);
                    this.QAPI = this.QAPI.bind(this);
                    this.getQInstance = this.getQInstance.bind(this);
                }

                /**
                 * login
                 * @param {object} req http request
                 * @param {object} res http response
                 */
                QLogin(req, res) {
                    let params = req.body.params;
                    let availableAccounts = settings.accounts[settings.environment];
                    let resJson = {};
                    let option = {
                        httpOnly: true
                    };

                    if(availableAccounts.hasOwnProperty(params.USERID) &&
                    availableAccounts[params.USERID] == params.PWD){

                        resJson = {
                            status: 1,
                            msg: 'success login'
                        }
                        res.cookie('hoitaiCookie', 'CRD', option);
                        res.status(200).json(resJson);
                    }else{
                        resJson = {
                            status: 0,
                            data: result,
                            msg: 'fail login'
                        }
                        res.status(500).json(resJson);
                    }
                }

                /**
                 * 呼叫api
                 * @param {object} req http request
                 * @param {object} res http response
                 */
                QAPI(req, res) {
                    let apiCode = req.body.apiCode;
                    let params = req.body.params;
                    let resJson = {};

                    return callQAPI(apiCode, params).then(result => {
                        if(!result) {
                            resJson = {
                                status: 0,
                                msg: 'fail call q api'
                            };
                        }else{
                            resJson = {
                                status: 1,
                                data: result,
                                msg: 'success call q api'
                            };
                        }
                        res.status(200).json(resJson);
                    })
                    .catch((error) => {
                        let resJson = {
                            status: 0,
                            msg: error
                        };
                        res.status(500).json(resJson);
                    });
                }

                /**
                 * 取得相關專案資訊
                 * @param {object} req http request
                 * @param {object} res http response
                 */
                getQInstance(req, res) {
                    let resJson = {};

                    try{
                        resJson = {
                            status: 0,
                            data: settings[success],
                            msg: 'success get q instance'
                        };
                    }catch(e){
                        resJson = {
                            status: 0,
                            msg: 'fail get q instance'
                        };
                    }

                    res.status(200).json(resJson);    
                }
            }

            /** 以下共用方法 */

            /**
             * 呼叫api
             * @param {String} apiCode 編號 帳號
             * @param {String} params 傳入參數
            */
            const callQAPI = function(apiCode, params) {

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
                    'body': querystring.stringify({ 'jsonStr': JSON.stringify(params) })
                };

                return request.post(endPoint).then((body) => {
                    console.log(body)
                    let bodyJSON = JSON.parse(body);
                    return bodyJSON;

                }).catch((error) => {
                    console.log('call Q api error :' + error);
                    return null;
                })
            }

           

            module.exports = new QController();


        }());

