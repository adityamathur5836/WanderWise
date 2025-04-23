import { SignedIn, SignIn, SignInButton, SignUp, SignUpButton, UserButton } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";
import AuthButtons from "../AuthButton";

export default function Navbar() {
  return (
    <ClerkProvider>
      <div className="flex justify-between text-white bg-opacity-5 bg-black w-full h-20 z-11">
        <Link href= "/" className="font-extrabold cursor-pointer text-3xl z-10 mb-auto mt-auto ml-10">WanderWise</Link>
        <nav className="space-x-4 mb-auto mt-auto z-11 mr-30">
          <Link href="/" className="cursor-pointer text-white font-bold z-11">Home</Link>
          <Link href="/about" className="text-white cursor-pointer font-bold z-11">About</Link>
          <Link href="/contact" className="text-white cursor-pointer font-bold z-11">Contact</Link>
        </nav>
        <AuthButtons/>
      </div>
    </ClerkProvider>
  );
}