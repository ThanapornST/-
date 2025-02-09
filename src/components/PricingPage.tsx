import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PenLine, Package, CheckCircle, CreditCard, QrCode, ChevronDown } from 'lucide-react';

const PricingPage = () => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  // Dummy receipt data
  const [receiptData, setReceiptData] = useState({
    orderNumber: '240726-1234',
    date: 'July 26, 2024',
    time: '14:35',
    paymentMethod: '',
    amount: '99.00',
    items: [
      { name: '10,000 แถว', quantity: 1, price: '99.00' },
      { name: 'แถมฟรี 1,200 แถว', quantity: 1, price: '0.00' },
    ],
  });

  const handleOpenPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setSelectedPaymentMethod(null);
  };

  const handleSelectPaymentMethod = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleBuyNow = () => {
    if (selectedPaymentMethod) {
      // Show the receipt modal regardless of the payment method
      setReceiptData(prev => ({ ...prev, paymentMethod: selectedPaymentMethod }));
      setIsReceiptModalOpen(true);
      handleClosePaymentModal();
    } else {
      alert('Please select a payment method.');
    }
  };

  const handleCloseQRCodeModal = () => {
    setIsQRCodeModalOpen(false);
    // For now, just show the receipt after scanning the QR code
    setReceiptData(prev => ({ ...prev, paymentMethod: 'PromptPay' }));
    setIsReceiptModalOpen(true);
    handleClosePaymentModal();
  };

  const handleCloseReceiptModal = () => {
    setIsReceiptModalOpen(false);
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <header className="bg-blue-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-4">
            สร้างเรื่องราวของคุณ <br />
            แล้วเปลี่ยนเป็นนิยายเสียงได้ในคลิกเดียว!
          </h1>
          <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            ทดลองใช้งาน
          </Link>
          <p className="mt-2 text-sm text-gray-600">
            🎉 เริ่มต้นฟรี! 400 คำแรก ฟรี! 🎉 <br />
            ทดลองสร้างเนื้อหาก่อนตัดสินใจ
          </p>
        </div>
      </header>

      {/* FAQ Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">Frequently asked questions</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Can I pause my subscription?</h3>
                <button className="text-gray-500">+</button>
              </div>
              <p className="text-sm text-gray-600">
                Yes, you can pause your subscription up to one day before your next billing date.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">What payment methods do you accept?</h3>
                <button className="text-gray-500">+</button>
              </div>
              <p className="text-sm text-gray-600">
                We accept PromptPay, credit and debit cards, and TrueMoney Wallet. <br />
                Can I try the service before paying?
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Can I try the service before paying?</h3>
                <button className="text-gray-500">+</button>
              </div>
              <p className="text-sm text-gray-600">
                Yes! You'll receive 2,000 free credits on your first use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">ดีลพิเศษ</h2>
          <p className="text-lg text-gray-700 mb-8 text-center">ยิ่งซื้อเยอะยิ่งได้เยอะ</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Offer 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-500 rounded-md p-2 mr-3">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">1,000 แถว</p>
                  <p className="text-sm text-gray-500">แถมฟรี 200 แถว !!</p>
                </div>
              </div>
              <p className="text-gray-700">ราคา 99 บาท</p>
              <button
                onClick={handleOpenPaymentModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              >
                Buy
              </button>
            </div>

            {/* Offer 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-500 rounded-md p-2 mr-3">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">5,000 แถว</p>
                  <p className="text-sm text-gray-500">แถมฟรี 500 แถว !!</p>
                </div>
              </div>
              <p className="text-gray-700">ราคา 399 บาท</p>
              <button
                onClick={handleOpenPaymentModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              >
                Buy
              </button>
            </div>

            {/* Offer 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-500 rounded-md p-2 mr-3">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">10,000 แถว</p>
                  <p className="text-sm text-gray-500">แถมฟรี 1,200 แถว !!</p>
                </div>
              </div>
              <p className="text-gray-700">ราคา 699 บาท</p>
              <button
                onClick={handleOpenPaymentModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              >
                Buy
              </button>
            </div>

            {/* Offer 4 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 text-blue-500 rounded-md p-2 mr-3">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">25,000 แถว</p>
                  <p className="text-sm text-gray-500">แถมฟรี 3,000 แถว !!</p>
                </div>
              </div>
              <p className="text-gray-700">ราคา 1,599 บาท</p>
              <button
                onClick={handleOpenPaymentModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 w-full"
              >
                Buy
              </button>
            </div>
          </div>

          {/* Additional Packages */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">แพ็กแถวสำหรับสร้างเนื้อหา</h3>
              <p className="text-sm text-gray-400 mb-4">ให้ AI ช่วยให้คุณเขียนนิยายง่ายได้ง่ายขึ้น</p>
              <ul className="space-y-2">
                <li>⚡ 800 คำ = 100 แถว</li>
                <li>⚡ 1,600 คำ = 200 แถว</li>
                <li>⚡ 2,400 คำ = 250 แถว</li>
              </ul>
            </div>

            <div className="bg-gray-800 text-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">เปลี่ยนนิยายเป็นนิยายเสียง</h3>
              <p className="text-sm text-gray-400 mb-4">ให้ AI อ่านนิยายของคุณเป็นเสียง หรือเลือกเสียงจากเรา</p>
              <ul className="space-y-2">
                <li>100 แถว = 🔊 1,000 คำ</li>
                <li>300 แถว = 🔊 5,000 คำ</li>
                <li>500 แถว = 🔊 10,000 คำ</li>
              </ul>
            </div>
          </div>

          {/* Why Use Packs Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">ทำไมต้องใช้แพ็กเกจ?</h2>
            <ul className="list-disc list-inside space-y-4 text-gray-700">
              <li>เริ่มต้นเพียง 99 บาท! ซื้อแพ็กเกจเลย!</li>
              <li>รองรับไฟล์เสียงคุณภาพสูง</li>
              <li>สร้างนิยายได้ทุกแนว ไม่ว่าจะเป็นโรแมนซ์ แฟนตาซี หรือสืบสวน</li>
              <li>แปลงเป็นเสียง AI ฟังนิยายของคุณได้ทุกที่</li>
              <li>มีรายได้จากนิยายเสียง สร้างผลงานและทำเงินไปพร้อมกัน</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 WriteWhisper. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-[#0f0f0f] w-full max-w-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">หน้าสรุปคำสั่งซื้อ</h2>
            <div className="flex justify-between items-center mb-2 text-white">
              <span>Pack 10000 pt แถม 2500 pt</span>
              <span>THB 99.00</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-white">
              <span>Subtotal</span>
              <span>THB 99.00</span>
            </div>
            <div className="text-blue-500 text-sm mb-4">Add promotion code</div>
            <div className="flex justify-between items-center mb-4 text-white">
              <span>Total due</span>
              <span>THB 99.00</span>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">เลือกวิธีการชำระเงิน</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleSelectPaymentMethod('PromptPay')}
                className={`flex items-center justify-between w-full p-3 rounded-lg border ${
                  selectedPaymentMethod === 'PromptPay' ? 'border-blue-500' : 'border-gray-700'
                } text-white`}
              >
                <div className="flex items-center">
                  <QrCode className="w-5 h-5 mr-2" />
                  <span>QR พร้อมเพย์</span>
                </div>
              </button>
              <button
                onClick={() => handleSelectPaymentMethod('TrueMoney')}
                className={`flex items-center justify-between w-full p-3 rounded-lg border ${
                  selectedPaymentMethod === 'TrueMoney' ? 'border-blue-500' : 'border-gray-700'
                } text-white`}
              >
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span>TrueMoney Wallet</span>
                </div>
              </button>
              <button
                onClick={() => handleSelectPaymentMethod('CreditCard')}
                className={`flex items-center justify-between w-full p-3 rounded-lg border ${
                  selectedPaymentMethod === 'CreditCard' ? 'border-blue-500' : 'border-gray-700'
                } text-white`}
              >
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 mr-2" />
                  <span>บัตรเครดิต/เดบิต</span>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="text-blue-500 text-sm">+ เพิ่มบัตรเครดิต/เดบิต</div>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors mt-6"
            >
              Buy now
            </button>
            <button
              onClick={handleClosePaymentModal}
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {isQRCodeModalOpen && selectedPaymentMethod === 'PromptPay' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Scan with your bank app or payment app</h2>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" // Replace with your actual QR code image
              alt="PromptPay QR Code"
              className="w-48 h-48 mx-auto mb-4"
            />
            <p className="text-sm text-gray-600 mb-4">
              PromptPay is supported by bank apps and payment apps such as KBank, SCB, Bangkok Bank, Krungthai Bank and Krungsri.
            </p>
            <button className="flex items-center justify-center mx-auto text-sm text-blue-500 hover:text-blue-400">
              <CreditCard className="w-4 h-4 mr-1" />
              Copy link for sharing
            </button>
            <button
              onClick={handleCloseQRCodeModal}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Receipt Modal */}
      {isReceiptModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-semibold text-center mb-6">Payment Successful!</h2>
            <div className="border-b border-gray-200 pb-4 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Order Number:</span>
                <span>{receiptData.orderNumber}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Date:</span>
                <span>{receiptData.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Time:</span>
                <span>{receiptData.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Payment Method:</span>
                <span>{receiptData.paymentMethod}</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-2">Order Details</h3>
            <ul className="space-y-2">
              {receiptData.items.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span>{item.quantity} x {item.price} THB</span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total:</span>
                <span className="text-xl font-bold">{receiptData.amount} THB</span>
              </div>
            </div>

            <button
              onClick={handleCloseReceiptModal}
              className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
