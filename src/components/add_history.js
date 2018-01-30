import React, {Component} from 'react';

class History extends Component {

    render(){
        console.log(this.props);
        const {guessArray}= this.props;
        const list= guessArray.map((item,index)=>{
            return <li key ={index} className='justify-content-center list-group-item list-group-item-warning'> Previous Guess | {item}</li>
        });
        return(
            <ul className='list-group'>
                <li className='justify-content-center list-group-item list-group-item-danger'> Number of Guesses | {this.props.guessCounter}</li>
                {list}
            </ul>
        )
    }

}
export default History;