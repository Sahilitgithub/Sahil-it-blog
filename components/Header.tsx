"use client";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton} from "@clerk/nextjs";

const Header = () => {

  return (
    <header className="header px-5 md:px-16 py-4">
      {/* Logo part */}
      <div>
        <Link
          href="/"
          className="text-[16px] sm:text-[20px] font-semibold brandName"
          aria-label="Homepage"
        >
          Sahil-it
        </Link>
      </div>
      <nav>
        <ul className="flex justify-center items-center gap-4 lg:gap-6 text-cyan-600 text-[15px] sm:text-[17px] font-semibold">
          <li className="hover:text-amber-400 transition-colors">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-amber-400 transition-colors">
            <Link href="/about">About</Link>
          </li>
          <li className="hover:text-amber-400 transition-colors">
            <Link href="/contact">Contact</Link>
          </li>
          <li className="flex justify-center items-center hover:text-amber-400 transition-colors">
            <SignedIn>
             <UserButton />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <SignInButton />
              </Link>
            </SignedOut>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
