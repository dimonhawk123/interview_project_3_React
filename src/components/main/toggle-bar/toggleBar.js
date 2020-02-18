import React from 'react';

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.sorted = { isDone: true, fav: true };
    }

    // sort(type) {
        
    //     let isSorted = this.sorted[type];

    //     let direction = isSorted ? 1 : -1;

    //     let task = this.props.tasks;
    //     let arr = task.slice();        
    //     arr.sort((a, b) => {
        
    //         if (a[type] === b[type]) {
    //             return 0;
    //         }

    //         if (a[type] > b[type]) {
    //             return direction;
    //         } else {
    //             return direction * -1;
    //         }
    //     })

        
    //     this.sorted[type] = !isSorted;

    //     console.log(arr, this.props.static);
    //     this.props.onTaskUpdate({
    //         tasks: arr
    //     });
    // }

    reset = () => {
        this.props.onTaskUpdate({
            tasks: this.props.tasks,
            text: '',
            sorted: {},
            // checkbox: [],            
        });
    }

    sortType = (type) => {
        let isSorted = this.sorted[type];

        this.props.onTaskUpdate({
            sorted: {
                type: type,
                isSorted: isSorted
            }
        });

        // let direction = isSorted ? 1 : -1;

        this.sorted[type] = !isSorted;
    }

    render() {

        return(
            <div>
                <button onClick={() => this.sortType('isDone')}>Сортировка по завершенным</button>
                <button onClick={() => this.sortType('fav')}>Сортировка по избранным</button>
                <button onClick={this.reset}>Сброс</button>
            </div>
        );
    }
}