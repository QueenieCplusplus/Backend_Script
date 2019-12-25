(function() {
    const request = require('request-promise');
    const querystring = require('querystring');
    const settings = require('../configs.js');

    var baseUrl = '';

    class QController {
        constructor() {
            this.QLogin = this.QLogin.bind(this);
            this.QAPI = this.QAPI.bind(this);
            this.PKNoderedAPI = this.PKNoderedAPI.bind(this);
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
         * 呼叫api
         * @param {object} req http request
         * @param {object} res http response
         */
        PKNoderedAPI(req, res) {
            let apiCode = req.body.apiCode;
            let params = req.body.params || {};
            let resJson = {};

            params.apikey = '     ';

            console.log(apiCode, params)

            return callPKAPI(apiCode, params).then(result => {
                if(!result) {
                    resJson = {
                        status: 0,
                        msg: 'fail call pk nodered api'
                    };
                }else{
                    resJson = {
                        status: 1,
                        data: result,
                        msg: 'success call pk nodered api'
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

    /**
     * 呼叫PKAPI
     */
    const callPKAPI = function(method, params) {
        baseUrl = settings.api.PKApi;
        let url = baseUrl + method;
        
        let endPoint = {
            'url': url,
            'method': 'POST',
            'rejectUnauthorized': false, 
            'json': true,
            'body': params
        };

        return request.post(endPoint).then((body) => {
            if(body.success) {
                return body.data;
            } else {
                console.log('call pk api error :' + body.errorMsg);
                return null;
            }

        }).catch((error) => {
            console.log('call pk error :' + error);
            return null;
        })
    }

    module.exports = new QController();
    
}());
