import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import searchIcon from "../assets/search_icon.png";
import exitIcon from "../assets/cross_icon.png";
import { useLocation } from "react-router-dom";

export default function SearchBar() {
