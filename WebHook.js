// webhook 
// 2019, 12/25, by Queenie

// 注入相關套件
var express = require('express');
var router = express.Router();
const request = require('request-promise');

const AssistantV1 = require('ibm-watson/assistant/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

// var
// Object of IBM ChatBot
const assistant = new AssistantV1({
  version: '2018-02-28',
  authenticator: new IamAuthenticator({
    apikey: '   ', // change
  }),
  url: 'https://gateway.watsonplatform.net/assistant/api', // change
});


// WebHook Block
// Line hooked on IBM
router.post('/linebot', async function(req, res, next) {
	console.log(req.body)
	res.sendStatus(200);
	
	let words = req.body.events[0].message.text;
	let assistantResult = await askAssistant(words); // call function
	console.log(assistantResult)
	//let lineMsg = assistantResult.lineMsg;
	//let lineMsg = toLineFormat()
	//callLineSendMsgAPI

});

// function defined
// call var
function askAssistant(words){
	return assistant.message({
		workspaceId: '  ',
		input: {'text': words}
		})
		.then(res => {
			//console.log(JSON.stringify(res.result, null, 2));
			return res.result
		})
		.catch(err => {
			console.log(err)
		});
}

module.exports = router; // 實際命名由路由導向名稱的變數為主
