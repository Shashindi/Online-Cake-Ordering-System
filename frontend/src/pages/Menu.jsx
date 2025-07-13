import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Row, 
  Col, 
  Card, 
  CardImg, 
  CardBody, 
  CardTitle, 
  CardSubtitle, 
  CardText, 
  Button,
  Badge,
  InputGroup,
  Input,
  ButtonGroup,
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Alert
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Mock data for cakes
const cakesData = [
  {
    id: 1,
    name: "Chocolate Truffle",
    description: "Rich chocolate cake with truffle cream and chocolate ganache",
    price: 350.99,
    category: "Chocolate",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["bestseller", "chocolate", "truffle"],
    rating: 4.8
  },
  {
    id: 2,
    name: "Strawberry Cheesecake",
    description: "Creamy cheesecake topped with fresh strawberries and strawberry sauce",
    price: 499.99,
    category: "Cheesecake",
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["fruity", "cheesecake"],
    rating: 4.7
  },
  {
    id: 3,
    name: "Vanilla Birthday Cake",
    description: "Classic vanilla cake with buttercream frosting and sprinkles",
    price: 899.99,
    category: "Birthday",
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["birthday", "vanilla", "classic"],
    rating: 4.5
  },
  {
    id: 4,
    name: "Red Velvet Delight",
    description: "Smooth red velvet cake with cream cheese frosting",
    price: 360.99,
    category: "Special",
    imageUrl: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["special", "redvelvet", "cream"],
    rating: 4.9
  },
  {
    id: 5,
    name: "Tiramisu Cake",
    description: "Coffee-flavored cake with mascarpone and cocoa",
    price: 500.00,
    category: "Coffee",
    imageUrl: "https://images.unsplash.com/photo-1517427294546-5aa121f68e8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["coffee", "italian", "gourmet"],
    rating: 4.6
  },
  {
    id: 6,
    name: "Blueberry Muffin Cake",
    description: "Light sponge cake with fresh blueberries and lemon glaze",
    price: 290.99,
    category: "Fruity",
    imageUrl: "https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["fruity", "blueberry", "light"],
    rating: 4.4
  },
  {
    id: 7,
    name: "Carrot Cake",
    description: "Spiced carrot cake with cream cheese frosting and walnuts",
    price: 320.99,
    category: "Spiced",
    imageUrl: "https://images.unsplash.com/photo-1566121933407-3c7ccdd26763?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    tags: ["carrot", "spiced", "healthy"],
    rating: 4.5
  }
];

// Categories for filtering
const categories = ["All", "Chocolate", "Cheesecake", "Birthday", "Special"];

