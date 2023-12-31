import { Component } from "react";
import { getNews } from "../../services/getNews";
import { nanoid } from "nanoid";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
class ContentInfo extends Component {
  state = {
    news: null,
    isLoading: false,
    error: ''
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchText !== this.props.searchText) {
      this.setState({ isLoading: true });
      setTimeout(() => {
        getNews(this.props.searchText)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'ok') {
              this.setState({ news: data.articles })
            }
            else { return Promise.reject(data.message) }
          }).catch(error=>this.setState({error}))
          .finally(this.setState(() => ({ isLoading: false })));
      }, 3000);
    }
  }
  render() {
    const { news, isLoading, error } = this.state;

    return (
      <>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {isLoading && (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        <ul>
          {news &&
            news.map((el) => {
              return <li key={nanoid()}>{el.title}</li>;
            })}
        </ul>
      </>
    );
  }
}

export default ContentInfo;
