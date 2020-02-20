import React from 'react';

export default class Toggle extends React.Component {
    constructor(props) {
        super(props);
        // переменные для помощи в определении направления сортировки 
        this.sorted = { isDone: true, fav: true };
        // для выбора цвета стрелок сортировки
        this.color = {
            isDone: {
                true: '#CFD2D9',
                false: '#CFD2D9'
            }, 
            fav: {
                true: '#CFD2D9',
                false: '#CFD2D9'
            }
        }
        
    }

    // сброс параметров сортировки
    reset = () => {
        // обнуление цветов стрелок сортировок
        this.color = {
            isDone: {
                true: '#CFD2D9',
                false: '#CFD2D9'
            }, 
            fav: {
                true: '#CFD2D9',
                false: '#CFD2D9'
            }
        }

        this.props.onTaskUpdate({
            tasks: this.props.tasks,
            text: '',
            sorted: {},                        
        });
    }

    // определение типа сортировки 
    sortType = (type) => {
        let isSorted = this.sorted[type];

        // обнуление цветов стрелок сортировок
        this.color = {
            isDone: {
                true: '#CFD2D9',
                false: '#CFD2D9'
            }, 
            fav: {
                true: '#CFD2D9',
                false: '#CFD2D9'
            }
        }       
        // изменение цвета активной стрелки 
        this.color[type][isSorted] = 'green';
        
        this.props.onTaskUpdate({
            sorted: {
                type: type,
                isSorted: isSorted
            }
        });

        this.sorted[type] = !isSorted;
    }

    render() {
        const isDoneBtnUp = this.color.isDone.false;
        const isDoneBtnDown = this.color.isDone.true;
        const favBtnUp = this.color.fav.false;
        const favBtnDown = this.color.fav.true;

        return(
            <div className="toggleBar__flex">
                <button 
                    className="toggleBar__position button"
                    onClick={() => this.sortType('isDone')}>
                        Сортировка по завершенным
                        <svg className="svg">
                            <polyline points="0,7 5,2 10,7" strokeWidth="2" stroke={isDoneBtnUp} fill="transparent"/>
                            <polyline points="0,11 5,16 10,11" strokeWidth="2" stroke={isDoneBtnDown} fill="transparent"/>
                        </svg>
                </button>
                <button 
                    className="toggleBar__position button"
                    onClick={() => this.sortType('fav')}>
                        Сортировка по избранным
                        <svg className="svg">
                            <polyline points="0,7 5,2 10,7" strokeWidth="2" stroke={favBtnUp} fill="transparent"/>
                            <polyline points="0,11 5,16 10,11" strokeWidth="2" stroke={favBtnDown} fill="transparent"/>
                        </svg>
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