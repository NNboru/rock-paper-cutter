import React from 'react';
import { withRouter } from 'react-router-dom';
import Allhands from './Allhands.js'
import Loader from './Loader';

class Home extends React.Component {
    constructor() {
        super();
        this.stop=false
        this.state = {
            loading:false,
            count:3,
            reveal:false,
            players:{
                'ronan':{
                    status:'on',
                    choice:0,
                },
                'salaman':{status:'on'},
                'mariana':{status:'on'},
            }
        };
    }

    rand(min, max){
        return min + Math.floor(Math.random()*(max-min+1))
    }

    genName(){
        return String.fromCharCode(
            this.rand(97,97+25),
            [97,101,105,111,117][this.rand(0,3)],
            this.rand(97,97+25),
            [97,101,105,111,117][this.rand(0,3)],
        ) + this.rand(1,99)
    }

    calResult(players, total){
        const cnt = [0,0,0], res = {}
        for( let p in players){
            if(players[p].status==='on'){
                cnt[players[p].choice]++
            }
        }
        if(cnt[0]*cnt[1]*cnt[2] !== 0 || cnt.includes(total)){
            res.res='draw'
            return res
        }
        else res.res='win'

        let win=0
        if(cnt[0]===0) win=2
        if(cnt[2]===0) win=1

        res.winners = []
        for( let p in players){
            if(players[p].status==='on'){
                if(players[p].choice===win)
                    res.winners.push(p)
            }
        }
        const inc = total - res.winners.length
        for(let p of res.winners){
            players[p].wins += inc
        }

        return res
    }

    update = e=>{
        let cur=e.target, val = cur.value
        val = val.replaceAll(/[^ \w-]/g,'').substr(0,16)
        cur.value = val
        cur.classList.remove('is-invalid')
    }

    async createAni(){
        const txts = [
            'Online multiplayer game',
            'Reach out your hands',
            'Any number of players!',
            'Stone beats scissors',
            'Scissors beats paper',
            'Paper beats stone',
            'Old is gold, never gets old'
        ], names = [ 
            'ron', 'luffy', 'kaido', 'Edward', 'thanos', 'enma',
            'mayuri', 'zoro', 'naami', 'brook', 'meliodas', 'asta', 'naruto',
            'hinata', 'sakura', 'levi', 'mikasa', 'kilua', 'Zenitsu',
            'Nezuko', 'platypus', 'Lawliet', 'misa misa', 'Saitama',
        ]

        const elem = document.getElementById('divtxt')
        while(true){
            for(let txt of txts){

                // setting reveal=false state
                const count = this.rand(2,8), s=new Set(), players={};
                while(s.size!==count){
                    s.add(this.rand(0,names.length-1))
                }
                Array.from(s).forEach(ind=>{
                    players[names[ind]]={
                        status:'on',
                    }
                })
                let copy = JSON.parse(JSON.stringify(players))
                this.setState( { count, players:copy, reveal:false } )

                // showing txt
                let dlay = 0
                elem.innerHTML= Array.from(txt).map(v=>{
                    if(v===' ')
                        return `<span style='animation-delay:${(dlay++)/20}s;width:30px;'></span>`
                    return `<span style='animation-delay:${(dlay++)/20}s'>${v}</span>`
                }).join('')
                
                // sleep for 4s
                await new Promise(res=>setTimeout(res,5000,'ok'))
                if(this.stop) return

                // calculate result
                for(let p in players){
                    players[p].choice = this.rand(0,2)
                }
                const reveal = this.calResult(players, count)
                copy = JSON.parse(JSON.stringify(players))
                this.setState( { reveal, players:copy } )
                
                // sleep again
                await new Promise(res=>setTimeout(res,3000,'ok'))
                if(this.stop) return
                this.setState( { count:0, players:{}, reveal:false } )
            }
        }
    }

