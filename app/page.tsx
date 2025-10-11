// import dynamic from "next/dynamic";
import Todo from "./todo/page";

/*
  Pure Server Component
  Do not import a client component (Todo) directly here.
  Instead, import it as a separate file that starts with "use client".
*/

// const Todo = dynamic(() => import("./todo/page"), { ssr: false });


// Home remains a Server Component, static and clean.
export default function Home() {
  return (
    <div>
      <Todo/>
    </div>
  );
}
