import Image from "next/image";
export default function HeroSection() {
    return (
        <section className="w-full h-screen flex mx-auto  items-center justify-between  bg-black">
            <div>
                <h1 className="text-5xl font-bold text-white mb-4">Welcome to ImageKit Upload Demo</h1>
                <p className="text-xl text-gray-300">Upload your images seamlessly with ImageKit</p>
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    uplaod Image
                </button>
            </div>
            <div>
                <Image width={500} height={300} src="/land.jpg" alt="iamge" />
            </div>
        </section>
    );
}