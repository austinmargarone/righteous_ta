import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getPosts, Post } from "../../../lib/graphcms";
import EducationClient from "@/components/Education/EducationClient";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

export const revalidate = 60;

interface HomeProps {
  posts: Post[];
}
const Education = async () => {
  const posts = await getPosts();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Education" />
      <EducationClient posts={posts} />
    </DefaultLayout>
  );
};

export default Education;
