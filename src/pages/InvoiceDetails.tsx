import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Calendar, DollarSign, Truck, Download, Trash2, Edit, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import type { Invoice } from '../types';
import { exampleInvoices } from '../data/examples';

export default function InvoiceDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [invoice, setInvoice] = React.useState<Invoice | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [formData, setFormData] = React.useState<Invoice | null>(null);

  React.useEffect(() => {
    // In a real app, this would be an API call
    const found = exampleInvoices.find(i => i.id === id);
    if (found) {
      setInvoice(found);
      setFormData(found);
    }
  }, [id]);

  if (!invoice || !formData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Invoice not found</p>
      </div>
    );
  }

  const handleDelete = () => {
    // In a real app, this would make an API call
    console.log('Deleting invoice:', invoice.id);
    navigate('/dashboard/invoices');
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving invoice:', formData);
    setInvoice(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(invoice);
    setIsEditing(false);
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading invoice:', invoice.number);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/dashboard/invoices')}
          className="inline-flex items-center text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Invoices
        </button>
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-900"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleDownload}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Invoice
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Invoice
              </button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Invoice #{formData.number}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="date"
                      value={new Date(formData.dueDate).toISOString().split('T')[0]}
                      onChange={(e) => setFormData(prev => ({
                        ...prev!,
                        dueDate: new Date(e.target.value).toISOString(),
                      }))}
                      className="px-2 py-1 border-2 border-gray-200 rounded-lg"
                    />
                  ) : (
                    `Due ${format(new Date(formData.dueDate), 'MMM d, yyyy')}`
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData(prev => ({
                        ...prev!,
                        amount: Number(e.target.value),
                      }))}
                      className="w-32 px-2 py-1 border-2 border-gray-200 rounded-lg"
                    />
                  ) : (
                    formData.amount.toLocaleString()
                  )}
                </span>
              </div>
            </div>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({
                ...prev!,
                status: e.target.value as Invoice['status'],
              }))}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-gray-200"
            >
              <option value="draft">Draft</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {/* Artwork Info */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Artwork</h2>
            <div className="flex items-center gap-4">
              <img
                src={formData.artwork.images[0]}
                alt={formData.artwork.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="font-medium text-gray-900">{formData.artwork.title}</h3>
                <p className="text-sm text-gray-500">{formData.artwork.medium}</p>
              </div>
            </div>
          </div>

          {/* Buyer Info */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Buyer Information</h2>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    value={formData.buyer.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev!,
                      buyer: { ...prev!.buyer, email: e.target.value },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Phone</label>
                  <input
                    type="tel"
                    value={formData.buyer.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev!,
                      buyer: { ...prev!.buyer, phone: e.target.value },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Address</label>
                  <input
                    type="text"
                    value={formData.buyer.address}
                    onChange={(e) => setFormData(prev => ({
                      ...prev!,
                      buyer: { ...prev!.buyer, address: e.target.value },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Address Line 2</label>
                  <input
                    type="text"
                    value={formData.buyer.addressLine2}
                    onChange={(e) => setFormData(prev => ({
                      ...prev!,
                      buyer: { ...prev!.buyer, addressLine2: e.target.value },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex gap-4">
                  <a
                    href={`mailto:${formData.buyer.email}`}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {formData.buyer.email}
                  </a>
                  {formData.buyer.phone && (
                    <a
                      href={`tel:${formData.buyer.phone}`}
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-lg"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {formData.buyer.phone}
                    </a>
                  )}
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <p>{formData.buyer.address}</p>
                  {formData.buyer.addressLine2 && <p>{formData.buyer.addressLine2}</p>}
                </div>
              </>
            )}
          </div>

          {/* Shipping Info */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Shipping Information</h2>
            {isEditing ? (
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.shipping?.required}
                    onChange={(e) => setFormData(prev => ({
                      ...prev!,
                      shipping: {
                        ...prev!.shipping,
                        required: e.target.checked,
                      },
                    }))}
                    className="rounded border-gray-300 text-black focus:ring-black"
                  />
                  <span className="ml-2 text-sm text-gray-600">Requires shipping</span>
                </label>

                {formData.shipping?.required && (
                  <>
                    <div>
                      <label className="block text-sm text-gray-600">Shipping Cost</label>
                      <input
                        type="number"
                        value={formData.shipping.cost}
                        onChange={(e) => setFormData(prev => ({
                          ...prev!,
                          shipping: {
                            ...prev!.shipping,
                            cost: Number(e.target.value),
                          },
                        }))}
                         className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Carrier</label>
                      <input
                        type="text"
                        value={formData.shipping.carrier || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev!,
                          shipping: {
                            ...prev!.shipping,
                            carrier: e.target.value,
                          },
                        }))}
                        className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600">Tracking Number</label>
                      <input
                        type="text"
                        value={formData.shipping.trackingNumber || ''}
                        onChange={(e) => setFormData(prev => ({
                          ...prev!,
                          shipping: {
                            ...prev!.shipping,
                            trackingNumber: e.target.value,
                          },
                        }))}
                        className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              formData.shipping && (
                <>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>
                      {formData.shipping.localDelivery ? 'Local Delivery' : 'Standard Shipping'} - 
                      ${formData.shipping.cost.toLocaleString()}
                    </span>
                  </div>
                  {formData.shipping.carrier && (
                    <p className="mt-2 text-sm text-gray-600">
                      Carrier: {formData.shipping.carrier}
                      {formData.shipping.trackingNumber && ` (${formData.shipping.trackingNumber})`}
                    </p>
                  )}
                </>
              )
            )}
          </div>

          {/* Notes */}
          <div>
            <h2 className="text-sm font-medium text-gray-700 mb-3">Additional Notes</h2>
            {isEditing ? (
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({
                  ...prev!,
                  notes: e.target.value,
                }))}
                rows={4}
                className="block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
              />
            ) : (
              formData.notes && (
                <p className="text-base text-gray-900 whitespace-pre-line">{formData.notes}</p>
              )
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Invoice</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this invoice? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}