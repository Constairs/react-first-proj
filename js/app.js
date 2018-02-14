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
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function () {
        let data = this.props.data;
        let newsTemplate;
        if(data.length > 0) {
            newsTemplate = data.map( function (item, index) {
                return (
                    <div key={index}>
                        <Article data={item} />
                    </div>
                )
            });
        } else {
            newsTemplate = <p>К сожалению новостей нет</p>
        }

        return (
            <div className="news">
                {newsTemplate}
                <strong className={'news-counter ' + (data.length > 0 ? '':'none') }>Всего новостей: {data.length}</strong>
            </div>
        );
    }
});

let Article = React.createClass({
    propTypes: {
      data: React.PropTypes.shape({
        author: React.PropTypes.string.isRequired,
          text: React.PropTypes.string.isRequired
      })
    },
    render: function () {
        let author = this.props.data.author,
            text = this.props.data.text;
        return (
            <div className="article">
                <p className="news-author">{author}:</p>
                <p className="news-text">{text}</p>
            </div>
        );
    }
});


let App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <h3>Новости</h3>
                <News data={myNews} /> {/*add data prop*/}

            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);