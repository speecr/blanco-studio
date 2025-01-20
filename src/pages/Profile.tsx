import React from 'react';
import { Tabs, TabList, Tab, TabPanel } from '../components/Tabs';
import BasicInfoForm from '../components/profile/BasicInfoForm';
import PayoutSettingsForm from '../components/profile/PayoutSettingsForm';
import StudioVisitSettingsForm from '../components/profile/StudioVisitSettingsForm';
import ShippingSettingsForm from '../components/profile/ShippingSettingsForm';
import MarketplaceSettingsForm from '../components/profile/MarketplaceSettingsForm';

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Settings</h1>

      <Tabs defaultTab="basic-info">
        {/* Mobile-optimized tab list with horizontal scroll */}
        <div className="mb-6 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="overflow-x-auto pb-2 md:pb-0">
            <TabList className="flex md:inline-flex min-w-max md:min-w-0">
              <Tab id="basic-info">Basic Info</Tab>
              <Tab id="marketplace">Marketplace</Tab>
              <Tab id="payout">Payout Settings</Tab>
              <Tab id="studio-visits">Studio Visit Settings</Tab>
              <Tab id="shipping">Shipping</Tab>
            </TabList>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-0">
          <TabPanel id="basic-info">
            <BasicInfoForm />
          </TabPanel>
          <TabPanel id="marketplace">
            <MarketplaceSettingsForm />
          </TabPanel>
          <TabPanel id="payout">
            <PayoutSettingsForm />
          </TabPanel>
          <TabPanel id="studio-visits">
            <StudioVisitSettingsForm />
          </TabPanel>
          <TabPanel id="shipping">
            <ShippingSettingsForm />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  );
}