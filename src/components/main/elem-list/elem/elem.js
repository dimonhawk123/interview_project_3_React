import React from 'react';
import CategoryBlock from './info-bar/categoryBlock';

class Elem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }

    handleTaskDelete = () => {
        this.props.onTaskDelete(this.props.id);
    }

    handleTaskDone = () => {     
        this.props.onTaskChange(this.props.index);        
    } 

    blockAppear = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        const done = this.props.task.isDone;
        const text = done ? 
        <span style={{textDecoration: 'line-through'}}>{this.props.task.text}</span> :
        this.props.task.text;
        const textBtn = done ? 'Не выполнено' : 'Выполнено';
        const block = <CategoryBlock
                            key={this.props.id}
                            task={this.props.task}
                            onTaskSetups={this.props.onTaskSetups}
                            index={this.props.index}
                        />
        return(
            <div style={{position: 'relative', marginBottom:'40px'}}>
                <div>
                    <span >{text}</span>                
                    <button onClick={this.handleTaskDone}>{textBtn}</button>
                    <button onClick={this.handleTaskDelete}>Удалить</button>
                    <button onClick={this.blockAppear}>Настройка</button>
                </div>
                <div style={{position: 'absolute', left: '500px', top: '0px'}}>
                    {this.state.visible && block}                    
                </div>
            </div>
        );
    }

}

export default Elem;