import { useEffect, useState } from "react";
import CardSection from "./CardSection";

const CardContent = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    fetch("cardContent.json")
      .then((res) => res.json())
      .then((data) => {
        setContents(data);
      });
  }, []);
  return (
    <>
      <div className=" mt-40">
        <h1 className="text-4xl mb-6 text-center">
          Tailor-made for small <br /> businesses,{" "}
          <span className="text-[#0e86d4]">especially yours.</span>
        </h1>
        <div className="grid grid-cols-4 grid-rows-1 gap-4">
          {contents.map((content, index) => (
            <CardSection key={index} content={content}></CardSection>
          ))}
        </div>
      </div>
    </>
  );
};
export default CardContent;
