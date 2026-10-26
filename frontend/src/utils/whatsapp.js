export const WHATSAPP_NUMBER = "918825740442";

export const formatItemWeight = (weight, category) => {
  if (weight === 0.25 || weight === '0.25') return '250g / 0.25 KG';
  if (category === 'treats' && (weight === 1 || weight === '1')) return '1 Pack';
  if (typeof weight === 'number') return `${weight} KG`;
  if (!weight) return 'Standard';
  return String(weight).toLowerCase().includes('kg') ? String(weight) : `${weight} KG`;
};

/**
 * Generates the complete, standardized WhatsApp order message according to specification
 */
export const generateOrderWhatsAppMessage = ({ customerName, orderType, address, items, subtotal }) => {
  const isDelivery = orderType === 'delivery';

  const orderItemsText = items.map((item) => {
    const weightText = formatItemWeight(item.weight, item.category);
    const unitPrice = item.price;
    const itemTotal = item.price * item.quantity;
    return `- Cake Name: ${item.name}
- Weight: ${weightText}
- Quantity: ${item.quantity}
- Unit Price: ₹${unitPrice}
- Item Total: ₹${itemTotal}`;
  }).join('\n\n');

  let text = `NEW CAKE ORDER — MITHU HOMEMADE CAKES\n\n`;
  text += `Customer Name: ${customerName.trim()}\n\n`;
  text += `ORDER ITEMS:\n${orderItemsText}\n\n`;
  text += `Cake Subtotal: ₹${subtotal}\n\n`;
  text += `Order Type: ${isDelivery ? 'Home Delivery' : 'Takeaway'}\n\n`;

  if (isDelivery) {
    text += `IF DELIVERY:\n`;
    text += `Door / House No: ${address.doorNo.trim()}\n`;
    text += `Street / Road: ${address.street.trim()}\n`;
    text += `Area / Locality: ${address.area.trim()}\n`;
    text += `Town / City: ${address.city.trim()}\n`;
    text += `State: ${address.state.trim()}\n`;
    text += `PIN Code: ${address.pincode.trim()}\n`;
    if (address.landmark && address.landmark.trim()) {
      text += `Landmark: ${address.landmark.trim()}\n`;
    }
    text += `\nDelivery Charge: To be confirmed by the shop.\n\n`;
    text += `FINAL AMOUNT:\n`;
    text += `Cake Subtotal: ₹${subtotal}\n`;
    text += `Delivery Charge: Additional, to be confirmed if applicable.\n`;
    text += `Final payable amount: To be confirmed by the shop if delivery charges have not been established.\n\n`;
    text += `Please confirm availability, delivery charges if applicable, and the order details.`;
  } else {
    text += `FINAL AMOUNT:\n`;
    text += `Cake Subtotal: ₹${subtotal}\n`;
    text += `Delivery Charge: None (Takeaway)\n`;
    text += `Final payable amount: ₹${subtotal}\n\n`;
    text += `Please confirm availability and the order details.`;
  }

  return text;
};

export const generateOrderWhatsAppLink = (orderData) => {
  const text = generateOrderWhatsAppMessage(orderData);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const generateSingleProductWhatsAppLink = (product, weight, quantity, price) => {
  const text = `🍰 MITHU HOMEMADE CAKES — ORDER ENQUIRY

Cake: ${product.name}
Weight: ${weight === 0.25 ? '250g / 0.25 KG' : weight + ' KG'}
Quantity: ${quantity}
Price: ₹${price * quantity}

I would like to order this item through your website.

Please confirm availability and delivery details.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const generateCartWhatsAppLink = (cartItems, total) => {
  let text = `🍰 MITHU HOMEMADE CAKES — ORDER\n\n`;
  
  cartItems.forEach((item, index) => {
    const weightText = item.weight === 0.25 ? '250g / 0.25 KG' : (item.weight === 1 && item.category === 'treats' ? '1 Pack' : item.weight + ' KG');
    text += `${index + 1}. ${item.name}
   Weight: ${weightText}
   Qty: ${item.quantity}
   Price: ₹${item.price * item.quantity}\n\n`;
  });

  text += `------------------------\nSubtotal: ₹${total}\n------------------------\n\n`;
  text += `I would like to place this order.\n\nPlease confirm availability and delivery details.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const generateCustomizedEnquiryLink = (product) => {
  const text = `🎂 MITHU HOMEMADE CAKES — CUSTOM CAKE ENQUIRY

Cake: ${product.name}

Hi, I would like to know more details and pricing for this customized cake.

Please share the available options.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const generateGeneralEnquiryLink = () => {
  const text = `Hi Mithu Homemade Cakes, I have an enquiry.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const generateCakeInquiryWhatsAppLink = (cakeName) => {
  const text = `Hi Mithu Homemade Cakes! I would like to know more about ${cakeName}. Please share the available sizes, price, and details.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

