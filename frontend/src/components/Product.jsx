import { Card } from "react-bootstrap";
import Rating from "./Ratings";
import { Link } from "react-router";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src={product.image} variant="top" />
      <Card.Body>
        <Card.Title className="product-title">
          <Link to={`/products/${product._id}`}>
            <strong>{product.name}</strong>
          </Link>
        </Card.Title>
        <Card.Text as="h4">${product.price}</Card.Text>
        <Card.Text as="div">
          <Rating value={product.rating} text={product.numReviews} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Product;
