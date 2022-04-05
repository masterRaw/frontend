import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const dynamoAPI = process.env.REACT_APP_DYNAMO_API;

function Bids() {
    const [products, setProducts] = useState('');

    useEffect(() => {
        async function getProducts() {
            await axios.get(dynamoAPI + 'getbidsbyuser/' + '1').then(response => {
                setProducts(response.data.data);
            });
        }
        getProducts();
    }, []);

    return (
        <>
            <Container>
                {(products.length < 1) ?
                    <Row>
                        <p></p>
                        <h3>You do not have any submitted bids</h3>
                    </Row>
                    :
                    <>
                        <Row>
                            <p></p>
                            <h3>Your bids</h3>
                        </Row>
                        {products.map((item) => (
                            <>
                                <Row style={{ border: '2px solid #DFDFDF', borderRadius: '4px' }}>
                                    <Col xs={1}>
                                        <p></p>
                                        <img style={{ width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' }} src={item['image']} alt="Product" />
                                        <p></p>
                                    </Col>
                                    <Col>
                                        <div>
                                            <p></p>
                                            <h6 style={{ cursor: 'pointer' }} >{item['name']}</h6>
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

export default Bids;