import { Container, Row, Col, Modal, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const dynamoAPI = process.env.REACT_APP_DYNAMO_API;

function AddProduct() {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [categories, setCategories] = useState([]);
    const [minDate, setMinDate] = useState('');
    const [maxDate, setMaxDate] = useState('');
    const [name, setName] = useState('');
    const [condition, setCondition] = useState('New');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState('');
    const [image, setImage] = useState('');
    const [products, setProducts] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = event => {
        event.preventDefault();

        async function addProduct() {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('condition', condition);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('date', date);
            formData.append('userid', '1');
            formData.append('file', image);

            await axios.post(dynamoAPI + 'addproduct/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                setShow(false);
                alert("Successfully added product");
            }).catch(error => {
                alert("Failed to add product");
            });
        }
        addProduct();
    }

    const openProduct = productId => {
        navigate('/product/' + productId);
    }

    useEffect(() => {
        const startDate = new Date();
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 30);

        var day = (startDate.getDate() < 10) ? '0' + startDate.getDate() : startDate.getDate();
        var newDay = (endDate.getDate() < 10) ? '0' + endDate.getDate() : endDate.getDate();
        var month = (startDate.getMonth() < 10) ? '0' + (startDate.getMonth() + 1) : (startDate.getMonth() + 1);
        var newMonth = (endDate.getMonth() < 10) ? '0' + (endDate.getMonth() + 1) : (endDate.getMonth() + 1);

        setMinDate(startDate.getFullYear() + '-' + month + '-' + day);
        setMaxDate(endDate.getFullYear() + '-' + newMonth + '-' + newDay);

        async function getData() {
            await axios.get(dynamoAPI + 'getcategories/').then(response => {
                setCategories(response.data.data);
            });
            await axios.get(dynamoAPI + 'getproductsbyuser/' + '1').then(response => {
                setProducts(response.data.data);
            });
        }
        getData();
    }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Product Details</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="productForm.Name">
                                        <Form.Label>Product Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Name" onChange={(e) => setName(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="productForm.Condition">
                                        <Form.Label>Condition</Form.Label>
                                        <Form.Select onChange={(e) => setCondition(e.target.value)}>
                                            <option value="New">New</option>
                                            <option value="Used">Used</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="productForm.Description">
                                        <Form.Label>Product Description</Form.Label>
                                        <Form.Control as="textarea" placeholder="Enter Description" rows={3} onChange={(e) => setDescription(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-2" controlId="productForm.Category">
                                        <Form.Label>Category</Form.Label>
                                        <Form.Select onChange={(e) => setCategory(e.target.value)}>
                                            {categories.map((item) => (
                                                <option key={item['id']} value={item['id']}>{item['name']}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="productForm.Price">
                                        <Form.Label>Product Price</Form.Label>
                                        <Form.Control type="number" placeholder="Enter Price" min="0" onChange={(e) => setPrice(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="productForm.Date">
                                        <Form.Label>Auction End Date</Form.Label>
                                        <Form.Control type="date" min={minDate} max={maxDate} onChange={(e) => setDate(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="productForm.Image">
                                        <Form.Label>Product Image</Form.Label>
                                        <Form.Control type="file" accept="image/jpeg" onChange={(e) => setImage(e.target.files[0])} required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p></p>
                        {(products.length < 1) ? <h3>You have not submitted any products</h3> : <h3>Your Products</h3>}
                    </Col>
                    <Col style={{textAlign:'right'}}>
                        <p></p>
                        <Button variant="primary" onClick={handleShow}>
                            Add Product
                        </Button>
                    </Col>
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
            </Container>
        </>
    );
}

export default AddProduct;