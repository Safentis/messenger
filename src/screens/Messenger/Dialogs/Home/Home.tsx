import { FC } from "react";
import Content from "../../../../layouts/Content/Content";
import Namebar from "../../../../layouts/Namebar/Namebar";

const Home: FC = () => {
  return (
    <>
      <Namebar></Namebar>
      <Content></Content>
    </>
  );
};

export default Home;
