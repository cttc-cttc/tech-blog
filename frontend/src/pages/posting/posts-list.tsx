import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { PostProps } from "../components/utils/common-interfaces";
import { renderPostsList } from "../components/utils/post-utils";
import axios from "axios";
import "./code-block.css";

export default function PostsList() {
  const { category1, category2 } = useParams();
  const [postsList, setPostsList] = useState<PostProps[]>([]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (category1) params.category1 = category1;
    if (category2) params.category2 = category2;

    axios
      .get("/api/posts", { params })
      .then(res => {
        // console.log(res.data);
        setPostsList(res.data);
      })
      .catch(err => console.error("Error fetching posts:", err));
  }, [category1, category2]);

  return <div className="max-w-4xl flex flex-col gap-5">{renderPostsList(postsList)}</div>;
}
