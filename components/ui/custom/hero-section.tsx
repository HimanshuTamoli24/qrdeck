import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();
    return (
        <section className="w-full h-screen flex mx-auto  items-center justify-between  bg-black">
            <div>
                <h1 className="text-5xl font-bold text-white mb-4">Welcome to ImageKit Upload Demo</h1>
                <p className="text-xl text-gray-300">Upload your images seamlessly with ImageKit</p>
                <button onClick={() => router.push('/preview')} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Get started
                </button>
            </div>
            <div>
                <Image width={500} height={300} src="/land.jpg" alt="iamge" />
            </div>
        </section>
    );
}