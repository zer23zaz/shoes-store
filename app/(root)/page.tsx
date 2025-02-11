// import { Button } from "@/components/ui/button";
import ProductList from "@/components/shared/products/product-list";
import sampleData from "@/db/sample-data";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home"
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const HomePage = async () => {
    await delay(1000);
    // console.log(sampleData);
    return (
        <>
            <ProductList data={sampleData.products} title='Latest Arrivals' limit={4} />

        </>
    );
}

export default HomePage;