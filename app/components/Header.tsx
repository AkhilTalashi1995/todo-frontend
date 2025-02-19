import React from "react";
import Image from "next/image";

function Header() {
  return (
    <div className="flex justify-center items-center mb-6 bg-black-box w-screen h-[200px]">
      <h1 className="text-4xl font-bold flex items-center">
        <Image
          src="/rocket.png"
          alt="Rocket"
          width={22}
          height={36}
          className="mr-2"
          unoptimized
        />
        <span className="text-title-text ml-2">Todo</span>
        <span className="text-app-text ml-2">App</span>
      </h1>
    </div>
  );
}

export default Header;
