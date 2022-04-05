import { Navbar, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '../assets/avatar.png';
import Bidding from '../assets/bidding.png';

const dynamoAPI = process.env.REACT_APP_DYNAMO_API;

function Navigation() {
    const [categories, setCategories] = useState([]);
    const [searchString, setSearch] = useState('');
    const navigate = useNavigate();

    // const signout = event => {
    //     sessionStorage.clear();
    //     navigate('/login');
    // }
    useEffect(() => {
        async function getCategories() {
            await axios.get(dynamoAPI + 'getcategories/' /*+ sessionStorage.getItem('userId')*/).then(response => {
                setCategories(response.data.data);
            });
        }
        getCategories();
    }, []);

    const searchFunction = event => {
        event.preventDefault();
        navigate('/search/' + searchString);
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={Bidding}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Cloud Namde
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    {/* <Navbar.Collapse id="basic-navbar-nav"> */}
                    {/* <Nav className="me-auto">
                            <Nav.Link href="/register">Category</Nav.Link>
                        </Nav> */}
                    <NavDropdown title="Category" className="me-auto" id="basic-nav-dropdown">
                        {/* <NavDropdown.Item href="/products/Electronics">Electronics</NavDropdown.Item>
                            <NavDropdown.Item href="/products/Household">Household</NavDropdown.Item> */}
                        {categories.map((item) => (
                            <NavDropdown.Item key={item['id']} href={"/products/" + item['id']}>{item['name']}</NavDropdown.Item>
                        ))}
                    </NavDropdown>
                    {/* </Navbar.Collapse> */}
                    <Form className="d-flex" onSubmit={searchFunction}>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            required
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit" >Search</Button>
                    </Form>
                    {/* <Navbar.Collapse className="justify-content-end"> */}
                    <NavDropdown title={<img className="thumbnail-image" src="https://cloud-namde-users.s3.amazonaws.com/1.JPG" alt="User" style={{ width: '30px', height: '30px', borderRadius: '100%' }} />} id="collasible-nav-dropdown">
                        <NavDropdown.Item href="/viewbids">My Bids</NavDropdown.Item>
                        <NavDropdown.Item href="/addproduct">My Products</NavDropdown.Item>
                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Signout</NavDropdown.Item>
                    </NavDropdown>
                    {/* <Nav>
                            {<Nav.Link>Signout</Nav.Link>}
                        </Nav> */}
                    {/* </Navbar.Collapse> */}
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;
