import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  serverName: z
    .string()
    .min(3, 'Server name must be at least 3 characters')
    .max(30, 'Server name must be a maximum of 30 characters'),
  adminEmail: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),

  ram: z
    .string({ required_error: 'Ram size is required' })
    .refine((val) => val !== '', {
      message: 'Ram size is required',
    })
    .refine((val) => ['2GB', '4GB', '8GB'].includes(val), {
      message: 'Invalid ram size selected',
    }),

  version: z
    .string({ required_error: 'Version is required' })
    .refine((val) => val !== '', {
      message: 'Version is required',
    })
    .refine((val) => ['1.20.4', '1.19.4', '1.12.2'].includes(val), {
      message: 'Invalid version selected',
    }),

  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms of service',
  }),
});

export default function ServerProvisionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  });
  console.log(errors);
  const onSubmit = (data) => {
    console.log('Form submitted successfully:', data);
    // TODO: Handle the API submission logic
    reset();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Provision New Server</h2>

      {/* TODO: Wire up the form onSubmit handler */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Server Name Field */}
        <div>
          <label
            htmlFor="serverName"
            className="block text-sm font-medium mb-1"
          >
            Server Name
          </label>
          <input
            type="text"
            id="serverName"
            {...register('serverName')}
            placeholder="e.g., Survival Realm"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-blue-500 focus:border-blue-500"
            // TODO: Register input
          />
          {/* TODO: Render Server Name error here */}
          {errors.serverName && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.serverName.message}
            </span>
          )}
        </div>

        {/* Admin Email Field */}
        <div>
          <label
            htmlFor="adminEmail"
            className="block text-sm font-medium mb-1"
          >
            Admin Email
          </label>
          <input
            type="email"
            {...register('adminEmail')}
            id="adminEmail"
            placeholder="admin@example.com"
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-blue-500 focus:border-blue-500"
            // TODO: Register input
          />
          {errors.adminEmail && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.adminEmail.message}
            </span>
          )}
        </div>

        {/* RAM Allocation Dropdown */}
        <div>
          <label htmlFor="ram" className="block text-sm font-medium mb-1">
            RAM Allocation
          </label>
          <select
            id="ram"
            {...register('ram')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-blue-500 focus:border-blue-500"
            // TODO: Register input
          >
            <option value="">Select RAM</option>
            <option value="2GB">2GB (Starter)</option>
            <option value="4GB">4GB (Standard)</option>
            <option value="8GB">8GB (Pro)</option>
          </select>
          {errors.ram && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.ram.message}
            </span>
          )}
        </div>

        {/* Minecraft Version Dropdown */}
        <div>
          <label htmlFor="version" className="block text-sm font-medium mb-1">
            Minecraft Version
          </label>
          <select
            id="version"
            {...register('version')}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:ring-blue-500 focus:border-blue-500"
            // TODO: Register input
          >
            <option value="">Select Version</option>
            <option value="1.20.4">1.20.4 (Latest)</option>
            <option value="1.19.4">1.19.4</option>
            <option value="1.12.2">1.12.2 (Legacy Mods)</option>
          </select>
          {errors.version && (
            <span className="text-red-500 text-xs mt-1 block">
              {errors.version.message}
            </span>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="terms"
            {...register('terms')}
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
            // TODO: Register input
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
            I agree to the Terms of Service
          </label>
        </div>
        {errors.terms && (
          <span className="text-red-500 text-xs mt-1 block">
            {errors.terms.message}
          </span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Deploy Server
        </button>
      </form>
    </div>
  );
}
