import React from 'react';
import { Link } from 'react-router-dom';

class Offcanvas extends React.Component {

  resetRoom = ()=>{
    this.props.socket.emit('room reset', '')
  }

  getCookie = name=>{
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
  }

  shareRoom = ()=>{
    const url = window.location.origin+'/room/'+this.props.roomName+'/'+this.getCookie('pass');
    if(navigator.share){
      navigator.share({
        title:'👊✋✌',
        text:'Lets play Rock-paper-cutter, infinity multiplayer online game!',
        url})
    }
    else{
      navigator.clipboard.writeText(url)
      .then(alert('Room link is copied. Share it with others.'))
      .catch(e=>alert(`Error occured while copying room link. 
Either you are not on "https" or some browser problem.

Room link : ${url}`))
    }
  }

  render() {
    return(
        <>
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="divoffcanvas">
                <div className="offcanvas-header">
                    <Link to='/' className="row offcanvas-title text-decoration-none" id="h5offcanvas">
                        <img className='col-2 rounded-pill iconHome' src='/img/home.svg' alt='home' />
                        <span className='m-auto h3 text-dark col-auto text-center'>Home</span>
                    </Link>
                    <button type="button" className="btn-close text-reset col-2" data-bs-dismiss="offcanvas"></button>
                </div>

                <div className="offcanvas-body container-fluid">
                  <div className='row h-100'>

                    <div className='col-12 mb-2 btn-group'>
                      <button type='button' onClick={this.resetRoom} className='btn btn-outline-danger col-6'>
                        Reset Score
                      </button>
                      <button type='button' onClick={this.shareRoom} className='btn btn-outline-success col-6'>
                        Invite
                      </button>
                      
                    </div>

                    <div className='col-12 d-flex flex-column-reverse' id='divchatbox'>
                      <div>
                        <div className='name'>@Ron</div>
                        <div className='msg'>
                          Thanks for playing..
                          {/* <br />
                          In case of any bug or suggestion open an issue&nbsp; 
                          <a href='#'>here</a>. */}
                          </div>
                      </div>
                    </div>

                    <form className='input-group col-12' id='frmchat'>
                      <input type="text" className="form-control" id="inpchat" autoComplete="off" spellCheck="false" required="required" />
                      <button className='btn btn-outline-primary'>send</button>
                    </form>
                    
                  </div>
                </div>
            
            </div>
        </>
    )
  }

  componentDidMount() {
    const inpchat = document.getElementById('inpchat')
    const divchatbox = document.getElementById('divchatbox')
    const spanMsgCnt = document.getElementById('spanMsgCnt')
    const offcan = document.querySelector('.offcanvas')

    // user sending msg
    document.getElementById('frmchat').addEventListener('submit', e=>{
      e.preventDefault()
      const val = inpchat.value.trim()
      if(val){
        this.props.socket.emit('room msg', val)
        inpchat.value=''
      }
    })

    // receiving msg
    this.props.socket.on('room msg', (name,val)=>{
      divchatbox.insertAdjacentHTML('afterbegin',
        `
          <div>
            <div class='name'>@${name}</div>
            <div class='msg'>${val}</div>
          </div>
        `
      )

      // update spanMsgCnt
      if(!offcan.classList.contains('show')){
        spanMsgCnt.innerText = +spanMsgCnt.innerText + 1
      }
    })

    // player opens menu, so clear Msgcnt
    offcan.addEventListener('shown.bs.offcanvas', function () {
      spanMsgCnt.innerText = '';
      inpchat.focus()
    })

    // a player resetted room score
    this.props.socket.on('room reset', (name, room)=>{
      divchatbox.insertAdjacentHTML('afterbegin',
        `
          <div>
            <div class='name'>@${name} resetted room</div>
          </div>
        `
      )
    })
  }
}

export default Offcanvas;
