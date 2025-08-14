import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { PostProps } from "../components/utils/common-interfaces";
import {
  // getPathFirstSegment,
  getPathLastSegment,
  // getPathName,
  pathIdMap,
  renderPostsList,
  // pathStrMap,
} from "../components/utils/post-utils";
// import { Separator } from "@/components/ui/separator";
import axios from "axios";

export default function PostsList() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [postsList, setPostsList] = useState<PostProps[]>([]);
  // const firstPathSegment = getPathFirstSegment(currentPath);
  // const pathName = getPathName(firstPathSegment ?? "");

  useEffect(() => {
    const lastPath = getPathLastSegment(currentPath);
    const lastPathId = pathIdMap[lastPath ?? "it"]; // lastPath가 undefined라면 "it"라는 값을 사용

    axios
      .get("/api/posts", {
        params: {
          categoryId: lastPathId,
        },
      })
      .then(res => {
        // console.log(res.data);
        setPostsList(res.data);
      })
      .catch(err => console.error("Error fetching posts:", err));
  }, [currentPath]);

  return <div className="max-w-4xl flex flex-col gap-5">{renderPostsList(postsList)}</div>;
}
