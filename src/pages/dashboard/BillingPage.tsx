import React, { useState } from 'react';
import { 
  CreditCard, 
  Plus, 
  Gift, 
  DollarSign, 
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';

export const BillingPage: React.FC = () => {
  const [redeemCode, setRedeemCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock data - replace with real data from API
  const billingInfo = {
    credits: 150,
    hasPaymentMethod: true,
    lastPayment: '2024-01-15',
    subscriptionStatus: 'active' as const
  };

  const paymentMethods = [
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    }
  ];

  const transactions = [
    {
      id: '1',
      type: 'credit',
      amount: 200,
      description: 'Redeem code applied',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'debit',
      amount: 25,
      description: 'Application deployment',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      type: 'credit',
      amount: 100,
      description: 'Account credit purchase',
      date: '2024-01-10',
      status: 'completed'
    }
  ];

  const handleRedeemCode = async () => {
    if (!redeemCode.trim()) return;
    
    setLoading(true);
    
    // TODO: Implement actual redeem code logic
    console.log('Redeeming code:', redeemCode);
    
    setTimeout(() => {
      setLoading(false);
      setRedeemCode('');
      // Show success message
    }, 2000);
  };

  const handleAddPaymentMethod = () => {
    // TODO: Integrate with Stripe
    console.log('Adding payment method');
  };

  const handlePurchaseCredits = (amount: number) => {
    // TODO: Integrate with Stripe
    console.log('Purchasing credits:', amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing & Credits</h1>
        <p className="text-gray-600">Manage your billing information and account credits</p>
      </div>

      {/* Credits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available Credits</p>
                <p className="text-2xl font-bold text-gray-900">${billingInfo.credits}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Last Payment</p>
                <p className="text-2xl font-bold text-gray-900">{billingInfo.lastPayment}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              {billingInfo.subscriptionStatus === 'active' ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <AlertCircle className="h-8 w-8 text-red-600" />
              )}
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Status</p>
                <p className="text-2xl font-bold text-gray-900 capitalize">
                  {billingInfo.subscriptionStatus}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Redeem Code */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg font-semibold text-gray-900">Redeem Code</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Have a redeem code? Enter it below to add credits to your account.
            </p>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Enter redeem code"
                value={redeemCode}
                onChange={(e) => setRedeemCode(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleRedeemCode}
                loading={loading}
                disabled={!redeemCode.trim()}
              >
                Redeem
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Purchase Credits */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-900">Purchase Credits</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Add credits to your account to deploy and run applications.
            </p>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant="secondary" 
                onClick={() => handlePurchaseCredits(50)}
              >
                $50
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => handlePurchaseCredits(100)}
              >
                $100
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => handlePurchaseCredits(200)}
              >
                $200
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => handlePurchaseCredits(500)}
              >
                $500
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900">Payment Methods</h2>
            </div>
            <Button onClick={handleAddPaymentMethod}>
              <Plus className="h-4 w-4 mr-2" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {paymentMethods.length > 0 ? (
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {method.type.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        •••• •••• •••• {method.last4}
                      </p>
                      <p className="text-sm text-gray-500">
                        Expires {method.expiryMonth}/{method.expiryYear}
                      </p>
                    </div>
                    {method.isDefault && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
              <p className="mt-1 text-sm text-gray-500">
                Add a payment method to purchase credits and deploy applications.
              </p>
              <div className="mt-6">
                <Button onClick={handleAddPaymentMethod}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    transaction.type === 'credit' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">{transaction.status}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};