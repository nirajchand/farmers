'use client';

export default function Navbar() {
  return (
    <>
    <nav className= "flex items-center justify-between px-20 py-4 bg-green-700 shadow-md fixed w-full top-0 left-0 z-10">
        <div >
            <img src="/images/logo.png" alt="Logo" className="w-15 h-18 inline-block "/>
            <span className="text-xl font-bold text-white px-2">Farmers</span>
        </div>
        <div className="bg-white flex items-center gap-10 shadow-lg rounded-full">
            <a href="#" className="text-black px-5 py-4 bg-green-200 hover:bg-green-200 rounded-full">Home</a>
            <a href="#" className="text-black px-5 py-4 hover:bg-green-200 rounded-full">Contact</a>
            <a href="#" className="text-black px-5 py-4 hover:bg-green-200 rounded-full">About us</a>
            <a href="#" className="text-black px-5 py-4 hover:bg-green-200 rounded-full">Sign In</a>
            <a href="#" className="text-black px-5 py-4 hover:bg-green-200 rounded-full">LogIn</a>
        </div>
    </nav> 
     
    </>

  );
}