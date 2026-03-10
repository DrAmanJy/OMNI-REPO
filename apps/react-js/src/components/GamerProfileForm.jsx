import React from 'react';
import { Cpu, Gamepad2, Plus, Trash2, User, Zap } from 'lucide-react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

export default function GamerProfileForm() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      gamerTag: '',
      rig: { cpu: '', gpu: '' },
      games: [{ title: '' }],
      publicProfile: false,
    },
    mode: 'onTouched',
  });
  const gamerTag = useWatch({
    control,
    name: 'gamerTag',
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'games' });

  const onSubmit = async (data) => {
    console.log('Submitting Data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert('SYSTEM UPDATE SUCCESSFUL');
    reset();
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-zinc-950 border-2 border-fuchsia-600 p-8 rounded-none shadow-[0_0_20px_rgba(192,38,211,0.5)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-16 h-16 bg-fuchsia-600 rotate-45 translate-x-8 -translate-y-8" />

        <header className="mb-8 border-b border-fuchsia-900/50 pb-4">
          <h1 className="text-4xl font-black text-fuchsia-500 italic tracking-tighter flex items-center gap-2">
            <Zap className="fill-fuchsia-500" /> SYSTEM_LINK // PROFILE
          </h1>
          <p className="text-zinc-500 text-[10px] mt-1 uppercase tracking-widest">
            {isSubmitting
              ? 'Uploading Data...'
              : `Status: Secure_Connection // ${gamerTag || 'Anonymous'}`}
          </p>
        </header>

        {/* Section 1: Gamer Tag */}
        <section className="mb-8">
          <label className="text-xs text-fuchsia-400 uppercase mb-1 block tracking-widest">
            Gamer Tag
          </label>
          <div
            className={`flex items-center bg-zinc-900 border transition-colors ${errors.gamerTag ? 'border-red-500' : 'border-zinc-700 group-focus-within:border-cyan-400'}`}
          >
            <User className="ml-3 text-zinc-500" size={18} />
            <input
              {...register('gamerTag', {
                required: 'Gamer Tag is required',
                validate: (v) => v === v.toUpperCase() || 'Uppercase required',
              })}
              type="text"
              placeholder="USER_NAME"
              className="w-full bg-transparent p-3 outline-none text-cyan-400 placeholder:text-zinc-700"
            />
          </div>
          <div className="min-h-5 mt-1">
            {errors.gamerTag && (
              <p className="text-[10px] text-red-500 font-bold animate-pulse flex items-center gap-1">
                <span className="bg-red-500 text-black px-1">ERROR</span>{' '}
                {errors.gamerTag.message}
              </p>
            )}
          </div>
        </section>

        {/* Section 2: Hardware Specs */}
        <section className="mb-8">
          <label className="text-xs text-fuchsia-400 uppercase mb-3 block tracking-widest">
            Hardware Specs
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-zinc-900/50 border border-zinc-800">
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                <Cpu size={12} /> PROCESSOR
              </span>
              <input
                type="text"
                {...register('rig.cpu', { required: 'CPU required' })}
                placeholder="e.g. i9 14900K"
                className={`w-full bg-zinc-900 border p-2 text-sm outline-none transition-colors ${errors.rig?.cpu ? 'border-red-500' : 'border-zinc-700 focus:border-fuchsia-500'}`}
              />
              {errors.rig?.cpu && (
                <p className="text-[9px] text-red-500 uppercase">
                  {errors.rig.cpu.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                <Zap size={12} /> GRAPHICS_UNIT
              </span>
              <input
                type="text"
                {...register('rig.gpu', { required: 'GPU required' })}
                placeholder="e.g. RTX 4090"
                className={`w-full bg-zinc-900 border p-2 text-sm outline-none transition-colors ${errors.rig?.gpu ? 'border-red-500' : 'border-zinc-700 focus:border-fuchsia-500'}`}
              />
              {errors.rig?.gpu && (
                <p className="text-[9px] text-red-500 uppercase">
                  {errors.rig.gpu.message}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Section 3: Dynamic Games List */}
        <section className="mb-8">
          <label className="text-xs text-fuchsia-400 uppercase mb-3 block tracking-widest">
            Library / Favorites
          </label>
          <div className="space-y-4">
            {fields.map((field, i) => (
              <div key={field.id} className="space-y-1">
                <div
                  className={`flex gap-2 bg-zinc-900 border transition-colors ${errors.games?.[i]?.title ? 'border-red-500' : 'border-zinc-800'}`}
                >
                  <div className="flex-1 flex items-center p-1">
                    <Gamepad2 className="mx-2 text-zinc-600" size={18} />
                    <input
                      type="text"
                      {...register(`games.${i}.title`, {
                        required: 'Title required',
                      })}
                      placeholder="GAME_TITLE"
                      className="w-full bg-transparent p-2 outline-none text-sm text-cyan-400"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(i)}
                    className="p-2 border-l border-zinc-800 text-zinc-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                {errors.games?.[i]?.title && (
                  <p className="text-[9px] text-red-500 uppercase ml-1">
                    !! {errors.games[i].title.message}
                  </p>
                )}
              </div>
            ))}

            <button
              onClick={() => append({ title: '' })}
              type="button"
              className="w-full py-2 border-2 border-dashed border-zinc-800 text-zinc-500 hover:border-cyan-500 hover:text-cyan-400 transition-all flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest"
            >
              <Plus size={14} /> Add_Entry
            </button>
          </div>
        </section>

        <footer className="pt-4 border-t border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer">
            <input
              {...register('publicProfile')}
              type="checkbox"
              className="accent-fuchsia-600 h-4 w-4 bg-black border-zinc-700"
            />
            <span className="text-[10px] text-zinc-400 tracking-tighter">
              ENCRYPT_PROFILE_PUBLICLY
            </span>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className={`bg-fuchsia-600 text-black px-8 py-2 font-black uppercase text-sm tracking-tighter transition-all active:scale-95 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]'}`}
          >
            {isSubmitting ? 'Processing...' : 'Update_System'}
          </button>
        </footer>
      </form>
    </div>
  );
}
