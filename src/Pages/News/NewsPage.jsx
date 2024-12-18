import React from "react";
import NewsList from "../../Components/News/NewsList";
import "./news.css"
const NewsPage = () => {
  return (
    <>
      <div className="container">
        <NewsList/>
      </div>
    </>
  );
};

export default NewsPage;
