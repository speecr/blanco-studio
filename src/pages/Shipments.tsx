import React from 'react';
import { Plus, Truck } from 'lucide-react';
import type { Shipment } from '../types';
import ShipmentList from '../components/shipments/ShipmentList';
import NewShipmentForm from '../components/shipments/NewShipmentForm';
import { exampleShipments } from '../data/examples';

export default function Shipments() {
  const [shipments] = React.useState<Shipment[]>(exampleShipments);
  const [showNewShipmentForm, setShowNewShipmentForm] = React.useState(false);
  const [filterStatus, setFilterStatus] = React.useState<Shipment['status'] | 'all'>('all');

  const filteredShipments = React.useMemo(() => {
    if (filterStatus === 'all') return shipments;
    return shipments.filter(shipment => shipment.status === filterStatus);
  }, [shipments, filterStatus]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Shipments</h1>
        <button
          onClick={() => setShowNewShipmentForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden md:inline">Create Shipment</span>
          <span className="md:hidden">New</span>
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 overflow-x-auto pb-2 md:pb-0">
        <div className="flex gap-2 min-w-max">
          {['all', 'preparing', 'shipped', 'delivered'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as Shipment['status'] | 'all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap ${
                filterStatus === status
                  ? 'bg-black text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status === 'all'
                ? 'All Shipments'
                : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {filteredShipments.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <Truck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Shipments</h3>
          <p className="text-gray-500">
            Create your first shipment to get started
          </p>
        </div>
      ) : (
        <ShipmentList
          shipments={filteredShipments}
          onStatusChange={(id, status) => {
            console.log('Status change:', id, status);
          }}
        />
      )}

      {/* New Shipment Form */}
      {showNewShipmentForm && (
        <NewShipmentForm
          onSubmit={async (shipment) => {
            console.log('New shipment:', shipment);
            setShowNewShipmentForm(false);
          }}
          onClose={() => setShowNewShipmentForm(false)}
        />
      )}
    </div>
  );
}