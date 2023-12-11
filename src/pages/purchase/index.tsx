import { useRouter } from "next/router";
import { Header } from "@/components/layouts/Header";
import { Footer } from "@/components/layouts/Footer";
import { Main } from "@/components/layouts/Main";
import { PurchaseWrapper } from "@/components/elements/PurchaseWrapper";
import { BaseProps } from "@/types/BaseProps";

export type PurchaseProps = {} & BaseProps;

export default function Purchase({ className }: PurchaseProps) {
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
        <PurchaseWrapper
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

