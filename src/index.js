import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, withRouter} from 'react-router-dom';
import * as Redux from 'redux'; //Adding in Redux and React-Redux.
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
// import {reset} from "enzyme/src/configuration";


const authors = [
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia Commons',
        books: [
            'The Adventures of Huckleberry Finn',
            'Life on the Mississippi',
            'Roughing It'
        ]
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource: 'Wikimedia Commons',
        books: ['Heart of Darkness']
    },
    {
        name: 'J.K. Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Daniel Ogren',
        books: ['Harry Potter and the Sorcerers Stone']
    },
    {
        name: 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource: 'Wikimedia Commons',
        imageAttribution: 'Pinguino',
        books: ['The Shining', 'IT']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['David Copperfield', 'A Tale of Two Cities']
    },
    {
        name: 'William Shakespeare',
        imageUrl: 'images/authors/williamshakespeare.jpg',
        imageSource: 'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    }
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks);

    return {
        books: fourRandomBooks,
        author: authors.find((author) =>
        author.books.some((title) =>
            title === answer))
    }
}

/*
    this function is no longer needed due to redux implementation.

function resetState() {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}

 */



// this line will be commented out once the redux implementation is complete.
// let state = resetState();


//   Creating a redux store and a reducer function.

function reducer(
    state = {
        authors,
        turnData: getTurnData(authors),
        highlight: ''}, action) {
    switch (action.type) {
        case 'ANSWER_SELECTED': {
            const isCorrect = state.turnData.author.books.some(
                (book) => book === action.answer);
            return Object.assign(
                {},
                state,
                {highlight: isCorrect ? 'correct' : 'wrong'}
            );
        }
        case 'CONTINUE': {
            return Object.assign(
                {},
                state,
                {
                    highlight: '',
                    turnData: getTurnData(state.authors)
                });
        }
        case 'ADD_AUTHOR': {
            return  Object.assign(
                {},
                state,
                {
                    authors: state.authors.concat([action.author])
                }
            );
        }
        default: return state;
    }
}

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

/*
    this function gets removed due to redux being implemented.

function onAnswerSelected(answer) {
    const isCorrect = state.turnData.author.books.some((book) => book === answer);
    state.highlight = isCorrect ? 'correct' : 'wrong';
    render();
}

 */

/*
    This function is no longer needed once redux has been implemented.

function App() {
    return
        <AuthorQuiz />

}

 */



/*
    this section is no longer needed once redux has been implemented.

const AuthorWrapper = withRouter(({history})  =>
     <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        console.log(authors);
        history.push('/');
    }}/> );

 */




    ReactDOM.render(<BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={AuthorQuiz} />
                <Route path="/add" component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>;
    </BrowserRouter>, document.getElementById('root'));




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
