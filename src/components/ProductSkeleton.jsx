import React from 'react';

const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="h-64 bg-gray-200 w-full" />
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                    <div className="h-5 bg-gray-200 rounded w-1/3" />
                </div>
            </div>
        </div>
    );
};

export default ProductSkeleton;
