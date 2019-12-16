import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';

const {createServer} = require('http')
var express = require('express');

const app = express();
const httpServer = createServer(app);

// 倘若有終端使用者請求的資料量非常的大，如下
Query allData {
    allData(first=9999){
        name
        url
        postedBy{
            name
            avatar
        }
    }
}

// 設定資料處理上限如下
allData: (root, data, context) {
    if (data.first > 100){
        throw new Error('<alert Message here>')
    }
}

// 與本議題無關，純粹展示 render 畫面
// const Users = () => {
//     <Query query={ROOT_QUERY}>

//         {result =>
//             <p> Users are loading now: {result.loading ? "yes": "no"}</p>
//         }

//     </Query>
// }

//./app.js
module.exports = app;

