import getProductById from "@/app/actions/getProductById";
import SingleProductClient from "./SingleProductClient";
import EmptyState from "@/app/components/EmptyState";

interface IParams {
  productId?: string;
}

const SingleProductPage = async ({ params }: { params: IParams }) => {
  // console.log(params.productId);

  if (params.productId === undefined) {
    return (
      <EmptyState
        title="Sorry"
        subtitle="we did not have any product with this id"
      />
    );
  }

  const productDetailsById = await getProductById(params.productId);

  if (productDetailsById === null) return null;

  return <SingleProductClient productDetailsById={productDetailsById} />;
};

export default SingleProductPage;
