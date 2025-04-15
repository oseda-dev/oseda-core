import { useEffect, useState } from "react";
import NavButton from "../../components/NavButton/NavButton";
import { useNavigate } from "react-router-dom";

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
      <NavButton text={"Go to Courses!"} url={"/courses"} />
    </>
  );
};

export default Landing;
