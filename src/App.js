import React, { useState, useEffect } from 'react';

const App = () => {
  //state
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query= ');
  const [loading, setLoading] = useState(false);
  //fetch news
  const fetchNews = () => {
    setLoading(true)
    fetch(url)
      .then(result => result.json())
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error));
  };
  //useEffect
  useEffect(() => {
    fetchNews();
  }, [url]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setUrl('https://hn.algolia.com/api/v1/search?query=' + searchQuery);
  }

  return (
    <div>
      <h1><strong> {searchQuery} news</strong></h1> <br />
      {loading ? <h2>Loading Your News...</h2> : ""}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Type Here...' onChange={handleChange} /> 
        <button>Search</button>
      </form> <br />
      {news.map((n,i) => (<p key={i}>{n.title}</p>))}
    </div>
  );
};

/*const App = () => {
  
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }

  const reset = () => {
    setCount(0);
  }

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return(
    <div>
      <h2>Counter App</h2>
      <button onClick={increment}> Clicked {count} times</button> <br />
      <button onClick={reset}> Reset </button>
    </div>
  )
}*/

/*class App extends Component {
  state = {
    count: 0
  }
  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  reset = () => {
    this.setState({
      count: 0
    })
  }
  componentDidMount(){
    document.title = `Clicked ${this.state.count} times`
  }
  componentDidUpdate(){
    document.title = `Clicked ${this.state.count} times`
  }
  render() {
    return (
      <div>
        <h2>Counter App</h2>
        <button onClick={this.increment}>Clicked <strong>{this.state.count}</strong> times </button><br />
        <button onClick={this.reset}>Reset</button>
      </div>
    );
  }
}*/

export default App;
