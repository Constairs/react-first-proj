'use strict';

window.ee = new EventEmitter();

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

let News = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    getInitialState: function () {
      return {
          counter: 0
      }
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

let Add = React.createClass({
    getInitialState: function() {
        return {
            agreeNotChecked: true,
            authorIsEmpty: true,
            textIsEmpty: true,
        };
    },
    componentDidMount: function() {
        ReactDOM.findDOMNode(this.refs.author).focus();
    },
    onBtnClickHandler: function(e) {
        e.preventDefault();
        let author = ReactDOM.findDOMNode(this.refs.author).value;
        let textEl = ReactDOM.findDOMNode(this.refs.text);
        let text = textEl.value;

        let item = [{
            author: author,
            text: text,
            bigText: '...'
        }];

        window.ee.emit('News.add', item)

        textEl.value = '';
        this.setState({textIsEmpty: true});

    },
    onFieldChange: function(fileName, e) {
        let fieldData = e.target.value.trim();
        fieldData.length > 0 ? this.setState({['' + fileName]: false}) : this.setState({['' + fileName]: true});
    },
    onCheckRuleClick: function(e) {
      this.setState({agreeNotChecked: !this.state.agreeNotChecked});
    },
   render: function() {
        let agreeNotChecked = this.state.agreeNotChecked,
            authorIsEmpty = this.state.authorIsEmpty,
            textIsEmpty = this.state.textIsEmpty;
       return (
           <form className="add cf">
               <label htmlFor="author">Автор</label>
               <input
                   id="author"
                   className="add-author"
                   defaultValue=''
                   onChange={this.onFieldChange.bind(this, 'authorIsEmpty')}
                   ref="author"
                   placeholder="Ваше имя"
                   type="text"
               />
               <label htmlFor="text">Текст Новости</label>
               <textarea id="text" className="add-text" onChange={this.onFieldChange.bind(this, 'textIsEmpty')} ref="text" placeholder="Текст новости">
               </textarea>
               <label className="checkbox-label" htmlFor="rules">
                   Я согласен с правилами <input id="rules" type="checkbox" onChange={this.onCheckRuleClick} defaultChecked={false} ref="checkrule"/>
               </label>
               <button className="add-btn" onClick={this.onBtnClickHandler} disabled={agreeNotChecked ||  authorIsEmpty || textIsEmpty} ref="alertButton">Опубликовать новость</button>
           </form>
       );
   }
});

let App = React.createClass({
    getInitialState: function() {
      return {
          news: myNews
      }
    },
    componentDidMount: function() {
        let self = this;
        window.ee.addListener('News.add', function (item) {
           let nextNews = item.concat(self.state.news);
           self.setState({news: nextNews});
        });
    },
    componentWillUnmount: function () {
        window.ee.addListener('News.add');
    },
    render: function () {
        console.log('render');
        return (
            <div className="app">
                <h3>Новости</h3>
                <Add />
                <News data={this.state.news} />
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.querySelector('#root')
);