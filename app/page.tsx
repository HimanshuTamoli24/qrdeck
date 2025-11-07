import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center font-sans gap-4 text-center px-4">
      <h1 className="text-2xl font-bold">
        mm… stalking my GitHub, huh? 😏
      </h1>
      <p>
        well, I mostly love reading emails.  
        <br />
        hit me up: <a href="mailto:himanshutamoli2005@gmail.com" className="underline text-blue-500">himanshutamoli2005@gmail.com</a>
      </p>
      <p className="mt-4 italic text-gray-500">
        btw… cooking something cool. stay tuned, it’s gonna drop soon 🚀
      </p>
    </div>
  );
}
