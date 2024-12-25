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
      <div className="mt-24">
        <h1 className="text-4xl mb-6 text-center">
          Create professional{" "}
          <span className="text-[#0e86d4]">
            {" "}
            <br />
            invoices with ease.
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 grid-rows-1 gap-4">
          {contents.map((content, index) => (
            <CardSection key={index} content={content}></CardSection>
          ))}
        </div>
      </div>
    </>
  );
};
export default CardContent;
