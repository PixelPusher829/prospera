import {
  Bell,
  CreditCard,
  Globe,
  Lock,
  Save,
  Shield,
  User,
} from "lucide-react";
import type React from "react";
import { useState } from "react";
import Header from "@/shared/components/layout/Header";

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [formData, setFormData] = useState({
    name: "James Barnes",
    email: "james@prospera.com",
    notifications: true,
    marketing: false,
    currency: "USD",
    language: "English",
    twoFactor: true,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (activeSection === "profile") {
      if (!formData.name.trim()) {
        newErrors.name = "Name cannot be empty.";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email cannot be empty.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length > 0;
  };

  const handleSave = () => {
    if (validate()) {
      return;
    }
    // Mock save
    alert("Settings saved successfully!");
  };

  return (
    <div className="mx-auto max-w-[1600px] space-y-8 p-6 lg:p-10">
      <Header
        heading="Settings"
        subheading="Manage your account preferences"
        className="mb-8"
      >
        <></>
      </Header>

      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Settings Navigation */}
        <div className="flex w-full flex-col gap-2 lg:w-64">
          {[
            { id: "profile", label: "My Profile", icon: User },
            {
              id: "notifications",
              label: "Notifications",
              icon: Bell,
            },
            { id: "security", label: "Security", icon: Shield },
            {
              id: "billing",
              label: "Billing & Plan",
              icon: CreditCard,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "bg-primary-gradient text-white shadow-lg shadow-violet-200/50"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              } `}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {activeSection === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center gap-6 border-b border-slate-100 pb-6 dark:border-slate-700">
                <img
                  src="https://picsum.photos/100/100"
                  alt="Profile"
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-slate-50 dark:ring-slate-700"
                />
                <div>
                  <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600">
                    Change Photo
                  </button>
                  <p className="mt-2 text-xs text-slate-400">
                    JPG, GIF or PNG. Max size 800K
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      });
                      setErrors((prev) => ({ ...prev, name: "" }));
                    }}
                    className={`w-full rounded-xl border px-4 py-2.5 ${errors.name ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-slate-50 text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-900 dark:text-white`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      });
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    className={`w-full rounded-xl border px-4 py-2.5 ${errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-600"} bg-slate-50 text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-500 dark:bg-slate-900 dark:text-white`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Language
                  </label>
                  <div className="relative">
                    <Globe
                      size={18}
                      className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
                    />
                    <select
                      value={formData.language}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          language: e.target.value,
                        })
                      }
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        currency: e.target.value,
                      })
                    }
                    className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-700 transition-all outline-none focus:ring-2 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  >
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-slate-700 dark:text-white">
                Email Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                  <div>
                    <p className="font-medium text-slate-700 dark:text-white">
                      Weekly Report
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive a weekly summary of your financial activity
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          notifications: !formData.notifications,
                        })
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-violet-600 peer-focus:ring-4 peer-focus:ring-violet-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700 dark:peer-focus:ring-violet-800"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4 dark:bg-slate-900">
                  <div>
                    <p className="font-medium text-slate-700 dark:text-white">
                      Marketing & Updates
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Receive news about product updates and features
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={formData.marketing}
                      onChange={() =>
                        setFormData({
                          ...formData,
                          marketing: !formData.marketing,
                        })
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 peer-checked:bg-violet-600 peer-focus:ring-4 peer-focus:ring-violet-300 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-gray-600 dark:bg-slate-700 dark:peer-focus:ring-violet-800"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="space-y-6">
              <div className="mb-4 flex items-center gap-3">
                <Lock className="text-violet-600" size={24} />
                <h3 className="text-lg font-bold text-slate-700 dark:text-white">
                  Security Settings
                </h3>
              </div>

              <div className="rounded-xl border border-violet-100 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-900/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield
                      className="text-violet-600 dark:text-violet-400"
                      size={20}
                    />
                    <div>
                      <p className="font-medium text-slate-700 dark:text-white">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <button className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400">
                    Enable
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="mb-4 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />

                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-700 outline-none dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>
          )}

          {activeSection === "billing" && (
            <div className="py-10 text-center">
              <CreditCard
                size={48}
                className="mx-auto mb-4 text-slate-300 dark:text-slate-600"
              />
              <h3 className="text-lg font-bold text-slate-700 dark:text-white">
                Payment Method
              </h3>
              <p className="mb-6 text-slate-500 dark:text-slate-400">
                Manage your subscription and billing details
              </p>
              <button className="rounded-xl bg-violet-600 px-6 py-2 font-medium text-white hover:bg-violet-700">
                Add Payment Method
              </button>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-8 flex justify-end border-t border-slate-100 pt-6 dark:border-slate-700">
            <button
              onClick={handleSave}
              disabled={
                Object.keys(errors).some((key) => errors[key]) ||
                !formData.name.trim() ||
                !formData.email.trim()
              }
              className="flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-3 font-medium text-white shadow-lg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-violet-600"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
