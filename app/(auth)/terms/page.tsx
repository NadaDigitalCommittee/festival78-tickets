import { Terms } from "@/components/Terms/Terms";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "利用規約とプライバシーポリシー",
};

export default function Page() {
  return (
    <div>
      <Terms />
    </div>
  );
}
