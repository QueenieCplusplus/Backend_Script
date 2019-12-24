const {ApolloServer} = require('apollo-server-express')
const express = require('express')

const {MongoClient} = require('mongodb')
require('dotenv').config()

// 建立 express app
// var app = express()
// const server = new AppoServer({typeDefs, resolvers})
// server.applyMiddleware({app})

// 建立路由
// / 是 homepage
// app.get('/', (req, res)=>res.send('there you are.'))

// 建立其他路由
// 建立 /graphql 此一端點
const expressPlayground = require('graphql-playground-middleware-express').default
// app.get('/playground', expressPlayground({endpoint: '/graphql'}))


// 監聽埠號(指定))
// app.listen({port:4000}, () => console.log('hi! graphQL server starts on & running now, infoPath is ${server.graphqlPath}'))


// 建立非同步函式
async function start(){

    const app = express()
    const MONGO_DB = process.env.DB_HOST // 詳見 readme 第二點

    const client = await MongoClient.connect(MONGO_DB, { useNewUrlParser: true})
    const db = client.db() 
    const context = {db} // 資料物件裝入 context 命名的變數容器

    const server = new AppoServer({typeDefs, resolvers})
    server.applyMiddleware({app})

    app.get('/', (req, res)=>res.send('there you are.'))
    app.get('/playground', expressPlayground({endpoint: '/graphql'}))
    app.listen({port:4000}, () => console.log('hi! graphQL server starts on & running now, infoPath is ${server.graphqlPath}'))

}

// 啟動伺服器
start()
