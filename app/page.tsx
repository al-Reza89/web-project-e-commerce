import Image from "next/image";
import Container from "./components/Container";
import CarouselHome from "./components/HomePage/CarouselHome";
import ProductCard from "./components/HomePage/ProductCard";
import getAllProducts from "./actions/getAllProduct";
import EmptyState from "./components/EmptyState";
import { Product } from "@prisma/client";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const allProducts = await getAllProducts();

  if (allProducts.length === 0) {
    return <EmptyState showReset />;
  }

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
            {allProducts.map((product: Product) => {
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  stock={product.stock}
                  currentUser={currentUser}
                />
              );
            })}
          </div>
        </Container>
      </div>
    </div>
  );
}
