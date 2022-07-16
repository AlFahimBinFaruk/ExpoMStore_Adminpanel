import { MDBIcon } from "mdb-react-ui-kit";

//PrevContent componet
const PrevThumbnail = () => {
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
            src="https://th.bing.com/th/id/OIP.iN7b7OveHW9aSx611Yh0owHaHa?w=186&h=186&c=7&r=0&o=5&pid=1.7"
            height={150}
            className="border border-warning"
            alt="Fissure in Sandstone"
          />
        </div>
        {/* content delete btn */}

        <MDBIcon fas icon="trash" color="danger" role="button" />
      </div>
    </div>
  );
};

export default PrevThumbnail;
