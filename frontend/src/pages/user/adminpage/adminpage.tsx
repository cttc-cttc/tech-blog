import AdminCommentList from "./dashboard/admin-comment-list";
import AdminTodoList from "./dashboard/admin-todo-list";
import { ChartAreaInteractiveDemo } from "./dashboard/chartDemo";

export default function Adminpage() {
  return (
    <div className="w-full max-w-4xl flex flex-col gap-5 self-baseline ml-8">
      <div className="bg-muted/50 w-full rounded-xl">
        <ChartAreaInteractiveDemo />
      </div>
      <div className="flex gap-5">
        <div className="flex-1 min-h-[100px]">
          <AdminCommentList />
        </div>
        <div className="flex-1 min-h-[100px]">
          <AdminTodoList />
        </div>
      </div>
    </div>
  );
}
