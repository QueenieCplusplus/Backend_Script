import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {gql} from 'appollo-boost';
import { userInfo } from 'os';

import AuthorizedUser form ',/AuthorizedUser' 
import Users form './Users'


export const ROOT_QUERY = gqlˋ
        // query allUsers {
            
        // }

        // fragement userInfo on User{
            
        // }
ˋ
const App = ()=>
    <BrowserRouter>
        <div>
            <AuthorizedUser />
            <Users />
        </div>
    </BrowserRouter>

export default App;




