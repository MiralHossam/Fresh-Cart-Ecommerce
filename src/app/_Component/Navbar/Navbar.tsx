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
import { useCount } from "@/types/CountProvider";

export default function Navbar() {
const { data: session, status } = useSession();
const isAuthenticated = status === "authenticated";
  const { cartCount, wishlistCount } = useCount();

  const menuLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/category" },
    { name: "Brands", href: "/Brands" },
    ...(isAuthenticated ? [{ name: "Orders", href: "/allorders" }] : []),
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-2xl">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center p-5">
        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
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

            {menuLinks.map((link) => (
              <NavigationMenuItem key={link.href}>
                <NavigationMenuLink asChild>
                  <Link href={link.href}>{link.name}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList className="flex items-center space-x-6">
            {isAuthenticated && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/wishlist" className="relative">
                      <i className="fa-regular fa-heart text-lg hover:text-red-500"></i>
                      {wishlistCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/cart" className="relative">
                      <i className="fa-solid fa-cart-shopping text-lg hover:text-blue-700"></i>
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-blue-700 text-white text-xs px-1 rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}

            {isAuthenticated ? (
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <span
                    className="cursor-pointer"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
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
                    <Link href="/register">Register</Link>
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
