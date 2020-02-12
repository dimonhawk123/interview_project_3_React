import React from 'react';

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.sorted = { isDone: true, fav: true };
    }

    sort(type) {
        
        let isSorted = this.sorted[type];

        let direction = isSorted ? 1 : -1;

        const arr = this.props.tasks;
        console.log(arr);
        arr.sort((a,b) => {
            if (a[type] === b[type]) {
                return 0;
            }

            if (a[type] > b[type]) {
                return direction;
            } else {
                return direction * -1;
            }
        })

        console.log(arr);
        this.sorted[type] = !isSorted;

        
        this.props.onTaskSort(arr, '');
    }

    reset = () => {
        this.props.onTaskSort(this.props.static, '');
        console.log(this.props.static);
    }

    render() {

        return(
            <div>
                <button onClick={() => this.sort('isDone')}>Сортировка по завершенным</button>
                <button onClick={this.reset}>Сброс</button>
            </div>
        );
    }
}