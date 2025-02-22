import React from "react";
import ContentDetail from "../../../Components/Common/ContentDetail";
import { useBrancheContext } from "./../../../Contexts/branche/UseBrancheContext";

const TheaterInformation = () => {
  const { cinema } = useBrancheContext();
  console.log(cinema);
  return (
    <>
      <ContentDetail content={{ ...cinema, image: "/images/theater.jpg" }} />
    </>
  );
};

export default TheaterInformation;
