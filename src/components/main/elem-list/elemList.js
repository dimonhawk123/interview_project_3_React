import React from 'react';
import Elem from './elem/elem';

class ElemList extends React.Component {

    render() {

        const elems = this.props.tasks;
        const element = elems.map((item, index) => 
            <Elem 
                key={item.id} 
                id={item.id}
                task={item}
                index={index} 
                onTaskDelete={this.props.onTaskDelete}
                onTaskChange={this.props.onTaskChange}    
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