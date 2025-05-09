import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';

export default function AuthButtons() {
  return (
    <div className='z-11 mr-10 mt-auto mb-auto'>
      <SignedIn className = 'z-11 mr-20'>
        <UserButton afterSignOutUrl="/"/>
      </SignedIn>

      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-5 cursor-pointer">
            Login
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>
    </div>
  );
}
