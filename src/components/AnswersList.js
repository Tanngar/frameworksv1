import React, { Component } from 'react';

class AnswersList extends Component {

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: String,
            answers: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:8080/answers/'+ this.props.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ answers: data })
            })
    }
    //
    // updateRatingUI(id){
    //     if(document.querySelector('#'+id).textContent == 'Like'){
    //         document.querySelector('#rating-' + id).textContent++;
    //     } else {
    //         document.querySelector('#rating-' + id).textContent--;
    //     }
    //
    // }
    //
    // toggleButtonText(button){
    //     if(button.textContent == 'Like') {
    //         button.textContent = 'Dislike';
    //     } else {
    //         button.textContent = 'Like';
    //     }
    // }
    //
    // updateRating(button){
    //     console.log(button);
    //     let buttonId = button.props.id;
    //     console.log(buttonId);
    //     this.updateRatingUI(buttonId);
    //     this.toggleButtonText(buttonId);
    //     let action = button.textContet.trim();
    //
    //     axios.post('/update-rating/' + buttonId, { action: action });
    // }


    onSubmit(e) {
        e.preventDefault();
        let button = e.target;
        let action;

        if(button.innerHTML == 'LIKE') {
            action = 'like-answer';
        } else {
            action = 'dislike-answer';
        }
        fetch('http://localhost:8080/answers/' + action + '/' + e.target.dataset.answerid, {
            method: 'POST',
            body: JSON.stringify({
                answerId: e.target.dataset.answerid
            }),
            headers: {"Content-Type": "application/json"}
        })
            .then(res => console.log(res))
            .catch(e => console.log(e));

        window.location.reload()
    }

    render() {
        return (
            <div>
                <h3>Answers:</h3>
                <div>
                    {this.state.answers.map((answer) => (
                        <div  className="media-body">
                            <p>{answer.text}</p>
                            <p id={'rating-'+answer._id}><b>Likes: </b>{answer.rating}</p>
                            {/*<form ref={answer._id} id={answer._id} onSubmit={this.onSubmit(answer._id)}>*/}
                                {/*<input type="submit" value='LIKE'/>*/}
                            {/*</form>*/}
                            <button data-answerId={answer._id} onClick={this.onSubmit}>LIKE</button>
                            <button data-answerId={answer._id} onClick={this.onSubmit}>DISLIKE</button>

                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default AnswersList

