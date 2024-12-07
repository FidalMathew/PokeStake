import axios from "axios";
import {Button} from "./ui/button";
import {useState} from "react";

export default function Navbar() {
  const [data, setData] = useState("");
  const generateId = async () => {
    try {
      const {data} = await axios.get("/api/getJoiningKey");
      console.log(data, "data");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-[100px] flex items-center">
      <div>Pokemon</div>

      <Button onClick={generateId}>Generate ID</Button>

      {/* {data !== "" && <div>{data}</div>} */}
    </div>
  );
}
