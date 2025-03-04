import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { useFetch } from "../../../Hooks/useCRUD";
import dayjs from "dayjs";

const NewDetail = () => {
  const { id } = useParams();
  const { data: post } = useFetch(["posts", id], `/posts/${id}`);

  return (
    <Container className="mt-4">
      {post ? (
        <Row>
          <Col lg={8} className="mx-auto">
            <Card>
              <CardBody>
                <h2 className="mb-3">{post.title}</h2>
                <img
                  src={post.img_post}
                  alt={post.title}
                  style={{ width: "100%", borderRadius: "10px" }}
                />
                <p className="text-muted mt-3">
                  Ngày đăng: {dayjs(post.created_at).format("DD/MM/YYYY")}
                </p>
                <p>{post.content}</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Đang tải bài viết...</p>
      )}
    </Container>
  );
};

export default NewDetail;
