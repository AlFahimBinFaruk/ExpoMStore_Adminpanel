import { useState } from "react";

const Sidebar = () => {
  const [commonRoutes, setCommonRoutes] = useState([
    {
      name: "categories",
      link: "",
    },
    {
      name: "products",
      link: "",
    },
    {
      name: "users",
      link: "",
    },
    {
      name: "orders",
      link: "",
    },
    {
      name: "Admins",
      link: "",
    },
  ]);
  return (
    <div class="border-end bg-white" id="sidebar-wrapper">
      <div class="sidebar-heading border-bottom bg-light">
        <h3 className="text-muted fst-italic">ExpoMStore</h3>
      </div>
      <div class="list-group list-group-flush">
        {commonRoutes.map((i) => {
          return (
            <a
              class="list-group-item list-group-item-action list-group-item-light p-3"
              href="#!"
            >
              {i.name}
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
