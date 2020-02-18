import React from 'react';
import Elem from './elem/elem';

class ElemList extends React.Component {

    handleTaskDelete = (id) => {
        let arr = this.props.tasks;
        // arr.splice(index, 1);        

        let index = arr.findIndex(item => item.id === id);
        arr.splice(index, 1);
        this.props.onTaskUpdate({
            tasks: arr,
        });
    }

    // handleTaskChange = (index) => {
    //     let arr = this.props.tasks;
    //     arr[index].isDone = !arr[index].isDone;
    //     console.log(this.props.tasks);
    //     this.props.onTaskUpdate({
    //         tasks: arr,
    //     });
    // }

    handleTaskSetups = (changes, id) => {
        let arr = this.props.tasks;

        let index = arr.findIndex(item => item.id === id);
        // arr.splice(index, 1);

        arr[index] = changes;
        this.props.onTaskUpdate({
            tasks: arr,
        });
    }

    sort(type, elems) {  
        if (Object.keys(type).length !== 0) {
            let isSorted = type.isSorted;

            let direction = isSorted ? 1 : -1;

            let task = elems;
            let arr = task.slice();        
            arr.sort((a, b) => {
            
                if (a[type.type] === b[type.type]) {
                    return 0;
                }

                if (a[type.type] > b[type.type]) {
                    return direction;
                } else {
                    return direction * -1;
                }
            })        
            console.log(arr);
            return arr;        
        } else {
            return this.props.tasks;
        }
    }
   

    render() {
        const list = [];
        const filterText = this.props.value;
        const elems = this.props.tasks;
        const checkbox = this.props.checkbox;
        const fav = this.props.fav;
        // const mas ;
        const sorted = this.props.sorted;
        // console.log(this.props.tasks);
        // const elems1;
        //---------
        // const mas = mas(sorted);
        //---------
        // if (Object.keys(sorted).length !== 0) {
        //     const elems1 = this.sort(sorted);
        // } else {
        //     const elems1 = this.props.tasks;
        // }
        const elems1 = this.sort(sorted, elems);
        elems1.map((item, index) => {

            if (!item.text.includes(filterText)) {
                return;
            } 

            
            if (!checkbox.includes(item.category) && checkbox.length > 0) {
                return;
            } 

            if (!item.fav && fav) {
                return;
            } 

            list.push(
                <Elem 
                    key={item.id} 
                    id={item.id}
                    task={item}
                    index={index} 
                    onTaskDelete={this.handleTaskDelete}
                    onTaskChange={this.handleTaskChange}    
                    onTaskSetups={this.handleTaskSetups}
                />
            );
            
            })
        
        return(
            <div>
                {list}
            </div>
        );
    }
}

export default ElemList;