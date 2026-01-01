import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import star from "../assets/star_icon.png";
import noStar from "../assets/star_dull_icon.png";
import RelatedProducts from "../components/RelatedProducts";

