import React from "react";
import { useFetch } from "../../Hooks/useCRUD";
import MovieCard from "./MovieCard";

const ContentDetail = ({ content }) => {
  const { data: movies } = useFetch(["movies"], `/movies`);
  const hotMovies =
    movies?.data
      ?.filter((movie) => movie.is_hot === true)
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 4) || [];
  return (
    <div className="container my-4 grid grid-cols-1 lg:grid-cols-2 md:gap-10 xl:gap-16">
      <div className="col-span-1 space-y-10">
        <div className="w-full">
          <h1 className="text-[24px] font-bold text-[#1c2b33]">
            {content.name}
          </h1>
        </div>
        <div className="w-full">
          <figure>
            <img
              src={content.image}
              alt="Hình ảnh rạp phim"
              className="mt-3 w-full h-auto rounded-lg shadow-md"
            />
            <figcaption className="text-sm text-center text-gray-500 mt-2">
              {content.name}
            </figcaption>
          </figure>
        </div>
        <div className="mt-10">
          <div
            className="text-secondary mb-4"
            dangerouslySetInnerHTML={{ __html: content.description }}
          />
          {content?.address && (
            <p className="text-secondary mb-5 font-bold">
              Địa chỉ: {content.address}
            </p>
          )}
          {content?.phone && (
            <p className="font-bold mb-4">Hotline: {content.hotline}</p>
          )}
          <div
            className="text-secondary mb-4"
            dangerouslySetInnerHTML={{ __html: content.contactInfo }}
          />
        </div>
      </div>
      <div className="col-span-1 text-center md:text-left space-y-10">
        <h1 className="text-[24px] text-center font-bold text-secondary">
          PHIM ĐANG HOT
        </h1>

        <div className="grid grid-cols-2 gap-4 ">
          {hotMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} showInfo={false} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentDetail;
