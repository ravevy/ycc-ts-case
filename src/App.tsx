import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

interface PostType {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function App() {
  const [data, setData] = useState<PostType[]>([]);
  const [input, setInput] = useState<string>();
  const [list, setList] = useState<PostType[]>(data);

  useEffect(() => {
    axios
      .get<PostType[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        setData(res.data);
        setList(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  function handleClick(): void {
    input === undefined
      ? setList(data)
      : setList(
          data.filter((i) => {
            return i.body.includes(input);
          })
        );
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") handleClick();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInput(e.target.value);
  }

  return (
    <>
      <div className="App">
        <div className="search">
          <input
            type="text"
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            placeholder="What are you looking for?"
          ></input>
          <button onClick={handleClick}>search</button>
        </div>
        <div className="list">
          {data && (
            <ul>
              {list.map((post) => (
                <li key={post.id}>{post.body}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
