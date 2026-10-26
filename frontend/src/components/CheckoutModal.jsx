import { useState, useEffect } from 'react';
import { X, ShoppingBag, Truck, AlertCircle, CheckCircle2, ChevronDown, ChevronUp, MapPin, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { generateOrderWhatsAppLink, formatItemWeight } from '../utils/whatsapp';
import { WhatsAppIcon } from './Icons';

const CheckoutModal = () => {
  const { checkoutData, closeCheckout, clearCart } = useCart();
  const { isOpen, items, subtotal, isCartCheckout } = checkoutData;

  const [customerName, setCustomerName] = useState('');
  const [orderType, setOrderType] = useState(null); // 'takeaway' or 'delivery'
  const [address, setAddress] = useState({
    doorNo: '',
    street: '',
    area: '',
    city: '',
    state: 'Tamil Nadu',
    pincode: '',
    landmark: ''
  });

  const [errors, setErrors] = useState({});
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [submittedWhatsAppUrl, setSubmittedWhatsAppUrl] = useState('');
  const [showItemsList, setShowItemsList] = useState(true);

  // Reset form when modal opens with new checkout
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsOrderPlaced(false);
      setErrors({});
      setSubmittedWhatsAppUrl('');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setAddress(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleNameChange = (val) => {
    setCustomerName(val);
    if (errors.customerName) {
      setErrors(prev => ({ ...prev, customerName: null }));
    }
  };

  const handleOrderTypeSelect = (type) => {
    setOrderType(type);
    if (errors.orderType) {
      setErrors(prev => ({ ...prev, orderType: null }));
    }
  };

  // Location check for Neyveli & surrounding areas
  const getAreaNotice = () => {
    if (orderType !== 'delivery') return null;
    const combined = `${address.area} ${address.city}`.toLowerCase().trim();
    if (combined.length < 3) return null;

    const neyveliKeywords = [
      'neyveli', 'township', 'block', 'mandarakuppam', 'vadalur',
      'indira nagar', 'kurinjipadi', 'panruti', 'virudhachalam',
      'vriddhachalam', 'kullanchavadi', 'muthandikuppam', 'gangaikondan',
      'cuddalore', 'thermal', 'nlc'
    ];

    const matchesKeyword = neyveliKeywords.some(keyword => combined.includes(keyword));
    const isCuddalorePin = /^607\d{3}$/.test(address.pincode?.trim() || '');

    if (!matchesKeyword && !isCuddalorePin) {
      return 'Your entered location appears to be outside our standard local delivery area (Neyveli and surrounding areas). Please confirm delivery availability and charges directly with the shop owner on WhatsApp before finalizing.';
    }
    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Customer Name is required.';
    }

    if (!orderType) {
      newErrors.orderType = 'Please select Takeaway or Home Delivery.';
    }

    if (orderType === 'delivery') {
      if (!address.doorNo.trim()) {
        newErrors.doorNo = 'Door / House Number is required.';
      }
      if (!address.street.trim()) {
        newErrors.street = 'Street / Road Name is required.';
      }
      if (!address.area.trim()) {
        newErrors.area = 'Area / Locality is required.';
      }
      if (!address.city.trim()) {
        newErrors.city = 'Town / City is required.';
      }
      if (!address.state.trim()) {
        newErrors.state = 'State is required.';
      }
      
      const pin = address.pincode.trim();
      if (!pin) {
        newErrors.pincode = 'PIN Code is required.';
      } else if (!/^[1-9][0-9]{5}$/.test(pin)) {
        newErrors.pincode = 'Please enter a valid 6-digit Indian PIN code.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Scroll modal to top so user notices errors
      const modalBody = document.getElementById('checkout-modal-body');
      if (modalBody) {
        modalBody.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const orderData = {
      customerName,
      orderType,
      address,
      items: items || [],
      subtotal: subtotal || 0
    };

    const link = generateOrderWhatsAppLink(orderData);
    setSubmittedWhatsAppUrl(link);

    // Open WhatsApp
    window.open(link, '_blank');

    // If multi-item cart checkout, clear cart
    if (isCartCheckout) {
      clearCart();
    }

    setIsOrderPlaced(true);
  };

  const areaNotice = getAreaNotice();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 transition-opacity">
      <div 
        className="fixed inset-0" 
        onClick={closeCheckout} 
        aria-hidden="true" 
      />

      <div 
        className="relative bg-white w-full sm:max-w-lg md:max-w-xl max-h-[92vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 border border-softPink animate-fadeIn"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-softPink sticky top-0 z-20">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-softPink flex items-center justify-center text-primary font-bold">
              🍰
            </div>
            <div>
              <h2 id="checkout-title" className="text-lg font-bold text-textMain leading-tight">
                Checkout & Order Details
              </h2>
              <p className="text-xs text-textMuted">Mithu Homemade Cakes</p>
            </div>
          </div>
          <button 
            onClick={closeCheckout} 
            className="p-1.5 text-textMuted hover:text-primary hover:bg-softPink rounded-full transition-colors"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div 
          id="checkout-modal-body"
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 space-y-6 pb-32 sm:pb-8 bg-lightPink/40"
        >
          {isOrderPlaced ? (
            /* Confirmation State */
            <div className="bg-white rounded-2xl p-6 sm:p-8 text-center space-y-5 border border-softPink shadow-sm">
              <div className="w-16 h-16 bg-green-100 text-whatsapp rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-textMain mb-2">Order Details Prepared!</h3>
                <p className="text-sm text-textMuted leading-relaxed max-w-md mx-auto">
                  We have pre-filled your complete order message in WhatsApp. Please send the message to Mithu Homemade Cakes to confirm your order availability.
                </p>
              </div>

              <div className="bg-softPink/50 p-4 rounded-xl text-left text-xs text-textMain space-y-1.5 border border-softPink">
                <p><strong className="text-primary">Customer:</strong> {customerName}</p>
                <p><strong className="text-primary">Fulfilment:</strong> {orderType === 'delivery' ? 'Home Delivery' : 'Takeaway'}</p>
                <p><strong className="text-primary">Cake Subtotal:</strong> ₹{subtotal}</p>
                {orderType === 'delivery' && (
                  <p><strong className="text-primary">Delivery:</strong> Charges to be confirmed by the shop</p>
                )}
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={submittedWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-whatsapp hover:bg-green-600 text-white font-bold py-3.5 px-6 rounded-full shadow-md transition-all active:scale-[0.99]"
                >
                  <WhatsAppIcon size={20} />
                  Open WhatsApp
                </a>

                <button
                  type="button"
                  onClick={closeCheckout}
                  className="w-full clay-button-secondary text-sm py-2.5"
                >
                  Done & Close
                </button>
              </div>
            </div>
          ) : (
            /* Order Form */
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Order Items Accordion */}
              <div className="bg-white rounded-2xl border border-softPink shadow-sm overflow-hidden">
                <button
                  type="button"
                  onClick={() => setShowItemsList(!showItemsList)}
                  className="w-full px-4 py-3 bg-white flex items-center justify-between text-left hover:bg-softPink/20 transition-colors"
                >
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-textMain">
                      Order Items ({items.length} {items.length === 1 ? 'item' : 'items'})
                    </span>
                    <span className="text-xs bg-lightPink text-primary font-semibold px-2 py-0.5 rounded-full border border-softPink">
                      ₹{subtotal}
                    </span>
                  </div>
                  <div className="text-textMuted flex items-center text-xs font-medium">
                    <span className="mr-1">{showItemsList ? 'Hide' : 'View'}</span>
                    {showItemsList ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {showItemsList && (
                  <div className="p-4 border-t border-softPink/60 space-y-3 max-h-56 overflow-y-auto">
                    {items.map((item, idx) => (
                      <div key={`${item.id}-${item.weight}-${idx}`} className="flex items-center space-x-3 text-sm">
                        {item.image && (
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-12 h-12 rounded-lg object-cover border border-softPink flex-shrink-0" 
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-textMain truncate">{item.name}</p>
                          <p className="text-xs text-textMuted">
                            Weight: <span className="font-medium text-textMain">{formatItemWeight(item.weight, item.category)}</span> &bull; Qty: {item.quantity}
                          </p>
                          <p className="text-[11px] text-textMuted">
                            ₹{item.price} &times; {item.quantity} = <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Step 1: Customer Name */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-softPink shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="customer-name" className="block text-xs font-bold text-textMain uppercase tracking-wider">
                    Customer Name <span className="text-primary">*</span>
                  </label>
                  <span className="text-[11px] text-textMuted">Required</span>
                </div>
                <input
                  id="customer-name"
                  type="text"
                  value={customerName}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-3 bg-lightPink/30 border rounded-xl text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
                    errors.customerName ? 'border-red-400 focus:border-red-500' : 'border-pink-200 focus:border-primary'
                  }`}
                  autoComplete="name"
                />
                {errors.customerName && (
                  <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                    <AlertCircle size={13} /> {errors.customerName}
                  </p>
                )}
              </div>

              {/* Step 2: Takeaway or Delivery Selection */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-softPink shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-textMain uppercase tracking-wider">
                    Fulfilment Method <span className="text-primary">*</span>
                  </label>
                  <span className="text-[11px] text-textMuted">Choose one</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Takeaway Card */}
                  <button
                    type="button"
                    onClick={() => handleOrderTypeSelect('takeaway')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start space-x-3 ${
                      orderType === 'takeaway'
                        ? 'border-primary bg-softPink/40 shadow-sm'
                        : 'border-pink-100 bg-white hover:border-pink-200 hover:bg-lightPink/20'
                    }`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 ${orderType === 'takeaway' ? 'bg-primary text-white' : 'bg-softPink text-primary'}`}>
                      <Store size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-textMain">Takeaway</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          orderType === 'takeaway' ? 'border-primary bg-primary' : 'border-pink-300'
                        }`}>
                          {orderType === 'takeaway' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-textMuted mt-0.5">Pick up from shop</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-green-700 bg-green-50 px-1.5 py-0.5 rounded border border-green-200">
                        No delivery charge
                      </span>
                    </div>
                  </button>

                  {/* Home Delivery Card */}
                  <button
                    type="button"
                    onClick={() => handleOrderTypeSelect('delivery')}
                    className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-start space-x-3 ${
                      orderType === 'delivery'
                        ? 'border-primary bg-softPink/40 shadow-sm'
                        : 'border-pink-100 bg-white hover:border-pink-200 hover:bg-lightPink/20'
                    }`}
                  >
                    <div className={`p-2 rounded-xl flex-shrink-0 ${orderType === 'delivery' ? 'bg-primary text-white' : 'bg-softPink text-primary'}`}>
                      <Truck size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-textMain">Home Delivery</span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          orderType === 'delivery' ? 'border-primary bg-primary' : 'border-pink-300'
                        }`}>
                          {orderType === 'delivery' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-xs text-textMuted mt-0.5">Neyveli & nearby</p>
                      <span className="inline-block mt-1 text-[10px] font-medium text-primary bg-lightPink px-1.5 py-0.5 rounded border border-softPink">
                        Charges confirmed by shop
                      </span>
                    </div>
                  </button>
                </div>

                {errors.orderType && (
                  <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-1">
                    <AlertCircle size={13} /> {errors.orderType}
                  </p>
                )}

                {/* Takeaway Info Box */}
                {orderType === 'takeaway' && (
                  <div className="bg-lightPink p-3 rounded-xl border border-softPink text-xs text-textMain space-y-1">
                    <p className="font-semibold text-primary flex items-center gap-1.5">
                      <Store size={14} /> Shop Pickup Selected
                    </p>
                    <p className="text-textMuted leading-relaxed">
                      Your cake will be freshly baked for takeaway. No delivery fee applies. Pickup time and exact coordination will be confirmed by the shop owner on WhatsApp.
                    </p>
                  </div>
                )}

                {/* Delivery Notice Banner */}
                {orderType === 'delivery' && (
                  <div className="bg-softPink/60 p-3.5 rounded-xl border border-primary/20 text-xs text-textMain space-y-1.5">
                    <div className="flex items-start gap-1.5 font-bold text-primary">
                      <MapPin size={15} className="flex-shrink-0 mt-0.5" />
                      <span>Delivery Information:</span>
                    </div>
                    <p className="text-textMain font-medium leading-relaxed">
                      Home delivery is available only in Neyveli and surrounding areas. Delivery charges are applicable and will be confirmed by the shop.
                    </p>
                    <p className="text-[11px] text-textMuted leading-relaxed">
                      * Delivery charges are additional and not included in the cake subtotal. Delivery availability and final charges will be confirmed by the shop.
                    </p>
                  </div>
                )}
              </div>

              {/* Step 3: Delivery Address Form (Only shown if Home Delivery is selected) */}
              {orderType === 'delivery' && (
                <div className="bg-white rounded-2xl p-4 sm:p-5 border border-softPink shadow-sm space-y-4">
                  <div className="border-b border-softPink/60 pb-2">
                    <h3 className="text-xs font-bold text-textMain uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary" /> Delivery Address
                    </h3>
                    <p className="text-[11px] text-primary font-semibold mt-1">
                      Delivery is currently available only in Neyveli and surrounding areas.
                    </p>
                  </div>

                  {/* Area Notice Banner if entered outside Neyveli */}
                  {areaNotice && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-3 text-xs flex items-start gap-2">
                      <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-900">Area Availability Note</p>
                        <p className="mt-0.5 text-amber-800 leading-relaxed">{areaNotice}</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3.5">
                    {/* Door / House Number */}
                    <div>
                      <label htmlFor="addr-door" className="block text-xs font-semibold text-textMain mb-1">
                        Door / House Number <span className="text-primary">*</span>
                      </label>
                      <input
                        id="addr-door"
                        type="text"
                        value={address.doorNo}
                        onChange={(e) => handleInputChange('doorNo', e.target.value)}
                        placeholder="e.g. No. 12, Block 10, Flat 3B"
                        className={`w-full px-3.5 py-2.5 bg-lightPink/20 border rounded-xl text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.doorNo ? 'border-red-400' : 'border-pink-200 focus:border-primary'
                        }`}
                      />
                      {errors.doorNo && <p className="text-xs text-red-500 mt-1">{errors.doorNo}</p>}
                    </div>

                    {/* Street / Road Name */}
                    <div>
                      <label htmlFor="addr-street" className="block text-xs font-semibold text-textMain mb-1">
                        Street / Road Name <span className="text-primary">*</span>
                      </label>
                      <input
                        id="addr-street"
                        type="text"
                        value={address.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        placeholder="e.g. Gandhi Road / Main Street"
                        className={`w-full px-3.5 py-2.5 bg-lightPink/20 border rounded-xl text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.street ? 'border-red-400' : 'border-pink-200 focus:border-primary'
                        }`}
                      />
                      {errors.street && <p className="text-xs text-red-500 mt-1">{errors.street}</p>}
                    </div>

                    {/* Area / Locality */}
                    <div>
                      <label htmlFor="addr-area" className="block text-xs font-semibold text-textMain mb-1">
                        Area / Locality <span className="text-primary">*</span>
                      </label>
                      <input
                        id="addr-area"
                        type="text"
                        value={address.area}
                        onChange={(e) => handleInputChange('area', e.target.value)}
                        placeholder="e.g. Block 24 / Mandarakuppam / Indira Nagar"
                        className={`w-full px-3.5 py-2.5 bg-lightPink/20 border rounded-xl text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                          errors.area ? 'border-red-400' : 'border-pink-200 focus:border-primary'
                        }`}
                      />
                      {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
                    </div>

                    {/* Town / City & State */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="addr-city" className="block text-xs font-semibold text-textMain mb-1">
                          Town / City <span className="text-primary">*</span>
                        </label>
                        <input
                          id="addr-city"
                          type="text"
                          value={address.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="e.g. Neyveli / Neyveli Township"
                          className={`w-full px-3.5 py-2.5 bg-lightPink/20 border rounded-xl text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            errors.city ? 'border-red-400' : 'border-pink-200 focus:border-primary'
                          }`}
                        />
                        {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label htmlFor="addr-state" className="block text-xs font-semibold text-textMain mb-1">
                          State <span className="text-primary">*</span>
                        </label>
                        <input
                          id="addr-state"
                          type="text"
                          value={address.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          placeholder="State"
                          className={`w-full px-3.5 py-2.5 bg-lightPink/20 border rounded-xl text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            errors.state ? 'border-red-400' : 'border-pink-200 focus:border-primary'
                          }`}
                        />
                        {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                      </div>
                    </div>

                    {/* PIN Code & Landmark */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="addr-pincode" className="block text-xs font-semibold text-textMain mb-1">
                          PIN Code <span className="text-primary">*</span>
                        </label>
                        <input
                          id="addr-pincode"
                          type="text"
                          maxLength={6}
                          value={address.pincode}
                          onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 607801"
                          className={`w-full px-3.5 py-2.5 bg-lightPink/20 border rounded-xl text-textMain text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                            errors.pincode ? 'border-red-400' : 'border-pink-200 focus:border-primary'
                          }`}
                          inputMode="numeric"
                        />
                        {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode}</p>}
                      </div>

                      <div>
                        <label htmlFor="addr-landmark" className="block text-xs font-semibold text-textMain mb-1">
                          Landmark <span className="text-textMuted font-normal">(Optional)</span>
                        </label>
                        <input
                          id="addr-landmark"
                          type="text"
                          value={address.landmark}
                          onChange={(e) => handleInputChange('landmark', e.target.value)}
                          placeholder="e.g. Near Water Tank / School"
                          className="w-full px-3.5 py-2.5 bg-lightPink/20 border border-pink-200 rounded-xl text-textMain text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Price Breakdown Summary */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-softPink shadow-sm space-y-2.5">
                <h4 className="text-xs font-bold text-textMain uppercase tracking-wider mb-2">
                  Amount Summary
                </h4>
                
                <div className="flex justify-between text-sm text-textMain">
                  <span>Cake Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-sm text-textMain">
                  <span>Delivery Charge</span>
                  <span className="text-xs font-semibold text-textMuted">
                    {orderType === 'takeaway'
                      ? 'None (Takeaway)'
                      : orderType === 'delivery'
                      ? 'To be confirmed by the shop'
                      : 'Select fulfilment method'}
                  </span>
                </div>

                <div className="pt-2.5 border-t border-softPink flex justify-between items-baseline">
                  <div>
                    <span className="text-sm font-bold text-textMain block">Final Payable Amount</span>
                    <span className="text-[10px] text-textMuted">
                      {orderType === 'delivery' ? 'Cake total + delivery confirmed on WhatsApp' : 'Exact amount payable'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-extrabold text-primary">
                      ₹{subtotal}
                    </span>
                    {orderType === 'delivery' && (
                      <span className="block text-[10px] text-primary font-medium">+ Delivery</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-deepPink text-white font-bold py-3.5 sm:py-4 px-6 rounded-full shadow-clay-pink hover:shadow-clay-pink-hover transition-all duration-300 flex items-center justify-center text-base sm:text-lg gap-2 active:scale-[0.99]"
                >
                  <WhatsAppIcon size={22} className="text-white flex-shrink-0" />
                  <span>Place Order</span>
                </button>
                <p className="text-[11px] text-center text-textMuted mt-2">
                  Opens WhatsApp with shop: <span className="font-semibold text-textMain">+91 8825740442</span>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
