// contentlayer.config.ts
import GithubSlugger from "github-slugger";
import { defineDocumentType, makeSource, defineNestedType } from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
var rehypePrettyCodeOptions = {
  theme: "one-dark-pro",
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
  }
};
var Tag = defineNestedType(() => ({
  name: "Tag",
  fields: {
    title: { type: "string" }
  }
}));
var Categories = defineNestedType(() => ({
  name: "Categories",
  fields: {
    title: { type: "string" }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    author: {
      type: "string",
      required: false
    },
    description: {
      type: "string",
      required: true
    },
    slug: {
      type: "string"
    },
    id: {
      type: "number",
      required: false
    },
    image: {
      type: "string"
    },
    draft: {
      type: "boolean",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" }
    },
    categories: {
      type: "list",
      of: { type: "string" }
    },
    toc: {
      type: "boolean",
      required: false,
      default: false
    }
  },
  wordCount: {
    type: "number",
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`
    },
    headings: {
      type: "json",
      resolve: async (doc) => {
        const regXHeader = /\n(?<flag>#{1,6})\s+(?<content>.+)/g;
        const slugger = new GithubSlugger();
        const headings = Array.from(doc.body.raw.matchAll(regXHeader)).map(
          ({ groups }) => {
            const flag = groups?.flag;
            const content = groups?.content;
            return {
              level: flag?.length == 1 ? "one" : flag?.length == 2 ? "two" : flag?.length == 3 ? "three" : "four",
              text: content,
              slug: content ? slugger.slug(content) : void 0
            };
          }
        );
        return headings;
      }
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  documentTypes: [Post],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      rehypePrettyCode,
      rehypePrettyCodeOptions
    ]
  }
});
export {
  contentlayer_config_default as default,
  rehypePrettyCodeOptions
};
//# sourceMappingURL=compiled-contentlayer-config-XZSV26F2.mjs.map
