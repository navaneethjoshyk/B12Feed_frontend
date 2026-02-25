import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { ChangeEvent, FormEvent } from 'react';
import { 
  HiArrowLeft, 
  HiArrowRight, 
  HiChevronDown, 
  HiCheck, 
  HiOutlineCloudUpload,
  HiOutlineCalendar
} from 'react-icons/hi';

import { postFood, updateFoodPost, getPostById } from '../api/api'; 
import type { FoodPostData } from '../api/api';

interface FormErrors { [key: string]: string; }

const ShareFood: React.FC = () => {
  const { id: editId } = useParams<{ id: string }>();
  const isEditMode = Boolean(editId);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FoodPostData>({
    title: '',
    category: '',
    description: '',
    quantity: '',
    unit: '',
    condition: '', 
    pickupWindow: { from: '', to: '' },
    pickupAddress: '', 
    expiryDate: '',
    urgency: '',
    image: null
  });

  // AUTO-FILL LOGIC FOR EDIT MODE
  useEffect(() => {
    if (isEditMode && editId) {
      const loadPostData = async () => {
        setIsLoading(true);
        try {
          const data = await getPostById(editId);
          
          // Format date to YYYY-MM-DD for the date input
          const formattedDate = data.expiryDate ? new Date(data.expiryDate).toISOString().split('T')[0] : '';
          
          setFormData({
            ...data,
            expiryDate: formattedDate
          });

          // Handle nested backend image structure or flat image string
          const existingImg = data.resource_image?.[0]?.image?.[0] || data.image;
          if (existingImg && typeof existingImg === 'string') {
            setImagePreview(existingImg);
          }
        } catch (err: any) {
          setErrors({ submit: err.message || "Could not load post details." });
        } finally {
          setIsLoading(false);
        }
      };
      loadPostData();
    }
  }, [isEditMode, editId]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
      if (errors.image) setErrors(prev => ({ ...prev, image: '' }));
    }
  };

  const handleQuantityChange = (val: string) => {
    const numericValue = val.replace(/[^0-9.]/g, '');
    setFormData({ ...formData, quantity: numericValue });
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.title) newErrors.title = "Add a short title.";
    if (!formData.category) newErrors.category = "Please select a category.";
    if (!formData.description) newErrors.description = "Please add a description.";
    if (!formData.quantity || isNaN(Number(formData.quantity))) newErrors.quantity = "Enter valid number.";
    if (!formData.unit) newErrors.unit = "Select a unit.";
    if (!formData.condition) newErrors.condition = "Choose condition.";
    if (!formData.pickupWindow.from) newErrors.pickupFrom = "Select start time.";
    if (!formData.pickupWindow.to) newErrors.pickupTo = "Select end time.";
    if (!formData.pickupAddress) newErrors.pickupAddress = "Address is required.";
    if (!formData.expiryDate) newErrors.expiryDate = "Select expiry.";
    if (!formData.urgency) newErrors.urgency = "Select urgency.";
    if (!formData.image && !imagePreview) newErrors.image = "Upload an image.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    try {
      let status;
      if (isEditMode && editId) {
        status = await updateFoodPost(editId, formData);
      } else {
        status = await postFood(formData);
      }
      
      if (status === 200 || status === 201) {
        setShowSuccess(true);
      }
    } catch (err: any) {
      setErrors({ submit: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#058177] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-bold text-gray-500">Loading post details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white font-sans text-gray-900">
      {showSuccess && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] p-8 md:p-10 max-w-md w-full shadow-2xl text-center">
            <div className="w-20 h-20 bg-[#e9f6f3] rounded-full flex items-center justify-center mx-auto mb-6">
              <div className="w-12 h-12 bg-[#058177] rounded-full flex items-center justify-center text-white">
                <HiCheck size={28} />
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">
              {isEditMode ? "Post Updated!" : "Food posted!"}
            </h2>
            <p className="text-gray-500 mb-8">
              {isEditMode ? "Your changes have been saved." : "Your post is now visible to the community."}
            </p>
            <button 
              onClick={() => navigate("/my-postings")}
              className="w-full bg-[#058177] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#046c64] transition-all"
            >
              View my postings
            </button>
          </div>
        </div>
      )}

      <header className="w-full px-4 md:px-16 py-6 border-b border-gray-50 mb-8 flex justify-between items-center">
        <button 
          type="button"
          onClick={() => navigate(isEditMode ? "/my-postings" : "/discover")}
          className="p-3 rounded-full border border-gray-100 bg-gray-50/50 hover:bg-gray-100 transition-all"
        >
          <HiArrowLeft size={24} className="text-gray-700" />
        </button>
      </header>

      <main className={`max-w-[1200px] mx-auto px-6 pb-20 ${showSuccess ? 'blur-sm pointer-events-none' : ''}`}>
        <h1 className="text-3xl font-bold text-gray-900 mb-10">
          {isEditMode ? "Edit your posting" : "Post food for donation"}
        </h1>

        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-medium">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row-reverse gap-12 lg:gap-16">
          <div className="w-full lg:w-[420px] shrink-0">
            <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`sticky top-8 border-2 border-dashed rounded-[32px] aspect-video lg:aspect-square flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all ${
                errors.image ? "border-red-500 bg-red-50/10" : "border-gray-200 bg-gray-50/50 hover:bg-gray-100"
              }`}
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-8">
                  <div className="p-5 bg-white rounded-full shadow-sm mb-4 inline-block">
                    <HiOutlineCloudUpload size={42} className="text-gray-400" />
                  </div>
                  <p className="text-[#058177] font-bold text-lg">Click to upload photo</p>
                  <p className="text-gray-400 text-sm mt-1">Clear photos help donors trust you</p>
                </div>
              )}
            </div>
            {errors.image && <p className="text-red-500 text-sm mt-3 text-center font-medium">{errors.image}</p>}
          </div>

          <div className="flex-1 space-y-12">
            <section className="space-y-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Food Details</h2>
              <div className="grid gap-6">
                <InputGroup label="Food Title*" placeholder="e.g. 50 Fresh Apples" value={formData.title} error={errors.title} onChange={(val) => setFormData({...formData, title: val})} />
                <SelectGroup label="Category*" options={['Produce', 'Bakery', 'Dairy', 'Prepared Meals', 'Pantry']} value={formData.category} error={errors.category} onChange={(val) => setFormData({...formData, category: val})} />
                
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Description*</label>
                  <textarea rows={4} className={`w-full border rounded-2xl px-5 py-4 outline-none transition-all resize-none font-medium ${errors.description ? "border-red-500" : "border-gray-200 focus:border-[#058177]"}`} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe what's included and any dietary info..." />
                  {errors.description && <p className="text-red-500 text-sm font-medium">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <InputGroup label="Quantity*" placeholder="0" type="text" value={formData.quantity} error={errors.quantity} onChange={handleQuantityChange} />
                  <SelectGroup label="Unit*" options={['crate', 'boxes', 'bags', 'portions', 'kg', 'lbs']} value={formData.unit} error={errors.unit} onChange={(val) => setFormData({...formData, unit: val})} />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Condition*</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Fresh', 'Frozen', 'Shelf-stable', 'Prepared'].map((opt) => (
                      <RadioBox key={opt} label={opt} selected={formData.condition === opt} onClick={() => setFormData({...formData, condition: opt})} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Pickup Location</h2>
              <InputGroup label="Pickup Address*" placeholder="Enter your full street address" value={formData.pickupAddress} error={errors.pickupAddress} onChange={(val) => setFormData({...formData, pickupAddress: val})} />
              <div className="grid grid-cols-2 gap-6">
                <TimeInput label="Available From*" value={formData.pickupWindow.from} error={errors.pickupFrom} onChange={(val) => setFormData({...formData, pickupWindow: {...formData.pickupWindow, from: val}})} />
                <TimeInput label="Available To*" value={formData.pickupWindow.to} error={errors.pickupTo} onChange={(val) => setFormData({...formData, pickupWindow: {...formData.pickupWindow, to: val}})} />
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Urgency & Safety</h2>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">Expiry Date*</label>
                <div className="relative">
                  <input type="date" className={`w-full border rounded-2xl px-5 py-4 outline-none font-medium ${errors.expiryDate ? "border-red-500" : "border-gray-200 focus:border-[#058177]"}`} value={formData.expiryDate} onChange={(e) => setFormData({...formData, expiryDate: e.target.value})} />
                  <HiOutlineCalendar className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Low', 'Medium', 'High'].map((opt) => (
                  <RadioBox key={opt} label={opt} selected={formData.urgency === opt} onClick={() => setFormData({...formData, urgency: opt})} />
                ))}
              </div>
            </section>

            <button type="submit" disabled={isSubmitting} className="w-full bg-[#058177] hover:bg-[#046c64] text-white py-5 rounded-[20px] font-bold flex items-center justify-center gap-3 transition-all text-lg disabled:opacity-70 shadow-xl shadow-[#058177]/20">
              {isSubmitting ? (isEditMode ? 'Saving Changes...' : 'Posting...') : (isEditMode ? 'Save Changes' : 'Confirm & Post')} 
              <HiArrowRight size={20} />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

