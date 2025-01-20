import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Clock, DollarSign, Trash2, Edit, Save, X } from 'lucide-react';
import { format } from 'date-fns';
import type { Commission, ArtworkType } from '../types';
import { exampleCommissions } from '../data/examples';

export default function CommissionDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [commission, setCommission] = React.useState<Commission | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  const [formData, setFormData] = React.useState<Commission | null>(null);

  React.useEffect(() => {
    // In a real app, this would be an API call
    const found = exampleCommissions.find(c => c.id === id);
    if (found) {
      setCommission(found);
      setFormData(found);
    }
  }, [id]);

  if (!commission || !formData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Commission not found</p>
      </div>
    );
  }

  const handleDelete = () => {
    // In a real app, this would make an API call
    console.log('Deleting commission:', commission.id);
    navigate('/dashboard/commissions');
  };

  const handleSave = () => {
    // In a real app, this would make an API call
    console.log('Saving commission:', formData);
    setCommission(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(commission);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/dashboard/commissions')}
          className="inline-flex items-center text-gray-500 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Commissions
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
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Commission
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-white hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Commission
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
                Commission from {formData.collector.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {formData.requestDetails.timeline?.requestedCompletion && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="date"
                        value={new Date(formData.requestDetails.timeline.requestedCompletion).toISOString().split('T')[0]}
                        onChange={(e) => setFormData(prev => ({
                          ...prev!,
                          requestDetails: {
                            ...prev!.requestDetails,
                            timeline: {
                              ...prev!.requestDetails.timeline,
                              requestedCompletion: new Date(e.target.value).toISOString(),
                            },
                          },
                        }))}
                        className="px-2 py-1 border-2 border-gray-200 rounded-lg"
                      />
                    ) : (
                      `Due by ${format(new Date(formData.requestDetails.timeline.requestedCompletion), 'MMM d, yyyy')}`
                    )}
                  </span>
                )}
                {formData.price && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {isEditing ? (
                      <input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({
                          ...prev!,
                          price: Number(e.target.value),
                        }))}
                        className="w-32 px-2 py-1 border-2 border-gray-200 rounded-lg"
                      />
                    ) : (
                      formData.price.toLocaleString()
                    )}
                  </span>
                )}
              </div>
            </div>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({
                ...prev!,
                status: e.target.value as Commission['status'],
              }))}
              className="px-3 py-1.5 rounded-lg text-sm font-medium border-2 border-gray-200"
            >
              <option value="new">New</option>
              <option value="review">Under Review</option>
              <option value="accepted">Accepted</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="deferred">Deferred</option>
              <option value="declined">Declined</option>
            </select>
          </div>

          {/* Contact Info */}
          <div className="mb-8">
            <h2 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h2>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    value={formData.collector.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev!,
                      collector: { ...prev!.collector, email: e.target.value },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Phone</label>
                  <input
                    type="tel"
                    value={formData.collector.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev!,
                      collector: { ...prev!.collector, phone: e.target.value },
                    }))}
                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                  />
                </div>
              </div>
            ) : (
              <div className="flex gap-4">
                <a
                  href={`mailto:${formData.collector.email}`}
                  className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {formData.collector.email}
                </a>
                {formData.collector.phone && (
                  <a
                    href={`tel:${formData.collector.phone}`}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-black bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {formData.collector.phone}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Commission Details */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-3">Request Details</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600">Type</label>
                    <select
                      value={formData.requestDetails.type}
                      onChange={(e) => setFormData(prev => ({
                        ...prev!,
                        requestDetails: {
                          ...prev!.requestDetails,
                          type: e.target.value as ArtworkType,
                        },
                      }))}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                    >
                      <option value="painting">Painting</option>
                      <option value="sculpture">Sculpture</option>
                      <option value="photography">Photography</option>
                      <option value="digital">Digital</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Medium</label>
                    <input
                      type="text"
                      value={formData.requestDetails.medium}
                      onChange={(e) => setFormData(prev => ({
                        ...prev!,
                        requestDetails: {
                          ...prev!.requestDetails,
                          medium: e.target.value,
                        },
                      }))}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Description</label>
                    <textarea
                      value={formData.requestDetails.description}
                      onChange={(e) => setFormData(prev => ({
                        ...prev!,
                        requestDetails: {
                          ...prev!.requestDetails,
                          description: e.target.value,
                        },
                      }))}
                      rows={4}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                    />
                  </div>
                </div>
              ) : (
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Type</dt>
                    <dd className="text-base text-gray-900">{formData.requestDetails.type}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Medium</dt>
                    <dd className="text-base text-gray-900">{formData.requestDetails.medium}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Dimensions</dt>
                    <dd className="text-base text-gray-900">
                      {formData.requestDetails.dimensions.height} × {formData.requestDetails.dimensions.width}
                      {formData.requestDetails.dimensions.depth && ` × ${formData.requestDetails.dimensions.depth}`}{' '}
                      {formData.requestDetails.dimensions.unit}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Description</dt>
                    <dd className="text-base text-gray-900">{formData.requestDetails.description}</dd>
                  </div>
                </dl>
              )}
            </div>

            <div>
              <h2 className="text-sm font-medium text-gray-700 mb-3">Pricing & Timeline</h2>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600">Price</label>
                    <input
                      type="number"
                      value={formData.price || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev!,
                        price: e.target.value ? Number(e.target.value) : undefined,
                      }))}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Deposit</label>
                    <input
                      type="number"
                      value={formData.deposit || ''}
                      onChange={(e) => setFormData(prev => ({
                        ...prev!,
                        deposit: e.target.value ? Number(e.target.value) : undefined,
                      }))}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({
                        ...prev!,
                        priority: e.target.value as Commission['priority'],
                      }))}
                      className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="rush">Rush</option>
                    </select>
                  </div>
                </div>
              ) : (
                <dl className="space-y-2">
                  {formData.price && (
                    <div>
                      <dt className="text-sm text-gray-500">Price</dt>
                      <dd className="text-base text-gray-900">${formData.price.toLocaleString()}</dd>
                    </div>
                  )}
                  {formData.deposit && (
                    <div>
                      <dt className="text-sm text-gray-500">Deposit Required</dt>
                      <dd className="text-base text-gray-900">${formData.deposit.toLocaleString()}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-sm text-gray-500">Priority</dt>
                    <dd className="text-base text-gray-900">
                      {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)}
                    </dd>
                  </div>
                </dl>
              )}
            </div>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Commission</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this commission? This action cannot be undone.
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