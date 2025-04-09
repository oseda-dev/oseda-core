import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";

const Landing = () => {
  interface ResType {
    message: String;
  }

  const [data, setData] = useState<ResType>();
  useEffect(() => {
    fetch("http://localhost:3001/api/state")
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
      <Button text={"Go to Courses!"} />
    </>
  );
};

export default Landing;
