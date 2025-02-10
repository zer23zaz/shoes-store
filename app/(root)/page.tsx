// import { Button } from "@/components/ui/button";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home"
};

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
const HomePage = async () => {
    await delay(1000);
    return ( 
        <>
            Home Page
    
        </>
     );
}
 
export default HomePage;