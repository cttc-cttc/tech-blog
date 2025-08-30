import { ChartAreaInteractiveDemo } from "./dashboard/chartDemo";
import CommentList from "./dashboard/comment-list";

export default function Adminpage() {
  return (
    <div className="w-full max-w-4xl flex flex-col gap-5 self-baseline ml-8">
      <div className="bg-muted/50 w-full rounded-xl">
        <ChartAreaInteractiveDemo />
      </div>
      <div className="flex gap-5">
        <div className="flex-1 bg-muted/50 min-h-[100px] rounded-xl">
          <CommentList />
        </div>
        <div className="flex-1 bg-muted/50 rounded-xl"></div>
      </div>
      {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
    </div>
  );
}
