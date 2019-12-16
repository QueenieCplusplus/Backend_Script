# AI
AI topics plz ref to here

https://github.com/TurandotsAI?tab=repositories

https://github.com/TurandotsAI/LineChatBot

https://github.com/TurandotsAI/WatsonAIChatBot

https://github.com/nodejs2019/AIChatBot

https://github.com/nodejs2019/ChatBot

https://cloud.ibm.com/apidocs/assistant/assistant-v1?code=node#get-response-to-user-input

https://cloud.ibm.com/docs/services/assistant?topic=assistant-dialog-webhooks

https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/wdp-apis.html

# encapsulate code as API

    (function(){
    
        const AssistantV1 = require('watson-developer-cloud/assistant/v1');
        
        // var watsonConfig = {};

        class aiAPI {
            constructor() {
                this.initWatson = this.initWatson.bind(this);
                this.getEntity = this.getEntity.bind(this); 
            }

            /**
             * Initialize an Object of AI assistant
             * @param {String} username 
             * @param {String} password 
            */
            initWatson(username, password) {
                return new Promise((resolve, reject) => {
                    let watsonConfig = {
                        username: username,
                        password: password,
                        version: '2018-02-16'
                    }
                    // watsonConfig.username = username;
                    // watsonConfig.password = password;
                    // watsonConfig.version = '2018-02-16';
                    let assistant = new AssistantV1(watsonConfig);
                    return resolve(assistant);
                }).catch(() => {
                    return null;
                });
            }

            /** get an Instance
             * @param {Object} assistant
             * @param {String} workspaceId 
             * @param {String} entity 
            */
            getEntity(assistant ,workspaceId, entity) {
                let getEntity = {
                    entity: entity,
                    workspace_id: workspaceId
                };
                // let assistant = new AssistantV1(watsonConfig);
                return new Promise((resolve, reject) => {
                    assistant.getEntity(getEntity, (error, data) => {
                        if(error) {
                            return reject(new Error(error));
                        }
                        return resolve(data);
                    });
                }).catch((error) => {
                    return null;
                })
            }    
        };

        module.exports = new aiAPI();
        
    }())

