import React from 'react';
import "./AddAuthorForm.css";

class AuthorForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageUrl: '',
            books: [],
            bookTmp: ''
        };

        this.onFieldChange = this.onFieldChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddBook = this.handleAddBook.bind(this);
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value});
    };

    handleSubmit(event) {
        event.preventDefault();
        this.props.onAddAuthor(this.state);
    }

    handleAddBook(event) {
        this.setState({
            books: this.state.books.concat([this.state.bookTmp]),
            bookTmp: ''
        })
    }

    render() {
        return <form onSubmit={this.handleSubmit}>
            <div className="AddAuthorForm_input">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onFieldChange}/>
            </div>
            <div className="AddAuthorForm_input">
                <label htmlFor="imgUrl">Image URL</label>
                <input
                    type="text"
                    name="imageUrl"
                    value={this.state.imageUrl}
                    onChange={this.onFieldChange}/>
            </div>
            <div className="AddAuthorForm_input">
                <label htmlFor="bookTmp">Books</label>
                {this.state.books.map((book) => <p key={book}>{book}</p>)}
                <input
                    type="text"
                    name="bookTmp"
                    value={this.state.bookTmp}
                    onChange={this.onFieldChange}/>
                <input type="button" value="Add Book" onClick={this.handleAddBook}/>
            </div>
            <input type="submit" value="Add" />
        </form>
    }
}


function AddAuthorForm({match, onAddAuthor}) {
    return <div className="AddAuthorForm">
        <h1>Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>
}


export default AddAuthorForm;