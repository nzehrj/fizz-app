"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  WebPageInputSchema,
  WebPageUpdateSchema,
} from "@/lib/validator";
import { createWebPage, updateWebPage } from "@/lib/actions/web-page.actions";
import { useState } from "react";

// ✅ Unified schema for the form (all optional)
const WebPageFormSchema = z.object({
  title: z.string().optional(),
  slug: z.string().optional(),
  content: z.string().optional(),
  isPublished: z.boolean().optional(),
  _id: z.string().optional(),
});

type WebPageFormValues = z.infer<typeof WebPageFormSchema>;

type WebPageFormProps = {
  type: "Create" | "Update";
  initialData?: WebPageFormValues;
};

export default function WebPageForm({ type, initialData }: WebPageFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WebPageFormValues>({
    resolver: zodResolver(WebPageFormSchema),
    defaultValues: initialData,
  });

  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(values: WebPageFormValues) {
    try {
      if (type === "Create") {
        const parsed = WebPageInputSchema.parse(values); // strict validation
        await createWebPage(parsed);
        setMessage("Web Page created successfully!");
      } else {
        const parsed = WebPageUpdateSchema.parse(values); // partial validation
        await updateWebPage(parsed);
        setMessage("Web Page updated successfully!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block font-medium">Title</label>
        <input
          {...register("title")}
          className="border rounded p-2 w-full"
        />
        {errors.title && (
          <p className="text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Slug</label>
        <input
          {...register("slug")}
          className="border rounded p-2 w-full"
        />
        {errors.slug && (
          <p className="text-red-500">{errors.slug.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Content</label>
        <textarea
          {...register("content")}
          className="border rounded p-2 w-full h-64"
        />
        {errors.content && (
          <p className="text-red-500">{errors.content.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Published</label>
        <input type="checkbox" {...register("isPublished")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition w-full"
      >
        {isSubmitting ? "Saving..." : type === "Create" ? "Create" : "Update"}
      </button>

      {message && <p className="text-sm text-gray-700">{message}</p>}
    </form>
  );
}

  
 
