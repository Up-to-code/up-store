
import db from "@/lib/db";
import { App } from "@/models/appModel";

export const CreateApp = async ({
  name,
  description,
  url,
  icon,
  images,
  published,
  version,
}: {
  name: string;
  description: string;
  url: string;
  icon: string;
  images: string[];
  published: boolean;
  version: string;
}) => {
  db();
  const NewApp = new App({
    name,
    description,
    url,
    icon,
    images,
    published,
    version,
  });
  const result = await NewApp.save();
  return result;
};