const Menu = () => {
  const [cakes, setCakes] = useState([]);
  const [filteredCakes, setFilteredCakes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [selectedCake, setSelectedCake] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setCakes(cakesData);
      setFilteredCakes(cakesData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter cakes based on category and search term
  useEffect(() => {
    let results = cakes;
    
    if (selectedCategory !== "All") {
      results = results.filter(cake => cake.category === selectedCategory);
    }
    
    if (searchTerm) {
      results = results.filter(cake => 
        cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cake.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cake.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredCakes(results);
  }, [selectedCategory, searchTerm, cakes]);

  // Toggle modal for cake details
  const toggleModal = () => setModal(!modal);

  // Open cake details modal
  const openCakeDetails = (cake) => {
    setSelectedCake(cake);
    setQuantity(1);
    setAddedToCart(false);
    toggleModal();
  };

  // Add to cart function
  const handleAddToCart = () => {
    // In a real app, this would add to cart in state/context/redux
    // For now, just show the success message
    setAddedToCart(true);
    setTimeout(() => {
      toggleModal();
    }, 2000);
  };

  return (
    <div className="pb-5 pt-5">
      {/* Hero Banner */}
      <div 
        className="bg-image p-5 text-center shadow-1-strong rounded mb-5 text-white"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559620192-032c4bc4674e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80')",
          height: '300px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <h1 className="mb-3 h1 fw-bold">Exquisite Cake Collection</h1>
          <h4 className="mb-4">Discover our handcrafted gourmet cakes</h4>
          <Button color="primary" size="lg" className="rounded-pill px-4">Order Now</Button>
        </div>
      </div>

      <Container>
        {/* Search and Filter */}
        <Row className="mb-4">
          <Col md={6} className="mb-3 mb-md-0">
            <InputGroup>
              <Input 
                placeholder="Search for cakes..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button color="primary">
                <i className="bi bi-search"></i> Search
              </Button>
            </InputGroup>
          </Col>
          <Col md={6}>
            <ButtonGroup className="w-100">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  color={selectedCategory === category ? "primary" : "secondary"}
                  outline={selectedCategory !== category}
                  onClick={() => setSelectedCategory(category)}
                  className="text-nowrap"
                >
                  {category}
                </Button>
              ))}
            </ButtonGroup>
          </Col>
        </Row>

        {/* Main Content - Cake Cards */}
        {loading ? (
          <div className="text-center my-5">
            <Spinner color="primary" />
            <p className="mt-2">Loading delicious cakes...</p>
          </div>
        ) : (
          <Row>
            {filteredCakes.length === 0 ? (
              <Col className="text-center my-5">
                <h3>No cakes found matching your criteria</h3>
                <Button color="primary" onClick={() => {setSelectedCategory("All"); setSearchTerm("")}}>
                  View All Cakes
                </Button>
              </Col>
            ) : (
              filteredCakes.map(cake => (
                <Col key={cake.id} xs={12} sm={6} lg={4} xl={3} className="mb-4">
                  <Card className="h-100 shadow-sm border-0">
                    <div className="position-relative">
                      <CardImg 
                        top 
                        width="100%" 
                        src={cake.imageUrl} 
                        alt={cake.name} 
                        className="rounded-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <Badge 
                        color="danger" 
                        className="position-absolute m-2 top-0 end-0"
                      >
                        LKR: {cake.price}/=
                      </Badge>
                      {cake.rating >= 4.7 && (
                        <Badge 
                          color="warning" 
                          className="position-absolute m-2 top-0 start-0"
                        >
                          ⭐ Top Rated
                        </Badge>
                      )}
                    </div>
                    <CardBody>
                      <CardTitle tag="h5">{cake.name}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {cake.category}
                      </CardSubtitle>
                      <CardText className="text-truncate">{cake.description}</CardText>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          ⭐ {cake.rating} Rating
                        </small>
                        <Button 
                          color="primary" 
                          outline
                          onClick={() => openCakeDetails(cake)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}

        {/* Featured Collections */}
        <div className="mt-5 pt-3 border-top">
          <h2 className="text-center mb-4">Featured Collections</h2>
          <Row>
            <Col md={4} className="mb-3">
              <div className="rounded p-3 bg-light text-center h-100">
                <h4>Birthday Specials</h4>
                <p>Make celebrations memorable with our beautiful birthday cakes</p>
                <Button color="success" outline>Explore</Button>
              </div>
            </Col>
            <Col md={4} className="mb-3">
              <div className="rounded p-3 bg-light text-center h-100">
                <h4>Wedding Collection</h4>
                <p>Elegant cake designs for your special day</p>
                <Button color="success" outline>Explore</Button>
              </div>
            </Col>
            <Col md={4} className="mb-3">
              <div className="rounded p-3 bg-light text-center h-100">
                <h4>Seasonal Favorites</h4>
                <p>Limited time cakes with seasonal flavors</p>
                <Button color="success" outline>Explore</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Cake Details Modal */}
      <Modal isOpen={modal} toggle={toggleModal} size="lg">
        {selectedCake && (
          <>
            <ModalHeader toggle={toggleModal}>
              {selectedCake.name}
            </ModalHeader>
            <ModalBody>
              <Row>
                <Col md={6}>
                  <img 
                    src={selectedCake.imageUrl} 
                    alt={selectedCake.name} 
                    className="img-fluid rounded" 
                    style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={6}>
                  <h4>{selectedCake.name}</h4>
                  <h5 className="text-primary mb-3">${selectedCake.price}</h5>
                  <p>{selectedCake.description}</p>
                  <div className="mb-3">
                    <strong>Category:</strong> {selectedCake.category}
                  </div>
                  <div className="mb-3">
                  <strong>Tags:</strong>{" "}
                    {selectedCake.tags.map((tag, index) => (
                      <Badge 
                        key={index} 
                        color="secondary" 
                        className="me-1"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="mb-3">
                    <strong>Rating:</strong> {selectedCake.rating} / 5 ⭐
                  </div>
                  <Form>
                    <FormGroup>
                      <Label for="quantity">Quantity</Label>
                      <InputGroup>
                        <Button 
                          color="secondary" 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          -
                        </Button>
                        <Input 
                          type="number" 
                          name="quantity" 
                          id="quantity"
                          value={quantity}
                          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                          min="1"
                          className="text-center"
                        />
                        <Button 
                          color="secondary" 
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          +
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  </Form>

                  {addedToCart && (
                    <Alert color="success" className="mt-3">
                      Added to cart successfully!
                    </Alert>
                  )}
                </Col>
              </Row>

              <div className="mt-4">
                <h5>Customization Options</h5>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="cakeSize">Size</Label>
                      <Input type="select" name="cakeSize" id="cakeSize">
                        <option value="small">Small (6")</option>
                        <option value="medium">Medium (8")</option>
                        <option value="large">Large (10")</option>
                        <option value="xlarge">Extra Large (12")</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="cakeFlavor">Flavor</Label>
                      <Input type="select" name="cakeFlavor" id="cakeFlavor">
                        <option>Original</option>
                        <option>Vanilla Enhanced</option>
                        <option>Chocolate Intense</option>
                        <option>Strawberry</option>
                        <option>Butterscotch</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="message">Message on Cake</Label>
                  <Input 
                    type="text" 
                    name="message" 
                    id="message" 
                    placeholder="Happy Birthday, John!"
                  />
                </FormGroup>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="d-flex justify-content-between w-100">
                <h5 className="my-auto">Total: ${(selectedCake.price * quantity).toFixed(2)}</h5>
                <div>
                  <Button color="secondary" onClick={toggleModal} className="me-2">
                    Cancel
                  </Button>
                  <Button color="primary" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </Modal>

      {/* Testimonials Section */}
      <Container className="mt-5">
        <h2 className="text-center mb-4">What Our Customers Say</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="text-center">
                <div className="mb-3">
                  ⭐⭐⭐⭐⭐
                </div>
                <CardText className="font-italic">
                  "The chocolate truffle cake was absolutely divine! Everyone at the party loved it. Will definitely order again."
                </CardText>
                <div className="d-flex align-items-center justify-content-center">
                  <div 
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                    style={{width: '40px', height: '40px'}}
                  >
                    SM
                  </div>
                  <div>
                    <h6 className="mb-0">Sarah M.</h6>
                    <small className="text-muted">Regular Customer</small>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="text-center">
                <div className="mb-3">
                  ⭐⭐⭐⭐⭐
                </div>
                <CardText className="font-italic">
                  "Ordered the Red Velvet for my anniversary. Not only was it stunning, but it tasted incredible. Moist, flavorful, and perfect sweetness."
                </CardText>
                <div className="d-flex align-items-center justify-content-center">
                  <div 
                    className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-2"
                    style={{width: '40px', height: '40px'}}
                  >
                    JD
                  </div>
                  <div>
                    <h6 className="mb-0">John D.</h6>
                    <small className="text-muted">Verified Purchase</small>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <CardBody className="text-center">
                <div className="mb-3">
                  ⭐⭐⭐⭐⭐
                </div>
                <CardText className="font-italic">
                  "The customization options are amazing! I added a personalized message and chose a unique flavor combination. Fast delivery and great service!"
                </CardText>
                <div className="d-flex align-items-center justify-content-center">
                  <div 
                    className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center me-2"
                    style={{width: '40px', height: '40px'}}
                  >
                    ET
                  </div>
                  <div>
                    <h6 className="mb-0">Emily T.</h6>
                    <small className="text-muted">New Customer</small>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Newsletter Section */}
      <div className="bg-light py-5 mt-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <h3>Get Special Offers and Discounts</h3>
              <p className="mb-4">Subscribe to our newsletter to receive updates on new cake flavors and seasonal specials</p>
              <Form className="d-flex justify-content-center">
                <FormGroup className="mb-0 me-2 flex-grow-1" style={{ maxWidth: '400px' }}>
                  <Input type="email" placeholder="Enter your email address" />
                </FormGroup>
                <Button color="primary">Subscribe</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Quick Order Banner */}
      <div className="bg-primary text-white py-3 mt-5">
        <Container className="text-center">
          <h4 className="mb-3">Need a Custom Cake for a Special Occasion?</h4>
          <Button color="light" size="lg" className="rounded-pill px-4">
            Contact Us for Custom Orders
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default Menu;
