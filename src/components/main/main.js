import React from 'react';
import Add from './add-field/addElem';
import ElemList from './elem-list/elemList';
import SearchBar from './search-bar/searchBar';
import Toggle from './toggle-bar/toggleBar';
import Weather from './weather/weather';

class Main extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            text: '',
            sorted: {},
            checkbox: [],
            // isChecked: {
            //     family: false,
            //     job: false,
            //     study: false
            // },
            favorite: false 
            
        }
        
        // this.data = '';
        // this.message();
    }

    
    // message = async () => {
    //     let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=fe8e6afa1048f31c27cad99df09ca475`); 
    //     if (response.ok) {   
    //         console.log(response);
    //         this.data = await response.json();
    //         console.log(this.data);
    //     } 
    // }
    // getData = () => {
    //     this.message();
    // }


    
    componentDidMount() {
        let states = localStorage.getItem('states');
        let state = JSON.parse(states);
        console.log(state);
        let data = state === null ? [] : state;
        this.setState({
            // tasks: state
            tasks: data
        });        
    }
    

    getDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        return `${day}.${month}.${year}`;
    }    
    
    // handleTaskUpdate = (states, staticArr=this.staticTasks) => {
    //     this.setState(states);
    //     this.staticTasks = staticArr;
    // }

    componentDidUpdate() {
        console.log(this.state.tasks);
        localStorage.setItem('states', JSON.stringify(this.state.tasks));  
    }  

    handleTaskUpdate = (states) => {
        
        this.setState(states);             
        
    }

    render(){
         
        return(
            <div>
                <div>
                    Задачи на {this.getDate()}
                    <SearchBar 
                        value={this.state.text}
                        tasks={this.state.tasks}
                        fav={this.state.favorite}
                        isChecked={this.state.isChecked}
                        // checkbox={this.state.checkbox}
                        onTaskUpdate={this.handleTaskUpdate}
                        // static={this.staticTasks}
                    />
                    <Toggle 
                        tasks={this.state.tasks}
                        isChecked={this.state.isChecked}
                        // static={this.staticTasks}   
                        // sorted={this.state.sorted} 
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                    <ElemList 
                        // static={this.staticTasks}  
                        fav={this.state.favorite}
                        isChecked={this.state.isChecked}
                        checkbox={this.state.checkbox}
                        sorted={this.state.sorted} 
                        value={this.state.text}
                        tasks={this.state.tasks}                        
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                    <Add                 
                        // static={this.staticTasks}       
                        tasks={this.state.tasks} 
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                    <Weather />
                </div>
                
            </div>
        );
    }
}

export default Main;