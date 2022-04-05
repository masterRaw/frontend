import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const dynamoAPI = process.env.REACT_APP_DYNAMO_API;

function Product() {
    const param = useParams();
    const [product, setProduct] = useState([]);
    const [price, setPrice] = useState(0);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        async function getProduct() {
            await axios.get(dynamoAPI + 'getproduct/' + param.id).then(response => {
                setProduct(response.data.data);
                
                response.data.data['bids'].forEach(user => {
                    if( user['userid'] === '1') {
                        setDisable(true);
                    }
                });
            });
        }
        getProduct();
    }, [])

    const handleSubmit = event => {
        event.preventDefault();

        const data = { 
            userid: '1', 
            price: price, 
            id: param.id 
        };

        fetch(dynamoAPI + 'submitbid', {
            mode: 'cors',
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                setDisable(true);
                alert("Bid submitted");
            }
            else {
                alert("Bid submission failed");
            }
        })
    }

    return (
        <>
            <Container>
                <br />
                <Row>
                    <Col md={5}>
                        <div style={{ border: '1px solid #DFDFDF', textAlign: 'center' }}>
                            <img src={product['image']} style={{ width: '500px', height: '500px', objectFit: 'contain' }} alt="Product" />
                        </div>
                    </Col>
                    <Col md={4}>
                        <h2>{product['name']}</h2>
                        <h4>{product['description']}</h4>
                        <h6>Condition: {product['condition']}</h6>
                        <h6>Starting Bid: {'$' + product['price']}</h6>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="number" placeholder="Enter bid value" min={product['price']} onChange={(e) => setPrice(e.target.value)} disabled={disable} required />
                            </Form.Group>
                            <Button variant="primary" type="submit" disabled={disable}>
                                Submit Bid
                            </Button>
                        </Form>
                    </Col>
                    <Col md={3}>
                        <div style={{ border: '1px solid #DFDFDF', padding: '10px 0px 0px 10px' }}>
                            <h2>Seller Information</h2>
                            <h4>{product['userid']}</h4>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default Product;