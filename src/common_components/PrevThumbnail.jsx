import { MDBIcon } from "mdb-react-ui-kit";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useGlobalAlertContext } from "../contexts/alertContext";
//PrevContent componet
const PrevThumbnail = ({ thumbnail, setThumbnailDeleted }) => {
  let { setShowAlert } = useGlobalAlertContext();

  const deleteContent = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, thumbnail);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        setShowAlert({ msg: "deleted successfully", color: "success" });
        setThumbnailDeleted(true);
      })
      .catch((error) => {
        setShowAlert({ msg: "failded to delete file ", color: "danger" });
      });
  };
  return (
    <div className="prev-content my-3 ">
      <div>
        <h6>Previous Thumbnail:</h6>
        <p className="text-muted fw-bold">
          <small>Delete prev thumb to add new one..</small>
        </p>
      </div>
      <div className="d-flex  justify-content-between align-items-center">
        {/* content */}
        <div className="content col-10">
          <img
            src={thumbnail}
            height={150}
            className="border border-warning"
            alt="Fissure in Sandstone"
          />
        </div>
        {/* content delete btn */}

        <MDBIcon
          fas
          icon="trash"
          color="danger"
          role="button"
          onClick={deleteContent}
        />
      </div>
    </div>
  );
};

export default PrevThumbnail;
