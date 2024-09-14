import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetPosts } from "@/lib/swr/get-posts"
import { cn } from "@/lib/utils";
import Link from "next/link";

const Home = () => {
  const {
    posts
  } = useGetPosts("/api/posts");

  if(!posts) return <div>ロード中...</div>
  return (
    <div
      className="w-screen h-screen overflow-x-hidden">
      <div className="w-full md:w-4/5 lg:w-3/5 mx-auto p-8 font-sans">
        <h2 className="text-4xl font-bold mb-8 font-noto-sans">投稿一覧</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-bold">
                  <Link
                    href={`/posts/${post.id}`}
                    className={cn(
                      "hover:underline"
                    )}
                    >
                    {post.id}
                  </Link>
                </TableCell>
                <TableCell>{post.title}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Home;