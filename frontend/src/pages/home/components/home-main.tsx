import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { posts } from "../../components/mock/mock-data";
import { Link } from "react-router-dom";
import { HomeAspectRatio } from "@/pages/components/shadcn-custom/home-aspect-ratio";

export default function HomeMain() {
  return (
    <main className="w-full">
      <div className="flex flex-col gap-5 items-center">
        <HomeAspectRatio />

        {posts.info.map((post, index) => (
          <Link to={`/contents-detail/${post.postId}`} className="w-full max-w-7xl" key={index}>
            <Card>
              <CardHeader className="gap-3.5">
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.contents}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
