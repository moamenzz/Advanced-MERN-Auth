import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  useEffect(() => {
    console.log("Auth updated:", auth);
  }, [auth]);
  return <div>Home</div>;
};

export default Home;
