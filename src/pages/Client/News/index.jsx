import React, { useEffect, useState } from "react";
import axios from "axios";

import api from "../../../apis/axios";
import NewsCard from "./../../../Components/Common/NewCard";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get(`/posts`);
        setNews(data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 my-14 lg:my-24">
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : news.length > 0 ? (
        news.map((post) => (
          <NewsCard
            key={post.id}
            image={post.img_post}
            title={post.title}
            description={post.description}
            link={`/news/${post.id}`}
          />
        ))
      ) : (
        <p>Không có bài viết nào.</p>
      )}
    </div>
  );
};

export default News;
