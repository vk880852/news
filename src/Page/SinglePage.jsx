import React,{useState} from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SinglePage = () => {
  const p = useSelector(state => state.news); 
  let products=[];
  products.push(p.category[0]); 
  const navigate=useNavigate();
  return (
    <div className='container-fluid mt-4 card'>
      <div className='row'>
        {products.map((product, index) => (
          <div key={index} className='col-md-8 mb-4 ml-10'>
            <div className='card h-100'>
              <img src={product.urlToImage} alt={product.title} className='card-img-top' />
              <div className='card-body'>
                <h5 className='card-title'>{product.title}</h5>
                <hr />
                <p className='card-text'><strong>Description:</strong> {product.description}</p>
                <p className='card-text'><strong>Content:</strong> {product.content}</p>
                <p className='card-text'><strong>Author:</strong> {product.author}</p>
                <Link
                  className='btn btn-danger'
                  onClick={() => {
                       const confirmNavigation = window.confirm("Are you sure you want to leave this site?");
    if (confirmNavigation) {
      window.open(product.url, "_blank"); 
    }
    
                  }}
                >
                  More Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default SinglePage;
