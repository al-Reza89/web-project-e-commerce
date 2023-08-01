import SingleProductClient from "./SingleProductClient";

interface IParams {
  productId?: string;
}

const SingleProductPage = async ({ params }: { params: IParams }) => {
  console.log(params.productId);

  return <SingleProductClient />;
};

export default SingleProductPage;
