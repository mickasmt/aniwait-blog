import * as React from "react";
import { Form, json, redirect, useActionData } from "remix";
import type { ActionFunction } from "remix";

import { createPost } from "~/models/post.server";
import { requireUserId } from "~/session.server";
import { checkUserIsAdmin } from "~/models/user.server";
import slugify from "slugify";

type ActionData = {
  errors?: {
    title?: string;
    body?: string;
    imgUrl?: string;
    categoryId?:string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  // check if user is ADMIN
  if(!checkUserIsAdmin(userId)) return;

  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const imgUrl = formData.get("img_url");
  // const categoryId = formData.get("category");
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

  const post = await createPost({ title, body, imgUrl, userId, categoryId });

  return redirect(`/posts/${post.id}/${slugify(post.title)}`);
};

export default function NewNotePage() {
  const actionData = useActionData() as ActionData;
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
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
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
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
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
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
  );
}
