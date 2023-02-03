import './product.css';

function Product({ data }) {
    return (
        <div className="product">
            <span className="title"> {data.title} </span>
            <span className="price"> {data.price}$ </span>
        </div>
    );
}

export default Product;
