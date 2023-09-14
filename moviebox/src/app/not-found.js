import Image from 'next/image';

export default function Custom404() {
  
  return (
    <div className="flex justify-center w-full flex-col items-center h-screen bg-gray-800 text-white">

<div className="w-full flex items-center justify-center">

        <Image src='/404.png' height={300} width={300} alt='error' />
</div>
      <div className="w-full max-w-2xl text-center">
        <div className="mb-8">
          <div className="bg-purple-700 h-16 w-16 rounded-full opacity-80 animate-float mx-auto"></div>
          <div className="bg-purple-600 h-10 w-10 rounded-full opacity-70 animate-float mx-auto -mt-8"></div>
          <div className="bg-purple-500 h-6 w-6 rounded-full opacity-60 animate-float mx-auto -mt-6"></div>
        </div>
        <p className="text-2xl font-semibold mb-4">Looks like you&apos;re lost!</p>
        
          <a  href="/" className="rounded-lg bg-[#7F56D9] p-4 hover:text-purple-400 font-semibold">
            Return to Home
          </a>
        
      </div>
    </div>
  );
}
