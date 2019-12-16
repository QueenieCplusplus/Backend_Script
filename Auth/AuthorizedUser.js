// import React, {import React from 'react'

// export const Component = (props) => {
//     return(
//         <div>
//             {props.children}
//         </div>
//     )
// }

// export default Component}

import React, {component} from 'react';
import {withRouter} from 'react-router-dom';

class AuthorizedUser extends component{

    state = {signIn: false}

    componentDidMount(){
        if(window.location.search.match(/code=/)){
              this.setState({signIn: true})
              const code = window.location.search.replace("?code=", "")
              alert(code)
              this.props.history.replace('/')
            }
        }

    }

    requestCode(){
        var clientID = <YOUR_GITHUB_CLIENT_ID>
        window.location = ˋhttps://github.com/login.oauth/authorize?client_id=${clientID}&scope=userˋ
    }

    render(){
        return(
            <button onClick={this.requestCode} disabled={this.state.signIn}>
                Sign In with GitHub
            </button>
        )
    }
}

export default withRouter(AuthorizedUser);