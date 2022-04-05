import { Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

const dynamoAPI = process.env.REACT_APP_DYNAMO_API;

function SearchProducts() {
    const navigate = useNavigate();
    const param = useParams();
    const [products, setProducts] = useState([]);

    const openProduct = productId => {
        navigate('/product/' + productId);
    }

    useEffect(() => {
        async function getProducts() {
            await axios.get(dynamoAPI + 'search/' + param.keyword).then(response => {
                setProducts(response.data.data);
            });
        }
        getProducts();
    }, [])

    return (
        <>
            <Container>
                {(products.length < 1) ?
                    <Row>
                        <p></p>
                        <h3>Search did not find any results</h3>
                    </Row>
                    :
                    <>
                        <Row>
                            <p></p>
                            <h3>Products found</h3>
                        </Row>
                        {products.map((item) => (
                            <>
                                <Row style={{ border: '2px solid #DFDFDF', borderRadius: '4px' }}>
                                    <Col xs={1}>
                                        <p></p>
                                        <img style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }} src={item['image']} alt="Product" onClick={() => openProduct(item['id'])} />
                                        <p></p>
                                    </Col>
                                    <Col>
                                        <div>
                                            <p></p>
                                            <h6 style={{ cursor: 'pointer' }} onClick={() => openProduct(item['id'])}>{item['name']}</h6>
                                            <p>{item['condition']}</p>
                                            <h5>{"$" + item['price']}</h5>
                                        </div>
                                    </Col>
                                </Row>
                                <Row><p></p></Row>
                            </>
                        ))}
                    </>
                }
            </Container>
        </>
    );
}

export default SearchProducts;