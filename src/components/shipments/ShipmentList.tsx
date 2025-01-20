import React from 'react';
import { format } from 'date-fns';
import { Package, MapPin } from 'lucide-react';
import type { Shipment } from '../../types';

interface ShipmentListProps {
  shipments: Shipment[];
  onStatusChange: (id: string, status: Shipment['status']) => void;
}

export default function ShipmentList({ shipments, onStatusChange }: ShipmentListProps) {
  return (
    <div className="space-y-4">
      {shipments.map((shipment) => (
        <div
          key={shipment.id}
          className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors overflow-hidden"
        >
          <div className="p-4">
            {/* Header with Status */}
            <div className="flex items-center justify-between mb-4">
              <select
                value={shipment.status}
                onChange={(e) => onStatusChange(shipment.id, e.target.value as Shipment['status'])}
                className={`px-3 py-1 rounded-lg text-sm font-medium ${
                  shipment.status === 'delivered'
                    ? 'bg-green-100 text-green-800'
                    : shipment.status === 'shipped'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                <option value="preparing">Preparing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Artwork Info */}
            <div className="flex items-center gap-3 mb-4">
              <img
                src={shipment.artwork.images[0]}
                alt={shipment.artwork.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {shipment.artwork.title}
                </h3>
                <p className="text-sm text-gray-500">{shipment.buyer.name}</p>
              </div>
            </div>

            {/* Tracking Info */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Tracking Information
                </h4>
                {shipment.trackingNumber ? (
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      Tracking Number: {shipment.trackingNumber}
                    </p>
                    <p className="text-gray-600">
                      Carrier: {shipment.carrier}
                    </p>
                    {shipment.estimatedDelivery && (
                      <p className="text-gray-600">
                        Estimated Delivery:{' '}
                        {format(new Date(shipment.estimatedDelivery), 'MMM d, yyyy')}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    Tracking information will be available once shipped
                  </p>
                )}
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Shipping Address
                </h4>
                <div className="text-sm text-gray-600">
                  <p>{shipment.shippingAddress.street}</p>
                  {shipment.shippingAddress.unit && (
                    <p>Unit {shipment.shippingAddress.unit}</p>
                  )}
                  <p>
                    {shipment.shippingAddress.city}, {shipment.shippingAddress.state}{' '}
                    {shipment.shippingAddress.zip}
                  </p>
                  <p>{shipment.shippingAddress.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}