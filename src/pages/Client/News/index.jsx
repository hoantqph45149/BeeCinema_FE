import React, { useEffect, useState } from "react";
import axios from "axios";

import api from "../../../apis/axios";
import NewsCard from "./../../../Components/Common/NewCard";
import { useFetch } from "../../../Hooks/useCRUD";
import Loading from "../../../Components/Common/Loading";

const News = () => {
  const [news, setNews] = useState([]);
  const { data: posts, isLoading } = useFetch(["posts"], "/posts");
  useEffect(() => {
    if (posts) {
      setNews(posts);
    }
  }, [posts]);

  return (
    <>
      {isLoading ? (
        <div className="container py-80">
          <Loading />
        </div>
      ) : news.length > 0 ? (
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 my-14 lg:my-24">
          {news.map((post) => (
            <NewsCard
              key={post.id}
              image={post.img_post}
              title={post.title}
              description={post.description}
              link={`/news/${post.id}`}
            />
          ))}
        </div>
      ) : (
        <h1 className="text-center text-2xl font-bold py-60">
          <span className="text-accent">Chưa có bài viết mới</span>
        </h1>
      )}
    </>
  );
};

export default News;
