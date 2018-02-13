let photos = ['images/1.jpg','images/2.jpg', 'images/3.jpg', 'images/4.jpg'];

let myNews = [
    {
        author: 'Саша Печкин',
        text: 'В четверг, четвертого числа...'
    },
    {
        author: 'Просто Вася',
        text: 'Считаю, что $ должен стоить 1488 рублей!'
    },
    {
        author: 'Гость',
        text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000'
    }
];

// ReactDOM.render(
//     <App>
//         <Photos photos=photos />
//         <lastNews />
//         <Comments />
//     </App>,
//     document.getElementById('root')
// );

let News = React.createClass({
    render: function () {
        let data = this.props.data;
        let newsTemplate = data.map((item, index) => {
            return (
                <div key={index}>
                    <p className="news-author">{item.author}:</p>
                    <p className="news-text">{item.text}</p>
                </div>
            )
        });

        return (
            <div className="news">
                {newsTemplate}
            </div>
        );
    }
});

let Comments = React.createClass({
    render: function () {
        return (
            <div className="comments">
                Комментариев пока нет.
            </div>
        );
    }
});

let App = React.createClass({
    render: function () {
        return (
            <div className="app">
                App component
                <News data={myNews} /> {/*add data prop*/}
                <Comments />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);