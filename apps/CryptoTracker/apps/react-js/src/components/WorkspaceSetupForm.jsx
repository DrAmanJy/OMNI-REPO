import React from 'react';
import {
  Building2,
  Link2,
  Users,
  Mail,
  Plus,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 1. The Zod Schema (Your single source of truth for validation)
const workspaceSchema = z.object({
  workspaceName: z
    .string({ required_error: 'Name is required' })
    .min(3, 'Must be at least 3 characters')
    .max(20, 'Maximum 20 characters'),

  workspaceUrl: z
    .string()
    .url('Must be a valid URL (e.g., https://example.com)')
    .refine((url) => !url.includes('admin'), {
      message: 'URL cannot contain the word "admin"',
    }),

  companySize: z.enum(['1-10', '11-50', '50+'], {
    errorMap: () => ({ message: 'Please select a company size' }),
  }),

  invites: z
    .array(
      z.object({
        email: z
          .string()
          .min(1, 'Email is required')
          .email('Invalid email address'),
      })
    )
    .min(1, 'You must invite at least one team member'),
});

export default function WorkspaceSetupForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(workspaceSchema), // Connecting Zod to React Hook Form
    defaultValues: {
      workspaceName: '',
      workspaceUrl: 'https://',
      companySize: '',
      invites: [{ email: '' }],
    },
    mode: 'onTouched',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'invites',
  });

  const onSubmit = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Workspace Created:', data);
    alert('WORKSPACE CONFIGURED SUCCESSFULLY');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-white border border-slate-200 p-8 rounded-xl shadow-sm"
      >
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Setup your workspace
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            This is where your team will collaborate. You can change this later.
          </p>
        </header>

        {/* Section 1: Workspace Details */}
        <div className="space-y-5 mb-8">
          {/* Workspace Name */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Workspace Name
            </label>
            <div className="relative">
              <Building2
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                {...register('workspaceName')}
                placeholder="Acme Corp"
                className={`w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
                  errors.workspaceName
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {/* Error Rendering */}
            <div className="min-h-[20px] mt-1.5">
              {errors.workspaceName && (
                <p className="text-sm text-red-500">
                  {errors.workspaceName.message}
                </p>
              )}
            </div>
          </div>

          {/* Workspace URL */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Workspace URL
            </label>
            <div className="relative">
              <Link2
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                {...register('workspaceUrl')}
                placeholder="https://acme.com"
                className={`w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-shadow ${
                  errors.workspaceUrl
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                }`}
              />
            </div>
            {/* Error Rendering */}
            <div className="min-h-[20px] mt-1.5">
              {errors.workspaceUrl && (
                <p className="text-sm text-red-500">
                  {errors.workspaceUrl.message}
                </p>
              )}
            </div>
          </div>

          {/* Company Size (Select) */}
          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Company Size
            </label>
            <div className="relative">
              <Users
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <select
                {...register('companySize')}
                className={`w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 appearance-none transition-shadow ${
                  errors.companySize
                    ? 'border-red-500 focus:ring-red-500 focus:border-red-500 text-red-900'
                    : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500 text-slate-700'
                }`}
              >
                <option value="">Select team size...</option>
                <option value="1-10">1 - 10 employees</option>
                <option value="11-50">11 - 50 employees</option>
                <option value="50+">50+ employees</option>
              </select>
            </div>
            {/* Error Rendering */}
            <div className="min-h-[20px] mt-1.5">
              {errors.companySize && (
                <p className="text-sm text-red-500">
                  {errors.companySize.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <hr className="border-slate-200 mb-8" />

        {/* Section 2: Invite Team (Dynamic Array) */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-medium text-slate-900">
                Invite Team Members
              </h2>
              <p className="text-xs text-slate-500">
                Send email invitations to your team.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {fields.map((field, i) => (
              <div key={field.id}>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      type="email"
                      {...register(`invites.${i}.email`)}
                      placeholder="colleague@acme.com"
                      className={`w-full pl-10 pr-4 py-2 bg-white border rounded-lg focus:outline-none focus:ring-2 transition-shadow text-sm ${
                        errors.invites?.[i]?.email
                          ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                          : 'border-slate-300 focus:ring-indigo-500 focus:border-indigo-500'
                      }`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {/* Array Error Rendering */}
                <div className="min-h-[16px] mt-1">
                  {errors.invites?.[i]?.email && (
                    <p className="text-xs text-red-500">
                      {errors.invites[i].email.message}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* Array Root Error (e.g. if they delete all fields but min(1) is required) */}
            {errors.invites?.root && (
              <p className="text-sm text-red-500 mb-2">
                {errors.invites.root.message}
              </p>
            )}

            <button
              type="button"
              onClick={() => append({ email: '' })}
              className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 p-1 rounded transition-colors"
            >
              <Plus size={16} /> Add another invite
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-slate-200 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Creating Workspace...' : 'Complete Setup'}
            {!isSubmitting && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
}
