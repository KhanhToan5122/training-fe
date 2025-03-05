import { Link, useLocation } from "react-router-dom";
import { ROUTES, ROUTE_MAP } from "@/router";
import { title } from "process";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x); // Tách pathname

  // Hàm lấy title từ ROUTES
  const getTitle = (path: string): string => {
    const matchedRoute = ROUTES.find((route) => {
      const routeSegments = route.path.split("/").filter((x) => x);
      const pathSegments = path.split("/").filter((x) => x);

      if (routeSegments.length !== pathSegments.length) return false;

      return routeSegments.every((segment, i) =>
        segment.startsWith(":") || segment === pathSegments[i]
      );
    });

    if (matchedRoute) {
      const routeSegments = matchedRoute.path.split("/").filter((x) => x);
      const pathSegments = path.split("/").filter((x) => x);
      const paramIndex = routeSegments.findIndex((s) => s.startsWith(":"));
      if (paramIndex !== -1 && pathSegments[paramIndex]) {
        return `${matchedRoute.title} (${pathSegments[paramIndex]})`;
      }
      return matchedRoute.title;
    }
    return path.split("/").filter((x) => x).pop() || ""; // Trả về segment cuối
  };

  // Hàm xây dựng các đoạn breadcrumb hợp lý
  const createBreadcrumbSegments = () => {
    const segments = [];
    let currentPath = "";

    // Duyệt qua từng segment của pathname
    for (let i = 0; i < pathnames.length; i++) {
      currentPath += `/${pathnames[i]}`;
      
      // Chỉ thêm segment nếu nó khớp với một route hoàn chỉnh
      const isCompleteRoute = ROUTES.some((route) => {
        const routeSegments = route.path.split("/").filter((x) => x);
        const pathSegments = currentPath.split("/").filter((x) => x);
        if (routeSegments.length !== pathSegments.length) return false;
        return routeSegments.every((seg, idx) => 
          seg.startsWith(":") || seg === pathSegments[idx]
        );
      });

      if (isCompleteRoute) {
        segments.push(currentPath);
      }
    }
    return segments;
  };

  const breadcrumbSegments = createBreadcrumbSegments();
  const pageTitle = getTitle(location.pathname);

  return (
    
    <nav className="text-sm text-gray-500 bg-white-100 flex justify-between items-center h-16 px-4">
      <span className="text-gray-700 text-lg font-semibold">{pageTitle}</span>

      <ol className="flex space-x-2 items-center">
        {/* Home luôn hiển thị */}
        <li>
          <Link to="/" className="text-gray-900 hover:underline">
            Home
          </Link>
        </li>

        {/* Render breadcrumb */}
        {breadcrumbSegments.map((path, index) => {
          const isLast = index === breadcrumbSegments.length - 1;
          const title = getTitle(path);

          return (
            <li key={path} className="flex items-center h-16 space-x-2">
              <span>{">"}</span>
              {isLast ? (
                <span className="text-gray-500">{title}</span>
              ) : (
                <Link to={path} className="text-gray-900 hover:underline">
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