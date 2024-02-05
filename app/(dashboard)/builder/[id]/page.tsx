import FormBuilder from "@/app/(dashboard)/_components/FormBuilder";
import { GetFormById } from "@/app/actions/form";
import { METADATA } from "@/lib/metadata";
import React from "react";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const form = await GetFormById(Number(params.id));

  if (!form) {
    return {
      title: "Form not found",
    };
  }

  return {
    title: `${form.name} ${METADATA.exTitle}`,
    description: form.description,
    alternates: {
      canonical: `${process.env.DOMAIN}/builder/${params.id}`,
    },
  };
}

export default async function BuilderPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const form = await GetFormById(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  return <FormBuilder form={form} />;
}
