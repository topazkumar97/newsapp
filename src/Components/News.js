import React, { Component } from "react";
import NewsItem from "./NewsItem";

export default class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      pageNo: 1,
      totalResults: 0,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2603900471544c82bb3ea7f01c673c81&page=${this.state.pageNo}&pageSize=21`;
    let data = await fetch(url);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    });
  }

  nextPage = async () => {
    if (this.state.pageNo + 1 > Math.ceil(this.state.totalResults / 21)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2603900471544c82bb3ea7f01c673c81&page=${
        this.state.pageNo + 1
      }&pageSize=21`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: parseData.articles,
        pageNo: this.state.pageNo + 1,
      });
    }
  };

  previousPage = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2603900471544c82bb3ea7f01c673c81&page=${
      this.state.pageNo - 1
    }&pageSize=21`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      pageNo: this.state.pageNo - 1,
    });
  };

  render() {
    return (
      <div className="container my-3">
        <h1>NewsZeus - Top Headlines</h1>
        <div className="row">
          {this.state.articles.map((item, key) => {
            return (
              <div className="col-md-4" key={key}>
                <NewsItem
                  title={item.title ? item.title.slice(0, 50) : ""}
                  description={
                    item.description ? item.description.slice(0, 100) : ""
                  }
                  imageUrl={item.urlToImage}
                  newsUrl={item.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.pageNo <= 1}
            className="btn btn-primary"
            onClick={this.previousPage}
          >
            Previous
          </button>
          <button
            disabled={
              this.state.pageNo + 1 > Math.ceil(this.state.totalResults / 21)
            }
            className="btn btn-primary"
            onClick={this.nextPage}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
