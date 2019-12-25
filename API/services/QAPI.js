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
