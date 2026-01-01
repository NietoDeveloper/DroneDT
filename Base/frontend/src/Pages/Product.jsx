import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import star from "../assets/star_icon.png";
import noStar from "../assets/star_dull_icon.png";
import RelatedProducts from "../components/RelatedProducts";

export default function Product() {
  const { id } = useParams();
  const { products, currency, cartItems, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const location = useLocation();
  useEffect(() => {
    setSize("");
  }, [location.pathname]);


  return productData ? (
    <div className="pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((img, index) => (
              <img
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(img)}
                src={img}
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={star} alt="" className="w-3.5" />
            <img src={star} alt="" className="w-3.5" />
            <img src={star} alt="" className="w-3.5" />
            <img src={star} alt="" className="w-3.5" />
            <img src={noStar} alt="" className="w-3.5" />
            <p className="pl-2">(109)</p>
          </div>
          <p className="font-medium text-3xl mt-5">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((sz, index) => (
                <button
                  onClick={() => setSize(sz)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    sz === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (109)</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
        <p>
          An e-commerce website is an online platform that facilitates the
          buying and selling of products or services over the internet. It
          serves as a virtual marketplace where businesses and individuals can
          showcase their products, interact with customers, and conduct
          transactions without the need for a physical presence. E-commerce
          websites have gained immense popularity due to their convenience,
          accessibility, and the global reach they offer.
        </p>
        <p>
          E-commerce websites typically display products or services along with
          detailed descriptions, images, prices, and any available variations
          (e.g., sizes, colors). Each product usually has its own dedicated page
          with relevant information.
        </p>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opactity-0"></div>
  );
}
