import React from 'react';
import Add from './add-field/addElem';
import ElemList from './elem-list/elemList';
import SearchBar from './search-bar/searchBar';
import Toggle from './toggle-bar/toggleBar';

class Main extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            text: ''
        }
        this.staticTasks = [];
    }

    getDate = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        return `${day}.${month}.${year}`;
    }    
    
    handleTaskUpdate = (states, staticArr=this.staticTasks) => {
        this.setState(states);
        this.staticTasks = staticArr;
    }

    render(){
        return(
            <div>
                <div>
                    Задачи на {this.getDate()}
                    <SearchBar 
                        value={this.state.text}
                        tasks={this.state.tasks}
                        onTaskUpdate={this.handleTaskUpdate}
                        static={this.staticTasks}
                    />
                    <Toggle 
                        tasks={this.state.tasks}
                        static={this.staticTasks}    
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                    <ElemList 
                        static={this.staticTasks}  
                        tasks={this.state.tasks}                        
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                    <Add                 
                        static={this.staticTasks}        
                        onTaskUpdate={this.handleTaskUpdate}
                    />
                </div>
                
            </div>
        );
    }
}

export default Main;