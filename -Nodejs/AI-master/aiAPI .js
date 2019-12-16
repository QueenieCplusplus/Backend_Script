(function(){
    const AssistantV1 = require('watson-developer-cloud/assistant/v1');
    // var watsonConfig = {};

    class aiAPI {
        constructor() {
            this.initWatson = this.initWatson.bind(this);
            this.listIntent = this.listIntent.bind(this);
            this.listWorkspace = this.listWorkspace.bind(this);
            this.getExample = this.getExample.bind(this);
            
            this.deleteExample = this.deleteExample.bind(this);
            this.createExample = this.createExample.bind(this);
            this.getIntent = this.getIntent.bind(this);
            this.insertIntent = this.insertIntent.bind(this);
            this.putIntent = this.putIntent.bind(this);
            this.deleteIntent = this.deleteIntent.bind(this);
            this.getEntity = this.getEntity.bind(this);
            this.insertEntity = this.insertEntity.bind(this);
            this.putEntity = this.putEntity.bind(this);
            this.deleteEntity = this.deleteEntity.bind(this);
            this.getDialog = this.getDialog.bind(this);
            this.insertDialog = this.insertDialog.bind(this);
            this.putDialog = this.putDialog.bind(this);
            this.deleteDialog = this.deleteDialog.bind(this);
        }

        /**
         * 初始化watson assistant物件
         * @param {String} username 使用者名稱
         * @param {String} password 密碼
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
    
        /**
         * 列出一工作區下全部的意圖
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
        */
        listIntent(assistant, workspaceId) {
            let listIntent = {
                workspace_id: workspaceId
            };
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.listIntents(listIntent, (error, intents) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(intents);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error listIntent");
                return null;
            });
        }
    
        /**
         * 列出一watson assistant下全部的工作區
         * @param {Object} assistant
        */
        listWorkspace(assistant) {
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.listWorkspaces((error, workspaces) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(workspaces);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error listWorkspace");
                return null;
            })
        }
    
        /**
         * 取得一筆意圖下之例句
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {String} intent 意圖
         * @param {String} text 例句
        */
        getExample(assistant, workspaceId, intent, text) {
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                if (intent === 'irrelevant') {
                    let getConterExample = {
                        workspace_id: workspaceId,
                        text: text
                    }
                    assistant.getCounterexample(getConterExample, (error, result) => {
                        if(error) {
                            return reject(new Error(error));
                        }
                        return resolve(result);
                    });
                } else {
                    let getExample = {
                        workspace_id: workspaceId,
                        intent: intent,
                        text: text
                    }
                    assistant.getExample(getExample, (error, result) => {
                        if(error) {
                            return reject(new Error(error));
                        }
                        return resolve(result);
                    });
                }
            }).catch((error) => {
                console.log(error);
                console.log("error getExample");
                return null;
            })
        }
    
        /**
         * 刪除一筆意圖下之例句
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {String} intent 意圖
         * @param {String} text 例句
        */
        deleteExample(assistant, workspaceId, intent, text){
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                if (intent === 'irrelevant') {
                    let deleteConterExample = {
                        workspace_id: workspaceId,
                        text: text
                    }
                    assistant.deleteCounterexample(deleteConterExample, (error, result) => {
                        if(error) {
                            return reject(new Error(error));
                        }
                        return resolve(result);
                    });
                } else {
                    let deleteExample = {
                        workspace_id: workspaceId,
                        intent: intent,
                        text: text
                    }
                    assistant.deleteExample(deleteExample, (error, result) => {
                        if(error) {
                            return reject(new Error(error));
                        }
                        return resolve(result);
                    });
                }
                
            }).catch((error) => {
                console.log(error);
                console.log("error deleteExample");
                return null;
            })
        }
    
        /**
         * 新增一筆意圖下之例句
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {String} intent 意圖
         * @param {String} text 例句
        */
        createExample(assistant, workspaceId, intent, text) {
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                if (intent === 'irrelevant') {
                    let pushConterExample = {
                        workspace_id: workspaceId,
                        text: text
                    };
                    assistant.createCounterexample(pushConterExample, (error, result) => {
                        if(error) {
                            return reject(new Error(error));
                        }
                        return resolve(result);
                    });
                } else {
                    let pushExample = {
                        workspace_id: workspaceId,
                        intent: intent,
                        text: text
                    };
                    assistant.createExample(pushExample, (error, result) => {
                        if(error) {
                            return reject(new Error(error));
                        }
                        return resolve(result);
                    });
                }
                
            }).catch((error) => {
                console.log(error);
                console.log("error createExample");
                return null;
            })
        }
    
        /**
         * 取得一筆意圖
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {String} intent 意圖
        */
        getIntent(assistant, workspaceId, intent) {
            let getIntent = {
                intent: intent,
                workspace_id: workspaceId
            };
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.getIntent(getIntent, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(data);
                });
            }).catch((error) => {
                return null;
            })
        }
    
        /**
         * 新增一筆意圖
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {Oeject} pushIntent 欲新增之意圖
        */
        insertIntent(assistant, workspaceId, pushIntent) {
            pushIntent.workspace_id = workspaceId;
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.createIntent(pushIntent, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(pushIntent);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error insertIntent");
                let errorLog = {
                    type: 'intent',
                    action: 'insert',
                    message: error.message,
                    value: pushIntent.intent,
                    timestamp: Date.now()
                }
                return errorLog;
            })
        }
    
        /**
         * 修改一筆意圖
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {Oeject} putIntent 欲修改之意圖
        */
        putIntent(assistant, workspaceId, putIntent) {
            putIntent.workspace_id = workspaceId;
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.updateIntent(putIntent, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(putIntent);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error putIntent");
                let errorLog = {
                    type: 'intent',
                    action: 'update',
                    message: error.message,
                    value: putIntent.intent,
                    timestamp: Date.now()
                }
                return errorLog;
            })
        }
    
        /**
         * 刪除一筆意圖
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {String} intent 意圖
        */
        deleteIntent(assistant, workspaceId, intent) {
            let deleteIntent = {
                intent: intent,
                workspace_id: workspaceId
            };
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.deleteIntent(deleteIntent, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(data);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error deleteIntent");
                return null;
            })
        }
    
        /**
         * 取得一筆實體
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {String} entity 實體
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
    
        /**
         * 新增一筆實體
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {Object} pushEntity 欲新增之實體
        */
        insertEntity(assistant, workspaceId, pushEntity) {
            pushEntity.workspace_id = workspaceId;
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.createEntity(pushEntity, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(pushEntity);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error insertEntity");
                let errorLog = {
                    type: 'entity',
                    action: 'insert',
                    message: error.message,
                    value: pushEntity.entity,
                    timestamp: Date.now()
                }
                return errorLog;
            })
        }
    
        /**
         * 修改一筆實體
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {Object} putEntity 欲修改之實體
        */
        putEntity(assistant, workspaceId, putEntity) {
            putEntity.workspace_id = workspaceId;
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.updateEntity(putEntity, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(putEntity);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error putEntity");
                let errorLog = {
                    type: 'entity',
                    action: 'update',
                    message: error.message,
                    value: putEntity.entity,
                    timestamp: Date.now()
                }
                return errorLog;
            })
        }
    
        /**
         * 刪除一筆實體
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {String} entity 實體
        */
        deleteEntity(assistant, workspaceId, entity) {
            let deleteEntity = {
                entity: entity,
                workspace_id: workspaceId
            };
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.deleteEntity(deleteEntity, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(data);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error deleteEntity");
                return null;
            })
        }
    
        /**
         * 取得一筆對話
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {String} dialog 對話
        */
        getDialog(assistant, workspaceId, dialog) {
            let getDialog = {
                dialog_node: dialog,
                workspace_id: workspaceId
            };
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.getDialogNode(getDialog, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(data);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error getDialog");
                return null;
            })
        }
    
        /**
         * 新增一筆對話
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {Object} pushDialog 欲新增之對話
        */
        insertDialog(assistant, workspaceId, pushDialog) {
            pushDialog.workspace_id = workspaceId;
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.createDialogNode(pushDialog, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(pushDialog);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error insertDialog");
                let errorLog = {
                    type: 'dialog',
                    action: 'insert',
                    message: error.message,
                    value: pushDialog.dialog_node,
                    timestamp: Date.now()
                }
                return errorLog;
            })
        }
    
        /**
         * 修改一筆對話
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {Object} putDialog 欲修改之對話
        */
        putDialog(assistant, workspaceId, putDialog) {
            putDialog.workspace_id = workspaceId;
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.updateDialogNode(putDialog, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(putDialog);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error putDialog");
                let errorLog = {
                    type: 'dialog',
                    action: 'update',
                    message: error.message,
                    value: putDialog.dialog_node,
                    timestamp: Date.now()
                }
                return errorLog;
            })
        }
    
        /**
         * 刪除一筆對話
         * @param {Object} assistant
         * @param {String} workspaceId 工作區id
         * @param {String} dialog 對話
        */
        deleteDialog(assistant, workspaceId, dialog) {
            let deleteDialog = {
                dialog: dialog,
                workspace_id: workspaceId
            };
            // let assistant = new AssistantV1(watsonConfig);
            return new Promise((resolve, reject) => {
                assistant.deleteDialogNode(deleteDialog, (error, data) => {
                    if(error) {
                        return reject(new Error(error));
                    }
                    return resolve(data);
                });
            }).catch((error) => {
                console.log(error);
                console.log("error deleteDialog");
                return null;
            })
        }
    };

    module.exports = new aiAPI();
}())