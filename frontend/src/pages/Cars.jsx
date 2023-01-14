import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

const Cars = () => {

  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchAllCars();
  }, [])

  const fetchAllCars = async () => {
    const res = await axios.get("http://localhost:5000/cars");
    setCars(res.data);
  };

  const handleDelete = async(id) => {
    try {
      const { status } = await axios.delete("http://localhost:5000/cars/" + id);
      if(status === 200){
        toast.success('Car deleted successfully!', {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "light",
        });
        fetchAllCars();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <h1 className="my-3 bg-primary p-3 text-center text-white">Kabul Car Store</h1>
      <section className="d-flex flex-wrap justify-content-around mt-5">
        {
          cars.map((car) => {
            return (
              <div className="card col-3 mx-4 my-3" key={car.id}>
                <img src={car.image} alt={car.title} className="card-img-top" style={{ cursor: 'pointer' }} />
                <div className="card-body">
                  <p>{car.description}</p>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <span>{car.title}</span>
                    <span>{car.price}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <Link to={`update/${car.id}`} className="btn btn-sm btn-warning">Update</Link>
                    <button className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(car.id)}>Delete</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
      <hr />
      <div className="col-2 offset-5">
        <Link to="/add" className="btn btn-primary my-4 mx-auto">Add New Car</Link>
      </div>
    </>
  )
}

export default Cars