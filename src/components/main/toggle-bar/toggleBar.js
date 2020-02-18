import React from 'react';

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        // переменные для помощи в определении направления сортировки 
        this.sorted = { isDone: true, fav: true };
    }

    // сброс параметров сортировки
    reset = () => {
        this.props.onTaskUpdate({
            tasks: this.props.tasks,
            text: '',
            sorted: {},                        
        });
    }

    // определение типа сортировки 
    sortType = (type) => {
        let isSorted = this.sorted[type];

        this.props.onTaskUpdate({
            sorted: {
                type: type,
                isSorted: isSorted
            }
        });

        this.sorted[type] = !isSorted;
    }

    render() {

        return(
            <div>
                <button 
                    className="toggleBar__position button"
                    onClick={() => this.sortType('isDone')}>
                        Сортировка по завершенным
                </button>
                <button 
                    className="toggleBar__position button"
                    onClick={() => this.sortType('fav')}>
                        Сортировка по избранным
                </button>
                <button
                    className="toggleBar__position button"
                    onClick={this.reset}>
                        Сброс
                </button>
            </div>
        );
    }
}