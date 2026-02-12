import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiUploadCloud, FiChevronDown, FiArrowRight, FiCheck, FiCalendar 
} from 'react-icons/fi';
import { postFood } from '../api/api'; 
import type { FoodPostData } from '../api/api';

const ShareFood = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FoodPostData & { handling?: string }>({
    title: '',
    category: '',
    description: '',
    quantity: '',
    unit: '',
    condition: 'Fresh',
    pickupWindow: { from: '09:00', to: '17:00' },
    pickupAddress: '',
    expiryDate: '',
    urgency: 'Medium',
    image: null,
    handling: '' // Added based on your screenshot
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
      if (errors.image) setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title) newErrors.title = "Food title is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.quantity) newErrors.quantity = "Required";
    if (!formData.unit) newErrors.unit = "Required";
    if (!formData.pickupAddress) newErrors.pickupAddress = "Address is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Please select an expiry date";
    if (!formData.image) newErrors.image = "Please upload an image";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await postFood(formData);
      setShowSuccess(true);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white font-sans">
      {/* SUCCESS MODAL */}
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-[32px] p-10 max-w-md w-full mx-4 shadow-2xl text-center animate-modalScale">
            <div className="w-20 h-20 bg-[#e9f6f3] rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 bg-[#058177] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#058177]/20">
                <FiCheck size={28} strokeWidth={3} />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Food posted!</h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Your post is now visible to partner organizations. You'll be notified when someone claims this item.
            </p>
            <button 
              onClick={() => navigate('/my-postings')}
              className="w-full bg-[#058177] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#046c64] transition-all active:scale-[0.98]"
            >
              View my postings
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="w-full px-4 md:px-16 py-6">
        <button onClick={() => navigate(-1)} className="p-3 rounded-full border border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-all">
          <FiArrowLeft size={24} className="text-gray-700" />
        </button>
      </header>

      <main className={`max-w-[1400px] mx-auto px-6 lg:px-20 pb-20 ${showSuccess ? 'blur-sm pointer-events-none' : ''}`}>
        <h1 className="text-3xl font-bold text-gray-900 mb-10">Post Food</h1>

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-20">
          
          {/* UPLOAD BOX */}
          <div className="w-full lg:w-[500px]">
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`lg:sticky lg:top-24 border-2 border-dashed rounded-[32px] aspect-video lg:aspect-square flex flex-col items-center justify-center overflow-hidden transition-all ${
                errors.image ? "border-red-500 bg-red-50/30" : "border-gray-100 bg-gray-50/50 hover:bg-gray-100"
              }`}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8 group cursor-pointer">
                  <div className="p-5 bg-white rounded-full shadow-sm mb-4 inline-block group-hover:scale-110 transition-transform">
                    <FiUploadCloud size={42} className="text-gray-400" />
                  </div>
                  <p className="text-[#058177] font-bold text-lg mb-1">Click to upload</p>
                  <p className="text-xs text-gray-400">PNG or JPG (Keep photos clear and close-up)</p>
                </div>
              )}
            </div>
          </div>

          {/* FORM FIELDS */}
          <div className="flex-1 space-y-12">
            {/* Section 1: Food Details */}
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Food Details</h2>
              <div className="grid gap-6">
                <InputGroup label="Food Title*" placeholder="e.g. Assorted fruits & vegetables" value={formData.title} error={errors.title} onChange={(val) => setFormData({...formData, title: val})} />
                
                <SelectGroup label="Category*" options={['Produce', 'Bakery', 'Dairy', 'Prepared']} value={formData.category} error={errors.category} onChange={(val) => setFormData({...formData, category: val})} />

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Description*</label>
                  <textarea rows={4} placeholder="Any notes about packaging, quality, allergens, or sorting.." className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#058177] transition-all" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <InputGroup label="Quantity*" placeholder="e.g. 15" value={formData.quantity} error={errors.quantity} onChange={(val) => setFormData({...formData, quantity: val})} />
                  <SelectGroup label="Unit*" options={['kg', 'lbs', 'Items', 'Boxes']} value={formData.unit} error={errors.unit} onChange={(val) => setFormData({...formData, unit: val})} />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Condition*</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Fresh', 'Frozen', 'Shelf-stable', 'Prepared'].map((opt) => (
                      <RadioBox key={opt} label={opt} selected={formData.condition === opt} onClick={() => setFormData({...formData, condition: opt})} />
                    ))}
                  </div>
                </div>

                <InputGroup label="Handling Requirements (optional)" placeholder="e.g. Keep refrigerated, handle with gloves" value={formData.handling || ''} onChange={(val) => setFormData({...formData, handling: val})} />
              </div>
            </section>

            {/* Section 2: Pickup */}
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Pickup Window</h2>
              <div className="grid grid-cols-2 gap-6">
                <TimeInput label="From*" value={formData.pickupWindow.from} onChange={(val) => setFormData({...formData, pickupWindow: {...formData.pickupWindow, from: val}})} />
                <TimeInput label="To*" value={formData.pickupWindow.to} onChange={(val) => setFormData({...formData, pickupWindow: {...formData.pickupWindow, to: val}})} />
              </div>
              <InputGroup label="Pickup Address*" placeholder="e.g. (416) 555-0123" value={formData.pickupAddress} error={errors.pickupAddress} onChange={(val) => setFormData({...formData, pickupAddress: val})} />
            </section>

            {/* Section 3: Urgency */}
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Urgency</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Expiry*</label>
                  <div className="relative">
                    <input type="date" className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#058177] appearance-none" value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} />
                    <FiCalendar className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Urgency*</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['Low', 'Medium', 'High'].map((opt) => (
                      <RadioBox key={opt} label={opt} selected={formData.urgency === opt} onClick={() => setFormData({...formData, urgency: opt})} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-[#058177] hover:bg-[#046c64] text-white py-5 rounded-[20px] font-bold flex items-center justify-center gap-3 transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? 'Posting...' : 'Post Food'} <FiArrowRight size={20} />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */

interface FieldProps {
  label: string; placeholder?: string; value: string; error?: string; onChange: (val: string) => void; options?: string[];
}

const InputGroup = ({ label, placeholder, value, error, onChange }: FieldProps) => (
  <div className="space-y-2">
    <label className={`block text-sm font-semibold ${error ? "text-red-600" : "text-gray-700"}`}>{label}</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`w-full border rounded-2xl px-5 py-4 outline-none transition-all ${error ? "border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#058177]"}`} />
    {error && <p className="text-xs font-bold text-red-500">{error}</p>}
  </div>
);

const SelectGroup = ({ label, options, value, error, onChange }: FieldProps) => (
  <div className="space-y-2 relative">
    <label className={`block text-sm font-semibold ${error ? "text-red-600" : "text-gray-700"}`}>{label}</label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`w-full appearance-none bg-white border rounded-2xl px-5 py-4 outline-none transition-all ${error ? "border-red-500 bg-red-50/20" : "border-gray-200 focus:border-[#058177]"}`}>
        <option value="" disabled>Select a {label.toLowerCase().replace('*', '')}</option>
        {options?.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <FiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
    </div>
  </div>
);

const TimeInput = ({ label, value, onChange }: FieldProps) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <input type="time" value={value} onChange={(e) => onChange(e.target.value)} className="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-[#058177] transition-all" />
  </div>
);

const RadioBox = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
  <div onClick={onClick} className={`flex items-center gap-3 border-2 rounded-2xl px-5 py-4 cursor-pointer transition-all ${selected ? 'border-[#058177] bg-[#e9f6f3]' : 'border-gray-100 bg-white hover:border-gray-200'}`}>
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-[#058177]' : 'border-gray-300'}`}>
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#058177]" />}
    </div>
    <span className={`text-sm font-bold ${selected ? 'text-[#058177]' : 'text-gray-500'}`}>{label}</span>
  </div>
);

export default ShareFood;