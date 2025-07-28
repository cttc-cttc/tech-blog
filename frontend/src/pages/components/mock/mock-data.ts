interface USERS {
  info: {
    userId: string;
    password: string;
    email: string;
  }[];
}

interface POSTS {
  info: {
    createdAt: string;
    postId: number;
    postsType: string;
    title: string;
    contents: string;
  }[];
}

export const users: USERS = {
  info: [
    {
      userId: "admin",
      password: "admin1234",
      email: "admin@gmail.com",
    },
  ],
};

export const posts: POSTS = {
  info: [
    {
      createdAt: "2025-01-01",
      postId: 1,
      postsType: "IT",
      title: "IT test 1",
      contents: "this is IT contents test 1",
    },
    {
      createdAt: "2025-01-02",
      postId: 2,
      postsType: "IT",
      title: "IT test 2",
      contents: "this is IT contents test 2",
    },
    {
      createdAt: "2025-01-03",
      postId: 3,
      postsType: "IT",
      title: "IT test 3",
      contents:
        "this is IT contents test 3 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\naaaaaaaaaaaaaaaaaaaaaaaaaaaaassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
      createdAt: "2025-01-04",
      postId: 4,
      postsType: "Japanese",
      title: "Japanese test 1",
      contents: "this is Japanese contents test 1",
    },
    {
      createdAt: "2025-01-05",
      postId: 5,
      postsType: "Japanese",
      title: "Japanese test 2",
      contents: "this is Japanese contents test 2",
    },
    {
      createdAt: "2025-01-06",
      postId: 6,
      postsType: "Japanese",
      title: "Japanese test 3",
      contents: "this is Japanese contents test 3",
    },
  ],
};
