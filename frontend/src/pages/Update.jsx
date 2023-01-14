import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

// import { TextField } from '@mui/material';

const Update = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState({});

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axios.put("http://localhost:5000/cars/" + id, car);
      if (status === 200) {
        setCar({});
        navigate("/");
        toast.success('Car Update successfully!', {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <section>
      <h4 className="text-center col-3 mx-auto mt-5 p-2">Update Car</h4>
      <hr />
      <div className="col-3 mx-auto">
        <form dir="ltr" onSubmit={submitForm}>

          <input type="text" name="title" placeholder="title" className="form-control mb-2"
            onChange={handleChange} required />

          <input type="text" name="description" placeholder="title" className="form-control mb-2"
            onChange={handleChange} required />

          <input type="number" name="price" placeholder="price" className="form-control mb-2"
            onChange={handleChange} required />

          <input type="text" name="image" placeholder="link" className="form-control mb-2"
            onChange={handleChange} required />

          <button type="submit" className="btn btn-warning my-3">Update Car</button>
          <Link to="/" className="btn btn-secondary m-3">Back</Link>
        </form>
      </div>
      {/* <TextField type={"text"} label="title" variant="outlined"
            name="title" onChange={handleChange} size="small" margin="normal" required
            inputProps={{
              style: {
                width: '20rem'
              }
            }}
          /> */}
    </section>

  )
}

export default Update;

