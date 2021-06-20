import { Modal } from 'bootstrap';
import React, { createRef } from 'react';

class Popup extends React.Component {
    constructor(props){
        super(props)
        this.refinp = createRef();
    }

    setName = e=>{
        e.preventDefault()
        const val = this.refinp.current.value
        if(this.props.setName(val,this.myModal) === 'exist'){
            this.refinp.current.classList.add('is-invalid')
        }

    }
    update = e=>{
        let cur=this.refinp.current, val = cur.value
        val = val.replaceAll(/[^ \w-]/g,'').substr(0,12)
        cur.value = val
        cur.classList.remove('is-invalid')
    }

    render() {
    return (
        <div className='modal' id='modname'>
            <div className='modal-dialog modal-dialog-centered'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <div className='modal-title text-dark display-4 m-auto'>Enter your name</div>
                    </div>
                    <form className='modal-body d-grid gap-4 justify-content-evenly' id='formname'>
                        <br />
                        <input  type='text' 
                                className='form-control form-control-lg text-primary'
                                ref={this.refinp}
                                onInput={this.update}
                                spellCheck='false'
                                placeholder='name'
                                required 
                        />
                        <div className='invalid-feedback'>Player with this name already exists.</div>
                        <button className='btn btn-lg btn-primary'>GO</button>
                        <br />
                    </form>
                </div>
            </div>
        </div>
    )
    }

    componentDidMount(){
        const frm = document.getElementById('formname')
        frm.onsubmit=this.setName
        this.myModal = new Modal(document.getElementById('modname'),{backdrop:'static',keyboard:false})
        this.myModal.show()
        this.refinp.current.focus()
    }
}

export default Popup;
