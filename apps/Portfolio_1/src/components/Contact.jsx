import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

const Contact = () => {
  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/mgvkgdqj", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="px-6 sm:px-10 xl:px-20 py-20 bg-gradient-to-t from-[#080807] to-[#393632] border border-white/10 rounded-2xl mt-10 shadow-lg backdrop-blur-xl"
    >
      <h2 className="text-center text-[7vw] font-semibold uppercase text-[#d1d1c7] mb-10 max-w-[10ch] mx-auto">
        <span className="inline-block pr-2">Let's</span>
        <span className="inline-block pr-2">Make</span>
        <span className="inline-block pr-2">It</span>
        <span className="inline-block pr-2">Happen</span>
      </h2>

      <div className="w-full sm:w-[36rem] mx-auto px-6 sm:px-10 xl:px-14 py-12 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg">
        <h3 className="text-center text-xl font-medium mb-8 text-[#d1d1c7] tracking-tight">
          Say Hello
        </h3>

        <form
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            {...register("name")}
            placeholder="Drop a name"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />
          {errors.name && (
            <p className="text-red-400 text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            {...register("email")}
            placeholder="Wanna hear back? Add your email"
            className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />
          {errors.email && (
            <p className="text-red-400 text-sm">{errors.email.message}</p>
          )}

          <textarea
            rows="5"
            {...register("message")}
            placeholder="Say hello or drop a note..."
            className="w-full resize-none rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />
          {errors.message && (
            <p className="text-red-400 text-sm">{errors.message.message}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-white/10 hover:bg-white text-[#e8e8e3] px-6 py-3 font-semibold tracking-wide text-sm transition-all duration-100 active:scale-[0.98] active:shadow-inner"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="text-green-400 text-sm">Message sent successfully!</p>
          )}
          {status === "error" && (
            <p className="text-red-400 text-sm">
              Something went wrong. Try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
