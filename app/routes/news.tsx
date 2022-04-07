import { Outlet } from "remix";
import { CategoriesNavbar } from "~/components/categories-navbar";

export default function NewsPage() {
  return (
    <main>
      <CategoriesNavbar />

      <div className="py-5">
        <Outlet/>
      </div>
    </main >
  );
}
