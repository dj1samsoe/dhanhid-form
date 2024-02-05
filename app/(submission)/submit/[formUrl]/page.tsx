import { FormElementInstance } from "@/app/(dashboard)/_components/FormElements";
import { GetFormContentByUrl } from "@/app/actions/form";
import FormSubmitComponent from "../../_components/FormSubmitComponent";
import { METADATA } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: { formUrl: string };
}) {
  const form = await GetFormContentByUrl(params.formUrl);
  if (!form) {
    return {
      title: "Form not found",
    };
  }
  return {
    title: `Form Submission ${METADATA.exTitle}`,
    description: "Form Submission in Dhanhid Form - Simple Form Builder",
    alternates: {
      canonical: `${process.env.DOMAIN}/submit/${params.formUrl}`,
    },
  };
}

export default async function SubmitPage({
  params,
}: {
  params: { formUrl: string };
}) {
  const { formUrl } = params;

  const form = await GetFormContentByUrl(formUrl);

  if (!form) {
    throw new Error("Form not found");
  }

  const formContent = JSON.parse(form.content) as FormElementInstance[];

  return <FormSubmitComponent formUrl={formUrl} content={formContent} />;
}
