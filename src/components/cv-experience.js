import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment'

class Experience extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            enableExperience: false,
            experienceArr: [],
            currentExp: {
                id: 0,
                company: '',
                jobTitle: '',
                city: '',
                startDate: new Date(),
                endDate: new Date(),
                mentions: ''
            }, 
         };

        this.renderPreviewMode = this.renderPreviewMode.bind(this)
        this.renderEditMode = this.renderEditMode.bind(this)
        this.enableExperience = this.enableExperience.bind(this)
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.updateField = this.updateField.bind(this);
        this.addNewExperience = this.addNewExperience.bind(this);
        this.renderExperienceItem = this.renderExperienceItem.bind(this)
        this.deleteExperienceItem = this.deleteExperienceItem.bind(this)
        this.deleteExperienceState = this.deleteExperienceState.bind(this);
        this.swiftExperienceItemNumber = this.swiftExperienceItemNumber.bind(this)
     }
    
    renderPreviewMode(){
        if(this.state.enableExperience == true) {
            return (
                <section className="cvExperience alignIcon">
                    <div className="sectionDescription">
                        <h5>Experience</h5>
                    </div>
                    <div className="sectionContent">
       
                        {this.state.experienceArr.map((experienceItem, key) => this.renderExperienceItem(experienceItem, key) )} 
                    
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
        let autoHeight = function() {
            let element = document.querySelector('.mentions');
            element.style.height = "5px";
            element.style.height = (element.scrollHeight)+"px";
        }       
         if(this.state.enableExperience == true) {
            return (
                <section className="cvExperience alignIcon">
                    <div className="sectionDescription">
                        <h5>Experience</h5>
                    </div>
                    <div className="sectionContent">
       
                        {this.state.experienceArr.map((experienceItem, key) => this.renderExperienceItem(experienceItem, key) )} 
                         
                        <div className="addExperienceEntry">
                            <label className="textareaLabel">Company name*</label>
                            <textarea className="company" rows="1" onChange={this.updateField} placeholder="Add company" value={this.state.currentExp.company}/>
                            <label className="textareaLabel">Job title*</label>
                            <textarea className="jobTitle" rows="1" onChange={this.updateField} placeholder="Job title" value={this.state.currentExp.jobTitle}/>
                            <label className="textareaLabel">City</label>
                            <textarea className="city" rows="1" onChange={this.updateField}  placeholder="City" value={this.state.currentExp.city}/>
                            <div className="experienceDatepickerWrap">
                                <div className="startDate">
                                    <label className="textareaLabel">From:</label>                         
                                    <DatePicker
                                        selected={ this.state.currentExp.startDate }
                                        onChange={ this.handleStartDate }
                                        dateFormat="MMMM/yyyy"
                                        showMonthYearPicker
                                        showFullMonthYearPicker
                                    />
                                </div>
                                <div>
                                    <label className="textareaLabel">Until:</label>                         
                                    <DatePicker
                                        selected={ this.state.currentExp.endDate }
                                        onChange = {this.handleEndDate}
                                        dateFormat="MMMM/yyyy"
                                        showMonthYearPicker
                                        showFullMonthYearPicker
                                    />
                                </div>
                            </div>
                            <label className="textareaLabel">Mentions</label>
                            <textarea className="mentions" rows="2" onInput={autoHeight} onChange={this.updateField}  placeholder="Mentions" value={this.state.currentExp.mentions}/>
                            <br/>
                            <div className="alignIcon">
                                <p>Add experience</p>
                                <FontAwesomeIcon icon={faPlusSquare} onClick={this.addNewExperience}/>
                            </div>
                            <div className="deleteItemWrapper"> 
                                <p>Delete experience</p>
                                <FontAwesomeIcon icon={faTrash} onClick={this.deleteExperienceState}/>
                            </div>
                        </div>
                </div>
                </section>
            )
        } else {
            return (
                <section className="cvExperience alignIcon">
                    <p className="descriptionParagraph">Add Experience</p>
                    <FontAwesomeIcon icon={faPlusSquare} onClick={this.enableExperience}/>
                </section>
            )
        } 
        
    }
    enableExperience() {
        this.setState({
            enableExperience: true
        })
    }
    handleStartDate(date) { 
          this.setState({
            currentExp: {
                id: this.state.currentExp.id,
                company: this.state.currentExp.company,
                jobTitle: this.state.currentExp.jobTitle,
                city: this.state.currentExp.city,
                startDate: date,
                endDate: this.state.currentExp.endDate,
                mentions: this.state.currentExp.mentions

            }
        })
     }
    handleEndDate(date) { 
         this.setState({
            currentExp: {
                id: this.state.currentExp.id,
                company: this.state.currentExp.company,
                jobTitle: this.state.currentExp.jobTitle,
                city: this.state.currentExp.city,
                startDate: this.state.currentExp.startDate,
                endDate: date,
                mentions: this.state.currentExp.mentions
            }
        })
     }
    
    renderMode(mode) {
        if(mode === 'edit') {
            return <this.renderEditMode />
        } else {
            return <this.renderPreviewMode />
        }
    }

    updateState(toUpdate, newValue) {
        let temp = {...this.state.currentExp};
         
        Object.keys(temp).map( child => {
            temp.id = this.state.experienceArr.length;

            if(toUpdate == 'company') {
                temp.company = newValue
            } else if (toUpdate == "jobTitle"){
                temp.jobTitle = newValue
            } else if (toUpdate == 'city'){
                temp.city = newValue
            } else if(toUpdate == "mentions") {
                temp.mentions = newValue
            }
        })
        this.setState({
            currentExp: temp
        })
     }
    updateField(e) {
        this.updateState(e.target.className, e.target.value);
    }
    addNewExperience(){
        const currentExp = this.state.currentExp;
        if(currentExp.company != '' && currentExp.jobTitle != '' && currentExp.city != '' ) {
            this.setState({
                experienceArr: [...this.state.experienceArr, currentExp], 
                currentExp: {
                    id: this.state.experienceArr.length,
                    company: '',
                    jobTitle: '',
                    city: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    mentions: ''
                },  
             })
        } else {
            alert("Please input the required fields(company, job title)")
        }
     }
    renderExperienceItem(item, key){
        let icon

        if(this.props.mode == "edit") {
            icon =  <div className="deleteItemWrapper"> 
                        <p>Delete experience item</p>
                        <FontAwesomeIcon icon={faTrash} onClick={this.deleteExperienceItem}/>
                    </div>
        } else {
            icon = ''
        }

        return (
            <div className='experienceItem' id={item.id} key={item.id}>
                <h4>{item.company}</h4>
                <p><i>{item.jobTitle}</i></p>
                <p>{item.city}</p> 
                <p>{Moment(item.startDate).format('MMMM YYYY')} - {Moment(item.endDate).format('MMMM YYYY')}</p>
                <p>{item.mentions}</p>
                {icon}
            </div>
        ) 
    }

    deleteExperienceItem(e) {
        let elementId = e.target.parentNode.parentNode.parentNode.id;
        let newExperienceItems = this.state.experienceArr;

         
        newExperienceItems.splice(elementId, 1)
         this.setState({
            experienceArr: newExperienceItems
        })
        
        //after deleting an item, the Id's set up initially would remaing the same, for example: we have item0, item1, item2, we delete item1, we are left 
        //with item0 and item2, upon trying to delete item2, the delete button would ask the delete function to delete the item with the id of 2, but
        //since we've deleted item 1, our array has only 2 items, item0 and item1, the following functions iterates over the array's items, and updates the id accordingly
        this.swiftExperienceItemNumber()

    }
    deleteExperienceState() {
        if( window.confirm("Are you sure you want to delete all Experience items submitted?") ){
            this.setState({
                enableExperience: false,
                experienceArr: [],
                currentExp: {
                    id: 0,
                    company: '',
                    jobTitle: '',
                    city: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    mentions: ''
                }, 
            })
        }
    }   
    swiftExperienceItemNumber() {
        let number = 0;
        let newExperienceItems = this.state.experienceArr;
        let finalExperienceItems = []

        this.setState({
            experienceArr: []
             
        })
         
        newExperienceItems.map(currentItem => {
            let newItem = currentItem;
            newItem.id = number;
            finalExperienceItems = [...finalExperienceItems, currentItem] 
 
            number++
            
        })
        this.setState({
            experienceArr: finalExperienceItems
        })

          
    }
    render(){
        return (
            this.renderMode(this.props.mode)        
        )
    }
}
export default Experience