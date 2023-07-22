import Image from "next/image";
import Container from "./components/Container";
import CarouselHome from "./components/HomePage/CarouselHome";
import ProductCard from "./components/HomePage/ProductCard";

export default function Home() {
  return (
    <div className="pt-20">
      <CarouselHome />
      <div className="bg-gray-100">
        <h1 className="pt-14 font-medium text-4xl   max-w-[2520px] xl:px-20 md:px-10 sm:px-2 px-4 ">
          Deals
        </h1>
        <hr className="bg-black" />
        <Container>
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-6 gap-8 pb-8  ">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </Container>
      </div>
    </div>
  );
}
