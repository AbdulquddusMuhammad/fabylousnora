import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { DUMMY_PRODUCTS } from './ShopForMen'; // Assuming this path is correct
import ProductCard from '../components/ProductCard.jsx'; // Assuming this path is correct
import CartOverlay from './CartOverlay';

function ProductDetailsContent({ selectedSize, setSelectedSize, quantity, handleDecrement, handleIncrement }) {
  return (
    <>
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-3 text-base ">
          Select Size: <span className="font-normal text-gray-500">{selectedSize}</span>
        </h3>
        <div className="flex gap-3 flex-wrap">
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 border-2 font-bold text-sm transition
                ${selectedSize === size
                  ? 'border-[#6A0DAD] bg-[#6A0DAD] text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-[#6A0DAD]'
                }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="h-px bg-gray-200 my-8"></div>

      <div>
        <h3 className="font-bold text-gray-800 mb-3 text-base">Quantity:</h3>
        <div className="flex items-center border-2 border-gray-300 w-max">
          <button onClick={handleDecrement} className="px-5 py-3 text-xl hover:bg-gray-100">-</button>
          <span className="px-8 py-3 font-bold text-lg border-x-2 border-gray-300">{quantity}</span>
          <button onClick={handleIncrement} className="px-5 py-3 text-xl hover:bg-gray-100">+</button>
        </div>
      </div>
    </>
  );
}

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  // Changed default tab to 'details'
  const [activeTab, setActiveTab] = useState('details');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const [relatedProducts, setRelatedProducts] = useState([]);
  
  // NEW STATE: To control the visibility of the Cart Overlay
  const [showCart, setShowCart] = useState(false);
  
  // NEW STATE: Basic local cart state for demonstration
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const foundProduct = DUMMY_PRODUCTS.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);

      const others = DUMMY_PRODUCTS.filter(p => p.id !== foundProduct.id);
      const shuffled = others.sort(() => 0.5 - Math.random());
      setRelatedProducts(shuffled.slice(0, 8));
    } else {
      navigate('/category/men');
    }
  }, [id, navigate]);

  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleIncrement = () => setQuantity(prev => prev + 1);

  // NEW FUNCTION: Logic to add the product to the cart and open the overlay
  const handleAddToCart = () => {
    if (!product) return;

    const newItem = {
        cartId: `${product.id}-${selectedSize}`, 
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity: quantity,
    };

    setCartItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(
            item => item.cartId === newItem.cartId
        );

        if (existingItemIndex > -1) {
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex].quantity += newItem.quantity;
            return updatedItems;
        } else {
            return [...prevItems, newItem];
        }
    });
    
    setShowCart(true); 
  };

  const productDescriptionContent = `Gorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.\n\nGorem ipsum dolor sit amet, consectetur adipiscing elit.`;

  if (!product) return <div className="py-20 text-center text-xl">Loading...</div>;

  return (
    <main className="py-6 px-4 sm:px-6 lg:px-[6%] max-w-7xl mx-auto font-nunito">
        
      <CartOverlay 
        isOpen={showCart} 
        onClose={() => setShowCart(false)} 
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center text-gray-600 hover:text-[#6A0DAD] text-sm font-medium"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-8">
        {/* ==================== IMAGES SECTION ==================== */}
        <div className="flex lg:gap-8">
          <div className="flex-1">
            <div className="w-full aspect-[3/4] overflow-hidden bg-gray-50">
              <img
                src={selectedImage || product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:gap-6 lg:justify-start">
            {[product.image, product.image, product.image].map((img, i) => (
              <div
                key={i}
                onClick={() => setSelectedImage(img)}
                className="w-28 h-34 cursor-pointer"
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-5 mt-6 lg:hidden">
          {[product.image, product.image, product.image].map((img, i) => (
            <div
              key={i}
              onClick={() => setSelectedImage(img)}
              className="w-24 h-24 cursor-pointer"
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* ==================== DETAILS SECTION ==================== */}
        <div className="flex flex-col">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4" style={{ fontFamily: '"Playfair Display", serif' }}>
            {product.title}
          </h1>
          <p className="text-xl  text-[#6A0DAD] mb-2">
            ${product.price.toFixed(2)}
          </p>

          <div className="h-px bg-gray-200 my-4"></div>

          <div className="mb-6">
            {/* Swapped order: Details first, then Description */}
            <div className="flex gap-6 border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 text-lg font-bold relative ${activeTab === 'details' ? 'text-gray-900' : 'text-gray-500'}`}
              >
                Details
                {activeTab === 'details' && <span className="absolute text-[12px]  bottom-0 left-0 w-full h-1 bg-[#6A0DAD]"></span>}
              </button>
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-3 text-lg font-bold relative ${activeTab === 'description' ? 'text-gray-900' : 'text-gray-500'}`}
              >
                Description
                {activeTab === 'description' && <span className="absolute text-[12px]  bottom-0 left-0 w-full h-1 bg-[#6A0DAD]"></span>}
              </button>
            </div>

            <div className="text-gray-600 leading-relaxed">
              {activeTab === 'details' ? (
                <ProductDetailsContent
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  quantity={quantity}
                  handleDecrement={handleDecrement}
                  handleIncrement={handleIncrement}
                />
              ) : (
                <p className="whitespace-pre-line">{productDescriptionContent}</p>
              )}
            </div>
          </div>

          <div className="h-px bg-gray-200 my-3"></div>

          <div className="flex flex-col gap-4">
            <button 
                onClick={handleAddToCart}
                className="w-full bg-[#6A0DAD] hover:bg-[#5a0ca0] text-white text-[12px]  font-bold text-lg py-2 transition"
            >
              Add to Cart
            </button>
            <Link
              to="/category/men"
              className="w-full text-center text-[12px]  border-2 border-[#6A0DAD] hover:border-[#5a0ca0] text-[#6A0DAD] font-bold text-lg py-2 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* ==================== YOU MAY ALSO LIKE ================= */}
      <section className="mt-10 pb-5">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
          You May Also Like
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map(item => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </main> 
  );
}

export default ProductPage;