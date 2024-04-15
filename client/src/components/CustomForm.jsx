import { Form } from "react-router-dom";

export default function CustomForm({ children }) {
  return (
    <Form className="flex flex-col w-4/5 sm:w-2/3 lg:w-[500px] border-2 rounded-xl p-4 bg-slate-200 gap-2">
      {children}
    </Form>
  );
}
