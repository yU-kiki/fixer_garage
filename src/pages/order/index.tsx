import { useRouter } from "next/router";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Main } from "@/components/layouts/Main";
import { OrderWrapper } from "@/features/OrderWrapper";
import { BaseProps } from "@/types/BaseProps";

export type OrderProps = {} & BaseProps;

export default function Order({ className }: OrderProps) {
  const router = useRouter();
  const {
    productId = "",
    productName = "",
    price = "",
    discountPrice = "",
    selectedSize = "",
  } = router.query;

  const numericPrice = Number(price);
  const numericDiscountPrice = discountPrice
    ? Number(discountPrice)
    : undefined;

  return (
    <>
      <Header />
      <Main className="flex justify-center pt-[80px]">
        <OrderWrapper
          productId={productId as string}
          productName={productName as string}
          price={numericPrice}
          discountPrice={numericDiscountPrice}
          selectedSize={selectedSize as string}
        />
      </Main>
      <Footer />
    </>
  );
}

