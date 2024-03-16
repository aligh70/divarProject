import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, getPosts } from "services/user";
import Loader from "../modules/Loader";
import { sp } from "utils/replaceNumber";
import styles from "./PostList.module.css";

function PostList() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["my-post-list"], getPosts);
  console.log(data);

  const { mutate } = useMutation(deletePost, {
    onSuccess: () => queryClient.invalidateQueries("my-post-list"),
  });

  return (
    <div className={styles.list}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h3>آگهی های شما</h3>
          {data.data.posts.map((post) => (
            <div key={post._id} className={styles.post}>
              <img src={`${import.meta.env.VITE_BASE_URL}${post.images[0]}`} />
              <div>
                <p>{post.options.title}</p>
                <span>{post.options.content}</span>
              </div>
              <div className={styles.price}>
                <p>{new Date(post.createdAt).toLocaleDateString("fa-IR")}</p>
                <span>{sp(post.amount)} تومان</span>
              </div>
              <button onClick={() => mutate(post._id)}>حذف آگهی</button>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PostList;
