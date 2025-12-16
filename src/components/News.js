import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = ({ apiKey, country, category, pageSize }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  // Capitalize first letter for headings
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Fetch news from API
  const updateNews = async () => {
    try {
      setLoading(true);
      const url = `https://newsapi.org/v2/everything?q=apple&from=2025-12-15&to=2025-12-15&sortBy=popularity&apiKey={API_Token}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch news");

      const data = await response.json();
      setArticles(data.articles || []);
      setTotalResults(data.totalResults || 0);
      setPage(1);
    } catch (error) {
      console.error("Error fetching news:", error);
      setArticles([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  // Fetch more news for infinite scroll
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${nextPage}&pageSize=${pageSize}`;
      const response = await fetch(url);

      if (!response.ok) throw new Error("Failed to fetch news");

      const data = await response.json();
      setArticles((prev) => prev.concat(data.articles || []));
      setTotalResults(data.totalResults || 0);
      setPage(nextPage);
    } catch (error) {
      console.error("Error fetching more news:", error);
    }
  };

  useEffect(() => {
    document.title = `${capitalizeFirstLetter(category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "90px 0 35px" }}
      >
        NewsMonkey - Top {capitalizeFirstLetter(category)} Headlines
      </h1>

      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((el, index) => (
              <div className="col-md-4" key={el.url || index}>
                <NewsItem
                  title={el.title || ""}
                  description={el.description || ""}
                  imageUrl={el.urlToImage}
                  newsUrl={el.url}
                  author={el.author}
                  date={el.publishedAt}
                  source={el.source?.name || "Unknown"}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

// Default props
News.defaultProps = {
  country: "us",
  pageSize: 5,
  category: "general",
};

// Prop types
News.propTypes = {
  apiKey: PropTypes.string.isRequired,
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
