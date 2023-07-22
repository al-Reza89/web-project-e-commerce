import Image from "next/image";
import Container from "./components/Container";
import CarouselHome from "./components/HomePage/CarouselHome";

export default function Home() {
  return (
    <div className="pt-20">
      <CarouselHome />
      <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 "></div>
    </div>
  );
}
