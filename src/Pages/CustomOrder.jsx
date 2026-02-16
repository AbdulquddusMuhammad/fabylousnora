import React, { useState } from "react";
import BackgroundImage from "../components/IMG/aboutusimgtwo.jpg";
import { supabase } from '../lib/supabaseClient';
import { useToast } from '../context/ToastContext';

function CustomOrder() {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const { setFromCustomOrder } = useContext(AppContext);

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const uploadImage = async (file) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `custom-orders/${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('product-images') // Using existing bucket
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const { data, error } = await supabase.from('orders').insert([
        {
          email,
          order_type: 'custom',
          status: 'pending',
          custom_details: { description },
          images: imageUrl ? [imageUrl] : [],
          total_amount: 0, // Will be set by admin later
          shipping_address: {}, // Placeholder
        }
      ]).select(); // Add .select() to get the inserted data

      if (error) throw error;

      // 3. Trigger Email Notification (Resend)
      // We don't block the UI for this, just fire and forget or log error quietly
      supabase.functions.invoke('resend-order-alert', {
        body: {
          order_id: data[0].id,
          email: email,
          total_amount: 0, // Custom orders might not have price yet
          order_type: 'custom',
          items: [],
          shipping_address: null
        }
      }).then(({ error }) => {
        if (error) console.error("Failed to send email alert:", error);
      });

      addToast("Request Sent Successfully! We will review it and get back to you shortly via email.", "success");

      // Reset form
      setEmail('');
      setDescription('');
      setSelectedFile(null);

    } catch (error) {
      console.error('Error submitting custom order:', error);
      addToast("Failed to send request. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex justify-center items-center p-4 overflow-hidden">
      {/* Background Image – responsive positioning */}
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-top md:bg-[center_top_15%]" style={{ backgroundImage: `url(${BackgroundImage})` }} />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Form Card – fully responsive */}
      <div className="relative bg-white p-6 sm:p-8 shadow-2xl w-full max-w-[480px] z-10 mx-4 sm:mx-0 my-12 sm:my-20">
        <h1
          className="text-1xl md:text-2xl font-bold text-gray-900 mb-3 text-center"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "30px",
            lineHeight: "100%",
            letterSpacing: "0%",
          }}>
          Custom Orders
        </h1>

        <p
          className="text-gray-600 mb-5 text-center text-sm md:text-base px-2"
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: "14px",
            lineHeight: "160%",
            letterSpacing: "0%",
          }}>
          Create a look that is uniquely yours. Our custom order service allows you to request one-of-a-kind piece tailored to your style, measurements, and event. Simply tell us what you’re envisioning, add helpful details, and upload inspiration images (if you have any).
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block font-nunito font-semibold text-[14px] text-gray-700 mb-1">
              Email Address
            </label>
            <input type="email" id="email" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 font-nunito text-[14px] text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition" />
          </div>

          {/* Description Field */}
          <div>
            <label htmlFor="description" className="block font-nunito font-semibold text-[14px] text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Describe your design, measurements, fabric preferences..."
              className="w-full p-3 border border-gray-300 rounded-md text-sm resize-y focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label htmlFor="imageUpload" className="block font-nunito font-semibold text-[14px] text-gray-700 mb-1 cursor-pointer">
              Upload Image
            </label>
            <input type="file" id="imageUpload" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange} className="block w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition" />
            {selectedFile && (
              <p className="mt-2 text-xs text-gray-600">
                Selected: <span className="font-medium">{selectedFile.name}</span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 py-2 bg-[rgba(72,31,128,1)] hover:bg-[rgba(72,31,128,0.9)] text-white font-nunito font-semibold text-[12px] transition-all duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CustomOrder;
