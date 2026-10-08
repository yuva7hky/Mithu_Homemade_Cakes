export const WHATSAPP_NUMBER = "918825740442";

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
