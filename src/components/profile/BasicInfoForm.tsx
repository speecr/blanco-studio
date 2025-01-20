import React from 'react';
import { Save, Upload, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store';

export default function BasicInfoForm() {
  const { user, setUser } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const [formData, setFormData] = React.useState({
    // Profile Picture
    profilePicture: user?.avatar || '',

    // Basic Info
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    portfolioUrl: '',

    // Social Links
    socialLinks: {
      instagram: '',
      twitter: '',
      facebook: '',
      linkedin: '',
    },

    // Address Info
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  });

  // Load existing profile data
  React.useEffect(() => {
    async function loadProfile() {
      if (!user?.id) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          const social_links = {
            instagram: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            ...(data.social_links || {})
          };

          setFormData(prev => ({
            ...prev,
            profilePicture: data.avatar_url || '',
            name: data.name || '',
            phone: data.phone || '',
            portfolioUrl: data.website || '',
            socialLinks: social_links,
            address: data.address_info?.street || '',
            city: data.address_info?.city || '',
            state: data.address_info?.state || '',
            zip: data.address_info?.zip || '',
            country: data.address_info?.country || 'US',
          }));
        }
      } catch (err) {
        console.error('Error loading profile:', err);
      }
    }

    loadProfile();
  }, [user?.id]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/profile/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);

      setFormData(prev => ({ ...prev, profilePicture: publicUrl }));
    } catch (err) {
      console.error('Error uploading image:', err);
      setError('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: formData.name,
          avatar_url: formData.profilePicture,
          phone: formData.phone,
          website: formData.portfolioUrl,
          social_links: formData.socialLinks,
          address_info: {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zip: formData.zip,
            country: formData.country,
          },
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      // Update user state with new name and avatar
      setUser({
        ...user,
        name: formData.name,
        avatar: formData.profilePicture,
      });

      setSuccessMessage('Profile updated successfully');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {successMessage && (
        <div className="rounded-md bg-green-50 p-4">
          <p className="text-sm text-green-700">{successMessage}</p>
        </div>
      )}

      {/* Profile Picture */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Picture
        </label>
        <div className="flex items-center gap-4">
          {formData.profilePicture ? (
            <div className="relative">
              <img
                src={formData.profilePicture}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, profilePicture: '' }))}
                className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <label className="cursor-pointer">
            <span className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Upload New Picture
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Rest of the form remains the same */}
      {/* Basic Info Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Portfolio Website</label>
            <input
              type="url"
              value={formData.portfolioUrl}
              onChange={(e) => setFormData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Social Links</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Instagram</label>
            <input
              type="text"
              value={formData.socialLinks.instagram}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, instagram: e.target.value }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Twitter</label>
            <input
              type="text"
              value={formData.socialLinks.twitter}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, twitter: e.target.value }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Facebook</label>
            <input
              type="text"
              value={formData.socialLinks.facebook}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, facebook: e.target.value }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
            <input
              type="text"
              value={formData.socialLinks.linkedin}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Address</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              value={formData.zip}
              onChange={(e) => setFormData(prev => ({ ...prev, zip: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <select
              value={formData.country}
              onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="GB">United Kingdom</option>
              <option value="AU">Australia</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}