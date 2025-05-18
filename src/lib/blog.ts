import matter from 'gray-matter';
import { Octokit } from 'octokit';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism-plus';

// Configuration - Replace with your actual GitHub username, repo, and path
// It's better to use environment variables for these, especially for the token.
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Abdul1028'; // Fallback for local dev if not set
const GITHUB_REPO = process.env.GITHUB_REPO || 'dev-verse-blogs';       // Fallback for local dev if not set
const GITHUB_CONTENT_PATH = 'content/blog'; // Path to your blog posts within the repo

console.log(`[BLOG LIB] Initializing with GitHub target: ${GITHUB_USERNAME}/${GITHUB_REPO}/${GITHUB_CONTENT_PATH}`);





const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  summary: string;
  slug: string;
  [key: string]: any;
}

export interface PostData extends PostFrontmatter {
  content: string;
  mdxSource?: any;
}

async function fetchFromGitHub(path: string) {
  console.log(`[BLOG LIB] Fetching from GitHub path: ${path}`);
  try {
    const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: GITHUB_USERNAME,
      repo: GITHUB_REPO,
      path: path,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    });
    console.log(`[BLOG LIB] Successfully fetched from GitHub path: ${path}`);
    return response.data;
  } catch (error: any) {
    if (error.status === 404) {
      console.warn(`[BLOG LIB] GitHub content not found at path: ${path}`);
      return null;
    }
    console.error(`[BLOG LIB] Error fetching from GitHub path ${path}:`, error.status, error.message);
    // Do not re-throw here for getPostSlugs, let it return null to be handled
    return null; 
  }
}

export async function getPostSlugs(): Promise<string[]> {
  console.log(`[BLOG LIB] getPostSlugs: Attempting to fetch directory contents.`);
  const contents = await fetchFromGitHub(GITHUB_CONTENT_PATH);

  if (!contents || !Array.isArray(contents)) {
    console.warn('[BLOG LIB] getPostSlugs: Could not retrieve blog post items from GitHub or path is not a directory. Contents received:', contents);
    return [];
  }
  console.log('[BLOG LIB] getPostSlugs: Raw directory items from GitHub:', contents.map(item => ({ name: item.name, type: item.type })));

  const slugs = contents
    .filter(item => item.type === 'file' && item.name.endsWith('.mdx'))
    .map(item => item.name.replace(/\.mdx$/, ''));
  console.log('[BLOG LIB] getPostSlugs: Filtered slugs:', slugs);
  return slugs;
}

export async function getPostBySlug(slug: string): Promise<PostData | null> {
  console.log(`[BLOG LIB] getPostBySlug: Attempting to fetch post for slug: ${slug}`);
  const filePath = `${GITHUB_CONTENT_PATH}/${slug}.mdx`;
  const fileData: any = await fetchFromGitHub(filePath);

  if (!fileData || typeof fileData.content !== 'string') {
    console.warn(`[BLOG LIB] getPostBySlug: Could not retrieve content for slug: ${slug}. Received fileData:`, fileData ? Object.keys(fileData) : null);
    return null;
  }
  console.log(`[BLOG LIB] getPostBySlug: Successfully fetched MDX file for slug: ${slug}`);

  const fileContent = Buffer.from(fileData.content, 'base64').toString('utf8');
  const { data, content } = matter(fileContent);

  // More detailed logging for frontmatter validation
  if (!data.title) console.warn(`[BLOG LIB] getPostBySlug: Missing title for slug: ${slug}`);
  if (!data.date) console.warn(`[BLOG LIB] getPostBySlug: Missing date for slug: ${slug}`);
  if (!data.slug) console.warn(`[BLOG LIB] getPostBySlug: Missing slug field in frontmatter for slug: ${slug}`);
  if (data.slug !== slug) console.warn(`[BLOG LIB] getPostBySlug: Frontmatter slug ('${data.slug}') does not match filename slug ('${slug}')`);


  if (!data.title || !data.date || !data.slug /* || data.slug !== slug */) { // Temporarily commenting out slug match for debugging listing
    console.warn(`[BLOG LIB] getPostBySlug: Invalid or missing required frontmatter for slug: ${slug}. Frontmatter found:`, data);
    console.log("--- DEBUG: getPostBySlug returning NULL due to invalid frontmatter ---");
    return null;
  }

  // Serialize MDX with rehype-prism-plus for code highlighting
  let mdxSource;
  try {
    mdxSource = await serialize(content, {
      mdxOptions: {
        rehypePlugins: [rehypePrism],
        format: 'mdx',
      },
      scope: data,
    });
    console.log("--- DEBUG: getPostBySlug - mdxSource object after serialize ---");
    console.dir(mdxSource, { depth: null });
    console.log("--- DEBUG: getPostBySlug - mdxSource.compiledSource START ---");
    console.log(mdxSource.compiledSource);
    console.log("--- DEBUG: getPostBySlug - mdxSource.compiledSource END ---");

  } catch (error) {
    console.error(`[BLOG LIB] getPostBySlug: Error during MDX serialization for slug ${slug}:`, error);
    console.log("--- DEBUG: getPostBySlug returning NULL due to serialization error ---");
    return null;
  }

  console.log(`[BLOG LIB] getPostBySlug: Successfully parsed frontmatter for slug: ${slug}`);

  // Log lengths for debugging truncation
  console.log(`--- DEBUG: getPostBySlug - Length of original content: ${content.length} ---`);
  if (mdxSource && mdxSource.compiledSource) {
    console.log(`--- DEBUG: getPostBySlug - Length of mdxSource.compiledSource: ${mdxSource.compiledSource.length} ---`);
  } else {
    console.log(`--- DEBUG: getPostBySlug - mdxSource or mdxSource.compiledSource is undefined ---`);
  }

  const resultPostData = {
    ...(data as PostFrontmatter),
    content,
    mdxSource,
  };
  console.log("--- DEBUG: getPostBySlug returning post data ---");
  return resultPostData;
}

export async function getAllPosts(): Promise<PostFrontmatter[]> {
  console.log('[BLOG LIB] getAllPosts: Fetching all slugs.');
  const slugs = await getPostSlugs();
  console.log(`[BLOG LIB] getAllPosts: Found ${slugs.length} slugs:`, slugs);
  
  const postsData: PostData[] = [];
  for (const slug of slugs) {
    console.log(`[BLOG LIB] getAllPosts: Processing slug: ${slug}`);
    const post = await getPostBySlug(slug);
    if (post) {
      console.log(`[BLOG LIB] getAllPosts: Successfully fetched and parsed post for slug: ${slug}`);
      postsData.push(post);
    } else {
      console.warn(`[BLOG LIB] getAllPosts: Failed to get data for slug: ${slug}. It will be excluded from the list.`);
    }
  }
  
  console.log(`[BLOG LIB] getAllPosts: Successfully processed ${postsData.length} posts out of ${slugs.length} slugs.`);

  return postsData
    .sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime())
    .map(({ content, ...frontmatter }) => frontmatter);
} 