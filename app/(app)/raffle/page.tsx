import { Form } from "@/components/Form";
import { getEvents } from "@/lib/cms";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Page() {
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<Inputs>()
  // const onSubmit: SubmitHandler<Inputs> = (data) => {
  //   console.log(data)
  // }
  // const events=getEvents()

  return (
    <main>
      <Form />
    </main>
  );
}
