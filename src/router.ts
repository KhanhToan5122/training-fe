export const ROUTES = [
    { path: "/", title: "Home" },
    { path: "/products", title: "Products" },
    { path: "/products/add", title: "Add product" },
    { path: "/products/update/:id", title: "Update product" },
    { path: "/users", title: "Users" },
    { path: "/users/add", title: "Add user" },
    { path: "/users/update/:id", title: "Update user" },
  ];
  
export const ROUTE_MAP = Object.fromEntries(ROUTES.map((route) => [route.path, route.title]));