import React from 'react';
import Loader from './Loader';
import LoadMain from './LoadMain.js'
import { setCookie,getCookie } from '../cookie';
import { withRouter } from 'react-router-dom';

class Auth extends React.Component {
    constructor() {
        super();
        this.state = {
            loading:true
        };
    }

    render() {
        if(this.state.loading)
            return <Loader />
        else{
            return <LoadMain roomid={this.roomid} />
        }
    }

    componentDidMount() {
        let {history, match:{params:{roomid, pass}}} = this.props
        this.roomid=roomid

        // check if password is in url or cookie
        if(pass){
            setCookie('pass', pass, {path:'/room/'+roomid})
            history.push(`/room/${roomid}`)
        }
        else{
            pass = getCookie('pass')
            if(!pass){
                alert("You didn't entered password : "+document.cookie)
                history.push('/')
                return
            }
        }

        // request server to add you to the room
        fetch('/joinRoom', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:roomid, pass})
        }).then(res=>{
            if(!res.ok) throw new Error('Error occured at checkpass')
            return res.json()
        }).then(data=>{
            if(data.error) throw new Error('Error occured : ' + data.error)
            if(data.notExists){
            throw new Error(`No room exists with name - "${roomid}"`)
            }
            else if(data.wrongPass){
                throw new Error('Wrong password')
            }
            else{
                this.setState( {loading:false} );
            }
        }).catch(e=>{
            alert(e)
            history.push('/')
        })
        
  }
}

export default withRouter(Auth);
