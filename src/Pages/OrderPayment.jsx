import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "../context/ToastContext";
import { CheckCircle, AlertCircle, ShoppingBag, ArrowRight } from "lucide-react";

// Replace with your real Publishable Key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const OrderPayment = () => {
    const { orderId } = useParams();
    const { addToast } = useToast();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .eq("id", orderId)
                .single();

            if (error) throw error;
            if (!data) throw new Error("Order not found");

            setOrder(data);
        } catch (err) {
            console.error("Error fetching order:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        setProcessing(true);
        try {
            // Call the Edge Function to create a checkout session
            const { data, error } = await supabase.functions.invoke("stripe-setup", {
                body: { orderId: order.id, email: order.email },
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            // Redirect to Stripe
            const stripe = await stripePromise;
            const { error: stripeError } = await stripe.redirectToCheckout({
                sessionId: data.id,
            });

            if (stripeError) throw stripeError;
        } catch (err) {
            console.error("Payment setup error:", err);
            addToast("Failed to initiate payment: " + err.message, "error");
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading details...</p>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
                    <p className="text-gray-600 mb-8">{error || "The order you are looking for does not exist or access is denied."}</p>
                    <Link to="/" className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    // If order is already paid
    if (order.status === 'paid' || order.status === 'shipped' || order.status === 'delivered') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Already Paid</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you! This order has already been paid for. Status: <span className="font-semibold uppercase text-green-600">{order.status}</span>
                    </p>
                    <Link to="/" className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-nunito">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: '"Playfair Display", serif' }}>
                        Complete Your Payment
                    </h1>
                    <p className="mt-2 text-gray-600">Secure checkout for Custom Order #{order.id}</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="p-8">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-8 border-b border-gray-100">
                            <div>
                                <p className="text-sm font-semibold text-pink-600 uppercase tracking-widest mb-1">Total Amount</p>
                                <p className="text-4xl font-bold text-gray-900">${Number(order.total_amount).toFixed(2)}</p>
                            </div>
                            <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200">
                                <p className="text-xs text-gray-500 mb-1">Order Date</p>
                                <p className="font-medium text-gray-900">{new Date(order.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="py-8 space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5 text-gray-400" /> Order Details
                                </h3>

                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Customer</p>
                                            <p className="font-medium text-gray-900">{order.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 mb-1">Order Type</p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 capitalize">
                                                {order.order_type || 'standard'}
                                            </span>
                                        </div>
                                        {/* Display custom details if available */}
                                        {order.custom_details && (
                                            <div className="md:col-span-2">
                                                <p className="text-sm text-gray-500 mb-1">Description</p>
                                                <p className="text-gray-900 text-sm leading-relaxed whitespace-pre-wrap">
                                                    {order.custom_details.description}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-100 flex flex-col items-center">
                            <button
                                onClick={handlePayment}
                                disabled={processing}
                                className="w-full md:w-auto md:min-w-[300px] bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing Securely...
                                    </>
                                ) : (
                                    <>
                                        Pay With Stripe <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                            <p className="mt-4 text-xs text-center text-gray-400">
                                Secured by Stripe. Your payment information is encrypted.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link to="/" className="text-sm text-gray-500 hover:text-pink-600 transition-colors">
                        Cancel and return to store
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderPayment;
