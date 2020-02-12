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

    handleTaskAdd = (task) => {
        const elem = {
            text: task,
            id: Date.now(),
            category: '',
            fav: false,
            isDone: false
        }
        this.staticTasks = this.staticTasks.concat(elem);
        console.log(this.staticTasks);
        this.setState({
            tasks: this.staticTasks,
            text: ''
        })        
    }

    // handleTaskDelete = (index) => {
    //     let arr = this.staticTasks;
    //     arr.splice(index, 1);
    //     this.setState({
    //         tasks: arr
    //     })
    // }
    handleTaskDelete = (id) => { 
        let arr = this.staticTasks;
        let index = arr.findIndex(item => item.id === id);
        arr.splice(index, 1);
        console.log(this.staticTasks, arr);
        this.setState({
            tasks: arr,
            text: ''
        })
    }

    handleTaskChange = (change, index) => {
        let arr = this.state.tasks;
        arr[index] = change;
        this.setState({
            tasks: arr
        })
        console.log(this.staticTasks);
    }

    handleTaskSearch = (tasks, value) => {
        this.setState({
            tasks: tasks,
            text: value
        })
    }

    handleTaskSort = (tasks, value) => {
        this.setState({
            tasks: tasks,
            text: value
        });
    }

    render(){
        return(
            <div>
                <div>
                    Задачи на {this.getDate()}
                    <SearchBar 
                        value={this.state.text}
                        tasks={this.state.tasks}
                        onTaskSearch={this.handleTaskSearch}
                        static={this.staticTasks}
                    />
                    {/* <Toggle 
                        tasks={this.state.tasks}
                        static={this.staticTasks}    
                        onTaskSort={this.handleTaskSort}
                    /> */}
                    <ElemList 
                        tasks={this.state.tasks}
                        onTaskDelete={this.handleTaskDelete}
                        onTaskChange={this.handleTaskChange}
                    />
                    <Add onTaskAdd={this.handleTaskAdd} />
                </div>
                
            </div>
        );
    }
}

export default Main;