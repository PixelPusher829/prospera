import { Lock, Shield } from "lucide-react";
import type React from "react";
import Button from "@/shared/components/Button";
import { InputField } from "@/shared/components/forms";

const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mb-4 flex items-center gap-3">
        <Lock className="text-violet-600" size={24} />
        <h3 className="text-lg font-bold text-slate-700 dark:text-white">
          Security Settings
        </h3>
      </div>

      <div className="rounded-xl border border-violet-100 bg-violet-50 p-4 dark:border-violet-900 dark:bg-violet-700/20">
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
        <InputField
          label="Current Password"
          type="password"
          placeholder="••••••••"
          className="mb-4"
        />

        <InputField
          label="New Password"
          type="password"
          placeholder="••••••••"
        />
      </div>
    </div>
  );
};

export default SecuritySettings;
