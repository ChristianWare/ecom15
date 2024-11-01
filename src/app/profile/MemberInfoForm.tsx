"use client";

import LoadingButton from "@/components/LoadingButton";
import { useUpdateMember } from "@/hooks/members";
import { requiredString } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { members } from "@wix/members";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  loginEmail: requiredString,
  firstName: z.string(),
  lastName: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

interface MemberInfoFormProps {
  member: members.Member;
}

export default function MemberInfoForm({ member }: MemberInfoFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      loginEmail: member.loginEmail || "",
      firstName: member.contact?.firstName || "",
      lastName: member.contact?.lastName || "",
    },
  });

  const mutation = useUpdateMember();

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <div className="mx-auto max-w-xl space-y-5">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {/* Login Email */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            Login email
          </label>
          <input
            placeholder="Login email"
            type="email"
            className="mt-1 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            disabled
            {...form.register("loginEmail")}
          />
          {form.formState.errors.loginEmail && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.loginEmail.message}
            </p>
          )}
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">
            First name
          </label>
          <input
            placeholder="First name"
            className="mt-1 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...form.register("firstName")}
          />
          {form.formState.errors.firstName && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">Last name</label>
          <input
            placeholder="Last name"
            className="mt-1 rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            {...form.register("lastName")}
          />
          {form.formState.errors.lastName && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.lastName.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        {/* <button type="submit" loading={mutation.isPending}> */}
        <button type="submit" className="bg-yellow-500 text-emerald-950 font-extrabold uppercase p-3 rounded-md">Submit</button>
      </form>
    </div>
  );
}
