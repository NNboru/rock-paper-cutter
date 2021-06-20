import React from 'react';
import Loader from './Loader';
import LoadMain from './LoadMain.js'
import { withRouter } from 'react-router-dom';

class Auth extends React.Component {
    constructor() {
        super();
        this.state = {
            loading:true
        };
    }

    getCookie = name=>{
        let matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    setCookie = (name, value, options = {})=> {

        options = {
          path: '/',
          // add other defaults here if necessary
          ...options
        };
      
        if (options.expires instanceof Date) {
          options.expires = options.expires.toUTCString();
        }
      
        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
      
        for (let optionKey in options) {
          updatedCookie += "; " + optionKey;
          let optionValue = options[optionKey];
          if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
          }
        }
      
        document.cookie = updatedCookie;
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
            this.setCookie('pass', pass, {path:'/room/'+roomid})
            history.push(`/room/${roomid}`)
        }
        else{
            pass = this.getCookie('pass')
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
