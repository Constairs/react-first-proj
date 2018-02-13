let photos = ['images/1.jpg','images/2.jpg', 'images/3.jpg', 'images/4.jpg'];

// ReactDOM.render(
//     <App>
//         <Photos photos=photos />
//         <lastNews />
//         <Comments />
//     </App>,
//     document.getElementById('root')
// );

let News = React.createClass({
    render: function() {
        return (
            <div className="news">
                К Сожалению новостей нет.
            </div>
        );
    }
});

let Comments = React.createClass({
    render: function() {
        return (
            <div className="comments">
                Комментариев пока нет.
            </div>
        );
    }
});

let App = React.createClass({
    render: function() {
        return (
            <div className="app">
                App component
                <News />
                <Comments />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);