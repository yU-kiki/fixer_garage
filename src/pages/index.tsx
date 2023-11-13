import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Main } from "@/components/layouts/Main";
import { MainHome } from "@/components/layouts/Main/MainHome";

export default function Home() {
  return (
    <>
      <Header />
      <Main className="pt-[80px] px-[16px] md:px-auto">
        <MainHome />
      </Main>
      <Footer />
    </>
  );
}
