import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, UserIcon } from "lucide-react";

const Header = () => {
    return ( 
        <header className="w-full border-b">
            <div className="wrapper flex-between">
                <div className="flex-start">
                    <Link href='/' className="flex-start">
                        <Image src='/images/logo.png' alt={`${APP_NAME} logo`} height={48} width={48} priority={true } />
                    </Link>
                    <span className="hidden lg:block font-bold text-2xl ml-3">{ APP_NAME}</span>
                </div>
                <div className="space-x-2">
                    <Button asChild variant='ghost'>
                        <Link href='/cart' >
                            <ShoppingCart /> Cart
                        </Link>
                    </Button>
                    <Button asChild variant='ghost'>
                        <Link href='/sign-in' >
                            <UserIcon /> Sign In
                        </Link>
                    </Button>
                </div>
                
            </div>
        </header>
     );
}
 
export default Header;