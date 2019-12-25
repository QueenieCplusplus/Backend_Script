module.exports = {
	"environment": "develop",
	"apacheRoute": {
		"develop": "",
		"product": "/QQ-backend"
	},
	"accounts": {
		"develop": {
			"": ""
		},
		"product": {
			"root": "root"
		}
	},
	"api": {
		"QQApi": "https://qq-iservice-line.q.com.tw/QQApi",
		"PKApi": "https://QQ-crd-prod.mybluemix.net/PK-backend/"
	},
	"project": {
		// 專案名稱
		"PK-prod": {
			"available": {
				"mindMap": true,
				"training": true
			},
			"department": "CRD",
			"assistant": {
				"username": "", // 兩種認證方式 username+password or apikey
				"password": "", 
				"apikey": " ", 
				"workspaceId": " ", 
				"method": "" // 解析dialog用function名稱，可能每個不一樣
			},
			"db": {
				"backupdb": {
					"type": "nosql", // mysql or nosql
					"table": "QQ_crd_prod_PK_api_call",
					"url" : "", 
					"username": "", 
					"password": "", 
					"method": "" //抓資料方法會依紀錄方試變化，可能要寫獨立method
				},
				"watson": { //Cloudant-Q CRD prod
					"type": "nosql", // mysql or nosql
					"table": "PK_favorite",
					"url" : "https://63a7-bluemix.cloudantnosqldb.appdomain.cloud", 
					"username": "63a7-bluemix", 
					"password": " ", 
					"method": "" //抓資料方法會依紀錄方試變化，可能要寫獨立method
				}
			}
		},
	}
}
