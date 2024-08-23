import { GraphQLClient, gql } from "graphql-request";

const graphcms = new GraphQLClient(process.env.GRAPHCMS_ENDPOINT || "", {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

export const QUERY = gql`
  {
    posts {
      id
      title
      slug
      content {
        html
      }
    }
  }
`;

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: {
    html: string;
  };
}

export async function getPosts(): Promise<Post[]> {
  const { posts } = await graphcms.request<{ posts: Post[] }>(QUERY);
  return posts;
}
