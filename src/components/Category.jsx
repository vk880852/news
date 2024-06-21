import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addTodo ,deleteTodo} from '../features/newsSlice.jsx';

const Category = () => {
  const { category } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${import.meta.env.VITE_API_KEY}`); // Replace with your actual API endpoint
        setData(response.data.articles);
      } catch (error) {
        setError(`Something went wrong: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();   
  }, [category]);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container">
      <div className="row">
        <h4 className="text-center">All News Related to {category}</h4>
        {data.slice(0,10).map((article, index) => (
          <div className="col-md-4 mb-4 mt-2" key={index}>
            <div className="card h-100">
              <img src={article.urlToImage} className="card-img-top" alt="Article" />
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                {/* <p className="card-text">{article.description && `${article.description.substr(0, 50)}...`}</p> */}
                <button onClick={()=>{
                  dispatch(deleteTodo(article));
                  navigate(`/singlenews/${article.title}`)}} className="btn btn-primary">
                  Read More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
