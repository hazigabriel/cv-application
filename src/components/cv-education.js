import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment'

class Education extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            enableEducation: false,
            educationArr: [],
            currentEd: {
                id: 0,
                institution: '',
                degree: '',
                city: '',
                startDate: new Date(),
                endDate: new Date(),
                mentions: ''
            }, 
         };

        this.renderPreviewMode = this.renderPreviewMode.bind(this)
        this.renderEditMode = this.renderEditMode.bind(this)
        this.enableEducation = this.enableEducation.bind(this)
        this.handleStartDate = this.handleStartDate.bind(this);
        this.handleEndDate = this.handleEndDate.bind(this);
        this.updateField = this.updateField.bind(this);
        this.addNewEducation = this.addNewEducation.bind(this);
        this.renderEducationItem = this.renderEducationItem.bind(this)
        this.deleteEducationItem = this.deleteEducationItem.bind(this)
        this.deleteEducationState = this.deleteEducationState.bind(this)
        this.swiftEducationItemNumber = this.swiftEducationItemNumber.bind(this)
     }
    
    renderPreviewMode(){
        if(this.state.enableEducation == true) {
            return (
                <section className="cvEducation alignIcon">
                    <div className="sectionDescription">
                        <h5>Education</h5>
                    </div>
                    <div className="sectionContent">
       
                        {this.state.educationArr.map((educationItem, key) => this.renderEducationItem(educationItem, key) )} 
                    
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
         if(this.state.enableEducation == true) {
            return (
                <section className="cvEducation alignIcon">
                    <div className="sectionDescription">
                        <h5>Education</h5>
                    </div>
                    <div className="sectionContent">
       
                        {this.state.educationArr.map((educationItem, key) => this.renderEducationItem(educationItem, key) )} 
                         
                        <div className="addEducationEntry">
                            <label className="textareaLabel">Institution name</label>
                            <textarea className="institution" rows="1" onChange={this.updateField} placeholder="Add institution" value={this.state.currentEd.institution}/>
                            <label className="textareaLabel">Degree</label>
                            <textarea className="degree" rows="1" onChange={this.updateField} placeholder="Degree" value={this.state.currentEd.degree}/>
                            <label className="textareaLabel">City</label>
                            <textarea className="city" rows="1" onChange={this.updateField}  placeholder="City" value={this.state.currentEd.city}/>
                            <div className="educationDatepickerWrap">
                                <div className="startDate">
                                    <label className="textareaLabel">From:</label>                         
                                    <DatePicker
                                        selected={ this.state.currentEd.startDate }
                                        onChange={ this.handleStartDate }
                                        dateFormat="MMMM/yyyy"
                                        showMonthYearPicker
                                        showFullMonthYearPicker
                                    />
                                </div>
                                <div>
                                    <label className="textareaLabel">Until:</label>                         
                                    <DatePicker
                                        selected={ this.state.currentEd.endDate }
                                        onChange = {this.handleEndDate}
                                        dateFormat="MMMM/yyyy"
                                        showMonthYearPicker
                                        showFullMonthYearPicker
                                    />
                                </div>
                            </div>
                            <label className="textareaLabel">Mentions</label>
                            <textarea className="mentions" rows="2" onInput={autoHeight} onChange={this.updateField}  placeholder="Mentions" value={this.state.currentEd.mentions}/>
                            <br/>
                            <div className="alignIcon">
                                <p>Add education</p>
                                <FontAwesomeIcon icon={faPlusSquare} onClick={this.addNewEducation}/>
                            </div>
                            <div className="deleteItemWrapper"> 
                                <p>Delete education</p>
                                <FontAwesomeIcon icon={faTrash} onClick={this.deleteEducationState}/>
                            </div>
                        </div>
                </div>
                </section>
            )
        } else {
            return (
                <section className="cvEducation alignIcon">
                    <p className="descriptionParagraph">Add education</p>
                    <FontAwesomeIcon icon={faPlusSquare} onClick={this.enableEducation}/>
                </section>
            )
        } 
        
    }
    enableEducation() {
        this.setState({
            enableEducation: true
        })
    }
    handleStartDate(date) { 
          this.setState({
            currentEd: {
                id: this.state.currentEd.id,
                institution: this.state.currentEd.institution,
                degree: this.state.currentEd.degree,
                city: this.state.currentEd.city,
                startDate: date,
                endDate: this.state.currentEd.endDate,
                mentions: this.state.currentEd.mentions

            }
        })
     }
    handleEndDate(date) { 
         this.setState({
            currentEd: {
                id: this.state.currentEd.id,
                institution: this.state.currentEd.institution,
                degree: this.state.currentEd.degree,
                city: this.state.currentEd.city,
                startDate: this.state.currentEd.startDate,
                endDate: date,
                mentions: this.state.currentEd.mentions
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
        let temp = {...this.state.currentEd};
         
        Object.keys(temp).map( child => {
            temp.id = this.state.educationArr.length;

            if(toUpdate == 'institution') {
                temp.institution = newValue
            } else if (toUpdate == "degree"){
                temp.degree = newValue
            } else if (toUpdate == 'city'){
                temp.city = newValue
            } else if(toUpdate == "mentions") {
                temp.mentions = newValue
            }
        })
        this.setState({
            currentEd: temp
        })
     }
    updateField(e) {
        this.updateState(e.target.className, e.target.value);
    }
    addNewEducation(){
        const currentEd = this.state.currentEd;
        if(currentEd.institution != '' && currentEd.degree != '' && currentEd.city != '' ) {
            this.setState({
                educationArr: [...this.state.educationArr, currentEd], 
                currentEd: {
                    id: this.state.educationArr.length,
                    institution: '',
                    degree: '',
                    city: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    mentions: ''
                },  
             })
        } else {
            alert("Please input the required fields(Institution, Degree and City where you studied)")
        }
     }
    renderEducationItem(item, key){
        let icon

        if(this.props.mode == "edit") {
            icon =  <div className="deleteItemWrapper"> 
                        <p>Delete education item</p>
                        <FontAwesomeIcon icon={faTrash} onClick={this.deleteEducationItem}/>
                    </div>
        } else {
            icon = ''
        }

        return (
            <div className='educationItem' id={item.id} key={item.id}>
                <h4>{item.institution}</h4>
                <p><i>{item.degree}</i></p>
                <p>{item.city}</p> 
                <p>{Moment(item.startDate).format('MMMM YYYY')} - {Moment(item.endDate).format('MMMM YYYY')}</p>
                <p>{item.mentions}</p>
                {icon}
            </div>
        ) 
    }

    deleteEducationItem(e) {
        let elementId = e.target.parentNode.parentNode.parentNode.id;
        let newEducationItems = this.state.educationArr;

         
        newEducationItems.splice(elementId, 1)
         this.setState({
            educationArr: newEducationItems
        })
        
        //after deleting an item, the Id's set up initially would remaing the same, for example: we have item0, item1, item2, we delete item1, we are left 
        //with item0 and item2, upon trying to delete item2, the delete button would ask the delete function to delete the item with the id of 2, but
        //since we've deleted item 1, our array has only 2 items, item0 and item1, the following functions iterates over the array's items, and updates the id accordingly
        this.swiftEducationItemNumber()

    }
    deleteEducationState() {
        if( window.confirm("Are you sure you want to delete all Education items submitted?") ){
            this.setState({
                enableEducation: false,
                educationArr: [],
                currentEd: {
                    id: 0,
                    institution: '',
                    degree: '',
                    city: '',
                    startDate: new Date(),
                    endDate: new Date(),
                    mentions: ''
                }, 
            })
        }
    }
       
    swiftEducationItemNumber() {
        let number = 0;
        let newEducationItems = this.state.educationArr;
        let finalEducationItems = []

        this.setState({
            educationArr: []
             
        })
         
        newEducationItems.map(currentItem => {
            let newItem = currentItem;
            newItem.id = number;
            finalEducationItems = [...finalEducationItems, currentItem] 
 
            number++
            
        })
        this.setState({
            educationArr: finalEducationItems
        })

          
    }
    render(){
        return (
            this.renderMode(this.props.mode)        
        )
    }
}
export default Education