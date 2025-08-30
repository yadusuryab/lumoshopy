"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { isProductInCart } from "@/lib/cart";
import AddToCartButton from "../cart/cart-buttons/add-to-cart";
import { Button } from "../ui/button";
import PriceFormat_Sale from "../commerce-ui/price-format-sale";

export interface Product {
  _id: string;
  name: string;
  category: { name: string; slug: string };
  images: { asset: { url: string } }[];
  description: string;
  price: number;
  offerPrice?: number;
  soldOut: boolean;
}

export interface ProductCardProps {
  product: any;
  className?: string;
  noLink?: boolean;
  onClick?: () => void;
}

export default function ProductCard2({
  product,
  className = "",
  noLink = false,
  onClick,
}: ProductCardProps) {
  const { _id, name, images, price, offerPrice, soldOut } = product;
  const [isInCart, setIsInCart] = React.useState(false);

  React.useEffect(() => {
    setIsInCart(isProductInCart(_id));

    const handleCartUpdate = () => {
      setIsInCart(isProductInCart(_id));
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [_id]);

  const cardContent = (
    <motion.div
      onClick={noLink ? onClick : undefined}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`flex flex-col justify-between bg-white rounded-2xl shadow-md hover:shadow-xl p-5 text-center ${className}`}
      style={{
        cursor: noLink ? "pointer" : "default",
        minWidth: "240px",
      }}
    >
      {/* Product Image */}
      <div className="relative w-full aspect-[1/1] flex items-center justify-center rounded-xl bg-gray-50 mb-4 overflow-hidden">
        <Image
          src={images[0]?.asset.url || "/placeholder-image.jpg"}
          alt={name || "Product"}
          width={220}
          height={220}
          className={`object-contain transition-transform duration-500 group-hover:scale-105 ${
            soldOut ? "grayscale opacity-70" : ""
          }`}
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-2 flex-grow">
        <h2 className="text-base font-semibold text-gray-800 truncate">
          {name || "Product Name"}
        </h2>

        {/* Price */}
        <PriceFormat_Sale
          originalPrice={price}
          salePrice={offerPrice || price}
          prefix="₹"
          showSavePercentage={!!offerPrice}
          classNameOriginalPrice="text-sm text-gray-400 line-through"
          classNameSalePrice="text-xl font-bold text-gray-900"
          className="flex items-center justify-center gap-2"
        />
      </div>

      {/* Add to Cart Button */}
      <div className="mt-4">
        {!soldOut ? (
          <AddToCartButton product={product} />
        ) : (
          <Button
            className="w-full rounded-xl bg-gray-200 text-gray-500"
            disabled
          >
            Sold Out
          </Button>
        )}
      </div>
    </motion.div>
  );

  return noLink ? cardContent : <Link href={`/p/${_id}`}>{cardContent}</Link>;
}
