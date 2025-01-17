
const Hero = () => {
    return (
        <section className="">
            <div className="container mx-auto px-4 py-16 flex flex-col-reverse lg:flex-row items-center gap-8">
                {/* left side */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Discover Schools in your local area <br />
                        <span className="text-green-600">That Empower Your Future</span>
                    </h1>
                    <p className="text-gray-600 mt-4 text-lg">
                        Finding the perfect school has never been easier. From primary to secondary schools, and universities, we simplify the journey to help you find the best educational fit for you or your child.
                    </p>
                    <button className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                        Start Your Search
                    </button>
                </div>

                {/* right side */}
                <div className="lg:w-1/2 flex justify-center">
                    <img
                        src="/images/high-school-hero.png"
                        alt="Cameroon school system illustration"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
