import React from 'react';
import { Save } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store';

export default function PayoutSettingsForm() {
  const user = useAuthStore(state => state.user);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  
  const [formData, setFormData] = React.useState({
    payoutMethod: 'bank',
    bankAccount: {
      accountName: '',
      accountNumber: '',
      routingNumber: '',
      bankName: '',
    },
    stripeConnected: false,
    payoutCadence: 'monthly',
    billingAddress: {
      address: '',
      city: '',
      state: '',
      zip: '',
      country: 'US',
    },
    taxInfo: {
      taxId: '',
      businessType: 'individual',
      w9Submitted: false,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          payout_settings: formData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (updateError) throw updateError;
    } catch (err) {
      console.error('Error saving payout settings:', err);
      setError('Failed to save payout settings');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Payout Method */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Payout Method
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, payoutMethod: 'bank' }))}
            className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
              formData.payoutMethod === 'bank'
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-left">
              <p className="font-medium text-gray-900">Bank Account (ACH)</p>
              <p className="text-sm text-gray-500">Direct deposit to your bank</p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setFormData(prev => ({ ...prev, payoutMethod: 'stripe' }))}
            className={`p-4 border-2 rounded-lg flex items-center gap-3 ${
              formData.payoutMethod === 'stripe'
                ? 'border-black bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-left">
              <p className="font-medium text-gray-900">Stripe</p>
              <p className="text-sm text-gray-500">Connect your Stripe account</p>
            </div>
          </button>
        </div>
      </div>

      {/* Bank Account Details */}
      {formData.payoutMethod === 'bank' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Account Name</label>
            <input
              type="text"
              value={formData.bankAccount.accountName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                bankAccount: { ...prev.bankAccount, accountName: e.target.value },
              }))}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Account Number</label>
              <input
                type="text"
                value={formData.bankAccount.accountNumber}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  bankAccount: { ...prev.bankAccount, accountNumber: e.target.value },
                }))}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Routing Number</label>
              <input
                type="text"
                value={formData.bankAccount.routingNumber}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  bankAccount: { ...prev.bankAccount, routingNumber: e.target.value },
                }))}
                className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              value={formData.bankAccount.bankName}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                bankAccount: { ...prev.bankAccount, bankName: e.target.value },
              }))}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            />
          </div>
        </div>
      )}

      {/* Payout Cadence */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Payout Cadence
        </label>
        <select
          value={formData.payoutCadence}
          onChange={(e) => setFormData(prev => ({ ...prev, payoutCadence: e.target.value }))}
          className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Bi-weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Billing Address</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            value={formData.billingAddress.address}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              billingAddress: { ...prev.billingAddress, address: e.target.value },
            }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={formData.billingAddress.city}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                billingAddress: { ...prev.billingAddress, city: e.target.value },
              }))}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              value={formData.billingAddress.state}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                billingAddress: { ...prev.billingAddress, state: e.target.value },
              }))}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              value={formData.billingAddress.zip}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                billingAddress: { ...prev.billingAddress, zip: e.target.value },
              }))}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <select
              value={formData.billingAddress.country}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                billingAddress: { ...prev.billingAddress, country: e.target.value },
              }))}
              className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tax Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Tax Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tax ID (SSN/EIN)</label>
          <input
            type="text"
            value={formData.taxInfo.taxId}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              taxInfo: { ...prev.taxInfo, taxId: e.target.value },
            }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Business Type</label>
          <select
            value={formData.taxInfo.businessType}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              taxInfo: { ...prev.taxInfo, businessType: e.target.value },
            }))}
            className="mt-1 block w-full rounded-lg border-2 border-gray-200 px-4 py-2 focus:border-black focus:ring-black transition-colors"
          >
            <option value="individual">Individual/Sole Proprietor</option>
            <option value="llc">LLC</option>
            <option value="corporation">Corporation</option>
            <option value="partnership">Partnership</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}