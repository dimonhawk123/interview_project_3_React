import React from 'react';

class Elem extends React.Component {
    

    // handleTaskDelete = () => {
    //     this.props.onTaskDelete(this.props.index);
    // }
    handleTaskDelete = () => {
        this.props.onTaskDelete(this.props.id);
    }

    handleTaskDone = () => {        
        let task = this.props.task;
        task.isDone = !task.isDone;
        this.props.onTaskChange(task, this.props.index);
        
    } 

    render() {
        const done = this.props.task.isDone;
        const text = done ? 
        <span style={{textDecoration: 'line-through'}}>{this.props.task.text}</span> :
        this.props.task.text;
        const textBtn = done ? 'Не выполнено' : 'Выполнено';
        return(
            <div>
                {text}                
                <button onClick={this.handleTaskDone}>{textBtn}</button>
                <button onClick={this.handleTaskDelete}>Удалить</button>
            </div>
        );
    }

}

export default Elem;