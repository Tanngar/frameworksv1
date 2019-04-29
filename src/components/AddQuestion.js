import React, {Component} from 'react';

export default class AddAnswer extends Component {
    constructor(props) {
        super(props);

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: String,
            description: String
        }
    }

    onTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    onDescriptionChange(e) {
        this.setState({
            description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:8080/questions/add-question/',{
            method: 'POST',
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description
            }),
            headers: {"Content-Type": "application/json"}
        }).then(res=> console.log(res.data))

        console.log(this.state._id);
        this.props.history.push("/");
        window.location.reload()
    }

    render() {
        return (
            <div>
                <h3>Ask a question</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Question title:</label>
                        <input  type="text"
                                name="title"
                                className="form-control"
                                placeholder="Title of your question..."
                                onChange={this.onTitleChange}
                                required
                        />
                        <label>Question description:</label>
                        <input  type="text"
                                name="description"
                                className="form-control"
                                placeholder="Description..."
                                onChange={this.onDescriptionChange}
                                required
                        />
                        <input type='submit' value='Confirm'/>
                    </div>
                </form>
            </div>
        )
    }

}