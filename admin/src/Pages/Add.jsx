import { useState } from "react";
import upload from "../assets/upload_area.png";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { backendUrl } from "../components/Layout";
import { toast } from "react-toastify";

export default function Add() {
  // Token
  const token = useOutletContext();

  // Images
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  // Name, Description, Price, Category, Subcategory, Sizes, Bestseller
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Men");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  // Add new listing
  async function onSubmitHandler(e) {
    e.preventDefault();
    // try {
    //   const formData = new FormData();

    //   formData.append("name", name);
    //   formData.append("description", description);
    //   formData.append("price", price);
    //   formData.append("category", category);
    //   formData.append("subCategory", subCategory);
    //   formData.append("sizes", JSON.stringify(sizes));
    //   formData.append("bestseller", bestseller);

    //   image1 && formData.append("image1", image1);
    //   image2 && formData.append("image2", image2);
    //   image3 && formData.append("image3", image3);
    //   image4 && formData.append("image4", image4);

    //   const res = await axios.post(backendUrl + "/api/product/add", formData, {
    //     headers: { token },
    //   });

    //   if (res.data.success) {
    //     toast.success(res.data.message);
    //     setName("");
    //     setDescription("");
    //     setPrice("");
    //     setImage1(false);
    //     setImage2(false);
    //     setImage3(false);
    //     setImage4(false);
    //   } else {
    //     toast.error(res.data.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast.error(error.message);
    // }
  }

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3"
    >
      {/* Images */}
      <div>
        <p className="mb-2">Subir Imagen</p>
        <div className="flex gap-2">
          <label htmlFor="image1" className="cursor-pointer">
            <img
              className="w-20"
              src={image1 ? URL.createObjectURL(image1) : upload}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2" className="cursor-pointer">
            <img
              className="w-20"
              src={image2 ? URL.createObjectURL(image2) : upload}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3" className="cursor-pointer">
            <img
              className="w-20"
              src={image3 ? URL.createObjectURL(image3) : upload}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4" className="cursor-pointer">
            <img
              className="w-20"
              src={image4 ? URL.createObjectURL(image4) : upload}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      {/* Name */}
      <div className="w-full">
        <p className="mb-2">Nombre de Producto</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      {/* Category */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Subcategory */}
        <div>
          <p className="mb-2">Product Subcategory</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="25"
          />
        </div>
      </div>

      {/* Sizes */}
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-slate-400" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-slate-400" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-slate-400" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-slate-400" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-slate-400" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      {/* Add Button to submit */}
      <button
        // type="submit"
        onClick={() =>
          toast.error(
            "Feature is disabled. I don't want people to bombard my DB"
          )
        }
        className="w-28 py-3 mt-4 bg-black text-white"
      >
        ADD
      </button>
    </form>
  );
}
