import React from "react";
import { useParams } from "react-router-dom";
import ContentDetail from "../../../Components/Common/ContentDetail";
import Loading from "../../../Components/Common/Loading";
import { useFetch } from "../../../Hooks/useCRUD";

const NewDetail = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useFetch(["posts", id], `/posts/${id}`);

  return (
    <>
      {isLoading ? (
        <div className="container py-80 ">
          <Loading />
        </div>
      ) : (
        <>
          <ContentDetail
            content={{
              ...post,
              image: post?.img_post,
              name: post?.title,
              contactInfo: post?.content,
            }}
          />
        </>
      )}
    </>
  );
};

export default NewDetail;
