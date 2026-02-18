"use client";

import dynamic from 'next/dynamic';
import Link from "next/link";

const Navbar = dynamic(() => import("@/components/layout/Navbar"), { ssr: false });

  );
}