/* --- HELPER COMPONENTS --- */
const InputGroup: React.FC<{label: string, placeholder: string, value: string, error?: string, type?: string, onChange: (val: string) => void}> = ({ label, placeholder, value, error, type = "text", onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-gray-700">{label}</label>
    <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`w-full border rounded-2xl px-5 py-4 outline-none font-medium transition-colors ${error ? "border-red-500 bg-red-50/10" : "border-gray-200 focus:border-[#058177]"}`} />
    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
  </div>
);

const SelectGroup: React.FC<{label: string, options: string[], value: string, error?: string, onChange: (val: string) => void}> = ({ label, options, value, error, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-gray-700">{label}</label>
    <div className="relative">
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`w-full appearance-none bg-white border rounded-2xl px-5 py-4 outline-none font-medium ${error ? "border-red-500" : "border-gray-200 focus:border-[#058177]"}`}>
        <option value="" disabled>Select {label.replace('*', '')}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <HiChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    </div>
    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
  </div>
);

const TimeInput: React.FC<{label: string, value: string, onChange: (val: string) => void, error?: string}> = ({ label, value, onChange, error }) => (
  <div className="space-y-2">
    <label className="block text-sm font-bold text-gray-700">{label}</label>
    <input type="time" value={value} onChange={(e) => onChange(e.target.value)} className={`w-full border rounded-2xl px-5 py-4 outline-none font-medium ${error ? "border-red-500" : "border-gray-200 focus:border-[#058177]"}`} />
    {error && <p className="text-red-500 text-xs mt-1 font-medium">{error}</p>}
  </div>
);

const RadioBox: React.FC<{label: string, selected: boolean, onClick: () => void}> = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-3 border rounded-2xl px-5 py-4 cursor-pointer transition-all ${selected ? 'border-[#058177] bg-[#e9f6f3]' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'border-[#058177]' : 'border-gray-300'}`}>
      {selected && <div className="w-2.5 h-2.5 rounded-full bg-[#058177]" />}
    </div>
    <span className={`text-sm font-bold ${selected ? 'text-[#058177]' : 'text-gray-500'}`}>{label}</span>
  </div>
);

export default ShareFood;