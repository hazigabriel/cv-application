import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

class Summary extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           enableSummary: false,
           summaryTextarea: ''
        };

        this.renderPreviewMode = this.renderPreviewMode.bind(this)
        this.renderEditMode = this.renderEditMode.bind(this)
        this.renderMode = this.renderMode.bind(this)
        this.enableSummary = this.enableSummary.bind(this)
        this.deleteSummary = this.deleteSummary.bind(this)
        this.updateState = this.updateState.bind(this)
        this.updateField = this.updateField.bind(this)
    }
    renderPreviewMode(){
        if(this.state.enableSummary == true && this.state.summaryTextarea != '') {
            return (
                <section className="cvSummary alignIcon">
                    <div className="sectionDescription">
                        <h5>Summary</h5>
                    </div>
                    <div className="sectionContent">
                        <p>{this.state.summaryTextarea}</p>
                    </div>
                </section>
            )
        } else {
            
            return (
                 ''
            )
        } 
    }
    renderEditMode(){
        //we use this function to auto adjust the vertical height of the textarea
        let autoHeight = function() {
            let element = document.querySelector('.summaryTextarea');
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";

        }

        if(this.state.enableSummary == true) {
            return (
                <section className="cvSummary alignIcon">
                    <div className="sectionDescription">
                        <h5>Summary</h5>
                    </div>
                    <div className="sectionContent">
                        <textarea className="summaryTextarea"   type="text" placeholder="Tell me about yourself!" onInput={autoHeight} onChange={this.updateField} value={this.state.summaryTextarea} />
                        <div className="deleteItemWrapper  ">
                            <p>Delete summary</p> <FontAwesomeIcon icon={faTrash} onClick={this.deleteSummary}/>
                        </div>
                    </div>
                </section>
            )
        } else {
            return (
                <section className="cvSummary alignIcon">
                    <p className="descriptionParagraph">Add summary</p>
                    <FontAwesomeIcon icon={faPlusSquare} onClick={this.enableSummary}/>
                </section>
            )
        } 
        
    }
    enableSummary(){
         this.setState({
            enableSummary: true
        })
    }

    deleteSummary(){
        if( window.confirm("Are you sure you want to delete your summary and its content?") == true){
            this.setState({
                enableSummary: false,
                summaryTextarea: ''
            })
        }
        
    }
    renderMode(mode) {
        if(mode === 'edit') {
            return <this.renderEditMode />
        } else {
            return <this.renderPreviewMode />
        }
    }

    updateState(summaryTextarea, newValue) {
        this.setState({
            [summaryTextarea]: newValue
        })
    }

    updateField(e) {
        this.updateState(e.target.className, e.target.value);
        // console.log(e.target.className)
        // console.log(this.state)
         
    }

    render(){
        return (
            this.renderMode(this.props.mode)        
        )
    }
}
export default Summary