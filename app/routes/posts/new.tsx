import * as React from "react";
import { Form, json, redirect, useActionData, useLoaderData } from "remix";
import type { ActionFunction, LoaderFunction } from "remix";

import slugify from "slugify";
import { createPost } from "~/models/post.server";
import { verifyUserRole } from "~/session.server";
import { getCategories } from "~/models/category.server";

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
    imgUrl?: string;
    categoryId?: string;
  };
};

type LoaderData = {
  categories: Awaited<ReturnType<typeof getCategories>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  // check if user is logged && admin
  await verifyUserRole(request, "ADMIN");

  const categories = await getCategories();
  return json<LoaderData>({ categories });
};

export const action: ActionFunction = async ({ request }) => {
  const user = await verifyUserRole(request, "ADMIN");
  const userId = user.id;
  // add requireCategory() before validation

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const imgUrl = formData.get("img_url");
  const categoryId = formData.get("category");

  if (typeof title !== "string" || title.length === 0) {
    return json<ActionData>(
      { errors: { title: "Title is required" } },
      { status: 400 }
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json<ActionData>(
      { errors: { body: "Body is required" } },
      { status: 400 }
    );
  }

  if (typeof imgUrl !== "string" || imgUrl.length === 0) {
    return json<ActionData>(
      { errors: { imgUrl: "Une url d'image est requise" } },
      { status: 400 }
    );
  }

  if (typeof categoryId !== "string" || categoryId.length === 0) {
    return json<ActionData>(
      { errors: { categoryId: "Une url d'image est requise" } },
      { status: 400 }
    );
  }

  const post = await createPost({ title, body, imgUrl, userId, categoryId });

  return redirect(`/posts/${post.id}/${slugify(post.title)}`);
};

export default function NewNotePage() {
  const data = useLoaderData() as LoaderData;
  const { categories } = data;

  const actionData = useActionData() as ActionData;
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);
  const imgRef = React.useRef<HTMLTextAreaElement>(null);
  const categoryRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    } else if (actionData?.errors?.imgUrl) {
      imgRef.current?.focus();
    } else if (actionData?.errors?.categoryId) {
      categoryRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="f-container py-5">
      <Form
        method="post"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          width: "100%",
        }}
      >
        {/* TITLE */}
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Title: </span>
            <input
              ref={titleRef}
              name="title"
              className="flex-1 rounded-md border-2 border-gray-500 px-3 text-lg leading-loose"
              aria-invalid={actionData?.errors?.title ? true : undefined}
              aria-errormessage={
                actionData?.errors?.title ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.title && (
            <div className="pt-1 text-red-700" id="title=error">
              {actionData.errors.title}
            </div>
          )}
        </div>

        {/* BODY */}
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Body: </span>
            <textarea
              ref={bodyRef}
              name="body"
              rows={8}
              className="w-full flex-1 rounded-md border-2 border-gray-500 py-2 px-3 text-lg leading-6"
              aria-invalid={actionData?.errors?.body ? true : undefined}
              aria-errormessage={
                actionData?.errors?.body ? "body-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.body && (
            <div className="pt-1 text-red-700" id="body=error">
              {actionData.errors.body}
            </div>
          )}
        </div>

        {/* IMG URL */}
        {/* <div>
        <label className="flex w-full flex-col gap-1">
          <span>Image url : </span>
          <input
            ref={imgRef}
            type="text"
            name="imgUrl"
            className="flex-1 rounded-md border-2 border-gray-500 px-3 text-lg leading-loose"
            aria-invalid={actionData?.errors?.imgUrl ? true : undefined}
            aria-errormessage={
              actionData?.errors?.imgUrl ? "title-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.imgUrl && (
          <div className="pt-1 text-red-700" id="title=error">
            {actionData.errors.imgUrl}
          </div>
        )}
      </div> */}

        {/* category */}
        <div className="flex flex-col">
          {categories.map((category) => (
            <span key={category.id}>{category.name}</span>
          ))}
        </div>

        {/* SUBMIT BUTTON */}
        <div className="text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}
