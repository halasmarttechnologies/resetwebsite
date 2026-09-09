import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DevelopmentBanner } from "@/components/layout/development-banner";
import { getCmsClient } from "@/lib/cms";
import { generateArticleJsonLd } from "@/lib/seo/schema";
import { safeJsonLd } from "@/lib/security/sanitize-json-ld";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cms = getCmsClient();
  const post = await cms.getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${post.title} | Reset Men Salon Journal`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const cms = getCmsClient();
  const posts = await cms.getBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const cms = getCmsClient();
  const post = await cms.getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = generateArticleJsonLd(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <DevelopmentBanner
        pageTitle={post.title}
        category={`Article: ${post.category.title}`}
        description={post.excerpt}
        metaData={{
          Author: `${post.authorName} (${post.authorRole})`,
          "Reading Time": `${post.readingTimeMinutes} Minutes`,
          Category: post.category.title,
          Status: "Phase 1 In Development",
        }}
      />
    </>
  );
}
