import React from "react";
import Link from "next/link";
const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center mb-10 p-5 border border-black rounded-md">
      <Link href={"/"} className="text-xl font-bold">
        CrowdFunding
      </Link>
      <ul className="flex gap-3 justify-between">
        <li>Campaigns</li>
        <li>dpwodw</li>
        <li>dpwodw</li>
      </ul>
    </nav>
  );
};

export default Navbar;
