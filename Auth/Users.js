import React from 'react';
import {Query, Mutation} from 'react-apollo';
import {gql} from 'apollo-boost';

// to uncomment this code line
// import {ROOT_QUERY} from './App'

// const Users = () => {
//     <Query query={ROOT_QUERY}>

//         {result =>
//             <p> Users are loading now: {result.loading ? "yes": "no"}</p>
//         }

//     </Query>
// }

// refetch to reload
const Users = () =>
    <Query query={ROOT_QUERY}>
    {({data, loading, refetch}) => loading? 
        <p> loading users...</p>:
        <userList count={data.totalUsers}
            users={data.allUsers}
            refetchUsers={referch}
        />
    }
    </Query>

const UserList = ({count, users}) => {
   <div>
    <p>{count} Users</p>

    <ul>
        {users.map( user =>
            <userListItem key={}
                name={user.name}
                avatar={user.avatar}
            />
        )}
    </ul>
   </div>
}

const UserListItem = ({name, avatar}) => {
    <li>
        <image/>
        {name}
    </li>
}

const ADD_USERS_MUTATION = gqlˋ
    mutation addUser($count:Int!){
        addUser(count:$count){
            githubLogin
            name
            avatar
        }
    }
ˋ

const UserList = ({count, users, refetchUsers}) => {
    <div>
        <p> {count} Users </p>

        <Mutation mutation={ADD_USERS_MUTATION} varibales={{count:1}}>

            { addUser => 
                <button onClick={addUser}> Add Users</button>

            }

        </Mutation>

        <ul>
            {users.map(user=>
                <UserListItem
                    key={user.githubLogin}
                    name={user.name}
                    avatar={user.avatar}
                />
            )}
        </ul>
    </div>
}

export default Users