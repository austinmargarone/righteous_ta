import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { getPosts, Post } from "../../../lib/graphcms";
import EducationClient from "@/components/Education/EducationClient";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "RighteousTA | Education",
  description:
    "Learn about cryptocurency and technical analysis with RighteousTA's educational content.",
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
