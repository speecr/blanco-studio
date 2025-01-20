import React from 'react';
import { Save, Truck } from 'lucide-react';

export default function ShippingSettingsForm() {
  const [formData, setFormData] = React.useState({
    preferredCarriers: ['FedEx', 'UPS'],
    specialPacking: {
      required: false,
      instructions: '',
    },
    localDelivery: {
      enabled: false,
      serviceArea: [],
      blancoService: false,
    },
    insurance: {
      required: true,
      provider: 'carrier',
    },
    packingMaterials: {
      artCrates: false,
      customBoxes: false,
      specializedPacking: false,
      notes: '',
    },
  });

  const carrierOptions = [
    'FedEx',
    'UPS',
    'DHL',
    'USPS',
    'Malca-Amit',
    'Masterpiece International',
    'Dietl International',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Saving shipping settings:', formData);
  };

  const toggleCarrier = (carrier: string) => {
    setFormData(prev => ({
      ...prev,
      preferredCarriers: prev.preferredCarriers.includes(carrier)
        ? prev.preferredCarriers.filter(c => c !== carrier)
        : [...prev.preferredCarriers, carrier],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferred Carriers</h3>
        <div className="grid grid-cols-2 gap-4">
          {carrierOptions.map(carrier => (
            <label
              key={carrier}
              className={`flex items-center p-4 border rounded-lg cursor-pointer ${
                formData.preferredCarriers.includes(carrier)
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.preferredCarriers.includes(carrier)}
                onChange={() => toggleCarrier(carrier)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">{carrier}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.specialPacking.required}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              specialPacking: { ...prev.specialPacking, required: e.target.checked },
            }))}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Requires special packing instructions
          </span>
        </label>
        {formData.specialPacking.required && (
          <textarea
            value={formData.specialPacking.instructions}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              specialPacking: { ...prev.specialPacking, instructions: e.target.value },
            }))}
            rows={3}
            className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter special packing instructions..."
          />
        )}
      </div>

      <div className="space-y-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.localDelivery.enabled}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              localDelivery: { ...prev.localDelivery, enabled: e.target.checked },
            }))}
            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <span className="text-sm font-medium text-gray-700">
            Offer local delivery
          </span>
        </label>

        {formData.localDelivery.enabled && (
          <div className="ml-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Service Area (ZIP Codes)
              </label>
              <input
                type="text"
                value={formData.localDelivery.serviceArea.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  localDelivery: {
                    ...prev.localDelivery,
                    serviceArea: e.target.value.split(',').map(zip => zip.trim()),
                  },
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., 10001, 10002, 10003"
              />
            </div>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.localDelivery.blancoService}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  localDelivery: {
                    ...prev.localDelivery,
                    blancoService: e.target.checked,
                  },
                }))}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">
                Opt in to Blanco local delivery service in New York
              </span>
            </label>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Insurance Requirements</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.insurance.required}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                insurance: { ...prev.insurance, required: e.target.checked },
              }))}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Require shipping insurance
            </span>
          </label>

          {formData.insurance.required && (
            <div className="ml-6">
              <label className="block text-sm font-medium text-gray-700">
                Preferred Insurance Provider
              </label>
              <select
                value={formData.insurance.provider}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  insurance: { ...prev.insurance, provider: e.target.value },
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="carrier">Carrier Insurance</option>
                <option value="third_party">Third-Party Insurance</option>
                <option value="blanco">Blanco Insurance Program</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Packing Materials</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.packingMaterials.artCrates}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                packingMaterials: {
                  ...prev.packingMaterials,
                  artCrates: e.target.checked,
                },
              }))}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Requires art crates</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.packingMaterials.customBoxes}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                packingMaterials: {
                  ...prev.packingMaterials,
                  customBoxes: e.target.checked,
                },
              }))}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Needs custom boxes</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.packingMaterials.specializedPacking}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                packingMaterials: {
                  ...prev.packingMaterials,
                  specializedPacking: e.target.checked,
                },
              }))}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Requires specialized packing materials</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              value={formData.packingMaterials.notes}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                packingMaterials: {
                  ...prev.packingMaterials,
                  notes: e.target.value,
                },
              }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Any specific requirements for packing materials..."
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>
    </form>
  );
}