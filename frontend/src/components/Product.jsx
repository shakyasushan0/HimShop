import { Card } from "react-bootstrap";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Img src={product.image} variant="top" />
      <Card.Body>
        <Card.Title>
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text as="h4">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}
export default Product;
