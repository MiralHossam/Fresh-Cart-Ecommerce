// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import { signOut, useSession } from "next-auth/react";

// export default function Navbar() {
//   const { status } = useSession();
//   const isAuthenticated = status === "authenticated";

//   const MenuItems: { path: string; content: string; protected: boolean }[] = [
//     { path: "/", content: "Home", protected: false },
//     { path: "/products", content: "Products", protected: false },
//     { path: "/category", content: "Categories", protected: false },
//     { path: "/Brands", content: "Brands", protected: false },
//     { path: "/allorders", content: "Orders", protected: true },
//     { path: "/cart", content: "cart", protected: true },
//     { path: "/wishlist", content: "wishlist", protected: true },
//   ];

//   function logout() {
//     signOut({ callbackUrl: "/login" });
//   }

//   if (status === "loading") return null;

//   return (
//     <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-2xl">
//       <div className="max-w-[1400px] mx-auto flex justify-between items-center p-5">
//         {/* LEFT SIDE */}
//         <NavigationMenu>
//           <NavigationMenuList className="flex items-center space-x-4">
//             {/* Logo */}
//             <NavigationMenuItem>
//               <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
//                 <Link href="/">
//                   <Image
//                     src="/images/freshcart-logo.svg"
//                     alt="logo"
//                     width={120}
//                     height={40}
//                     priority
//                   />
//                 </Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>

//             {/* Menu Items */}
//             {MenuItems.map((item) => (
//               <NavigationMenuItem key={item.path}>
//                 {!item.protected || isAuthenticated ? (
//                   <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
//                     <Link href={item.path}>{item.content}</Link>
//                   </NavigationMenuLink>
//                 ) : null}
//               </NavigationMenuItem>
//             ))}

//             {/* Wishlist Icon (always visible) */}
//             <NavigationMenuItem>
//               <NavigationMenuLink asChild>
//                 <Link href="/wishlist">
//                   <i className="fa-regular fa-heart text-lg hover:text-red-500 transition-colors"></i>
//                 </Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>

//             {/* Cart Icon (always visible) */}
//             <NavigationMenuItem>
//               <NavigationMenuLink asChild>
//                 <Link href="/cart">
//                   <i className="fa-solid fa-cart-shopping text-lg hover:text-blue-700 transition-colors"></i>
//                 </Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//           </NavigationMenuList>
//         </NavigationMenu>

//         {/* RIGHT SIDE */}
//         <NavigationMenu>
//           <NavigationMenuList className="flex items-center space-x-6">
//             {isAuthenticated ? (
//               <>
//                 {/* Logout */}
//                 <NavigationMenuItem>
//                   <NavigationMenuLink asChild>
//                     <span className="cursor-pointer" onClick={logout}>
//                       Logout
//                     </span>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>
//               </>
//             ) : (
//               <>
//                 {/* Login */}
//                 <NavigationMenuItem>
//                   <NavigationMenuLink asChild>
//                     <Link href="/login">Login</Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>

//                 {/* Register */}
//                 <NavigationMenuItem>
//                   <NavigationMenuLink asChild>
//                     <Link href="/register">Register</Link>
//                   </NavigationMenuLink>
//                 </NavigationMenuItem>
//               </>
//             )}
//           </NavigationMenuList>
//         </NavigationMenu>
//       </div>
//     </div>
//   );
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signOut, useSession } from "next-auth/react";
import { CountContext } from "@/types/CountProvider";
import { useContext } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { data, status } = useSession();
  const pathName: string = usePathname(); 
  const { count } = useContext(CountContext);
  const isAuthenticated = status === "authenticated";
  const MenuItems: { path: string; content: string; protected: boolean }[] = [
    { path: "/", content: "Home", protected: false },
    { path: "/products", content: "Products", protected: false },
    { path: "/category", content: "Categories", protected: false },
    { path: "/brands", content: "Brands", protected: false },
    { path: "/allorders", content: "Orders", protected: false },
  ];

  function logout() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-2xl">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center p-5">
        {/* LEFT SIDE */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-4">
            {/* Logo */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">
                  <Image
                    src="/images/freshcart-logo.svg"
                    alt="logo"
                    width={120}
                    height={40}
                    priority
                  />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Menu Items */}
            {MenuItems.map((item) => (
              <NavigationMenuItem key={item.path}>
                {!item.protected || isAuthenticated ? (
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={item.path}>{item.content}</Link>
                  </NavigationMenuLink>
                ) : null}
              </NavigationMenuItem>
            ))}

            {/* Wishlist Icon (always visible) */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/wishlist">
                  <i className="fa-regular fa-heart text-lg hover:text-red-500 transition-colors"></i>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Cart Icon (always visible) */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/cart">
                  <i className="fa-solid fa-cart-shopping text-lg hover:text-blue-700 transition-colors"></i>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* RIGHT SIDE */}
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-6">
            {isAuthenticated ? (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <span className="cursor-pointer" onClick={logout}>
                    Logout
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/login">Login</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/Register">Register</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