    render() {
        return (
            <>
                <div className='mycontainer'>
                    <div className=''>
                        <div className="d-flex flex-column justify-content-center pt-4 h-100">
                            <div className='m-2 p-2 pb-4 display-3 lead popper' id='divtxt'></div>
                        </div>
                    </div>
                </div>

                <div className='divAllhandsHome'>
                    <Allhands players={this.state.players} 
                            count  ={this.state.count}
                            reveal ={this.state.reveal}
                    />
                </div>

                <a href='#myform1' className='link position-absolute start-50 bottom-0 translate-middle'>
                    <img src='/img/down.png' id='arrow-link' alt='' />
                </a>

                <div className='container-fluid w-lg-60 shadow pt-5 pb-5 divform2'>
                    <br />
                    <div className='row gy-4'>
                        <form id='myform1' className='col col-10 col-md-5 p-4 mx-auto mb-4 divform'>
                            <div className='h3 text-center mb-4'>Create room</div>
                            <div className="form-group">
                                <label htmlFor="bname">Room name</label>
                                <input type="name" className="form-control text-primary font-weight-bolder" id="cname" autoComplete="off" spellCheck="false" required="required" />
                                <div className='invalid-feedback'>Sorry, room with this name already exists.</div>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="bname">Password</label>
                                <input type="name" className="form-control text-primary font-weight-bolder" id="cpass" autoComplete="off" spellCheck="false" required="required" />
                            </div>
                            <br />
                            <div className="container">
                                <button type="submit" className="btn btn-success d-block m-auto">Lets GO</button>
                            </div>
                        </form>
                        {/* <hr /> */}
                        <form id='myform2' className='col col-10 col-md-5 p-4 mx-auto mb-4 divform'>
                            <div className='h3 text-center mb-4'>Join room</div>
                            <div className="form-group">
                                <label htmlFor="bname">Room name</label>
                                <input type="name" className="form-control text-primary font-weight-bolder" id="jname" autoComplete="off" spellCheck="false" required="required" />
                                <div className='invalid-feedback'>Room with this name does not exists.</div>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="bname">Password</label>
                                <input type="name" className="form-control text-primary font-weight-bolder" id="jpass" autoComplete="off" spellCheck="false" required="required" />
                                <div className='invalid-feedback'>Incorrect password</div>
                            </div>
                            <br />
                            <div className="container">
                                <button type="submit" className="btn btn-success d-block m-auto">Lets GO</button>
                            </div>
                        </form>
                    </div>
                </div>
                <br />
                <div className='text-center mb-2'>
                    @copyrights 2021
                </div>

                {!this.state.loading || <Loader />}
            </>
        )
    }

    componentDidMount() {
        this.createAni()

        const cname = document.getElementById('cname')
        const cpass = document.getElementById('cpass')
        const jname = document.getElementById('jname')
        const jpass = document.getElementById('jpass')

        cname.value = this.genName()
        cpass.value = this.rand(100,999)

        cname.addEventListener('input', this.update)
        jname.addEventListener('input', this.update)
        jpass.addEventListener('input', ()=>jpass.classList.remove('is-invalid'))

        document.getElementById('myform1').addEventListener('submit', e=>{
            e.preventDefault()
            this.setState({loading:true})
            const name=cname.value, pass=cpass.value;
            fetch('/createRoom', {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({name, pass})
            }).then(res=>{
                if(!res.ok) throw new Error('Some error occured')
                return res.json()
            }).then(data=>{
                if(data.error) throw new Error('Error occured : ' + data.error)
                if(data.exists){
                    cname.classList.add('is-invalid')
                    this.setState({loading:false})
                }
                else{
                    // setCookie('pass', pass, {path:`/room/${name}`}) 
                    // auth is not able to read this cookie!!
                    this.props.history.push(`/room/${name}/${pass}`)
                }
            }).catch(e=>{
                this.setState({loading:false})
                alert(e)
            })
        })

        document.getElementById('myform2').addEventListener('submit', e=>{
            e.preventDefault()
            this.setState({loading:true})
            const name=jname.value, pass=jpass.value;
            fetch('/joinRoom', {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({name, pass})
            }).then(res=>{
                if(!res.ok) throw new Error('Some error occured')
                return res.json()
            }).then(data=>{
                if(data.error) throw new Error('Error occured : ' + data.error) 
                if(data.notExists){
                    jname.classList.add('is-invalid')
                    this.setState({loading:false})
                }
                else if(data.wrongPass){
                    jpass.classList.add('is-invalid')
                    this.setState({loading:false})
                }
                else{
                    // setCookie('pass', pass, {path:`/room/${name}`}) 
                    // auth is not able to read this cookie!!
                    this.props.history.push(`/room/${name}/${pass}`)
                }
            }).catch(e=>{
                this.setState({loading:false})
                alert(e)
            })
        })

        this.hidearrow = setInterval(function(){
            const arrow = document.getElementById('arrow-link')
            if(arrow.getBoundingClientRect().y<500){
                arrow.style['animation-name']='none'
            }
            else{
                arrow.style['animation-name']='anilink'
            }
        }, 500)
    }

    componentWillUnmount(){
        this.stop=true
        clearInterval(this.hidearrow)
    }
}

export default withRouter(Home);
