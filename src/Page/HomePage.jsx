import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addTodo, deleteTodo } from "../features/newsSlice.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${import.meta.env.VITE_API_KEY}`);
        setProducts(res.data.articles);
        dispatch(addTodo(res.data.articles));
        setLoading(false); 
      } catch (error) {
        console.log(`Error Occurred While Fetching Data: ${error}`);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const clickHandler = (e) => {
    setPage(Number(e.target.textContent));
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < Math.ceil(products.length / perPage)) {
      setPage(page + 1);
    }
  };

  const renderProducts = () => {
    if (loading) {
      return <p className="text-center">Loading...</p>;
    }

    if (!products || products.length === 0) {
      return <p className="text-center">No news articles found.</p>;
    }

    return products.slice((page - 1) * perPage, page * perPage).map((product, index) => (
      <div className="col-md-4 mb-4 " key={index}>
        <div className="card h-100">
          <img src={product.urlToImage} className="card-img-top" alt="Product" />
          <div className="card-body">
            <h5 className="card-title">{product.title}</h5>
            <p className="card-text">{product.description && `${product.description.substr(0, 50)}...`}</p>
            <button onClick={()=>{
                dispatch(deleteTodo(product));
                navigate(`/singlenews/${product.title}`)
            }} className="btn btn-primary">
              Read More
            </button>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="row">
        <h3 className="text-center">All News</h3>
        {renderProducts()}
      </div>
      <div className="row mt-4">
        <div className="col text-center">
          <button className="btn btn-primary mr-2" onClick={prevPage} disabled={page === 1 || loading}>
            Previous
          </button>
          {[...Array(Math.ceil(products.length / perPage))].map((_, num) => (
            <button
              key={num + 1}
              className={`btn btn-primary ${page === num + 1 ? "active" : ""}`}
              onClick={clickHandler}
              disabled={loading}
            >
              {num + 1}
            </button>
          ))}
          <button className="btn btn-primary" onClick={nextPage} disabled={page === Math.ceil(products.length / perPage) || loading}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
