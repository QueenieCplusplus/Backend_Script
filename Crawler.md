# Crawler in Js, 爬蟲

平行執行的網路蜘蛛

# Web Spider's Aim, 網路蜘蛛目標

將 URL 內容載入到本地資料夾下檔案中。

# Web Spider's Basic, 網路蜘蛛條件

* request

      執行 http streaming call。

* mkdirp

      遞迴建立目錄路徑。
  
* execute code

      $node spider URL
  
# Module in Dependencies, 依賴模組

    var request = require('request');
    var mkdirp = require('mkdirp');
    var path = require('path');
    var fs = require('fs');
    var utitlities = require('./utilities');
    
# Concurrency, 並行執行並非同步執行

在 Node.js 中，無 go 語言可以造就的 Sync，
僅能利用 Async 配合 setTimeout(),
任務同時執行，可能會發生競態狀況。
需要對特定資源上鎖！


# 與循序迭代的比較

循序與迭代的網路蜘蛛，參考 iterateAsync.js
循序會將任務列成 chain 並且用 pipeline 來依序進行任務，
但如改用循序完成任務，會有回呼地獄魔鬼的狀況發生。

https://github.com/nodejs2019/iterate

# code

/ to do a web spider coded in JS.
// a concurrency style.

    var request = require('request');
    var mkdirp = require('mkdirp');
    var path = require('path');
    var fs = require('fs');
    var utitlities = require('./utilities');

// Async with Callback Devil

     function spider(url, callback){

        url = 'https://rate.bot.com.tw/ir?Lang=zh-TW';

        var file = utitlities.urlToFilename(url);

        fs.exists(file, function(){

            if(!exists){

                console.log("plz execute a spider task for website:"+ url);

                request(url, function(err, res, body){

                    if(err){

                        callback(err);

                    }else{
                        mkdirp(path.dirname(file),function(err){

                            if(err){

                                callback(err);

                            }else{

                                fs.writeFile(file, body, function(err){

                                    if(err){

                                            callback(err);

                                    }else{

                                        callback(null, file, true);
                                    }


                                });

                            }

                        });
                    }

                });

            }else{

                callback(null, file, false);

            }
        });
    }
    
// not Sync, just use concurrency with timeTimeout || setImmediate;

    function spiderJS(url, body, nest, callback){

        url = 'https://rate.bot.com.tw/ir?Lang=zh-TW';

        if(nest === 0) {
            return process.nextTick(callback);
        }

        var link = utitlities.getPageLinks(url, body);

        if(link.length === 0){
            return process.nextTick(callback);
        }

        var completedTask = 0, isError = false;

        function taskFinished(err){

            if(err){
                isError = true;
                return callback(true);
            }
            if(completedTask++ === link.length && ! isError){
                return callback();
            }
        }

        link.array.forEach(function(link){

            spider(link, nest, -1, taskFinished);

        });
    }




