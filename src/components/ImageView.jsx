const ImageView = ({ images = [], activeImage = {}, setActiveImage }) => {
    return (
        <div className="w-full md:w-1/2 space-y-2 md:space-y-4">
            <div className="w-full max-h-[550px] md:min-h-[450px] border border-black/10 rounded-md overflow-hidden">
                <img
                    src={activeImage?.url}
                    alt="productImage"
                    width={700}
                    height={700}
                    className="w-full h-96 max-h-[550px] md:min-h-[500px] object-contain group-hover:scale-110 rounded-md"
                />
            </div>
            <div className="grid grid-cols-6 gap-2">
                {images?.map((image) => (
                    <button
                        key={image?.id}
                        className={`border border-gray-300 rounded-md overflow-hidden ${
                            activeImage?.id === image?.id ? 'ring-1 ring-black' : ''
                        }`}
                        onClick={() => setActiveImage(image)}
                    >
                        <img
                            src={image.url}
                            alt="ProductImage"
                            width={100}
                            height={100}
                            className="w-full h-auto object-contain"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

export default ImageView
