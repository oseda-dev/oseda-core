import { useEffect, useState } from "react";

const Landing = () => {
  interface ResType {
    message: String;
  }

  const [data, setData] = useState<ResType>();
  useEffect(() => {
    fetch("http://localhost:3001")
      .then((res) => {
        return res.json();
      })
      .then((tmpData) => {
        setData(tmpData);
      });
  }, []);
  return (
    <>
      <h1>Landing Page</h1>
      <div>Data: {data?.message}</div>
    </>
  );
};

export default Landing;
