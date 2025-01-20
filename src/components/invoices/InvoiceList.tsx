import React from 'react';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Invoice } from '../../types';

interface InvoiceListProps {
  invoices: Invoice[];
  onDownload: (invoice: Invoice) => void;
}

export default function InvoiceList({ invoices, onDownload }: InvoiceListProps) {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          onClick={() => navigate(`/dashboard/invoices/${invoice.id}`)}
          className="bg-white rounded-xl border border-gray-100 hover:border-gray-200 transition-colors overflow-hidden cursor-pointer"
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{invoice.number}</h3>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    invoice.status === 'paid'
                      ? 'bg-green-100 text-green-800'
                      : invoice.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : invoice.status === 'overdue'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation
                  onDownload(invoice);
                }}
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              {invoice.artwork && (
                <>
                  <img
                    src={invoice.artwork.images[0]}
                    alt={invoice.artwork.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{invoice.artwork.title}</p>
                    <p className="text-sm text-gray-500">{invoice.buyer_info.name}</p>
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Amount:</span>
                <span className="ml-2 font-medium text-gray-900">
                  ${invoice.amount.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-gray-500">Due Date:</span>
                <span className="ml-2 text-gray-900">
                  {format(new Date(invoice.due_date), 'MMM d, yyyy')}
                </span>
              </div>
              {invoice.shipping && (
                <div className="col-span-2">
                  <span className="text-gray-500">Shipping:</span>
                  <span className="ml-2 text-gray-900">
                    ${invoice.shipping.cost.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}