import dynamic from "next/dynamic";

const Todo = dynamic(() => import("./todo/page"), { ssr: false });
export default function Home() {
  return (
    <div>
      <Todo/>
    </div>
  );
}
