let photos = ['images/1.jpg','images/2.jpg', 'images/3.jpg', 'images/4.jpg'];

let myNews = [
    {
        author: 'Саша Печкин',
        text: 'В четчерг, четвертого числа...',
        bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
    },
    {
        author: 'Просто Вася',
            text: 'Считаю, что $ должен стоить 35 рублей!',
        bigText: 'А евро 42!'
    },
    {
        author: 'Гость',
            text: 'Бесплатно. Скачать. Лучший сайт - http://localhost:3000',
        bigText: 'На самом деле платно, просто нужно прочитать очень длинное лицензионное соглашение'
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
          text: React.PropTypes.string.isRequired,
          bigText: React.PropTypes.string.isRequired
      })
    },
    getInitialState: function () {
      return {
          visible: false
      };
    },
    readmoreClick: function(e) {
        e.preventDefault();
        this.setState({visible: true});
    },
    render: function () {
        let author = this.props.data.author,
            text = this.props.data.text,
            bigText = this.props.data.bigText,
            visible = this.state.visible; // Считывем значение переменной из состояния компонента

        return (
            <div className="article">
                <p className="news-author">{author}:</p>
                <p className="news-text">{text}</p>

                {/*Для ссылки - не показывай ссылку, если visible === true*/}
                <a href="#"
                   onClick={this.readmoreClick}
                   className={'news-readmore ' + (visible ? 'none' : '')}>
                    Подробнее
                </a>

                {/*Для большого текста - не показывай текст, если visible === false*/}
                <p className={'news-big-text ' + (visible ? '' : 'none')}>{bigText}</p>
            </div>
        );
    }
});

let TestInput = React.createClass({
    onClickHandler: function() {
        console.log(this.refs);
        alert(ReactDOM.findDOMNode(this.refs.myTestInput).value);
    },
   render: function() {
       return (
           <div>
            <input
               onChange={this.onChangeHandler}
               className="test-input"
               defaultValue=''
               ref="myTestInput"
               placeholder="Введите значение..."
               type="text"
            />
            <button onClick={this.onClickHandler} ref="alertButton">Отправить</button>
           </div>
       );
   } 
});

let App = React.createClass({
    render: function () {
        return (
            <div className="app">
                <h3>Новости</h3>
                <TestInput />
                <News data={myNews} /> {/*add data prop*/}
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);