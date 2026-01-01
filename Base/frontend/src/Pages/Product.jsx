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



  return productData ? (



      {/* Description & Review */}
    
      <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">

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
