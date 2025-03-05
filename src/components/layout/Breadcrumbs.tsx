import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "@/router";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const getTitle = (path: string): string => {
    const route = ROUTES.((r) => {
      
    });

    return route ? route.title : path;
  };

  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const title = getTitle(routeTo);

          return (
            <li key={routeTo} className="flex items-center space-x-2">
              <span>/</span>
              {isLast ? (
                <span className="text-gray-700">{title}</span>
              ) : (
                <Link to={routeTo} className="text-blue-500 hover:underline">
                  {title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
