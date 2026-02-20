import { useState, useEffect } from "react";
import NoraLogo from "../components/IMG/noralogo.png";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function PaymentSuccess() {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    const fetchOrder = async (retries = 3) => {
      try {
        const { data, error } = await supabase.functions.invoke('get-order-details', {
          body: { session_id: sessionId }
        });

        if (error) throw error;

        if (data && data.error) {
          if (data.retry && retries > 0) {
            // Webhook might be slow, retry after delay
            setTimeout(() => fetchOrder(retries - 1), 2000);
            return;
          }
          throw new Error(data.error);
        }

        setOrder(data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
        setError("Could not retrieve order details. Please check your email.");
      } finally {
        if (retries === 0 || !error) setLoading(false);
      }
    };

    fetchOrder();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-nunito">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative">
        <div className="bg-green-500 h-2 w-full"></div>
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src={NoraLogo} alt="Logo" className="w-16 h-16 object-contain" />
            </Link>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-600">Thank you for your purchase.</p>
          </div>

          {order ? (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2">
                <span className="text-sm text-gray-500">Order ID</span>
                <span className="font-mono font-medium">#{order.id}</span>
              </div>

              <div className="space-y-3 mb-4">
                {order.order_items?.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-700 truncate w-2/3">{item.quantity}x {item.title}</span>
                    <span className="font-medium">${item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-green-600 text-lg">${order.total_amount.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 p-4 rounded-lg text-yellow-800 text-sm mb-6 text-center">
              {error || "Order details not found. Please check your email for confirmation."}
            </div>
          )}

          <div className="space-y-3">
            <Link to="/" className="block w-full bg-[#EC4899] hover:bg-pink-600 text-white font-bold py-3 px-4 rounded-xl text-center transition shadow-md hover:shadow-lg">
              Continue Shopping
            </Link>
            {order && (
              <button onClick={() => window.print()} className="block w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl text-center hover:bg-gray-50 transition">
                Print Receipt
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
