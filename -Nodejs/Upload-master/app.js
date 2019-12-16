// src/app.js

import React from 'react'
import {Query} from 'react-apollo'
import {gql} from 'apollo-boost'

// 在 app.js 中於 ROOT_QUERY 根查詢中定義欄位 field

export const ROOT_QUERY = gqlˋ
    query allUsers{
        totalUsers
        totalPhotos

        allUser{}
        allPhotos{
            id 
            name
            url
        }
    }

    fragment userInfo on User{
        githubLogin
        name
        avatar
    }
ˋ

module.exports app;