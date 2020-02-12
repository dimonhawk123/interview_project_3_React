import React from 'react';

class Elem extends React.Component {
    

    handleTaskDelete = () => {
        this.props.onTaskDelete(this.props.id);
    }

    handleTaskDone = () => {     
        this.props.onTaskChange(this.props.index);        
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