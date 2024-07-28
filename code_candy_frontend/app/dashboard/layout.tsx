import { Header } from "@/components/Header/header";

 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
        <Header />
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}
export const experimental_ppr = true;