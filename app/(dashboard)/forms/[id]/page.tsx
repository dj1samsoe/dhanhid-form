// "use client";
import { GetFormById, GetFormSubmissions } from "@/app/actions/form";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, formatDistance } from "date-fns";
import {
  EyeIcon,
  LogOut,
  MousePointerClick,
  StickyNoteIcon,
} from "lucide-react";
import { ReactNode } from "react";
import CardStat from "../../_components/CardStat";
import {
  ElementsType,
  FormElementInstance,
} from "../../_components/FormElements";
import FormLinkShare from "../../_components/FormLinkShare";
import VisitBtn from "../../_components/VisitBtn";
// import { headers } from "next/headers";
import * as XLSX from "xlsx";
import dynamic from "next/dynamic";

export default async function FormDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const form = await GetFormById(Number(id));
  // const headerList = headers();

  const host = process.env.DOMAIN;
  // const protocol = "http";

  if (!form) {
    throw new Error("Form not found");
  }

  const { visits, submissions } = form;

  let submissionsRate = 0;

  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionsRate;

  const shareLink = `${host}/submit/${form.shareUrl}`;

  return (
    <>
      <div className="py-1">
        <div className="container flex items-center justify-between">
          <h1 className="truncate md:text-4xl text-xl md:font-bold font-medium">
            {form.name}
          </h1>
          <VisitBtn shareUrl={shareLink} />
        </div>
        <div className="border-b border-muted py-4">
          <div className="container flex items-center justify-between gap-2">
            <FormLinkShare shareUrl={shareLink} />
          </div>
        </div>
      </div>
      <div className="container w-full grid-cols-1 items-center gap-6 space-y-6 pt-8 md:grid md:grid-cols-2 md:space-y-0 lg:grid-cols-4">
        <CardStat
          title="Total Visits"
          icon={<EyeIcon className="h-6 w-6" />}
          text="Total visits for all your forms"
          value={visits.toLocaleString() ?? "0"}
          loading={false}
          className="shadow-sky-500 drop-shadow-md"
        />
        <CardStat
          title="Total Submissions"
          icon={<StickyNoteIcon className="h-6 w-6" />}
          text="All time form submissions"
          value={submissions.toLocaleString() ?? "0"}
          loading={false}
          className="shadow-amber-500 drop-shadow-md"
        />
        <CardStat
          title="Submissions Rate"
          icon={<MousePointerClick className="h-6 w-6" />}
          text="Visits that resulted in a submissions"
          value={submissionsRate.toLocaleString() + "%" ?? "0"}
          loading={false}
          className="shadow-green-500 drop-shadow-md"
        />
        <CardStat
          title="Bounce Rate"
          icon={<LogOut className="h-6 w-6" />}
          text="Visits that leave without submitting"
          value={bounceRate.toLocaleString() + "%" ?? "0"}
          loading={false}
          className="shadow-rose-500 drop-shadow-md"
        />
      </div>
      <div className="container pt-10">
        {/* Ini table submission */}
        <SubmissionTable id={form.id} />
      </div>
    </>
  );
}

type Row = { [key: string]: string } & {
  submitted: string;
};

async function SubmissionTable({ id }: { id: number }) {
  const form = await GetFormSubmissions(Number(id));

  if (!form) {
    throw new Error("Form not found");
  }

  const formElements = JSON.parse(form.content) as FormElementInstance[];

  const columns: {
    id: string;
    label: string;
    required: boolean;
    type: ElementsType;
  }[] = [];

  formElements.forEach((element) => {
    switch (element.type) {
      case "TextField":
      case "NumberField":
      case "TextAreaField":
      case "DateField":
      case "SelectField":
      case "CheckboxField":
        columns.push({
          id: element.id,
          label: element.extraAttributes?.label,
          required: element.extraAttributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows: Row[] = [];
  form.FormSubmissions.forEach((submission) => {
    const content = JSON.parse(submission.content);

    rows.push({
      ...content,
      submitted: submission.createdAt,
    });
  });

  return (
    <>
      <div className="flex md:justify-between md:flex-row flex-col space-y-1 items-center pb-5">
        <h2 className="my-4 md:text-2xl text-xl font-bold">
          Submission Result
        </h2>
        <DynamicExportButton rows={rows} columns={columns} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id} className="uppercase">
                {column.label}
              </TableHead>
            ))}
            <TableHead className="text-right uppercase text-muted-foreground">
              Submitted at
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <RowCell
                  key={column.id}
                  type={column.type}
                  value={row[column.id]}
                />
              ))}
              <TableCell className="text-right text-muted-foreground">
                {formatDistance(row.submitted, new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

const DynamicExportButton = dynamic(
  () => import("../../_components/ExportButton"),
  {
    ssr: false, // Disable Server Side Rendering
  }
);

function RowCell({ type, value }: { type: ElementsType; value: string }) {
  let node: ReactNode = value;

  switch (type) {
    case "DateField":
      if (!value) break;
      const date = new Date(value);
      node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>;
      break;
    case "CheckboxField":
      const checked = value === "true";
      node = <Checkbox checked={checked} disabled />;
      break;
  }

  return <TableCell>{node}</TableCell>;
}
