import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        // this.type = {
        //     job: false,
        //     family: false,
        //     study: false
        // };
        this.checkbox = [];

    }

    handleTaskSearch = (event) => {

        // let tasks = this.props.static;
        // let result = tasks.filter(item =>
        //     item.text.includes(event.target.value)
        // );

        this.props.onTaskUpdate({
            tasks: this.props.tasks,
            text: event.target.value
        });

    }

    // handleTaskSearch = (event) => {

    //     let tasks = this.props.static;
    //     let result = tasks.filter(item =>
    //         item.text.includes(event.target.value)
    //     );

    //     this.props.onTaskUpdate({
    //         tasks: result, 
    //         text: event.target.value
    //     });

    // }

    // handleTaskToggle = (event) => {
    //     let type = event.target.value; 

    //     if (!this.type[type]) {
    //         this.checkbox.push(type);
    //     } else {
    //         this.checkbox.splice(this.checkbox.findIndex(item=>item === type),1);
    //     }

    //     let tasks = this.props.tasks;
    //     let result = tasks.filter(item =>
    //         item.text.includes(event.target.value)
    //     );


    //     this.type[type] = !this.type[type];
        

    //     this.props.onTaskUpdate({
    //         tasks: result, 
    //         text: event.target.value
    //     });
        
    // }

    handleCheckBox = (event) => {
        let value = event.target.value;
        // let checked = this.props.isChecked.value;
        if (event.target.checked) {
            this.checkbox.push(value);            
        } else {
            let index = this.checkbox.findIndex(item => item === value);
            this.checkbox.splice(index, 1);
        }
        this.props.onTaskUpdate({
            checkbox: this.checkbox,
            // isChecked: {
            //     value: !checked
            // }            
        })
    } 

    handleFavorite= (event) => {

        this.props.onTaskUpdate({
            favorite: event.target.checked              
        })
    }

    render() {

        return(
            <div>
                <input type="text" 
                    value={this.props.value} 
                    placeholder="Поиск задач"
                    onChange={this.handleTaskSearch}
                />
                <input type="checkbox" value="family" onChange={this.handleCheckBox}
                    // checked = {this.props.isChecked.family}
                /> Семья 
                <input type="checkbox" value="job" onChange={this.handleCheckBox} 
                    //checked = {this.props.isChecked.job}
                /> Работа
                <input type="checkbox" value="study" onChange={this.handleCheckBox}
                    //checked = {this.props.isChecked.study}
                /> Учёба
                <input type="checkbox" value="fav" onChange={this.handleFavorite} 
                    checked={this.props.fav}    
                /> Избранное
            </div>
        );
    }
}