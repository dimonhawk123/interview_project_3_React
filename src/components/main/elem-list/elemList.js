import React from 'react';
import Elem from './elem/elem';

class ElemList extends React.Component {

    handleTaskDelete = (id) => {
        let arr = this.props.static;
        let index = arr.findIndex(item => item.id === id);
        arr.splice(index, 1);        

        this.props.onTaskUpdate({
            tasks: arr,
            text: ''
        }, arr);
    }

    handleTaskChange = (index) => {
        let arr = this.props.tasks;
        arr[index].isDone = !arr[index].isDone;
        console.log(this.props.static, this.props.tasks);
        this.props.onTaskUpdate({
            tasks: arr,
        });
    }

    render() {

        const elems = this.props.tasks;
        console.log(this.props.static, this.props.tasks);
        const element = elems.map((item, index) => 
            <Elem 
                key={item.id} 
                id={item.id}
                task={item}
                index={index} 
                onTaskDelete={this.handleTaskDelete}
                onTaskChange={this.handleTaskChange}    
            />
        )

        return(
            <div>
                {element}
            </div>
        );
    }
}

export default ElemList;