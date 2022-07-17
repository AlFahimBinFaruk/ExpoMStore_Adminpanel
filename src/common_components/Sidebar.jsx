import { useState } from "react";
import {Link} from "react-router-dom"
const Sidebar = () => {
  const [commonRoutes, setCommonRoutes] = useState([
    {
      name: "dashboard",
      link: "/",
    },
    {
      name: "categories",
      link: "/category-list",
    },
    {
      name: "products",
      link: "/product-list",
    },
    {
      name: "users",
      link: "/user-list",
    },
    {
      name: "orders",
      link: "/order-list",
    },
    {
      name: "Admins",
      link: "/admin-list",
    },
  ]);
  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      <div className="sidebar-heading border-bottom bg-light">
        <h3 classNameName="text-muted fst-italic">ExpoMStore</h3>
      </div>
      <div className="list-group list-group-flush">
        {commonRoutes.map((i) => {
          return (
            <Link
              className="list-group-item list-group-item-action list-group-item-light p-3 text-capitalize"
              to={i.link}
            >
              {i.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
