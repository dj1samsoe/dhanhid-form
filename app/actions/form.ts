"use server";

import { currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";
import { FormSchema, formSchema } from "@/schemas/form";
import { FormElementInstance } from "../(dashboard)/_components/FormElements";

class UserNotFoundErr extends Error {}

export async function GetFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    },
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionsRate = 0;

  if (visits > 0) {
    submissionsRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionsRate;

  return {
    visits,
    submissions,
    submissionsRate,
    bounceRate,
  };
}

export async function CreateForm(data: FormSchema) {
  const user = await currentUser();
  const validation = formSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("Invalid form data");
  }

  if (!user) {
    throw new UserNotFoundErr();
  }

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("Failed to create form");
  }

  return form.id;
}

export async function GetForm() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return form;
}

export async function GetFormById(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  const form = await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });

  return form;
}

export async function UpdateFormContent(id: number, jsonContent: string) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content: jsonContent,
    },
  });
}

export async function PublishForm(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function GetFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    select: {
      content: true,
    },
    data: {
      visits: {
        increment: 1,
      },
    },
    where: {
      shareUrl: formUrl,
    },
  });
}

export async function SubmitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    data: {
      submissions: {
        increment: 1,
      },
      FormSubmissions: {
        create: {
          content,
        },
      },
    },
    where: {
      shareUrl: formUrl,
      published: true,
    },
  });
}

export async function GetFormSubmissions(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
    include: {
      FormSubmissions: true,
    },
  });
}

export async function DeleteForm(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundErr();
  }

  return await prisma.form.delete({
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function deleteElementInstance(id: number, elementId: string) {
  try {
    // Fetch the current user
    const user = await currentUser();

    if (!user) {
      throw new UserNotFoundErr();
    }

    // Fetch the form content based on user id and form id
    const getContent = await prisma.form.findUnique({
      where: {
        userId: user.id,
        id,
      },
      select: {
        content: true,
      },
    });

    // If the form content doesn't exist, handle accordingly (e.g., throw an error or return)
    if (!getContent) {
      throw new Error("Form not found");
    }

    // Parse the content from JSON
    const content: FormElementInstance[] = JSON.parse(getContent.content);

    // Log before deletion attempt
    console.log("Before deletion:", content);

    // Find the index of the element to delete
    const elementIndex = content.findIndex(
      (element: FormElementInstance) => element.id === elementId
    );

    // Log the elementId and elementIndex
    console.log("ElementId:", elementId);
    console.log("ElementIndex:", elementIndex);

    // If the element to delete is not found, log a message
    if (elementIndex === -1) {
      console.log("Element not found for deletion");
      return null;
    }

    // Create a new content array without the specified element
    const newContent = [
      ...content.slice(0, elementIndex),
      ...content.slice(elementIndex + 1),
    ];

    // Update only the specific element in the database
    const updatedForm = await prisma.form.update({
      where: {
        userId: user.id,
        id,
      },
      data: {
        content: JSON.stringify(newContent),
      },
    });

    // Log after deletion attempt
    console.log("After deletion:", newContent);

    // Return the updated form
    return updatedForm;
  } catch (error) {
    // Handle errors (e.g., log the error, rethrow, or return a specific error response)
    console.error("Error deleting element:", error);
    throw error;
  }
}
