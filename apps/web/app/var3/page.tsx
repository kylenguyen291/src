import dynamic from "next/dynamic";

const Variant3Content = dynamic(() => import("./content"), { ssr: false });

export default function Variant3Page() {
  return <Variant3Content />;
}
