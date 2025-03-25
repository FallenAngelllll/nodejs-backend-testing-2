import { PostsService } from "./posts.service";

describe("PostsService", () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe(".findMany", () => {
    const posts = [
      { text: "Post 1" },
      { text: "Post 2" },
      { text: "Post 3" },
      { text: "Post 4" },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it("should return all posts if called without options", () => {
      const foundPosts = postsService.findMany();

      expect(foundPosts.length).toBe(posts.length);
      foundPosts.forEach((post, index) => {
        expect(post.text).toBe(posts[index].text);
      });
    });

    it("should return correct posts for skip and limit options", () => {
      const skip = 1;
      const limit = 2;
      const foundPosts = postsService.findMany({ skip, limit });

      expect(foundPosts.length).toBe(limit);
      expect(foundPosts[0].text).toBe("Post 2");
      expect(foundPosts[1].text).toBe("Post 3");
    });

    it("should return an empty array if skip is greater than available posts", () => {
      const foundPosts = postsService.findMany({ skip: posts.length });

      expect(foundPosts).toEqual([]);
    });

    it("should return all remaining posts if limit exceeds available posts", () => {
      const limit = 10; // Greater than number of posts
      const foundPosts = postsService.findMany({ limit });

      expect(foundPosts.length).toBe(posts.length);
      foundPosts.forEach((post, index) => {
        expect(post.text).toBe(posts[index].text);
      });
    });

    it("should return posts starting from skip if skip is provided and limit is not", () => {
      const skip = 2;
      const foundPosts = postsService.findMany({ skip });

      expect(foundPosts.length).toBe(posts.length - skip);
      expect(foundPosts[0].text).toBe("Post 3");
      expect(foundPosts[1].text).toBe("Post 4");
    });

    it("should return the first 'limit' posts if limit is provided and skip is not", () => {
      const limit = 2;
      const foundPosts = postsService.findMany({ limit });

      expect(foundPosts.length).toBe(limit);
      expect(foundPosts[0].text).toBe("Post 1");
      expect(foundPosts[1].text).toBe("Post 2");
    });

    it("should return an empty array if both skip and limit are zero", () => {
      const foundPosts = postsService.findMany({ skip: 0, limit: 0 });

      expect(foundPosts).toEqual([]);
    });
  });
});