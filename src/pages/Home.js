import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useContactsQuery } from "../services/contactApi";
import { useDeleteContactMutation } from "../services/contactApi";

const Home = () => {
  const { data, error, isLoading } = useContactsQuery();
  const [deleteContact]=useDeleteContactMutation()

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you want to delete that user?")) {
      toast.success("Contact Deleted Successfully");
      await deleteContact(id)
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">RTK Query</h2>
      <Link to="/add">
        <button className="btn btn-primary mb-4">Add Contact</button>
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan="5" className="text-center text-danger">
                Error fetching contacts: {error.message}
              </td>
            </tr>
          )}
          {data &&
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-warning mr-2">Edit</button>
                  </Link>
                  {"     "}

                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                  {"     "}
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-info">View</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
